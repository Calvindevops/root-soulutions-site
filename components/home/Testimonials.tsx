"use client";

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

// Double the array for seamless infinite scroll
const scrollItems = [...testimonials, ...testimonials];

export function Testimonials() {
  return (
    <section className="bg-[#1A1A1A] py-20 overflow-hidden">
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

      {/* Scrolling testimonial cards */}
      <div className="relative">
        <div className="testimonial-track flex gap-6 px-6">
          {scrollItems.map((t, idx) => (
            <div
              key={`testimonial-${idx}`}
              className="flex-none w-[340px] md:w-[400px] bg-white/5 border border-white/10 rounded-[1.5rem] p-7 flex flex-col gap-5 hover:bg-white/8 transition-colors"
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
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .testimonial-track {
          animation: scroll-testimonials 30s linear infinite;
        }
        .testimonial-track:hover {
          animation-play-state: paused;
        }
        @keyframes scroll-testimonials {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
