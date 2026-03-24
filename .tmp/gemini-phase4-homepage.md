# Task: Build the Homepage — 10 Color-Blocked Sections

You are building the homepage (`app/page.tsx`) for Root Soulutions, a premium artisan seasoning brand. This is the most important page — it showcases the entire brand.

## CRITICAL: Read these files first
- `app/globals.css` — all colors, typography classes, marquee CSS
- `lib/animations.ts` — Framer Motion variants (fadeInUp, fadeIn, staggerContainer, float, cardHover, slideInLeft, slideInRight)
- `lib/cart-context.tsx` — useCart hook (addToCart, openCart)
- `lib/products.ts` — all 4 products with full data (prices, descriptions, gradients, ingredients, use_cases)
- `lib/types.ts` — TypeScript types
- `components/layout/` — existing global components (already built)

## Design Pattern
Each section has a DIFFERENT bold background color. As you scroll, you move through distinct color blocks. This is the core FlyByJing design pattern adapted for Root Soulutions.

## Build These 8 Components + page.tsx

### 1. `components/home/HeroBanner.tsx`
- Background: bg-[#2D5A27] (earth green), full viewport height (min-h-screen)
- Layout: flex, items-center
  - Left 60%:
    - "SEASON" on line 1, "WITH SOUL" on line 2 — use `heading-hero` class (Bebas Neue, ~5.5rem, uppercase), white
    - Subtext: "Whole-food, low-sodium seasoning blends crafted from pure herbs and spices. No chemicals. No fillers. No shortcuts. Just honest flavor that nourishes." — DM Sans, text-lg, white/80
    - CTA: "SHOP NOW" pill button → Link to /shop — bg-[#e85c2a], white text, rounded-full, px-12 py-4, btn-text class, hover:scale-105 transition
  - Right 40%:
    - Product bottles image: `/products/lineup.png` (use Next Image, or placeholder div with gradient bg if image missing)
    - Framer Motion `float` animation (y: [-5, 5] infinite bob)
- fadeInUp on heading, 0.2s stagger per line
- Mobile: stack vertically, image on top, text below, min-h-[80vh]

### 2. `components/home/ProductCards.tsx`
- "use client" (needs addToCart from useCart)
- Background: bg-[#e85c2a] (RS orange), py-24
- Heading: "THE LINEUP" — heading-section class, white, text-center, mb-16
- 3-column grid (md:grid-cols-3, gap-8, max-w-[1400px] mx-auto px-6)
- Import products from `lib/products.ts`, filter out bundle (is_bundle === false)
- Each card:
  - Framer Motion `motion.div` with `cardHover` variant
  - Background: gradient using product.gradient_from → gradient_to
  - Rounded-[2rem], overflow-hidden, p-8, min-h-[400px], flex flex-col
  - Product image placeholder (200x200 centered div with accent_color border)
  - Title: heading-card class, color = product.accent_color
  - Subtitle: text-white/70, text-sm
  - Price: text-white, text-2xl, font-bold
  - "ADD TO CART" button: bg-white/20 text-white rounded-full px-8 py-3, btn-text class
    - onClick: addToCart(product)
  - fadeInUp on scroll with stagger

### 3. `components/home/ValueBadges.tsx`
- Background: bg-[#FFF8F0] (warm cream), py-20
- Horizontal row of 6 badge pills, flex-wrap justify-center gap-4
- Badges: "LOW SODIUM", "WHOLE-FOOD INGREDIENTS", "CHEMICAL-FREE", "SMALL-BATCH CRAFTED", "POC-OWNED", "GLUTEN-FREE"
- Each badge: bg-[#2D5A27] text-white rounded-full px-6 py-2.5, text-sm font-bold uppercase tracking-wider
- Use Phosphor icons next to each: Leaf, Plant, Flask (slash), HandHeart, Users, Wheat (from Tabler if needed)
- staggerContainer + fadeInUp per badge

### 4. `components/home/ScrollingMarquee.tsx`
- Reusable component: props `text: string`, `bgColor: string`, `textColor: string`, `speed?: number`
- Background: bgColor prop, py-4, overflow-hidden
- Uses `.marquee-track` CSS class from globals.css
- Text: textColor, Bebas Neue (font-[family-name:var(--font-bebas)]), text-2xl, uppercase, tracking-widest
- Duplicate text content 4x for seamless loop, separated by " • " or emoji
- Default usage on homepage: bg-[#1A1A1A], text-[#F5C542], text = "FLAVOR • WELLNESS • CULTURE • SOUL 🌿"

### 5. `components/home/FounderStory.tsx`
- Background: bg-[#6B3FA0] (garlic purple), py-24
- Max-width container, px-6
- Layout: md:grid md:grid-cols-2 gap-12 items-center
  - Left: Placeholder for Collin's photo (300x400 rounded-[2rem] bg-white/10 with -rotate-2 transform)
    - slideInLeft animation
  - Right:
    - "HEY, I'M COLLIN." — heading-section class, white
    - Story excerpt (3 paragraphs, DM Sans, text-white/80, text-lg, leading-relaxed):
      "At twelve years old, I found myself standing in my great-grandmother's kitchen, administering insulin to her tiny arm before school. Four years later, I was doing the same thing — except this time, it was my own arm."
      "Type 2 diabetes entered my life fast, loud, and uninvited. But instead of letting it define me, I let it redirect me."
      "I dove into food science, cultural foodways, and the hard truths about how our communities are fed. Root Soulutions was born from that journey — a POC-owned, wellness-forward flavor brand built from lived experience."
    - "OUR FULL STORY →" link to /about — text-[#F5C542] underline
    - fadeInUp with stagger on paragraphs

### 6. `components/home/BundleCTA.tsx`
- "use client" (needs addToCart)
- Background: bg-[#1A1A1A] (rich black), py-24
- Max-width container
- Layout: md:grid md:grid-cols-2 gap-12 items-center
  - Left:
    - "THE SOULUTION STARTER KIT" — heading-section class, text-[#F5C542]
    - Description: "Get all three Root Soulutions blends in one bundle. The complete toolkit for seasoning your whole kitchen with SOUL." — text-white/70
    - Price: "$34.99" — text-white text-4xl font-bold + strikethrough "$38.97" text-white/40 text-xl
    - "SAVE 10%" badge: bg-[#e85c2a] text-white rounded-full px-4 py-1 text-sm inline-block
    - "ADD BUNDLE TO CART" button: bg-[#e85c2a] text-white rounded-full px-12 py-4 btn-text
      - onClick: addToCart(starter kit product from products.ts)
  - Right:
    - Placeholder for all 3 bottles image (400x400 bg-white/5 rounded-[2rem])
    - slideInRight animation

### 7. `components/home/RecipePreview.tsx`
- Background: bg-[#e85c2a] (RS orange), py-24
- Heading: "SOUL KITCHEN" — heading-section class, white, text-center, mb-4
- Sub: "Recipes that nourish, powered by Root Soulutions blends." — text-white/70 text-center mb-16
- 3-column grid (md:grid-cols-3, gap-6, max-w-[1400px] mx-auto px-6)
- 6 recipe cards (hardcoded):
  1. "Turmeric Roasted Vegetables" — Simple SZN
  2. "Cajun Blackened Salmon" — Smokey Cajun SZN
  3. "Garlic Herb Pasta" — Garlicky SZN
  4. "Seasoned Sweet Potato Fries" — Simple SZN
  5. "Cajun Shrimp & Grits" — Smokey Cajun SZN
  6. "Garlic Butter Chicken Thighs" — Garlicky SZN
- Each card:
  - Image placeholder: aspect-video bg-black/20 rounded-t-[1.5rem]
  - Below: p-4, title (DM Sans bold, white, text-lg) + blend pill (bg-white/20 text-white rounded-full px-3 py-1 text-xs uppercase)
  - Hover: scale-[1.02] transition
- "VIEW ALL RECIPES →" link at bottom center → /recipes
- fadeInUp with stagger

### 8. `components/home/NewsletterSignup.tsx`
- "use client" (form handling)
- Background: bg-[#F5C542] (warm gold), py-24
- Max-width 600px centered
- "JOIN THE SOULUTION 🌿" — heading-section class, text-[#2D5A27], text-center
- Sub: "Get exclusive recipes, market updates, and early access to new blends." — text-[#2D5A27]/70 text-center mb-8
- Inline form: flex gap-3
  - Email input: flex-1, px-6 py-4, rounded-full, border-2 border-[#2D5A27], bg-white, text-[#1A1A1A], placeholder "Enter your email"
  - Submit button: "SUBSCRIBE" — bg-[#2D5A27] text-white rounded-full px-8 py-4, btn-text class
- On submit: POST to /api/subscribe (or just console.log + show success message for now)
- Success state: "You're in! Welcome to the Soulution. 🌿" text

## page.tsx Assembly
```tsx
// app/page.tsx
import { HeroBanner } from "@/components/home/HeroBanner";
import { ProductCards } from "@/components/home/ProductCards";
import { ValueBadges } from "@/components/home/ValueBadges";
import { ScrollingMarquee } from "@/components/home/ScrollingMarquee";
import { FounderStory } from "@/components/home/FounderStory";
import { BundleCTA } from "@/components/home/BundleCTA";
import { RecipePreview } from "@/components/home/RecipePreview";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <ProductCards />
      <ValueBadges />
      <ScrollingMarquee text="FLAVOR • WELLNESS • CULTURE • SOUL 🌿" bgColor="#1A1A1A" textColor="#F5C542" />
      <FounderStory />
      <BundleCTA />
      <ScrollingMarquee text="COOK WITH SOUL 🍳" bgColor="#e85c2a" textColor="white" />
      <RecipePreview />
      <NewsletterSignup />
    </>
  );
}
```

## Rules
- Use TypeScript strictly — no `any`
- All "use client" components that use hooks (useCart, useState)
- Server components where possible (no hooks needed)
- Import animations from `lib/animations.ts`
- Import products from `lib/products.ts`
- Use Phosphor icons from `@phosphor-icons/react`
- Mobile responsive with Tailwind breakpoints
- Run `npx tsc --noEmit` when done — must pass with zero errors
