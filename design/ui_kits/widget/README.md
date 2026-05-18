# OS Mobile Widget UI Kit

A glanceable companion to OS desktop. Three states, one screen each, all interactive.

## States

| State | Purpose |
|---|---|
| **Today** (default) | Scrollable list of today's tasks, dailies, and habits. Streak chip in header. Floating violet `+` button (FAB) to add. |
| **Quick-add** | Bottom sheet over the today screen (backdrop-blur). Title input + type chooser (Task / Habit / Event / Daily) + date / time / priority chips. |
| **Edit task** | Full-screen detail. Back ←  / Save in nav. Title + description, Schedule (date/time), Classification (goal/priority/tags), Delete. |

## What's intentionally missing

- No goal management — desktop only.
- No analytics, calendar, or settings — those are desktop screens.
- No multi-step composer or rich-text description. One title + a few chips.

## Files

| File | Purpose |
|---|---|
| `index.html` | Entry — mounts three iOS frames side-by-side. |
| `styles.css` | Widget styles. |
| `widget.jsx` | `WidgetToday`, `WidgetQuickAdd`, `WidgetEdit`, `InteractiveWidget` (state shell). |
| `app.jsx` | The kit canvas — header + three labeled frames. |
| `ios-frame.jsx` | iOS device shell (starter). |
