# Root Soulutions — n8n Setup Guide
Last updated: 2026-04-10

## Deployment Status (2026-04-10)

| Workflow | n8n ID | Status |
|----------|--------|--------|
| RS — WF1: New Subscriber Welcome | `qgjfXCOwHk3oes45` | ✓ ACTIVE — tested green |
| RS — WF2+3: SMS Inbound Handler | `634ZEX1oPHzrltl3` | ✓ ACTIVE — needs Twilio webhook wired |
| RS — WF4: Wholesale Inquiry Alert | `PUuAVRxIHjt3g9pq` | ✓ ACTIVE — tested green |
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
1. **Wire WF2 webhook in Twilio**: `https://n8n-io-production-9f8e.up.railway.app/webhook/rs-sms-inbound` → (862) 315-3802 → Messaging → "A message comes in" → Webhook → POST
2. **Add Shopify credential** in n8n, then activate WF6

### Key Credential IDs
| Credential | ID |
|---|---|
| Supabase | `mXeE7hNSsbndGCTz` |
| Anthropic | `welIuAElpcGmB7XF` |
| Brevo (sendInBlueApi) | `tCBKxhdorIt59QKv` |
| Twilio | `d83Oxb1xJ2lWmtZ1` |

### Architecture Notes (n8n 2.14.x)

**Brevo email nodes**: The native `sendInBlue` v2 node has two bugs in n8n 2.14.x:
1. Parameter name typo: `receipients` (not `recipients`)
2. Runtime bug: `sender` object is never included in the Brevo API request body

**Fix applied to WF1 + WF4**: Replaced sendInBlue node with:
- `Code` node (runOnceForAllItems) — builds the email payload as `{ sender, to, subject, htmlContent }`
- `HTTP Request` node — POSTs to `https://api.brevo.com/v3/smtp/email` using `predefinedCredentialType: sendInBlueApi`

**Supabase log nodes**: The native `supabase` node (typeVersion 1) has a `tableId` parameter resolution bug in n8n 2.14.x. Fix applied: replaced with HTTP Request node POSTing to `https://swfviswbxxyodktnbkve.supabase.co/rest/v1/workflow_log` using `predefinedCredentialType: supabaseApi`.

**n8n env vars**: `$env.VAR` is blocked in both Code node and HTTP Request expression contexts on this Railway instance. Use `predefinedCredentialType` for credentials instead.

---

## Supabase Schema (already migrated — 2026-04-10)

```sql
-- Already run. DO NOT re-run unless resetting.
ALTER TABLE subscribers
  ADD COLUMN IF NOT EXISTS phone text,
  ADD COLUMN IF NOT EXISTS sms_consent boolean DEFAULT false;

ALTER TABLE subscribers ALTER COLUMN email DROP NOT NULL;

CREATE INDEX IF NOT EXISTS subscribers_phone_idx ON subscribers (phone)
  WHERE phone IS NOT NULL;

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

CREATE POLICY "Service role update subscribers" ON subscribers
  FOR UPDATE USING (true);
CREATE POLICY "Service role insert workflow_log" ON workflow_log
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read workflow_log" ON workflow_log
  FOR SELECT USING (auth.role() = 'authenticated');
```

---

## Step 1: n8n Credentials Required

| Credential | Type | Status |
|---|---|---|
| Brevo | `sendInBlueApi` | ✓ Configured (`tCBKxhdorIt59QKv`) |
| Supabase | `supabaseApi` | ✓ Configured (`mXeE7hNSsbndGCTz`) |
| Twilio | `twilioApi` | ✓ Configured (`d83Oxb1xJ2lWmtZ1`) |
| Anthropic | `anthropicApi` | ✓ Configured (`welIuAElpcGmB7XF`) |
| Shopify | `shopifyApi` | ✗ Needed for WF6 |

### Shopify (for WF6 Order SMS)
1. Shopify admin → Settings → Apps → Develop apps → Create app
2. Admin API access → grant: Orders (read) → Install → copy Admin API token
3. n8n → Credentials → New → Shopify API → store: `ahgadf-je.myshopify.com` + token
4. Update WF6 `shopifyApi` credential ID → activate

---

## Step 2: Wire Twilio Inbound Webhook

1. Twilio Console → Phone Numbers → Active Numbers → **(862) 315-3802**
2. Messaging → "A message comes in" → Webhook
3. Paste: `https://n8n-io-production-9f8e.up.railway.app/webhook/rs-sms-inbound`
4. Method: HTTP POST → Save

---

## Step 3: Test Each Workflow

| Workflow | How to Test | Expected Result |
|----------|-------------|-----------------|
| WF1 Welcome | Submit newsletter form on site | Brevo welcome email sent + workflow_log row |
| WF2 SMS Opt-in | Text START to (862) 315-3802 | Supabase sms_consent=true |
| WF3 SMS Opt-out | Text STOP to (862) 315-3802 | Supabase sms_consent=false |
| WF4 Wholesale | Submit wholesale form on site | Brevo alert email + SMS to (862) 315-3802 + log |
| WF5 Market Blast | Open n8n Form URL → fill fields | Twilio SMS sent to opted-in subscribers |
| WF6 Order SMS | Place test Shopify order | SMS to customer (needs Shopify cred first) |
| WF7 Email Blast | Manual trigger in n8n | Brevo email batch sent |

---

## Wholesale Alert SMS Recipient
Twilio alert SMS for WF4 goes to: **(862) 315-3802** (Collin's number)
`from`: +18448202063 (toll-free business number)

---

## Vercel Environment
`N8N_WEBHOOK_URL` = `https://n8n-io-production-9f8e.up.railway.app/webhook/rs-events` ✓ Set

---

## Stack Summary

| Tool | Purpose | Status |
|------|---------|--------|
| n8n (Railway) | All automation workflows | ✓ Live — 12/13 active |
| Brevo | Email sending | ✓ Working |
| Twilio | SMS sending/receiving | ✓ Sending works — inbound webhook pending |
| Supabase | Subscriber data + logs | ✓ Migrated + live |
| Shopify | Order webhooks | Pending credential |
| Blotato | Social posting | Pending MCP wiring |
