"use client";

import { useState } from "react";
import Image from "next/image";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

interface ProductImageCarouselProps {
  images: string[];
  title: string;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
}

export function ProductImageCarousel({
  images,
  title,
  gradientFrom,
  gradientTo,
  accentColor,
}: ProductImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMultiple = images.length > 1;

  const prev = () => setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="relative">
      <div
        className="aspect-square rounded-[2rem] flex items-center justify-center relative overflow-hidden mb-4 md:mb-0 shadow-2xl"
        style={{
          background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
        }}
      >
        {images[currentIndex] ? (
          <Image
            src={images[currentIndex]}
            alt={`${title} - image ${currentIndex + 1}`}
            fill
            className="object-contain p-12"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <span
            className="text-4xl text-center px-4 font-bold"
            style={{ color: accentColor }}
          >
            {title}
          </span>
        )}

        {/* Navigation arrows */}
        {hasMultiple && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center transition-colors"
              aria-label="Previous image"
            >
              <CaretLeft size={22} weight="bold" color="white" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center transition-colors"
              aria-label="Next image"
            >
              <CaretRight size={22} weight="bold" color="white" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail dots */}
      {hasMultiple && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentIndex
                  ? "scale-110"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              style={idx === currentIndex ? { backgroundColor: accentColor } : undefined}
              aria-label={`View image ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
