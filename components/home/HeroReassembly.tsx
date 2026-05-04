"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { ScrollReassembly } from "@/components/scroll/ScrollReassembly";

export function HeroReassembly() {
  return (
    <ScrollReassembly
      videoSrc="/videos/lineup-shot.mp4"
      framePattern="/frames/lineup-shot/f%03d.jpg"
      frameCount={60}
      scrollHeight="300vh"
      className="bg-[#1A1A1A]"
      mediaClassName="scale-[1.02] brightness-[1.12] contrast-[1.08] saturate-[1.06]"
      reverse={false}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/38 via-black/10 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-transparent to-black/12" />

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 w-full py-24">
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
                className="heading-hero text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
                variants={fadeInUp}
              >
                SEASON
              </motion.h1>
              <motion.h1
                className="heading-hero text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
                variants={fadeInUp}
              >
                WITH SOUL
              </motion.h1>
            </div>

            <motion.p
              className="text-lg md:text-xl text-white max-w-xl font-[family-name:var(--font-dm-sans)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
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
      </div>
    </ScrollReassembly>
  );
}
