---
name: frontend
description: >-
  Implementation conventions and definition of done for the os frontend (Vue 3
  composition API + Vuetify + Pinia + Vite). Used by the frontend agent;
  invoke directly when building or changing a component, page, or store.
---

# os frontend conventions

Stack: Vue 3 (`<script setup lang="ts">`, composition API only), Vuetify 3,
Pinia, Vue Router, Vite. `@/` aliases `src/`.

## Patterns

- **Composition API only.** No Options API anywhere.
- **Vuetify first.** Use auto-imported Vuetify components; avoid custom CSS
  unless the design spec explicitly requires it.
- **Data flow**: components → Pinia store → `src/api/client.ts` → backend.
  Components never call `fetch` directly and never hardcode URLs.
- **Types**: entities/DTOs come from `@os/share`. The API client is the typed
  contract; keep it in sync with `src/backend/src/routes`.
- **Structure**: pages in `src/pages/`, reusable UI in `src/components/`,
  layout/nav in `src/layouts/`, state in `src/stores/`, routes in
  `src/router/`.
- **Spec fidelity**: implement the `docs/design/*` spec exactly, including
  empty / loading / error / hover / inline-edit / disabled states. Board rule:
  LEFT = tasks & events, RIGHT = habits, Goals have no column.

## Adding a feature

1. Read the design spec and the backend API contract.
2. Extend/add a Pinia store method that calls `api`.
3. Build components with Vuetify; wire store state + all spec states.
4. Add the route in `src/router/` if it is a new tab/page.

## Definition of done

- `npm run typecheck --workspace @os/frontend` — clean (vue-tsc).
- Pages render against a running or mocked backend; all specified states work.
- Report components/stores added and any contract gaps for the Backend agent.
