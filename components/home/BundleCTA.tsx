"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useProducts } from "@/lib/use-products";
import { useCart } from "@/lib/cart-context";
import { slideInRight, fadeInUp, staggerContainer } from "@/lib/animations";

export function BundleCTA() {
  const { products, loading } = useProducts();
  const { addToCart } = useCart();

  const starterKit = products.find(p => p.handle === "soulutions-starter-kit");

  if (loading) {
    return (
      <section className="bg-[#2D5A27] py-24 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 animate-pulse">
          <div className="md:grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-4">
              <div className="h-10 bg-white/10 rounded w-2/3" />
              <div className="h-6 bg-white/10 rounded w-full" />
              <div className="h-12 bg-white/10 rounded-full w-48 mt-4" />
            </div>
            <div className="w-full max-w-[500px] aspect-square rounded-[2rem] bg-white/10 mt-12 md:mt-0" />
          </div>
        </div>
      </section>
    );
  }

  if (!starterKit) return null;


  return (
    <section className="bg-[#2D5A27] py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="md:grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="flex flex-col items-start gap-6 z-10"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2 className="heading-section text-[#F5C542]" variants={fadeInUp}>
              THE SOULUTION STARTER KIT
            </motion.h2>

            <motion.p className="text-white/70 text-lg font-[family-name:var(--font-dm-sans)]" variants={fadeInUp}>
              Get all three Root Soulutions blends in one bundle. The complete toolkit for seasoning your whole kitchen with SOUL.
            </motion.p>

            <motion.div className="flex items-center gap-4 mt-2" variants={fadeInUp}>
              <span className="text-white text-4xl font-bold">${starterKit.price.toFixed(2)}</span>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-4 w-full md:w-auto">
              <button
                onClick={() => addToCart(starterKit, 1)}
                className="w-full md:w-auto bg-[#e85c2a] text-white rounded-full px-12 py-4 btn-text hover:scale-105 hover:brightness-110 transition-all shadow-lg shadow-[#e85c2a]/30"
              >
                ADD TO CART
              </button>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="w-full flex justify-center mt-12 md:mt-0"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideInRight}
          >
            <div className="w-full max-w-[500px] aspect-square rounded-[2rem] relative overflow-hidden shadow-2xl">
              <Image
                src={starterKit.images[0] || "/products/lineup-all-3-bottles-graffiti-1.png"}
                alt="Soulutions Starter Kit — all 3 seasoning blends"
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
