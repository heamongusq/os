# Iconography

OS uses **[Lucide](https://lucide.dev)** as its sole icon system. No mixing, no custom SVGs.

## Loading

**Preferred — CDN:**
```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
<i data-lucide="inbox"></i>
<script>lucide.createIcons();</script>
```

**Or inline SVG** (for static HTML / SSR — see `inline/` for the most‑used set):
```html
<svg width="16" height="16" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="1.5"
     stroke-linecap="round" stroke-linejoin="round">
  <!-- path data from lucide.dev -->
</svg>
```

## OS overrides
- **stroke-width: 1.5** (Lucide default is 2). Finer lines match the serif aesthetic.
- **stroke-linecap / stroke-linejoin: round** (Lucide default).
- **color: currentColor** — icons inherit text color. Never tinted with the accent except on the active sidebar item.

## Sizes
| Context | Size |
|---|---|
| Task row, button, chip | 16px |
| Section header, sidebar | 20px |
| Empty state, large action | 24px |

## Canonical mappings
See README → Iconography for the full list.
