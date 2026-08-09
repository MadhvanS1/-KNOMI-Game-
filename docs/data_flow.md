# KNOMI Knows You — Data Flow Specification

> **Overview:** Comprehensive mapping of data states, data model schemas, transformation pipelines, and event flows throughout the KNOMI Knows You game lifecycle.

---

## 1. Game Mode Data Flows

### 1.1 Solo Mode Data Flow

```
┌──────────────┐     Select Mode     ┌────────────────────────┐
│ Landing Page │ ──────────────────▶ │  useGameStore          │
└──────────────┘                     │  - activeMode = 'solo' │
                                     └───────────┬────────────┘
                                                 │
                                                 ▼
┌──────────────┐     Pick 5-7        ┌────────────────────────┐
│  Menu Browse │ ──────────────────▶ │  useSelectionStore     │
│  (30 Dishes) │     Dishes          │  - selectedDishIds[]   │
└──────────────┘                     └───────────┬────────────┘
                                                 │
                                     Tap "Decode"│
                                                 ▼
┌──────────────┐     Trigger 10s     ┌────────────────────────┐
│  Analyzing   │ ──────────────────▶ │  ScoringEngine.ts      │
│   Screen     │     Animation       │  - Calculate dimensions│
└──────────────┘                     │  - Match personality   │
                                     └───────────┬────────────┘
                                                 │
                                                 ▼
┌──────────────┐     Display Card    ┌────────────────────────┐
│ Personality  │ ◀────────────────── │  useResultStore        │
│ Reveal Screen│                     │  - personality object  │
└──────┬───────┘                     │  - traits & statistics │
       │                             └────────────────────────┘
       │ Tap "Share"
       ▼
┌──────────────┐     Export Canvas   ┌────────────────────────┐
│  Share Modal │ ──────────────────▶ │ html2canvas → PNG Blob │
└──────────────┘                     │ Native / WhatsApp Share│
                                     └────────────────────────┘
```

---

### 1.2 This or That Mode Data Flow

```
┌─────────────────┐    Round 1 of 15     ┌─────────────────────────┐
│ This or That    │ ───────────────────▶ │  thisOrThatPairs.json   │
│ Selection Page  │                      │  Option A vs Option B   │
└────────┬────────┘                      └────────────┬────────────┘
         │                                            │
         │ User Taps Choice                           │
         ▼                                            ▼
┌─────────────────┐    Record Choice     ┌─────────────────────────┐
│ useSelection    │ ───────────────────▶ │ thisOrThatAnswers[round]│
│ Store           │                      │ = 'optionA' | 'optionB' │
└────────┬────────┘                      └────────────┬────────────┘
         │                                            │
         │ Next Round (until 15)                      │
         ▼                                            ▼
┌─────────────────┐    Calculate Scores  ┌─────────────────────────┐
│ ScoringEngine   │ ───────────────────▶ │ Map 15 selections to    │
│ (Binary Engine) │                      │ 6 dimensional scores    │
└────────┬────────┘                      └────────────┬────────────┘
         │                                            │
         ▼                                            ▼
┌─────────────────┐    Set Result        ┌─────────────────────────┐
│ Personality     │ ◀─────────────────── │ useResultStore          │
│ Reveal Screen   │                      │ (Personality + Traits)  │
└─────────────────┘                      └─────────────────────────┘
```

---

### 1.3 Roast Mode Data Flow

```
┌──────────────┐    Select Roast Mode   ┌────────────────────────┐
│ Landing Page │ ─────────────────────▶ │ useSelectionStore      │
└──────────────┘                        │ - roastSeverity        │
                                        │   ('mild' | 'savage')  │
                                        └───────────┬────────────┘
                                                    │
                                                    ▼
┌──────────────┐    Pick 5-7 Dishes     ┌────────────────────────┐
│  Menu Browse │ ─────────────────────▶ │ selectedDishIds[]      │
└──────────────┘                        └───────────┬────────────┘
                                                    │
                                                    ▼
┌──────────────┐    Run Engine + Roast  ┌────────────────────────┐
│  Analyzing   │ ─────────────────────▶ │  roastGenerator.ts     │
│   Screen     │    Script Assembly     │  - Read personality    │
└──────────────┘                        │  - Pick dish callouts  │
                                        └───────────┬────────────┘
                                                    │
                                                    ▼
┌──────────────┐    Display Roast Card  ┌────────────────────────┐
│ Roast Result │ ◀───────────────────── │ useResultStore         │
│ Reveal Screen│                        │ - roastResult payload  │
└──────────────┘                        └────────────────────────┘
```

---

## 2. TypeScript Data Schemas

### 2.1 Dish Schema (`types/dish.ts`)

```typescript
export type DimensionKey = 
  | 'adventure' 
  | 'comfort' 
  | 'spice' 
  | 'social' 
  | 'indulgence' 
  | 'sophistication';

export type DishCategory = 'starters' | 'mains' | 'desserts' | 'drinks';

export interface DimensionScores {
  adventure: number;     // 1 to 10
  comfort: number;       // 1 to 10
  spice: number;         // 1 to 10
  social: number;        // 1 to 10
  indulgence: number;    // 1 to 10
  sophistication: number;// 1 to 10
}

export interface Dish {
  id: string;
  name: string;
  category: DishCategory;
  price: number; // in INR (e.g. 249)
  description: string;
  imageUrl: string;
  dimensions: DimensionScores;
  tags?: string[];
}
```

---

### 2.2 Personality Schema (`types/personality.ts`)

```typescript
export type PersonalityId =
  | 'comfort-loyalist'
  | 'menu-anarchist'
  | 'spice-sovereign'
  | 'social-feeder'
  | 'silent-connoisseur'
  | 'guilty-hedonist'
  | 'balanced-diplomat'
  | 'chaos-agent';

export interface PersonalityColorPalette {
  primary: string;    // e.g. '#E8A849'
  secondary: string;  // e.g. '#5C3D1A'
  glow: string;       // e.g. 'rgba(232,168,73,0.25)'
  text: string;       // e.g. '#FFF5E6'
}

export interface PersonalityProfile {
  id: PersonalityId;
  name: string;
  tagline: string;
  emoji: string;
  colors: PersonalityColorPalette;
  baseTraits: string[];
  predictionText: string;
  populationPercentile: number; // e.g. 12 (means 12% share this type)
}
```

---

### 2.3 Roast Schema (`types/roast.ts`)

```typescript
export type SeverityLevel = 'mild' | 'savage';

export interface DishSpecificRoast {
  dishId: string;
  roastLine: string;
}

export interface RoastPayload {
  personalityId: PersonalityId;
  severity: SeverityLevel;
  headline: string;
  punchlines: string[];
  dishCallout?: string;
}
```

---

## 3. Local Analytics & Persistence Data Schema

State persisted in browser `localStorage` under key `knomi_game_stats_v1`:

```json
{
  "totalPlays": 142,
  "lastPlayedAt": "2026-08-10T02:30:00.000Z",
  "history": [
    {
      "id": "play_9f81a2",
      "mode": "solo",
      "personalityId": "comfort-loyalist",
      "timestamp": "2026-08-10T02:30:00.000Z",
      "shared": true
    }
  ],
  "personalityDistribution": {
    "comfort-loyalist": 52,
    "guilty-hedonist": 28,
    "spice-sovereign": 19,
    "social-feeder": 15,
    "silent-connoisseur": 11,
    "menu-anarchist": 8,
    "balanced-diplomat": 6,
    "chaos-agent": 3
  }
}
```

---

## 4. Share Card Generation Data Transformation

```
DOM Node (#personality-share-card)
  │
  ├── 1. CSS Custom Properties Resolution (--knomi-*)
  │
  ├── 2. html2canvas Execution
  │      └─ Window dimensions: 1080x1920 (9:16 ratio)
  │      └─ Canvas Render Scale: 2.0
  │
  ├── 3. Canvas → Blob Conversion
  │      └─ MIME type: 'image/png'
  │
  └── 4. Output Payload:
         File Name: `KNOMI_Food_Personality_[personalityId].png`
```
