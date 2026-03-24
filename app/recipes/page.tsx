"use client";

import { useState } from "react";
import * as motion from "framer-motion/client";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { recipes } from "@/lib/recipes";
import type { Recipe } from "@/lib/types";
import RecipeCardModal from "@/components/ui/RecipeCardModal";

type FilterKey = "ALL" | "SIMPLE SZN" | "SMOKEY CAJUN" | "GARLICKY" | "HOLY TRINITY";

function matchesFilter(recipe: Recipe, filter: FilterKey): boolean {
  if (filter === "ALL") return true;
  const map: Record<string, string> = {
    "SIMPLE SZN": "simple",
    "SMOKEY CAJUN": "cajun",
    GARLICKY: "garlicky",
    "HOLY TRINITY": "holy-trinity",
  };
  const target = map[filter];
  if (!target) return true;
  return recipe.blend.includes(target);
}

export default function RecipesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [modalTitle, setModalTitle] = useState("");

  const filtered = recipes.filter((r) => matchesFilter(r, activeFilter));

  function openModal(recipe: Recipe) {
    if (!recipe.hasRecipeCard || !recipe.recipeCards?.length) return;
    setModalImages(recipe.recipeCards);
    setModalTitle(recipe.title);
    setModalOpen(true);
  }

  return (
    <main className="w-full bg-[#e85c2a] min-h-screen">
      {/* Header */}
      <section className="py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="heading-hero text-white mb-4">SOUL KITCHEN</h1>
          <p className="font-[family-name:var(--font-dm-sans)] text-white/70 text-lg">
            Recipes to nourish your body and your soul.
          </p>
        </motion.div>
      </section>

      {/* Filter Pills */}
      <section className="flex flex-wrap justify-center gap-3 mb-12 px-6">
        {(["ALL", "SIMPLE SZN", "SMOKEY CAJUN", "GARLICKY", "HOLY TRINITY"] as FilterKey[]).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-6 py-2 text-sm font-bold uppercase tracking-wider transition-colors duration-200 ${
              activeFilter === filter
                ? "bg-white text-[#e85c2a]"
                : "bg-transparent text-white border border-white hover:bg-white/10"
            }`}
          >
            {filter}
          </button>
        ))}
      </section>

      {/* Recipe Grid */}
      <section className="pb-24 px-6 max-w-[1400px] mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="whileInView"
            key={activeFilter}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
          >
            {filtered.map((recipe) => {
              const clickable = !!recipe.hasRecipeCard;
              return (
                <motion.div
                  key={recipe.slug}
                  variants={fadeInUp}
                  className={`group rounded-[1.5rem] overflow-hidden flex flex-col ${
                    clickable ? "cursor-pointer" : "cursor-default"
                  }`}
                  whileHover={{ scale: clickable ? 1.03 : 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  onClick={() => openModal(recipe)}
                >
                  <div className="aspect-square w-full relative overflow-hidden">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* View Recipe badge */}
                    {clickable && (
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="bg-white text-[#e85c2a] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow font-[family-name:var(--font-dm-sans)]">
                          View Recipe
                        </span>
                      </div>
                    )}

                    {/* Info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <span className="bg-white/20 text-white rounded-full px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider inline-block mb-1.5 font-[family-name:var(--font-dm-sans)]">
                        {recipe.blendLabel}
                      </span>
                      <h3 className="font-[family-name:var(--font-dm-sans)] font-bold text-white text-sm md:text-base leading-tight">
                        {recipe.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center text-white/70 py-12">
            No recipes found for this filter.
          </div>
        )}
      </section>

      {/* Modal */}
      <RecipeCardModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        images={modalImages}
        title={modalTitle}
      />
    </main>
  );
}
