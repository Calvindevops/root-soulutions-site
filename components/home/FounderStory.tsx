"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { slideInLeft, fadeInUp, staggerContainer } from "@/lib/animations";

export function FounderStory() {
  return (
    <section className="bg-[#6B3FA0] py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="md:grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Photo */}
          <motion.div
            className="w-full max-w-[400px] aspect-[3/4] mx-auto md:mx-0 rounded-[2rem] overflow-hidden -rotate-2 mb-12 md:mb-0 relative shadow-2xl"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideInLeft}
          >
            <Image
              src="/brand/founder-collin.png"
              alt="Collin Alexander, founder of Root Soulutions"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </motion.div>

          {/* Right: Story */}
          <motion.div
            className="flex flex-col gap-6"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2 className="heading-section text-white" variants={fadeInUp}>
              HEY, I&apos;M COLLIN.
            </motion.h2>

            <div className="flex flex-col gap-4 text-white/80 text-lg leading-relaxed font-[family-name:var(--font-dm-sans)]">
              <motion.p variants={fadeInUp}>
                At twelve years old, I found myself standing in my great-grandmother&apos;s kitchen, administering insulin to her tiny arm before school. Four years later, I was doing the same thing — except this time, it was my own arm.
              </motion.p>
              <motion.p variants={fadeInUp}>
                Type 2 diabetes entered my life fast, loud, and uninvited. But instead of letting it define me, I let it redirect me.
              </motion.p>
              <motion.p variants={fadeInUp}>
                I dove into food science, cultural foodways, and the hard truths about how our communities are fed. Root Soulutions was born from that journey — a POC-owned, wellness-forward flavor brand built from lived experience.
              </motion.p>
            </div>

            <motion.div variants={fadeInUp} className="mt-4">
              <Link href="/about" className="text-[#F5C542] underline font-bold uppercase tracking-wider text-sm hover:text-white transition-colors">
                OUR FULL STORY →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}