The task subsystem should have several entities:
- Goal
- Task
- Event
- Habit
- Daily Task
ATask - short name with out goal
GTASK - short name with Goal

It is necessary to implement CRUD for all these entities.

Approximate structure:

abstract class Point  
- Title (required)  
- Tags (combine categories and tags for filtering, with possible extensions - color, etc.)  
- Priority (low, medium, high, highest)  
- Creation time  
- Completion time  
- Execution date (optional)  
- Status (Created, In Progress, Overdue, Canceled, Completed)  
- Relations: parent (link to parent), children (list of child Points)  

abstract class BaseTaskPoint extends Point  
- Description (displayed only in details)  

class Goal extends BaseTaskPoint (can have Task/Habit as children, can be linked to other Goals many-to-many; child status does not affect Goal status)  
- Tags (LifeGoal/Infinity, milestone)  

class Habit extends Point (repeating task, no children, no description; each completion = Point completion for analytics; list of completion dates for recent time/since last streak for display)  
- Tags (Keystone)  
- Frequency (day, week, month, specific weekdays)  
- Streak count  
- Completion dates (list of completion dates)  

class DailyTask extends Task - task for every day like:
- im a fell that Slept well
- Went to bed before 11  
- and other user-defined

Class Events extends Point - events during the day.  
- work morning 8-12
- lanch break
- work day 13-17
- dating with a girl 19:00


class Task extends BaseTaskPoint (can have child Tasks, can be separate or in Goal; child status does not affect Task status)  
- Tags (keystone, milestone)

Chose of type - GTask as button group

## UI
2 columns
LEFT: 1 column - Tasks includes tasks, daily tasks and events
RIGHT: 1 column - HABBITS

Goal - acts as a parent entity, if it is in ATASK. Goal has no in columns. On create ATASK user can chose a goal, for link.

ui reference ATASK entity in "task reference.png"

Hovering over a goal also displays a pencil and trash bin for editing and deleting, respectively.
Clicking on a name allows you to change the ATASK name.
Editing: Receiving and editing the goal list is available by clicking the button at the top of the screen, next to the "Add" button.

