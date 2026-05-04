# CRO Sprint — 2026-04-29

Closing the conversion gap vs Fly By Jing. Ordered by ROI/effort.

## ✅ 1. popup-cro — applied
**File:** `components/ui/WelcomePopup.tsx`

- Discount: 10% → **15% off first order** (code `SOUL15`)
- Trigger upgraded from naive 1.5s timer → **first of: 30s engagement, 50% scroll, exit-intent (desktop)**
- Cookie split: short 7-day on dismiss (re-engages later), long 30-day on submit
- Copy reframed "next order" → "first order" (matches FBJ)

## ✅ 2. page-cro — applied
**Files:** `components/layout/AnnouncementBar.tsx`, `components/layout/SiteChrome.tsx`

- Added 2 conversion-led messages to the marquee: `🎉 15% OFF YOUR FIRST ORDER — CODE SOUL15` and `FREE SHIPPING ON ORDERS $50+`
- AnnouncementBar now shows on **every** page including hero pages (was hero-excluded)
- FloatingNavPills always offset 34px to clear the strip

## 📋 3a. referral-program — spec (defer build to next sprint)

**Mechanic:** Give 15% / Get 15% — referrer gets 15% off next order when friend uses their code on first purchase.

**Surfaces to build:**
- `app/refer/page.tsx` — explainer page with how it works, share buttons, unique code display
- Footer link: "Refer a Friend"
- Post-purchase Thank-You page block: "Share your code, get $5"
- Account dashboard widget: referral stats (referrals sent, earned credits)

**Backend (n8n flow):**
1. POST `/api/referral/generate` → creates unique Shopify discount code per user
2. Webhook on Shopify order with referral code → credit referrer in Brevo
3. Email referrer when their code is used (see seq 5 below)

**Tracking:** UTM `?ref=USER_CODE` → cookie → checkout discount auto-apply

## 📋 3b. email-sequence — spec (build in Brevo)

### Sequence A: Welcome (triggered on popup signup)
| Day | Subject | Goal |
|-----|---------|------|
| 0 | "Your 15% off code is here 🌿" | Deliver code, intro brand |
| 2 | "What is SOUL anyway?" | Founder story (Collin) |
| 5 | "3 ways to use Garlicky SZN tonight" | Recipe inspiration |
| 7 | "Your code expires soon ⏰" | Urgency, last call |

### Sequence B: Abandoned Cart
| When | Subject | Goal |
|------|---------|------|
| 2 hr | "Forget something?" | Soft nudge, recap items |
| 24 hr | "Still thinking? Here's 10% off 🍅" | Offer pushes over the line |

### Sequence C: Post-Purchase
| Day | Subject | Goal |
|-----|---------|------|
| 0 | "Order confirmed — order #" | Receipt, expectations |
| 3 | "Your spices are on the way" | Tracking, 1st recipe link |
| 10 | "How are you cooking with SZN?" | Review request, UGC ask |
| 14 | "Refer a friend, get 15% back" | Trigger referral flow |

### Sequence D: Re-engagement (no order in 60 days)
| Day | Subject |
|-----|---------|
| 60 | "We miss you 🌿 — here's 15% back" |
| 75 | "New blend dropped" (when applicable) |
| 90 | "Last call — clearing your account" |

### Sequence E: Referral-fired (when someone uses your code)
- "Your friend just ordered with your code 🎉 — here's $5 credit" (instant trigger)

## 📋 4. seo-content-writer — recipes as ranking pages

**Current:** thumbnails open a modal with a recipe-card image.
**FBJ standard:** dedicated `/recipes/[slug]` pages with editorial body, photos, ingredient list, step-by-step, embedded shop CTA.

**Stub built this sprint:** `app/recipes/[slug]/page.tsx` route + template (see below).

**Per-recipe content checklist (run `seo-content-writer` once per recipe):**
- Title: target keyword (e.g. "Sweet & Spicy Jerk Chicken Pasta Recipe")
- Meta description: 150-160 chars, include blend name + benefit
- H1 = recipe name; H2 = "Ingredients", "Instructions", "Tips & Variations"
- Hero photo + 3-5 process shots
- Schema.org Recipe JSON-LD (cooking time, yields, ratings)
- "Shop the blend used" CTA mid-page (links to /products/[handle])
- Internal link: 3 related recipes at bottom

**Target keywords (start with these 4):**
- "low sodium cajun chicken recipe"
- "garlicky szn pasta recipe"
- "whole food seasoning recipe"
- "chemical free spice blend recipes"

## Sprint Order (Future)

1. Sprint 1 (now): popup-cro + page-cro [DONE]
2. Sprint 2 (next): seo-content-writer convert top 3 recipes to /[slug] pages
3. Sprint 3: referral-program full build (frontend + n8n webhooks)
4. Sprint 4: email-sequence Brevo automations (Welcome, Abandoned Cart, Post-Purchase)

---

**Pivot after Sprint 4:** video showcase using Hyperframes + Codex collaboration → IG / X reels of (a) the cinematic heroes we built (3D scroll-reassembly, foundation video v5, picnic motion), (b) dashboards, (c) before/after of FBJ → Root build evolution.
