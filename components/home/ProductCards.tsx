"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { useProducts } from "@/lib/use-products";
import { cardHover, fadeInUp, staggerContainer } from "@/lib/animations";

export function ProductCards() {
  const { addToCart } = useCart();
  const { products } = useProducts();

  const lineup = products.filter(p => !p.is_bundle);

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
                  ...(product.handle.includes("garlicky") ? { border: "3px solid rgba(255,255,255,0.25)" } : {}),
                }}
                variants={fadeInUp}
                whileHover={cardHover.whileHover}
                transition={cardHover.transition}
              >
                <div className="flex-1 flex flex-col items-center">
                  {/* Circle — individual label art per seasoning */}
                  <div
                    className="w-[200px] h-[200px] rounded-full overflow-hidden relative mb-8 border-4 shadow-lg hover:scale-105 transition-transform duration-500"
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

                  <div className="mt-auto flex flex-col items-center w-full gap-4">
                    <span className="text-white text-2xl font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-white/20 hover:bg-white/30 text-white rounded-full px-8 py-3 btn-text transition-colors"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
