"use client";

import React, { useState } from "react";
import * as motion from "framer-motion/client";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    console.log("Submitting contact message:", data);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <main className="w-full">
      {/* Header */}
      <section className="bg-[#2D5A27] py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="heading-hero text-white">CONTACT</h1>
        </motion.div>
      </section>

      {/* Info + Form Section */}
      <section className="bg-[#FFF8F0] py-16 px-6">
        <div className="max-w-[700px] mx-auto">
          {/* Contact Info */}
          <div className="text-center mb-12">
            <p className="font-[family-name:var(--font-dm-sans)] text-[#1A1A1A]/80 text-lg mb-2">
              <span className="font-bold">General Inquiries:</span> hello@rootsoulutions.com
            </p>
            <p className="font-[family-name:var(--font-dm-sans)] text-[#1A1A1A]/80 text-lg mb-2">
              <span className="font-bold">Wholesale:</span> wholesale@rootsoulutions.com
            </p>
            <p className="font-[family-name:var(--font-dm-sans)] text-[#1A1A1A]/80 text-lg">
              Jersey City, NJ
            </p>
          </div>

          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-12 rounded-[2rem] text-center shadow-sm border border-[#2D5A27]/10"
            >
              <h2 className="heading-sub text-[#2D5A27] mb-4">Message Sent!</h2>
              <p className="font-[family-name:var(--font-dm-sans)] text-[#1A1A1A]/70 text-lg">
                Thanks for reaching out. We'll get back to you as soon as possible.
              </p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="mt-8 text-[#e85c2a] font-bold uppercase tracking-wider text-sm hover:underline"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-[#2D5A27]/10 space-y-6"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-[#1A1A1A] mb-2 font-[family-name:var(--font-dm-sans)]">Name *</label>
                <input required type="text" id="name" name="name" className="w-full border-2 border-[#2D5A27]/20 rounded-xl px-4 py-3 focus:border-[#2D5A27] outline-none transition-colors font-[family-name:var(--font-dm-sans)]" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-[#1A1A1A] mb-2 font-[family-name:var(--font-dm-sans)]">Email Address *</label>
                <input required type="email" id="email" name="email" className="w-full border-2 border-[#2D5A27]/20 rounded-xl px-4 py-3 focus:border-[#2D5A27] outline-none transition-colors font-[family-name:var(--font-dm-sans)]" />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-[#1A1A1A] mb-2 font-[family-name:var(--font-dm-sans)]">Phone Number (Optional)</label>
                <input type="tel" id="phone" name="phone" className="w-full border-2 border-[#2D5A27]/20 rounded-xl px-4 py-3 focus:border-[#2D5A27] outline-none transition-colors font-[family-name:var(--font-dm-sans)]" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-[#1A1A1A] mb-2 font-[family-name:var(--font-dm-sans)]">Message *</label>
                <textarea required id="message" name="message" rows={5} className="w-full border-2 border-[#2D5A27]/20 rounded-xl px-4 py-3 focus:border-[#2D5A27] outline-none transition-colors font-[family-name:var(--font-dm-sans)] resize-y"></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#e85c2a] text-white rounded-full py-4 btn-text hover:scale-105 hover:brightness-110 transition-all shadow-lg shadow-[#e85c2a]/30 disabled:opacity-70 mt-4"
              >
                {isSubmitting ? "Sending..." : "SEND MESSAGE"}
              </button>
            </motion.form>
          )}
        </div>
      </section>
    </main>
  );
}
