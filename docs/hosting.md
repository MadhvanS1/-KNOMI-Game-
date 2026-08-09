# KNOMI Knows You — Hosting & Infrastructure Strategy

> **Core Objective:** Zero monthly infrastructure costs while serving up to 100,000 monthly active users with sub-second page loads globally.

---

## 1. Free-Tier Provider Matrix Comparison

| Provider | Monthly Bandwidth | Build Minutes | Custom Domain | Auto SSL | Edge CDN | Global Speed (India) | Recommendation |
|---|---|---|---|---|---|---|---|
| **Vercel** | **100 GB** | 6,000 mins | Yes | Yes | Anycast CDN | ⚡ Excellent (Mumbai edge) | 🏆 **Primary Choice** |
| **Netlify** | **100 GB** | 300 mins | Yes | Yes | Global CDN | ⚡ Very Good | 🥈 Backup Choice |
| **Cloudflare Pages** | **Unlimited** | 500 builds | Yes | Yes | 300+ Edge cities | ⚡ Ultra Fast | 🥉 Scale Choice |
| **GitHub Pages** | **100 GB** | Unlimited | Yes | Yes | Fastly CDN | 🐢 Moderate | Not recommended for SPA routing |

---

## 2. Infrastructure Architecture & CDN Delivery

```
                       ┌────────────────────────────┐
                       │    User Request            │
                       │   (Mobile Browser)         │
                       └─────────────┬──────────────┘
                                     │
                                     ▼
                       ┌────────────────────────────┐
                       │   DNS Anycast Routing      │
                       │   (play.knomi.in)          │
                       └─────────────┬──────────────┘
                                     │
                                     ▼
                       ┌────────────────────────────┐
                       │   Vercel Edge Node         │
                       │   (Mumbai Server Location) │
                       └─────────────┬──────────────┘
                                     │
            ┌────────────────────────┴────────────────────────┐
            ▼                                                 ▼
┌────────────────────────────┐                   ┌────────────────────────────┐
│ Static HTML / JS / CSS     │                   │ Dish Images & Assets       │
│ Cached on Edge CDN         │                   │ Compressed AVIF/WebP       │
│ Response Time: < 30ms      │                   │ Response Time: < 50ms      │
└────────────────────────────┘                   └────────────────────────────┘
```

---

## 3. Cost & Scaling Projections

| Active Monthly Users (MAU) | Estimated Bandwidth | Vercel Cost | Infrastructure Cost |
|---|---|---|---|
| 1,000 users | ~ 0.5 GB | ₹0 | ₹0 |
| 10,000 users | ~ 5.0 GB | ₹0 | ₹0 |
| 50,000 users | ~ 25.0 GB | ₹0 | ₹0 |
| 100,000 users | ~ 50.0 GB | ₹0 | ₹0 |
| 200,000+ users | ~ 100.0 GB+ | $20/mo (Pro tier) | ₹1,650/mo |

> **Summary:** For Phase 1 and Constellation launch (expecting 500 to 5,000 users), the entire hosting setup costs **exactly ₹0**.

---

## 4. Performance & Optimization Strategy

1. **Asset Compression**: Brotli compression automatically applied by Vercel Edge.
2. **Modern Image Formats**: Dish images served as WebP / AVIF with lazy loading `loading="lazy"`.
3. **Bundle Chunking**: Code-split routes so Solo, Roast, and This-or-That modes load their specific JS bundles on demand.
4. **Service Worker Offline Cache**: PWA caches static files locally after the first visit, resulting in 0ms load times on repeat plays.
