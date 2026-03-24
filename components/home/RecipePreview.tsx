"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { recipes } from "@/lib/recipes";

// Curated 6 best food photos for homepage
const FEATURED_SLUGS = [
  "cajun-fried-chicken-poboys",
  "creamy-salmon-lasagna-rollups",
  "crawfish-deviled-eggs-on-kale",
  "jerk-chicken-rasta-pasta",
  "naan-bowl-crispy-chickpeas",
  "lump-cornbread-crabcakes",
];

const featuredRecipes = FEATURED_SLUGS.map(
  (slug) => recipes.find((r) => r.slug === slug)!
).filter(Boolean);

export function RecipePreview() {
  return (
    <section className="bg-[#e85c2a] py-24">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="heading-section text-white text-center mb-4">SOUL KITCHEN</h2>
          <p className="text-white/70 text-center mb-16 text-lg max-w-2xl mx-auto font-[family-name:var(--font-dm-sans)]">
            Recipes that nourish, powered by Root Soulutions blends.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {featuredRecipes.map((recipe) => (
            <motion.div
              key={recipe.slug}
              variants={fadeInUp}
              className="group cursor-pointer hover:scale-[1.02] transition-transform duration-300 bg-black/5 rounded-[1.5rem] overflow-hidden flex flex-col"
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

              <div className="p-4 bg-white/10 flex-1 flex flex-col gap-3">
                <h3 className="font-[family-name:var(--font-dm-sans)] font-bold text-white text-lg leading-tight">
                  {recipe.title}
                </h3>
                <div className="mt-auto">
                  <span className="bg-white/20 text-white rounded-full px-3 py-1 text-xs uppercase font-bold tracking-wider inline-block">
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
          <Link href="/recipes" className="text-white font-bold uppercase tracking-wider text-sm hover:text-white/80 transition-colors underline">
            VIEW ALL RECIPES →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
