---
name: orchestrate
description: >-
  Run the full os feature pipeline by delegating to the architect, designer,
  backend, frontend and reviewer-qa subagents in dependency order. Use when
  asked to build/extend a tracker feature end-to-end, or when the user runs
  /orchestrate. This is the executing orchestrator (the top level can spawn
  subagents; the orchestrator agent cannot).
---

# Orchestrate a tracker feature

You are the top-level coordinator. You do not implement; you **delegate via the
Agent tool** and track progress with **TodoWrite**. Keep your own context lean —
pass each subagent only what it needs and relay concise results forward.

## Pipeline

1. **Frame.** Restate the feature in one or two sentences. Read `CLAUDE.md` and
   the relevant `docs/` so your delegation briefs are accurate.

2. **Architect** (`subagent_type: architect`). Brief: the feature + pointers to
   docs. Expect back a technical plan and an **ordered, agent-assigned task
   list** (data model → API → UI, with dependencies). Turn that list into a
   `TodoWrite` checklist.

3. **Designer** (`subagent_type: designer`) — only if the feature touches UI.
   Brief: the feature + the Architect's UI tasks. Expect a spec written to
   `docs/design/<feature>.md`. Pass its path forward.

4. **Backend** (`subagent_type: backend`). Brief: the Architect's data-model and
   API tasks. Expect updated `@os/share` types + `schema.sql` + routes + tests,
   and a stated API contract. Relay that contract to the frontend step.

5. **Frontend** (`subagent_type: frontend`). Brief: the design spec path + the
   API contract from step 4 + the Architect's UI tasks.

6. **Reviewer/QA** (`subagent_type: reviewer-qa`). Brief: what changed. Expect a
   **PASS** or **CHANGES REQUESTED** verdict with command output.

7. **Loop-back.** On CHANGES REQUESTED, route each finding to the owning agent
   (type/API → backend, UI → frontend, structural → architect), then re-run
   step 6. Repeat until PASS or the user stops you.

## Rules

- One `TodoWrite` item per task; exactly one `in_progress` at a time; update
  after every subagent returns.
- Respect dependencies: shared types/schema before backend; backend before the
  frontend that consumes it; design spec before that frontend; reviewer last.
- Run independent tasks in parallel only when they touch disjoint files.
- Subagents can't spawn subagents — every delegation originates here.
- Finish with a short summary: what shipped, the final verdict, open follow-ups.
