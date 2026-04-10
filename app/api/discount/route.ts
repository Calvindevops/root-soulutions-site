import { NextResponse } from "next/server";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const adminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
const ADMIN_BASE = `https://${domain}/admin/api/2024-10`;

const PRICE_RULE_TITLE = "SOUL10_WELCOME_V2";

async function adminFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${ADMIN_BASE}${path}`, {
    ...options,
    headers: {
      "X-Shopify-Access-Token": adminToken!,
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  return res;
}

async function getOrCreatePriceRule(): Promise<string> {
  // Always look up by title — serverless functions can't rely on module-level cache
  const listRes = await adminFetch("/price_rules.json?limit=50");
  if (listRes.ok) {
    const { price_rules } = await listRes.json();
    const existing = price_rules.find(
      (r: { title: string }) => r.title === PRICE_RULE_TITLE
    );
    if (existing) return existing.id.toString();
  }

  // Create price rule: 10% off, once per customer, unlimited total uses
  const createRes = await adminFetch("/price_rules.json", {
    method: "POST",
    body: JSON.stringify({
      price_rule: {
        title: PRICE_RULE_TITLE,
        target_type: "line_item",
        target_selection: "all",
        allocation_method: "across",
        value_type: "percentage",
        value: "-10.0",
        customer_selection: "all",
        once_per_customer: true, // One use per customer email
        usage_limit: null,       // Unlimited total — each code is unique and single-use
        starts_at: new Date().toISOString(),
      },
    }),
  });

  if (!createRes.ok) {
    const body = await createRes.text();
    throw new Error(`Failed to create price rule: ${createRes.status} ${body}`);
  }

  const { price_rule } = await createRes.json();
  return price_rule.id.toString();
}

function generateUniqueCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 6; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `SOUL10-${suffix}`;
}

export async function POST(request: Request) {
  if (!adminToken || !domain) {
    return NextResponse.json(
      { error: "Shopify Admin API not configured" },
      { status: 500 }
    );
  }

  try {
    const { email } = (await request.json()) as { email?: string };
    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const priceRuleId = await getOrCreatePriceRule();
    const code = generateUniqueCode();

    // Create unique discount code under the price rule
    const res = await adminFetch(
      `/price_rules/${priceRuleId}/discount_codes.json`,
      {
        method: "POST",
        body: JSON.stringify({
          discount_code: { code },
        }),
      }
    );

    if (!res.ok) {
      const body = await res.text();
      console.error("Failed to create discount code:", body);
      // Fallback to static code
      return NextResponse.json({ code: "SOUL10", fallback: true });
    }

    return NextResponse.json({ code, fallback: false });
  } catch (err) {
    console.error("Discount code error:", err);
    // Fallback to static code so user still gets something
    return NextResponse.json({ code: "SOUL10", fallback: true });
  }
}
