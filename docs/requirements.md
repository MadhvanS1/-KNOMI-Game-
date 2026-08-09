# KNOMI Knows You — Requirements Document

> **Project:** KNOMI Knows You (Viral Food Personality Game)
> **Version:** 1.0 — Phase 1 MVP
> **Last Updated:** August 10, 2025
> **Deadline:** August 27, 2025 (Constellation College Fest)

---

## 1. Project Overview & Objectives

**KNOMI Knows You** is a standalone, mobile-first web app that decodes a user's food personality based on their food choices. It serves as KNOMI's primary B2C marketing engine — a viral traction tool that:

1. **Captures attention** — Through entertaining, shareable food personality analysis
2. **Collects food preference data** — Every play generates a food profile
3. **Drives brand awareness** — Every share puts KNOMI in front of new users
4. **Builds B2B leverage** — Aggregated data demonstrates consumer demand to restaurants

### Success Metrics (by Aug 31)
| Metric | Target |
|---|---|
| Total game plays | 500–1,000 |
| Unique food profiles | 300–600 |
| Share rate (plays → shares) | 15–25% |
| Instagram story shares | 100–200 |
| KNOMI Instagram followers | 800–1,500 |

### Constraints
- **Budget:** ₹0 (zero rupees)
- **Timeline:** 17 days to MVP (Aug 10 → Aug 27)
- **Backend:** None for Phase 1 — pure client-side application
- **Team:** Solo developer
- **Hosting:** Free tier only (Vercel/Netlify)

---

## 2. Functional Requirements — Phase 1 MVP

### 2.1 Game Modes (3 modes for MVP)

#### MODE 1: Solo Mode — "Read My Food Soul"
| Requirement | Detail |
|---|---|
| **Entry** | User taps "Solo" on the landing page |
| **Menu Browse** | Display 30 dishes across 4 categories with horizontal/vertical scroll |
| **Selection** | User must select 5–7 dishes (enforce min/max) |
| **Selection UI** | Tap to select/deselect, visual "plate" counter at bottom |
| **Analysis** | 10–12 second animation with suspenseful text progression |
| **Reveal** | Full-screen personality card with name, emoji, tagline, 3 traits |
| **Stats** | Show: "Spicier than X% of players", "Only Y% share your type" |
| **Prediction** | "KNOMI predicts your next order: [dish]" |
| **Share** | Download card as image, share via Web Share API, copy link |

#### MODE 2: This or That — "Binary Food Choices"
| Requirement | Detail |
|---|---|
| **Entry** | User taps "This or That" on the landing page |
| **Rounds** | 15 rounds of binary food choices |
| **UI** | Two dish cards side-by-side, tap to choose |
| **Timer** | 5-second countdown per round (optional — can be untimed for MVP) |
| **Round Counter** | "Round 7/15" progress indicator |
| **Scoring** | Each choice maps to dimension scores (same 6-dimension system) |
| **Reveal** | Same personality reveal as Solo mode |
| **Share** | Same share flow as Solo mode |

#### MODE 3: Roast Mode — "Get Roasted by Your Food"
| Requirement | Detail |
|---|---|
| **Entry** | User taps "Roast" on the landing page |
| **Flow** | Same menu browse + selection as Solo mode |
| **Severity** | User chooses: "Mild Tease" or "Savage Roast 🔥" |
| **Reveal** | Instead of standard personality card, shows a Roast Card |
| **Roast Content** | 3–4 brutally funny roast lines based on personality + specific dishes |
| **Roast Card** | Dark themed, "KNOMI ROASTED" header, personality name, roast lines |
| **Share** | Designed specifically for Instagram story sharing (9:16 aspect ratio) |

### 2.2 Landing / Home Screen
| Requirement | Detail |
|---|---|
| **Hero** | KNOMI logo + "KNOMI Knows You" title + tagline |
| **Mode Cards** | 3 mode selection cards (Solo, This or That, Roast) |
| **Social Proof** | Counter: "X food souls analyzed" (stored in localStorage, seeded at 200) |
| **Footer** | "By KNOMI — The food personality engine" + link to KNOMI Instagram |

### 2.3 The 30-Dish Virtual Menu

The menu consists of 30 dishes spanning Indian, Continental, Asian, and fusion cuisines:

#### Starters (8 dishes)
| # | Dish | Category Notes |
|---|---|---|
| 1 | Paneer Tikka | Safe Indian classic |
| 2 | Spring Rolls | Generic Asian |
| 3 | Nachos with Salsa | Western comfort |
| 4 | Tom Yum Soup | Adventurous, spicy |
| 5 | Bruschetta | Sophisticated |
| 6 | Chicken Wings (Peri Peri) | Spicy indulgence |
| 7 | Edamame | Healthy, subtle |
| 8 | Loaded Fries | Pure indulgence |

#### Mains (10 dishes)
| # | Dish | Category Notes |
|---|---|---|
| 9 | Butter Chicken | Ultimate comfort, low adventure |
| 10 | Sushi Platter | High adventure, sophisticated |
| 11 | Margherita Pizza | Safe, social |
| 12 | Biryani (Dum) | Comfort, spice, traditional |
| 13 | Pad Thai | Adventurous, balanced |
| 14 | Grilled Salmon | Sophisticated, healthy |
| 15 | Chole Bhature | Indulgent comfort |
| 16 | Ramen | Adventurous, comfort crossover |
| 17 | Caesar Salad | Healthy, sophisticated |
| 18 | Double Cheeseburger | Pure indulgence, social |

#### Desserts (6 dishes)
| # | Dish | Category Notes |
|---|---|---|
| 19 | Gulab Jamun | Traditional comfort |
| 20 | Chocolate Lava Cake | Indulgent, universal |
| 21 | Tiramisu | Sophisticated, adventurous |
| 22 | Mango Kulfi | Traditional, comfort |
| 23 | Cheesecake | Western indulgence |
| 24 | Fresh Fruit Bowl | Health-conscious |

#### Drinks (6 dishes)
| # | Dish | Category Notes |
|---|---|---|
| 25 | Masala Chai | Ultimate comfort, traditional |
| 26 | Matcha Latte | Trendy, sophisticated |
| 27 | Mango Lassi | Comfort, traditional |
| 28 | Cold Brew Coffee | Modern, subtle |
| 29 | Fresh Lime Soda | Simple, classic |
| 30 | Oreo Milkshake | Indulgent, playful |

### 2.4 Dish Dimension Tagging System

Each dish is tagged across **6 hidden dimensions** (1–10 scale):

| Dimension | What It Measures | Example |
|---|---|---|
| **Adventure** | Willingness to try unfamiliar food | Sushi = 8, Butter Chicken = 2 |
| **Comfort** | Preference for familiar, warm food | Biryani = 9, Sushi = 3 |
| **Spice** | Tolerance/love for heat | Peri Peri Wings = 9, Caesar Salad = 1 |
| **Social** | Food as social experience | Pizza = 8, Ramen = 3 |
| **Indulgence** | Willingness to indulge without guilt | Lava Cake = 9, Fruit Bowl = 1 |
| **Sophistication** | Appreciation for refined food | Tiramisu = 8, Loaded Fries = 2 |

### 2.5 The 8 Food Personalities

| # | Personality | Trigger Condition | Tagline |
|---|---|---|---|
| 1 | **The Comfort Loyalist** 🍛 | Comfort ≥ 7, Adventure < 5 | "You've been ordering the same 3 dishes for 2 years." |
| 2 | **The Menu Anarchist** 🌀 | Adventure ≥ 7, no dominant pattern | "Your order makes no sense and that's the point." |
| 3 | **The Spice Sovereign** 🔥 | Spice ≥ 7 | "You don't ask for spice level. Spice level asks for you." |
| 4 | **The Social Feeder** 🍽️ | Social ≥ 7 | "You order for the table, not yourself." |
| 5 | **The Silent Connoisseur** 🥂 | Sophistication ≥ 7, Indulgence < 5 | "You eat to experience, not to fill." |
| 6 | **The Guilty Hedonist** 🧈 | Indulgence ≥ 7, Comfort ≥ 5 | "Calories are a myth invented by people who never had butter chicken at 2 AM." |
| 7 | **The Balanced Diplomat** ⚖️ | All dimensions 4–6 range | "Everyone trusts you to pick the restaurant." |
| 8 | **The Chaos Agent** 💀 | Contradictory signals (high health + high indulgence) | "You ordered salad AND chocolate cake. We can't read you." |

### 2.6 Scoring Algorithm

```
1. For each selected dish, retrieve its 6 dimension scores
2. Average each dimension across all selected dishes
3. Identify the top 2 dominant dimensions (highest averages)
4. Check for contradiction patterns:
   - Adventure > 7 AND Comfort > 7 → Chaos Agent
   - Indulgence > 7 AND any health item selected → Chaos Agent
   - All dimensions within 4-6 → Balanced Diplomat
   - Spice variance extreme → chaos signal
5. If no contradictions: map top 2 dimensions to closest personality
6. Generate personality-specific traits using dish-specific observations
7. Calculate percentile stats against historical data (localStorage)
```

### 2.7 Share & Social Features
| Feature | Implementation |
|---|---|
| **Download Card** | Render personality card as image via html2canvas → download as PNG |
| **Web Share API** | Use `navigator.share()` for native mobile sharing |
| **WhatsApp Share** | Deep link: `whatsapp://send?text=...` |
| **Instagram Story** | Download image → user manually uploads to story |
| **Copy Link** | Clipboard API: `navigator.clipboard.writeText()` |
| **Share URL** | `play.knomi.in/result/[personality-slug]` with OG meta tags |

### 2.8 Analytics Requirements (Phase 1 — localStorage)
| Event | Data Captured |
|---|---|
| `game_start` | mode, timestamp |
| `dish_selected` | dishId, category, timestamp |
| `game_complete` | mode, personality, dimensionScores, duration |
| `share_initiated` | mode, personality, shareMethod |
| `return_visit` | previousPersonality, timestamp |

---

## 3. Non-Functional Requirements

| Category | Requirement |
|---|---|
| **Performance** | First Contentful Paint < 1.5s, Time to Interactive < 3s |
| **Bundle Size** | Initial JS bundle < 150KB gzipped |
| **Animation** | 60fps for all transitions and reveal animations |
| **Mobile-First** | Designed for 360px–428px viewport width |
| **PWA** | Installable, offline-capable (cache static assets) |
| **Browser Support** | Chrome 90+, Safari 15+ (iOS), Samsung Internet |
| **Accessibility** | Touch targets ≥ 44px, readable contrast ratios |
| **Offline** | Game playable without network (all data bundled client-side) |
| **No Auth** | Zero friction — no login, no signup, no phone number |

---

## 4. Phase 2 Future Modes (Post-Launch)

| Mode | Description | Priority |
|---|---|---|
| Challenge Mode | "Break KNOMI" — try to fool the algorithm | P1 |
| Couple Mode | Compare two players' food compatibility | P1 |
| Speed Round | 20-second timer, rapid selections, pressure | P2 |
| Roast Squad | Group of friends, public roast rankings | P2 |
| Russian Roulette | Random player gets roasted, others watch | P3 |
| The Traitor | Guess which friend's order is fake | P3 |
| Food Court | Full simulation with strategy elements | P3 |
| Mood Menu | KNOMI suggests dishes based on your mood | P2 |

---

## 5. Out of Scope (Phase 1)

- User accounts / authentication
- Backend server / database
- Real-time multiplayer
- Payment processing
- Restaurant integration
- Push notifications
- Chat features
- Leaderboards (server-side)
