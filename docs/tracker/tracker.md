The task subsystem should have several entities:
- Goal
- Task
- Event

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

abstract class BaseTask extends BaseTaskPoint
- goals - array of Goal tasks
- Description (displayed only in details)


class Task extends BaseTask (can have child Tasks, can be separate or in Goal; child status does not affect Task status)  
- tasks - simple tasks like checklist
- Frequency (day, week, month, specific days = [mon, sut] as example)
- Streak count

if Task has frequence she taged by "routine"
default routine task: Slept well

class Goal extends BaseTask (can have Task as children, can be linked to other Goals many-to-many; child status does not affect Goal status)
- color - for paint in ui

Class Events extends BaseTask - events during the day.  
- work morning 8-12
- lanch break
- work day 13-17
- dating with a girl 19:00

Chose of task type as button group when add new task

## UI
list of tasks and events by day
like a google tasks
Clicking on a name allows you to change item.
Goal - acts as a parent entity, On create user can chose a goal, for link.

