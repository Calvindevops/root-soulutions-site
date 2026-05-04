"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { useProducts } from "@/lib/use-products";
import { fadeInUp } from "@/lib/animations";
import { ScrollingMarquee } from "@/components/home/ScrollingMarquee";
import { ScrollProductFeature } from "@/components/shop/ScrollProductFeature";
import type { Product } from "@/lib/types";

const VIDEO_SLUG_BY_HANDLE: Record<string, string> = {
  "low-sodium-smokey-cajun-szn": "smokey-cajun-reassembly",
  "low-sodium-simple-szn-complete-seasoning": "simple-szn-reassembly",
  "low-sodium-garlicky-szn-blend": "garlicky-szn-reassembly",
};

const ILLUSTRATION_BY_HANDLE: Record<string, string> = {
  "low-sodium-smokey-cajun-szn": "/brand/chili-pepper.png",
  "low-sodium-simple-szn-complete-seasoning": "/brand/onion-turmeric-illustration.png",
  "low-sodium-garlicky-szn-blend": "/brand/garlic-illustration.png",
};

function LineupSkeleton() {
  return (
    <section className="bg-black min-h-screen flex items-center justify-center px-6 py-20">
      <div className="rounded-[2rem] w-full max-w-sm min-h-[520px] bg-white/[0.04] animate-pulse p-8 flex flex-col items-center gap-5">
        <div className="w-[200px] h-[200px] rounded-full bg-white/10" />
        <div className="h-3 w-32 rounded bg-white/10" />
        <div className="h-7 w-48 rounded bg-white/10" />
        <div className="h-3 w-40 rounded bg-white/10" />
        <div className="mt-auto flex flex-col items-center w-full gap-3 pt-4">
          <div className="h-12 w-28 rounded bg-white/10" />
          <div className="h-3 w-24 rounded bg-white/10" />
          <div className="h-12 w-full rounded-full bg-white/10" />
        </div>
      </div>
    </section>
  );
}

const isBirdseye = (url: string) => {
  const lower = url.toLowerCase();
  return lower.includes("birdseye") || lower.includes("birds_eye");
};

const getDefaultIndex = (images: string[]) => {
  const hasBE = images.some(isBirdseye);
  if (hasBE) {
    for (let i = images.length - 1; i >= 0; i--) {
      if (!isBirdseye(images[i])) return i;
    }
  }
  return images.length > 1 ? 1 : 0;
};

const getBirdseyeIndex = (images: string[]) => {
  const idx = images.findIndex(isBirdseye);
  if (idx >= 0) return idx;
  return images.length - 1;
};

export default function ShopPage() {
  const { addToCart } = useCart();
  const { products, loading } = useProducts();

  const [imageIndex, setImageIndex] = useState<Record<string, number>>({});
  const [justAddedHandle, setJustAddedHandle] = useState<string | null>(null);

  useEffect(() => {
    if (products.length === 0) return;
    const indices: Record<string, number> = {};
    products.forEach((p) => {
      indices[p.handle] = getDefaultIndex(p.images);
    });
    setImageIndex(indices);
  }, [products]);

  const handlePreOrder = (product: Product) => {
    addToCart(product, 1, { preorder: true, preorder_ships: "Q4 2026" });
    setJustAddedHandle(product.handle);
    window.setTimeout(() => {
      setJustAddedHandle((prev) => (prev === product.handle ? null : prev));
    }, 1500);
  };

  const lineup = products.filter(p => !p.is_bundle);
  const starterKit = products.find(p => p.handle === "soulutions-starter-kit");

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero — picnic motion video of the 3 bottles, starter-kit copy overlaid */}
      <section className="relative bg-[#1A1A1A] min-h-screen overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover brightness-95"
          style={{ objectPosition: "center 35%" }}
          autoPlay
          loop
          muted
          playsInline
          poster="/brand/hero-picnic.jpg"
          aria-label="Smokey Cajun, Simple SZN, and Garlicky SZN seasonings on a picnic blanket"
        >
          <source src="/videos/shop-hero-picnic.webm" type="video/webm" />
          <source src="/videos/shop-hero-picnic.mp4" type="video/mp4" />
        </video>
        {/* Vertical fade — strong top + bottom blacks for nav clear and clean section transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/15 to-black/85" />
        {/* Left-side gradient — guarantees text legibility over bottles */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />

        <div className="relative z-10 min-h-screen flex flex-col items-start justify-start">
          <div className="max-w-[1400px] mx-auto px-6 w-full pt-36 md:pt-40 pb-32">
            <motion.div
              className="max-w-2xl flex flex-col items-start gap-8"
              initial="initial"
              animate="whileInView"
              variants={{
                initial: {},
                whileInView: { transition: { staggerChildren: 0.2 } },
              }}
            >
              <div className="flex flex-col">
                <motion.h1
                  className="heading-hero text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
                  variants={fadeInUp}
                >
                  THE SOULUTION
                </motion.h1>
                <motion.h1
                  className="heading-hero text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
                  variants={fadeInUp}
                >
                  STARTER KIT
                </motion.h1>
              </div>

              <motion.p
                className="text-lg md:text-xl text-white max-w-xl font-[family-name:var(--font-dm-sans)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
                variants={fadeInUp}
              >
                Get all three Root Soulutions blends in one bundle. The complete toolkit for seasoning your whole kitchen with SOUL.
              </motion.p>

              {loading ? (
                <motion.div variants={fadeInUp} className="flex items-center gap-6">
                  <div className="h-10 w-24 rounded bg-white/20 animate-pulse" />
                  <div className="h-12 w-44 rounded-full bg-white/20 animate-pulse" />
                </motion.div>
              ) : starterKit ? (
                <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-6">
                  <span className="text-white text-4xl font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                    ${starterKit.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(starterKit, 1)}
                    className="bg-[#e85c2a] text-white rounded-full px-12 py-4 btn-text inline-block hover:scale-105 hover:brightness-110 transition-all shadow-lg shadow-[#e85c2a]/30"
                  >
                    ADD TO CART
                  </button>
                </motion.div>
              ) : null}
            </motion.div>
          </div>
        </div>
      </section>

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

      {/* THE LINEUP — section heading */}
      <section className="bg-black py-16 text-center">
        <motion.h2
          className="heading-section text-[#F5C542]"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          THE LINEUP
        </motion.h2>
        <p className="text-white/60 mt-2 font-[family-name:var(--font-dm-sans)]">
          Three blends. Each its own story. Scroll to meet them.
        </p>
      </section>

      {/* Per-product pinned scroll features — jar video on alternating sides */}
      {loading ? (
        <>
          <LineupSkeleton />
          <LineupSkeleton />
          <LineupSkeleton />
        </>
      ) : (
        lineup.map((product, i) => {
          const slug = VIDEO_SLUG_BY_HANDLE[product.handle];
          if (!slug) return null;
          const isPopular = product.handle === "low-sodium-garlicky-szn-blend";
          const justAdded = justAddedHandle === product.handle;
          const illustration = ILLUSTRATION_BY_HANDLE[product.handle];
          return (
            <ScrollProductFeature
              key={product.id}
              videoSrc={`/videos/${slug}.mp4`}
              side={i % 2 === 0 ? "left" : "right"}
              className="bg-black"
              videoClassName="scale-105"
              reverse
            >
              <motion.div
                className="rounded-[2rem] overflow-hidden p-8 w-full max-w-sm min-h-[520px] flex flex-col relative shadow-2xl will-change-transform"
                style={{
                  background: `linear-gradient(135deg, ${product.gradient_from}, ${product.gradient_to})`,
                  ...(isPopular ? { border: "3px solid rgba(255,255,255,0.25)" } : {}),
                }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, scale: 1.01 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Decorative brand illustration with subtle parallax */}
                {illustration && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ y: 16, opacity: 0 }}
                    whileInView={{ y: -10, opacity: 0.12 }}
                    viewport={{ amount: 0.3 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                  >
                    <Image
                      src={illustration}
                      alt=""
                      width={400}
                      height={400}
                      className="absolute -bottom-12 -right-12 w-[70%] h-auto rotate-12"
                    />
                  </motion.div>
                )}

                {isPopular && (
                  <div className="absolute top-4 right-4 z-10 bg-[#F5C542] text-[#1A1A1A] rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.18em] shadow-md">
                    MOST POPULAR
                  </div>
                )}

                <Link
                  href={`/products/${product.handle}`}
                  className="flex-1 flex flex-col items-center relative z-10 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
                  aria-label={`View details for ${product.title}`}
                >
                  <div
                    className="w-[200px] h-[200px] rounded-full overflow-hidden relative mb-6 ring-2 ring-white/15 shadow-2xl"
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
                      const isPortrait =
                        currentUrl.toLowerCase().includes("portrait") ||
                        currentUrl.toLowerCase().includes("instagram");
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
                    {/* Accent dot — subtle brand-color glow */}
                    <div
                      aria-hidden
                      className="absolute top-2 right-2 w-3 h-3 rounded-full ring-2 ring-black/30"
                      style={{
                        backgroundColor: product.accent_color,
                        boxShadow: `0 0 14px ${product.accent_color}`,
                      }}
                    />
                  </div>

                  {/* Eyebrow — subtitle in accent color, all-caps tracking */}
                  <p
                    className="text-[11px] font-bold uppercase tracking-[0.3em] text-center mb-2"
                    style={{ color: product.accent_color }}
                  >
                    {product.subtitle}
                  </p>

                  {/* Title — white anchor, accent now lives in eyebrow + dot */}
                  <h3 className="heading-card text-center text-white mb-4">
                    {product.title}
                  </h3>
                </Link>

                {/* Trust signals */}
                <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/60 mb-5 relative z-10">
                  <span>Low Sodium</span>
                  <span aria-hidden>·</span>
                  <span>Non-GMO</span>
                  <span aria-hidden>·</span>
                  <span>Small Batch</span>
                </div>

                <div className="mt-auto flex flex-col items-center w-full gap-4 relative z-10">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-white text-5xl font-bold tracking-tight leading-none">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-white/50">
                      USD · 3.2 oz
                    </span>
                  </div>
                  <button
                    onClick={() => handlePreOrder(product)}
                    aria-label={`Pre-order ${product.title}`}
                    className={`w-full rounded-full px-8 py-3 btn-text transition-all shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                      justAdded
                        ? "bg-emerald-500 text-white shadow-emerald-500/30"
                        : "bg-[#e85c2a] text-white shadow-[#e85c2a]/30 hover:scale-[1.03] hover:brightness-110 active:scale-[0.99]"
                    }`}
                  >
                    {justAdded ? "✓ ADDED" : "PRE-ORDER"}
                  </button>
                </div>
              </motion.div>
            </ScrollProductFeature>
          );
        })
      )}

      <ScrollingMarquee
        text="YOU WILL FIND YOURSELF PUTTING THIS ON EVERYTHING"
        bgColor="#F5C542"
        textColor="#1A1A1A"
      />
    </main>
  );
}
