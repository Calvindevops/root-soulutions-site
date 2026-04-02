# Environment Variables Needed

Copy this into a file called `.env` in the project root.

```
# Supabase (Root Soulutions — dedicated project)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Shopify (ahgadf-je store — products, images, Buy Button checkout)
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=ahgadf-je.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-token
SHOPIFY_API_KEY=your-api-key
SHOPIFY_API_SECRET=your-api-secret
SCOPES=unauthenticated_read_checkouts,unauthenticated_read_product_inventory,unauthenticated_read_product_listings,unauthenticated_read_product_tags,unauthenticated_write_checkouts

# Shopify Admin API (optional — for unique discount codes + wholesale sync)
SHOPIFY_ADMIN_ACCESS_TOKEN=shpat_your-admin-token

# n8n Webhook (optional — for real-time lead sync)
N8N_WEBHOOK_URL=https://your-n8n.railway.app/webhook/rs-new-subscriber

# Webhook Auth (optional — for n8n polling endpoints)
WEBHOOK_SECRET=your-secret-string
```

## Setup on Mac
1. Clone: `git clone https://github.com/Calvindevops/root-soulutions-site.git`
2. Create `.env` with the values above (get real values from Calvin)
3. Install: `npm install`
4. Run: `npm run dev`
5. Open: `http://localhost:3000`
