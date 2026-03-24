import { NextResponse } from "next/server";

// Stripe webhook deprecated — orders now handled by Shopify
// This route is kept as a placeholder to prevent 404s
export async function POST() {
  return NextResponse.json({ received: true, provider: "shopify" });
}
