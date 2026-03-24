"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface RecipeCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  title: string;
}

export default function RecipeCardModal({
  isOpen,
  onClose,
  images,
  title,
}: RecipeCardModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const multiPage = images.length > 1;

  useEffect(() => {
    if (isOpen) setCurrentIndex(0);
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && multiPage)
        setCurrentIndex((i) => Math.min(i + 1, images.length - 1));
      if (e.key === "ArrowLeft" && multiPage)
        setCurrentIndex((i) => Math.max(i - 1, 0));
    },
    [onClose, multiPage, images.length]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-w-2xl w-full mx-auto"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close recipe card"
              className="absolute -top-4 -right-4 z-10 w-10 h-10 rounded-full bg-white text-gray-800 flex items-center justify-center shadow-lg hover:bg-[#e85c2a] hover:text-white transition-colors text-lg font-bold"
            >
              ✕
            </button>

            {/* Image */}
            <div className="relative w-full rounded-[1.5rem] overflow-hidden shadow-2xl bg-gray-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full"
                  style={{ aspectRatio: "3/5" }}
                >
                  <Image
                    src={images[currentIndex]}
                    alt={`${title} — page ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 95vw, 672px"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            {multiPage && (
              <>
                <button
                  onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
                  disabled={currentIndex === 0}
                  aria-label="Previous page"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-gray-800 flex items-center justify-center shadow-md hover:bg-[#e85c2a] hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none"
                >
                  ←
                </button>
                <button
                  onClick={() => setCurrentIndex((i) => Math.min(i + 1, images.length - 1))}
                  disabled={currentIndex === images.length - 1}
                  aria-label="Next page"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-gray-800 flex items-center justify-center shadow-md hover:bg-[#e85c2a] hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none"
                >
                  →
                </button>
                <div className="flex justify-center gap-2 mt-4">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      aria-label={`Go to page ${i + 1}`}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === currentIndex ? "bg-[#e85c2a] scale-125" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            <p className="text-center mt-3 text-white font-[family-name:var(--font-bebas)] text-xl tracking-wide">
              {title}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
