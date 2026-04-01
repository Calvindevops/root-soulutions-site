import { NextResponse } from "next/server";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const adminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
const ADMIN_BASE = `https://${domain}/admin/api/2024-10`;

// Cache the price rule ID so we only create it once
let cachedPriceRuleId = "";

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
  if (cachedPriceRuleId !== "") return cachedPriceRuleId;

  // Check if our price rule already exists
  const listRes = await adminFetch("/price_rules.json?limit=50");
  if (listRes.ok) {
    const { price_rules } = await listRes.json();
    const existing = price_rules.find(
      (r: { title: string }) => r.title === "SOUL10_WELCOME"
    );
    if (existing) {
      cachedPriceRuleId = existing.id.toString();
      return cachedPriceRuleId;
    }
  }

  // Create the price rule: 10% off, one use per customer
  const createRes = await adminFetch("/price_rules.json", {
    method: "POST",
    body: JSON.stringify({
      price_rule: {
        title: "SOUL10_WELCOME",
        target_type: "line_item",
        target_selection: "all",
        allocation_method: "across",
        value_type: "percentage",
        value: "-10.0",
        customer_selection: "all",
        usage_limit: 1, // Each unique code can only be used once
        starts_at: new Date().toISOString(),
      },
    }),
  });

  if (!createRes.ok) {
    const body = await createRes.text();
    throw new Error(`Failed to create price rule: ${createRes.status} ${body}`);
  }

  const { price_rule } = await createRes.json();
  cachedPriceRuleId = price_rule.id.toString();
  return cachedPriceRuleId;
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
