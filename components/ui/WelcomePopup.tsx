"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "@phosphor-icons/react";

const COOKIE_NAME = "rs-welcome-seen";

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
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [discountCode, setDiscountCode] = useState("SOUL10");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const seen = document.cookie.includes(COOKIE_NAME);
    if (seen) return;

    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    const delay = mobile ? 4000 : 1500;
    const timer = setTimeout(() => setIsOpen(true), delay);
    return () => clearTimeout(timer);
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
    if (!email && !phone) return;

    // Save subscriber + notify n8n
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(email ? { email } : {}),
          ...(phone ? { phone, sms_consent: true } : {}),
        }),
      });
    } catch {
      // Silent fail
    }

    // Generate unique discount code
    try {
      const res = await fetch("/api/discount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.code) {
        setDiscountCode(data.code);
      }
    } catch {
      // Falls back to SOUL10
    }

    setSubmitted(true);
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
          {/* Backdrop — click to dismiss on desktop */}
          <div
            className="absolute inset-0 bg-black/40 hidden md:block"
            onClick={handleClose}
          />

          {/* Popup container — bottom sheet on mobile, centered overlay on desktop */}
          <motion.div
            initial={{ y: isMobile ? "100%" : "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: isMobile ? "100%" : "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="absolute inset-x-0 bottom-0 top-auto max-h-[90vh] overflow-y-auto rounded-t-3xl md:inset-0 md:top-0 md:max-h-full md:rounded-none bg-[#e85c2a] flex flex-col"
          >
            {/* Falling seasoning particles — deterministic positions */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              {[5,12,20,28,35,42,50,58,65,72,80,88,95,8,18,30,45,55,70,85].map((left, i) => (
                <div
                  key={i}
                  className="seasoning-particle absolute text-white/20"
                  style={{
                    left: `${left}%`,
                    animationDelay: `${(i * 0.25) % 5}s`,
                    animationDuration: `${4 + (i % 5)}s`,
                    fontSize: `${8 + (i % 4) * 3}px`,
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

            {/* Mobile drag handle */}
            <div className="flex justify-center pt-3 pb-1 md:hidden">
              <div className="w-10 h-1 rounded-full bg-white/30" />
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 z-10 text-white/50 hover:text-white transition-colors w-11 h-11 flex items-center justify-center"
            >
              <X size={28} weight="bold" />
            </button>

            {/* Top section — green with brand */}
            <div className="bg-[#2D5A27] px-6 py-6 md:px-8 md:py-10 text-center relative overflow-hidden">
              <Image src="/brand/chili-pepper.png" alt="" width={80} height={80} className="absolute top-4 left-[5%] opacity-15 rotate-12 hidden md:block" />
              <Image src="/brand/garlic-illustration.png" alt="" width={70} height={70} className="absolute bottom-4 right-[5%] opacity-15 -rotate-6 hidden md:block" />

              <Image
                src="/brand/rs-logo-text.png"
                alt="Root Soulutions"
                width={200}
                height={40}
                className="mx-auto mb-3 md:w-[240px]"
              />
              <div className="flex items-center justify-center gap-3">
                <span className="text-[#F5C542] text-sm md:text-base font-bold tracking-wider uppercase font-[family-name:var(--font-dm-sans)]">
                  10% OFF YOUR NEXT ORDER
                </span>
              </div>
            </div>

            {/* Content — centered */}
            <div className="flex-1 flex items-center justify-center px-6 py-8 md:py-12">
              <div className="w-full max-w-[550px]">
                {step === "quiz" && !submitted && (
                  <>
                    <h2
                      className="text-[#F5C542] text-4xl md:text-6xl text-center mb-3"
                      style={{ fontFamily: "var(--font-bebas)" }}
                    >
                      WHAT FLAVORS ARE YOU INTO?
                    </h2>
                    <p className="text-white/80 text-center text-sm md:text-base mb-8 md:mb-10 font-[family-name:var(--font-dm-sans)]">
                      Pick your vibe and get 10% off your next order.
                    </p>

                    <div className="flex flex-col gap-3 md:gap-4">
                      {flavors.map((flavor) => (
                        <motion.button
                          key={flavor.id}
                          onClick={() => handleFlavorSelect(flavor.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full text-left px-5 py-4 md:px-6 md:py-5 rounded-2xl border-2 border-white/20 hover:scale-105 hover:brightness-110 transition-all duration-200 group bg-white/10 shadow-lg"
                        >
                          <div className="flex items-center gap-4 md:gap-5">
                            <div
                              className="w-4 h-4 rounded-full shrink-0"
                              style={{ backgroundColor: flavor.color }}
                            />
                            <div>
                              <div
                                className="text-white text-xl md:text-2xl group-hover:text-[#F5C542] transition-colors"
                                style={{ fontFamily: "var(--font-bebas)" }}
                              >
                                {flavor.label}
                              </div>
                              <div className="text-white/40 text-xs md:text-sm font-[family-name:var(--font-dm-sans)]">
                                {flavor.description} — {flavor.blend}
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    <button
                      onClick={handleClose}
                      className="block mx-auto mt-6 md:mt-8 text-white/30 text-sm hover:text-white/60 transition-colors font-[family-name:var(--font-dm-sans)] min-h-[44px] flex items-center"
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
                      className="text-[#F5C542] text-4xl md:text-6xl text-center mb-3"
                      style={{ fontFamily: "var(--font-bebas)" }}
                    >
                      GREAT TASTE.
                    </h2>
                    <p className="text-white/80 text-center text-sm md:text-base mb-8 md:mb-10 font-[family-name:var(--font-dm-sans)]">
                      Enter your email to unlock 10% off your next order.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-[400px] mx-auto">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com (optional)"
                        className="w-full px-6 py-4 rounded-full bg-white/10 border-2 border-white/15 text-white text-lg placeholder:text-white/30 focus:border-[#F5C542] focus:outline-none font-[family-name:var(--font-dm-sans)]"
                      />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone number (optional — for SMS deals)"
                        className="w-full px-6 py-4 rounded-full bg-white/10 border-2 border-white/15 text-white text-lg placeholder:text-white/30 focus:border-[#F5C542] focus:outline-none font-[family-name:var(--font-dm-sans)]"
                      />
                      <button
                        type="submit"
                        className="w-full bg-white text-[#e85c2a] rounded-full px-8 py-4 btn-text hover:scale-105 hover:brightness-110 transition-all shadow-lg"
                      >
                        GET 10% OFF
                      </button>
                    </form>

                    <button
                      onClick={handleClose}
                      className="block mx-auto mt-6 text-white/30 text-sm hover:text-white/60 transition-colors font-[family-name:var(--font-dm-sans)] min-h-[44px] flex items-center"
                    >
                      No thanks
                    </button>

                    <p className="text-white/20 text-xs text-center mt-6 font-[family-name:var(--font-dm-sans)]">
                      By signing up you agree to receive marketing emails from Root Soulutions. By adding your phone number you consent to SMS messages. Msg &amp; data rates may apply. Reply <strong className="text-white/40">STOP</strong> to opt out. See our{" "}
                      <a href="/privacy" className="underline">Privacy Policy</a> and{" "}
                      <a href="/terms" className="underline">Terms</a>.
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
                      className="text-[#F5C542] text-4xl md:text-6xl mb-4"
                      style={{ fontFamily: "var(--font-bebas)" }}
                    >
                      YOU&apos;RE IN.
                    </h2>
                    <p className="text-white/80 text-base font-[family-name:var(--font-dm-sans)] mb-4">
                      Your exclusive 10% off code:
                    </p>
                    <div className="bg-white/10 border-2 border-[#F5C542] rounded-2xl px-8 py-4 inline-block mb-4">
                      <span className="text-[#F5C542] text-3xl md:text-4xl font-bold tracking-widest font-[family-name:var(--font-bebas)]">
                        {discountCode}
                      </span>
                    </div>
                    <p className="text-white/50 text-sm font-[family-name:var(--font-dm-sans)] mb-6">
                      Single use — just for you. Enter at checkout.
                    </p>
                    <button
                      onClick={handleClose}
                      className="bg-white text-[#e85c2a] rounded-full px-8 py-3 btn-text hover:scale-105 transition-all shadow-lg"
                    >
                      START SHOPPING
                    </button>
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
