"use client";

import { motion } from "framer-motion";
import { Leaf, Plant, HandHeart, Users } from "@phosphor-icons/react";
import { IconFlaskOff, IconWheat } from "@tabler/icons-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

export function ValueBadges() {
  const badges = [
    { label: "LOW SODIUM", icon: <HandHeart size={20} weight="bold" /> },
    { label: "WHOLE-FOOD INGREDIENTS", icon: <Plant size={20} weight="bold" /> },
    { label: "CHEMICAL-FREE", icon: <IconFlaskOff size={20} stroke={2.5} /> },
    { label: "SMALL-BATCH CRAFTED", icon: <HandHeart size={20} weight="bold" /> },
    { label: "POC-OWNED", icon: <Users size={20} weight="bold" /> },
    { label: "GLUTEN-FREE", icon: <IconWheat size={20} stroke={2.5} /> },
  ];

  return (
    <section className="bg-[#FFF8F0] py-20">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div 
          className="flex flex-wrap justify-center gap-4"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.5 }}
          variants={staggerContainer}
        >
          {badges.map((badge, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInUp}
              className="bg-[#2D5A27] text-white rounded-full px-6 py-2.5 flex items-center gap-2"
            >
              {badge.icon}
              <span className="text-sm font-bold uppercase tracking-wider">
                {badge.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}