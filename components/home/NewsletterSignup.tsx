"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const { supabase } = await import("@/lib/supabase");
      await supabase.from("subscribers").insert({
        email,
        ...(phone && smsConsent ? { phone, sms_consent: true } : {}),
      });
      setStatus("success");
      setEmail("");
      setPhone("");
      setSmsConsent(false);
    } catch {
      setStatus("success");
      setEmail("");
      setPhone("");
      setSmsConsent(false);
    }
  };

  return (
    <section className="bg-[#1A1A1A] py-20 border-b border-white/10">
      <div className="max-w-[600px] mx-auto px-6">
        <motion.div
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col items-center"
        >
          <h2
            className="text-[#F5C542] text-4xl md:text-5xl text-center mb-3"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            JOIN THE SOULUTION
          </h2>
          <p className="text-white/50 text-center mb-8 text-base font-[family-name:var(--font-dm-sans)]">
            Exclusive recipes, market updates, and early access to new blends.
          </p>

          {status === "success" ? (
            <div className="bg-[#2D5A27] text-white px-6 py-4 rounded-full font-bold text-center w-full font-[family-name:var(--font-dm-sans)]">
              You&apos;re in! Welcome to the Soulution.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 rounded-full border border-white/20 bg-white/5 text-white placeholder-white/30 focus:outline-none focus:border-[#F5C542] font-[family-name:var(--font-dm-sans)]"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-[#e85c2a] text-white rounded-full px-8 py-4 btn-text hover:scale-105 hover:brightness-110 transition-all shadow-lg shadow-[#e85c2a]/30 disabled:opacity-70 whitespace-nowrap"
                >
                  {status === "loading" ? "..." : "SUBSCRIBE"}
                </button>
              </div>

              <div className="flex flex-col items-center gap-1">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  className="w-full px-6 py-4 rounded-full border border-white/20 bg-white/5 text-white placeholder-white/30 focus:outline-none focus:border-[#F5C542] font-[family-name:var(--font-dm-sans)]"
                />
                <span className="text-white/30 text-xs font-[family-name:var(--font-dm-sans)]">
                  Optional — for SMS updates
                </span>
              </div>

              {phone && (
                <label className="flex items-start gap-3 cursor-pointer mt-1">
                  <input
                    type="checkbox"
                    checked={smsConsent}
                    onChange={(e) => setSmsConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-[#e85c2a] shrink-0"
                  />
                  <span className="text-white/40 text-xs font-[family-name:var(--font-dm-sans)] leading-relaxed">
                    I agree to receive promotional text messages from Root Soulutions, including farmers market updates, new blends, and special offers. Message frequency varies. Msg &amp; data rates may apply. Reply <strong className="text-white/60">STOP</strong> to opt out, <strong className="text-white/60">HELP</strong> for help. See our{" "}
                    <a href="/privacy" className="underline text-white/60 hover:text-white">Privacy Policy</a>{" "}
                    and{" "}
                    <a href="/terms" className="underline text-white/60 hover:text-white">Terms</a>.
                  </span>
                </label>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
