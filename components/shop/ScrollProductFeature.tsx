"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface ScrollProductFeatureProps {
  videoSrc: string;
  side?: "left" | "right";
  scrollHeight?: string;
  reverse?: boolean;
  className?: string;
  videoClassName?: string;
  children: ReactNode;
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollProductFeature({
  videoSrc,
  side = "left",
  scrollHeight = "250vh",
  reverse = false,
  className = "",
  videoClassName = "",
  children,
}: ScrollProductFeatureProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100% 0px 100% 0px" },
    );
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      if (reducedMotion) return;
      const wrap = wrapRef.current;
      const video = videoRef.current;
      if (!wrap || !video) return;

      const init = () => {
        const duration = video.duration;
        if (!duration || !isFinite(duration)) return;
        video.currentTime = reverse ? duration : 0;
        gsap.to(video, {
          currentTime: reverse ? 0 : duration,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });
      };

      if (video.readyState >= 1) {
        init();
      } else {
        video.addEventListener("loadedmetadata", init, { once: true });
      }
    },
    { scope: wrapRef, dependencies: [videoSrc, reverse, reducedMotion] },
  );

  const jarOnLeft = side === "left";

  const jar = (
    <div className="relative h-[50vh] md:h-full overflow-hidden">
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        preload={reducedMotion ? "none" : inView ? "auto" : "metadata"}
        className={`absolute inset-0 h-full w-full object-cover ${videoClassName}`}
      />
      {/* Inner-edge fade so the video bleeds into the adjacent black card half */}
      <div
        className={`pointer-events-none absolute inset-y-0 w-1/3 ${
          jarOnLeft
            ? "right-0 bg-gradient-to-r from-transparent to-black"
            : "left-0 bg-gradient-to-l from-transparent to-black"
        }`}
      />
    </div>
  );

  const content = (
    <div className="relative h-[50vh] md:h-full flex items-center justify-center px-6 md:px-12">
      {children}
    </div>
  );

  return (
    <div
      ref={wrapRef}
      className={`relative ${className}`}
      style={{ height: reducedMotion ? "100vh" : scrollHeight }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          {jarOnLeft ? (
            <>
              {jar}
              {content}
            </>
          ) : (
            <>
              {content}
              {jar}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
