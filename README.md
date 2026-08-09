# 🏆 KNOMI KNOWS YOU — VIRAL FOOD PERSONALITY GAME
> *"We don't predict your food. We predict YOU."*

[![GitHub Repository](https://img.shields.io/badge/GitHub-MadhvanS1%2F--KNOMI--Game---black?style=flat&logo=github)](https://github.com/MadhvanS1/-KNOMI-Game-)
[![Live Web App](https://img.shields.io/badge/Live-GitHub%20Pages-brightgreen?style=flat&logo=googlechrome)](https://madhvans1.github.io/-KNOMI-Game-/)
[![Tech Stack](https://img.shields.io/badge/Tech-React%2019%20%7C%20TypeScript%20%7C%20Vite%207%20%7C%20Zustand-blue?style=flat)](docs/tech_stack.md)
[![Phase 1 & 2](https://img.shields.io/badge/Phase%201%20%26%202-8%2F8%20Modes%20Completed-success?style=flat)](docs/BUILD_STEPS.md)

---

## 🌐 Live Links

- **🌐 Live Production Application:** [https://madhvans1.github.io/-KNOMI-Game-/](https://madhvans1.github.io/-KNOMI-Game-/)
- **🐙 Source Code Repository:** [https://github.com/MadhvanS1/-KNOMI-Game-](https://github.com/MadhvanS1/-KNOMI-Game-)
- **📍 Implementation Progress Tracker:** [`docs/BUILD_STEPS.md`](docs/BUILD_STEPS.md)

---

## 🎯 Strategic Vision: The B2C2B Pull Model

**KNOMI Knows You** is a viral, high-dopamine consumer web game designed as the primary B2C acquisition driver for KNOMI's food-tech platform.

Instead of traditional, low-conversion B2B cold calling:
1. **Millions play the game** to discover and flex their food personality on social media.
2. **Preference data accumulates** locally across specific restaurant neighbourhoods.
3. **KNOMI pitches restaurants using active local demand data**: *"340 diners near your restaurant have KNOMI profiles. Here is what they crave before walking in."*

---

## 🎮 Game Modes Breakdown (8 Live Modes Across Phase 1 & 2)

### 🟢 Phase 1: Core Launch MVP Modes (Completed & Live)
1. 🧠 **Solo: Read My Food Soul** — Pick 5-7 dishes → 10s suspense loading animation → Personality Reveal Card + Trait Cards + Prediction.
2. 💀 **Challenge: Break KNOMI** — Try to order the opposite of your true taste to fool the algorithm (3% win rate).
3. 💕 **Couple: Compatibility Test** — Test whether your relationship can survive a restaurant menu.
4. ⚔️ **This or That: Food Dilemmas** — 15 rapid binary choice rounds with instant public percentage benchmarks.
5. 🔥 **The Roast: Get Roasted** — Savage, Gen Z-style roast cards with custom dish callouts.

### ⚡ Phase 2: Expansion & Fast-Paced Modes (Completed & Live)
6. ⚡ **Speed Round ("Your Gut Doesn't Lie")** — 30s blitz timer analyzing who you pretend to be vs. who you actually are.
7. 🚩 **Red Flags / Green Flags** — Ordering habits categorized into a viral dating profile report card (`🟢` & `🚩`).
8. 👥 **Roast Squad** — Group QR room ranking from "Least Basic" to "Most Basic".

### 🎭 Phase 3: Psychological High-Stakes Modes (Upcoming)
9. 🎭 **The Liar's Table (*Liar Game*)** — 3–6 players, secret roles, 1 hidden bluff dish, 60s interrogation → group voting.
10. ☠️ **Food Russian Roulette (*Squid Game / Kaiji*)** — 5 rounds, 5-second timers, hidden Poison Traps → 1% Survivor Gold Card.
11. 🎰 **Kakegurui Feast (*Kakegurui*)** — 1v1 betting duel wagering Food Reputation Points (FRP).
12. 🐍 **Split or Steal (*Tomodachi Game*)** — 2 friends order together: Secret [SHARE] vs [STEAL] vote.
13. 👁️ **Mind-Reader Duel (*Death Note*)** — Predictor sees only anonymized behavioral metrics to deduce the exact order.
14. 🕵️ **The Traitor (*Among Us*)** — 4–8 players, 1 Saboteur subtly altering the group's spice/comfort average.

### 🏆 Phase 4: Retention Engine Modes
15. 🌙 **Themed Mood Menus** — Contextual menu drops (*Monsoon Comfort, 2 AM Craving, Broke Student ₹200 limit*).
16. 🏆 **The Food Resume (`knomi.in/me/username`)** — Permanent vanity bio profile link with stats, badges, and compatibility scores.

---

## 📚 Master Documentation Suite (`docs/`)

All documentation is maintained side-by-side inside the [`docs/`](docs/) directory:

| Document | Description |
|---|---|
| 📄 [`docs/BUILD_STEPS.md`](docs/BUILD_STEPS.md) | **Active Step Tracker & Roadmap:** Real-time step progress from Step 1 to Step 11. |
| 📄 [`docs/requirements.md`](docs/requirements.md) | **Product Requirements:** Functional specs, menu structure, 6-dimension scoring rules. |
| 📄 [`docs/tech_stack.md`](docs/tech_stack.md) | **Tech Stack Rationale:** React 19 + Vite 7 + TypeScript + Zustand + CSS Modules. |
| 📄 [`docs/design.md`](docs/design.md) | **Design System:** KNOMI warm luxury tokens (`#150C0C`, `#D39858`), 8 personality color palettes. |
| 📄 [`docs/ui_ux.md`](docs/ui_ux.md) | **UI/UX Wireframes:** Screen-by-screen mobile interaction flows and error recovery. |
| 📄 [`docs/architecture.md`](docs/architecture.md) | **Master Architecture:** System diagrams, 16 game modes breakdown, Zustand state design. |
| 📄 [`docs/data_flow.md`](docs/data_flow.md) | **Data Models & Transformations:** TypeScript schemas and `localStorage` persistence structure. |
| 📄 [`docs/user_flow.md`](docs/user_flow.md) | **User Journeys & Viral Share Loops:** Flowcharts and referral mechanics. |
| 📄 [`docs/deployment.md`](docs/deployment.md) | **Deployment Guide:** CI/CD pipeline, Vercel SPA rewrites, and GitHub Pages setup. |
| 📄 [`docs/hosting.md`](docs/hosting.md) | **Hosting Analysis:** Zero-cost (₹0) CDN infrastructure comparison. |

---

## 🛠️ Local Development Quickstart

```bash
# Clone the repository
git clone https://github.com/MadhvanS1/-KNOMI-Game-.git
cd -KNOMI-Game-

# Install dependencies
npm install

# Start development server
npm run dev     # App runs on http://localhost:5173

# Build for production
npm run build   # Static bundle created in dist/
```

---

## ⚡ Deployment & Release Scripts

```bash
# Deploy to GitHub Pages (gh-pages branch)
npm run build && npx gh-pages -d dist
```

---

## 📜 License & Credits

Built with 🔥 in Bengaluru for **KNOMI — The Food Personality Platform**.
Copyright © 2026 KNOMI. All rights reserved.
