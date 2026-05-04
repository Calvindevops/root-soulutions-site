"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

interface FadeInProps {
  delay: number;
  duration: number;
  className?: string;
  children: ReactNode;
}

function FadeIn({ delay, duration, className = "", children }: FadeInProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), delay);
    return () => window.clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-opacity ${className}`}
      style={{ opacity: visible ? 1 : 0, transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
}

interface AnimatedHeadingProps {
  text: string;
  delay?: number;
  duration?: number;
  charDelay?: number;
  className?: string;
  style?: CSSProperties;
}

function AnimatedHeading({
  text,
  delay = 200,
  duration = 500,
  charDelay = 30,
  className = "",
  style,
}: AnimatedHeadingProps) {
  const [visible, setVisible] = useState(false);
  const lines = text.split("\n");

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), delay);
    return () => window.clearTimeout(timer);
  }, [delay]);

  return (
    <div className={className} style={style}>
      {lines.map((line, lineIndex) => (
        <div key={`${line}-${lineIndex}`} className="block">
          {line.split("").map((char, charIndex) => {
            const transitionDelay = lineIndex * line.length * charDelay + charIndex * charDelay;

            return (
              <span
                key={`${lineIndex}-${charIndex}-${char}`}
                className="inline-block"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-18px)",
                  transitionProperty: "opacity, transform",
                  transitionDuration: `${duration}ms`,
                  transitionTimingFunction: "ease",
                  transitionDelay: `${transitionDelay}ms`,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function FoundationHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      <video
        className="absolute inset-0 h-full w-full object-contain"
        style={{ objectPosition: "center 35%" }}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/rooting-foundation-hero.webm" type="video/webm" />
        <source src="/videos/rooting-foundation-hero.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Inline nav removed — SiteChrome renders FloatingNavPills on /foundation */}

        <div className="flex flex-1 flex-col justify-end px-6 pb-12 pt-32 md:px-12 lg:px-16 lg:pb-16">
          <div className="lg:grid lg:grid-cols-2 lg:items-end">
            <div className="max-w-3xl">
              <FadeIn delay={600} duration={900} className="mb-6">
                <div className="flex flex-wrap gap-3">
                  {["WHOLE-FOOD MEALS", "WHOLE-LIFE EDUCATION", "ROOTED SUPPORT"].map((pill) => (
                    <span
                      key={pill}
                      className="rounded-full border-2 border-[#F5C542]/70 bg-black/45 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#F5C542] backdrop-blur-sm"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </FadeIn>

              <AnimatedHeading
                text={"Rooting for every child\nto thrive from within."}
                className="heading-hero mb-6 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
              />

              <FadeIn delay={800} duration={1000} className="mb-7">
                <p className="max-w-2xl text-lg text-white md:text-xl font-[family-name:var(--font-dm-sans)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  We transform communities through whole-food school meals, whole-life
                  education, and rooted support for children and families.
                </p>
              </FadeIn>

              <FadeIn delay={1200} duration={1000}>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="bg-[#e85c2a] text-white rounded-full px-12 py-4 btn-text inline-block hover:scale-105 hover:brightness-110 transition-all shadow-lg shadow-[#e85c2a]/30"
                  >
                    SUPPORT THE MISSION
                  </Link>
                  <a
                    href="#story"
                    className="bg-transparent text-[#F5C542] border-2 border-[#F5C542] rounded-full px-12 py-4 btn-text inline-block hover:bg-[#F5C542] hover:text-[#1A1A1A] hover:scale-105 transition-all"
                  >
                    READ THE STORY
                  </a>
                </div>
              </FadeIn>
            </div>

            <div className="mt-10 flex items-end justify-start lg:mt-0 lg:justify-end">
              <FadeIn delay={1400} duration={1000}>
                <div className="liquid-glass rounded-xl border-2 border-[#F5C542]/50 px-6 py-4">
                  <p className="heading-card text-[#F5C542] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                    Whole food. Whole life. Whole community.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
