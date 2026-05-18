// OS Desktop — app root, state, routing

const { useReducer } = React;

function reducer(state, action) {
  switch (action.type) {
    case "view":
      return { ...state, view: action.view };
    case "toggleTask":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, done: !t.done, doneTime: !t.done ? "now" : null } : t
        ),
      };
    case "renameTask":
      return {
        ...state,
        tasks: state.tasks.map((t) => (t.id === action.id ? { ...t, title: action.title } : t)),
      };
    case "deleteTask":
      return { ...state, tasks: state.tasks.filter((t) => t.id !== action.id) };
    case "addTask": {
      const d = action.data;
      const id = "t" + Math.random().toString(36).slice(2, 7);
      const next = {
        id,
        title: d.title,
        kind: d.type === "daily" ? "daily" : "task",
        goalId: d.goalId,
        priority: d.priority,
        time: null,
        tags: [],
        done: false,
        today: d.date === "Today",
      };
      return { ...state, tasks: [next, ...state.tasks] };
    }
    case "toggleHabit":
      return {
        ...state,
        habits: state.habits.map((h) =>
          h.id === action.id
            ? {
                ...h,
                completedToday: !h.completedToday,
                streak: !h.completedToday ? h.streak + 1 : Math.max(0, h.streak - 1),
                last7: [...h.last7.slice(0, 6), !h.completedToday ? 1 : 0],
              }
            : h
        ),
      };
    case "deleteHabit":
      return { ...state, habits: state.habits.filter((h) => h.id !== action.id) };
    case "deleteEvent":
      return { ...state, events: state.events.filter((e) => e.id !== action.id) };
    case "addGoal": {
      const id = "g" + Math.random().toString(36).slice(2, 7);
      return { ...state, goals: [...state.goals, { id, title: action.title, children: 0, progress: 0 }] };
    }
    case "deleteGoal":
      return {
        ...state,
        goals: state.goals.filter((g) => g.id !== action.id),
        tasks: state.tasks.map((t) => (t.goalId === action.id ? { ...t, goalId: null } : t)),
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    ...SEED,
    view: "today",
  });

  const counts = {
    today: state.tasks.filter((t) => t.today && !t.done).length,
    all: state.tasks.filter((t) => !t.done).length,
    analytics: null,
    calendar: null,
    settings: null,
  };

  let screen;
  switch (state.view) {
    case "today":     screen = <Today     state={state} dispatch={dispatch} />; break;
    case "all":       screen = <AllTasks  state={state} dispatch={dispatch} />; break;
    case "calendar":  screen = <Calendar  state={state} dispatch={dispatch} />; break;
    case "analytics": screen = <Analytics state={state} dispatch={dispatch} />; break;
    case "settings":  screen = <Settings  />; break;
    default:          screen = <Today     state={state} dispatch={dispatch} />;
  }

  return (
    <div className="app" data-screen-label={state.view}>
      <Sidebar
        view={state.view}
        setView={(v) => dispatch({ type: "view", view: v })}
        counts={counts}
        goals={state.goals}
      />
      <main className="main" data-screen-label={state.view}>
        {screen}
      </main>
      <ThemeToggle />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
