import React from "react";

interface ScrollingMarqueeProps {
  text: string;
  bgColor: string;
  textColor: string;
  speed?: number;
}

export function ScrollingMarquee({ text, bgColor, textColor, speed = 25 }: ScrollingMarqueeProps) {
  // Duplicate text 4 times for seamless loop
  const content = `${text} • ${text} • ${text} • ${text} • `;
  
  return (
    <div 
      className="py-4 overflow-hidden relative w-full"
      style={{ backgroundColor: bgColor }}
    >
      <div 
        className="marquee-track flex whitespace-nowrap"
        style={{ animationDuration: `${speed}s` }}
      >
        <div 
          className="text-2xl uppercase tracking-widest font-[family-name:var(--font-bebas)] px-4"
          style={{ color: textColor }}
        >
          {content}
        </div>
        <div 
          className="text-2xl uppercase tracking-widest font-[family-name:var(--font-bebas)] px-4"
          style={{ color: textColor }}
        >
          {content}
        </div>
      </div>
    </div>
  );
}