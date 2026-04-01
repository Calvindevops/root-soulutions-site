"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useProducts } from "@/lib/use-products";
import { cardHover, fadeInUp, staggerContainer } from "@/lib/animations";


export function ProductCards() {
  const { products, loading } = useProducts();

  const lineup = products.filter(p => !p.is_bundle);

  const [hoverImage, setHoverImage] = useState<Record<string, string | null>>({});

  const isBirdseye = (url: string) => {
    const lower = url.toLowerCase();
    return lower.includes("birdseye") || lower.includes("birds_eye");
  };

  // Default = exploded seasoning shot
  const getDefaultImage = (images: string[]) => {
    const hasBE = images.some(isBirdseye);
    if (hasBE) {
      for (let i = images.length - 1; i >= 0; i--) {
        if (!isBirdseye(images[i])) return images[i];
      }
    }
    return images.length > 1 ? images[1] : images[0];
  };

  // Birdseye/alternate = overhead shot, or last image if none exists
  const getBirdseyeImage = (images: string[]) => {
    return images.find(isBirdseye) ?? images[images.length - 1];
  };

  return (
    <section className="bg-[#e85c2a] py-24">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.h2
          className="heading-section text-white text-center mb-16"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          THE LINEUP
        </motion.h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-[2rem] overflow-hidden p-8 min-h-[400px] flex flex-col bg-white/5 animate-pulse">
                <div className="w-[200px] h-[200px] rounded-full bg-white/10 mx-auto mb-8" />
                <div className="h-6 bg-white/10 rounded w-2/3 mx-auto mb-2" />
                <div className="h-4 bg-white/10 rounded w-1/2 mx-auto mb-6" />
                <div className="mt-auto flex flex-col items-center gap-4">
                  <div className="h-8 bg-white/10 rounded w-20" />
                  <div className="h-12 bg-white/10 rounded-full w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {lineup.map((product) => {
            return (
              <motion.div
                key={product.id}
                className="rounded-[2rem] overflow-hidden p-8 min-h-[400px] flex flex-col"
                style={{
                  background: `linear-gradient(135deg, ${product.gradient_from}, ${product.gradient_to})`,
                  ...(product.handle === "low-sodium-garlicky-szn-blend" ? { border: "3px solid rgba(255,255,255,0.25)" } : {}),
                }}
                variants={fadeInUp}
                whileHover={cardHover.whileHover}
                transition={cardHover.transition}
              >
                <div className="flex-1 flex flex-col items-center">
                  <div
                    className="w-[200px] h-[200px] rounded-full overflow-hidden relative mb-8 border-4 shadow-lg hover:scale-105 transition-transform duration-500"
                    style={{ borderColor: product.accent_color }}
                    onMouseEnter={() => {
                      if (product.images.length > 1) {
                        setHoverImage((prev) => ({
                          ...prev,
                          [product.handle]: getBirdseyeImage(product.images),
                        }));
                      }
                    }}
                    onMouseLeave={() => {
                      setHoverImage((prev) => ({
                        ...prev,
                        [product.handle]: null,
                      }));
                    }}
                  >
                    {(() => {
                      const currentUrl = hoverImage[product.handle] ?? getDefaultImage(product.images);
                      const isPortrait = currentUrl.toLowerCase().includes("portrait") || currentUrl.toLowerCase().includes("instagram");
                      return (
                        <Image
                          src={currentUrl}
                          alt={product.title}
                          fill
                          className={`object-cover transition-all duration-500 ${isPortrait ? "scale-150" : ""}`}
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

                  <div className="mt-auto flex flex-col items-center w-full gap-4">
                    <span className="text-white text-2xl font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                    <Link
                      href={`/products/${product.handle}`}
                      className="w-full bg-white/20 hover:bg-white/30 text-white rounded-full px-8 py-3 btn-text transition-colors text-center"
                    >
                      SHOP NOW
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        )}
      </div>
    </section>
  );
}
