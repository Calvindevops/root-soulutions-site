"use client";

import { useCart } from "@/lib/cart-context";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash } from "@phosphor-icons/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function CartDrawer() {
  const router = useRouter();
  const { isOpen, closeCart, items, subtotal, updateQuantity, removeFromCart } = useCart();
  const progressToFreeShipping = Math.min((subtotal / 50) * 100, 100);
  const amountToFreeShipping = Math.max(50 - subtotal, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#2D5A27] text-white z-[60] flex flex-col shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl tracking-wider">YOUR CART</h2>
              <button onClick={closeCart} aria-label="Close Cart" className="hover:opacity-80 transition flex items-center">
                <X size={24} weight="regular" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-6">
                  <p className="font-[family-name:var(--font-dm-sans)] text-lg">Your cart is empty</p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="bg-[#e85c2a] text-white rounded-full px-8 py-3 font-[family-name:var(--font-bebas)] text-xl tracking-wider hover:opacity-90 transition"
                  >
                    SHOP NOW
                  </Link>
                </div>
              ) : (
                <>
                  {/* Progress Bar */}
                  <div className="flex flex-col gap-2">
                    <p className="font-[family-name:var(--font-dm-sans)] text-sm text-center">
                      {amountToFreeShipping > 0
                        ? `You're $${amountToFreeShipping.toFixed(2)} away from free shipping!`
                        : "You've unlocked free shipping!"}
                    </p>
                    <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#F5C542] h-full transition-all duration-500"
                        style={{ width: `${progressToFreeShipping}%` }}
                      />
                    </div>
                  </div>

                  {/* Items */}
                  <div className="flex flex-col gap-6 mt-4">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-4 items-center">
                        <div className="w-20 h-20 bg-black/20 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.product.images[0]} alt={item.product.title} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-[family-name:var(--font-dm-sans)] font-bold">{item.product.title}</h3>
                            <button onClick={() => removeFromCart(item.product.id)} className="text-white/50 hover:text-white transition flex items-center justify-center min-w-[44px] min-h-[44px]">
                              <Trash size={22} weight="regular" />
                            </button>
                          </div>
                          <p className="font-[family-name:var(--font-dm-sans)] text-white/80">${item.product.price.toFixed(2)}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-3 border border-white/20 rounded-full px-4 py-2">
                              <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="hover:opacity-80 flex items-center justify-center min-w-[44px] min-h-[44px] -my-2 -ml-2">
                                <Minus size={18} weight="regular" />
                              </button>
                              <span className="font-[family-name:var(--font-dm-sans)] text-sm w-4 text-center">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="hover:opacity-80 flex items-center justify-center min-w-[44px] min-h-[44px] -my-2 -mr-2">
                                <Plus size={18} weight="regular" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#1A3A15]/50 flex flex-col gap-4">
                <div className="flex justify-between items-center font-[family-name:var(--font-dm-sans)] font-bold text-lg">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <p className="font-[family-name:var(--font-dm-sans)] text-xs text-white/70 text-center">
                  Shipping & taxes calculated at checkout
                </p>
                {/* Free shipping celebration */}
                {amountToFreeShipping === 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center text-[#F5C542] text-sm font-bold font-[family-name:var(--font-dm-sans)] uppercase tracking-wider"
                  >
                    FREE SHIPPING UNLOCKED!
                  </motion.div>
                )}
                <button
                  onClick={() => { closeCart(); router.push("/checkout"); }}
                  className="w-full bg-[#e85c2a] text-white rounded-full py-4 font-[family-name:var(--font-bebas)] text-xl tracking-wider hover:scale-105 hover:brightness-110 transition-all shadow-lg shadow-[#e85c2a]/30"
                >
                  CHECKOUT
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}