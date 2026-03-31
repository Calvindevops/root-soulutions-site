import React from "react";
import Image from "next/image";
import * as motion from "framer-motion/client";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Link from "next/link";
import { Market } from "@/lib/types";

const marketsData: Market[] = [
  { 
    name: "Jersey City Farmers Market", 
    address: "Journal Square, Jersey City, NJ", 
    day: "Saturdays", 
    hours: "9am - 3pm",
    mapsUrl: "https://maps.google.com" 
  },
  {
    name: "Hoboken Farmers Market",
    address: "Sinatra Dr, Hoboken, NJ",
    day: "Sundays",
    hours: "10am - 4pm",
    mapsUrl: "https://maps.google.com"
  },
  {
    name: "Riverview Park Farmers Market",
    address: "Riverview Park, Union City, NJ",
    day: "Saturdays",
    hours: "9am - 3pm",
    mapsUrl: "https://maps.google.com/?q=Riverview+Park+Union+City+NJ"
  }
];

export default function MarketsPage() {
  return (
    <main className="w-full">
      {/* Header */}
      <section className="relative bg-[#2D5A27] py-20 px-6 text-center overflow-hidden">
        <Image src="/brand/chili-pepper.png" alt="" width={70} height={70} className="absolute top-8 left-[8%] opacity-15 rotate-12 hidden md:block" />
        <Image src="/brand/garlic-illustration.png" alt="" width={60} height={60} className="absolute bottom-8 right-[10%] opacity-15 -rotate-6 hidden md:block" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="heading-hero text-white mb-4">FIND US AT THE MARKET</h1>
          <p className="font-[family-name:var(--font-dm-sans)] text-white/70 text-lg">
            Fresh seasonings. Real conversations. See you there.
          </p>
        </motion.div>
      </section>

      {/* Market Schedule */}
      <section className="bg-[#FFF8F0] py-16 px-6">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="max-w-[900px] mx-auto"
        >
          {marketsData.map((market, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInUp}
              className="bg-white rounded-[1.5rem] p-6 shadow-sm mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <h3 className="font-[family-name:var(--font-dm-sans)] font-bold text-lg text-[#2D5A27] mb-2">
                  {market.name}
                </h3>
                <div className="font-[family-name:var(--font-dm-sans)] text-[#1A1A1A]/60 flex flex-col sm:flex-row sm:gap-4">
                  <span>{market.address}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{market.day}, {market.hours}</span>
                </div>
              </div>
              <a 
                href={market.mapsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[#e85c2a] font-bold text-sm uppercase tracking-wider hover:underline"
              >
                GET DIRECTIONS
              </a>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="bg-[#FFF8F0] py-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="heading-section text-[#2D5A27] mb-6">SAW US AT THE MARKET?</h2>
          <p className="font-[family-name:var(--font-dm-sans)] text-[#1A1A1A]/70 text-lg mb-8 max-w-xl mx-auto">
            Missed grabbing your favorite blend? You can shop our full collection online and have it shipped directly to your kitchen.
          </p>
          <Link
            href="/shop"
            className="bg-[#e85c2a] text-white rounded-full px-12 py-4 btn-text inline-block hover:scale-105 hover:brightness-110 transition-all shadow-lg shadow-[#e85c2a]/30"
          >
            SHOP NOW
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
