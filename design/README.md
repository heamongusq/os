# OS — Design System

**OS** is the operating system for your life. An advanced to‑do app with goals, habits, events, daily tasks, streaks, and analytics — built for people who treat their days as a system to be tuned, not a list to be cleared.

> **Tagline candidates** — *Operate your life.* / *The system for your days.* / *Less list. More system.*

## Products in scope

| Surface | Purpose | Notes |
|---|---|---|
| **Desktop web app** | Primary surface. Two‑column workspace (Tasks ‖ Habits), Goals as parent entities, Analytics, Calendar, Settings. | Light + dark, serif‑forward, data‑calm. |
| **Mobile widget** | Glanceable companion. CRUD + complete only. | Three states: Today (default), Quick‑add, Edit task. |

## Entity model (from product spec)

The task subsystem is built around five entity types, all descended from an abstract `Point`:

- **Goal** — a long‑horizon parent. Can contain Tasks and Habits. Children's status does not affect parent status. Linkable to other Goals (many‑to‑many). Tags: `LifeGoal`, `Infinity`, `milestone`.
- **Task** — the workhorse. The composer's type chooser only ever exposes **Task / Habit / Event / Daily**. A Task without a linked Goal is informally called an **ATASK**; a Task with a linked Goal is informally called a **GTASK** — these are *designations*, not separate types.
- **DailyTask** — a `Task` that recurs every day. Examples: *"Slept well", "In bed before 11"*. Completed like a Task.
- **Event** — a fixed time block on the day. Examples: *"Work — morning 8–12", "Lunch", "Dinner with M, 19:00"*.
- **Habit** — repeating Point, no children, no description. Each completion is a Point for analytics; tracks streak count and completion dates. Tags: `Keystone`. Frequency: day / week / month / specific weekdays.

All Points share: title, type, tags, priority (low / medium / high / highest), creation time, completion time, execution date (optional), status (Created / In Progress / Overdue / Canceled / Completed), parent + children relations.

### UI structure (canonical)

- **Two columns** on Today.
  - **Left column:** **Tasks** + **Daily tasks** + **Events** (three clearly labeled sub‑sections).
  - **Right column:** **Habits**.
- **Goals** are not a column — accessed via a button at the top, next to **Add**.
- **Add** opens a composer with a type segmented control (**Task / Habit / Event / Daily**). When the type is Task or Daily, a `Link goal?` chip lets the user attach a Goal (turning the task into a "GTASK"; otherwise it's an "ATASK").
- Hover on a row reveals a **pencil** (edit) and **trash** (delete). Click on the title to inline‑rename.

## Sources & references

- **`task reference.png`** — referenced by the user but not yet attached. ⚠️ *Once provided, re‑check task row spec against it.*
- No Figma file, codebase, or screenshots were attached. Visual language was derived from the answers to the direction questionnaire (see top of file).

---

## Brand essence

- **Name:** OS (initialism for *Operating System*; pronounced "oh‑ess").
- **Mental model:** life is a system. Goals are programs. Tasks are processes. Habits are daemons. Analytics is `top`.
- **Audience:** operators of their own lives — long‑termists, builders, students, anyone whose calendar is the unit of progress.
- **Tone in one line:** *Calm, exact, slightly philosophical. No exclamation marks.*

---

## Index of this folder

```
README.md                  ← you are here
SKILL.md                   ← Claude Code / agent skill entrypoint
colors_and_type.css        ← all design tokens (CSS vars) + @font-face
fonts/                     ← webfont files (Google Fonts mirrored)
assets/                    ← logos, marks, illustrations, icon notes
preview/                   ← registered cards for the Design System tab
ui_kits/
  desktop/                 ← full desktop web app (Today / All / Calendar / Analytics / Settings)
  widget/                  ← mobile widget (Today / Quick‑add / Edit)
```

Detailed sections below: **Content Fundamentals**, **Visual Foundations**, **Iconography**.

---

## Content Fundamentals

OS speaks like a competent system, not a cheerleader. The reader is treated as the operator — they know what they're doing, they just need the interface out of the way.

### Voice

- **Dry, exact, slightly philosophical.** A long‑term tool, not a productivity gimmick.
- **No exclamation marks.** Ever. Not in microcopy, not in empty states, not in toasts.
- **No emoji.** OS expresses state through type, color, and icon — not pictograms.
- **No hype words.** Avoid *amazing, awesome, crushing it, smash, supercharge, hustle*.
- **No moralizing about productivity.** "You're doing great" is a violation. Show the data; let the user decide.

### Casing

- **Sentence case** everywhere — buttons, menu items, headings. Never Title Case.
- **All‑caps** is reserved for tiny labels (`PRIORITY`, `STREAK`, `LAST 7 DAYS`) set in mono with positive letter‑spacing.
- **Numbers** are tabular — counts, percentages, dates — and always set in `JetBrains Mono`.

### Person & address

- **Second person, but sparingly.** Prefer object‑first headings ("Today", "This week") over "Your day". Use "you" only when an action is being requested or a question asked.
- **First person plural ("we") is forbidden.** OS is not a team that loves you.

### Specific examples

| Context | Yes | No |
|---|---|---|
| Empty state, Today | *Nothing scheduled. Add a task or pull from your inbox.* | *Yay, you're all caught up! 🎉* |
| Empty state, Habits | *No habits yet. Habits compound; start with one.* | *Build your first habit and watch yourself grow!* |
| Completion toast | *Marked complete · 14:02* | *Nice work! Task done 🚀* |
| Streak achievement | *Streak: 30 days. Don't talk about it.* | *Amazing! 30 day streak unlocked!* |
| Destructive confirm | *Delete this goal? Its tasks will be unlinked, not deleted.* | *Are you sure you want to delete? This action is irreversible!* |
| Overdue badge | *Overdue · 3 days* | *Oops! You're behind!* |
| Onboarding | *Define a goal. Or don't — tasks work standalone.* | *Welcome! Let's set up your account in 3 easy steps!* |
| Settings header | *Preferences* | *Make OS yours* |
| Save button | *Save* | *Save changes* |
| Add button | *Add* | *+ Create new task* |

### Headlines & section titles

Section titles are nouns, never sentences. *Today. Habits. Analytics. Preferences.*

Page headlines can use serif italic for a single emphasized word — `Operate <em>your</em> day.` — but never more than one.

### Date & time

- **Today / Tomorrow / Yesterday** for ±1 day.
- **Day of week** (Mon, Tue) within the current week.
- **Month + day** (Mar 14) beyond that.
- **Year** only when not the current year.
- Time is 24h by default, settable to 12h. Always `HH:MM`, never `HH:MM:SS`.

---

## Visual Foundations

### Color

The palette is a high‑contrast monochrome scale + a single **electric violet** signal color. Light and dark are first‑class — every token has both values.

- **Backgrounds:** warm off‑white in light mode (`#FAFAF7`), deep ink‑navy in dark mode (`#0B0E1A`). Never pure white, never pure black.
- **Foreground scale:** four steps (`fg-1 … fg-4`) from primary text to disabled.
- **Accent:** **`--violet-500: #7C5CFF`** — used for selection, focus rings, primary CTAs, streak indicators, and the active state of any toggle. Used **once per view** as a focal point; never as decoration.
- **Semantics:** `success` (jade) for completion / streak‑alive, `warning` (amber) for overdue, `danger` (clay red) for destructive only. Muted and earthy, never saturated.
- **Hairlines:** `border-1` is the workhorse divider — a 1px line at ~10% contrast. Cards and rows rely on hairlines, not shadows, to define space.

### Type

- **Newsreader** (Google Fonts, variable, optical size 6–72) — display, body, task titles, headings. The serif voice of the system.
- **JetBrains Mono** — every number, timestamp, tag, keyboard shortcut, and tiny label.
- No sans‑serif. The serif is doing all the textual work; the contrast comes from mono.
- **Italic** is meaningful — used for the single emphasized word in a headline, for parenthetical hints, and for system messages ("*nothing scheduled*").
- **Optical size** matters: large display (`opsz: 72`) for page headlines, body (`opsz: 14`), captions (`opsz: 6`). The CSS uses `font-variation-settings`.

### Spacing

8‑point grid with a 4‑point half‑step. Tokens: `--s-1: 4px` through `--s-10: 80px`. The most‑used values are 8 / 12 / 16 / 24.

### Corners

Defaults to **`4px`**. Sober, not rounded. Pills (chips, segmented controls) use `--radius-pill: 999px`. Avatars and circular controls are full circles. Sharp 0px corners on charts and the calendar grid.

### Shadows

OS uses **hairlines first, shadows last.** When shadow is necessary (menus, dialogs, hover states on draggable rows), it is soft, single‑axis, and short:

- `--shadow-1`: floating row on hover (`0 1px 0 fg/4%`)
- `--shadow-2`: menu / popover (`0 8px 24px ink/12%`)
- `--shadow-3`: modal (`0 24px 64px ink/24%`)

No glow. No double shadow. No neumorphism.

### Backgrounds & textures

- **Backgrounds are flat.** No gradients except a single subtle radial in the analytics hero (10% violet → transparent) used once per app.
- No imagery, no illustration, no decorative patterns. The product is the content.
- A **2px violet vertical bar** marks the currently‑focused row (the "process indicator"). It is the closest thing OS has to a logo motif.

### Animation

- **Eased, never bouncy.** Default `cubic-bezier(.2, .6, .2, 1)`, 160ms.
- **Fade + 2px translate** for entrances. No scale, no rotation, no parallax.
- **Checkbox** completion is the one place with character: a 220ms strike‑through of the title, the row fades to fg‑3, and the row slides down into Completed.
- **Streak counter** ticks up like an odometer — numbers slide vertically inside their cells. Tasteful, not flashy.
- Respects `prefers-reduced-motion: reduce` — all motion collapses to instant.

### Interaction states

- **Hover:** background shifts to `--bg-2` (a half‑step lift). Icons appear; they were hidden at rest.
- **Press:** no scale; background shifts to `--bg-3` for the 100ms the pointer is down.
- **Focus:** **2px violet ring**, offset 2px. Visible on every focusable element. No removing outlines.
- **Selected:** 1px violet border + violet‑tinted background (3% alpha). Used for the active task in the list and the active calendar cell.
- **Disabled:** opacity 0.45 on text, no pointer cursor. No grayed‑out background.

### Borders & lines

- **1px hairlines** between rows in lists, between cells in the calendar, and at the bottom of headers.
- Hairlines are `currentColor` at low alpha so they adapt to light/dark automatically.
- The **2px violet bar** on the focused/active row is the only thick line in the system.

### Transparency & blur

- Used **sparingly**. Only the Quick‑add overlay on the widget uses backdrop‑blur (12px). The desktop has no blur surfaces.
- Modal scrims are flat ink at 40% alpha — no blur.

### Layout rules

- **Desktop:** fixed sidebar (240px) + main canvas. Main canvas has a maximum content width of 1080px, centered when the viewport is wider.
- **Two‑column rule** for Today: Tasks (60%) ‖ Habits (40%), gap 32px. Never reorder.
- **Calendar** uses the full canvas width.
- **Mobile widget:** 360×640 viewport target. Single column. Sticky header (Today + date). Sticky composer at bottom.

### Cards

OS doesn't really use cards. The fundamental unit is the **row** — a 48px‑tall horizontal element with a hairline below. Cards exist only in Analytics and Settings, and they are:

- 1px hairline border (no shadow at rest)
- 4px corner radius
- `--bg-1` fill (matches page)
- 16–24px internal padding
- A single small all‑caps mono label in the top‑left corner identifies them

### What OS is not

- Not playful. Not colorful. Not gamified.
- Not skeuomorphic — no paper, no notebook, no leather, no checklist illustrations.
- Not glassmorphic. Not neumorphic.
- Not a dashboard product. Analytics is a **single page**, not a tile farm.

---

## Iconography

OS uses **[Lucide](https://lucide.dev)** — a single icon system, used consistently, no mixing.

- **Library:** Lucide via CDN (`https://unpkg.com/lucide@latest`). 1000+ icons, MIT licensed.
- **Stroke:** 1.5px (Lucide default is 2; OS overrides to 1.5 for the serif aesthetic — finer lines, calmer feel).
- **Size:** 16px in rows and buttons, 20px in section headers, 24px in empty states. No larger.
- **Color:** inherits `currentColor`. Never tinted with the accent except on the active sidebar item.
- **No emoji.** No unicode symbols as icons (no `✓`, no `★`, no `→`). Lucide has them all.
- **No custom SVG.** If Lucide doesn't have it, we don't ship it — we either rephrase, use text, or request a new icon from Lucide upstream.

**Common mappings**
| Concept | Lucide name |
|---|---|
| Today / inbox | `inbox` |
| All tasks | `list` |
| Calendar | `calendar` |
| Analytics | `bar-chart-2` |
| Settings | `settings` |
| Goal | `target` |
| Habit | `repeat` |
| Event | `clock` |
| Daily task | `sunrise` |
| Add | `plus` |
| Edit | `pencil` |
| Delete | `trash-2` |
| Streak alive | `flame` |
| Completed | `check` |
| Overdue | `alert-triangle` |
| Filter | `sliders-horizontal` |
| Search | `search` |
| Drag handle | `grip-vertical` |

A copy of the relevant Lucide SVGs lives in `assets/icons/` for offline use. The CDN is the primary source.

### Caveats — font substitutions

- The user did not provide any webfonts. Both **Newsreader** and **JetBrains Mono** are loaded from Google Fonts. If a different serif (e.g. Tiempos, GT Sectra, Söhne) is desired, swap the `--font-serif` token in `colors_and_type.css` and replace the `@font-face` import. **⚠️ Flag for user review.**
