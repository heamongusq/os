---
name: os-design
description: Use this skill to generate well-branded interfaces and assets for OS — a life-management web app and mobile widget. Contains design tokens, type system, color scales, the violet "process bar" motif, Lucide icon mappings, and React UI kit components for the desktop app and mobile widget. Use for production designs, throwaway prototypes, mocks, slides, or visual specs.
user-invocable: true
---

# OS Design Skill

OS is the operating system for your life. Tasks, daily tasks, habits, events, and goals — together. Calm. Serif. Violet. One signal color, never more.

## How to use this skill

1. **Read `README.md`** for the full brand and product context. It contains the entity model (Goal / Task / DailyTask / Event / Habit), the voice/copy rules, the visual foundations, and the iconography system.
2. **Read `colors_and_type.css`** for all design tokens (CSS custom properties). Import this file at the top of any new HTML you produce; it gives you `--bg-1`, `--fg-1`, `--accent`, `--font-serif`, `--font-mono`, the type scale, spacing scale, radii, and shadows — and the `[data-theme="dark"]` overrides.
3. **Browse `preview/`** for live examples of every token in use (buttons, inputs, task rows, chips, segmented controls, menu, etc.).
4. **Browse `ui_kits/desktop/` and `ui_kits/widget/`** for full interactive recreations of the two surfaces. Copy component patterns from `components.jsx` and `widget.jsx`; copy `styles.css` for surface-specific patterns.
5. **Browse `assets/`** for logos and the icon reference. Iconography is **Lucide @ stroke-1.5**, loaded via CDN.

## Rules of thumb

- **One accent per view.** Violet is the signal; use it sparingly. If two things glow, neither does.
- **Serif for text, mono for data.** Never a sans-serif. Numbers, timestamps, tags, keyboard shortcuts, all-caps micro-labels — JetBrains Mono. Everything else — Newsreader.
- **Sentence case** everywhere except mono all-caps labels.
- **No emoji.** No exclamation marks. No cheerleading copy.
- **Hairlines first, shadows last.** Rows are separated by 1px lines, not space. Shadows only on menus and modals.
- **4px corner radius.** Sober, not rounded. Pills only for chips.
- **Both light and dark are first-class.** Use semantic tokens (`--bg-1`, `--fg-1`, etc.) — never hard-coded hex.
- **Entity types are: Goal, Task, DailyTask, Event, Habit.** ATASK / GTASK are designations (Task without/with a linked goal), not separate types.

## When the user invokes this skill

If they ask for a visual artifact (slide, mock, throwaway prototype): copy assets out of this folder, write a self-contained static HTML, link `colors_and_type.css`, and verify visually.

If they're working on production code: read the rules here, lift the tokens, and apply them.

If they invoke the skill with no further guidance, ask:
- What surface? (desktop · widget · slide · marketing · other)
- What's the goal? (mock · spec · prototype · production)
- Light, dark, or both?

Then act as an expert designer who outputs HTML artifacts or production code.

## File map

```
README.md                  ← Brand context + voice + visual foundations
colors_and_type.css        ← Tokens (CSS vars) + @font-face
fonts/                     ← Webfonts (Google Fonts loaded via @import)
assets/
  logos/                   ← os-mark.svg, os-wordmark.svg, os-app-icon.svg
  icons/README.md          ← Lucide usage + canonical mappings
preview/                   ← Token preview cards (the Design System tab)
ui_kits/
  desktop/                 ← Today / All tasks / Calendar / Analytics / Settings
  widget/                  ← Today / Quick-add / Edit
```
