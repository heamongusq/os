---
name: architect
description: >-
  Method and output template for planning an os tracker feature: data model,
  API contract, and an ordered agent-assigned task list. Used by the architect
  agent; invoke directly when you need a technical plan without full execution.
---

# Architecting an os feature

## Method

1. Read the request, `CLAUDE.md`, `docs/tracker/*`, and the `index.md` of every
   package you expect to touch. Note anything under-specified — list it, don't
   guess.
2. Model the data first. Decide the `@os/share` type/DTO changes and the
   matching `src/backend/src/schema.sql` change together; they must stay in
   lockstep (single `points` table, discriminated by `type`; `goal_links` for
   Goal↔Goal).
3. Define the API contract: routes, methods, request/response shapes named in
   terms of `@os/share` DTOs.
4. Decompose into the smallest tasks that one agent can own end-to-end.
5. Sequence by dependency and assign each task to one agent.

## Output template

Write the plan to `docs/adr/<n>-<slug>.md` (create `docs/adr/` if needed) and
end your final message with the task list.

```
# <feature>

## Summary
<2–4 sentences>

## Data model
- @os/share: <types/DTOs to add or change>
- schema.sql: <columns/tables/indexes>

## API contract
- <METHOD> /api/<path> — <request> → <response> (DTOs from @os/share)

## UI impact
- <pages/components affected; defer detail to the Designer>

## Open questions / risks
- <...>

## Task list (ordered)
1. [backend]  <task> — depends on: —
2. [designer] <task> — depends on: —
3. [frontend] <task> — depends on: 1, 2
4. [reviewer-qa] gate — depends on: all
```

## Rules

- Plans and ADRs only (`docs/`). Never edit implementation files in `src/`.
- Every task names exactly one owner agent and its dependencies.
- Order: shared types/schema → backend → frontend; design specs precede the
  frontend that implements them; reviewer-qa is always last.
