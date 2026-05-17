---
name: backend
description: >-
  Implementation patterns and definition of done for the os backend (Fastify +
  better-sqlite3 + ESM). Used by the backend agent; invoke directly when adding
  or changing an endpoint, repository function, or the SQLite schema.
---

# os backend conventions

Stack: Node + TypeScript (ESM), Fastify 5, better-sqlite3, Vitest. Run in dev
with `tsx` (no build step). Everything under `/api`.

## Patterns

- **Types**: import entity/DTO shapes from `@os/share`. Never redefine them.
- **Schema lockstep**: any `@os/share` entity change ships with the matching
  `src/backend/src/schema.sql` change in the same edit. One `points` table
  discriminated by `type`; `goal_links` for Goal↔Goal.
- **Thin routes**: a route validates/extracts, calls a `repository.ts`
  function, maps the result to a status. No SQL in route files.
- **Repository**: prepared statements; map rows ↔ `AnyPoint` in
  `repository.ts`. JSON columns (`tags`, `flags`, `frequency`,
  `completion_dates`) are stringified there.
- **ESM**: internal imports use explicit `.js` extensions.
- **App factory**: add routes in `src/app.ts` via `buildApp(db)`; never open a
  DB at import time so tests can inject `openDb(':memory:')`.

## Adding an endpoint

1. Update `@os/share` (type/DTO) + `schema.sql` together if the model changes.
2. Add/extend a `repository.ts` function with a prepared statement.
3. Add the route to the relevant plugin in `src/routes/`, registered in
   `src/app.ts`.
4. Add a Vitest test in `src/backend/test/` using `app.inject` against an
   in-memory DB.

## Definition of done

- `npm run typecheck --workspace @os/backend` — clean.
- `npx vitest run src/backend` — green.
- Report the resulting API contract for the Frontend agent.
