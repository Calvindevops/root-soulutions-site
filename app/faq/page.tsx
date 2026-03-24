"use client";

import React, { useState } from "react";
import * as motion from "framer-motion/client";
import { AnimatePresence } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";
import { FAQCategory } from "@/lib/types";

const faqData: FAQCategory[] = [
  {
    category: "SHIPPING",
    items: [
      { question: "Where do you ship?", answer: "We currently ship anywhere within the continental US. Enjoy free shipping on all orders over $50." },
      { question: "How long will my order take?", answer: "Orders are processed within 48-72 hours. Standard shipping typically takes 3-7 business days depending on your location." }
    ]
  },
  {
    category: "PRODUCTS",
    items: [
      { question: "Are your seasonings gluten-free?", answer: "Yes, all our seasonings are 100% gluten-free and crafted in a facility that strictly monitors cross-contamination." },
      { question: "Are Root Soulutions blends vegan?", answer: "Yes! Every single blend is plant-based and vegan-friendly." },
      { question: "How should I store my seasonings?", answer: "For the best flavor and longevity, store your blends in a cool, dry place away from direct sunlight." },
      { question: "What kind of salt do you use?", answer: "We use high-quality Celtic sea salt, known for its rich mineral content and unrefined nature." },
      { question: "Are these low-sodium?", answer: "Yes, we intentionally formulate our blends to be lower in sodium without sacrificing flavor, making them a great wellness-aligned choice." }
    ]
  },
  {
    category: "WHOLESALE",
    items: [
      { question: "Do you offer wholesale pricing?", answer: "Yes, we love partnering with health food stores, restaurants, and co-ops. Please visit our Wholesale page to submit an inquiry." },
      { question: "Who do you partner with?", answer: "We partner with local health food stores, independent restaurants, specialty grocers, and community co-ops that align with our wellness values." }
    ]
  },
  {
    category: "RETURNS",
    items: [
      { question: "What is your return policy?", answer: "If there is an issue with your order, please contact us within 7 days of delivery and we will make it right." }
    ]
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <main className="w-full">
      {/* Header */}
      <section className="bg-[#2D5A27] py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="heading-hero text-white">FAQ</h1>
        </motion.div>
      </section>

      {/* Accordion Section */}
      <section className="bg-[#FFF8F0] py-16 px-6 min-h-[50vh]">
        <div className="max-w-[900px] mx-auto">
          {faqData.map((categoryData, catIdx) => (
            <div key={categoryData.category} className="mb-12">
              <h2 className="heading-card text-[#2D5A27] mt-8 mb-4 border-b-2 border-[#2D5A27] pb-2 inline-block">
                {categoryData.category}
              </h2>
              
              <div>
                {categoryData.items.map((item, itemIdx) => {
                  const id = `${catIdx}-${itemIdx}`;
                  const isOpen = openIndex === id;
                  
                  return (
                    <div key={item.question} className="border-b border-[#2D5A27]/10 py-4">
                      <button
                        onClick={() => toggleAccordion(id)}
                        className="w-full text-left font-[family-name:var(--font-dm-sans)] font-bold text-[#2D5A27] text-lg flex justify-between items-center outline-none"
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
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
