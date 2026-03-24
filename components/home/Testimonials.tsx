"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "So I tried both on some turkey burgers last night and babaayyyyyyy! Okay, the Cajun is my favorite! So I can't wait for that garlic to come on out, replace all my other seasonings pleaseeee!",
    blend: "Smokey Cajun SZN",
  },
  {
    quote:
      "I'm in love with the Garlicky one man, that has to be my favorite. You gonna be coming out with some new heat soon?",
    blend: "Garlicky SZN",
  },
  {
    quote:
      "If I could mail you one I would bruh! They taste sooooo amazing. Thank you!",
  },
  {
    quote:
      "Good Morning, is it possible to preorder the garlicky szn?",
    blend: "Garlicky SZN",
  },
  {
    quote:
      "I got into meal preps & counting my calories since ima be cutting. So I'm weighin everything too. I'm in love with the Garlicky one man, that has to be my favorite.",
    blend: "Garlicky SZN",
  },
];

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -400 : 400;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="bg-[#e85c2a] py-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 mb-12">
        <motion.div
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center"
        >
          <h2
            className="text-[#F5C542] text-5xl md:text-6xl mb-3"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            TASTY TESTIMONIES
          </h2>
          <p className="text-white/50 text-base font-[family-name:var(--font-dm-sans)]">
            Real people. Real flavor. Real love.
          </p>
        </motion.div>
      </div>

      {/* Scrolling testimonial cards with arrows */}
      <div className="relative">
        {/* Scroll arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur-sm"
          aria-label="Scroll left"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur-sm"
          aria-label="Scroll right"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-6 snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((t, idx) => (
            <motion.div
              key={`testimonial-${idx}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4 }}
              className="flex-none w-[340px] md:w-[400px] snap-center bg-white/5 border border-white/10 rounded-[1.5rem] p-7 flex flex-col gap-5 hover:bg-white/[0.08] transition-colors"
            >
              {/* Quote */}
              <div className="flex-1">
                <div className="text-[#F5C542] text-3xl leading-none mb-3">&ldquo;</div>
                <p className="text-white/80 text-base leading-relaxed font-[family-name:var(--font-dm-sans)]">
                  {t.quote}
                </p>
              </div>

              {/* Blend tag */}
              {t.blend && (
                <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                  <Image
                    src="/brand/sunburst-bg.png"
                    alt=""
                    width={20}
                    height={20}
                    className="opacity-60"
                  />
                  <span className="text-[#F5C542] text-xs font-bold uppercase tracking-wider font-[family-name:var(--font-dm-sans)]">
                    {t.blend}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
