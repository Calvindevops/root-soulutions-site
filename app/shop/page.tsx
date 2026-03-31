"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { useProducts } from "@/lib/use-products";
import { cardHover, fadeInUp, staggerContainer } from "@/lib/animations";
import { ScrollingMarquee } from "@/components/home/ScrollingMarquee";

export default function ShopPage() {
  const { addToCart } = useCart();
  const { products, loading } = useProducts();

  const lineup = products.filter(p => !p.is_bundle);
  const starterKit = products.find(p => p.handle === "soulutions-starter-kit" || p.handle === "soulution-starter-kit");

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
      {starterKit && (
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
                  {starterKit.compare_at_price && (
                    <span className="line-through text-white/40 text-xl">${starterKit.compare_at_price.toFixed(2)}</span>
                  )}
                  <span className="bg-white text-[#e85c2a] rounded-full px-4 py-1 text-sm font-bold tracking-wide">
                    SAVE 10%
                  </span>
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
                    src="/products/lineup-all-3-bottles-graffiti-1.png"
                    alt="All 3 Root Soulutions seasoning bottles"
                    fill
                    className="object-cover scale-[1.8]"
                    style={{ objectPosition: "50% 85%" }}
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

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
                  ...(product.handle.includes("garlicky") ? { border: "3px solid rgba(255,255,255,0.25)" } : {}),
                }}
                variants={fadeInUp}
                whileHover={cardHover.whileHover}
                transition={cardHover.transition}
              >
                {/* Most Popular badge */}
                {product.handle.includes("garlicky") && (
                  <div className="absolute top-4 right-4 z-10 bg-[#F5C542] text-[#1A1A1A] rounded-full px-3 py-1 text-xs font-bold tracking-wider">
                    MOST POPULAR
                  </div>
                )}

                {/* Ingredient count */}
                {product.ingredients && product.ingredients.length > 0 && (
                  <div className="absolute top-4 left-4 z-10 bg-white/15 backdrop-blur-sm text-white rounded-full px-3 py-1 text-xs font-bold tracking-wider font-[family-name:var(--font-dm-sans)]">
                    {product.ingredients.length} INGREDIENTS
                  </div>
                )}

                <Link href={`/products/${product.handle}`} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-[200px] h-[200px] rounded-full border-4 overflow-hidden relative mb-8"
                    style={{ borderColor: product.accent_color }}
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
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
