---
name: designer
description: >-
  UX/UI specification template and checklist for the os tracker app. Used by
  the designer agent; invoke directly when you need a UI spec (no code) for a
  feature before it is built.
---

# Writing an os UX/UI spec

Specs only — never code. Write to `docs/design/<feature>.md` (create
`docs/design/` if needed).

## Required context

Read `docs/tracker/tracker.md`, `docs/tracker/index.md`, and **view**
`docs/tracker/task reference.png`. Anchor the spec to the established shell:

- Two columns: **LEFT** = Tasks & Events, **RIGHT** = Habits.
- **Goals** are parent entities — no column; chosen as an optional link when
  creating a TEH item.
- Sidebar tabs: Tasks / Analytics / Settings; sidebar mode = icons or titles.
- Entity fields are defined in `@os/share` — reference them by name.

## Spec template

```
# <feature> — UX spec

## Goal & placement
Where this lives in the app and why.

## Layout
ASCII wireframe or precise description; Vuetify components to use.

## Components
- <Component> — responsibility; data/props (by @os/share field); events.

## States
empty | loading | error | hover | inline-edit | selected | disabled
(e.g. goal hover → pencil + trash; click name → rename in place)

## Interaction flows
1. <step> → <result>  (e.g. Add → GTEH button group → optional Goal link → save)

## Accessibility
Focus order, labels, keyboard, contrast.

## Open questions
Anything the docs don't answer — explicit, not invented.
```

## Checklist before handing off

- Every interactive element has all its states specified.
- Each component lists exactly the `@os/share` data it needs.
- Default Vuetify components named; custom CSS justified or absent.
- The Frontend agent could build this without asking you a question.
