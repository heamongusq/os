// OS Desktop — screens: Today, AllTasks, Calendar, Analytics, Settings

const { useState: useStateS, useMemo: useMemoS } = React;

/* =================================================================
   Today — 2-column layout: Tasks (Tasks + Dailies + Events) | Habits
   ================================================================= */
function Today({ state, dispatch }) {
  const { goals, tasks, events, habits } = state;
  const [composing, setComposing] = useStateS(false);
  const [focused, setFocused] = useStateS("t3");
  const [showGoals, setShowGoals] = useStateS(false);
  const todayTasks = tasks.filter((t) => t.today);
  const goalOf = (id) => goals.find((g) => g.id === id);

  // Split into TASKS (regular) and DAILIES, sort each by time, completed last
  const sortByTime = (a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    return (a.time || "").localeCompare(b.time || "");
  };
  const regularTasks = useMemoS(() => todayTasks.filter((t) => t.kind === "task").sort(sortByTime), [todayTasks]);
  const dailyTasks   = useMemoS(() => todayTasks.filter((t) => t.kind === "daily").sort(sortByTime), [todayTasks]);

  const date = new Date();
  const dateStr = date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  const today = todayTasks.length;
  const todayDone = todayTasks.filter((t) => t.done).length;
  const habitsDone = habits.filter((h) => h.completedToday).length;

  return (
    <div className="canvas">
      <PageHead
        kicker={`${dateStr.toUpperCase()} · ${todayDone}/${today} TASKS · ${habitsDone}/${habits.length} HABITS`}
        title='Today<em>.</em>'
        actions={<>
          <button className="btn btn--secondary" onClick={() => setShowGoals(true)}>
            <Icon.Target /> Goals
          </button>
          <button className="btn btn--primary" onClick={() => setComposing(true)}>
            <Icon.Plus /> Add
          </button>
        </>}
      />

      {composing && (
        <Composer
          goals={goals}
          onAdd={(d) => { dispatch({ type: "addTask", data: d }); setComposing(false); }}
          onCancel={() => setComposing(false)}
        />
      )}

      <div className="two-col">
        {/* LEFT — Tasks + Daily tasks + Events, merged chronologically */}
        <div>
          <div className="col-head">
            <h2>Today</h2>
            <span className="count">{regularTasks.filter((t) => !t.done).length + dailyTasks.filter((t) => !t.done).length} OPEN · {events.length} EVENTS</span>
            <span className="spacer" />
            <button className="icon-btn" title="Filter"><Icon.Filter /></button>
            <button className="icon-btn" title="Sort"><Icon.More /></button>
          </div>

          <div className="row-list">
            {(() => {
              // Merge tasks + dailies + events into one chronological list
              const items = [
                ...events.map((e) => ({ kind: "event", time: e.start, data: e })),
                ...regularTasks.map((t) => ({ kind: "task",  time: t.time || "23:59", data: t })),
                ...dailyTasks.map((t)   => ({ kind: "daily", time: t.time || "23:59", data: t })),
              ];
              items.sort((a, b) => {
                const aDone = a.data.done === true ? 1 : 0;
                const bDone = b.data.done === true ? 1 : 0;
                if (aDone !== bDone) return aDone - bDone;
                return (a.time || "").localeCompare(b.time || "");
              });
              return items.map((it) => {
                if (it.kind === "event") {
                  return (
                    <EventRow key={"e" + it.data.id} event={it.data} onDelete={() => dispatch({ type: "deleteEvent", id: it.data.id })} />
                  );
                }
                return (
                  <TaskRow
                    key={it.data.id}
                    task={it.data}
                    goal={goalOf(it.data.goalId)}
                    focused={focused === it.data.id}
                    onClick={() => setFocused(it.data.id)}
                    onToggle={() => dispatch({ type: "toggleTask", id: it.data.id })}
                    onRename={(title) => dispatch({ type: "renameTask", id: it.data.id, title })}
                    onDelete={() => dispatch({ type: "deleteTask", id: it.data.id })}
                  />
                );
              });
            })()}
          </div>
        </div>

        {/* RIGHT — Habits */}
        <div>
          <div className="col-head">
            <h2>Habits</h2>
            <span className="count">{habitsDone}/{habits.length} TODAY</span>
            <span className="spacer" />
            <button className="icon-btn" title="Add habit"><Icon.Plus /></button>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fg-3)", padding: "4px 0 4px" }}>Last 7 days</div>
          <div className="row-list">
            {habits.map((h) => (
              <HabitRow
                key={h.id}
                habit={h}
                onCompleteToday={() => dispatch({ type: "toggleHabit", id: h.id })}
                onDelete={() => dispatch({ type: "deleteHabit", id: h.id })}
              />
            ))}
          </div>

          {/* Tiny streak summary */}
          <div style={{
            marginTop: 28, padding: 20,
            border: "1px solid var(--border-1)", borderRadius: "var(--radius-2)",
            display: "flex", flexDirection: "column", gap: 6,
          }}>
            <span className="label">Longest current streak</span>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 40, fontWeight: 300, letterSpacing: "-0.02em" }}>142</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-3)" }}>days · Read 30 minutes</span>
            </div>
            <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 13, color: "var(--fg-3)" }}>
              Don't talk about it.
            </span>
          </div>
        </div>
      </div>

      {showGoals && (
        <GoalsModal
          goals={goals}
          onClose={() => setShowGoals(false)}
          onAdd={(title) => dispatch({ type: "addGoal", title })}
          onDelete={(id) => dispatch({ type: "deleteGoal", id })}
        />
      )}
    </div>
  );
}

/* =================================================================
   All tasks — grouped by goal, with filter bar
   ================================================================= */
function AllTasks({ state, dispatch }) {
  const { goals, tasks } = state;
  const [filter, setFilter] = useStateS("");
  const [composing, setComposing] = useStateS(false);
  const goalOf = (id) => goals.find((g) => g.id === id);

  const filtered = tasks.filter((t) => !filter || t.title.toLowerCase().includes(filter.toLowerCase()));
  const groups = useMemoS(() => {
    const g = { _none: [] };
    for (const t of filtered) {
      const k = t.goalId || "_none";
      (g[k] = g[k] || []).push(t);
    }
    return g;
  }, [filtered]);

  return (
    <div className="canvas">
      <PageHead
        kicker={`${filtered.length} ITEMS · ${filtered.filter((t) => t.done).length} DONE`}
        title='All tasks<em>.</em>'
        actions={<>
          <button className="btn btn--secondary"><Icon.Filter /> Filter</button>
          <button className="btn btn--primary" onClick={() => setComposing(true)}><Icon.Plus /> Add</button>
        </>}
      />

      <div className="filter-bar">
        <div className="search">
          <Icon.Search />
          <input
            placeholder="Search tasks, goals, tags…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="seg">
          <button className="active">Open</button>
          <button>Done</button>
          <button>All</button>
        </div>
        <div style={{ flex: 1 }} />
        <div className="select"><Icon.Target size={12} /> Any goal</div>
        <div className="select">Priority · any</div>
      </div>

      {composing && (
        <Composer
          goals={goals}
          onAdd={(d) => { dispatch({ type: "addTask", data: d }); setComposing(false); }}
          onCancel={() => setComposing(false)}
        />
      )}

      {/* Grouped lists — goal first, then unlinked */}
      {goals.filter((g) => groups[g.id]?.length).map((g) => (
        <section key={g.id}>
          <div className="group-head">
            <Icon.Target size={16} style={{ color: "var(--accent)" }} />
            <h3>{g.title}</h3>
            <span className="count">{groups[g.id].length} TASKS · {g.progress}% DONE</span>
          </div>
          <div className="row-list">
            {groups[g.id].map((t) => (
              <TaskRow
                key={t.id} task={t} goal={null}
                onToggle={() => dispatch({ type: "toggleTask", id: t.id })}
                onRename={(title) => dispatch({ type: "renameTask", id: t.id, title })}
                onDelete={() => dispatch({ type: "deleteTask", id: t.id })}
              />
            ))}
          </div>
        </section>
      ))}

      {groups._none?.length > 0 && (
        <section>
          <div className="group-head">
            <Icon.List size={16} />
            <h3>Standalone</h3>
            <span className="count">{groups._none.length} · NO GOAL</span>
          </div>
          <div className="row-list">
            {groups._none.map((t) => (
              <TaskRow
                key={t.id} task={t} goal={null}
                onToggle={() => dispatch({ type: "toggleTask", id: t.id })}
                onRename={(title) => dispatch({ type: "renameTask", id: t.id, title })}
                onDelete={() => dispatch({ type: "deleteTask", id: t.id })}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

/* =================================================================
   Calendar — month view, current month
   ================================================================= */
function Calendar({ state }) {
  // Build a static month grid for "March 2026"
  const monthName = "March 2026";
  const firstWeekday = 0; // Sun
  const daysInMonth = 31;
  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push({ day: 25 + i, dim: true });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, dim: false });
  while (cells.length % 7) cells.push({ day: cells.length - daysInMonth - firstWeekday + 1, dim: true });

  // sprinkle events
  const evMap = {
    14: [{ time: "10:00", title: "Marta · review", accent: true }, { time: "13:00", title: "Apartment viewing" }],
    15: [{ time: "all day", title: "Sibelius concert" }],
    17: [{ time: "08:00", title: "Run · 5km", accent: true }],
    18: [{ time: "14:00", title: "Wireframes due" }],
    19: [{ time: "10:00", title: "Standup" }, { time: "16:00", title: "Therapy" }],
    20: [{ time: "11:00", title: "Apartment · Mitte" }, { time: "19:00", title: "Dinner · K" }],
    22: [{ time: "18:00", title: "Concert · Hadelich", accent: true }],
    25: [{ time: "09:00", title: "Thesis draft" }, { time: "13:00", title: "Lunch · papa" }],
    27: [{ time: "all day", title: "Berlin trip ✈" }],
  };

  return (
    <div className="canvas">
      <PageHead
        kicker={`${monthName.toUpperCase()} · WEEK 11`}
        title='Calendar<em>.</em>'
        actions={<>
          <div className="seg">
            <button>Day</button>
            <button>Week</button>
            <button className="active">Month</button>
          </div>
          <button className="icon-btn"><Icon.ChevronLeft /></button>
          <button className="btn btn--secondary">Today</button>
          <button className="icon-btn"><Icon.ChevronRight /></button>
          <button className="btn btn--primary"><Icon.Plus /> Event</button>
        </>}
      />

      <div className="cal">
        <div className="cal-head">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => <div key={d}>{d}</div>)}
        </div>
        <div className="cal-grid">
          {cells.map((c, i) => (
            <div key={i} className={"cal-cell" + (c.dim ? " dim" : "") + (c.day === 14 && !c.dim ? " today" : "")}>
              <span className="num">{c.day}</span>
              {!c.dim && evMap[c.day]?.map((e, j) => (
                <span key={j} className={"ev" + (e.accent ? " accent" : "")}>
                  <span className="time">{e.time}</span> {e.title}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =================================================================
   Analytics — one focal chart, light density
   ================================================================= */
function Analytics({ state }) {
  // 30-day completions sample
  const days = [];
  for (let i = 0; i < 30; i++) {
    days.push(Math.round(2 + 6 * Math.abs(Math.sin(i * 0.6) + Math.cos(i * 0.27))));
  }
  const maxV = Math.max(...days);

  return (
    <div className="canvas">
      <PageHead
        kicker="LAST 30 DAYS · FEB 13 → MAR 14"
        title='Analytics<em>.</em>'
        actions={<>
          <div className="seg">
            <button>7d</button>
            <button className="active">30d</button>
            <button>90d</button>
            <button>1y</button>
          </div>
          <button className="btn btn--secondary"><Icon.Filter /> Goals</button>
        </>}
      />

      {/* Metric grid */}
      <div className="metric-grid">
        <div className="metric">
          <span className="label">Tasks completed</span>
          <span className="value">186</span>
          <span className="delta">↑ 12% vs prev</span>
        </div>
        <div className="metric">
          <span className="label">Completion rate</span>
          <span className="value">74<span style={{ fontSize: 20, color: "var(--fg-3)" }}>%</span></span>
          <span className="delta">↑ 6 pp</span>
        </div>
        <div className="metric">
          <span className="label">Longest streak</span>
          <span className="value">142</span>
          <span className="delta">days · Read 30 min</span>
        </div>
        <div className="metric">
          <span className="label">Active habits</span>
          <span className="value">5</span>
          <span className="delta bad">↓ 1 vs prev</span>
        </div>
      </div>

      {/* Focal chart */}
      <div className="chart-card">
        <div className="head">
          <h3>Daily completions</h3>
          <span className="sub">Avg 6.2/day · Median 7</span>
        </div>
        <svg viewBox="0 0 600 180" width="100%" height="180" preserveAspectRatio="none" style={{ display: "block" }}>
          {/* baseline */}
          <line x1="0" y1="150" x2="600" y2="150" stroke="var(--border-1)" strokeWidth="1" />
          {/* avg dashed */}
          <line x1="0" y1="106" x2="600" y2="106" stroke="var(--fg-4)" strokeDasharray="4 4" strokeWidth="1" />
          {days.map((v, i) => {
            const x = 12 + (i * (576 / 29));
            const h = (v / maxV) * 130;
            return (
              <rect
                key={i}
                x={x - 6} y={150 - h}
                width={12} height={h}
                fill={i === 29 ? "var(--accent)" : "var(--ink-4)"}
                opacity={i === 29 ? 1 : 0.7}
                rx="1"
              />
            );
          })}
          <text x="600" y="100" fill="var(--fg-3)" fontFamily="var(--font-mono)" fontSize="9" textAnchor="end">avg 6.2</text>
        </svg>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-3)" }}>
          <span>FEB 13</span>
          <span>FEB 23</span>
          <span>MAR 4</span>
          <span>MAR 14 ← today</span>
        </div>
      </div>

      <div className="split-panels">
        <div className="panel-card">
          <div className="label">Habits · 7-day grid</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {state.habits.map((h) => (
              <div key={h.id} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", alignItems: "center", gap: 12 }}>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: 14 }}>{h.title}</span>
                <div style={{ display: "flex", gap: 3 }}>
                  {h.last7.map((d, i) => (
                    <span key={i} style={{ width: 14, height: 14, borderRadius: 2, background: d ? "var(--accent)" : "var(--bg-3)", border: "1px solid var(--border-1)" }} />
                  ))}
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--success)", minWidth: 40, textAlign: "right" }}>{h.streak}d</span>
              </div>
            ))}
          </div>
        </div>
        <div className="panel-card">
          <div className="label">Goals · progress</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {state.goals.map((g) => (
              <div key={g.id} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: 14 }}>{g.title}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-3)" }}>{g.progress}%</span>
                </div>
                <div style={{ height: 4, background: "var(--bg-3)", borderRadius: 2 }}>
                  <div style={{ width: `${g.progress}%`, height: "100%", background: g.life ? "var(--accent)" : "var(--fg-1)", borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =================================================================
   Settings — preferences page
   ================================================================= */
function Settings() {
  const [section, setSection] = useStateS("general");
  const [theme, setTheme] = useStateS("system");
  const [hour, setHour] = useStateS("24");
  const [start, setStart] = useStateS("Monday");
  const [notif, setNotif] = useStateS({ daily: true, overdue: true, streak: false });

  return (
    <div className="canvas">
      <PageHead
        kicker="ACCOUNT · KIRA.LI"
        title='Preferences<em>.</em>'
      />

      <div className="settings-layout">
        <div className="settings-nav">
          {["general", "appearance", "notifications", "data", "account"].map((s) => (
            <div key={s} className={"it" + (section === s ? " active" : "")} onClick={() => setSection(s)}>
              {s[0].toUpperCase() + s.slice(1)}
            </div>
          ))}
        </div>

        <div className="settings-section">
          {section === "general" && (
            <>
              <div className="settings-group">
                <h3>General</h3>
                <p className="desc">How OS behaves day-to-day. These apply across all devices.</p>
                <div className="settings-row">
                  <div>
                    <div className="name">Week starts on</div>
                    <div className="hint">Affects calendar and habit week grid</div>
                  </div>
                  <div className="spacer" />
                  <div className="seg"><button className={start==="Sunday"?"active":""} onClick={() => setStart("Sunday")}>Sun</button><button className={start==="Monday"?"active":""} onClick={() => setStart("Monday")}>Mon</button></div>
                </div>
                <div className="settings-row">
                  <div>
                    <div className="name">Time format</div>
                    <div className="hint">24h is the system default</div>
                  </div>
                  <div className="spacer" />
                  <div className="seg"><button className={hour==="12"?"active":""} onClick={() => setHour("12")}>12h</button><button className={hour==="24"?"active":""} onClick={() => setHour("24")}>24h</button></div>
                </div>
                <div className="settings-row">
                  <div>
                    <div className="name">Quick-add shortcut</div>
                    <div className="hint">Press anywhere to open the composer</div>
                  </div>
                  <div className="spacer" />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, padding: "3px 8px", border: "1px solid var(--border-2)", borderRadius: 2, color: "var(--fg-2)" }}>⌘ N</span>
                </div>
              </div>

              <div className="settings-group">
                <h3>Defaults for new tasks</h3>
                <p className="desc">Used when a field is left blank in the composer.</p>
                <div className="settings-row">
                  <div className="name">Default type</div>
                  <div className="spacer" />
                  <div className="seg"><button className="active">ATask</button><button>GTask</button></div>
                </div>
                <div className="settings-row">
                  <div className="name">Default priority</div>
                  <div className="spacer" />
                  <div className="seg"><button>Low</button><button className="active">Medium</button><button>High</button></div>
                </div>
              </div>
            </>
          )}

          {section === "appearance" && (
            <>
              <div className="settings-group">
                <h3>Appearance</h3>
                <p className="desc">Light and dark are first-class. System follows your OS.</p>
                <div className="settings-row">
                  <div className="name">Theme</div>
                  <div className="spacer" />
                  <div className="seg">
                    <button className={theme==="light"?"active":""} onClick={() => { setTheme("light"); document.documentElement.setAttribute("data-theme", "light"); }}>Light</button>
                    <button className={theme==="dark"?"active":""} onClick={() => { setTheme("dark"); document.documentElement.setAttribute("data-theme", "dark"); }}>Dark</button>
                    <button className={theme==="system"?"active":""} onClick={() => setTheme("system")}>System</button>
                  </div>
                </div>
                <div className="settings-row">
                  <div>
                    <div className="name">Density</div>
                    <div className="hint">How tight are the rows?</div>
                  </div>
                  <div className="spacer" />
                  <div className="seg"><button>Compact</button><button className="active">Default</button><button>Spacious</button></div>
                </div>
                <div className="settings-row">
                  <div>
                    <div className="name">Show goal pip on rows</div>
                    <div className="hint">A small dot left of the goal-linked task title</div>
                  </div>
                  <div className="spacer" />
                  <span className="toggle on" onClick={(e) => e.currentTarget.classList.toggle("on")} />
                </div>
              </div>
            </>
          )}

          {section === "notifications" && (
            <div className="settings-group">
              <h3>Notifications</h3>
              <p className="desc">OS is quiet by default. Opt in only to what helps.</p>
              {[
                ["daily", "Daily morning summary", "08:00 — what's planned for today"],
                ["overdue", "Overdue tasks", "After 24h past due, once per day"],
                ["streak", "Streak at risk", "When a habit streak might break today"],
              ].map(([k, name, hint]) => (
                <div key={k} className="settings-row">
                  <div>
                    <div className="name">{name}</div>
                    <div className="hint">{hint}</div>
                  </div>
                  <div className="spacer" />
                  <span
                    className={"toggle" + (notif[k] ? " on" : "")}
                    onClick={() => setNotif({ ...notif, [k]: !notif[k] })}
                  />
                </div>
              ))}
            </div>
          )}

          {section === "data" && (
            <div className="settings-group">
              <h3>Data</h3>
              <p className="desc">Your data is yours. Export or wipe at any time.</p>
              <div className="settings-row"><div className="name">Export all data</div><div className="spacer"/><button className="btn btn--secondary">Export ·.json</button></div>
              <div className="settings-row"><div className="name">Sync</div><div className="hint">Last synced 2 minutes ago</div><div className="spacer" /><span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--success)" }}>● synced</span></div>
              <div className="settings-row"><div className="name" style={{ color: "var(--danger)" }}>Delete account</div><div className="spacer"/><button className="btn btn--secondary" style={{ color: "var(--danger)", borderColor: "var(--danger-tint)" }}>Delete…</button></div>
            </div>
          )}

          {section === "account" && (
            <div className="settings-group">
              <h3>Account</h3>
              <p className="desc">Signed in as kira.li</p>
              <div className="settings-row"><div className="name">Display name</div><div className="spacer" /><input className="input" defaultValue="Kira Li" style={{ width: 220, height: 30, padding: "4px 10px", fontFamily: "var(--font-serif)", fontSize: 14, border: "1px solid var(--border-2)", background: "var(--bg-1)", borderRadius: "var(--radius-2)" }} /></div>
              <div className="settings-row"><div className="name">Email</div><div className="spacer" /><span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--fg-2)" }}>kira@operate.os</span></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Today, AllTasks, Calendar, Analytics, Settings });
