// OS Mobile Widget — Home-screen tile (Google Tasks widget style).
// Three states: today (default), add (inline composer), edit (popover over widget).

const { useState: useStateW } = React;

const WI = (p) => {
  const { size = 16, sw = 1.5, ...rest } = p;
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" {...rest}>{p.children}</svg>;
};
const WIcon = {
  Plus:  (p) => <WI {...p}><path d="M12 5v14M5 12h14"/></WI>,
  Check: (p) => <WI {...p}><polyline points="20 6 9 17 4 12"/></WI>,
  Flame: (p) => <WI {...p}><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/></WI>,
  ChevronLeft: (p) => <WI {...p}><polyline points="15 18 9 12 15 6"/></WI>,
  Clock: (p) => <WI {...p}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></WI>,
  Target: (p) => <WI {...p}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></WI>,
  Calendar: (p) => <WI {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></WI>,
  Trash: (p) => <WI {...p}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></WI>,
  Pencil: (p) => <WI {...p}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4z"/></WI>,
  Tag: (p) => <WI {...p}><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></WI>,
  Sunrise: (p) => <WI {...p}><circle cx="12" cy="18" r="3"/><path d="M12 3v9M5.4 10.4l1.4 1.4M17.2 10.4l1.4 1.4M2 18h2M20 18h2"/></WI>,
  List: (p) => <WI {...p}><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></WI>,
  Repeat: (p) => <WI {...p}><path d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3"/></WI>,
};

const TASKS = [
  { id: 1, title: "Plan Q3 goals",          when: "1 hour",  time: "10:00", done: false },
  { id: 2, title: "Apartment viewing",      when: "90 min",  time: "13:00", done: false },
  { id: 3, title: "German vocab · 20",      when: null,      time: "—",     done: true  },
  { id: 4, title: "Read 30 min",            when: null,      time: "22:30", done: false },
];

/* The widget tile — content of the home-screen widget. */
function WidgetTile({ state, onAdd, onCancelAdd, onSaveAdd }) {
  const [tasks, setTasks] = useStateW(TASKS);
  const toggle = (id) => setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  return (
    <div className="widget-tile">
      <div className="wt-head">
        <span className="wt-mark"><span className="dot" />OS</span>
        <span className="wt-date">Today · 3/4</span>
        <span className="wt-streak"><WIcon.Flame /> 142d</span>
        {state === "today" && (
          <button className="wt-add" onClick={onAdd}><WIcon.Plus size={14} sw={2.2}/></button>
        )}
      </div>

      {tasks.slice(0, 4).map((t) => (
        <div key={t.id} className={"wt-row" + (t.done ? " done" : "")}>
          <span
            className={"wt-cb" + (t.done ? " checked" : "")}
            onClick={(e) => { e.stopPropagation(); toggle(t.id); }}
          >
            <WIcon.Check />
          </span>
          <span className={"wt-title" + (t.done ? " struck" : "")}>
            {t.title}{t.when && <> for <span className="when">{t.when}</span></>}
          </span>
          <span className="wt-meta">{t.time}</span>
        </div>
      ))}

      {state === "add" && (
        <div className="wt-compose">
          <input autoFocus placeholder="What needs to happen?" defaultValue="Email Marta about Q3" />
          <div className="chips">
            <span className="chip"><WIcon.Target /> Goal</span>
            <span className="chip active"><WIcon.List /> Task</span>
            <span className="chip"><WIcon.Sunrise /> Daily</span>
            <span className="chip"><WIcon.Clock /> Event</span>
            <span className="chip"><WIcon.Repeat /> Habit</span>
          </div>
          <div className="chips">
            <span className="chip active"><WIcon.Calendar /> Today</span>
            <span className="chip"><WIcon.Clock /> 14:00</span>
            <span className="chip">
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--warning)", display: "inline-block" }} />
              High
            </span>
          </div>
          <div className="actions">
            <button className="cancel" onClick={onCancelAdd}>Cancel</button>
            <button className="save" onClick={onSaveAdd}>+ Add</button>
          </div>
        </div>
      )}

      {state === "today" && (
        <div className="wt-footer">
          <span className="more">+ 3 more in OS</span>
          <span className="open">Open →</span>
        </div>
      )}
    </div>
  );
}

/* Edit popover — appears over widget tile */
function WidgetEdit({ onBack }) {
  return (
    <div className="wt-edit">
      <div className="ed-head">
        <button className="back" onClick={onBack}>
          <WIcon.ChevronLeft size={14} sw={1.8} /> Back
        </button>
        <span className="save" onClick={onBack}>Save</span>
      </div>
      <div className="ed-body">
        <input className="ed-title" defaultValue="Apartment viewing" />
        <div>
          <div className="ed-row"><WIcon.Calendar /><span className="nm">Date</span><span className="val">Today · May 18</span></div>
          <div className="ed-row"><WIcon.Clock />   <span className="nm">Time</span><span className="val">13:00</span></div>
          <div className="ed-row"><WIcon.Target />  <span className="nm">Goal</span><span className="val accent">Move to Berlin</span></div>
          <div className="ed-row"><WIcon.Tag />     <span className="nm">Priority</span><span className="val"><span className="priority-pill">High</span></span></div>
          <div className="ed-row danger" onClick={onBack}><WIcon.Trash /><span className="nm">Delete task</span><span /></div>
        </div>
      </div>
    </div>
  );
}

/* Home screen — wallpaper + weather + widget tile + dock */
function HomeScreen({ initial = "today" }) {
  const [view, setView] = useStateW(initial);

  return (
    <div className="home">
      <div className="home-grid">
        <div className="home-strip">
          <div>
            <div className="day">Monday, May 18</div>
            <div className="city">Berlin</div>
          </div>
          <div className="temp">15°</div>
        </div>

        <div style={{ position: "relative" }}>
          <WidgetTile
            state={view}
            onAdd={() => setView("add")}
            onCancelAdd={() => setView("today")}
            onSaveAdd={() => setView("today")}
          />
          {view === "edit" && (
            <>
              <div className="wt-scrim" onClick={() => setView("today")} />
              <WidgetEdit onBack={() => setView("today")} />
            </>
          )}
        </div>

        <div className="app-grid" style={{ marginTop: "auto", marginBottom: 22 }}>
          <div className="app-icon calendar">18</div>
          <div className="app-icon notes">≡</div>
          <div className="app-icon mail">✉</div>
          <div className="app-icon music">♪</div>
          <div className="app-icon weather">☀</div>
          <div className="app-icon maps">◎</div>
          <div className="app-icon photos">◆</div>
          <div className="app-icon camera">○</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen, WidgetTile, WidgetEdit });
