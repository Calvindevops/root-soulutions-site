"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollFrameSequenceProps {
  framePattern: string;
  frameCount: number;
  width?: number;
  height?: number;
  scrollHeight?: string;
  className?: string;
  canvasClassName?: string;
  reverse?: boolean;
  children?: ReactNode;
}

const MAX_CONCURRENT_LOADS = 6;

export function ScrollFrameSequence({
  framePattern,
  frameCount,
  width = 1280,
  height = 720,
  scrollHeight = "500vh",
  className = "",
  canvasClassName = "",
  reverse = true,
  children,
}: ScrollFrameSequenceProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [firstReady, setFirstReady] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cancelled = false;
    const imgs: HTMLImageElement[] = new Array(frameCount);
    imagesRef.current = imgs;
    setFirstReady(false);

    const buildUrl = (i: number): string => {
      const idx = String(i + 1).padStart(3, "0");
      return framePattern.replace("%03d", idx);
    };

    const initialIdx = reverse ? frameCount - 1 : 0;

    const loadOrder: number[] = [initialIdx];
    for (let i = 0; i < frameCount; i++) {
      if (i !== initialIdx) loadOrder.push(i);
    }

    const loadOne = (i: number): Promise<void> =>
      new Promise((resolve) => {
        if (cancelled) {
          resolve();
          return;
        }
        const img = new Image();
        img.decoding = "async";
        img.fetchPriority = i === initialIdx ? "high" : "low";
        const finish = () => {
          img.onload = null;
          img.onerror = null;
          if (!cancelled && i === initialIdx && img.complete && img.naturalWidth > 0) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            setFirstReady(true);
          }
          resolve();
        };
        img.onload = finish;
        img.onerror = finish;
        img.src = buildUrl(i);
        imgs[i] = img;
      });

    let cursor = 0;
    const runWorker = async (): Promise<void> => {
      while (!cancelled) {
        const next = cursor++;
        if (next >= loadOrder.length) return;
        await loadOne(loadOrder[next]);
      }
    };

    const workerCount = Math.min(MAX_CONCURRENT_LOADS, frameCount);
    for (let w = 0; w < workerCount; w++) {
      void runWorker();
    }

    return () => {
      cancelled = true;
      for (const img of imgs) {
        if (!img) continue;
        img.onload = null;
        img.onerror = null;
        img.src = "";
      }
      imagesRef.current = [];
    };
  }, [framePattern, frameCount, width, height, reverse]);

  useGSAP(
    () => {
      if (reducedMotion) return;
      const wrap = wrapRef.current;
      const canvas = canvasRef.current;
      if (!wrap || !canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const drawFrame = (n: number) => {
        const idx = Math.max(0, Math.min(frameCount - 1, Math.round(n)));
        const img = imagesRef.current[idx];
        if (img && img.complete && img.naturalWidth > 0) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      };

      const proxy = { f: reverse ? frameCount - 1 : 0 };
      gsap.to(proxy, {
        f: reverse ? 0 : frameCount - 1,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
        onUpdate: () => drawFrame(proxy.f),
      });
    },
    { scope: wrapRef, dependencies: [framePattern, frameCount, reverse, reducedMotion] },
  );

  return (
    <div
      ref={wrapRef}
      className={`relative ${className}`}
      style={{ height: reducedMotion ? "100vh" : scrollHeight }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full object-cover ${canvasClassName}`}
          aria-hidden="true"
        />
        {!firstReady && <div className="absolute inset-0 bg-[#1A1A1A]" />}
        {children}
      </div>
    </div>
  );
}
