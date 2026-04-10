import React from "react";
import Image from "next/image";

interface MarqueeIcon {
  src: string;
  alt: string;
}

interface ScrollingMarqueeProps {
  text: string;
  bgColor: string;
  textColor: string;
  speed?: number;
  icons?: MarqueeIcon[];
}

export function ScrollingMarquee({ text, bgColor, textColor, speed = 35, icons }: ScrollingMarqueeProps) {
  // Build a single repeating unit with icon separators
  const segments = text.split("•").map((s) => s.trim()).filter(Boolean);

  const renderUnit = (keyPrefix: string) => (
    <div
      className="flex items-center gap-2 text-2xl uppercase tracking-widest font-[family-name:var(--font-bebas)] px-4 shrink-0"
      style={{ color: textColor }}
      key={keyPrefix}
    >
      {segments.map((segment, i) => (
        <React.Fragment key={`${keyPrefix}-${i}`}>
          <span className="whitespace-nowrap">{segment}</span>
          {icons && icons.length > 0 ? (
            <span className="inline-flex items-center mx-2 shrink-0">
              <Image
                src={icons[i % icons.length].src}
                alt={icons[i % icons.length].alt}
                width={28}
                height={28}
                className="object-contain"
              />
            </span>
          ) : (
            <span className="mx-2">•</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div
      className="py-4 overflow-hidden relative w-full group"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="marquee-track flex whitespace-nowrap group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
      >
        {renderUnit("a")}
        {renderUnit("b")}
        {renderUnit("c")}
        {renderUnit("d")}
      </div>
    </div>
  );
}
