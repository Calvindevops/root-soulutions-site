import { NextResponse } from "next/server";
import { createCheckout } from "@/lib/shopify";

interface CheckoutItem {
  variantId: string;
  quantity: number;
}

export async function POST(request: Request) {
  try {
    const { items } = (await request.json()) as { items: CheckoutItem[] };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const cart = await createCheckout(
      items.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
      }))
    );

    return NextResponse.json({ checkoutUrl: cart.checkoutUrl });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
