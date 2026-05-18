// OS Desktop — seed data
// Goals, tasks, daily tasks, events, habits.

const SEED = {
  goals: [
    { id: "g1", title: "Learn German to B2", children: 7, progress: 42, life: false },
    { id: "g2", title: "Move to Berlin",     children: 3, progress: 18, life: false },
    { id: "g3", title: "Be a present father", children: 5, progress: 60, life: true },
    { id: "g4", title: "Ship OS v1",          children: 9, progress: 31, life: false },
  ],

  tasks: [
    { id: "t1", title: "Plan Q3 goals — review with Marta",      kind: "task",  goalId: "g4", time: "10:00", priority: "high",    tags: ["milestone"], done: false, overdue: 2, today: true },
    { id: "t2", title: "Write the README for the desk module",  kind: "task",  goalId: "g4", time: "11:30", priority: "medium",  tags: [],            done: false, today: true },
    { id: "t3", title: "Review apartment listings (Mitte)",     kind: "task",  goalId: "g2", time: "13:00", priority: "high",    tags: ["keystone"],  done: false, today: true },
    { id: "t4", title: "Read for 30 min before bed",            kind: "daily", goalId: "g1", time: "22:30", priority: "low",     tags: ["keystone"],  done: false, today: true },
    { id: "t5", title: "Slept well · log",                      kind: "daily", goalId: null, time: "08:00", priority: "low",     tags: [],            done: true,  doneTime: "08:12", today: true },
    { id: "t6", title: "In bed before 11",                       kind: "daily", goalId: null, time: "23:00", priority: "low",     tags: [],            done: false, today: true },
    { id: "t7", title: "Email Prof. Klein about thesis topic",  kind: "task",  goalId: null,                   priority: "medium",  tags: [],            done: true,  doneTime: "09:14", today: true },
    { id: "t8", title: "Sketch wireframes for analytics page",  kind: "task",  goalId: "g4",                   priority: "medium",  tags: [],            done: false, due: "Wed Mar 18", today: false },
    { id: "t9", title: "Order grocery delivery for the week",   kind: "task",  goalId: null,                   priority: "low",     tags: [],            done: false, due: "Thu Mar 19", today: false },
    { id: "t10", title: "Apartment viewing — Prenzlauer Berg",  kind: "task",  goalId: "g2",                   priority: "high",    tags: ["keystone"],  done: false, due: "Fri Mar 20", today: false },
    { id: "t11", title: "Re-watch Hadelich · Sibelius",         kind: "task",  goalId: null,                   priority: "low",     tags: [],            done: false, due: "Sat Mar 21", today: false },
  ],

  events: [
    { id: "e1", title: "Work — morning block",       start: "08:00", end: "12:00", tag: "deep" },
    { id: "e2", title: "Lunch with Marta",           start: "12:30", end: "13:30", tag: "social" },
    { id: "e3", title: "Work — afternoon block",     start: "13:30", end: "17:00", tag: "deep" },
    { id: "e4", title: "Dinner · home",              start: "19:00", end: "20:00", tag: null },
  ],

  habits: [
    { id: "h1", title: "Read 30 minutes",        frequency: "every day",      streak: 142, completedToday: true,  last7: [1,1,1,1,1,1,1], tags: ["keystone"] },
    { id: "h2", title: "Run 5km",                 frequency: "M·W·F",          streak: 12,  completedToday: false, last7: [1,0,1,0,1,0,0], tags: [] },
    { id: "h3", title: "German vocab · 20 cards", frequency: "every day",      streak: 38,  completedToday: false, last7: [1,1,1,1,1,1,0], tags: ["keystone"] },
    { id: "h4", title: "No phone before 10am",    frequency: "weekdays",       streak: 6,   completedToday: true,  last7: [1,1,1,1,1,0,1], tags: [] },
    { id: "h5", title: "Cold shower",             frequency: "every day",      streak: 0,   completedToday: false, last7: [1,1,0,0,0,1,0], tags: [] },
  ],
};

window.SEED = SEED;
