import React from "react";
import Image from "next/image";
import * as motion from "framer-motion/client";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/animations";
import { ScrollingMarquee } from "@/components/home/ScrollingMarquee";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="w-full">
      {/* Header — matches /wholesale + /recipes spacing; logo in nav reads "Root Soulutions / STORY" */}
      <section className="relative bg-[#2D5A27] pt-32 pb-20 px-6 text-center overflow-hidden">
        <Image src="/brand/chili-pepper.png" alt="" width={50} height={50} className="absolute top-4 left-[8%] opacity-15 rotate-12 hidden md:block" />
        <Image src="/brand/beetroot-small.png" alt="" width={40} height={40} className="absolute bottom-4 right-[10%] opacity-15 -rotate-6 hidden md:block" />
        <motion.div
          variants={fadeIn}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          <h1 className="heading-hero text-white">STORY</h1>
        </motion.div>
      </section>

      {/* Founder Story */}
      <section className="bg-[#2D5A27] py-16 px-6">
        <div className="max-w-[1200px] mx-auto md:grid md:grid-cols-5 gap-12 items-start">
          {/* Photo */}
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="md:col-span-2 mb-12 md:mb-0"
          >
            <div className="w-full max-w-[380px] aspect-[3/4] mx-auto rounded-[2rem] overflow-hidden -rotate-2 shadow-2xl relative">
              <Image
                src="/brand/founder-collin.webp"
                alt="Collin Alexander, founder of Root Soulutions"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 380px"
              />
            </div>
          </motion.div>

          {/* Story */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="md:col-span-3"
          >
            <motion.h2 variants={fadeInUp} className="heading-section text-white mb-10 text-center md:text-left">
              HI, MY NAME IS COLLIN ALEXANDER.
            </motion.h2>
            <div className="font-[family-name:var(--font-dm-sans)] text-white/80 text-lg leading-relaxed space-y-6">
              <motion.p variants={fadeInUp}>
                — and this is how giving myself six insulin shots a day at sixteen accidentally led me to create a whole health-foods brand.
              </motion.p>
              <motion.p variants={fadeInUp}>
                My story actually starts earlier than that. At twelve years old, I found myself standing in my great-grandmother&apos;s kitchen, administering insulin to her tiny arm before school. Four years later, I was doing the same thing — except this time, it was my own arm. Type 2 diabetes had entered my life fast, loud, and uninvited.
              </motion.p>
              <motion.p variants={fadeInUp}>
                But here&apos;s the plot twist: Instead of letting diabetes define me, I let it redirect me.
              </motion.p>
              <motion.p variants={fadeInUp}>
                I dove into research, food science, cultural foodways, and the hard truths about how our communities — especially marginalized communities — are fed, taught, and treated. I learned that most of what we eat is processed, stripped, dyed, and chemically engineered.
              </motion.p>
              <motion.p variants={fadeInUp}>
                So I made a choice: If the solutions didn&apos;t exist, I&apos;d build them.
              </motion.p>
              <motion.p variants={fadeInUp}>
                That&apos;s how Root Soulutions was born — a POC-owned, wellness-forward flavor brand built from my lived experience, my healing, and my culture.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee — breaker between story and SOUL philosophy */}
      <ScrollingMarquee
        text="CRAFTED WITH SOUL • ROOTED IN PURPOSE"
        bgColor="#e85c2a"
        textColor="white"
      />

      {/* SOUL Philosophy */}
      <section className="bg-[#6B3FA0] py-24 px-6">
        <div className="max-w-[800px] mx-auto">
          <motion.h2
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="heading-section text-white text-center mb-16"
          >
            CRAFTED WITH SOUL
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {[
              {
                title: "S — SIMPLICITY",
                desc: "Pure ingredients. Clean labels. No complexity."
              },
              {
                title: "O — ORGANIC ALIGNMENT",
                desc: "Whole-food herbs and spices only."
              },
              {
                title: "U — UNCOMPROMISED QUALITY",
                desc: "Small-batch. No fillers. No shortcuts."
              },
              {
                title: "L — LIFESTYLE-FORWARD FLAVOR",
                desc: "Seasoning that nourishes your whole life."
              }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-[#FFF8F0] rounded-[2rem] p-8"
              >
                <h3 className="heading-card text-[#6B3FA0] mb-4">{card.title}</h3>
                <p className="font-[family-name:var(--font-dm-sans)] text-[#1A1A1A]/70 text-lg">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Craft Eatery — Parent Brand */}
      <section className="bg-[#1A1A1A] py-20 px-6">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="max-w-[900px] mx-auto flex flex-col md:flex-row items-center gap-8"
        >
          <motion.div variants={fadeInUp} className="flex-shrink-0">
            <Image
              src="/brand/craft-eatery-logo.png"
              alt="Craft Eatery"
              width={120}
              height={100}
              className="opacity-90"
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <p className="font-[family-name:var(--font-dm-sans)] text-white/70 text-lg leading-relaxed">
              Root Soulutions is part of <span className="text-white font-bold">Craft Eatery</span> — Collin&apos;s broader food and catering company rooted in Jersey City. From seasoning blends to full catering spreads, Craft Eatery brings soulful, health-conscious cooking to every table.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Clean Label Badges */}
      <section className="bg-[#FFF8F0] py-16 px-6">
        <div className="max-w-[1000px] mx-auto text-center">
          <motion.h2
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="heading-section text-[#2D5A27] mb-8"
          >
            WHAT WE VALUE
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {["Low Sodium", "Chemical-Free", "Preservative-Free", "Gluten-Free", "Whole-Food Based", "Wellness-Aligned"].map((badge, idx) => (
              <motion.span
                key={idx}
                variants={fadeInUp}
                className="bg-[#2D5A27] text-white rounded-full px-6 py-3 font-[family-name:var(--font-dm-sans)] font-bold uppercase text-sm tracking-wider"
              >
                {badge}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1A1A1A] py-24 px-6 text-center">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          <h2 className="heading-section text-[#F5C542]">TASTE THE SOULUTION</h2>
          <Link
            href="/shop"
            className="bg-[#e85c2a] text-white rounded-full px-12 py-4 btn-text inline-block mt-8 hover:scale-105 hover:brightness-110 transition-all shadow-lg shadow-[#e85c2a]/30"
          >
            SHOP ROOT SOULUTIONS
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
