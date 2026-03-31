"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, CaretDown, Truck } from "@phosphor-icons/react";
import { useCart } from "@/lib/cart-context";
import { ShopifyBuyButton, hasBuyButton } from "./ShopifyBuyButton";
import type { Product } from "@/lib/types";

interface Props {
  product: Product;
}

export function ProductDetailClient({ product }: Props) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showShipping, setShowShipping] = useState(false);

  return (
    <>
      {/* Quantity Selector */}
      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <Minus size={16} weight="bold" />
        </button>
        <span className="text-white text-xl font-bold w-8 text-center">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <Plus size={16} weight="bold" />
        </button>
      </div>

      {/* Shopify Buy Button — checkout via ahgadf-je store */}
      {hasBuyButton(product.handle) ? (
        <ShopifyBuyButton productHandle={product.handle} />
      ) : (
        <button
          onClick={() => addToCart(product, quantity)}
          className="w-full mt-6 bg-[#e85c2a] text-white rounded-full py-4 btn-text hover:scale-105 hover:brightness-110 transition-all shadow-lg shadow-[#e85c2a]/30"
        >
          ADD TO CART
        </button>
      )}

      {/* Shipping Info Toggle */}
      <div className="mt-8 border-t border-white/10 pt-4">
        <button
          onClick={() => setShowShipping(!showShipping)}
          className="w-full flex justify-between items-center text-left"
        >
          <div className="flex items-center gap-2">
            <Truck size={18} weight="bold" className="text-white/70" />
            <span className="font-bold text-white uppercase text-sm tracking-wider">
              SHIPPING INFO
            </span>
          </div>
          <motion.div
            animate={{ rotate: showShipping ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-white/70"
          >
            <CaretDown size={20} weight="bold" />
          </motion.div>
        </button>
        <AnimatePresence>
          {showShipping && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="pt-4 text-white/70 font-[family-name:var(--font-dm-sans)] text-sm leading-relaxed">
                Ships within 48-72 hours. Free shipping on orders over $50. Continental US only.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
