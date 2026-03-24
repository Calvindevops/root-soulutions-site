"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";

const faqItems = [
  {
    question: "Is Root Soulutions gluten-free?",
    answer:
      "Yes. All Root Soulutions blends are 100% gluten-free and crafted from whole-food herbs and spices with no fillers, dyes, or anti-caking agents.",
  },
  {
    question: "What kind of salt does Root Soulutions use?",
    answer:
      "We use Celtic sea salt — an unrefined salt naturally rich in trace minerals like magnesium, potassium, and calcium.",
  },
  {
    question: "Is Root Soulutions low-sodium?",
    answer:
      "Yes. Every blend is intentionally formulated to be low-sodium without sacrificing flavor.",
  },
  {
    question: "Are your seasonings Non-GMO?",
    answer:
      "Yes. All our ingredients are sourced as whole-food, Non-GMO herbs and spices. No genetically modified ingredients or synthetic additives.",
  },
  {
    question: "Is Root Soulutions Black-owned?",
    answer:
      "Yes. Root Soulutions is a Black-owned, wellness-forward flavor brand founded by Collin Alexander.",
  },
  {
    question: "What's the difference between the three blends?",
    answer:
      "Simple SZN is bright, golden, turmeric-forward. Smokey Cajun SZN brings deep, smoky Louisiana heat. Garlicky SZN is a pure garlic bomb with just 5 clean ingredients.",
  },
  {
    question: "Do you offer wholesale pricing?",
    answer:
      "Yes. We partner with health food stores, restaurants, and co-ops. Visit our Wholesale page to submit an inquiry.",
  },
  {
    question: "Where do you ship?",
    answer:
      "We ship anywhere within the continental United States. Free shipping on all orders over $50.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-[#F5C542] py-20 px-6 relative overflow-hidden">
      {/* Floating grocery illustrations */}
      <div className="absolute top-8 left-8 opacity-20 hidden lg:block">
        <Image src="/brand/chili-pepper.png" alt="" width={80} height={80} className="object-contain" />
      </div>
      <div className="absolute bottom-12 right-12 opacity-20 hidden lg:block">
        <Image src="/brand/garlic-illustration.png" alt="" width={90} height={70} className="object-contain" />
      </div>
      <div className="absolute top-1/3 right-8 opacity-15 hidden xl:block">
        <Image src="/brand/beetroot.png" alt="" width={70} height={50} className="object-contain" />
      </div>

      <div className="max-w-[900px] mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2
            className="text-[#2D5A27] text-5xl md:text-6xl text-center mb-3"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-[#2D5A27]/60 text-base font-[family-name:var(--font-dm-sans)]">
            Everything you need to know about Root Soulutions.
          </p>
        </div>

        <div>
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03 }}
                className="border-b border-[#2D5A27]/15 py-4"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left font-[family-name:var(--font-dm-sans)] font-bold text-[#2D5A27] text-lg flex justify-between items-center outline-none hover:text-[#1A1A1A] transition-colors"
                >
                  <span className="pr-8">{item.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <CaretDown size={24} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="font-[family-name:var(--font-dm-sans)] text-[#2D5A27]/70 pt-3 pb-1 leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
