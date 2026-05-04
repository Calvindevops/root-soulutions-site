@AGENTS.md

# Root Soulutions Site — App Context

## App Identity
**Root Soulutions** — DTC whole-food seasoning brand by Craft Eatery Food Genius Company L.L.C.
Three core SKUs: Smokey Cajun, Simple SZN, Garlicky SZN — plus a starter bundle.
Tagline: "Crafted with SOUL — Simplicity, Organic alignment, Uncompromised quality, Lifestyle-forward flavor."

Root: `apps/root-soulutions-site/`
Local dev: `npm run dev` → http://localhost:3000
Live dev tunnel: https://dev.norevel.com (cloudflared)
Deploy: Vercel (always deploy from `apps/root-soulutions-site/` — NOT monorepo root)

## Stack
- **Frontend:** Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4
- **Animation:** Framer Motion 12, GSAP 3 + ScrollTrigger, Lenis (smooth scroll)
- **Commerce:** Shopify Storefront API (`@shopify/storefront-api-client`)
- **Backend:** Supabase (auth, db) via `@supabase/ssr`
- **Email/Compliance:** Twilio (SMS), Brevo (transactional)
- **Design:** See `DESIGN.md`

## Pages
- `/` — Homepage: scroll-3D-reassembly hero (V4 24s reel scrubbed in reverse), value badges, founder story, food showcase, testimonials, FAQ, newsletter
- `/shop` — Product grid
- `/products/[handle]` — Smokey Cajun, Simple SZN, Garlicky SZN — each with its own scroll-driven 3D reassembly animation
- `/products/bundle` — Starter kit
- `/recipes` — Recipe collection
- `/admin` — Internal dashboard (lead/order surfacing)

## Scroll Animation System
- `lib/SmoothScroll.tsx` — Lenis ↔ ScrollTrigger sync, mounted in root layout
- `components/scroll/ScrollScrubVideo.tsx` — pinned video, scrubs in reverse on scroll for reassembly effect
- Source videos in `public/videos/` (compressed via ffmpeg, GOP=6 for scrub-friendly seeking)
  - `homepage-hero-reel.mp4` — 24s, all 3 jars sequence (homepage spine)
  - `smokey-cajun-reassembly.mp4` / `simple-szn-reassembly.mp4` / `garlicky-szn-reassembly.mp4` — 8s each, per-product
  - `lineup-shot.mp4` — 8s, bundle / lineup uses

## Commerce
- Shopify Storefront API drives product/variant/cart data
- Cart: client `lib/cart-context.tsx` (`CartProvider` mounted in root layout)
- Checkout: Shopify-hosted

## Compliance / Notify
- Twilio SMS opt-in handled per Twilio Compliance Hub guidelines
- Newsletter signup → n8n → Brevo via Edge Function (never expose webhook URLs client-side)

## Deploy Rule
```bash
cd /home/calvi/norevel/apps/root-soulutions-site && vercel --prod
```

## Context7 Rule
Before any Next.js 16 code changes, query Context7 for App Router patterns — the AGENTS.md note in this app is explicit that this Next.js may differ from training data.

## Non-Negotiables
- Never expose webhook URLs / API secrets in client-side code — route through Edge Functions or Next route handlers
- Screenshot QA before any UI ships
- `npx tsc --noEmit` clean before deploying
- Heavy media (videos, hi-res imagery) goes in `public/videos/` or `public/brand/` — keep compressed
