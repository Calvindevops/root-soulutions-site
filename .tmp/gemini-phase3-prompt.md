# Task: Build Global Layout Components for Root Soulutions

You are building 5 global layout components for a Next.js 15 e-commerce site. The project is already scaffolded at the current directory with Tailwind CSS 4, Framer Motion, and Phosphor Icons installed.

## IMPORTANT: Read these files first
- `app/globals.css` — design system (colors, fonts, typography classes)
- `lib/animations.ts` — Framer Motion variants
- `lib/cart-context.tsx` — cart state (useCart hook)
- `lib/types.ts` — TypeScript types
- `lib/products.ts` — product data

## Design System
- Colors: Earth Green #2D5A27, RS Orange #e85c2a, Warm Cream #FFF8F0, Rich Black #1A1A1A, Warm Gold #F5C542
- Fonts: Bebas Neue (headings, uppercase via `font-[family-name:var(--font-bebas)]`), DM Sans (body via `font-[family-name:var(--font-dm-sans)]`), Playfair Display (subheadings)
- Buttons: pill-shaped (rounded-full), cards 2rem radius
- Icons: `@phosphor-icons/react` — use `weight="regular"` for UI, `weight="duotone"` for decorative, `weight="fill"` for social

## Component 1: `components/layout/AnnouncementBar.tsx`
- Fixed bar at very top of every page
- Background: #1A1A1A (rich black), text: #F5C542 (warm gold), uppercase, bold
- 3 messages scrolling left infinitely using the `.marquee-track` CSS class from globals.css:
  1. "WHOLE-FOOD SEASONINGS CRAFTED WITH SOUL" — links to /shop
  2. "LOW SODIUM. CHEMICAL-FREE. SMALL-BATCH."
  3. "FIND US AT YOUR LOCAL FARMERS MARKET" — links to /markets
- Duplicate content 2x inside the track for seamless loop
- Height: ~34px, overflow hidden
- Use Phosphor `Leaf` icon between messages

## Component 2: `components/layout/Navbar.tsx`
- Sticky below announcement bar (use `sticky top-[34px]`)
- Background: #2D5A27 (deep earth green)
- Height: 70px, z-50
- 3-column layout:
  - Left: SHOP, MARKETS, OUR STORY links (white, uppercase, DM Sans bold 14px, tracking-wider)
  - Center: Text "ROOT SOULUTIONS" in Bebas Neue, white, text-2xl (placeholder until logo image)
  - Right: RECIPES, WHOLESALE links + cart button (pill shape, white border, shows item count from useCart)
- Mobile (below md): hamburger icon left (Phosphor `List`), logo center, cart icon right (Phosphor `ShoppingBag`)
- Cart button onClick calls `openCart()` from useCart
- All links use Next.js `Link` component
- Use `"use client"` directive

## Component 3: `components/layout/Footer.tsx`
- Background: #1A1A1A, text: #F5C542 (gold)
- Max-width container centered, padding 64px top/bottom
- 4-column grid (stack on mobile):
  - Col 1: "ROOT SOULUTIONS" logo text + tagline "Whole-food, low-sodium seasonings crafted with SOUL." + social icons row (Phosphor: `InstagramLogo`, `TiktokLogo`, `FacebookLogo` — all weight="fill", size={24})
  - Col 2: "SHOP" heading + links: Shop All, Simple SZN, Smokey Cajun SZN, Garlicky SZN
  - Col 3: "COMPANY" heading + links: Our Story, Farmers Markets, Wholesale, Recipes
  - Col 4: "SUPPORT" heading + links: Contact, FAQ, Shipping & Returns, Terms, Privacy
- Column headings: Bebas Neue, uppercase, text-lg, mb-4
- Links: DM Sans, text-sm, text-[#F5C542]/70, hover:text-[#F5C542], transition
- Bottom bar: border-t border-white/10, pt-6, mt-8
  - Left: "© 2026 Root Soulutions. Craft Eatery Food Genius Company L.L.C."
  - Right: payment icons placeholder text "Visa • Mastercard • Amex • Apple Pay"
- All in text-sm, text-[#F5C542]/50

## Component 4: `components/layout/CartDrawer.tsx`
- "use client" component
- Slides in from right edge of screen when `isOpen` is true (from useCart)
- Use Framer Motion `AnimatePresence` + `motion.div` with x animation (initial: "100%", animate: 0, exit: "100%")
- Dark overlay behind (black/50, onClick closes cart)
- Width: 400px (full width on mobile)
- Background: #2D5A27 (earth green), text: white
- Header: "YOUR CART" in Bebas Neue + close X button (Phosphor `X`)
- If cart empty: "Your cart is empty" + "SHOP NOW" link button to /shop
- If cart has items:
  - Each line item: product title, quantity controls (Phosphor `Minus`/`Plus` with updateQuantity), price, remove button (Phosphor `Trash`)
  - Subtotal line
  - Progress bar: "Free shipping on orders over $50" — show progress toward $50
  - "CHECKOUT" button: full width, #e85c2a orange bg, white text, rounded-full, onClick calls checkout() from useCart
- Fixed z-[60]

## Component 5: `components/layout/MobileMenu.tsx`
- "use client" component
- Full-screen overlay menu for mobile
- Background: #2D5A27
- AnimatePresence slide from left
- Links stacked vertically: SHOP, OUR STORY, MARKETS, RECIPES, WHOLESALE, CONTACT, FAQ
- Each link: Bebas Neue, text-3xl, white, uppercase
- Close button top-right (Phosphor `X`)
- Social icons at bottom

## After building all 5 components:
Update `app/layout.tsx` to import and render AnnouncementBar + Navbar at top, Footer at bottom (wrapping children between them). CartDrawer should render inside the CartProvider area.

## Rules
- Use TypeScript strictly — no `any` types
- All components must be properly typed
- Import icons from `@phosphor-icons/react`
- Use the animation variants from `lib/animations.ts` where appropriate
- Ensure mobile responsive (use Tailwind responsive prefixes)
- Use Next.js `Link` for navigation
- Test that `npx tsc --noEmit` passes with zero errors when done
