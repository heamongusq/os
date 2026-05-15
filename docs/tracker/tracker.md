The task subsystem should have several entities:
- Goal
- Task
- Event
- Habit
(GTEH)

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

Class Events extends Point - events during the day.  
- Slept well, yes/no  
- Went to bed before 11  
- and other user-defined events  

class Task extends BaseTaskPoint (can have child Tasks, can be separate or in Goal; child status does not affect Task status)  
- Tags (keystone, milestone)

В MVP фокус только на Goal, Habit и Task без подзадач кроме Task->Task, повторяющихся задач кроме Habit, проектов/эпиков, уведомлений. Прогресс Goal не рассчитываем.

Сделай вбыор вида задачи  Taskm goal и тд в виде button group

## UI
каждая сущность GTEH кроме Goal отображается в отдельном столбце
Goal - выступает в роль родительской сущности, если она есть у TEH. У goal нет своего столбца. При создании teh можно выбирать goal, к которому он будет привязан. Если goal не выбран, teh будет отображаться в столбце без привязки к цели.

reference отображения сущносте в task reference.png
при наведении также отображаются карандаш и корзина для редактировани и удаления соответственно
при нажатии на наименование есть возможность изменить название TEH
редактирование Получение и редактирование списка goal доступно при нажатии на кнопку в верху экрана, рядом с кнопкой "добавить"

например для task
Goal - Семья
  - познакомиться с новой девушкой Тэг Семья. иконка с отображением важности 
  - Пригласить на свидание Тэг Семья. иконка с отображением важности 

На странице должны уместиться столбцы;
- Habbit
- Task
- Event
