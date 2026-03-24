"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";

const badges = [
  "BLACK OWNED",
  "NON-GMO",
  "LOW SODIUM",
  "ALL NATURAL",
  "SMALL BATCH",
  "GLUTEN FREE",
  "CELTIC SEA SALT",
];

export function ValueBadges() {
  return (
    <section className="bg-[#FFF8F0] py-20">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          className="flex flex-wrap justify-center gap-6 md:gap-8"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          {badges.map((label, idx) => (
            <motion.div
              key={label}
              variants={{
                initial: { opacity: 0, scale: 0.6, y: 20 },
                whileInView: { opacity: 1, scale: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px] flex items-center justify-center"
              style={{
                animation: `badge-float ${3 + (idx % 3) * 0.4}s ease-in-out infinite ${idx * 0.2}s`,
              }}
            >
              {/* Sunburst background — slowly rotating */}
              <div
                className="absolute inset-0"
                style={{
                  animation: `badge-spin ${18 + idx * 2}s linear infinite`,
                  animationDirection: idx % 2 === 0 ? "normal" : "reverse",
                }}
              >
                <Image
                  src="/brand/sunburst-bg.png"
                  alt=""
                  fill
                  className="object-contain"
                  sizes="150px"
                />
              </div>

              {/* Badge text — FBJ style: big, bold, fills the shape */}
              <span
                className="relative z-10 text-[16px] md:text-[19px] leading-[1.1] text-center max-w-[90px] md:max-w-[110px]"
                style={{
                  fontFamily: "var(--font-bebas)",
                  color: "#2D5A27",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes badge-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes badge-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
}
