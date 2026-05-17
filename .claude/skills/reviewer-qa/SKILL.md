---
name: reviewer-qa
description: >-
  Review checklist and verification gate for os changes (conventions + full
  typecheck/test run). Used by the reviewer-qa agent; invoke directly to review
  and verify a change before it is considered done.
---

# os review & QA gate

Nothing is done until this passes. Be specific; cite `file:line`.

## Review checklist

**Project rules (`CLAUDE.md`)**
- All code under `src/`; nothing leaks elsewhere.
- Every touched subdirectory still has an accurate `index.md`.
- Package boundaries respected (frontend ⟂ backend; both depend on `@os/share`).

**Types**
- `@os/share` is the only definition of entity/DTO shapes.
- `src/backend/src/schema.sql` matches the `@os/share` model.

**Backend**
- Thin routes; data access via `repository.ts`; explicit `.js` ESM imports.
- DB never opened at import time; tests use `openDb(':memory:')` + `app.inject`.

**Frontend**
- Composition API + `<script setup lang="ts">`; Vuetify components; no stray CSS.
- Backend access only via `src/api/client.ts` + Pinia stores.

**Fidelity**
- Behavior matches `docs/design/*` and the Architect's plan/ADR, including all
  UI states.

## Gate (run from repo root)

```
npm run typecheck
npm test
```

## Verdict

End with **PASS** or **CHANGES REQUESTED**, paste the command output that
proves it, and list findings by severity (blocker / major / minor). Fix
mechanical regressions yourself; escalate design/architecture concerns to the
Architect rather than reworking silently.
