"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "@phosphor-icons/react";

const COOKIE_NAME = "rs-welcome-seen";
const POPUP_DELAY = 0; // Immediate

const flavors = [
  {
    id: "simple",
    label: "BRIGHT & GOLDEN",
    description: "Turmeric-forward, everyday versatility",
    blend: "Simple SZN",
    color: "#E8A317",
  },
  {
    id: "cajun",
    label: "BOLD & SMOKY",
    description: "Deep Cajun heat, smoky paprika",
    blend: "Smokey Cajun SZN",
    color: "#E84B8A",
  },
  {
    id: "garlic",
    label: "SAVORY & AROMATIC",
    description: "Garlic-forward, pure simplicity",
    blend: "Garlicky SZN",
    color: "#6B3FA0",
  },
];

export function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState<"quiz" | "capture">("quiz");
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const seen = document.cookie.includes(COOKIE_NAME);
    if (seen) setIsOpen(false);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    document.cookie = `${COOKIE_NAME}=true; max-age=${30 * 24 * 60 * 60}; path=/`;
  };

  const handleFlavorSelect = (flavorId: string) => {
    setSelectedFlavor(flavorId);
    setStep("capture");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      const { supabase } = await import("@/lib/supabase");
      await supabase.from("subscribers").insert({ email });
    } catch {
      // Silent fail
    }

    setSubmitted(true);
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999]"
        >
          {/* Full-screen takeover */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="absolute inset-0 bg-[#e85c2a] flex flex-col"
          >
            {/* Falling seasoning particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="seasoning-particle absolute text-white/20"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${4 + Math.random() * 4}s`,
                    fontSize: `${8 + Math.random() * 12}px`,
                  }}
                >
                  {["•", "·", "✦", "•", "·", "•"][i % 6]}
                </div>
              ))}
            </div>

            <style jsx>{`
              .seasoning-particle {
                animation: fall-seasoning linear infinite;
              }
              @keyframes fall-seasoning {
                0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
              }
            `}</style>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 z-10 text-white/50 hover:text-white transition-colors"
            >
              <X size={28} weight="bold" />
            </button>

            {/* Top section — green with brand */}
            <div className="bg-[#2D5A27] px-8 py-10 text-center relative overflow-hidden">
              <Image src="/brand/chili-pepper.png" alt="" width={80} height={80} className="absolute top-4 left-[5%] opacity-15 rotate-12 hidden md:block" />
              <Image src="/brand/garlic-illustration.png" alt="" width={70} height={70} className="absolute bottom-4 right-[5%] opacity-15 -rotate-6 hidden md:block" />

              <Image
                src="/brand/rs-logo-text.png"
                alt="Root Soulutions"
                width={240}
                height={50}
                className="mx-auto mb-4"
              />
              <div className="flex items-center justify-center gap-3">
                <span className="text-[#F5C542] text-sm md:text-base font-bold tracking-wider uppercase font-[family-name:var(--font-dm-sans)]">
                  FREE SHIPPING ON YOUR FIRST ORDER
                </span>
              </div>
            </div>

            {/* Content — centered */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
              <div className="w-full max-w-[550px]">
                {step === "quiz" && !submitted && (
                  <>
                    <h2
                      className="text-[#F5C542] text-5xl md:text-6xl text-center mb-3"
                      style={{ fontFamily: "var(--font-bebas)" }}
                    >
                      WHAT FLAVORS ARE YOU INTO?
                    </h2>
                    <p className="text-white/80 text-center text-base mb-10 font-[family-name:var(--font-dm-sans)]">
                      Pick your vibe and we&apos;ll hook you up with free shipping.
                    </p>

                    <div className="flex flex-col gap-4">
                      {flavors.map((flavor) => (
                        <motion.button
                          key={flavor.id}
                          onClick={() => handleFlavorSelect(flavor.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full text-left px-6 py-5 rounded-2xl border-2 border-white/20 hover:scale-105 hover:brightness-110 transition-all duration-200 group bg-white/10 shadow-lg"
                        >
                          <div className="flex items-center gap-5">
                            <div
                              className="w-4 h-4 rounded-full shrink-0"
                              style={{ backgroundColor: flavor.color }}
                            />
                            <div>
                              <div
                                className="text-white text-2xl group-hover:text-[#F5C542] transition-colors"
                                style={{ fontFamily: "var(--font-bebas)" }}
                              >
                                {flavor.label}
                              </div>
                              <div className="text-white/40 text-sm font-[family-name:var(--font-dm-sans)]">
                                {flavor.description} — {flavor.blend}
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    <button
                      onClick={handleClose}
                      className="block mx-auto mt-8 text-white/30 text-sm hover:text-white/60 transition-colors font-[family-name:var(--font-dm-sans)]"
                    >
                      No thanks, just browsing
                    </button>
                  </>
                )}

                {step === "capture" && !submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2
                      className="text-[#F5C542] text-5xl md:text-6xl text-center mb-3"
                      style={{ fontFamily: "var(--font-bebas)" }}
                    >
                      GREAT TASTE.
                    </h2>
                    <p className="text-white/80 text-center text-base mb-10 font-[family-name:var(--font-dm-sans)]">
                      Enter your email to unlock free shipping on your first order.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-[400px] mx-auto">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="w-full px-6 py-4 rounded-full bg-white/10 border-2 border-white/15 text-white text-lg placeholder:text-white/30 focus:border-[#F5C542] focus:outline-none font-[family-name:var(--font-dm-sans)]"
                      />
                      <button
                        type="submit"
                        className="w-full bg-white text-[#e85c2a] rounded-full px-8 py-4 btn-text hover:scale-105 hover:brightness-110 transition-all shadow-lg"
                      >
                        UNLOCK FREE SHIPPING
                      </button>
                    </form>

                    <button
                      onClick={handleClose}
                      className="block mx-auto mt-6 text-white/30 text-sm hover:text-white/60 transition-colors font-[family-name:var(--font-dm-sans)]"
                    >
                      No thanks
                    </button>

                    <p className="text-white/20 text-[10px] text-center mt-6 font-[family-name:var(--font-dm-sans)]">
                      By signing up, you agree to receive marketing emails. Unsubscribe anytime.
                    </p>
                  </motion.div>
                )}

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="text-6xl mb-4">🌿</div>
                    <h2
                      className="text-[#F5C542] text-5xl md:text-6xl mb-4"
                      style={{ fontFamily: "var(--font-bebas)" }}
                    >
                      YOU&apos;RE IN.
                    </h2>
                    <p className="text-white/60 text-lg font-[family-name:var(--font-dm-sans)]">
                      Free shipping is ready for your first order. Season with SOUL.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
