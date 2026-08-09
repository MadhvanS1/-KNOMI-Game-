# KNOMI Knows You — UI/UX Specification

> **Design Target:** 375px mobile viewport. Thumb-friendly. 60fps. Every interaction should feel premium.

---

## Screen Inventory (Phase 1)

| # | Screen | Route | Mode |
|---|---|---|---|
| 1 | Landing / Home | `/` | All |
| 2 | Menu Browse | `/solo` | Solo, Roast |
| 3 | Analysis Animation | `/solo/analyzing` | Solo, Roast |
| 4 | Personality Reveal | `/solo/result` | Solo |
| 5 | Roast Reveal | `/roast/result` | Roast |
| 6 | This or That Game | `/thisorthat` | This or That |
| 7 | This or That Result | `/thisorthat/result` | This or That |
| 8 | Share Modal | (overlay) | All |
| 9 | About KNOMI | `/about` | All |

---

## Screen 1: Landing / Home

### Layout

```
┌──────────────────────────────────────┐
│            [safe area top]           │
│                                      │
│          ✦ KNOMI ✦                   │  Logo/wordmark, subtle glow
│        KNOWS YOU                     │  --text-hero, staggered entrance
│                                      │
│   "We don't predict your food.       │  --text-body, --knomi-text-secondary
│    We predict YOU."                  │  Fade in after logo (0.5s delay)
│                                      │
│  ┌────────────────────────────────┐  │
│  │  🧠  READ MY FOOD SOUL        │  │  Mode card 1: Solo
│  │  Pick dishes. Get decoded.     │  │  bg: --knomi-surface-card
│  │                           →    │  │  border-radius: 16px
│  └────────────────────────────────┘  │  shadow: --shadow-card
│                                      │
│  ┌────────────────────────────────┐  │
│  │  ⚡  THIS OR THAT             │  │  Mode card 2
│  │  15 choices. No time to lie.   │  │
│  │                           →    │  │
│  └────────────────────────────────┘  │
│                                      │
│  ┌────────────────────────────────┐  │
│  │  💀  GET ROASTED               │  │  Mode card 3: Roast
│  │  Your food order is a red flag.│  │
│  │                           →    │  │
│  └────────────────────────────────┘  │
│                                      │
│   🔮 2,847 food souls analyzed       │  Social proof counter
│                                      │  Counter animates (count up)
│   By KNOMI • @knomi.in              │  Footer link to Instagram
│            [safe area bottom]        │
└──────────────────────────────────────┘
```

### Interactions
- **Mode cards**: Tap → scale 0.97 → navigate to mode with page slide transition
- **Logo**: Subtle floating animation (translateY ±3px, 3s loop)
- **Counter**: Counts up from 0 on page load (1.5s duration)
- **Background**: Subtle radial gradient pulse (very slow, barely visible)

---

## Screen 2: Menu Browse (Solo + Roast)

### Layout

```
┌──────────────────────────────────────┐
│  ← Back              5/7 selected    │  Header: back button + counter
│                                      │
│  Pick 5-7 dishes that speak to you   │  --text-h2
│                                      │
│  [Starters] [Mains] [Desserts] [🍹] │  Category tabs
│   ━━━━━━━━━                          │  Active: underline accent color
│                                      │  Horizontally scrollable
│  ┌────────────────────────────────┐  │
│  │ [img]  Paneer Tikka      ₹249 │  │  Dish card (see design.md)
│  │        Smoky cottage cheese   │  │
│  └────────────────────────────────┘  │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ [img]  Spring Rolls      ₹199 │  │
│  │        Crispy veggie rolls    │  │
│  └────────────────────────────────┘  │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ [img]  Tom Yum Soup      ₹279 │  │  Selected card: golden border
│  │        Thai hot & sour soup   │  │
│  └────────────────────────────────┘  │
│                                      │
│  ... (scrollable list)               │
│                                      │
│  ┌────────────────────────────────┐  │
│  │  ✨ Decode My Food Soul (5/7) │  │  CTA button
│  └────────────────────────────────┘  │  Disabled if < 5 selected
│            [safe area bottom]        │  bg: #D39858 when active
└──────────────────────────────────────┘
```

### Interactions
- **Category tabs**: Tap to switch categories. Smooth scroll to top of new category.
- **Dish cards**: Tap to select/deselect. Selected cards get golden border + checkmark.
- **Selection counter**: "5/7 selected" — updates in real-time. Pulses when hitting min (5).
- **CTA button**:
  - Disabled state: `opacity: 0.4`, `pointer-events: none` when < 5 dishes selected
  - Active state: `bg: #D39858`, subtle glow, tap → navigate to analysis
- **Scroll**: Vertical scrollable list. Category tabs sticky at top.
- **Selection limit**: At 7 selections, show toast: "Maximum 7 dishes selected"

---

## Screen 3: Analysis Animation (Solo + Roast)

### Layout

```
┌──────────────────────────────────────┐
│                                      │
│                                      │
│          [KNOMI logo]                │  Rotating/pulsing animation
│           spinning                   │
│                                      │
│    ━━━━━━━━━━━━━━━░░░░░  74%        │  Animated progress bar
│                                      │  Fills over 10-12 seconds
│                                      │
│   "Cross-referencing with            │  Text changes every 2-3 seconds
│    47,382 food personalities..."     │  Fade in/out transition
│                                      │
│          • • •                       │  Pulsing dots
│                                      │
│                                      │
└──────────────────────────────────────┘
```

### Text Progression Sequence

```
0-2s:   "Analyzing your selections..."
2-4s:   "Cross-referencing with 47,382 food personalities..."
4-6s:   "Interesting... very interesting..."
6-8s:   "You picked spicier than 73% of players"  ← real stat
8-10s:  "Your food DNA has been decoded."
10-11s: "Preparing your result..."
11-12s: [DRAMATIC REVEAL — navigate to result]
```

### Interactions
- **No user interaction possible** — this is a locked animation sequence
- **Back button hidden** — prevent navigation during analysis
- **Progress bar**: Smooth easing, accelerates toward end
- **Background**: Subtle particle/pulse effects (optional, performance-dependent)

---

## Screen 4: Personality Reveal (Solo)

### Layout

```
┌──────────────────────────────────────┐
│                                      │  Background: personality gradient
│         [personality emoji]          │  (see design.md for gradients)
│              48px                    │
│        scale-in animation            │
│                                      │
│     THE COMFORT LOYALIST             │  --text-hero, personality color
│                                      │  Slide up animation
│   "You've been ordering the same     │  --text-body, --knomi-text-secondary
│    3 dishes for 2 years and you      │  Fade in
│    know it."                         │
│                                      │
│  ┌──────────────────────────────┐   │
│  │ 🎯 You pick appetizers in    │   │  Trait card 1
│  │   10 seconds. Mains take     │   │  Staggered entrance
│  │   20 minutes.                │   │  bg: rgba(0,0,0,0.3)
│  └──────────────────────────────┘   │  border-radius: 12px
│  ┌──────────────────────────────┐   │
│  │ 💡 You've never sent food    │   │  Trait card 2
│  │   back even when it was      │   │
│  │   wrong. That's loyalty.     │   │
│  └──────────────────────────────┘   │
│  ┌──────────────────────────────┐   │
│  │ 📱 You've texted "I'll have │   │  Trait card 3
│  │   what you're having" at     │   │
│  │   least once this week.      │   │
│  └──────────────────────────────┘   │
│                                      │
│  🔥 Spicier than 73% of players     │  Animated counter
│  🎯 Only 12% share your type        │  Animated counter
│                                      │
│  KNOMI Predicts: Your next order     │
│  will be Dal Makhani with Naan       │  Prediction section
│                                      │
│  ┌───────────┐  ┌───────────────┐   │
│  │ 📥 Save   │  │ 📤 Share      │   │  Action buttons
│  └───────────┘  └───────────────┘   │
│                                      │
│  [🔄 Play Again]  [🏠 Home]         │  Secondary actions
│                                      │
│     KNOMI Knows You                  │  Branding watermark
└──────────────────────────────────────┘
```

### Interactions
- **Save**: Triggers html2canvas → downloads personality card as PNG
- **Share**: Opens Web Share API (mobile) or copy-link fallback (desktop)
- **Play Again**: Returns to mode selection
- **Home**: Returns to landing page
- **Scroll**: Entire screen is scrollable if content exceeds viewport

---

## Screen 5: Roast Reveal (Roast Mode)

Same structure as Personality Reveal but with:
- Header: "🔥 KNOMI ROASTED YOU 🔥" (red/orange text, pulsing)
- Instead of traits: 3-4 roast lines in quotation marks
- Severity indicator: "Severity: SAVAGE 🌶️🌶️🌶️" or "Severity: MILD 🌶️"
- Different share card layout (optimized for Instagram stories — 9:16)
- More aggressive animations (shake on reveal, fire particle effects)

---

## Screen 6: This or That Game

### Layout

```
┌──────────────────────────────────────┐
│                                      │
│        Round 7 of 15                 │  --text-h3, --knomi-text-secondary
│   ━━━━━━━━━━━━━░░░░░░  47%          │  Progress bar
│                                      │
│    Which one speaks to your soul?    │  --text-body, --knomi-text-muted
│                                      │
│  ┌──────────┐    ┌──────────┐       │
│  │          │    │          │       │
│  │  [food   │    │  [food   │       │  Two cards: 48% width each
│  │  image]  │    │  image]  │       │  Aspect ratio: 3:4
│  │  160px   │    │  160px   │       │
│  │          │    │          │       │
│  │ Butter   │    │ Sushi    │       │  --text-h3
│  │ Chicken  │    │ Platter  │       │
│  │          │    │          │       │
│  │   THIS   │    │   THAT   │       │  CTA label
│  └──────────┘    └──────────┘       │
│                                      │
│                                      │
└──────────────────────────────────────┘
```

### Interactions
- **Card tap**: Selected card scales to 1.05 + golden glow. Rejected card scales to 0.9 + fades to 40% opacity.
- **Transition**: After 400ms, both cards exit (selected slides up, rejected slides down), new pair enters from sides.
- **Progress bar**: Fills incrementally with each round.
- **No back button**: Can't go back to previous rounds.
- **Round 15 complete**: Automatic transition to analysis screen.

---

## Screen 7: This or That Result

Same as Screen 4 (Personality Reveal) — identical layout and animations.

---

## Screen 8: Share Modal (Overlay)

### Layout

```
┌──────────────────────────────────────┐
│          (dimmed background)         │  bg: rgba(0,0,0,0.6)
│                                      │  backdrop-filter: blur(8px)
│  ┌──────────────────────────────┐   │
│  │        Share Your Result      │   │  Modal: bg: --knomi-bg-elevated
│  │                               │   │  border-radius: 24px (top)
│  │  [personality card preview]   │   │  Slides up from bottom
│  │        (miniature)            │   │
│  │                               │   │
│  │  ┌─────┐ ┌─────┐ ┌─────┐    │   │
│  │  │ 📥  │ │ 📋  │ │ 📤  │    │   │  Icon buttons
│  │  │Save │ │Copy │ │Share│    │   │  bg: --knomi-surface-card
│  │  └─────┘ └─────┘ └─────┘    │   │
│  │                               │   │
│  │  ┌─────────────────────────┐ │   │
│  │  │ 💬  Share on WhatsApp   │ │   │  Full-width buttons
│  │  └─────────────────────────┘ │   │
│  │  ┌─────────────────────────┐ │   │
│  │  │ 📷  Share on Instagram  │ │   │
│  │  └─────────────────────────┘ │   │
│  │                               │   │
│  │       [× Close]               │   │
│  └──────────────────────────────┘   │
└──────────────────────────────────────┘
```

### Interactions
- **Save**: html2canvas → downloadable PNG
- **Copy**: Copies share URL to clipboard → shows "Copied!" toast
- **Share**: Web Share API → native share sheet
- **WhatsApp**: Deep link `whatsapp://send?text=...`
- **Instagram**: Downloads image + shows instruction toast "Image saved! Open Instagram Stories to share"
- **Close**: Tap outside modal or close button → modal slides down
- **Backdrop**: Tap dimmed background to close

---

## Screen 9: About KNOMI

### Layout

```
┌──────────────────────────────────────┐
│  ← Back                             │
│                                      │
│         [KNOMI logo]                 │
│                                      │
│   KNOMI is the food personality      │
│   engine. We don't predict what      │
│   you want to eat — we predict       │
│   who you ARE based on how           │
│   you eat.                           │
│                                      │
│   Built for restaurants that         │
│   want to truly know their guests.   │
│                                      │
│   ┌─────────────────────────────┐   │
│   │  Follow us @knomi.in        │   │  Link to Instagram
│   └─────────────────────────────┘   │
│                                      │
│   Made with 🔥 in Bangalore         │
│                                      │
└──────────────────────────────────────┘
```

---

## Transition Animations

| From → To | Animation |
|---|---|
| Landing → Mode | Slide left, 400ms |
| Menu Browse → Analysis | Crossfade, 500ms |
| Analysis → Reveal | Scale up from center + fade, 600ms |
| Any → Share Modal | Slide up from bottom, 300ms |
| Share Modal → Dismiss | Slide down, 200ms |
| This or That round → next | Cards exit left/right, new enter from sides, 400ms |
| Any → Home | Slide right, 400ms |

---

## Error States

| Scenario | UI Response |
|---|---|
| **< 5 dishes selected, tap CTA** | CTA button shakes + tooltip: "Pick at least 5 dishes" |
| **Network error (image load)** | Show placeholder with dish initial letter on colored bg |
| **Share API unavailable** | Fallback to copy-link button |
| **html2canvas fails** | Show "Copy link instead" option |
| **User closes mid-game** | On return, show: "Welcome back! Start fresh or continue?" |

---

## Loading & Skeleton States

### Dish Card Skeleton
```
┌──────────────────────────────────┐
│ ┌────────┐  ░░░░░░░░░░░░░  ░░░ │  Pulsing gray blocks
│ │ ░░░░░░ │  ░░░░░░░░░░░░░░░░░░ │  animation: pulse 1.5s infinite
│ │ ░░░░░░ │                      │
│ └────────┘                      │
└──────────────────────────────────┘
```

### Page Loading
- Show KNOMI logo with subtle breathing animation
- Transition to content with fade-in

---

## Haptic Feedback (Mobile)

| Action | Haptic Type |
|---|---|
| Dish card select | `navigator.vibrate(10)` — light tap |
| This or That choice | `navigator.vibrate(15)` — medium tap |
| Personality reveal | `navigator.vibrate([50, 30, 50])` — pattern |
| Share button tap | `navigator.vibrate(10)` — light tap |
| Error/shake | `navigator.vibrate([10, 20, 10, 20, 10])` — error pattern |

---

## Mobile-Specific UX

| Consideration | Implementation |
|---|---|
| **Safe areas** | `env(safe-area-inset-top/bottom)` for notch/home indicator |
| **Thumb zone** | Primary actions (CTA, mode cards) in bottom 60% of screen |
| **Pull to refresh** | Disabled — no server data to refresh |
| **Overscroll** | `overscroll-behavior: none` — prevent rubber-banding |
| **Text selection** | Disabled on game UI elements, enabled on result text |
| **Zoom** | Disabled: `<meta name="viewport" content="... maximum-scale=1">` |
| **Orientation** | Portrait locked via manifest + CSS `@media (orientation: landscape)` warning |
