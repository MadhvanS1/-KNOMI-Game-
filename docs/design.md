# KNOMI Knows You — Design System

> **Design Philosophy:** Premium, warm, alive. Never cold or clinical. Every screen should feel like a luxury food experience, not a tech product.

---

## 1. Brand Integration

The game inherits KNOMI's core brand identity and extends it with game-specific personality colors.

### KNOMI Base Palette

| Token | Hex | Usage in Game |
|---|---|---|
| **Champagne** | `#EACEAA` | Premium highlights, section headings, glow accents |
| **Whiskey Sour** | `#D39858` | Primary CTAs, active states, focus rings, progress bars |
| **Honey Garlic** | `#85431E` | Secondary buttons, hover states, icon fills |
| **Burnt Coffee** | `#34150F` | Card surfaces (light mode), deep text |
| **Balsamico** | `#150C0C` | App background (dark mode), deepest surfaces |

---

## 2. Dark Theme System (Primary)

The game runs in dark mode by default — aligns with the premium/nightlife food aesthetic.

### Background & Surface Hierarchy

| Layer | Hex | CSS Variable | Usage |
|---|---|---|---|
| Background Base | `#150C0C` | `--knomi-bg-base` | Page background |
| Background Elevated | `#1B100F` | `--knomi-bg-elevated` | Modals, overlays |
| Surface Card | `#241613` | `--knomi-surface-card` | Dish cards, mode cards |
| Surface Hover | `#2D1A15` | `--knomi-surface-hover` | Card hover state |
| Surface Selected | `#3A1F18` | `--knomi-surface-selected` | Selected dish card |
| Surface Pressed | `#34150F` | `--knomi-surface-pressed` | Active/tap state |

### Typography Colors

| Token | Value | CSS Variable | Usage |
|---|---|---|---|
| Primary | `#F6EFE8` | `--knomi-text-primary` | Headlines, dish names, personality names |
| Secondary | `rgba(246,239,232,0.72)` | `--knomi-text-secondary` | Descriptions, subtext |
| Muted | `rgba(246,239,232,0.45)` | `--knomi-text-muted` | Timestamps, labels, hints |
| Disabled | `rgba(246,239,232,0.28)` | `--knomi-text-disabled` | Inactive elements |
| Accent | `#D39858` | `--knomi-text-accent` | Links, highlighted text |

### Borders

| Token | Value | CSS Variable |
|---|---|---|
| Default | `rgba(234,206,170,0.08)` | `--knomi-border-default` |
| Strong | `rgba(234,206,170,0.16)` | `--knomi-border-strong` |
| Focus | `#D39858` | `--knomi-border-focus` |
| Selected | `#D39858` | `--knomi-border-selected` |

---

## 3. Personality Color Palettes

Each of the 8 food personalities has a distinct color identity used for their reveal cards, share cards, and UI accents:

| # | Personality | Primary | Secondary | Glow | Text | Emoji |
|---|---|---|---|---|---|---|
| 1 | **Comfort Loyalist** | `#E8A849` | `#5C3D1A` | `rgba(232,168,73,0.25)` | `#FFF5E6` | 🍛 |
| 2 | **Menu Anarchist** | `#8B5CF6` | `#3B1D8E` | `rgba(139,92,246,0.25)` | `#F3ECFF` | 🌀 |
| 3 | **Spice Sovereign** | `#DC2626` | `#7F1D1D` | `rgba(220,38,38,0.25)` | `#FEF2F2` | 🔥 |
| 4 | **Social Feeder** | `#F59E0B` | `#78350F` | `rgba(245,158,11,0.25)` | `#FFFBEB` | 🍽️ |
| 5 | **Silent Connoisseur** | `#1E3A5F` | `#0F1D30` | `rgba(30,58,95,0.25)` | `#E8F0FE` | 🥂 |
| 6 | **Guilty Hedonist** | `#9333EA` | `#581C87` | `rgba(147,51,234,0.25)` | `#FAF0FF` | 🧈 |
| 7 | **Balanced Diplomat** | `#22C55E` | `#14532D` | `rgba(34,197,94,0.25)` | `#F0FDF4` | ⚖️ |
| 8 | **Chaos Agent** | `#00FF88` | `#0A0A0A` | `rgba(0,255,136,0.25)` | `#ECFDF5` | 💀 |

### Personality Card Gradient Backgrounds

```css
/* Each personality card uses a radial gradient */
.comfort-loyalist   { background: radial-gradient(ellipse at 30% 20%, #5C3D1A 0%, #150C0C 70%); }
.menu-anarchist     { background: radial-gradient(ellipse at 50% 50%, #3B1D8E 0%, #150C0C 70%); }
.spice-sovereign    { background: radial-gradient(ellipse at 40% 30%, #7F1D1D 0%, #150C0C 70%); }
.social-feeder      { background: radial-gradient(ellipse at 30% 40%, #78350F 0%, #150C0C 70%); }
.silent-connoisseur { background: radial-gradient(ellipse at 60% 20%, #0F1D30 0%, #150C0C 70%); }
.guilty-hedonist    { background: radial-gradient(ellipse at 40% 40%, #581C87 0%, #150C0C 70%); }
.balanced-diplomat  { background: radial-gradient(ellipse at 50% 30%, #14532D 0%, #150C0C 70%); }
.chaos-agent        { background: radial-gradient(ellipse at 50% 50%, #0A1A0F 0%, #0A0A0A 70%); }
```

---

## 4. Typography

### Font Families

| Role | Font | Weight | Fallback |
|---|---|---|---|
| **Display / Personality Names** | Space Grotesk | 700 (Bold) | system-ui |
| **Headings** | Inter | 600 (Semibold) | system-ui |
| **Body** | Inter | 400 (Regular) | system-ui |
| **Labels / Captions** | Inter | 500 (Medium) | system-ui |
| **Monospace / Stats** | JetBrains Mono | 400 | monospace |

### Type Scale

| Token | Size | Line Height | Weight | Usage |
|---|---|---|---|---|
| `--text-hero` | 36px | 1.1 | 700 | Personality name reveal |
| `--text-h1` | 28px | 1.2 | 700 | Page titles ("Read My Food Soul") |
| `--text-h2` | 22px | 1.3 | 600 | Section headings, mode names |
| `--text-h3` | 18px | 1.4 | 600 | Dish names, card titles |
| `--text-body` | 16px | 1.5 | 400 | Descriptions, roast text |
| `--text-body-sm` | 14px | 1.5 | 400 | Secondary descriptions |
| `--text-caption` | 12px | 1.4 | 500 | Labels, counters, timestamps |
| `--text-overline` | 11px | 1.3 | 600 | Category tabs, badges |

---

## 5. Spacing System (4px Base Grid)

| Token | Value | CSS Variable | Usage |
|---|---|---|---|
| `space-1` | 4px | `--space-1` | Minimal gap |
| `space-2` | 8px | `--space-2` | Icon-to-text gap |
| `space-3` | 12px | `--space-3` | Inner card padding |
| `space-4` | 16px | `--space-4` | Standard padding |
| `space-5` | 20px | `--space-5` | Section gaps |
| `space-6` | 24px | `--space-6` | Card padding |
| `space-8` | 32px | `--space-8` | Section margins |
| `space-10` | 40px | `--space-10` | Page margins |
| `space-12` | 48px | `--space-12` | Large section spacing |
| `space-16` | 64px | `--space-16` | Hero spacing |

---

## 6. Border Radius Tokens

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 8px | Small elements, tags, badges |
| `--radius-md` | 12px | Buttons, inputs |
| `--radius-lg` | 16px | Cards (matches KNOMI main app) |
| `--radius-xl` | 24px | Modals, large cards |
| `--radius-full` | 9999px | Pills, avatars, circular buttons |

---

## 7. Shadow & Elevation Tokens

| Token | Value | Usage |
|---|---|---|
| `--shadow-card` | `0 6px 18px rgba(0,0,0,0.28)` | Dish cards, mode cards |
| `--shadow-elevated` | `0 12px 32px rgba(0,0,0,0.4)` | Modals, overlays |
| `--shadow-glow` | `0 0 24px rgba(211,152,88,0.12)` | Subtle golden glow |
| `--shadow-personality` | `0 0 40px [personality-glow-color]` | Personality reveal glow |
| `--shadow-selected` | `0 0 0 2px #D39858, 0 6px 18px rgba(211,152,88,0.2)` | Selected dish card |

---

## 8. Component Design Specs

### 8.1 Dish Card

```
┌──────────────────────────────────┐  height: 120px
│ ┌────────┐                       │  border-radius: 16px
│ │ 80x80  │  Paneer Tikka     ₹249│  bg: --knomi-surface-card
│ │ image  │  Smoky cottage cheese │  border: 1px solid --knomi-border-default
│ │        │  tikka with mint...   │
│ └────────┘                       │  SELECTED STATE:
│                            [+]   │  border: 2px solid #D39858
└──────────────────────────────────┘  bg: --knomi-surface-selected
                                      shadow: --shadow-selected
```

- Image: 80x80px, border-radius 12px, object-fit cover
- Name: `--text-h3`, `--knomi-text-primary`
- Description: `--text-body-sm`, `--knomi-text-secondary`, max 2 lines, ellipsis
- Price: `--text-body-sm`, `--knomi-text-accent`
- Add icon: 32x32px circular button, `--knomi-surface-hover` bg

### 8.2 Personality Reveal Card (Full Screen, Shareable)

```
┌──────────────────────────────────┐  FULL SCREEN
│                                  │  background: personality gradient
│         [personality emoji]      │
│            48px                  │
│                                  │
│    THE COMFORT LOYALIST          │  --text-hero, personality primary color
│                                  │
│   "You've been ordering the      │  --text-body, --knomi-text-secondary
│    same 3 dishes for 2 years."   │
│                                  │
│  ┌────────────────────────────┐  │
│  │ • You pick appetizers in    │  │  Trait cards: --knomi-surface-card bg
│  │   10 seconds. Mains take   │  │  --text-body-sm
│  │   20 minutes.              │  │
│  └────────────────────────────┘  │
│                                  │
│  Spicier than 73% of players     │  --text-caption, --knomi-text-muted
│  Only 12% share your type        │
│                                  │
│  ┌─────────────────────────────┐ │
│  │    📥 Download   📤 Share   │ │  Action buttons
│  └─────────────────────────────┘ │
│                                  │
│     KNOMI Knows You              │  Branding footer
└──────────────────────────────────┘
```

### 8.3 This or That Choice Cards

```
┌──────────────┐ ┌──────────────┐  Two cards side by side
│              │ │              │  Each: width 48%, border-radius 16px
│   [image]    │ │   [image]    │  bg: --knomi-surface-card
│   160x160    │ │   160x160    │
│              │ │              │
│ Butter       │ │ Sushi        │  --text-h3
│ Chicken      │ │ Platter      │
│              │ │              │
│    THIS      │ │    THAT      │  CTA label: --text-overline
└──────────────┘ └──────────────┘

SELECTED: Scale up to 1.05, golden border, glow
REJECTED: Scale down to 0.95, fade to 40% opacity
```

### 8.4 Roast Card (Shareable)

```
┌──────────────────────────────────┐  FULL SCREEN
│     🔥 KNOMI ROASTED YOU 🔥     │  Red/orange header
│                                  │
│     [personality emoji]          │
│     THE GUILTY HEDONIST          │
│                                  │
│  "You ordered Butter Chicken,    │  Roast text in quotes
│   Loaded Fries, AND Lava Cake.   │  --text-body, italic
│   Your arteries just filed a     │
│   restraining order."            │
│                                  │
│  "You picked Chai over Matcha.   │
│   You're not traditional,        │
│   you're just scared of change." │
│                                  │
│     Severity: SAVAGE 🌶️🌶️🌶️    │  Severity indicator
│                                  │
│  ┌─────────────────────────────┐ │
│  │    📥 Download   📤 Share   │ │
│  └─────────────────────────────┘ │
│     KNOMI Knows You              │
└──────────────────────────────────┘
```

### 8.5 Analysis/Loading Screen

```
┌──────────────────────────────────┐
│                                  │
│         [rotating logo]          │  KNOMI logo with spin animation
│                                  │
│   ━━━━━━━━━━━━░░░░░░░░░  67%    │  Animated progress bar
│                                  │  bar color: --knomi-text-accent (#D39858)
│   "Cross-referencing with        │
│    47,382 food personalities..." │  Text changes every 2-3 seconds
│                                  │  Fade in/out transitions
│                                  │
│   [pulsing dots animation]       │
│                                  │
└──────────────────────────────────┘
```

---

## 9. Animation Guidelines

### Page Transitions (Framer Motion)

```typescript
// Standard page transition
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
};
```

### Personality Reveal Animation

```
1. Background gradient fades in (0.5s)
2. Emoji scales from 0 → 1 with spring bounce (0.4s, delay 0.3s)
3. Personality name slides up with stagger (0.3s, delay 0.5s)
4. Tagline fades in (0.3s, delay 0.8s)
5. Trait cards stagger in from bottom (0.2s each, delay 1.0s)
6. Stats counter animates (count up, delay 1.5s)
7. Share buttons slide up (0.3s, delay 2.0s)
```

### Micro-Interactions

| Element | Animation | Duration |
|---|---|---|
| Dish card tap | Scale 0.96 → 1.0 + haptic | 150ms |
| Dish card select | Border glow + checkmark pop | 300ms |
| This or That choice | Selected scales up, rejected fades | 400ms |
| Button hover | Scale 1.02 + subtle glow | 200ms |
| Progress bar | Smooth fill with easing | continuous |
| Counter increment | Number rolls up | 300ms |
| Card entry | Slide up + fade in, staggered | 200ms per card |

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 10. Responsive Breakpoints

| Breakpoint | Width | Target |
|---|---|---|
| **Mobile S** | 320px | Older small phones |
| **Mobile M** | 375px | iPhone SE, standard Android |
| **Mobile L** | 428px | iPhone Pro Max, large Android |
| **Tablet** | 768px | iPad (low priority) |
| **Desktop** | 1024px+ | Fallback only — not primary target |

**Primary design target: 375px width.** All layouts are mobile-first.

---

## 11. Accessibility Baseline

| Requirement | Standard |
|---|---|
| Color contrast (text) | Minimum 4.5:1 (WCAG AA) |
| Color contrast (large text) | Minimum 3:1 |
| Touch targets | Minimum 44x44px |
| Focus indicators | Visible 2px outline on all interactive elements |
| Screen reader | Semantic HTML, aria-labels on icon buttons |
| Reduced motion | Respect `prefers-reduced-motion` |
| Font sizing | Use `rem` units, respect user preferences |
