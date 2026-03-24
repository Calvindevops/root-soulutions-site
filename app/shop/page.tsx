"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { products } from "@/lib/products";
import { cardHover, fadeInUp, staggerContainer } from "@/lib/animations";
import { ScrollingMarquee } from "@/components/home/ScrollingMarquee";
import { SectionDivider } from "@/components/ui/SectionDivider";

const productImage: Record<string, string> = {
  "simple-szn": "/brand/simple-label.png",
  "smokey-cajun-szn": "/products/label-smokey-cajun.png",
  "garlicky-szn": "/products/label-garlicky.png",
};

export default function ShopPage() {
  const { addToCart } = useCart();

  const lineup = products.filter(p => !p.is_bundle);
  const starterKit = products.find(p => p.handle === "soulution-starter-kit");

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Header */}
      <section className="relative bg-[#2D5A27] py-24 text-center overflow-hidden">
        {/* Floating illustrations */}
        <Image src="/brand/chili-pepper.png" alt="" width={80} height={80} className="absolute top-8 left-[10%] opacity-20 rotate-12 hidden md:block" />
        <Image src="/brand/garlic-illustration.png" alt="" width={70} height={70} className="absolute bottom-8 right-[12%] opacity-20 -rotate-12 hidden md:block" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="heading-hero text-white mb-4">SHOP ALL BLENDS</h1>
          <p className="text-white/70 text-lg font-[family-name:var(--font-dm-sans)]">Whole-food flavor. Crafted with SOUL.</p>
        </motion.div>
      </section>

      <SectionDivider topColor="#2D5A27" bottomColor="#1A1A1A" variant="leaf-wave" />

      {/* Starter Kit Feature */}
      {starterKit && (
        <section className="bg-[#1A1A1A] py-20">
          <div className="max-w-[1400px] mx-auto px-6">
            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="heading-section text-[#F5C542] mb-3">THE SOULUTION STARTER KIT</h2>
              <p className="text-white/60 text-lg font-[family-name:var(--font-dm-sans)]">All 3 blends. One kit. Save 10%.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-[500px] mx-auto"
            >
              <div className="rounded-[2rem] overflow-hidden p-8 flex flex-col items-center relative"
                style={{ background: `linear-gradient(135deg, ${starterKit.gradient_from}, ${starterKit.gradient_to})` }}
              >
                <div className="absolute top-4 right-4 bg-[#F5C542] text-[#1A1A1A] rounded-full px-3 py-1 text-xs font-bold">SAVE 10%</div>
                <div className="w-[250px] h-[250px] rounded-full overflow-hidden relative mb-6 border-4 border-[#F5C542]">
                  <Image src={starterKit.images[0]} alt={starterKit.title} fill className="object-cover scale-[1.8]" style={{ objectPosition: "50% 85%" }} sizes="250px" />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-white text-3xl font-bold">${starterKit.price.toFixed(2)}</span>
                  {starterKit.compare_at_price && <span className="text-white/40 text-xl line-through">${starterKit.compare_at_price.toFixed(2)}</span>}
                </div>
                <button
                  onClick={() => addToCart(starterKit)}
                  className="w-full bg-[#e85c2a] text-white rounded-full py-4 btn-text hover:scale-105 hover:brightness-110 transition-all shadow-lg shadow-[#e85c2a]/30"
                >
                  ADD BUNDLE TO CART
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <ScrollingMarquee
        text="FLAVOR • WELLNESS • CULTURE • SOUL"
        bgColor="#e85c2a"
        textColor="white"
      />

      {/* Individual Blends */}
      <section className="bg-[#FFF8F0] py-20 relative overflow-hidden">
        <Image src="/brand/onion-turmeric-illustration.png" alt="" width={120} height={120} className="absolute top-12 right-[5%] opacity-10 rotate-6 hidden md:block" />
        <Image src="/brand/beetroot.png" alt="" width={80} height={80} className="absolute bottom-12 left-[5%] opacity-10 -rotate-12 hidden md:block" />

        <div className="max-w-[1400px] mx-auto px-6">
          <motion.h2
            className="heading-section text-[#2D5A27] text-center mb-16"
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
                  ...(product.handle === "garlicky-szn" ? { border: "3px solid rgba(255,255,255,0.25)" } : {}),
                }}
                variants={fadeInUp}
                whileHover={cardHover.whileHover}
                transition={cardHover.transition}
              >
                <Link href={`/products/${product.handle}`} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-[200px] h-[200px] rounded-full border-4 flex items-center justify-center mb-8 overflow-hidden relative"
                    style={{ borderColor: product.accent_color }}
                  >
                    <Image
                      src={productImage[product.handle] || product.images[0]}
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
        bgColor="#1A1A1A"
        textColor="#F5C542"
      />
    </main>
  );
}
