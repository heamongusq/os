// OS Desktop — shared components & inline Lucide icons (stroke-1.5)
// Exposed to window so they can be used from screens.jsx and app.jsx.

const { useState, useRef, useEffect, useMemo } = React;

/* =================================================================
   Lucide icons inline. Each is a small functional component that
   takes optional size/strokeWidth/className overrides.
   ================================================================= */
const I = (props) => {
  const { size = 16, sw = 1.5, className = "", children, ...rest } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      {children}
    </svg>
  );
};

const Icon = {
  Inbox: (p) => <I {...p}><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" /></I>,
  List: (p) => <I {...p}><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></I>,
  Calendar: (p) => <I {...p}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></I>,
  Bar: (p) => <I {...p}><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></I>,
  Settings: (p) => <I {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" /></I>,
  Target: (p) => <I {...p}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></I>,
  Repeat: (p) => <I {...p}><path d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" /></I>,
  Clock: (p) => <I {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></I>,
  Sunrise: (p) => <I {...p}><circle cx="12" cy="18" r="3" /><path d="M12 3v9M5.4 10.4l1.4 1.4M17.2 10.4l1.4 1.4M2 18h2M20 18h2" /></I>,
  Plus: (p) => <I {...p}><path d="M12 5v14M5 12h14" /></I>,
  Pencil: (p) => <I {...p}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4z" /></I>,
  Trash: (p) => <I {...p}><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" /><path d="M10 11v6M14 11v6" /></I>,
  Flame: (p) => <I {...p}><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" /></I>,
  Check: (p) => <I {...p}><polyline points="20 6 9 17 4 12" /></I>,
  Warn: (p) => <I {...p}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></I>,
  Filter: (p) => <I {...p}><line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" /></I>,
  Search: (p) => <I {...p}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></I>,
  Grip: (p) => <I {...p}><circle cx="9" cy="5" r="1" /><circle cx="9" cy="12" r="1" /><circle cx="9" cy="19" r="1" /><circle cx="15" cy="5" r="1" /><circle cx="15" cy="12" r="1" /><circle cx="15" cy="19" r="1" /></I>,
  Sun: (p) => <I {...p}><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></I>,
  Moon: (p) => <I {...p}><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></I>,
  ChevronRight: (p) => <I {...p}><polyline points="9 18 15 12 9 6" /></I>,
  ChevronLeft: (p) => <I {...p}><polyline points="15 18 9 12 15 6" /></I>,
  ChevronDown: (p) => <I {...p}><polyline points="6 9 12 15 18 9" /></I>,
  More: (p) => <I {...p}><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></I>,
};

/* =================================================================
   Checkbox
   ================================================================= */
function Checkbox({ checked, onChange }) {
  return (
    <span
      className={"cb" + (checked ? " checked" : "")}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onClick={(e) => { e.stopPropagation(); onChange(!checked); }}
      onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); onChange(!checked); } }}
    >
      <Icon.Check size={12} sw={2.4} />
    </span>
  );
}

/* =================================================================
   Sidebar
   ================================================================= */
function Sidebar({ view, setView, counts, goals }) {
  const items = [
    { key: "today",     label: "Today",      icon: <Icon.Inbox    size={16} /> },
    { key: "all",       label: "All tasks",  icon: <Icon.List     size={16} /> },
    { key: "calendar",  label: "Calendar",   icon: <Icon.Calendar size={16} /> },
    { key: "analytics", label: "Analytics",  icon: <Icon.Bar      size={16} /> },
    { key: "settings",  label: "Preferences", icon: <Icon.Settings size={16} /> },
  ];
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="dot" />
        <span className="mark">OS</span>
        <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.06em" }}>v0.1</span>
      </div>
      <nav>
        {items.map((it) => (
          <div
            key={it.key}
            className={"item" + (view === it.key ? " active" : "")}
            onClick={() => setView(it.key)}
          >
            {it.icon}
            <span>{it.label}</span>
            {counts[it.key] != null && <span className="count">{counts[it.key]}</span>}
          </div>
        ))}
      </nav>
      <div className="section">Goals</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {goals.map((g) => (
          <div key={g.id} className="goal-item">
            <span className="pip" style={g.life ? { background: "var(--accent)", opacity: 1 } : null} />
            <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{g.title}</span>
          </div>
        ))}
        <div className="goal-item" style={{ color: "var(--fg-3)" }}>
          <Icon.Plus size={12} /> <span>New goal</span>
        </div>
      </div>
      <div className="footer">
        <span style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--ink-3)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--fg-2)" }}>K</span>
        <span>kira.li</span>
      </div>
    </aside>
  );
}

/* =================================================================
   Page header
   ================================================================= */
function PageHead({ kicker, title, emph, actions }) {
  return (
    <div className="page-head">
      <div>
        <div className="sub">{kicker}</div>
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
      </div>
      <div className="actions">{actions}</div>
    </div>
  );
}

/* =================================================================
   Task row, Event row, Habit row, DailyTask row
   ================================================================= */
function TaskRow({ task, goal, focused, onToggle, onRename, onDelete, onClick }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(task.title);
  const inputRef = useRef(null);

  useEffect(() => { if (editing && inputRef.current) inputRef.current.focus(); }, [editing]);

  const subParts = [];
  subParts.push(task.kind === "daily" ? "DAILY" : "TASK");
  if (task.tags?.includes("keystone")) subParts.push("KEYSTONE");
  if (task.tags?.includes("milestone")) subParts.push("MILESTONE");

  const isOverdue = task.overdue && !task.done;

  return (
    <div className={"t-row" + (focused ? " focused" : "") + (task.done ? " done" : "")} onClick={onClick}>
      <span className="bar" />
      <Checkbox checked={task.done} onChange={onToggle} />
      <div className="row-body">
        {editing ? (
          <input
            ref={inputRef}
            className="row-title editing"
            style={{ fontFamily: "var(--font-serif)", fontSize: 16, width: "100%", color: "var(--fg-1)" }}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onBlur={() => { onRename(val); setEditing(false); }}
            onKeyDown={(e) => {
              if (e.key === "Enter") { onRename(val); setEditing(false); }
              if (e.key === "Escape") { setVal(task.title); setEditing(false); }
            }}
          />
        ) : (
          <span
            className={"row-title" + (task.done ? " struck" : "")}
            onClick={(e) => { e.stopPropagation(); setEditing(true); }}
          >{task.title}</span>
        )}
        <span className="row-sub">
          {subParts.map((p, i) => (
            <React.Fragment key={p}>
              {i > 0 && <span className="dot" />}
              {p}
            </React.Fragment>
          ))}
          {goal && (<>
            <span className="dot" />
            <span style={{ color: "var(--accent)" }}>→ {goal.title}</span>
          </>)}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {isOverdue && <span className="chip chip--warn">overdue · {task.overdue}d</span>}
        <span className="row-meta">
          {task.done ? `done · ${task.doneTime || "09:14"}` : (task.time || task.due || "—")}
        </span>
      </div>
      <div className="row-actions" onClick={(e) => e.stopPropagation()}>
        <button title="Edit" onClick={() => setEditing(true)}><Icon.Pencil /></button>
        <button title="Delete" className="danger" onClick={onDelete}><Icon.Trash /></button>
      </div>
    </div>
  );
}

function EventRow({ event, onDelete }) {
  return (
    <div className="e-row" onClick={(e) => e.stopPropagation()}>
      <span className="bar" />
      <div className="marker" />
      <div className="row-body">
        <span className="row-title">{event.title}</span>
        <span className="row-sub">EVENT{event.tag ? ` · ${event.tag.toUpperCase()}` : ""}</span>
      </div>
      <div className="timecol">
        <span className="start">{event.start}</span>
        <span>{event.end}</span>
      </div>
      <div className="row-actions">
        <button title="Edit"><Icon.Pencil /></button>
        <button title="Delete" className="danger" onClick={onDelete}><Icon.Trash /></button>
      </div>
    </div>
  );
}

function HabitRow({ habit, onCompleteToday, onDelete }) {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div className="h-row">
      <span className="bar" />
      <Checkbox checked={habit.completedToday} onChange={onCompleteToday} />
      <div className="row-body">
        <span className="row-title">{habit.title}</span>
        <span className="row-sub">
          HABIT
          <span className="dot" />
          {habit.frequency}
          {habit.tags?.includes("keystone") && (<>
            <span className="dot" />
            KEYSTONE
          </>)}
        </span>
      </div>
      <div className="week">
        {habit.last7.map((d, i) => (
          <span key={i} className={"d" + (d ? " on" : "") + (i === 6 ? " today" : "")} />
        ))}
      </div>
      <span className={"streak" + (habit.streak === 0 ? " dead" : "")}>
        <Icon.Flame size={11} />
        {habit.streak}
      </span>
      <div className="row-actions">
        <button title="Edit"><Icon.Pencil /></button>
        <button title="Delete" className="danger" onClick={onDelete}><Icon.Trash /></button>
      </div>
    </div>
  );
}

/* =================================================================
   Composer — used in Today and All tasks
   ================================================================= */
function Composer({ onAdd, onCancel, goals, defaultGoalId }) {
  const [type, setType] = useState("task");
  const [title, setTitle] = useState("");
  const [goalId, setGoalId] = useState(defaultGoalId || null);
  const [priority, setPriority] = useState("medium");
  const [date, setDate] = useState("Today");

  const submit = () => {
    if (!title.trim()) return;
    onAdd({
      title: title.trim(),
      type,
      goalId: type === "task" || type === "daily" ? goalId : null,
      priority,
      date,
    });
    setTitle("");
  };

  const inputRef = useRef(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const segOpts = [
    { key: "goal",  label: "Goal",  icon: <Icon.Target  size={12} /> },
    { key: "task",  label: "Task",  icon: <Icon.List    size={12} /> },
    { key: "daily", label: "Daily", icon: <Icon.Sunrise size={12} /> },
    { key: "event", label: "Event", icon: <Icon.Clock   size={12} /> },
    { key: "habit", label: "Habit", icon: <Icon.Repeat  size={12} /> },
  ];

  const canLinkGoal = type === "task" || type === "daily";
  const designation = canLinkGoal && goalId ? "GOAL" : (canLinkGoal ? "TASK" : null);

  return (
    <div className="composer">
      <div className="row1">
        <Checkbox checked={false} onChange={() => {}} />
        <input
          ref={inputRef}
          className="title-input"
          placeholder="What needs to happen?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
            if (e.key === "Escape") onCancel();
          }}
        />
        {designation && (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", color: "var(--fg-3)", textTransform: "uppercase" }}>
            {designation}
          </span>
        )}
      </div>
      <div className="row2">
        <div className="seg">
          {segOpts.map((o) => (
            <button key={o.key} className={type === o.key ? "active" : ""} onClick={() => setType(o.key)}>
              {o.icon} {o.label}
            </button>
          ))}
        </div>
        <div className="select"><Icon.Clock size={12} /> {date}</div>
        <div className="select"><span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--warning)", display: "inline-block" }}/> Priority · {priority}</div>
        {canLinkGoal && (
          <div
            className={"select" + (goalId ? " active" : "")}
            onClick={() => setGoalId(goalId ? null : goals[0]?.id)}
          >
            <Icon.Target size={12} />
            {goalId ? (goals.find((g) => g.id === goalId)?.title || "Pick goal") : "Link goal?"}
          </div>
        )}
        <div style={{ flex: 1 }} />
        <button className="btn btn--ghost" onClick={onCancel}>Cancel</button>
        <button className="btn btn--primary" onClick={submit}>Add</button>
      </div>
    </div>
  );
}

/* =================================================================
   Goals modal — list, edit, delete, link
   ================================================================= */
function GoalsModal({ goals, onClose, onAdd, onDelete }) {
  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "var(--scrim)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 100,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 560, maxHeight: "80vh", display: "flex", flexDirection: "column",
          background: "var(--bg-elev)", border: "1px solid var(--border-1)",
          borderRadius: "var(--radius-3)", boxShadow: "var(--shadow-3)",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-1)", display: "flex", alignItems: "baseline", gap: 12 }}>
          <h2 style={{ margin: 0, fontFamily: "var(--font-serif)", fontSize: 26, fontWeight: 420, fontStyle: "italic" }}>Goals</h2>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-3)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            {goals.length} active · long horizon
          </span>
        </div>
        <div style={{ overflow: "auto", flex: 1 }}>
          {goals.map((g) => (
            <GoalRow key={g.id} goal={g} onDelete={() => onDelete(g.id)} />
          ))}
          {adding ? (
            <div style={{ padding: "12px 24px", display: "flex", gap: 8, alignItems: "center", borderBottom: "1px solid var(--border-1)" }}>
              <Icon.Target size={16} />
              <input
                autoFocus
                placeholder="Name this goal…"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newTitle.trim()) { onAdd(newTitle.trim()); setNewTitle(""); setAdding(false); }
                  if (e.key === "Escape") { setAdding(false); setNewTitle(""); }
                }}
                style={{ flex: 1, border: 0, background: "transparent", fontFamily: "var(--font-serif)", fontSize: 17, color: "var(--fg-1)", outline: 0 }}
              />
            </div>
          ) : (
            <div
              className="goal-item"
              style={{ padding: "14px 24px", color: "var(--fg-3)", borderBottom: "1px solid var(--border-1)", cursor: "pointer" }}
              onClick={() => setAdding(true)}
            >
              <Icon.Plus size={14} /> New goal
            </div>
          )}
        </div>
        <div style={{ padding: "16px 24px", borderTop: "1px solid var(--border-1)", display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button className="btn btn--secondary" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}

function GoalRow({ goal, onDelete }) {
  return (
    <div
      style={{
        display: "grid", gridTemplateColumns: "24px 1fr auto auto", gap: 12, alignItems: "center",
        padding: "14px 24px", borderBottom: "1px solid var(--border-1)",
      }}
      className="goal-row"
    >
      <Icon.Target size={16} style={{ color: "var(--accent)" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontFamily: "var(--font-serif)", fontSize: 17 }}>{goal.title}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          {goal.life ? "LIFE GOAL · ∞" : `${goal.children || 0} CHILDREN`}{goal.progress != null ? ` · ${goal.progress}% DONE` : ""}
        </span>
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        <button className="icon-btn"><Icon.Pencil /></button>
        <button className="icon-btn danger" onClick={onDelete}><Icon.Trash /></button>
      </div>
    </div>
  );
}

/* =================================================================
   Theme toggle
   ================================================================= */
function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.getAttribute("data-theme") === "dark");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);
  return (
    <button className="theme-toggle" onClick={() => setDark((v) => !v)}>
      {dark ? <Icon.Sun /> : <Icon.Moon />}
      {dark ? "Light" : "Dark"}
    </button>
  );
}

Object.assign(window, {
  Icon, Checkbox, Sidebar, PageHead,
  TaskRow, EventRow, HabitRow, Composer,
  GoalsModal, ThemeToggle,
});
