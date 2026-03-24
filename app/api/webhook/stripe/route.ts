import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServerClient } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const supabase = createServerClient();

    const items = JSON.parse(session.metadata?.items || "[]");
    const shipping = (session as unknown as { shipping_details?: { address?: unknown } }).shipping_details;

    // Create order
    await supabase.from("orders").insert({
      customer_name: session.customer_details?.name || "Unknown",
      customer_email: session.customer_details?.email || "",
      customer_phone: session.customer_details?.phone || null,
      stripe_session_id: session.id,
      stripe_payment_intent:
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : null,
      status: "paid",
      subtotal: (session.amount_subtotal || 0) / 100,
      shipping: 0,
      total: (session.amount_total || 0) / 100,
      shipping_address: shipping?.address || null,
      items,
    });

    // Upsert customer
    const email = session.customer_details?.email;
    if (email) {
      const { data: existing } = await supabase
        .from("customers")
        .select("id, total_orders, total_spent")
        .eq("email", email)
        .single();

      if (existing) {
        await supabase
          .from("customers")
          .update({
            total_orders: existing.total_orders + 1,
            total_spent:
              existing.total_spent + (session.amount_total || 0) / 100,
          })
          .eq("id", existing.id);
      } else {
        await supabase.from("customers").insert({
          name: session.customer_details?.name || "Unknown",
          email,
          phone: session.customer_details?.phone || null,
          total_orders: 1,
          total_spent: (session.amount_total || 0) / 100,
          source: "website",
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
