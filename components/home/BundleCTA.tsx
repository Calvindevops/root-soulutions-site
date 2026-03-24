"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { products } from "@/lib/products";
import { slideInRight, fadeInUp, staggerContainer } from "@/lib/animations";

export function BundleCTA() {
  const { addToCart } = useCart();
  
  // Find starter kit
  const starterKit = products.find(p => p.handle === "soulution-starter-kit");

  return (
    <section className="bg-[#1A1A1A] py-24 overflow-hidden">
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
              <span className="text-white text-4xl font-bold">$34.99</span>
              <span className="line-through text-white/40 text-xl">$38.97</span>
              <span className="bg-[#e85c2a] text-white rounded-full px-4 py-1 text-sm font-bold tracking-wide">
                SAVE 10%
              </span>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="mt-4 w-full md:w-auto">
              <button 
                onClick={() => starterKit && addToCart(starterKit)}
                className="w-full md:w-auto bg-[#e85c2a] hover:bg-[#d44c1f] text-white rounded-full px-12 py-4 btn-text transition-colors"
              >
                ADD BUNDLE TO CART
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
                src="/products/lineup-all-3-bottles-graffiti-1.png"
                alt="All 3 Root Soulutions seasoning bottles held against graffiti wall"
                fill
                className="object-cover scale-[1.8]"
                style={{ objectPosition: "50% 85%" }}
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}