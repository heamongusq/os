# Tracker data model

## Summary

Defines the shared TypeScript model and the SQLite schema for every tracker
entity (Goal, Task, DailyTask, Habit, Event) as a single Point hierarchy. All
points live in one `points` table discriminated by `type`; Goal↔Goal links use
`goal_links`; habit completions, tags, and point↔tag membership get their own
tables. **Scope is the data model only** — no backend routes, no frontend, no
Analytics/Settings — so the API and UI sections below are intentionally
deferred to a later ADR.

## Data model

### @os/share (`src/share/src/`)

A discriminated union over `type`, with shared fields on a common base and
type-specific fields on each member.

```ts
export type PointType   = 'task' | 'goal' | 'habit' | 'daily_task' | 'event';
export type Priority    = 'low' | 'medium' | 'high' | 'highest';
export type PointStatus = 'created' | 'in_progress' | 'overdue' | 'canceled' | 'completed';
export type HabitFrequency = 'day' | 'week' | 'month' | 'weekdays';
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday

export interface Tag { id: string; name: string; color: string | null; }

interface PointCommon {
  id: string;
  title: string;                 // required
  priority: Priority;
  status: PointStatus;
  tags: Tag[];
  parentId: string | null;       // link to parent Point
  childIds: string[];            // derived from points.parent_id
  createdAt: string;             // ISO 8601 — creation time
  completedAt: string | null;    // ISO 8601 — completion time
  executionDate: string | null;  // YYYY-MM-DD — optional execution date
}

export interface TaskPoint      extends PointCommon { type: 'task';       description: string | null; }
export interface DailyTaskPoint extends PointCommon { type: 'daily_task'; description: string | null; }
export interface GoalPoint      extends PointCommon { type: 'goal';       description: string | null; linkedGoalIds: string[]; }
export interface HabitPoint     extends PointCommon {
  type: 'habit';
  frequency: HabitFrequency;
  frequencyWeekdays: Weekday[];  // populated only when frequency === 'weekdays'
  streakCount: number;
  completionDates: string[];     // ISO dates, derived from habit_completions
}
export interface EventPoint     extends PointCommon {
  type: 'event';
  startAt: string | null;        // ISO 8601 datetime
  endAt: string | null;          // ISO 8601 datetime; null = point-in-time event
}

export type Point =
  | TaskPoint | DailyTaskPoint | GoalPoint | HabitPoint | EventPoint;
```

DTOs (request/response shapes; server-owned fields omitted from create):

```ts
// Create — id, createdAt, status (default 'created'), completedAt, childIds,
// streakCount, completionDates, linkedGoalIds are server-owned.
type CreateCommon = {
  title: string;
  priority?: Priority;
  tagIds?: string[];
  parentId?: string | null;
  executionDate?: string | null;
};
export type CreateTaskInput      = CreateCommon & { type: 'task';       description?: string | null };
export type CreateDailyTaskInput = CreateCommon & { type: 'daily_task'; description?: string | null };
export type CreateGoalInput      = CreateCommon & { type: 'goal';       description?: string | null };
export type CreateHabitInput     = CreateCommon & { type: 'habit'; frequency: HabitFrequency; frequencyWeekdays?: Weekday[] };
export type CreateEventInput     = CreateCommon & { type: 'event'; startAt?: string | null; endAt?: string | null };
export type CreatePointInput =
  | CreateTaskInput | CreateDailyTaskInput | CreateGoalInput | CreateHabitInput | CreateEventInput;

export type UpdatePointInput = { id: string } & Partial<
  Omit<CreateCommon, never> & {
    title: string; status: PointStatus; description: string | null;
    frequency: HabitFrequency; frequencyWeekdays: Weekday[];
    startAt: string | null; endAt: string | null;
  }
>;

export interface HabitCompletion { id: string; habitId: string; completedAt: string; }
export type LogHabitCompletionInput = { habitId: string; completedAt?: string };

export interface GoalLink { goalId: string; linkedGoalId: string; }

export type CreateTagInput = { name: string; color?: string | null };
export type UpdateTagInput = { id: string; name?: string; color?: string | null };
```

`description` is `null` for `habit`/`event` (they are not BaseTaskPoint).
`linkedGoalIds` is only meaningful on `goal`. Habit children are disallowed
(no `parentId` pointing to a habit, no children on a habit) — enforced at the
backend layer in a later ADR; the model just permits the columns.

### schema.sql (`src/backend/src/schema.sql`)

```sql
CREATE TABLE points (
  id              TEXT PRIMARY KEY,
  type            TEXT NOT NULL CHECK (type IN ('task','goal','habit','daily_task','event')),
  title           TEXT NOT NULL,
  priority        TEXT NOT NULL DEFAULT 'medium'
                    CHECK (priority IN ('low','medium','high','highest')),
  status          TEXT NOT NULL DEFAULT 'created'
                    CHECK (status IN ('created','in_progress','overdue','canceled','completed')),
  description     TEXT,                       -- task / daily_task / goal only
  parent_id       TEXT REFERENCES points(id) ON DELETE CASCADE,
  created_at      TEXT NOT NULL,              -- ISO 8601
  completed_at    TEXT,                       -- ISO 8601
  execution_date  TEXT,                       -- YYYY-MM-DD
  frequency           TEXT CHECK (frequency IN ('day','week','month','weekdays')), -- habit only
  frequency_weekdays  TEXT,                   -- habit only: JSON array of 0..6
  streak_count        INTEGER NOT NULL DEFAULT 0, -- habit only
  start_at        TEXT,                       -- event only: ISO 8601
  end_at          TEXT                        -- event only: ISO 8601
);
CREATE INDEX idx_points_type           ON points(type);
CREATE INDEX idx_points_parent         ON points(parent_id);
CREATE INDEX idx_points_status         ON points(status);
CREATE INDEX idx_points_execution_date ON points(execution_date);

CREATE TABLE goal_links (
  goal_id        TEXT NOT NULL REFERENCES points(id) ON DELETE CASCADE,
  linked_goal_id TEXT NOT NULL REFERENCES points(id) ON DELETE CASCADE,
  PRIMARY KEY (goal_id, linked_goal_id),
  CHECK (goal_id <> linked_goal_id)
);

CREATE TABLE habit_completions (
  id           TEXT PRIMARY KEY,
  habit_id     TEXT NOT NULL REFERENCES points(id) ON DELETE CASCADE,
  completed_at TEXT NOT NULL                  -- ISO 8601
);
CREATE INDEX idx_habit_completions_habit ON habit_completions(habit_id);

CREATE TABLE tags (
  id    TEXT PRIMARY KEY,
  name  TEXT NOT NULL UNIQUE,
  color TEXT
);

CREATE TABLE point_tags (
  point_id TEXT NOT NULL REFERENCES points(id) ON DELETE CASCADE,
  tag_id   TEXT NOT NULL REFERENCES tags(id)   ON DELETE CASCADE,
  PRIMARY KEY (point_id, tag_id)
);
CREATE INDEX idx_point_tags_tag ON point_tags(tag_id);
```

Type ↔ column mapping (the parity reviewer-qa must check):

| Concept              | @os/share                         | points column(s)                                  |
|----------------------|-----------------------------------|---------------------------------------------------|
| discriminator        | `type`                            | `type`                                            |
| common               | `title/priority/status/createdAt/completedAt/executionDate` | `title/priority/status/created_at/completed_at/execution_date` |
| hierarchy            | `parentId` / `childIds` (derived) | `parent_id`                                       |
| BaseTaskPoint        | `description`                     | `description`                                     |
| Goal↔Goal            | `linkedGoalIds`                   | `goal_links`                                      |
| Habit recurrence     | `frequency/frequencyWeekdays/streakCount` | `frequency/frequency_weekdays/streak_count` |
| Habit completions    | `completionDates` / `HabitCompletion` | `habit_completions`                           |
| Event time           | `startAt/endAt`                   | `start_at/end_at`                                 |
| Tags                 | `Tag` / `tags`                    | `tags` + `point_tags`                             |

## API contract

Deferred — out of scope for this ADR. Routes (`/api/points`, habit
completions, goal links, tags) will be defined in a later ADR once the data
model lands.

## UI impact

Deferred — out of scope for this ADR. No frontend or designer work here.

## Open questions / risks

- **No monorepo scaffolding exists.** There is no `package.json`, no
  `src/share`, no `src/backend`. The two tasks below create only the specific
  model files plus the package `index.md`s; full workspace scaffolding
  (`package.json`, `tsconfig`, Fastify/`better-sqlite3` wiring, `npm`
  scripts) is a **prerequisite handled in a separate scaffolding ADR**. Until
  that lands, `npm run typecheck`/`npm test` cannot run and the reviewer-qa
  gate is limited to what tooling is available.
- **DailyTask recurrence semantics.** "task for every day … completed as a
  Task" is ambiguous: one persistent row that resets daily, or a new instance
  per day (which would need a completion log like habits for analytics).
  Modeled here as a plain Task variant; decision deferred — may add a
  `daily_task_completions` table later.
- **`streak_count` denormalization.** Derivable from `habit_completions` +
  `frequency`. Stored as a cached column; risks drift if completions are
  edited out-of-band. Alternative: compute on read and drop the column.
- **`goal_links` symmetry.** A Goal↔Goal link is undirected. This schema
  stores whatever the app inserts; recommendation is one row per unordered
  pair with `goal_id < linked_goal_id` enforced at the backend layer (avoids
  duplicate/mirrored rows). Confirm before backend ADR.
- **`status = 'overdue'`.** Likely derived from `execution_date` vs. now
  rather than persisted; stored value can go stale. Modeled as a stored enum
  for now; the read/derive policy is a backend-ADR decision.
- **Semantic tags** (keystone, milestone, LifeGoal/Infinity, Keystone) are
  modeled as ordinary rows in `tags`, not per-type enums. Whether some are
  system-reserved/seeded is a later decision; the generic model supports both.

## Task list (ordered)

1. [backend] Add `@os/share` tracker model + DTOs exactly as specified in
   "Data model" (Point discriminated union, `Tag`, `HabitCompletion`,
   `GoalLink`, Create/Update inputs); add/refresh `src/share/index.md`.
   Note: presumes the `@os/share` package skeleton exists or is created
   minimally for this file. — depends on: —
2. [backend] Add `src/backend/src/schema.sql` exactly as specified in
   "schema.sql" (`points`, `goal_links`, `habit_completions`, `tags`,
   `point_tags` + indexes); add/refresh `src/backend/index.md`. Must stay in
   lockstep with task 1 (use the parity table). — depends on: 1
3. [reviewer-qa] Gate: `@os/share` types compile; `schema.sql` loads cleanly
   in SQLite; every row in the type↔column parity table holds; CHECK
   constraints match the union literals. Document any verification blocked by
   missing scaffolding. — depends on: 1, 2
