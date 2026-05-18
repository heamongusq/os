The task subsystem should have several entities:
- Goal
- Task
- Event
- Routine Task

It is necessary to implement CRUD for all these entities.

Approximate structure:

abstract class Point  
- Title (required)  
- Tags (combine categories and tags for filtering)  
- Priority (low, medium, high, highest)  
- Creation time  
- Completion time  
- Execution date
- Status (Created, In Progress, Overdue, Canceled, Completed)  
- Relations: parent (link to parent), children (list of child Points)  

abstract class BaseTaskPoint extends Point  
- Description (displayed only in details)

abstract class BaseTask extends BaseTaskPoint
- goals - array of Goal tasks

class Task extends BaseTask (can have child Tasks, can be separate or in Goal; child status does not affect Task status)  
- tasks - simple tasks like checklist

class Goal extends BaseTaskPoint (can have Task as children, can be linked to other Goals many-to-many; child status does not affect Goal status)  
- color - for paint in ui

class RoutineTask extends BaseTask - a recurring routine task like: im a fell that Slept well, Went to bed before 11, and other user-defined. This entity can be completed as a Task
description; each completion = Point completion for analytics; list of completion dates for recent time/since last streak for display)  
- Frequency (day, week, month, specific weekdays)  
- Streak count  
- Completion dates (list of completion dates)  

Class Events extends BaseTask - events during the day.  
- work morning 8-12
- lanch break
- work day 13-17
- dating with a girl 19:00

Chose of task type as button group when add new task

## UI
Page with tasks. Includes tasks, routine tasks and events

Goal - acts as a parent entity, On create user can chose a goal, for link.

Clicking on a name allows you to change item title.

