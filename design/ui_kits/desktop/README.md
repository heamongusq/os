# OS Desktop UI Kit

Interactive recreation of the OS desktop web app — calm two-column workspace built around the canonical entity model: Goals → Tasks (ATask / GTask) + DailyTasks + Events on the left, Habits on the right.

## Screens

1. **Today** — page headline + 2-column body (Tasks / Habits). Composer opens inline. `Goals` button next to `Add`.
2. **All tasks** — search + filter bar, grouped by goal, "Standalone" group for ATasks.
3. **Calendar** — month view, all-day + timed events, today cell marked with violet pip.
4. **Analytics** — 4-metric strip, one focal bar chart (daily completions, 30 days), goals progress and habit grid panels.
5. **Preferences** — sidebar of categories + content area: General, Appearance, Notifications, Data, Account.

## Interactions

- **Click row title** → inline rename. `Enter` saves, `Esc` cancels.
- **Hover row** → pencil + trash appear, metadata fades out.
- **Click checkbox** → marks complete; row gets struck-through; row fades to fg-3.
- **Today view + click row** → row gets the violet 2px left bar (the "process indicator").
- **+ Add** → opens composer with type chooser (ATask / GTask / Habit / Event / Daily). GTask reveals goal picker.
- **Goals button** → modal: list of goals, hover row to reveal pencil + trash, inline-add new.
- **Sidebar nav** → switches screens.
- **Theme toggle** → bottom-left, swaps light / dark instantly.

## Files

| File | Purpose |
|---|---|
| `index.html` | Entry point. Loads tokens + scripts. |
| `styles.css` | Desktop-only styles (imports `../../colors_and_type.css`). |
| `components.jsx` | Lucide icons, Checkbox, Sidebar, PageHead, TaskRow, EventRow, HabitRow, Composer, GoalsModal, ThemeToggle. |
| `data.jsx` | Seed data: 4 goals, 11 tasks/dailies, 4 events, 5 habits. |
| `screens.jsx` | The five screens. |
| `app.jsx` | App root + reducer + screen routing. |

## Constraints honored

- Two-column rule: 1.5fr / 1fr (Tasks 60% / Habits 40%), gap 32px.
- Goals are not a column — accessed via the `Goals` button.
- Each row is 48px minimum, hairline below.
- One accent at a time — the violet bar appears on the focused row, only.
- Sharp 4px corners; no shadows on cards; menu/modal are the only elevated surfaces.
- No emoji. Tabular numbers in JetBrains Mono. Sentence case throughout.
