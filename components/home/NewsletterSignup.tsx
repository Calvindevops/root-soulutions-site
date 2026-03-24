"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const { supabase } = await import("@/lib/supabase");
      await supabase.from("subscribers").insert({ email });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("success");
      setEmail("");
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
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
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
                className="bg-[#e85c2a] hover:bg-[#d44c1f] text-white rounded-full px-8 py-4 btn-text transition-colors disabled:opacity-70 whitespace-nowrap"
              >
                {status === "loading" ? "..." : "SUBSCRIBE"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
