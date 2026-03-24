"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { recipes } from "@/lib/recipes";

// Only recipes that have actual recipe cards
const recipeCardRecipes = recipes.filter((r) => r.hasRecipeCard).slice(0, 6);

export function RecipePreview() {
  return (
    <section className="bg-[#FFF8F0] py-24">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="heading-section text-[#2D5A27] text-center mb-4">SOUL KITCHEN</h2>
          <p className="text-[#1A1A1A]/60 text-center mb-16 text-lg max-w-2xl mx-auto font-[family-name:var(--font-dm-sans)]">
            Full recipes with step-by-step cards, powered by Root Soulutions blends.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {recipeCardRecipes.map((recipe) => (
            <motion.div
              key={recipe.slug}
              variants={fadeInUp}
              className="group cursor-pointer hover:scale-[1.02] transition-transform duration-300 rounded-[1.5rem] overflow-hidden flex flex-col shadow-md"
            >
              <div className="aspect-video w-full relative overflow-hidden">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="p-4 bg-white flex-1 flex flex-col gap-3">
                <h3 className="font-[family-name:var(--font-dm-sans)] font-bold text-[#1A1A1A] text-lg leading-tight">
                  {recipe.title}
                </h3>
                <div className="mt-auto">
                  <span className="bg-[#2D5A27] text-white rounded-full px-3 py-1 text-xs uppercase font-bold tracking-wider inline-block">
                    {recipe.blendLabel}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Link href="/recipes" className="bg-[#e85c2a] text-white rounded-full px-12 py-4 btn-text inline-block hover:scale-105 hover:brightness-110 transition-all shadow-lg shadow-[#e85c2a]/30">
            VIEW ALL RECIPES
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
