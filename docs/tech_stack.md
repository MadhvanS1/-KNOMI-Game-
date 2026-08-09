# KNOMI Knows You — Tech Stack

> **Principle:** Match the main KNOMI app's stack wherever possible. Zero budget. Zero backend.

---

## Technology Decisions

### Core Framework & Language

| Technology | Version | Why |
|---|---|---|
| **React** | 19 | Matches KNOMI main app. Latest concurrent features. Massive ecosystem. |
| **TypeScript** | 5.x | Type safety prevents runtime bugs. Matches main app. Self-documenting code. |
| **Vite** | 7 | Matches KNOMI main app. Fastest build tool. HMR under 50ms. Optimized production builds. |

### Styling

| Technology | Why |
|---|---|
| **Vanilla CSS + CSS Modules** | Matches KNOMI main app exactly. Zero runtime cost. Scoped styles prevent conflicts. No library overhead. |
| **CSS Custom Properties** | Design token system using `--knomi-*` variables for theming. Same pattern as KNOMI's `useTheme` hook. |
| **Google Fonts** | **Inter** (body text) — clean, highly readable. **Space Grotesk** (personality headings) — bold, modern display font. Zero cost. |

### State Management

| Technology | Why | What It Manages |
|---|---|---|
| **Zustand** | Matches KNOMI main app. Minimal boilerplate. No providers needed. | Game state, selections, results, analytics counters |

**Why NOT Redux?** Overkill for a game with 3 stores. Zustand achieves the same with 80% less code.
**Why NOT Context API?** Performance — Context re-renders all consumers. Zustand is selector-based.

### Animation & Motion

| Technology | Why |
|---|---|
| **Framer Motion** | Used in KNOMI main app. Declarative animations. Gesture support. Layout animations for card reveals. Exit animations for page transitions. |
| **CSS Animations** | For simple micro-interactions (hover effects, button presses, loading spinners) — no library needed. |

### PWA (Progressive Web App)

| Technology | Why |
|---|---|
| **vite-plugin-pwa** | Auto-generates service worker and manifest. Makes the game installable. Caches static assets for offline play. |

**PWA Benefits for the Game:**
- Works offline at the fest (poor WiFi)
- "Add to Home Screen" prompt → feels like a real app
- Loads instantly on return visits (cached)

### Image/Share Card Generation

| Technology | Why |
|---|---|
| **html2canvas** | Renders DOM elements (personality cards) as canvas images. Pure client-side. No server needed. |
| **Web Share API** | Native mobile sharing dialog. Falls back to clipboard copy on desktop. |

### Icons

| Technology | Why |
|---|---|
| **Lucide React** | Free, open-source. Tree-shakeable (only bundles used icons). Clean, consistent style. |

### Analytics (Phase 1)

| Technology | Why |
|---|---|
| **localStorage** | Zero cost. Stores play counts, personality distribution, return visit data locally. |
| **Supabase (Free Tier)** | Optional. 500MB database, 50K API calls/month. Enough to aggregate anonymous play data across users. |

### Hosting & Deployment

| Technology | Why |
|---|---|
| **Vercel (Free Tier)** | 100GB bandwidth/month. Global CDN. Auto-deploys from GitHub. Custom domain support. Auto SSL. |
| **GitHub** | Source control. Triggers Vercel deployments on push to `main`. |

---

## Architecture Comparison — Why This Stack

| Need | Chosen | Rejected | Reason |
|---|---|---|---|
| **Framework** | React 19 SPA | Next.js | No SSR needed. Pure static game. SPA is simpler, smaller, faster. |
| **Framework** | React 19 | Svelte/Vue | Must match KNOMI main app for code/knowledge reuse. |
| **State** | Zustand | Redux Toolkit | Too much boilerplate. Game has 3 simple stores. |
| **State** | Zustand | Jotai/Recoil | Zustand matches main app. Atomic state is unnecessary complexity. |
| **Styling** | CSS Modules | Tailwind CSS | Main app uses CSS Modules. Consistency > convenience. |
| **Styling** | CSS Modules | Styled Components | Runtime CSS-in-JS adds bundle weight and performance cost. |
| **Animation** | Framer Motion | GSAP | Framer has better React integration. Declarative API matches React paradigm. |
| **Animation** | Framer Motion | React Spring | Framer is more mature, better docs, exit animations built-in. |
| **Backend** | None (client-side) | Express/Fastify | ₹0 budget means no server costs. All game logic runs in browser. |
| **Backend** | None | Firebase | Even free tier adds complexity. Game doesn't need real-time DB for Phase 1. |
| **Image Gen** | html2canvas | Cloudinary | Server-side adds latency and potential cost. Client-side is free and instant. |
| **Hosting** | Vercel | AWS/GCP | Free tier is simpler. No DevOps complexity. One-click deploy. |
| **Hosting** | Vercel | Netlify | Both work. Vercel has better React/Vite integration and analytics. |

---

## Bundle Size Budget

| Dependency | Estimated Size (gzipped) |
|---|---|
| React 19 + ReactDOM | ~42KB |
| Framer Motion | ~30KB |
| Zustand | ~1.5KB |
| Lucide React (10 icons) | ~3KB |
| html2canvas | ~15KB |
| App code + assets | ~40KB |
| **Total** | **~131KB** |

Target: **< 150KB gzipped** for initial load. Under 3G load time: ~3 seconds.

---

## Development Environment

```bash
# Required
Node.js >= 20.x
npm >= 10.x

# Create project
npx -y create-vite@latest ./ --template react-ts

# Install dependencies
npm install zustand framer-motion lucide-react html2canvas
npm install -D vite-plugin-pwa @types/node

# Dev server
npm run dev     # http://localhost:5173

# Production build
npm run build   # Output: dist/

# Preview production build
npm run preview
```

---

## Environment Variables

| Variable | Value | Purpose |
|---|---|---|
| `VITE_APP_TITLE` | "KNOMI Knows You" | Document title |
| `VITE_SHARE_BASE_URL` | "https://play.knomi.in" | Base URL for shared links |
| `VITE_KNOMI_INSTAGRAM` | "https://instagram.com/knomi.in" | Link back to brand |
| `VITE_ANALYTICS_ENABLED` | "true" / "false" | Toggle analytics collection |
