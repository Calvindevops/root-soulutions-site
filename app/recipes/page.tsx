"use client";

import { useState } from "react";
import Link from "next/link";
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
      <section className="relative bg-[#1A1A1A] pt-32 pb-24 px-6 text-center overflow-hidden">
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

      {/* Filter + Recipe Box — picnic bg via CSS background-image (avoids stacking issues) */}
      <section
        className="relative py-16 px-6 overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, rgba(0,0,0,0) 60%, rgba(45,90,39,0.22) 100%), linear-gradient(to bottom, rgba(255,248,240,0.42) 0%, rgba(255,237,213,0.36) 50%, rgba(245,197,66,0.32) 100%), url(/brand/hero-picnic.jpg)",
          backgroundSize: "cover, cover, cover",
          backgroundPosition: "center, center, center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#FFF8F0",
        }}
      >

        <Image src="/brand/beetroot-small.png" alt="" width={50} height={50} className="absolute bottom-20 left-[3%] opacity-15 rotate-12 hidden md:block" />
        <Image src="/brand/garlic-illustration.png" alt="" width={70} height={70} className="absolute top-32 right-[6%] opacity-15 -rotate-12 hidden md:block" />

        {/* Filter Pills — sticky to top of section so they ride along while coil spins */}
        <div className="sticky top-[120px] z-30 mb-12 flex flex-wrap justify-center gap-3">
          {(["ALL", "SIMPLE SZN", "SMOKEY CAJUN", "GARLICKY", "HOLY TRINITY"] as FilterKey[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-6 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 backdrop-blur-md shadow-sm ${
                activeFilter === filter
                  ? "bg-[#2D5A27] text-white shadow-md ring-2 ring-[#F5C542]"
                  : "bg-white/70 text-[#2D5A27] border-2 border-[#2D5A27]/40 hover:border-[#2D5A27] hover:scale-105 hover:bg-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Recipe Box — gold-framed cookbook container holding the grid */}
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <div className="relative rounded-[2rem] border-2 border-[#F5C542]/70 bg-white/12 backdrop-blur-[3px] shadow-[0_24px_60px_-16px_rgba(45,90,39,0.45)] p-6 md:p-10">
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/40" />
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
                const Card = (
                  <div className="aspect-square w-full relative overflow-hidden">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    {clickable && (
                      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openModal(recipe);
                          }}
                          className="bg-white/90 text-[#2D5A27] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow font-[family-name:var(--font-dm-sans)] hover:bg-white"
                        >
                          Quick View
                        </button>
                        <span className="bg-[#e85c2a] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow font-[family-name:var(--font-dm-sans)]">
                          Open Recipe
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <span className="bg-white/25 backdrop-blur-sm text-white rounded-full px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider inline-block mb-1.5 font-[family-name:var(--font-dm-sans)]">
                        {recipe.blendLabel}
                      </span>
                      <h3 className="font-[family-name:var(--font-dm-sans)] font-bold text-white text-sm md:text-base leading-tight">
                        {recipe.title}
                      </h3>
                    </div>
                  </div>
                );
                return (
                  <motion.div
                    key={recipe.slug}
                    variants={fadeInUp}
                    className={`group rounded-[1.25rem] overflow-hidden flex flex-col shadow-lg ring-1 ring-black/5 ${
                      clickable ? "cursor-pointer" : "cursor-default"
                    }`}
                    whileHover={{ scale: clickable ? 1.04 : 1.01, y: clickable ? -4 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  >
                    {clickable ? (
                      <Link href={`/recipes/${recipe.slug}`} className="block">
                        {Card}
                      </Link>
                    ) : (
                      Card
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center text-[#1A1A1A]/60 py-12 font-[family-name:var(--font-dm-sans)]">
              No recipes found for this filter.
            </div>
          )}
          </div>
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
