@AGENTS.md

# Root Soulutions Site — App Context

## App Identity
**Root Soulutions** — Artisan low-sodium seasoning brand.
Founder: **Collin Alexander** | Location: Jersey City, NJ
LLC: **Craft Eatery Food Genius Company L.L.C.**
Contact: `contact@lovecrafteatery.com`
Root: `apps/root-soulutions-site/`
Deploy: Vercel (always deploy from `apps/root-soulutions-site/` — NOT monorepo root)

## Products
| Handle | Display Name |
|--------|-------------|
| `low-sodium-simple-szn-complete-seasoning` | Simple SZN |
| `low-sodium-smokey-cajun-szn` | Smokey Cajun SZN |
| `low-sodium-garlicky-szn-blend` | Garlicky SZN |
| `soulutions-starter-kit` | Soulution Starter Kit (bundle — all 3) |

## Stack
- **Frontend:** Next.js (App Router), Tailwind, Framer Motion
- **Commerce:** Shopify Storefront API (headless)
- **Backend:** Supabase (auth, DB, Edge Functions)
- **Automation:** n8n (Railway) — webhook-driven workflows
- **Email:** Brevo (transactional + blast)
- **SMS:** Twilio (sending + inbound, number: (862) 315-3802)
- **Lead export:** OneDrive Excel
- **Design:** See `DESIGN.md` (Vercel design system)

## n8n Workflows (Railway-hosted)
Webhook base: `https://n8n-io-production-9f8e.up.railway.app`

| File / ID | Workflow | Trigger | Purpose |
|-----------|----------|---------|---------|
| `wf1-new-subscriber-welcome.json` — `qgjfXCOwHk3oes45` | WF1: New Subscriber Welcome | Newsletter form submit | Welcome email via Brevo + log |
| `wf2-sms-inbound-handler.json` — `634ZEX1oPHzrltl3` | WF2+3: SMS Inbound Handler | Twilio webhook (inbound SMS) | START → sms_consent=true; STOP → false |
| `wf4-wholesale-alert.json` — `PUuAVRxIHjt3g9pq` | WF4: Wholesale Inquiry Alert | Wholesale form submit | Brevo alert email + SMS to Collin + log |
| `wf5-market-sms-blast.json` — `bIveWmQRxiSqg4F3` | WF5: Farmers Market SMS Blast | n8n Form (manual) | Twilio SMS to opted-in subscribers |
| `wf6-shopify-order-sms.json` — `JmRFVb96NaPuUzfS` | WF6: Shopify Order Thank You SMS | Shopify order webhook | SMS to customer post-purchase (inactive — needs Shopify cred) |
| `wf7-email-blast-scheduler.json` — `UbG6m964Tozwz6F4` | WF7: Email Blast Scheduler | Manual / scheduled | Mon/Wed/Fri Brevo email batch to leads |
| `rs-router.json` — `cW2X6Pvoof48MNum` | RS Event Router | Webhook from site | Routes inbound events to correct workflow |
| `root-soulutions-leads-to-excel.json` | Leads → Excel | - | Exports lead data to OneDrive Excel |
| (Railway only) `8U5XKttZMQooqqAa` | RS Master Command Center | - | Orchestration hub |
| (Railway only) `CRzLXKw3O8V2AcXc` | RS AI Market Reminder SMS | - | AI-generated market-day reminders |
| (Railway only) `Jjq2jtIMtYDsblrR` | RS AI SMS Campaigns | - | AI-driven SMS campaign logic |
| (Railway only) `HjQEdIbd32XVQBsI` | RS AI Social Content | - | AI social post generation |
| (Railway only) `aHcz73BJXhuFTSGX` | RS Daily Health Check | Cron | Monitors workflow health |

**13 workflows total. 12/13 active** — WF6 inactive pending Shopify credential.

## Channels
- Farmers markets (WF5 SMS blast before events)
- Wholesale inquiries (WF4 alert)
- Email blast (Mon/Wed/Fri via WF7)
- SMS campaigns (Twilio, WF2/3/5)
- Shopify storefront (headless, WF6)

## Claude AI Agents (Planned / not yet in repo)
These do not exist as code in the repo yet — listed for future reference only:
- Intake agent — qualify incoming leads
- Reactivation agent — re-engage cold leads
- Lead scoring — rank based on engagement

## Deploy Rule
```bash
cd /home/calvi/norevel/apps/root-soulutions-site && vercel --prod
```

## Context7 Rule
Before any Next.js code changes, query Context7 for App Router patterns.

## Non-Negotiables
- Never expose n8n webhook URLs in client-side code — route through Edge Functions
- Screenshot QA before any UI ships
- TypeScript clean before deploying
- n8n webhooks are server-side only — never referenced directly from browser code
