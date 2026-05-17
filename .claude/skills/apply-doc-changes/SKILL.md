---
name: apply-doc-changes
description: >-
  Detect changes in docs/ and propagate them through the whole os project so
  the code matches the docs — shared types, SQLite schema, backend routes,
  frontend stores/pages/router/UI, and every touched index.md — then verify
  typecheck + tests. Use whenever the user edits docs/ (e.g. tracker.md) and
  says "apply doc changes / update the project to the docs", or runs
  /apply-doc-changes.
---

# Sync the os project to docs/

`docs/` is the source of truth. Your job: find what changed in the docs and
make the codebase correspond to it, end to end, leaving the build green.

## 1. Find the doc delta

Establish what changed, in this order:

1. Uncommitted edits: `git --no-pager diff -- docs/` (and `git status docs/`).
2. If docs are clean but code lags: `git --no-pager log -p -1 -- docs/`, or
   read the relevant docs in full and audit the code for divergence.

Read the changed doc files completely (not just the hunk) so you understand
intent, then write a short **delta list**: each concrete model / API / UI
change to make. Confirm the list with the user only if a change is ambiguous
or destructive; otherwise proceed.

## 2. Map doc → code

| Doc | Code to update |
|---|---|
| Entity model in `docs/tracker/tracker.md` (Point/GTEH/ATask hierarchy, fields) | `src/share/src/point.ts`, `entities.ts`, `dto.ts` |
| Persistence implied by the model | `src/backend/src/schema.sql` **and** `src/backend/src/repository.ts` (row↔entity map, create/update) — keep `schema.sql` in lockstep with `@os/share` |
| API / CRUD changes | `src/backend/src/routes/*`, `src/backend/src/app.ts`, then `src/frontend/src/api/client.ts` |
| Board / columns / cards / interactions | `src/frontend/src/stores/*`, `src/frontend/src/pages/*`, components |
| Sidebar tabs / settings (`docs/tracker/index.md`) | `src/frontend/src/router/*`, `src/frontend/src/layouts/*`, settings store/page |
| New subsystem in `docs/index docs.md` | new module/package; escalate via the Architect |
| Any touched subdirectory | its `index.md` (project rule: every subdir has an accurate `index.md`) |

## 3. Apply

- **Small, localized change** (a field, a column rename, a UI tweak): apply
  directly following the map above.
- **Cross-cutting / new entity / new subsystem**: run the **`/orchestrate`**
  skill (architect → backend → frontend → reviewer-qa) instead of editing ad hoc.

Invariants — never violate while applying:

- `@os/share` is the only definition of entity/DTO shapes; `schema.sql` mirrors
  it (single `points` table discriminated by `type`).
- Backend: thin routes, data access via `repository.ts`, explicit `.js` ESM imports.
- Frontend: composition API + Vuetify; backend access only via the api client
  + Pinia stores; `@/` alias.
- TS literal-union gotcha: an interface can't `extends` another whose `type`
  literal differs — re-base on `BaseTaskPoint`/`Point` instead.
- Schema edits use `CREATE TABLE IF NOT EXISTS`, so they do **not** alter an
  existing `data/os.db`. If columns/constraints changed, tell the user to
  delete the gitignored `data/os.db` (or add an explicit migration) and note it.

## 4. Verify (required, from repo root)

```
npm run typecheck      # share + backend + frontend, must be clean
npm test               # must pass
```

If the user wants it running, restart cleanly:

```
pkill -f vite; pkill -f 'tsx watch'
rm -rf node_modules/.vite src/frontend/node_modules/.vite
npm run dev            # backend :3000 + frontend :5173 (proxy /api)
```

Then smoke-test any changed endpoint via the proxy
(`curl http://localhost:5173/api/...`).

## 5. Report

State: which doc(s) changed, the code changed per layer, the verification
output, and any requirement still in the docs but **not yet implemented**
(explicit gap list) so nothing silently drifts.
