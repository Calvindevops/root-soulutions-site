import { NextResponse } from "next/server";
import { createCheckout } from "@/lib/shopify";

interface CheckoutItem {
  variant_id: string;
  quantity: number;
}

export async function POST(request: Request) {
  try {
    const { items } = (await request.json()) as { items: CheckoutItem[] };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    if (!process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
      // Fallback: redirect to Shopify store directly
      return NextResponse.json({
        url: `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}`,
      });
    }

    const cart = await createCheckout(
      items.map((item) => ({
        variantId: item.variant_id,
        quantity: item.quantity,
      }))
    );

    return NextResponse.json({ url: cart.checkoutUrl });
  } catch (err) {
    console.error("Shopify checkout error:", err);
    // Fallback to Shopify store
    return NextResponse.json({
      url: `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}`,
    });
  }
}
