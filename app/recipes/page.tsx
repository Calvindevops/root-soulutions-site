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

  const filtered = recipes.filter((r) => r.hasRecipeCard && matchesFilter(r, activeFilter));

  function openModal(recipe: Recipe) {
    if (!recipe.hasRecipeCard || !recipe.recipeCards?.length) return;
    setModalImages(recipe.recipeCards);
    setModalTitle(recipe.title);
    setModalOpen(true);
  }

  return (
    <main className="w-full min-h-screen">
      {/* Header */}
      <section className="relative bg-[#1A1A1A] py-24 px-6 text-center overflow-hidden">
        <Image src="/brand/chili-pepper.png" alt="" width={80} height={80} className="absolute top-10 left-[8%] opacity-15 rotate-12 hidden md:block" />
        <Image src="/brand/garlic-illustration.png" alt="" width={70} height={70} className="absolute bottom-10 right-[10%] opacity-15 -rotate-6 hidden md:block" />
        <Image src="/brand/onion-turmeric-illustration.png" alt="" width={100} height={100} className="absolute top-16 right-[20%] opacity-10 rotate-12 hidden lg:block" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="heading-hero text-white mb-4">SOUL KITCHEN</h1>
          <p className="font-[family-name:var(--font-dm-sans)] text-white/60 text-lg">
            Recipes to nourish your body and your soul.
          </p>
        </motion.div>
      </section>

      {/* Filter + Grid */}
      <section className="bg-[#FFF8F0] py-16 px-6 relative overflow-hidden">
        <Image src="/brand/beetroot-small.png" alt="" width={50} height={50} className="absolute bottom-20 left-[3%] opacity-10 rotate-12 hidden md:block" />

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {(["ALL", "SIMPLE SZN", "SMOKEY CAJUN", "GARLICKY", "HOLY TRINITY"] as FilterKey[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-6 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-[#2D5A27] text-white shadow-md"
                  : "bg-transparent text-[#2D5A27] border-2 border-[#2D5A27]/30 hover:border-[#2D5A27] hover:scale-105"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Recipe Grid */}
        <div className="max-w-[1400px] mx-auto">
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
                    className={`group rounded-[1.5rem] overflow-hidden flex flex-col shadow-md ${
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {clickable && (
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="bg-white text-[#2D5A27] text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow font-[family-name:var(--font-dm-sans)]">
                            View Recipe
                          </span>
                        </div>
                      )}

                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <span className="bg-white/20 text-white rounded-full px-2.5 py-0.5 text-xs uppercase font-bold tracking-wider inline-block mb-1.5 font-[family-name:var(--font-dm-sans)]">
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
            <div className="text-center text-[#1A1A1A]/50 py-12 font-[family-name:var(--font-dm-sans)]">
              No recipes found for this filter.
            </div>
          )}
        </div>
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
