"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    
    // Simulate API call
    setTimeout(() => {
      console.log("Subscribed:", email);
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  return (
    <section className="bg-[#F5C542] py-24">
      <div className="max-w-[600px] mx-auto px-6">
        <motion.div
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col items-center"
        >
          <h2 className="heading-section text-[#2D5A27] text-center mb-4">
            JOIN THE SOULUTION 🌿
          </h2>
          <p className="text-[#2D5A27]/70 text-center mb-8 text-lg font-[family-name:var(--font-dm-sans)]">
            Get exclusive recipes, market updates, and early access to new blends.
          </p>

          {status === "success" ? (
            <div className="bg-[#2D5A27]/10 text-[#2D5A27] px-6 py-4 rounded-full font-bold text-center w-full">
              You&apos;re in! Welcome to the Soulution. 🌿
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                required
                className="flex-1 px-6 py-4 rounded-full border-2 border-[#2D5A27] bg-white text-[#1A1A1A] placeholder-[#1A1A1A]/50 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]/50 font-[family-name:var(--font-dm-sans)]"
              />
              <button 
                type="submit" 
                disabled={status === "loading"}
                className="bg-[#2D5A27] hover:bg-[#1f401c] text-white rounded-full px-8 py-4 btn-text transition-colors disabled:opacity-70 whitespace-nowrap"
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