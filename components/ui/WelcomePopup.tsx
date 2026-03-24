"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "@phosphor-icons/react";

const COOKIE_NAME = "rs-welcome-seen";
const POPUP_DELAY = 3000; // 3 seconds

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
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"quiz" | "capture">("quiz");
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const seen = document.cookie.includes(COOKIE_NAME);
    if (seen) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, POPUP_DELAY);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Set cookie for 30 days
    document.cookie = `${COOKIE_NAME}=true; max-age=${30 * 24 * 60 * 60}; path=/`;
  };

  const handleFlavorSelect = (flavorId: string) => {
    setSelectedFlavor(flavorId);
    setStep("capture");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Submit to Supabase subscribers table
    try {
      const { supabase } = await import("@/lib/supabase");
      await supabase.from("subscribers").insert({
        email,
      });
    } catch {
      // Silent fail — don't block the UX
    }

    setSubmitted(true);
    // Close after 2 seconds
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
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-[#1A1A1A] rounded-[2rem] max-w-[500px] w-full overflow-hidden shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 text-white/50 hover:text-white transition-colors"
            >
              <X size={24} weight="bold" />
            </button>

            {/* Header with logo */}
            <div className="bg-[#2D5A27] px-8 py-6 text-center">
              <Image
                src="/brand/rs-logo-text.png"
                alt="Root Soulutions"
                width={180}
                height={40}
                className="mx-auto mb-2"
              />
              <div className="flex items-center justify-center gap-2 mt-3">
                <Image
                  src="/brand/chili-pepper.png"
                  alt=""
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <span className="text-[#F5C542] text-sm font-bold tracking-wider uppercase font-[family-name:var(--font-dm-sans)]">
                  FREE SHIPPING ON YOUR FIRST ORDER
                </span>
                <Image
                  src="/brand/garlic-illustration.png"
                  alt=""
                  width={28}
                  height={22}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Content */}
            <div className="px-8 py-8">
              {step === "quiz" && !submitted && (
                <>
                  <h2
                    className="text-[#F5C542] text-3xl md:text-4xl text-center mb-2"
                    style={{ fontFamily: "var(--font-bebas)" }}
                  >
                    WHAT FLAVORS ARE YOU INTO?
                  </h2>
                  <p className="text-white/60 text-center text-sm mb-8 font-[family-name:var(--font-dm-sans)]">
                    Pick your vibe and we&apos;ll hook you up with free shipping.
                  </p>

                  <div className="flex flex-col gap-3">
                    {flavors.map((flavor) => (
                      <button
                        key={flavor.id}
                        onClick={() => handleFlavorSelect(flavor.id)}
                        className="w-full text-left px-5 py-4 rounded-xl border-2 border-white/10 hover:border-[#F5C542] transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: flavor.color }}
                          />
                          <div>
                            <div
                              className="text-white text-lg group-hover:text-[#F5C542] transition-colors"
                              style={{ fontFamily: "var(--font-bebas)" }}
                            >
                              {flavor.label}
                            </div>
                            <div className="text-white/40 text-xs font-[family-name:var(--font-dm-sans)]">
                              {flavor.description} — {flavor.blend}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === "capture" && !submitted && (
                <>
                  <h2
                    className="text-[#F5C542] text-3xl text-center mb-2"
                    style={{ fontFamily: "var(--font-bebas)" }}
                  >
                    GREAT TASTE.
                  </h2>
                  <p className="text-white/60 text-center text-sm mb-6 font-[family-name:var(--font-dm-sans)]">
                    Enter your email to unlock free shipping on your first order.
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/30 focus:border-[#F5C542] focus:outline-none font-[family-name:var(--font-dm-sans)]"
                    />
                    <button
                      type="submit"
                      className="w-full bg-[#e85c2a] hover:bg-[#d44c1f] text-white rounded-full px-8 py-3.5 font-bold uppercase tracking-wider text-sm transition-colors font-[family-name:var(--font-dm-sans)]"
                    >
                      UNLOCK FREE SHIPPING
                    </button>
                  </form>

                  <p className="text-white/30 text-[10px] text-center mt-4 font-[family-name:var(--font-dm-sans)]">
                    By signing up, you agree to receive marketing emails. Unsubscribe anytime.
                  </p>
                </>
              )}

              {submitted && (
                <div className="text-center py-4">
                  <div className="text-4xl mb-3">🌿</div>
                  <h2
                    className="text-[#F5C542] text-3xl mb-2"
                    style={{ fontFamily: "var(--font-bebas)" }}
                  >
                    YOU&apos;RE IN.
                  </h2>
                  <p className="text-white/60 text-sm font-[family-name:var(--font-dm-sans)]">
                    Free shipping is ready for your first order. Season with SOUL.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
