"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 50, suffix: "+", label: "Happy Customers" },
  { value: 3, suffix: "", label: "Signature Blends" },
  { value: 0, suffix: "", label: "Chemicals", prefix: "" },
  { value: 100, suffix: "%", label: "Whole-Food" },
];

function AnimatedNumber({ value, suffix, prefix }: { value: number; suffix: string; prefix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-[#F5C542] text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-bebas)" }}>
      {prefix}{display}{suffix}
    </span>
  );
}

export function SocialProofStrip() {
  return (
    <section className="bg-[#1A1A1A] py-12 border-y border-white/5">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center flex flex-col items-center gap-2">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              <span className="text-white/50 text-sm uppercase tracking-wider font-bold font-[family-name:var(--font-dm-sans)]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
