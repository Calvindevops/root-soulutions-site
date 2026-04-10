# Root Soulutions — n8n Setup Guide
Last updated: 2026-04-10

## Deployment Status (2026-04-10)

| Workflow | n8n ID | Status |
|----------|--------|--------|
| RS — WF1: New Subscriber Welcome | `qgjfXCOwHk3oes45` | ✓ ACTIVE |
| RS — WF2+3: SMS Inbound Handler | `634ZEX1oPHzrltl3` | ✓ ACTIVE |
| RS — WF4: Wholesale Inquiry Alert | `PUuAVRxIHjt3g9pq` | ✓ ACTIVE |
| RS — WF5: Farmers Market SMS Blast | `bIveWmQRxiSqg4F3` | ✓ ACTIVE |
| RS — WF6: Shopify Order Thank You SMS | `JmRFVb96NaPuUzfS` | ○ INACTIVE (needs Shopify cred) |
| RS — WF7: Email Blast Scheduler | `UbG6m964Tozwz6F4` | ✓ ACTIVE |
| RS — Event Router | `cW2X6Pvoof48MNum` | ✓ ACTIVE |
| RS — MASTER COMMAND CENTER | `8U5XKttZMQooqqAa` | ✓ ACTIVE |
| RS — AI Market Reminder SMS | `CRzLXKw3O8V2AcXc` | ✓ ACTIVE |
| RS — AI SMS Campaigns | `Jjq2jtIMtYDsblrR` | ✓ ACTIVE |
| RS — AI Social Content | `HjQEdIbd32XVQBsI` | ✓ ACTIVE |
| RS — AI Email Responder | `Ksuj2DrllyIxRT5p` | ✓ ACTIVE |
| RS — Daily Health Check | `aHcz73BJXhuFTSGX` | ✓ ACTIVE |

**12/13 active.** WF6 pending Shopify credential.

### Pending Actions
1. **Wire WF2 webhook in Twilio**: `https://n8n-io-production-9f8e.up.railway.app/webhook/rs-sms-inbound` → (862) 315-3802 → Messaging → A message comes in → Webhook → POST
2. **Add Shopify credential** in n8n, then activate WF6
3. **Update Router webhook URL** in Vercel env var `N8N_WEBHOOK_URL`

### Key Credential IDs (correct)
| Credential | ID |
|---|---|
| Supabase | `mXeE7hNSsbndGCTz` |
| Anthropic | `welIuAElpcGmB7XF` |
| Brevo (sendInBlueApi) | `CvAbuQvIdxfZ8W2M` |
| Twilio | `d83Oxb1xJ2lWmtZ1` |

### n8n sendInBlue Node Fix (IMPORTANT)
In n8n 2.14.x, the Brevo/sendInBlue v2 node has a typo in its required parameter name.
The field must be spelled `receipients` (not `recipients`). Combined with a `sender` object:
```json
{
  "receipients": "email@address.com",
  "sender": { "email": "hello@rootsoulutions.com", "name": "Root Soulutions" },
  "subject": "...",
  "emailType": "html",
  "htmlContent": "..."
}
```

---

## Step 1: SQL Migration (run FIRST in Supabase SQL Editor)

```sql
-- Add phone + SMS consent to subscribers table
ALTER TABLE subscribers
  ADD COLUMN IF NOT EXISTS phone text,
  ADD COLUMN IF NOT EXISTS sms_consent boolean DEFAULT false;

-- Allow phone-only opt-ins (Twilio SUBSCRIBE without email)
ALTER TABLE subscribers ALTER COLUMN email DROP NOT NULL;

-- Fast phone lookups for SMS handlers
CREATE INDEX IF NOT EXISTS subscribers_phone_idx ON subscribers (phone)
  WHERE phone IS NOT NULL;

-- Allow n8n to update sms_consent via opt-in/out workflows
CREATE POLICY "Service role update subscribers" ON subscribers
  FOR UPDATE USING (true);

-- Automation log table
CREATE TABLE IF NOT EXISTS workflow_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  logged_at timestamptz DEFAULT now(),
  workflow text NOT NULL,
  action text NOT NULL,
  recipient text,
  subject text,
  status text DEFAULT 'ok',
  details text
);
ALTER TABLE workflow_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role insert workflow_log" ON workflow_log FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read workflow_log" ON workflow_log FOR SELECT USING (auth.role() = 'authenticated');
```

---

## Step 2: n8n Credential Setup

### Twilio (REQUIRED before any SMS workflow)
1. Go to twilio.com/console
2. Copy **Account SID** (starts with `AC...`)
3. Copy **Auth Token** (click eye icon)
4. n8n Cloud → Settings → Credentials → find Twilio (d83Oxb1xJ2lWmtZ1) → fill both fields → Save

### Anthropic (already rotated)
1. console.anthropic.com → API Keys → Create new key
2. n8n Cloud → Credentials → Anthropic (`welIuAElpcGmB7XF`) → update key → Save
3. Old key `5nGgwoStoJFhw8xi` was rotated 2026-04-10 — all workflows updated to new cred

### Shopify (for WF6 Order SMS)
1. Shopify Partners → Apps → or store admin → Settings → Apps → Develop apps
2. Create app → Admin API access → grant: Orders (read)
3. Install app → copy Admin API token
4. n8n Cloud → Credentials → New → Shopify API → store: `ahgadf-je.myshopify.com` + token

### n8n Environment Variables (Settings → Environment Variables)
```
SUPABASE_URL = https://[your-project].supabase.co
SUPABASE_SERVICE_KEY = [your service role key from Supabase Settings → API]
SHOPIFY_ADMIN_ACCESS_TOKEN = [from step above]
```

---

## Step 3: Import Workflows (in this order)

Import each JSON file via: n8n Cloud → Workflows → Import from File

| Order | File | Notes |
|-------|------|-------|
| 1 | `rs-router.json` | Receives all site events — import first, activate last |
| 2 | `wf4-wholesale-alert.json` | Simplest — test Brevo + Twilio together |
| 3 | `wf1-new-subscriber-welcome.json` | Tests email + conditional SMS |
| 4 | `wf2-sms-inbound-handler.json` | START/STOP handler |
| 5 | `wf5-market-sms-blast.json` | Manual form trigger |
| 6 | `wf6-shopify-order-sms.json` | Needs Shopify credential |
| 7 | `wf7-email-blast-scheduler.json` | Most complex — build last |

After importing:
1. Open `rs-router.json` → copy the workflow IDs of WF1 and WF4
2. Update the two `Execute Workflow` nodes in the Router with those IDs
3. Activate all workflows

---

## Step 4: Wire Twilio Inbound URL

After importing `wf2-sms-inbound-handler.json`:
1. Open the workflow in n8n → click the Webhook node → copy the Production URL
2. Twilio Console → Phone Numbers → Active Numbers → (862) 315-3802
3. Messaging → A message comes in → Webhook → paste the URL → HTTP POST → Save

---

## Step 5: Update Site Webhook URL

After the Router is imported and active:
1. Copy the Router's Production Webhook URL from n8n
2. Vercel Dashboard → root-soulutions-site → Settings → Environment Variables
3. Update `N8N_WEBHOOK_URL` to the new URL → Redeploy

---

## Step 6: Test Each Workflow

| Workflow | How to Test |
|----------|-------------|
| WF1 Welcome | Submit newsletter form on site → check Brevo logs + workflow_log in Supabase |
| WF2 SMS Opt-in | Text START to (862) 315-3802 → check Supabase sms_consent=true |
| WF3 SMS Opt-out | Text STOP to (862) 315-3802 → check Supabase sms_consent=false |
| WF4 Wholesale | Submit wholesale form on site → check hello@rootsoulutions.com + SMS |
| WF5 Market Blast | Open n8n Form URL → fill fields → check Twilio sent log |
| WF6 Order SMS | Place test Shopify order → check SMS (phone must be in subscribers with sms_consent=true) |
| WF7 Email Blast | Open workflow → add manual trigger → run → check Brevo sent log |

---

## Blotato MCP (Social Branch in Master)

When rebuilding the Master Command Center (WF8):
- After S-Done node: add HTTP Request node
- Method: POST
- URL: `https://api.blotato.com/v1/posts` (confirm in Blotato docs)
- Auth: Bearer token (add Blotato API key as n8n HTTP Header credential)
- Body: `{ "content": "={{ $json.caption }}", "hashtags": "={{ $json.hashtags }}", "platforms": ["instagram"] }`

---

## Stack Summary — No Make Needed

| Tool | Purpose | Status |
|------|---------|--------|
| n8n Cloud | All automation workflows | 14-day trial → Hostinger VPS |
| Brevo | Email sending | Configured ✅ |
| Twilio | SMS sending/receiving | Needs SID/Token filled |
| Supabase | Subscriber data + logs | Live ✅ |
| Shopify | Order webhooks | Needs credential |
| Blotato | Social posting | Needs MCP wiring |

**n8n replaces Make entirely.** No need for both.
