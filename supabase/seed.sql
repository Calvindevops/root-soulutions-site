-- Root Soulutions — Supabase Schema + Seed Data

-- Products
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  handle text unique not null,
  title text not null,
  subtitle text,
  description text,
  description_html text,
  price decimal(10,2) not null,
  compare_at_price decimal(10,2),
  images text[] default '{}',
  gradient_from text,
  gradient_to text,
  accent_color text,
  category text default 'blend',
  is_bundle boolean default false,
  available boolean default true,
  created_at timestamptz default now()
);

-- Orders
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  shopify_order_id text,
  payment_provider text,
  status text default 'pending',
  subtotal decimal(10,2),
  shipping decimal(10,2) default 0,
  total decimal(10,2),
  shipping_address jsonb,
  items jsonb not null,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Customers
create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  phone text,
  total_orders int default 0,
  total_spent decimal(10,2) default 0,
  source text,
  created_at timestamptz default now()
);

-- Newsletter subscribers
create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  subscribed_at timestamptz default now()
);

-- Wholesale inquiries
create table if not exists wholesale_inquiries (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  business_type text,
  location text,
  message text,
  status text default 'new',
  created_at timestamptz default now()
);

-- Contact messages
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  read boolean default false,
  created_at timestamptz default now()
);

-- Seed products
insert into products (handle, title, subtitle, description, price, compare_at_price, images, gradient_from, gradient_to, accent_color, category, is_bundle) values
('simple-szn', 'Simple SZN', 'Bright. Golden. Everyday.', 'A turmeric-forward, low-sodium complete seasoning made from whole-food herbs and spices.', 12.99, null, '{"/products/simple-szn.png"}', '#2A2A2A', '#1A1A1A', '#F5A623', 'blend', false),
('smokey-cajun-szn', 'Smokey Cajun SZN', 'Deep. Smoky. Bold.', 'A bold, low-sodium Cajun spice blend with smoky paprika and warm heat from aji panca.', 12.99, null, '{"/products/smokey-cajun-szn.png"}', '#5BA3E0', '#2D6CB5', '#E84B8A', 'blend', false),
('garlicky-szn', 'Garlicky SZN', 'Savory. Aromatic. Pure.', 'A garlic-forward aromatic blend with bright parsley and warm coriander.', 12.99, null, '{"/products/garlicky-szn.png"}', '#F5A623', '#E8890C', '#6B3FA0', 'blend', false),
('soulution-starter-kit', 'The Soulution Starter Kit', 'All 3 Blends. One Kit. Save 10%.', 'Get all three Root Soulutions blends in one bundle and save 10%.', 34.99, 38.97, '{"/products/starter-kit.png"}', '#2D5A27', '#1A3A15', '#F5C542', 'bundle', true)
on conflict (handle) do nothing;

-- Enable RLS
alter table products enable row level security;
alter table orders enable row level security;
alter table customers enable row level security;
alter table subscribers enable row level security;
alter table wholesale_inquiries enable row level security;
alter table contact_messages enable row level security;

-- Public read for products
create policy "Products are viewable by everyone" on products for select using (true);

-- Public insert for subscribers, wholesale, contact
create policy "Anyone can subscribe" on subscribers for insert with check (true);
create policy "Anyone can submit wholesale inquiry" on wholesale_inquiries for insert with check (true);
create policy "Anyone can submit contact message" on contact_messages for insert with check (true);

-- Authenticated full access for admin
create policy "Admin full access products" on products for all using (auth.role() = 'authenticated');
create policy "Admin full access orders" on orders for all using (auth.role() = 'authenticated');
create policy "Admin full access customers" on customers for all using (auth.role() = 'authenticated');
create policy "Admin read subscribers" on subscribers for select using (auth.role() = 'authenticated');
create policy "Admin read wholesale" on wholesale_inquiries for all using (auth.role() = 'authenticated');
create policy "Admin read messages" on contact_messages for all using (auth.role() = 'authenticated');

-- Service role can insert orders (from Shopify webhook)
create policy "Service role insert orders" on orders for insert with check (true);
create policy "Service role manage customers" on customers for all using (true);

-- Automation / n8n workflow log
create table if not exists workflow_log (
  id uuid primary key default gen_random_uuid(),
  logged_at timestamptz default now(),
  workflow text not null,       -- 'email_blast' | 'social' | 'sms' | 'health' | 'wholesale_alert' | 'welcome'
  action text not null,         -- 'sent' | 'skipped' | 'error'
  recipient text,               -- email or phone targeted
  subject text,                 -- email subject or SMS preview
  status text default 'ok',     -- 'ok' | 'error'
  details text                  -- error message or extra context
);

alter table workflow_log enable row level security;
create policy "Service role insert workflow_log" on workflow_log for insert with check (true);
create policy "Admin read workflow_log" on workflow_log for select using (auth.role() = 'authenticated');
