# Task: Build Admin Dashboard for Root Soulutions

You are adding a full admin dashboard to an existing Next.js 15 e-commerce site. This is Collin's backend — where he manages products, orders, customers, wholesale inquiries, contact messages, and newsletter subscribers. It replaces Shopify's admin panel.

## Read these files first
- `lib/supabase.ts` — Supabase client
- `lib/types.ts` — TypeScript types (Product, Order, Customer, WholesaleInquiry, ContactMessage, Subscriber)
- `lib/products.ts` — current product data structure
- `app/globals.css` — design system

## Auth Setup

### `app/admin/login/page.tsx`
- "use client"
- Simple login form: email + password
- Background: #1A1A1A, centered card (max-w-md, bg-white, rounded-2xl, p-8, shadow-xl)
- "ROOT SOULUTIONS ADMIN" heading in Bebas Neue
- Email input + password input + "SIGN IN" button (bg-[#2D5A27] text-white rounded-full w-full py-3)
- On submit: call Supabase auth `signInWithPassword`
- On success: redirect to `/admin`
- Error state: red text below form
- No signup link — admin only

### `middleware.ts` (project root)
- Protect all `/admin` routes EXCEPT `/admin/login`
- Check for Supabase session cookie
- If no session → redirect to `/admin/login`
- If session exists → allow through
- Use `@supabase/ssr` pattern for middleware auth check
- NOTE: Since we may not have Supabase configured yet, make the auth check conditional — if no SUPABASE_URL env var, allow all admin routes through (dev mode)

## Admin Layout

### `app/admin/layout.tsx`
- "use client"
- Flex layout: sidebar (w-64, fixed) + main content (ml-64, flex-1)
- Background: #f5f5f5 (light gray) for main content area
- Import and render `Sidebar` component
- Wrap children in a padded container (p-8)

### `components/admin/Sidebar.tsx`
- "use client" (needs usePathname for active state)
- Fixed left sidebar, w-64, h-screen
- Background: #1A1A1A (rich black)
- Top: "ROOT SOULUTIONS" text in Bebas Neue, text-[#F5C542], text-xl, p-6
- Below: "ADMIN PANEL" in text-xs text-white/40 uppercase tracking-widest px-6
- Nav links (vertical stack, py-3 px-6):
  - Dashboard → /admin (Phosphor: `ChartBar`)
  - Products → /admin/products (Phosphor: `Package`)
  - Orders → /admin/orders (Phosphor: `ShoppingCart`)
  - Customers → /admin/customers (Phosphor: `Users`)
  - Wholesale → /admin/wholesale (Phosphor: `Handshake`)
  - Messages → /admin/messages (Phosphor: `ChatCircle`)
  - Subscribers → /admin/subscribers (Phosphor: `Envelope`)
- Active link: bg-[#2D5A27] text-white rounded-lg
- Inactive: text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition
- Icons: weight="regular", size={20}, mr-3
- Bottom: "← Back to Site" link → / (text-white/40, text-sm, px-6, pb-6)
- Divider line above back link: border-t border-white/10

### `components/admin/StatsCard.tsx`
- Props: `{ title: string; value: string | number; icon: React.ReactNode; trend?: string; color?: string }`
- Card: bg-white rounded-xl p-6 shadow-sm
- Icon in colored circle (w-12 h-12 rounded-full flex items-center justify-center, bg-[color]/10)
- Title: text-sm text-gray-500 uppercase tracking-wider
- Value: text-3xl font-bold text-gray-900 mt-1
- Trend: text-sm text-green-600 mt-1 (optional)

### `components/admin/StatusBadge.tsx`
- Props: `{ status: string }`
- Color mapping:
  - pending/new → bg-yellow-100 text-yellow-800
  - paid/contacted → bg-blue-100 text-blue-800
  - shipped → bg-purple-100 text-purple-800
  - delivered/converted → bg-green-100 text-green-800
  - cancelled/declined → bg-red-100 text-red-800
  - read → bg-gray-100 text-gray-600
- Pill shape: rounded-full px-3 py-1 text-xs font-semibold uppercase

## Dashboard Pages

### `app/admin/page.tsx` — Dashboard Home
- "use client"
- Header: "Dashboard" h1 (text-2xl font-bold text-gray-900) + current date
- 4 StatsCards in a grid (grid-cols-4 gap-6):
  - Total Products: count from products array, icon ChartBar, color #2D5A27
  - Total Orders: "0" (placeholder), icon ShoppingCart, color #e85c2a
  - Customers: "0" (placeholder), icon Users, color #6B3FA0
  - Revenue: "$0.00" (placeholder), icon CurrencyDollar, color #F5C542
- Below stats: "Recent Activity" section
  - Simple card (bg-white rounded-xl p-6)
  - "No recent activity" placeholder text in center, text-gray-400

### `app/admin/products/page.tsx` — Product List
- "use client"
- Header: "Products" h1 + "Add Product" button (bg-[#2D5A27] text-white rounded-lg px-4 py-2)
- Table: bg-white rounded-xl shadow-sm overflow-hidden
  - Header row: bg-gray-50, text-xs text-gray-500 uppercase
  - Columns: Image, Name, Price, Category, Status, Actions
  - Import products from `lib/products.ts`
  - Each row:
    - Image: w-12 h-12 rounded-lg bg-gradient-to-b (product gradients)
    - Name: font-semibold text-gray-900 + subtitle in text-sm text-gray-500
    - Price: $XX.XX
    - Category: pill badge (blend or bundle)
    - Status: StatusBadge (available → green "Active")
    - Actions: "Edit" link text-[#2D5A27] font-semibold text-sm
  - Alternating row colors: even:bg-gray-50

### `app/admin/orders/page.tsx` — Order List
- "use client"
- Header: "Orders" h1
- Empty state card: bg-white rounded-xl p-12 text-center
  - Phosphor `ShoppingCart` weight="duotone" size={48} color="#d1d5db"
  - "No orders yet" text-gray-500 text-lg mt-4
  - "Orders will appear here when customers complete checkout." text-gray-400 text-sm mt-2
- (Table structure ready for when orders come in — same pattern as products table with columns: Order #, Customer, Date, Total, Status, Actions)

### `app/admin/customers/page.tsx` — Customer List
- Same empty state pattern as orders
- Phosphor `Users` icon
- "No customers yet"
- (Table columns: Name, Email, Orders, Total Spent, Source, Joined)

### `app/admin/wholesale/page.tsx` — Wholesale Inquiries
- Same empty state pattern
- Phosphor `Handshake` icon
- "No wholesale inquiries yet"
- "Inquiries from the wholesale form will appear here."
- (Table columns: Business, Contact, Email, Type, Status, Date, Actions)

### `app/admin/messages/page.tsx` — Contact Messages
- Same empty state pattern
- Phosphor `ChatCircle` icon
- "No messages yet"
- "Messages from the contact form will appear here."
- (Table columns: Name, Email, Message (truncated), Read, Date)

### `app/admin/subscribers/page.tsx` — Newsletter Subscribers
- Same empty state pattern
- Phosphor `Envelope` icon
- "No subscribers yet"
- "Newsletter signups will appear here."
- Header includes: "Export CSV" button (bg-gray-100 text-gray-700 rounded-lg px-4 py-2, disabled when empty)
- (Table columns: Email, Subscribed Date)

## Design Rules for Admin
- Clean, minimal, functional — NOT heavily branded
- White cards on light gray (#f5f5f5) background
- Consistent rounded-xl corners on all cards/tables
- Gray-900 for primary text, gray-500 for secondary
- Green (#2D5A27) for primary actions
- Orange (#e85c2a) for CTAs/highlights
- Use Phosphor icons weight="regular" for sidebar, weight="duotone" for empty states
- All tables: alternating rows, sticky header if scrollable
- Mobile: sidebar collapses (hidden below lg, show hamburger menu)

## TypeScript Rules
- No `any` types
- "use client" where hooks are needed
- Import types from `lib/types.ts`
- Import Phosphor icons from `@phosphor-icons/react`
- Run `npx tsc --noEmit` when done — zero errors required
