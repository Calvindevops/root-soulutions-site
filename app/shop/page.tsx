"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { products } from "@/lib/products";
import { cardHover, fadeInUp, staggerContainer } from "@/lib/animations";
import { ScrollingMarquee } from "@/components/home/ScrollingMarquee";

export default function ShopPage() {
  const { addToCart } = useCart();

  return (
    <main className="min-h-screen bg-[#2D5A27] flex flex-col">
      <section className="py-20 text-center">
        <h1 className="heading-hero text-white mb-4">SHOP ALL BLENDS</h1>
        <p className="text-white/70 text-lg">Whole-food flavor. Crafted with SOUL.</p>
      </section>

      <section className="py-16 max-w-[1400px] mx-auto px-6 w-full flex-grow">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {products.map((product) => (
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
              {product.is_bundle && (
                <div className="absolute top-4 right-4 z-10 bg-[#F5C542] text-[#1A1A1A] rounded-full px-3 py-1 text-xs font-bold">
                  SAVE 10%
                </div>
              )}
              
              <Link href={`/products/${product.handle}`} className="flex-1 flex flex-col items-center">
                <div
                  className="w-[200px] h-[200px] rounded-full border-4 flex items-center justify-center mb-8 overflow-hidden bg-black/5"
                  style={{ borderColor: product.accent_color }}
                >
                  <Image
                    src={
                      product.handle === "simple-szn" ? "/brand/simple-label.png"
                      : product.handle === "smokey-cajun-szn" ? "/products/label-smokey-cajun.png"
                      : product.handle === "garlicky-szn" ? "/products/label-garlicky.png"
                      : product.images[0]
                    }
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
                  className="w-full bg-white/20 hover:bg-white/30 text-white rounded-full px-8 py-3 btn-text transition-colors"
                >
                  ADD TO CART
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <ScrollingMarquee 
        text="YOU WILL FIND YOURSELF PUTTING THIS ON EVERYTHING 🌿" 
        bgColor="#1A1A1A" 
        textColor="#F5C542" 
      />
    </main>
  );
}