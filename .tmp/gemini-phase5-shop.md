# Task: Build Shop Page + Product Detail Page

You are adding 2 pages to an existing Next.js 15 e-commerce site for Root Soulutions.

## Read these files first
- `lib/products.ts` — all product data (4 products with gradients, prices, ingredients, use_cases, wellness_notes)
- `lib/cart-context.tsx` — useCart hook
- `lib/animations.ts` — Framer Motion variants
- `lib/types.ts` — TypeScript types
- `components/home/ProductCards.tsx` — reference for card design pattern
- `components/home/ScrollingMarquee.tsx` — reusable marquee component
- `app/globals.css` — design system

## Page 1: `app/shop/page.tsx`
- Background: bg-[#2D5A27] (earth green), min-h-screen
- Section 1 — Header: py-20, text-center
  - "SHOP ALL BLENDS" — heading-hero class, white
  - "Whole-food flavor. Crafted with SOUL." — text-white/70 text-lg
- Section 2 — Product Grid: py-16, max-w-[1400px] mx-auto px-6
  - grid md:grid-cols-3 gap-8
  - Import ALL products from `lib/products.ts` (including bundle)
  - Same card design as homepage ProductCards component — gradient bg, title in accent color, subtitle, price, ADD TO CART
  - Bundle card gets a "SAVE 10%" badge: absolute top-4 right-4, bg-[#F5C542] text-[#1A1A1A] rounded-full px-3 py-1 text-xs font-bold
  - Cards use cardHover + fadeInUp animations
  - "use client" for useCart
- Section 3 — Marquee: use ScrollingMarquee component
  - text="YOU WILL FIND YOURSELF PUTTING THIS ON EVERYTHING 🌿" bgColor="#1A1A1A" textColor="#F5C542"

## Page 2: `app/products/[handle]/page.tsx`
- Dynamic route — uses params.handle to find product
- Import `getProductByHandle, getRelatedProducts` from `lib/products.ts`
- If product not found: `import { notFound } from "next/navigation"` and call notFound()

### Section 1 — Product Detail (bg-[#2D5A27], py-16)
- Max-width container, px-6
- md:grid md:grid-cols-2 gap-12 items-start

**Left column — Image:**
- Placeholder: aspect-square bg-gradient-to-b from-[product.gradient_from] to-[product.gradient_to] rounded-[2rem] flex items-center justify-center
- Text inside placeholder: product title in accent color, text-4xl

**Right column — Info:**
- Title: heading-hero class, white (smaller: text-5xl)
- Subtitle: text-white/60 text-lg mb-2
- Star rating: 5 stars using Phosphor `Star` weight="fill" color="#F5C542" size={20} in a flex row
- Price: text-white text-3xl font-bold mt-4
  - If compare_at_price: show strikethrough in text-white/40
- Description: text-white/80 text-lg leading-relaxed mt-6
- Quantity selector: flex items-center gap-4 mt-8
  - Minus button (Phosphor `Minus`), count display, Plus button (Phosphor `Plus`)
  - Buttons: w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white
  - "use client" with useState for quantity
- "ADD TO CART" button: w-full mt-6, bg-[#e85c2a] text-white rounded-full py-4 btn-text hover:brightness-110 transition
  - onClick: addToCart(product, quantity)

**Accordion tabs** (below the grid, still bg-[#2D5A27]):
- 3 expandable sections using useState + Framer Motion AnimatePresence
- Each: border-b border-white/10, py-4, cursor-pointer
  - Header: flex justify-between, DM Sans bold text-white uppercase
  - Toggle icon: Phosphor `CaretDown` rotates 180deg when open
  - Content: text-white/70, animated height
- Tab 1: "INGREDIENTS" — list product.ingredients as comma-separated
- Tab 2: "WELLNESS NOTES" — list product.wellness_notes as bullet points
- Tab 3: "SHIPPING INFO" — "Ships within 48-72 hours. Free shipping on orders over $50. Continental US only."

### Section 2 — "Perfect For" (bg-[#FFF8F0], py-16)
- "PERFECT FOR" — heading-section class, text-[#2D5A27], text-center, mb-8
- Flex flex-wrap justify-center gap-3
- Map product.use_cases to pill badges: bg-[#2D5A27] text-white rounded-full px-5 py-2 text-sm font-bold uppercase

### Section 3 — Related Products (bg-[#e85c2a], py-16)
- "SEASON YOUR WHOLE KITCHEN" — heading-section class, white, text-center, mb-12
- Use getRelatedProducts(handle) — show as horizontal flex with gap-6, overflow-x-auto
- Same card style as shop cards but smaller (max-w-[300px])

### Generate static params:
```tsx
export function generateStaticParams() {
  return [
    { handle: "simple-szn" },
    { handle: "smokey-cajun-szn" },
    { handle: "garlicky-szn" },
    { handle: "soulution-starter-kit" },
  ];
}
```

## Rules
- TypeScript strict, no `any`
- "use client" only where hooks are needed
- Use Phosphor icons
- Mobile responsive
- Run `npx tsc --noEmit` — zero errors
