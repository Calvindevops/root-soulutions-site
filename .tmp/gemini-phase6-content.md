# Task: Build 8 Content Pages

You are adding 8 pages to an existing Next.js 15 e-commerce site for Root Soulutions.

## Read these files first
- `app/globals.css` — colors, typography classes
- `lib/animations.ts` — Framer Motion variants
- `lib/types.ts` — Recipe, Market, FAQCategory, FAQItem types
- `components/home/ScrollingMarquee.tsx` — reusable marquee

## Page 1: `app/about/page.tsx` — Our Story
- Section 1 — Hero Banner: min-h-[60vh], bg-[#2D5A27], flex items-center justify-center
  - "OUR STORY" — heading-hero class, white, text-center
  - fadeIn animation
- Section 2 — Marquee: text="CRAFTED WITH SOUL 🌿 ROOTED IN PURPOSE 🌱" bgColor="#e85c2a" textColor="white"
- Section 3 — Founder Story: bg-[#2D5A27], py-24, max-w-[900px] mx-auto px-6
  - "HI, MY NAME IS COLLIN ALEXANDER." — heading-section, white
  - Full story paragraphs (DM Sans, text-white/80, text-lg, leading-relaxed, space-y-6):
    "— and this is how giving myself six insulin shots a day at sixteen accidentally led me to create a whole health-foods brand."
    "My story actually starts earlier than that. At twelve years old, I found myself standing in my great-grandmother's kitchen, administering insulin to her tiny arm before school. Four years later, I was doing the same thing — except this time, it was my own arm. Type 2 diabetes had entered my life fast, loud, and uninvited."
    "But here's the plot twist: Instead of letting diabetes define me, I let it redirect me."
    "I dove into research, food science, cultural foodways, and the hard truths about how our communities — especially marginalized communities — are fed, taught, and treated. I learned that most of what we eat is processed, stripped, dyed, and chemically engineered."
    "So I made a choice: If the solutions didn't exist, I'd build them."
    "That's how Root Soulutions was born — a POC-owned, wellness-forward flavor brand built from my lived experience, my healing, and my culture."
  - fadeInUp with stagger
- Section 4 — SOUL Philosophy: bg-[#6B3FA0], py-24
  - "CRAFTED WITH SOUL" — heading-section, white, text-center, mb-16
  - 2x2 grid (md:grid-cols-2, gap-6, max-w-[800px] mx-auto px-6)
  - 4 cards (bg-[#FFF8F0] rounded-[2rem] p-8):
    - "S — SIMPLICITY" / "Pure ingredients. Clean labels. No complexity."
    - "O — ORGANIC ALIGNMENT" / "Whole-food herbs and spices only."
    - "U — UNCOMPROMISED QUALITY" / "Small-batch. No fillers. No shortcuts."
    - "L — LIFESTYLE-FORWARD FLAVOR" / "Seasoning that nourishes your whole life."
  - Card title: heading-card, text-[#6B3FA0]. Body: text-[#1A1A1A]/70
  - staggerContainer + fadeInUp
- Section 5 — Clean Label Badges: bg-[#FFF8F0], py-16
  - "WHAT WE VALUE" — heading-section, text-[#2D5A27], text-center, mb-8
  - Pill badges (same as homepage ValueBadges): Low Sodium, Chemical-Free, Preservative-Free, Gluten-Free, Whole-Food Based, Wellness-Aligned
- Section 6 — CTA: bg-[#1A1A1A], py-24, text-center
  - "TASTE THE SOULUTION" — heading-section, text-[#F5C542]
  - Link to /shop: "SHOP ROOT SOULUTIONS" — bg-[#e85c2a] text-white rounded-full px-12 py-4 btn-text inline-block mt-8

## Page 2: `app/markets/page.tsx` — Farmers Markets
- Header: bg-[#2D5A27], py-20, text-center
  - "FIND US AT THE MARKET" — heading-hero, white
  - "Fresh seasonings. Real conversations. See you there." — text-white/70
- Market Schedule: bg-[#FFF8F0], py-16, max-w-[900px] mx-auto px-6
  - Hardcoded market data array at top of file:
    - { name: "Jersey City Farmers Market", address: "Journal Square, Jersey City, NJ", day: "Saturdays", hours: "9am - 3pm" }
    - { name: "Hoboken Farmers Market", address: "Sinatra Dr, Hoboken, NJ", day: "Sundays", hours: "10am - 4pm" }
  - Each card: bg-white rounded-[1.5rem] p-6 shadow-sm mb-4
    - Name: DM Sans bold text-lg text-[#2D5A27]
    - Address + Day + Hours in text-[#1A1A1A]/60
    - "GET DIRECTIONS" link: text-[#e85c2a] font-bold text-sm uppercase
  - fadeInUp stagger
- QR CTA: bg-[#e85c2a], py-16, text-center
  - "SAW US AT THE MARKET?" — heading-section, white
  - Body text + "SHOP NOW" link to /shop

## Page 3: `app/recipes/page.tsx` — Soul Kitchen
- "use client" (filter state)
- Header: bg-[#e85c2a], py-20, text-center
  - "SOUL KITCHEN" — heading-hero, white
  - Sub: text-white/70
- Filter Pills: bg-[#e85c2a], flex justify-center gap-3, mb-12
  - Buttons: "ALL", "SIMPLE SZN", "SMOKEY CAJUN", "GARLICKY"
  - Active: bg-white text-[#e85c2a]. Inactive: bg-transparent text-white border border-white
  - rounded-full px-6 py-2 text-sm font-bold uppercase
  - useState for activeFilter
- Recipe Grid: bg-[#e85c2a], pb-24
  - Hardcoded recipes array (6 items with title, blend slug, blendLabel)
  - Filter by activeFilter (or show all)
  - grid md:grid-cols-3 gap-6, max-w-[1400px] mx-auto px-6
  - Card: aspect-video bg-black/20 rounded-t-[1.5rem] + p-4 below with title + blend pill badge
- "MORE RECIPES COMING SOON" — text-white/50 text-center mt-8

## Page 4: `app/wholesale/page.tsx` — Wholesale Inquiry
- "use client" (form)
- Header: bg-[#2D5A27], py-20, text-center — "WHOLESALE INQUIRIES" heading-hero white
- Form: bg-[#FFF8F0], py-16, max-w-[800px] mx-auto px-6
  - Intro text about wholesale partnerships
  - Fields: Business Name, Contact Name, Email, Phone (optional), Business Type (select: Health Food Store, Restaurant, Co-op, Grocery, Specialty, Distributor, Other), Location, Message (textarea)
  - Input style: border-2 border-[#2D5A27]/20 rounded-xl px-4 py-3 w-full focus:border-[#2D5A27] outline-none
  - Submit: "SEND INQUIRY" bg-[#e85c2a] text-white rounded-full w-full py-4 btn-text
  - On submit: POST to /api/wholesale (console.log for now) + show success state
  - Success: "Thank you! We'll be in touch within 48 hours."

## Page 5: `app/contact/page.tsx` — Contact
- "use client" (form)
- Header: bg-[#2D5A27], py-20, text-center — "CONTACT" heading-hero white
- Contact Info + Form: bg-[#FFF8F0], py-16, max-w-[700px] mx-auto px-6
  - Info: hello@rootsoulutions.com, wholesale@rootsoulutions.com, Jersey City, NJ
  - Fields: Name, Email, Phone (optional), Message (textarea 5 rows)
  - Submit: "SEND MESSAGE" same style as wholesale
  - Success state

## Page 6: `app/faq/page.tsx` — FAQ
- "use client" (accordion state)
- Header: bg-[#2D5A27], py-20, text-center — "FAQ" heading-hero white
- Accordion: bg-[#FFF8F0], py-16, max-w-[900px] mx-auto px-6
- FAQ data array with categories: SHIPPING (2 Qs), PRODUCTS (5 Qs), WHOLESALE (2 Qs), RETURNS (1 Q)
- Category heading: heading-card text-[#2D5A27] mt-8 mb-4
- Each Q: border-b border-[#2D5A27]/10 py-4
  - Question: DM Sans bold text-[#2D5A27] flex justify-between cursor-pointer
  - Phosphor CaretDown icon, rotates when open
  - Answer: Framer Motion AnimatePresence, animate height, text-[#1A1A1A]/70 pt-2 pb-4
  - Only one Q open at a time (useState tracking open index)
- FAQ Content:
  - SHIPPING: "Where do you ship?" → continental US, free over $50. "How long?" → 48-72hr + 3-7 days
  - PRODUCTS: gluten-free yes, vegan yes, storage cool/dry, Celtic sea salt minerals, low-sodium for health
  - WHOLESALE: yes visit /wholesale, health food stores + restaurants + co-ops
  - RETURNS: contact within 7 days

## Page 7: `app/terms/page.tsx` — Terms of Service
- Header: bg-[#2D5A27], py-20, text-center — "TERMS OF SERVICE" heading-section white
- Content: bg-[#FFF8F0], py-16, max-w-[800px] mx-auto px-6, prose style
- Standard e-commerce terms (short, 5-6 sections: acceptance, products, pricing, shipping, returns, contact)
- Company: Craft Eatery Food Genius Company L.L.C.

## Page 8: `app/privacy/page.tsx` — Privacy Policy
- Same layout as terms
- "PRIVACY POLICY" heading
- Standard privacy policy (data collection, cookies, third parties, contact)
- Company: Craft Eatery Food Genius Company L.L.C., hello@rootsoulutions.com

## Rules
- TypeScript strict, no `any`
- "use client" only where hooks needed
- Phosphor icons where applicable
- Mobile responsive
- Run `npx tsc --noEmit` — zero errors
