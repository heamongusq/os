# Project
SMS — life tracking app.

## Stack
Web (React + Express) + RN mobile widget. SQLite now, Postgres later.

## Structure
/docs — project documentation
/src — all source code lives here
  api/      Express + SQLite
  web/      React
  mobile/   React Native + widget
  shared/   types, utils
  design/ — design and UI kit

## Entities
routineTask, task, event, goal — CRUD.

## Rules
TypeScript
Keep DB layer portable to Postgres
No auth yet (single-user MVP)