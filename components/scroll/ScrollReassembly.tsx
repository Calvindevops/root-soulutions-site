"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ScrollFrameSequence } from "./ScrollFrameSequence";
import { ScrollScrubVideo } from "./ScrollScrubVideo";

interface ScrollReassemblyProps {
  videoSrc: string;
  framePattern: string;
  frameCount: number;
  width?: number;
  height?: number;
  scrollHeight?: string;
  className?: string;
  mediaClassName?: string;
  reverse?: boolean;
  children?: ReactNode;
}

type Backend = "video" | "frames" | "pending";

function isSafari(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const looksLikeSafari = /safari/i.test(ua);
  const isOtherBrowser = /chrome|chromium|android|crios|fxios|edgios|edg\//i.test(ua);
  return looksLikeSafari && !isOtherBrowser;
}

export function ScrollReassembly({
  videoSrc,
  framePattern,
  frameCount,
  width,
  height,
  scrollHeight = "500vh",
  className = "",
  mediaClassName = "",
  reverse = true,
  children,
}: ScrollReassemblyProps) {
  // "pending" until we've run the client-side check — keeps SSR + first paint stable.
  const [backend, setBackend] = useState<Backend>("pending");

  useEffect(() => {
    setBackend(isSafari() ? "frames" : "video");
  }, []);

  if (backend === "pending") {
    return (
      <div
        className={`relative ${className}`}
        style={{ height: scrollHeight }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#1A1A1A]">
          {children}
        </div>
      </div>
    );
  }

  if (backend === "frames") {
    return (
      <ScrollFrameSequence
        framePattern={framePattern}
        frameCount={frameCount}
        width={width}
        height={height}
        scrollHeight={scrollHeight}
        className={className}
        canvasClassName={mediaClassName}
        reverse={reverse}
      >
        {children}
      </ScrollFrameSequence>
    );
  }

  return (
    <ScrollScrubVideo
      src={videoSrc}
      scrollHeight={scrollHeight}
      className={className}
      videoClassName={mediaClassName}
      reverse={reverse}
    >
      {children}
    </ScrollScrubVideo>
  );
}
