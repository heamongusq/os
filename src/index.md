# src

All source code for the **os** life-management app lives here. The repo is an
npm workspace monorepo with three packages:

- [share/](share/index.md) — `@os/share`: TypeScript types shared by frontend
  and backend (the Point entity hierarchy and request/response DTOs).
- [backend/](backend/index.md) — `@os/backend`: Node + TypeScript API
  (Fastify) with SQLite persistence via `better-sqlite3`.
- [frontend/](frontend/index.md) — `@os/frontend`: Vue 3 (composition API) +
  Vuetify + TypeScript SPA built with Vite.

## Conventions

- Every subdirectory contains an `index.md` describing its contents (project rule).
- Cross-package type sharing goes through `@os/share` only — never duplicate
  entity shapes in `backend` or `frontend`.
- Run everything from the repo root: `npm run dev`, `npm test`, `npm run typecheck`.
