# Root Soulutions Site A+ Upgrade Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade RS site from B+ to A+ across layout/flow, social proof, interactivity, and product presentation.

**Architecture:** 4 tracks executed sequentially. Each track is self-contained — site stays functional after each task. All work is in the existing Next.js app with Framer Motion, Tailwind, and Phosphor icons.

**Tech Stack:** Next.js 16, React, Tailwind CSS, Framer Motion, Phosphor Icons, TypeScript

**Photo baseline:** Hero section quality (graffiti wall shots, lineup jars) is the benchmark. All existing photos at that level stay. Placeholder/weak photos will be upgraded later with Kling video + AI studio shots — this plan focuses on layout, interaction, and presentation improvements that work with current assets.

---

## Track 1: Layout & Flow (B+ → A)

### Task 1: Product Detail Page Overhaul

**Why:** Currently flat — single image, accordion tabs, no visual breathing room. Most important conversion page on the site.

**Files:**
- Modify: `app/products/[handle]/page.tsx`
- Modify: `components/product/ProductDetailClient.tsx`
- Modify: `lib/animations.ts`

- [ ] **Step 1: Add ingredient visual grid to product page**

Replace the plain text accordion for ingredients with a visual pill grid (like ValueBadges on homepage). Each ingredient gets its own styled pill with the product's accent color. Keep accordion for Wellness Notes and Shipping.

```tsx
// In ProductDetailClient.tsx — replace ingredients accordion tab content
// with a visual grid that's always visible (not collapsed)
<div className="mt-8">
  <h3 className="font-bold text-white uppercase text-sm tracking-wider mb-4">INGREDIENTS</h3>
  <div className="flex flex-wrap gap-2">
    {product.ingredients?.map((ingredient, idx) => (
      <span
        key={idx}
        className="rounded-full px-4 py-2 text-sm font-bold uppercase tracking-wider border border-white/20 text-white/80 font-[family-name:var(--font-dm-sans)]"
      >
        {ingredient}
      </span>
    ))}
  </div>
</div>
```

- [ ] **Step 2: Add wellness notes as icon cards instead of list**

Replace the bullet list with styled cards — each wellness note gets its own card with a leaf icon and the note text.

- [ ] **Step 3: Add floating illustrations to product page**

Add chili pepper and garlic illustrations to the product hero section (like all other pages now have).

- [ ] **Step 4: Add "use cases" section as horizontal scroll pills**

The "PERFECT FOR" section exists but is static pills. Make them animate in with stagger on scroll.

- [ ] **Step 5: Fix related products section button hover**

Related product cards still use `hover:bg-white/30`. Update to match hero CTA pattern.

- [ ] **Step 6: Run tsc, verify**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: product detail page overhaul — visual ingredients, wellness cards, illustrations"
```

---

### Task 2: Homepage Section Spacing & Breathing Room

**Why:** Some sections feel cramped, others have too much dead space. Need consistent rhythm.

**Files:**
- Modify: `components/home/ValueBadges.tsx`
- Modify: `components/home/FoodShowcase.tsx`
- Modify: `components/home/FAQSection.tsx`

- [ ] **Step 1: Add floating illustrations to ValueBadges section**

The cream badges section is plain. Add subtle onion/turmeric and beetroot illustrations at low opacity.

- [ ] **Step 2: Add floating illustrations to FAQ section on homepage**

The gold FAQ section has no decorative elements. Add garlic and chili illustrations.

- [ ] **Step 3: Verify consistent py values**

All major sections should use `py-20` or `py-24`. Audit and standardize.

- [ ] **Step 4: Run tsc, commit**

---

## Track 2: Social Proof Upgrade (B- → A-)

### Task 3: Richer Testimonial Cards

**Why:** Current cards are text-only with an optional blend tag. FBJ uses context cues, visual indicators, and more personality.

**Files:**
- Modify: `components/home/Testimonials.tsx`

- [ ] **Step 1: Add context labels to testimonials**

Each testimonial gets a short context label (instead of name/location) that adds credibility without personal info:

```typescript
const testimonials = [
  {
    quote: "So I tried both on some turkey burgers...",
    blend: "Smokey Cajun SZN",
    context: "Turkey burger taste test",
  },
  {
    quote: "I'm in love with the Garlicky one man...",
    blend: "Garlicky SZN",
    context: "Repeat customer",
  },
  {
    quote: "If I could mail you one I would bruh!...",
    context: "First-time buyer",
  },
  {
    quote: "Good Morning, is it possible to preorder...",
    blend: "Garlicky SZN",
    context: "Pre-order request",
  },
  {
    quote: "I got into meal preps & counting my calories...",
    blend: "Garlicky SZN",
    context: "Meal prep enthusiast",
  },
  {
    quote: "I'm very proud of my former student...",
    context: "Former teacher",
  },
];
```

- [ ] **Step 2: Style context labels in card UI**

Add the context label above the quote as a small uppercase tag in gold text. This gives each card a headline that draws the eye before the full quote.

- [ ] **Step 3: Add star rating to each card**

Five gold stars (Phosphor Star icon, weight="fill") at the top of each card. Every testimonial is 5 stars. Simple visual trust signal.

- [ ] **Step 4: Run tsc, commit**

---

### Task 4: Social Proof Counter Strip

**Why:** FBJ shows "X bottles sold" type social proof. RS needs a quick-hit trust strip.

**Files:**
- Create: `components/home/SocialProofStrip.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Build social proof counter strip**

A horizontal strip with 3-4 stats in a row, animated count-up on scroll:
- "50+ Happy Customers"
- "3 Signature Blends"
- "0 Chemicals"
- "100% Whole-Food"

Dark bg, gold numbers, white labels. Place between ValueBadges and the first marquee on homepage.

- [ ] **Step 2: Add count-up animation**

Use Framer Motion `useInView` + `useMotionValue` for the number animation. Numbers count up from 0 when the strip scrolls into view.

- [ ] **Step 3: Mount on homepage, run tsc, commit**

---

## Track 3: Interactivity Upgrade (B → A-)

### Task 5: Enhanced Animation Library

**Why:** Current animations are basic (fade up, slide in). Need spring physics, smoother transitions, and more variety.

**Files:**
- Modify: `lib/animations.ts`

- [ ] **Step 1: Add spring-based animation presets**

```typescript
// Spring presets for more natural motion
export const springFast = { type: "spring" as const, stiffness: 400, damping: 25 };
export const springMedium = { type: "spring" as const, stiffness: 300, damping: 20 };
export const springBounce = { type: "spring" as const, stiffness: 500, damping: 15 };

// Button press effect
export const buttonPress = {
  whileTap: { scale: 0.95 },
  transition: springFast,
};

// Card hover with spring
export const cardHoverSpring = {
  whileHover: {
    y: -8,
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
  },
  whileTap: { scale: 0.98 },
  transition: springMedium,
};
```

- [ ] **Step 2: Run tsc, commit**

---

### Task 6: Button Press Feedback + Cart Animation

**Why:** Buttons scale on hover but have no press/click feedback. Cart has no "item added" confirmation.

**Files:**
- Modify: `components/home/BundleCTA.tsx`
- Modify: `components/home/HeroBanner.tsx`
- Modify: `app/shop/page.tsx`
- Modify: `components/product/ProductDetailClient.tsx`
- Modify: `lib/cart-context.tsx`

- [ ] **Step 1: Add `whileTap={{ scale: 0.95 }}` to all CTA buttons**

Convert static `<button>` and `<Link>` CTAs to `motion.button` / `motion(Link)` with tap scale. Apply across: BundleCTA, HeroBanner, shop page, product detail.

- [ ] **Step 2: Add "Added!" flash confirmation on add-to-cart**

When a product is added to cart, briefly flash "ADDED!" on the button for 1.5s before reverting to "ADD TO CART". Use local state per button.

- [ ] **Step 3: Add cart icon bounce in navbar on item add**

When `itemCount` changes in the cart context, trigger a brief scale bounce on the cart badge in the navbar. Use `useEffect` watching `itemCount`.

- [ ] **Step 4: Run tsc, commit**

---

### Task 7: Smooth Page Transitions

**Why:** Page navigations are instant/jarring. A subtle fade transition makes the site feel polished.

**Files:**
- Create: `components/layout/PageTransition.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Build PageTransition wrapper**

A simple Framer Motion wrapper that fades content in on mount:

```tsx
"use client";
import { motion } from "framer-motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Wrap page content in layout.tsx**

- [ ] **Step 3: Run tsc, commit**

---

## Track 4: Product Presentation (B → A-)

### Task 8: Product Card Upgrade on Shop Page

**Why:** Product cards work but feel static. Need more visual polish to compete with FBJ's product grid.

**Files:**
- Modify: `app/shop/page.tsx`

- [ ] **Step 1: Add ingredient count badge to product cards**

Small badge on each product card showing ingredient count: "5 ingredients" for Garlicky, "10 ingredients" for Cajun, "12 ingredients" for Simple. Reinforces the clean-label message.

- [ ] **Step 2: Add "MOST POPULAR" badge to Garlicky card**

Based on the testimonials (4 out of 6 mention Garlicky), add a small gold badge.

- [ ] **Step 3: Run tsc, commit**

---

### Task 9: Cart Drawer Polish

**Why:** Cart drawer works but could be more branded and feel more premium.

**Files:**
- Modify: `components/layout/CartDrawer.tsx`

- [ ] **Step 1: Update checkout button to match hero CTA pattern**

The checkout button uses `hover:opacity-90`. Update to `hover:scale-105 hover:brightness-110 transition-all shadow-lg`.

- [ ] **Step 2: Add free shipping celebration state**

When free shipping is unlocked (subtotal >= $50), add a brief confetti-style celebration — gold stars that fade in above the progress bar, or a "FREE SHIPPING UNLOCKED!" banner with a pulse animation.

- [ ] **Step 3: Add subtle entrance animation for cart items**

Each item in the cart should fade+slide in from the right when the drawer opens, with staggered timing.

- [ ] **Step 4: Run tsc, commit**

---

### Task 10: Footer Upgrade

**Why:** Footer is clean but minimal. Needs more brand presence.

**Files:**
- Modify: `components/layout/Footer.tsx`

- [ ] **Step 1: Add RS wordmark logo to footer**

Replace the text "ROOT SOULUTIONS" with the actual `rs-logo-text.png` wordmark, matching the navbar treatment.

- [ ] **Step 2: Add actual social media links**

Update Instagram to `https://instagram.com/loverootsoulutions` and Facebook to the Craft Eatery page. TikTok can stay as `#` placeholder.

- [ ] **Step 3: Run tsc, commit**

---

## Final QA

### Task 11: Full Site QA Pass

- [ ] **Step 1: Run `npx tsc --noEmit`** — zero errors
- [ ] **Step 2: Run `npm run build`** — production build succeeds
- [ ] **Step 3: Screenshot QA every page** — homepage, shop, about, recipes, product detail, FAQ, contact, markets, wholesale
- [ ] **Step 4: Mobile check at 375px** — all pages
- [ ] **Step 5: Check for console errors** — no 404s or broken images
