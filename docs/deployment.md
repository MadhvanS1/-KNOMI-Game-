# KNOMI Knows You — Deployment Specification

> **Target Platform:** Vercel (Primary) / Netlify (Secondary)
> **Cost Target:** ₹0 / $0 (Free Tier Deployment)
> **Build Command:** `npm run build`
> **Output Folder:** `dist`

---

## 1. CI/CD & Build Pipeline

```
┌─────────────────┐       Git Push `main`       ┌─────────────────┐
│ Local Repository│ ──────────────────────────▶ │ GitHub Repository│
└─────────────────┘                             └────────┬────────┘
                                                         │
                                                         ▼ Triggers Webhook
                                                ┌─────────────────┐
                                                │ Vercel Edge CI  │
                                                └────────┬────────┘
                                                         │
       ┌─────────────────────────────────────────────────┴────────────────────────────────────────────────┐
       ▼                                                 ▼                                                ▼
┌───────────────┐                               ┌─────────────────┐                              ┌─────────────────┐
│ Lint & Type   │                               │ Vite Build      │                              │ Asset Optimize  │
│ Check         │                               │ `npm run build` │                              │ Gzip / Brotli   │
└───────┬───────┘                               └────────┬────────┘                              └────────┬────────┘
        │                                                │                                                │
        └────────────────────────────────────────────────┼────────────────────────────────────────────────┘
                                                         │
                                                         ▼
                                                ┌─────────────────┐
                                                │ Production CDN  │
                                                │ (play.knomi.in) │
                                                └─────────────────┘
```

---

## 2. Step-by-Step Vercel Deployment Guide

### Option A: Via Vercel Web Dashboard (Recommended)

1. Push your code repository to GitHub under your user account (`github.com/your-username/knomi-game`).
2. Log into [Vercel Dashboard](https://vercel.com).
3. Click **Add New...** -> **Project**.
4. Import your GitHub repository `knomi-game`.
5. Configure Project Settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./` (or `KNOMI Game/`)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Add Environment Variables:
   - `VITE_APP_TITLE` = `KNOMI Knows You`
   - `VITE_SHARE_BASE_URL` = `https://play.knomi.in`
   - `VITE_KNOMI_INSTAGRAM` = `https://instagram.com/knomi.in`
7. Click **Deploy**. Vercel will build and deploy your app in < 60 seconds.

---

### Option B: Via Vercel CLI (Command Line)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to your Vercel account
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## 3. Configuration Files

### 3.1 `vercel.json` Configuration

Place `vercel.json` in the root of the project to handle SPA client-side routing and cache headers:

```json
{
  "version": 2,
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "cleanUrls": true,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*).json",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, must-revalidate"
        }
      ]
    }
  ]
}
```

---

## 4. Custom Subdomain Setup (`play.knomi.in`)

1. Go to your domain registrar (e.g. GoDaddy, Namecheap, Cloudflare).
2. Open DNS Settings for domain `knomi.in`.
3. Add a new DNS CNAME Record:
   - **Type**: `CNAME`
   - **Name**: `play`
   - **Value**: `cname.vercel-dns.com`
   - **TTL**: Auto or `3600`
4. In Vercel Dashboard -> Project Settings -> **Domains**:
   - Add `play.knomi.in`
5. Vercel will automatically provision a free SSL certificate (Let's Encrypt) within 2-5 minutes.

---

## 5. Pre-Launch Verification Checklist

- [ ] Run `npm run typecheck` — zero TypeScript compilation errors
- [ ] Run `npm run build` locally — produces static `dist/` without warnings
- [ ] Confirm PWA manifest loads correctly at `/manifest.webmanifest`
- [ ] Test offline playback by turning off WiFi in Chrome DevTools
- [ ] Validate OpenGraph share images and meta tags for social media previews
- [ ] Test image export (`html2canvas`) on real iOS Safari and Android Chrome devices
- [ ] Confirm analytics counters increment correctly in `localStorage`
