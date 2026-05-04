"use client";

import React, { useState } from "react";
import Image from "next/image";
import * as motion from "framer-motion/client";

export default function WholesalePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/wholesale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_name: data.businessName as string,
          contact_name: data.contactName as string,
          email: data.email as string,
          phone: (data.phone as string) || undefined,
          business_type: (data.businessType as string) || undefined,
          location: (data.location as string) || undefined,
          message: (data.message as string) || undefined,
        }),
      });

      if (!res.ok) {
        setSubmitError("Something went wrong. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full">
      {/* Header */}
      <section className="relative bg-[#2D5A27] pt-32 pb-20 px-6 text-center overflow-hidden">
        <Image src="/brand/onion-turmeric-illustration.png" alt="" width={90} height={90} className="absolute top-6 left-[8%] opacity-15 rotate-6 hidden md:block" />
        <Image src="/brand/chili-pepper.png" alt="" width={60} height={60} className="absolute bottom-6 right-[10%] opacity-15 -rotate-12 hidden md:block" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="heading-hero text-white drop-shadow-[0_3px_14px_rgba(0,0,0,0.55)]">WHOLESALE INQUIRIES</h1>
        </motion.div>
      </section>

      {/* Form Section */}
      <section className="bg-[#FFF8F0] py-16 px-6">
        <div className="max-w-[800px] mx-auto">
          <p className="font-[family-name:var(--font-dm-sans)] text-[#1A1A1A]/80 text-lg mb-10 text-center">
            Interested in carrying Root Soulutions in your store or restaurant? We'd love to partner with you. Fill out the form below and our team will get back to you within 48 hours.
          </p>

          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-12 rounded-[2rem] text-center shadow-sm border border-[#2D5A27]/10"
            >
              <h2 className="heading-sub text-[#2D5A27] mb-4">Thank you!</h2>
              <p className="font-[family-name:var(--font-dm-sans)] text-[#1A1A1A]/70 text-lg">
                We've received your inquiry and will be in touch within 48 hours.
              </p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="mt-8 text-[#e85c2a] font-bold uppercase tracking-wider text-sm hover:underline"
              >
                Submit another inquiry
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
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="businessName" className="block text-sm font-bold text-[#1A1A1A] mb-2 font-[family-name:var(--font-dm-sans)]">Business Name *</label>
                  <input required type="text" id="businessName" name="businessName" className="w-full border-2 border-[#2D5A27]/20 rounded-xl px-4 py-3 focus:border-[#2D5A27] outline-none transition-colors font-[family-name:var(--font-dm-sans)]" />
                </div>
                <div>
                  <label htmlFor="contactName" className="block text-sm font-bold text-[#1A1A1A] mb-2 font-[family-name:var(--font-dm-sans)]">Contact Name *</label>
                  <input required type="text" id="contactName" name="contactName" className="w-full border-2 border-[#2D5A27]/20 rounded-xl px-4 py-3 focus:border-[#2D5A27] outline-none transition-colors font-[family-name:var(--font-dm-sans)]" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-[#1A1A1A] mb-2 font-[family-name:var(--font-dm-sans)]">Email Address *</label>
                  <input required type="email" id="email" name="email" className="w-full border-2 border-[#2D5A27]/20 rounded-xl px-4 py-3 focus:border-[#2D5A27] outline-none transition-colors font-[family-name:var(--font-dm-sans)]" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-[#1A1A1A] mb-2 font-[family-name:var(--font-dm-sans)]">Phone Number</label>
                  <input type="tel" id="phone" name="phone" className="w-full border-2 border-[#2D5A27]/20 rounded-xl px-4 py-3 focus:border-[#2D5A27] outline-none transition-colors font-[family-name:var(--font-dm-sans)]" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="businessType" className="block text-sm font-bold text-[#1A1A1A] mb-2 font-[family-name:var(--font-dm-sans)]">Business Type *</label>
                  <div className="relative">
                    <select required id="businessType" name="businessType" className="w-full border-2 border-[#2D5A27]/20 rounded-xl px-4 py-3 focus:border-[#2D5A27] outline-none transition-colors font-[family-name:var(--font-dm-sans)] appearance-none bg-white">
                      <option value="">Select a business type...</option>
                      <option value="Health Food Store">Health Food Store</option>
                      <option value="Restaurant">Restaurant</option>
                      <option value="Co-op">Co-op</option>
                      <option value="Grocery">Grocery</option>
                      <option value="Specialty">Specialty</option>
                      <option value="Distributor">Distributor</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#2D5A27]">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-bold text-[#1A1A1A] mb-2 font-[family-name:var(--font-dm-sans)]">Location (City, State) *</label>
                  <input required type="text" id="location" name="location" className="w-full border-2 border-[#2D5A27]/20 rounded-xl px-4 py-3 focus:border-[#2D5A27] outline-none transition-colors font-[family-name:var(--font-dm-sans)]" />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-[#1A1A1A] mb-2 font-[family-name:var(--font-dm-sans)]">Message *</label>
                <textarea required id="message" name="message" rows={4} className="w-full border-2 border-[#2D5A27]/20 rounded-xl px-4 py-3 focus:border-[#2D5A27] outline-none transition-colors font-[family-name:var(--font-dm-sans)] resize-y"></textarea>
              </div>

              {submitError && (
                <p className="text-red-600 text-sm text-center font-[family-name:var(--font-dm-sans)]">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#e85c2a] text-white rounded-full py-4 btn-text hover:scale-105 hover:brightness-110 transition-all shadow-lg shadow-[#e85c2a]/30 disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "SEND INQUIRY"}
              </button>
            </motion.form>
          )}
        </div>
      </section>
    </main>
  );
}
