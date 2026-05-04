"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface ScrollScrubVideoProps {
  src: string;
  poster?: string;
  scrollHeight?: string;
  className?: string;
  videoClassName?: string;
  reverse?: boolean;
  children?: ReactNode;
}

export function ScrollScrubVideo({
  src,
  poster,
  scrollHeight = "500vh",
  className = "",
  videoClassName = "",
  reverse = true,
  children,
}: ScrollScrubVideoProps) {
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
    { scope: wrapRef, dependencies: [src, reverse, reducedMotion] },
  );

  return (
    <div
      ref={wrapRef}
      className={`relative ${className}`}
      style={{ height: reducedMotion ? "100vh" : scrollHeight }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          preload={reducedMotion ? "none" : inView ? "auto" : "metadata"}
          className={`absolute inset-0 h-full w-full object-cover ${videoClassName}`}
        />
        {children}
      </div>
    </div>
  );
}
