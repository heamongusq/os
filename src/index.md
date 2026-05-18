# src

All source code for the **os** life-management app lives here. The repo is an
npm workspace monorepo with three packages:

- [share/](share/index.md) — `@os/share`: TypeScript types shared by frontend
  and backend (the Point entity hierarchy and request/response DTOs).
- [backend/](backend/index.md) — `@os/backend`: Node + TypeScript API
  (Fastify) with SQLite persistence via `better-sqlite3`.
- [frontend/](frontend/index.md) — `@os/frontend`: Vue 3 (composition API) +
  Vuetify + TypeScript SPA built with Vite.