"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";
import { fadeInUp } from "@/lib/animations";

const faqItems = [
  {
    question: "Is Root Soulutions gluten-free?",
    answer:
      "Yes. All Root Soulutions blends are 100% gluten-free and crafted from whole-food herbs and spices with no fillers, dyes, or anti-caking agents.",
  },
  {
    question: "What kind of salt does Root Soulutions use?",
    answer:
      "We use Celtic sea salt — an unrefined salt naturally rich in trace minerals like magnesium, potassium, and calcium. Unlike processed table salt, Celtic sea salt supports hydration and electrolyte balance.",
  },
  {
    question: "Is Root Soulutions low-sodium?",
    answer:
      "Yes. Every blend is intentionally formulated to be low-sodium without sacrificing flavor. We use Celtic sea salt in measured amounts so you get rich taste with significantly less sodium than conventional seasonings.",
  },
  {
    question: "Are your seasonings Non-GMO?",
    answer:
      "Yes. All our ingredients are sourced as whole-food, Non-GMO herbs and spices. No genetically modified ingredients, fillers, or synthetic additives of any kind.",
  },
  {
    question: "Is Root Soulutions Black-owned?",
    answer:
      "Yes. Root Soulutions is a Black-owned, wellness-forward flavor brand founded by Collin Alexander. Born from lived experience with Type 2 diabetes, our mission is to provide clean, culturally rooted seasonings.",
  },
  {
    question: "Can these seasonings support a diabetes-friendly diet?",
    answer:
      "While not medicine, our blends are crafted with low sodium and whole-food spices traditionally associated with metabolic balance — including turmeric, cumin, garlic, and Celtic sea salt. Always consult your healthcare provider.",
  },
  {
    question: "What's the difference between the three blends?",
    answer:
      "Simple SZN is your everyday go-to — bright, golden, turmeric-forward. Smokey Cajun SZN brings deep, smoky Louisiana heat. Garlicky SZN is a pure, savory garlic bomb with just 5 clean ingredients.",
  },
  {
    question: "Do you offer wholesale pricing?",
    answer:
      "Yes. We partner with health food stores, restaurants, specialty grocers, and community co-ops. Visit our Wholesale page to submit an inquiry.",
  },
  {
    question: "Where do you ship?",
    answer:
      "We ship anywhere within the continental United States. Free shipping on all orders over $50.",
  },
  {
    question: "What does 'Crafted with SOUL' mean?",
    answer:
      "SOUL stands for Simplicity, Organic alignment, Uncompromised quality, and Lifestyle-forward flavor. Every blend is made with intention, purity, and purpose.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-[#FFF8F0] py-24 px-6">
      <div className="max-w-[900px] mx-auto">
        <motion.div
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="heading-section text-[#2D5A27]">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-[#1A1A1A]/60 text-lg mt-4 font-[family-name:var(--font-dm-sans)]">
            Everything you need to know about our ingredients, wellness approach,
            and how we craft with SOUL.
          </p>
        </motion.div>

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
                className="border-b border-[#2D5A27]/10 py-5"
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
                      <p className="font-[family-name:var(--font-dm-sans)] text-[#1A1A1A]/70 pt-4 pb-2 leading-relaxed">
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
