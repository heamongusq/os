# adr

Architecture Decision Records for the **os** project. One file per decision,
named `<n>-<slug>.md`, ordered by `<n>`.

- [1-tracker-data-model.md](1-tracker-data-model.md) — the Point entity
  hierarchy in `@os/share` and the SQLite schema (`points` + `goal_links` +
  `habit_completions` + `tags` + `point_tags`). Data model only; backend
  routes and UI are deferred to later ADRs.
