"use client";

import React, { useState } from "react";
import * as motion from "framer-motion/client";
import { AnimatePresence } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";
import { FAQCategory } from "@/lib/types";
import Image from "next/image";
import Script from "next/script";

const faqData: FAQCategory[] = [
  {
    category: "INGREDIENTS & QUALITY",
    items: [
      {
        question: "Is Root Soulutions gluten-free?",
        answer:
          "Yes. All Root Soulutions blends are 100% gluten-free and crafted from whole-food herbs and spices with no fillers, dyes, or anti-caking agents.",
      },
      {
        question: "What kind of salt does Root Soulutions use?",
        answer:
          "We use Celtic sea salt — an unrefined salt naturally rich in trace minerals like magnesium, potassium, and calcium. Unlike processed table salt, Celtic sea salt supports hydration and electrolyte balance while providing a cleaner, more natural sodium source.",
      },
      {
        question: "Is Root Soulutions low-sodium?",
        answer:
          "Yes. Every blend is intentionally formulated to be low-sodium without sacrificing flavor. We use Celtic sea salt in measured amounts so you get rich taste with significantly less sodium than conventional seasonings.",
      },
      {
        question: "Are Root Soulutions seasonings Non-GMO?",
        answer:
          "Yes. All our ingredients are sourced as whole-food, Non-GMO herbs and spices. We don't use genetically modified ingredients, fillers, or synthetic additives of any kind.",
      },
      {
        question: "Are Root Soulutions blends vegan?",
        answer:
          "Yes. Every blend is 100% plant-based and vegan-friendly. Our ingredients are whole-food herbs, spices, and Celtic sea salt — nothing else.",
      },
      {
        question: "Are your seasonings chemical-free?",
        answer:
          "Absolutely. Root Soulutions blends contain zero chemicals, preservatives, dyes, anti-caking agents, or artificial additives. Just pure, whole-food herbs and spices crafted in small batches.",
      },
      {
        question: "What is aji panca?",
        answer:
          "Aji panca is a mild Peruvian chili pepper naturally rich in antioxidants. It adds deep, fruity depth without intense heat — perfect for balanced flavor that supports wellness without irritation.",
      },
      {
        question: "How should I store my seasonings?",
        answer:
          "Store your Root Soulutions blends in a cool, dry place away from direct sunlight. This preserves freshness, flavor, and the natural potency of the whole-food spices.",
      },
    ],
  },
  {
    category: "WELLNESS & HEALTH",
    items: [
      {
        question: "Can Root Soulutions seasonings support a diabetes-friendly diet?",
        answer:
          "While our seasonings are not medicine, they are intentionally crafted with low sodium and whole-food spices traditionally associated with metabolic balance. Ingredients like turmeric, cumin, garlic, and Celtic sea salt have long histories in wellness traditions for supporting digestion, circulation, and blood sugar awareness. Always consult your healthcare provider for medical advice.",
      },
      {
        question: "What are the wellness benefits of turmeric in Simple SZN?",
        answer:
          "Turmeric is traditionally associated with supporting a healthy inflammatory response and overall vitality. It's known for its antioxidant properties and is widely used in Ayurvedic and wellness traditions to promote balance and joint comfort. Simple SZN features turmeric as its lead ingredient.",
      },
      {
        question: "Is Root Soulutions good for heart-healthy cooking?",
        answer:
          "Yes. Our blends are low-sodium, chemical-free, and made with spices traditionally linked to circulation and metabolic support — including garlic, oregano, thyme, and black pepper. They're designed for people who want bold flavor while being mindful of heart health.",
      },
      {
        question: "What makes Celtic sea salt better than regular salt?",
        answer:
          "Celtic sea salt is unrefined and retains trace minerals that processed table salt strips away — including magnesium, potassium, and calcium. These minerals support hydration, electrolyte balance, and provide a cleaner sodium source. Wellness sources highlight it as a better option for people managing blood pressure and overall wellness.",
      },
    ],
  },
  {
    category: "PRODUCTS",
    items: [
      {
        question: "What blends does Root Soulutions offer?",
        answer:
          "We currently offer three signature blends: Simple SZN (turmeric-forward everyday seasoning), Smokey Cajun SZN (bold, smoky Cajun blend), and Garlicky SZN (garlic-forward aromatic blend). Plus The Soulution Starter Kit — all three blends bundled at 10% off.",
      },
      {
        question: "What's the difference between the three blends?",
        answer:
          "Simple SZN is your everyday go-to — bright, golden, turmeric-forward. Smokey Cajun SZN brings deep, smoky Louisiana heat. Garlicky SZN is a pure, savory garlic bomb with just 5 clean ingredients. Each is crafted for a different flavor profile but all share the same wellness-forward, low-sodium, chemical-free foundation.",
      },
      {
        question: "What's in the Soulution Starter Kit?",
        answer:
          "The Starter Kit includes one bottle each of Simple SZN, Smokey Cajun SZN, and Garlicky SZN — the complete Root Soulutions lineup. It's the best way to experience every flavor and save 10% compared to buying individually.",
      },
      {
        question: "What can I use Root Soulutions seasonings on?",
        answer:
          "Everything. Chicken, seafood, vegetables, rice, eggs, pasta, soups, potatoes, grilling, meal prep — our blends are designed to be versatile everyday seasonings. Simple SZN is your daily driver, Smokey Cajun SZN is your bold flavor upgrade, and Garlicky SZN goes on literally anything savory.",
      },
    ],
  },
  {
    category: "BRAND & VALUES",
    items: [
      {
        question: "Is Root Soulutions Black-owned?",
        answer:
          "Yes. Root Soulutions is a Black-owned, wellness-forward flavor brand founded by Collin Alexander. Born from lived experience with Type 2 diabetes, our mission is to provide clean, culturally rooted seasonings that put real food, real flavor, and real people first.",
      },
      {
        question: "What does 'Crafted with SOUL' mean?",
        answer:
          "SOUL stands for Simplicity, Organic alignment, Uncompromised quality, and Lifestyle-forward flavor. It's our brand philosophy — every blend is made with intention, purity, and purpose.",
      },
      {
        question: "Why small-batch?",
        answer:
          "Small-batch production ensures every bottle meets our standards for freshness, consistency, and quality. We control every step — from sourcing to blending to packaging. No mass production, no shortcuts.",
      },
      {
        question: "Where is Root Soulutions based?",
        answer:
          "We're based in New Jersey and sell at local farmers markets, pop-up events, and online. Check our Markets page for upcoming appearances.",
      },
    ],
  },
  {
    category: "SHIPPING & ORDERS",
    items: [
      {
        question: "Where do you ship?",
        answer:
          "We currently ship anywhere within the continental United States. Free shipping on all orders over $50.",
      },
      {
        question: "How long will my order take?",
        answer:
          "Orders are processed within 48-72 hours. Standard shipping typically takes 3-7 business days depending on your location.",
      },
      {
        question: "What is your return policy?",
        answer:
          "If there's an issue with your order, contact us within 7 days of delivery and we'll make it right. Your satisfaction is our priority.",
      },
    ],
  },
  {
    category: "WHOLESALE & PARTNERSHIPS",
    items: [
      {
        question: "Do you offer wholesale pricing?",
        answer:
          "Yes. We partner with health food stores, restaurants, specialty grocers, and community co-ops that align with our wellness values. Visit our Wholesale page to submit an inquiry.",
      },
      {
        question: "Can I feature Root Soulutions in my restaurant?",
        answer:
          "Absolutely. We work with independent restaurants and chefs who share our commitment to clean, flavorful ingredients. Reach out through our Wholesale page or Contact form.",
      },
    ],
  },
];

// Generate JSON-LD structured data for Google rich snippets
function generateFAQSchema() {
  const allQuestions = faqData.flatMap((cat) =>
    cat.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    }))
  );

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allQuestions,
  };
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <main className="w-full">
      {/* JSON-LD for SEO */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema()),
        }}
      />

      {/* Header */}
      <section className="relative bg-[#2D5A27] py-20 px-6 text-center overflow-hidden">
        <Image src="/brand/onion-turmeric-illustration.png" alt="" width={100} height={100} className="absolute top-6 right-[8%] opacity-15 rotate-12 hidden md:block" />
        <Image src="/brand/beetroot-small.png" alt="" width={50} height={50} className="absolute bottom-6 left-[10%] opacity-15 -rotate-6 hidden md:block" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="heading-hero text-white">FREQUENTLY ASKED QUESTIONS</h1>
          <p className="text-white/70 text-lg mt-4 max-w-2xl mx-auto font-[family-name:var(--font-dm-sans)]">
            Everything you need to know about Root Soulutions — our ingredients, wellness approach, and how we craft with SOUL.
          </p>
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
                    <div
                      key={item.question}
                      className="border-b border-[#2D5A27]/10 py-4"
                    >
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
