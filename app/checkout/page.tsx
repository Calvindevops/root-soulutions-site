"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    if (items.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            variant_id: item.product.shopify_variant_id ?? item.product.id,
            quantity: item.quantity,
          })),
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Failed to connect. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen relative flex items-center justify-center py-16 px-4"
      style={{
        backgroundImage: "url(/brand/checkout-bg.jpg)",
        backgroundRepeat: "repeat",
        backgroundSize: "340px auto",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/72 pointer-events-none" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg bg-[#1A2E14] rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#2D5A27] px-8 py-6 flex items-center gap-4">
          <Image
            src="/brand/rs-logo-text.png"
            alt="Root Soulutions"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
          <div className="flex-1 text-right">
            <p className="font-[family-name:var(--font-bebas)] text-[#F5C542] text-xl tracking-widest uppercase">
              Order Review
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="px-8 py-12 text-center flex flex-col items-center gap-6">
            <p className="text-white/70 font-[family-name:var(--font-dm-sans)] text-lg">
              Your cart is empty.
            </p>
            <Link
              href="/shop"
              className="bg-[#e85c2a] text-white rounded-full px-8 py-3 font-[family-name:var(--font-bebas)] text-xl tracking-wider hover:brightness-110 transition-all"
            >
              SHOP NOW
            </Link>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="px-8 py-6 flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-black/30 flex-shrink-0 overflow-hidden flex items-center justify-center p-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-[family-name:var(--font-dm-sans)] font-bold text-white text-sm">
                      {item.product.title}
                    </p>
                    <p className="font-[family-name:var(--font-dm-sans)] text-white/60 text-xs mt-0.5">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-[family-name:var(--font-dm-sans)] font-bold text-white text-sm">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="mx-8 border-t border-white/10" />

            {/* Subtotal */}
            <div className="px-8 py-5 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="font-[family-name:var(--font-dm-sans)] text-white/70 text-sm">
                  Subtotal
                </span>
                <span className="font-[family-name:var(--font-dm-sans)] font-bold text-white text-lg">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <p className="font-[family-name:var(--font-dm-sans)] text-white/50 text-xs text-center">
                Shipping &amp; taxes calculated at checkout
              </p>
            </div>

            {/* Error */}
            {error && (
              <p className="px-8 pb-2 text-center text-red-400 font-[family-name:var(--font-dm-sans)] text-sm">
                {error}
              </p>
            )}

            {/* CTA */}
            <div className="px-8 pb-8 flex flex-col gap-3">
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-[#e85c2a] text-white rounded-full py-4 font-[family-name:var(--font-bebas)] text-xl tracking-wider hover:scale-105 hover:brightness-110 transition-all shadow-lg shadow-[#e85c2a]/30 disabled:opacity-60 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {loading ? "LOADING..." : "COMPLETE PURCHASE →"}
              </button>
              <button
                onClick={() => router.back()}
                className="w-full text-white/50 font-[family-name:var(--font-dm-sans)] text-sm text-center hover:text-white/80 transition-colors py-2"
              >
                ← Back to cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
