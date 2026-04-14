@AGENTS.md

# Root Soulutions Site — App Context

## App Identity
**Root Soulutions** — Real estate investing platform (HMHW: Hit My Home Work criteria).
Root: `apps/root-soulutions-site/`
Deploy: Vercel (always deploy from `apps/root-soulutions-site/` — NOT monorepo root)

## Stack
- **Frontend:** Next.js (App Router), Tailwind, Framer Motion
- **Backend:** Supabase (auth, db, Edge Functions)
- **Automation:** n8n (Railway) — webhook-driven lead/email workflows
- **Email:** Brevo (transactional), OneDrive Excel (lead data source)
- **Design:** See `DESIGN.md` (Vercel design system)

## n8n Workflows (Railway-hosted)
Webhook base: `https://n8n-io-production-9f8e.up.railway.app`

| Workflow | ID | Trigger | Purpose |
|----------|----|---------|---------|
| Email blast | WF7 | Manual/webhook | Send branded emails to leads |
| Lead intake | - | Form submit | Capture + route new leads |
| Follow-up | - | Cron | Scheduled drip sequences |

**WF7 Email Template** — standard for all future clients:
- 600px table layout
- Brand header + logo at top
- 3 content paragraphs
- CTA button + nav links in same cell at bottom
- Brevo SMTP delivery

## HMHW Criteria (Deal Filter)
**ONLY consider properties meeting ALL:**
- Cashflow: $250-$300+/mo net
- Mortgage: sub-5% fixed rate (subject-to or seller finance)
- Property value: $120K+
- Avoid states: OH, IL, KY, SC, NE, OK

Data source: PropStream (lead data)
Strategy: Subject-to mortgage takeover, creative finance, Section 8

## Claude AI Agents (via n8n)
- Intake agent — qualifies incoming leads
- Reactivation agent — re-engages cold leads
- Lead scoring — ranks based on HMHW criteria

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
