"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "success">("idle");
  const [smsStatus, setSmsStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setEmailStatus("loading");
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch { /* silent */ }
    setEmailStatus("success");
    setEmail("");
  };

  const handleSmsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setSmsStatus("loading");
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, sms_consent: true }),
      });
    } catch { /* silent */ }
    setSmsStatus("success");
    setPhone("");
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

          <div className="flex flex-col gap-4 w-full">
            {/* Email */}
            {emailStatus === "success" ? (
              <div className="bg-[#2D5A27] text-white px-6 py-4 rounded-full font-bold text-center font-[family-name:var(--font-dm-sans)]">
                You&apos;re in! Welcome to the Soulution.
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
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
                  disabled={emailStatus === "loading"}
                  className="bg-[#e85c2a] text-white rounded-full px-8 py-4 btn-text hover:scale-105 hover:brightness-110 transition-all shadow-lg shadow-[#e85c2a]/30 disabled:opacity-70 whitespace-nowrap"
                >
                  {emailStatus === "loading" ? "..." : "SUBSCRIBE"}
                </button>
              </form>
            )}

            {/* SMS */}
            {smsStatus === "success" ? (
              <div className="bg-[#2D5A27] text-white px-6 py-4 rounded-full font-bold text-center font-[family-name:var(--font-dm-sans)]">
                Signed up for SMS updates!
              </div>
            ) : (
              <form onSubmit={handleSmsSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  required
                  className="flex-1 px-6 py-4 rounded-full border border-white/20 bg-white/5 text-white placeholder-white/30 focus:outline-none focus:border-[#F5C542] font-[family-name:var(--font-dm-sans)]"
                />
                <button
                  type="submit"
                  disabled={smsStatus === "loading"}
                  className="bg-[#2D5A27] text-white rounded-full px-8 py-4 btn-text hover:scale-105 hover:brightness-110 transition-all shadow-lg shadow-[#2D5A27]/30 disabled:opacity-70 whitespace-nowrap"
                >
                  {smsStatus === "loading" ? "..." : "SUBSCRIBE"}
                </button>
              </form>
            )}

            <p className="text-white/30 text-xs font-[family-name:var(--font-dm-sans)] leading-relaxed text-center">
              By subscribing via SMS you agree to receive promotional text messages from Root Soulutions. Msg &amp; data rates may apply. Reply <strong className="text-white/50">STOP</strong> to opt out. See our{" "}
              <a href="/privacy" className="underline text-white/50 hover:text-white">Privacy Policy</a>{" "}
              and{" "}
              <a href="/terms" className="underline text-white/50 hover:text-white">Terms</a>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
