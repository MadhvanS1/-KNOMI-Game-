# KNOMI Knows You — User Flow Specification

> **UX Goal:** Frictionless entry (zero login), instant game immersion, high-suspense reveal, and maximum share conversion.

---

## 1. Complete User Journey Map

```
  ENTRY POINT                LANDING                  GAMEPLAY                ANALYSIS               REVEAL                 VIRAL SHARE
┌──────────────┐       ┌─────────────────┐       ┌─────────────────┐     ┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│ • Insta Bio  │ ────▶ │ Landing Page    │ ────▶ │ Mode Selection  │ ──▶ │ 10s Suspense   │ ──▶ │ Personality/   │ ──▶ │ Export Card    │
│ • QR Sticker │       │ "We don't       │       │ • Solo (5-7)    │     │ Animation      │     │ Roast Reveal   │     │ • Instagram    │
│ • WhatsApp   │       │  predict food"  │       │ • This or That  │     │ • Stat updates │     │ • 3 Traits     │     │ • WhatsApp     │
│ • Direct Link│       │ • 3 Mode Cards  │       │ • Roast Mode    │     │ • Pulse audio  │     │ • Prediction   │     │ • Save PNG     │
└──────────────┘       └─────────────────┘       └─────────────────┘     └────────────────┘     └────────────────┘     └────────────────┘
```

---

## 2. Detailed Screen-by-Screen User Flows

### 2.1 Solo Mode Flow Diagram

```
[Start: User arrives from QR/Link]
               │
               ▼
      [Landing Screen]
               │
               ├─ User taps "Read My Food Soul" (Solo Mode)
               ▼
      [Menu Browse Screen]
               │
               ├─ User scrolls categories (Starters, Mains, Desserts, Drinks)
               ├─ User taps dishes to select (Target: 5 to 7 dishes)
               │
               ├─── If < 5 dishes selected: "Decode" button disabled (opacity 40%)
               ├─── If 7 dishes selected: Toast "Max 7 dishes reached"
               │
               ▼ User taps active "Decode My Food Soul (5/7)"
      [10-Second Analysis Screen]
               │
               ├─ Lock navigation (disable back button)
               ├─ 0s-2s: "Analyzing your selections..."
               ├─ 2s-5s: "Cross-referencing 47,382 profiles..."
               ├─ 5s-8s: "You picked spicier than 73% of players..."
               ├─ 8s-10s: "Your food DNA has been decoded..."
               │
               ▼ (Auto-advances at 10s)
      [Personality Reveal Screen]
               │
               ├─ Full screen background color transition
               ├─ Emoji scale-in bounce animation
               ├─ Display Personality Name + Tagline
               ├─ Staggered entry of 3 hyper-specific traits
               ├─ Display prediction & percentile statistic
               │
               ├─── User taps "Play Again" ────────▶ [Landing Screen]
               │
               └─── User taps "Share Result" ──────▶ [Share Modal]
                                                         │
                                                         ├─ Tap "Save Image" ──▶ Download PNG
                                                         ├─ Tap "Instagram"  ──▶ Copy image + guide
                                                         └─ Tap "WhatsApp"   ──▶ Open pre-filled link
```

---

### 2.2 This or That Mode Flow Diagram

```
[Start: User selects "This or That" from Landing]
               │
               ▼
     [Round 1 of 15 Displayed]
               │
               ├─ Shows Option A (e.g. Butter Chicken) vs Option B (e.g. Sushi)
               ├─ User taps Option A or Option B
               │
               ├─ Selected card scales up with golden glow (400ms)
               ├─ Unselected card fades out
               │
               ▼ (Auto-advances to Round 2)
     [Rounds 2 to 14]
               │
               ├─ Progress bar fills incrementally (Round 7 of 15: 47%)
               │
               ▼ (User completes Round 15)
     [10-Second Analysis Screen]
               │
               ▼
     [Personality Reveal Screen]
```

---

### 2.3 Roast Mode Flow Diagram

```
[Start: User selects "Get Roasted" from Landing]
               │
               ▼
     [Severity Selector Modal]
               │
               ├─ Option 1: 🌶️ "Mild Tease" (Playful callouts)
               └─ Option 2: 🌶️🌶️🌶️ "Savage Roast" (No mercy)
               │
               ▼ User picks severity
     [Menu Browse Screen (5-7 Dishes)]
               │
               ▼ User hits "Roast Me"
     [10-Second Analysis Screen]
               │
               ▼
     [Roast Result Screen]
               │
               ├─ Header: "🔥 KNOMI ROASTED YOU 🔥"
               ├─ Display Personality archetype name
               ├─ Display 3-4 savage roast callouts
               ├─ Display Severity Badge ("SAVAGE 🌶️🌶️🌶️")
               │
               └─── User taps "Share Roast" ──▶ [Share Modal / 9:16 Card Export]
```

---

## 3. Viral Share & Referral Loop Mechanics

```
    [User A receives Result Card]
                 │
                 ▼
    [User A posts to Instagram Story / WhatsApp Group]
                 │
                 ▼
    [User B sees User A's result: "The Comfort Loyalist 🍛"]
                 │
                 ▼
    [User B reads caption: "KNOMI decoded me. Prove us wrong: play.knomi.in"]
                 │
                 ▼
    [User B clicks link / scans QR] ──▶ [User B starts Game]
```

### Key Share Drivers:
1. **Identity Validation**: "How did this app know I always order Butter Chicken?"
2. **Social Callout / Tagging**: "Tag that friend who's a Menu Hostage."
3. **Curiosity Hook**: "Only 4% of players broke KNOMI. Can you?"

---

## 4. Edge Case & Failure Recovery Flows

| Edge Case | Detection | UX Recovery Path |
|---|---|---|
| **App closed mid-game** | Check `localStorage.draft` on mount | Banner: "Continue your previous game?" [Resume] [Start Fresh] |
| **Image fails to load** | Image `onError` handler | Fall back to styled CSS gradient box with dish name text |
| **Web Share API not supported** | Browser feature check | Automatically fall back to Clipboard Copy + Toast notice |
| **Slow network connection** | Offline PWA mode | Assets served from SW Cache; zero network dependency required |
| **Orientation change (Landscape)** | CSS `@media (orientation: landscape)` | Display overlay: "Please rotate your phone to portrait mode 📱" |
