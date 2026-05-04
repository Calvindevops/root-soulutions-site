"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Recipe } from "@/lib/types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RecipeCoilProps {
  recipes: Recipe[];
  onCardClick: (recipe: Recipe) => void;
}

export function RecipeCoil({ recipes, onCardClick }: RecipeCoilProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const motionMql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileMql = window.matchMedia("(max-width: 767px)");
    setReducedMotion(motionMql.matches);
    setIsMobile(mobileMql.matches);
    const onMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    const onMobile = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    motionMql.addEventListener("change", onMotion);
    mobileMql.addEventListener("change", onMobile);
    return () => {
      motionMql.removeEventListener("change", onMotion);
      mobileMql.removeEventListener("change", onMobile);
    };
  }, []);

  const N = recipes.length;
  const angleStep = N > 0 ? 360 / N : 0;
  const radius = isMobile ? 360 : 660;
  const yStep = isMobile ? 60 : 95;
  const cardW = isMobile ? 220 : 340;
  const cardH = isMobile ? 320 : 460;
  const scrollHeight = `${Math.max(300, N * 34)}vh`;

  useGSAP(
    () => {
      if (reducedMotion) return;
      const wrap = wrapRef.current;
      const wheel = wheelRef.current;
      if (!wrap || !wheel || N === 0) return;

      gsap.set(wheel, { rotationY: 0 });
      gsap.to(wheel, {
        rotationY: -360,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    },
    { scope: wrapRef, dependencies: [N, reducedMotion, isMobile] },
  );

  if (reducedMotion) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[1400px] mx-auto px-6 py-12">
        {recipes.map((recipe) => (
          <Card key={recipe.slug} recipe={recipe} onClick={() => onCardClick(recipe)} />
        ))}
      </div>
    );
  }

  if (N === 0) return null;

  return (
    <div ref={wrapRef} className="relative" style={{ height: scrollHeight }}>
      <div className="sticky top-0 flex h-screen w-full items-center justify-center px-4 py-4 md:py-6">
        {/* Tightened border frame — sized to the wheel, not the viewport */}
        <div
          className="relative h-[78vh] max-h-[780px] w-full max-w-[1100px] overflow-hidden rounded-[2.5rem] border-2 border-[#F5C542]/65 bg-white/10 shadow-[0_24px_60px_-16px_rgba(45,90,39,0.45)]"
          style={{ perspective: "1600px", perspectiveOrigin: "50% 50%" }}
        >

          <div className="absolute inset-0 flex items-center justify-center">
            <div
              ref={wheelRef}
              className="relative"
              style={{ transformStyle: "preserve-3d", width: 1, height: 1 }}
            >
              {recipes.map((recipe, i) => {
                const angle = i * angleStep;
                const yOff = (i - (N - 1) / 2) * yStep;
                return (
                  <div
                    key={recipe.slug}
                    className="absolute"
                    style={{
                      width: cardW,
                      height: cardH,
                      left: `-${cardW / 2}px`,
                      top: `-${cardH / 2}px`,
                      transform: `rotateY(${angle}deg) translateZ(${radius}px) translateY(${yOff}px)`,
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <Card recipe={recipe} onClick={() => onCardClick(recipe)} />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-5 left-0 right-0 text-center text-[#1A1A1A]/55 text-[11px] uppercase tracking-[0.3em] font-[family-name:var(--font-dm-sans)]">
            Scroll to spin · {N} recipes
          </div>
        </div>
      </div>
    </div>
  );
}

interface CardProps {
  recipe: Recipe;
  onClick: () => void;
}

function Card({ recipe, onClick }: CardProps) {
  const clickable = !!recipe.hasRecipeCard;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!clickable}
      className={`group block h-full w-full rounded-[1.5rem] overflow-hidden shadow-2xl bg-white text-left ring-1 ring-black/5 ${
        clickable ? "cursor-pointer" : "cursor-default"
      }`}
    >
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          sizes="(max-width: 768px) 200px, 280px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <span className="bg-white/20 text-white rounded-full px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider inline-block mb-1.5 backdrop-blur-sm font-[family-name:var(--font-dm-sans)]">
            {recipe.blendLabel}
          </span>
          <h3 className="font-[family-name:var(--font-dm-sans)] font-bold text-white text-sm md:text-base leading-tight">
            {recipe.title}
          </h3>
        </div>
      </div>
    </button>
  );
}
