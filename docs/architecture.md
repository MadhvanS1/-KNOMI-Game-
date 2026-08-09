# KNOMI Knows You — Application Architecture

> **Architecture Overview:** Standalone, single-page web application (SPA) built with React 19, TypeScript, Vite 7, Zustand, and CSS Modules. Designed for 100% client-side execution with zero backend dependency for Phase 1 MVP.

---

## 1. High-Level Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                          USER BROWSER / PWA                            │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                          VIEW LAYER                              │  │
│  │  React 19 + TypeScript + Framer Motion + Lucide Icons             │  │
│  │                                                                  │  │
│  │  ┌───────────┐  ┌───────────┐  ┌──────────────┐  ┌────────────┐  │  │
│  │  │  Landing  │  │ Solo Mode │  │ This or That │  │ Roast Mode │  │  │
│  │  │   Page    │  │  Screen   │  │    Screen    │  │   Screen   │  │  │
│  │  └───────────┘  └───────────┘  └──────────────┘  └────────────┘  │  │
│  │        │              │               │                │         │  │
│  │        └──────────────┴───────┬───────┴────────────────┘         │  │
│  │                               ▼                                  │  │
│  │                   ┌───────────────────────┐                      │  │
│  │                   │ Share / Result Cards  │                      │  │
│  │                   └───────────────────────┘                      │  │
│  └───────────────────────────────┬──────────────────────────────────┘  │
│                                  │                                     │
│                                  ▼                                     │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                     STATE & ENGINE LAYER                         │  │
│  │                                                                  │  │
│  │  ┌────────────────┐  ┌────────────────┐  ┌───────────────────┐  │  │
│  │  │   gameStore    │  │ selectionStore │  │    resultStore    │  │  │
│  │  │ (Zustand state)│  │ (dishes/picks) │  │  (decoded type)   │  │  │
│  │  └────────────────┘  └────────────────┘  └───────────────────┘  │  │
│  │                               │                                  │  │
│  │                               ▼                                  │  │
│  │                  ┌────────────────────────┐                      │  │
│  │                  │  PERSONALITY ENGINE    │                      │  │
│  │                  │ (6-Dim Scoring Logic)  │                      │  │
│  │                  └────────────────────────┘                      │  │
│  └───────────────────────────────┬──────────────────────────────────┘  │
│                                  │                                     │
│                                  ▼                                     │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                      DATA & UTILITIES LAYER                      │  │
│  │                                                                  │  │
│  │  ┌───────────────┐  ┌────────────────┐  ┌─────────────────────┐  │  │
│  │  │  dishes.json  │  │ personalities  │  │     roasts.json     │  │  │
│  │  │  (30 items)   │  │   (8 types)    │  │   (roast scripts)   │  │  │
│  │  └───────────────┘  └────────────────┘  └─────────────────────┘  │  │
│  │                                                                  │  │
│  │  ┌───────────────┐  ┌────────────────┐  ┌─────────────────────┐  │  │
│  │  │  html2canvas  │  │  localStorage  │  │   Web Share API     │  │  │
│  │  │  (Card Export)│  │  (Stats Sync)  │  │  (Native Sharing)   │  │  │
│  │  └───────────────┘  └────────────────┘  └─────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Directory & Component Structure

Following a modular, feature-based architecture aligned with Feature-Sliced Design (FSD) light:

```
src/
├── app/                        # App entry point, routing, global context
│   ├── App.tsx                 # Main Application Component
│   ├── main.tsx                # Mount & ServiceWorker Registration
│   ├── router.tsx              # React Router v7 configuration
│   └── registerServiceWorker.ts# PWA registration script
│
├── assets/                     # Static images, vectors, mascots, branding
│   ├── dishes/                 # High-quality dish visuals
│   ├── icons/                  # SVGs and UI icons
│   └── logos/                  # KNOMI brand logos
│
├── components/                 # Reusable Presentation UI Components
│   ├── common/                 # Global primitive UI controls
│   │   ├── Button.tsx          # Standard themed CTA buttons
│   │   ├── Card.tsx            # Base surface cards
│   │   ├── Header.tsx          # App header & branding bar
│   │   ├── Modal.tsx           # Overlay modal wrapper
│   │   ├── ProgressBar.tsx    # Step & timer progress indicators
│   │   └── Toast.tsx           # Temporary notification toasts
│   └── game/                   # Shared game UI widgets
│       ├── AnalysisOverlay.tsx # 10-second suspense loading screen
│       ├── CategoryTabs.tsx    # Menu section switcher
│       ├── DishCard.tsx        # Individual dish tile
│       ├── ModeCard.tsx        # Landing page game mode entry tile
│       └── PlateBar.tsx        # Floating selection counter bar
│
├── data/                       # Static JSON datasets (Bundled into app)
│   ├── dishes.json             # 30 menu dishes with 6 dimension scores
│   ├── personalities.json      # 8 personality definitions & quotes
│   ├── roasts.json             # Mild and Savage roast lines
│   └── thisOrThatPairs.json    # 15 paired binary choices
│
├── features/                   # Business Logic & Screen Modules
│   ├── landing/                # Home screen module
│   │   └── LandingPage.tsx
│   ├── solo/                   # Solo mode module
│   │   ├── SoloPage.tsx        # Menu selection screen
│   │   └── SoloResultPage.tsx  # Personality reveal screen
│   ├── this-or-that/           # Binary choice game module
│   │   ├── ThisOrThatPage.tsx  # Round selector screen
│   │   └── ResultPage.tsx      # Binary choice analysis screen
│   ├── roast/                  # Roast mode module
│   │   ├── RoastPage.tsx       # Selection screen with severity toggle
│   │   └── RoastResultPage.tsx # Brutal roast card screen
│   └── share/                  # Sharing & export engine
│       ├── ShareModal.tsx      # Native share / social popup
│       └── CardExporter.tsx    # html2canvas image generator
│
├── engine/                     # Core Business Logic & Scoring
│   ├── scoringEngine.ts        # Dimension averaging & contradiction algorithms
│   ├── personalityMatcher.ts   # Map scores to 1 of 8 personality types
│   ├── roastGenerator.ts       # Contextual roast assembly logic
│   └── statsCalculator.ts      # Percentile calculations against local benchmark
│
├── hooks/                      # Custom React Hooks
│   ├── usePersonalityEngine.ts # Facade hook for scoring calculations
│   ├── useShareCard.ts         # Hook managing html2canvas rendering
│   ├── useHaptics.ts           # Mobile vibration feedback hook
│   └── useLocalStorage.ts      # Persistent local state sync hook
│
├── stores/                     # Zustand Global Stores
│   ├── useGameStore.ts         # Active mode, current step, timer state
│   ├── useSelectionStore.ts    # Selected dish IDs, binary choices
│   ├── useResultStore.ts       # Generated personality, stats, roasts
│   └── useAnalyticsStore.ts    # Local stats counter & play metrics
│
├── styles/                     # Styling System
│   ├── tokens.css              # Design tokens (--knomi-* CSS variables)
│   ├── globals.css             # Base CSS resets & font imports
│   ├── typography.css          # Font classes & sizes
│   └── animations.css          # Framer motion & CSS keyframe definitions
│
├── types/                      # TypeScript Schemas & Interfaces
│   ├── dish.ts                 # Dish & Dimension definitions
│   ├── personality.ts          # Personality & Trait definitions
│   ├── game.ts                 # Game states & mode enum
│   └── share.ts                # Export payload interfaces
│
└── utils/                      # Helper Utilities
    ├── formatters.ts           # Currency and string formatting
    ├── imageUtils.ts           # Asset URL resolvers
    └── random.ts               # Seeded randomizers for roasts
```

---

## 3. State Architecture (Zustand Stores)

The application uses **Zustand** for predictable, selector-based client state without React Context re-render penalties:

```
                      ┌────────────────────────┐
                      │     useGameStore       │
                      │  - activeMode          │
                      │  - currentStep         │
                      │  - isAnalyzing        │
                      └───────────┬────────────┘
                                  │
         ┌────────────────────────┴────────────────────────┐
         ▼                                                 ▼
┌────────────────────────┐                       ┌────────────────────────┐
│   useSelectionStore    │                       │    useResultStore      │
│  - selectedDishIds[]   │                       │  - personality         │
│  - thisOrThatPicks[]   │  ──▶ ScoringEngine ──▶│  - dimensionScores     │
│  - severity ("savage") │                       │  - generatedRoast      │
└────────────────────────┘                       └────────────────────────┘
                                                           │
                                                           ▼
                                                 ┌────────────────────────┐
                                                 │   useAnalyticsStore    │
                                                 │  - totalPlayCount      │
                                                 │  - distributionMap     │
                                                 └────────────────────────┘
```

### Store Schemas:

#### `useGameStore`
- `activeMode`: `'solo' | 'this-or-that' | 'roast' | null`
- `step`: `'idle' | 'browsing' | 'analyzing' | 'revealed'`
- `setMode(mode)`: Sets active game mode
- `setStep(step)`: Transitions step
- `resetGame()`: Clears active game state

#### `useSelectionStore`
- `selectedDishIds`: `string[]` (max 7 items)
- `thisOrThatAnswers`: `Record<number, 'optionA' | 'optionB'>`
- `roastSeverity`: `'mild' | 'savage'`
- `toggleDish(id)`: Adds or removes a dish ID
- `recordBinaryChoice(round, choice)`: Stores round decision
- `clearSelections()`: Resets selections

#### `useResultStore`
- `personality`: `PersonalityType | null`
- `dimensionScores`: `Record<Dimension, number>`
- `roast`: `RoastResult | null`
- `computedTraits`: `string[]`
- `calculateResults()`: Invokes `ScoringEngine` and saves output

---

## 4. The Personality & Scoring Engine Logic

```
   Selected Dishes (5-7)
           │
           ▼
┌───────────────────────┐
│  Dimension Averaging  │  Calculate mean across 6 dimensions:
│  (1-10 Scale)         │  [Adventure, Comfort, Spice, Social, Indulgence, Sophistication]
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│ Contradiction Check   │  Is (Adventure > 7 AND Comfort > 7)? -> Chaos Agent 💀
│  (Special Override)   │  Is (Indulgence > 7 AND Healthy item selected)? -> Chaos Agent 💀
└──────────┬────────────┘  Are all dimensions 4-6? -> Balanced Diplomat ⚖️
           │
           ├─── (If contradiction met) ──▶ Assign Special Archetype
           │
           ▼ (If standard pattern)
┌───────────────────────┐
│  Vector Distance Match│  Compare user scores against 8 archetype centroids
│  (Euclidean Distance) │  Identify nearest personality profile
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│ Trait & Roast Assembly│  Inject dish-specific observations into text templates
└───────────────────────┘
```

---

## 5. Share Card Rendering Pipeline

To guarantee client-side generation without server dependencies:

1. Render hidden off-screen `<div>` with precise `9:16` aspect ratio (`1080x1920` scaled down to `360x640` viewport).
2. Apply inline CSS variables for the specific personality's color palette.
3. Call `html2canvas(element, { scale: 2, useCORS: true, backgroundColor: null })`.
4. Convert generated canvas to Blob: `canvas.toBlob((blob) => ...)`
5. Pass Blob to `navigator.share({ files: [file] })` or initiate `<a>` download tag.

---

## 6. PWA & Caching Architecture

- **Manifest**: Defines app title, dark background `#150C0C`, theme color `#D39858`, and mobile icons.
- **Service Worker (Workbox / Vite PWA)**:
  - **Precache**: All HTML, JavaScript, CSS, and static JSON datasets.
  - **Stale-While-Revalidate**: Image assets (`/assets/dishes/*`).
  - **Offline Capability**: Game fully playable without internet connection after initial load.
