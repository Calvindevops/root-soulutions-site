"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { useProducts } from "@/lib/use-products";
import { cardHover, fadeInUp, staggerContainer } from "@/lib/animations";
import { ScrollingMarquee } from "@/components/home/ScrollingMarquee";


function SkeletonCard() {
  return (
    <div className="rounded-[2rem] overflow-hidden p-8 min-h-[400px] flex flex-col bg-white/5 animate-pulse">
      <div className="w-[200px] h-[200px] rounded-full bg-white/10 mx-auto mb-8" />
      <div className="h-6 bg-white/10 rounded w-2/3 mx-auto mb-2" />
      <div className="h-4 bg-white/10 rounded w-1/2 mx-auto mb-6" />
      <div className="mt-auto flex flex-col items-center gap-4">
        <div className="h-8 bg-white/10 rounded w-20" />
        <div className="h-12 bg-white/10 rounded-full w-full" />
      </div>
    </div>
  );
}

export default function ShopPage() {
  const { addToCart } = useCart();
  const { products, loading } = useProducts();

  const [imageIndex, setImageIndex] = useState<Record<string, number>>({});

  // Default to exploded seasoning image
  useEffect(() => {
    if (products.length === 0) return;
    const indices: Record<string, number> = {};
    products.forEach((p) => {
      indices[p.handle] = getDefaultIndex(p.images);
    });
    setImageIndex(indices);
  }, [products]);

  const isBirdseye = (url: string) => {
    const lower = url.toLowerCase();
    return lower.includes("birdseye") || lower.includes("birds_eye");
  };

  // Default = exploded seasoning shot
  // With birdseye: last non-birdseye (the generated exploded)
  // Without birdseye: index 1 (second image = exploded)
  const getDefaultIndex = (images: string[]) => {
    const hasBE = images.some(isBirdseye);
    if (hasBE) {
      for (let i = images.length - 1; i >= 0; i--) {
        if (!isBirdseye(images[i])) return i;
      }
    }
    return images.length > 1 ? 1 : 0;
  };

  // Birdseye/alternate = overhead shot, or last image if no birdseye exists
  const getBirdseyeIndex = (images: string[]) => {
    const idx = images.findIndex(isBirdseye);
    if (idx >= 0) return idx;
    // No birdseye — use last image (e.g. instagram portrait for Simple SZN)
    return images.length - 1;
  };

  const cycleImage = (handle: string, totalImages: number) => {
    setImageIndex((prev) => ({
      ...prev,
      [handle]: ((prev[handle] ?? 0) + 1) % totalImages,
    }));
  };

  const lineup = products.filter(p => !p.is_bundle);
  const starterKit = products.find(p => p.handle === "soulutions-starter-kit");

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Header */}
      <section className="relative bg-[#1A1A1A] py-24 text-center overflow-hidden">
        <Image src="/brand/chili-pepper.png" alt="" width={80} height={80} className="absolute top-8 left-[10%] opacity-15 rotate-12 hidden md:block" />
        <Image src="/brand/garlic-illustration.png" alt="" width={70} height={70} className="absolute bottom-8 right-[12%] opacity-15 -rotate-12 hidden md:block" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="heading-hero text-white mb-4">SHOP ALL BLENDS</h1>
          <p className="text-white/60 text-lg font-[family-name:var(--font-dm-sans)]">Whole-food flavor. Crafted with SOUL.</p>
        </motion.div>
      </section>

      {/* Starter Kit Feature — Orange */}
      {loading ? (
        <section className="bg-[#e85c2a] py-20">
          <div className="max-w-[1400px] mx-auto px-6 animate-pulse">
            <div className="h-10 bg-white/20 rounded w-1/2 mb-4" />
            <div className="h-6 bg-white/20 rounded w-2/3" />
          </div>
        </section>
      ) : starterKit ? (
        <section className="bg-[#e85c2a] py-20 relative overflow-hidden">
          <Image src="/brand/onion-turmeric-illustration.png" alt="" width={120} height={120} className="absolute top-8 right-[5%] opacity-15 rotate-6 hidden md:block" />

          <div className="max-w-[1400px] mx-auto px-6">
            <div className="md:grid md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                className="flex flex-col items-start gap-6 z-10"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="heading-section text-white">THE SOULUTION STARTER KIT</h2>
                <p className="text-white/80 text-lg font-[family-name:var(--font-dm-sans)]">
                  Get all three Root Soulutions blends in one bundle. The complete toolkit for seasoning your whole kitchen with SOUL.
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-white text-4xl font-bold">${starterKit.price.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => addToCart(starterKit)}
                  className="w-full md:w-auto bg-white text-[#e85c2a] rounded-full px-12 py-4 btn-text hover:scale-105 hover:brightness-110 transition-all shadow-lg mt-2"
                >
                  ADD BUNDLE TO CART
                </button>
              </motion.div>

              {/* Right Image */}
              <motion.div
                className="w-full flex justify-center mt-12 md:mt-0"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-full max-w-[500px] aspect-square rounded-[2rem] relative overflow-hidden shadow-2xl">
                  <Image
                    src={starterKit.images[0] || "/products/lineup-all-3-bottles-graffiti-1.png"}
                    alt="All 3 Root Soulutions seasoning bottles"
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Eco-Friendly Sustainability Message */}
      <section className="bg-[#2D5A27] py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-4xl mb-6">🌿</p>
            <h2 className="heading-section text-[#F5C542] mb-6">A Message From Our Hearts to Yours</h2>
            <div className="text-white/80 text-base md:text-lg leading-relaxed font-[family-name:var(--font-dm-sans)] space-y-4">
              <p>
                As we grow, one thing never changes — our commitment to doing things the right way. Not just crafting blends you love, but caring deeply about the world we share.
              </p>
              <p>
                We&apos;re making the move from plastic to stunning amber glass jars. 🫙✨ UV-protective, infinitely recyclable, and zero plastic leaching — better for your product and the planet.
              </p>
              <p>
                Every small effort creates a <span className="text-[#F5C542] font-bold">HUGE</span> impact. With your support, we&apos;ll make the full switch by end of year.
              </p>
              <p className="text-white/60 text-sm">
                💛 Sign up for our newsletter to be the first to know when glass pre-orders go live.
              </p>
            </div>

            <div className="mt-10 border-t border-white/10 pt-8">
              <p className="text-[#F5C542] text-xl md:text-2xl font-bold font-[family-name:var(--font-dm-sans)] mb-1">SAME DELICIOUS BLENDS.</p>
              <p className="text-[#F5C542] text-xl md:text-2xl font-bold font-[family-name:var(--font-dm-sans)] mb-1">SAME EXPLOSIVE FLAVOR.</p>
              <p className="text-white/90 text-lg md:text-xl font-[family-name:var(--font-dm-sans)]">A BRAND NEW ECO-FRIENDLY &amp; SUSTAINABLE LOOK. 🌎</p>
            </div>

            <div className="mt-8">
              <p className="text-white/50 text-sm font-[family-name:var(--font-dm-sans)] italic">
                Thank you for growing with us — this one&apos;s for you and the planet
              </p>
              <p className="text-white/70 text-lg font-bold mt-4 font-[family-name:var(--font-dm-sans)]">
                LOVEROOT 🩵
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <ScrollingMarquee
        text="FLAVOR • WELLNESS • CULTURE • SOUL"
        bgColor="#1A1A1A"
        textColor="#F5C542"
      />

      {/* Individual Blends — Dark */}
      <section className="bg-[#1A1A1A] py-20 relative overflow-hidden">
        <Image src="/brand/beetroot-small.png" alt="" width={60} height={60} className="absolute bottom-12 left-[5%] opacity-10 -rotate-12 hidden md:block" />

        <div className="max-w-[1400px] mx-auto px-6">
          <motion.h2
            className="heading-section text-[#F5C542] text-center mb-16"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            THE LINEUP
          </motion.h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
            >
              {lineup.map((product) => (
                <motion.div
                  key={product.id}
                  className="rounded-[2rem] overflow-hidden p-8 min-h-[400px] flex flex-col relative"
                  style={{
                    background: `linear-gradient(135deg, ${product.gradient_from}, ${product.gradient_to})`,
                    ...(product.handle === "low-sodium-garlicky-szn-blend" ? { border: "3px solid rgba(255,255,255,0.25)" } : {}),
                  }}
                  variants={fadeInUp}
                  whileHover={cardHover.whileHover}
                  transition={cardHover.transition}
                >
                  {/* Most Popular badge */}
                  {product.handle === "low-sodium-garlicky-szn-blend" && (
                    <div className="absolute top-4 right-4 z-10 bg-[#F5C542] text-[#1A1A1A] rounded-full px-3 py-1 text-xs font-bold tracking-wider">
                      MOST POPULAR
                    </div>
                  )}

                  <Link href={`/products/${product.handle}`} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-[200px] h-[200px] rounded-full border-4 overflow-hidden relative mb-8"
                      style={{ borderColor: product.accent_color }}
                      onMouseEnter={() => {
                        if (product.images.length > 1) {
                          setImageIndex((prev) => ({
                            ...prev,
                            [product.handle]: getBirdseyeIndex(product.images),
                          }));
                        }
                      }}
                      onMouseLeave={() => {
                        setImageIndex((prev) => ({
                          ...prev,
                          [product.handle]: getDefaultIndex(product.images),
                        }));
                      }}
                    >
                      {(() => {
                        const currentIdx = imageIndex[product.handle] ?? getDefaultIndex(product.images);
                        const currentUrl = product.images[currentIdx] ?? product.images[0];
                        const isPortrait = currentUrl.toLowerCase().includes("portrait") || currentUrl.toLowerCase().includes("instagram");
                        return (
                          <Image
                            src={currentUrl}
                            alt={product.title}
                            fill
                            className={`object-cover transition-all duration-300 ${isPortrait ? "scale-150" : ""}`}
                            style={isPortrait ? { objectPosition: "center 40%" } : undefined}
                            sizes="200px"
                          />
                        );
                      })()}
                    </div>

                    <h3 className="heading-card mb-2 text-center" style={{ color: product.accent_color }}>
                      {product.title}
                    </h3>
                    <p className="text-white/70 text-sm text-center mb-6">
                      {product.subtitle}
                    </p>
                  </Link>

                  <div className="mt-auto flex flex-col items-center w-full gap-4 relative z-10">
                    <span className="text-white text-2xl font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                      }}
                      className="w-full bg-white/20 text-white rounded-full px-8 py-3 btn-text hover:scale-105 hover:brightness-110 transition-all"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <ScrollingMarquee
        text="YOU WILL FIND YOURSELF PUTTING THIS ON EVERYTHING"
        bgColor="#F5C542"
        textColor="#1A1A1A"
      />
    </main>
  );
}
