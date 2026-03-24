"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export function HeroBanner() {
  return (
    <section className="relative min-h-[80vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Full-bleed background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/products/lineup-jars-2.png')" }}
      />
      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
      {/* Subtle green tint overlay */}
      <div className="absolute inset-0 bg-[#2D5A27]/30 mix-blend-multiply" />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full py-24">
        <motion.div
          className="max-w-2xl flex flex-col items-start gap-8"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            initial: {},
            whileInView: { transition: { staggerChildren: 0.2 } },
          }}
        >
          <div className="flex flex-col">
            <motion.h1
              className="heading-hero text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              variants={fadeInUp}
            >
              SEASON
            </motion.h1>
            <motion.h1
              className="heading-hero text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              variants={fadeInUp}
            >
              WITH SOUL
            </motion.h1>
          </div>

          <motion.p
            className="text-lg md:text-xl text-white/90 max-w-xl font-[family-name:var(--font-dm-sans)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
            variants={fadeInUp}
          >
            Whole-food, low-sodium seasoning blends crafted from pure herbs and
            spices. No chemicals. No fillers. No shortcuts. Just honest flavor
            that nourishes.
          </motion.p>

          <motion.div variants={fadeInUp}>
            <Link
              href="/shop"
              className="bg-[#e85c2a] text-white rounded-full px-12 py-4 btn-text inline-block hover:scale-105 hover:brightness-110 transition-all shadow-lg shadow-[#e85c2a]/30"
            >
              SHOP NOW
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
