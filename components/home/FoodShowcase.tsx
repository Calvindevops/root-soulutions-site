"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import { fadeInUp } from "@/lib/animations";
import { recipes } from "@/lib/recipes";

// Only non-recipe-card foods
const showcaseFoods = recipes.filter((r) => !r.hasRecipeCard);

export function FoodShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -400 : 400;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="bg-[#1A1A1A] py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-12"
        >
          <h2 className="heading-section text-white text-center mb-4">
            MADE WITH SOUL
          </h2>
          <p className="text-white/70 text-center text-lg max-w-2xl mx-auto font-[family-name:var(--font-dm-sans)]">
            Real dishes made with Root Soulutions seasonings. Every plate tells a story.
          </p>
        </motion.div>
      </div>

      {/* Full-width scroll container */}
      <div className="relative">
        {/* Scroll arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors backdrop-blur-sm"
          aria-label="Scroll left"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors backdrop-blur-sm"
          aria-label="Scroll right"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide px-6 snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {showcaseFoods.map((food) => (
            <motion.div
              key={food.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4 }}
              className="flex-none w-[320px] md:w-[380px] snap-center group"
            >
              <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-lg">
                <Image
                  src={food.image}
                  alt={food.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="380px"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-bold text-lg font-[family-name:var(--font-dm-sans)] mb-1">
                    {food.title}
                  </h3>
                  <span className="bg-white/20 backdrop-blur-sm text-white rounded-full px-3 py-1 text-xs uppercase font-bold tracking-wider">
                    {food.blendLabel}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
