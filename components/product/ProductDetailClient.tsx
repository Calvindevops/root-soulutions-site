"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, CaretDown } from "@phosphor-icons/react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/types";

interface Props {
  product: Product;
}

export function ProductDetailClient({ product }: Props) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [openTab, setOpenTab] = useState<string | null>(null);

  const toggleTab = (tab: string) => {
    setOpenTab(openTab === tab ? null : tab);
  };

  const tabs = [
    {
      id: "ingredients",
      label: "INGREDIENTS",
      content: product.ingredients?.join(", ") || "N/A"
    },
    {
      id: "wellness",
      label: "WELLNESS NOTES",
      content: (
        <ul className="list-disc pl-5 space-y-1">
          {product.wellness_notes?.map((note, idx) => (
            <li key={idx}>{note}</li>
          )) || <li>N/A</li>}
        </ul>
      )
    },
    {
      id: "shipping",
      label: "SHIPPING INFO",
      content: "Ships within 48-72 hours. Free shipping on orders over $50. Continental US only."
    }
  ];

  return (
    <>
      <div className="flex items-center gap-4 mt-8">
        <button 
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <Minus size={16} weight="bold" />
        </button>
        <span className="text-white text-xl font-bold w-8 text-center">{quantity}</span>
        <button 
          onClick={() => setQuantity(quantity + 1)}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <Plus size={16} weight="bold" />
        </button>
      </div>

      <button 
        onClick={() => addToCart(product, quantity)}
        className="w-full mt-6 bg-[#e85c2a] text-white rounded-full py-4 btn-text hover:brightness-110 transition"
      >
        ADD TO CART
      </button>

      <div className="mt-12 space-y-2">
        {tabs.map((tab) => (
          <div key={tab.id} className="border-b border-white/10 py-4">
            <button 
              onClick={() => toggleTab(tab.id)}
              className="w-full flex justify-between items-center text-left"
            >
              <span className="font-bold text-white uppercase">
                {tab.label}
              </span>
              <motion.div
                animate={{ rotate: openTab === tab.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-white/70"
              >
                <CaretDown size={20} weight="bold" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openTab === tab.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 text-white/70">
                    {tab.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </>
  );
}