"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X, InstagramLogo, TiktokLogo, FacebookLogo } from "@phosphor-icons/react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const links = [
    { label: "HOME", href: "/" },
    { label: "SHOP", href: "/shop" },
    { label: "OUR STORY", href: "/about" },
    { label: "MARKETS", href: "/markets" },
    { label: "RECIPES", href: "/recipes" },
    { label: "WHOLESALE", href: "/wholesale" },
    { label: "CONTACT", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "ROOTING FOR YOU", href: "/foundation" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed inset-0 bg-[#2D5A27] z-[60] flex flex-col"
        >
          {/* Header */}
          <div className="flex justify-end p-6">
            <button onClick={onClose} aria-label="Close Menu" className="text-white hover:opacity-80 transition flex items-center">
              <X size={32} weight="regular" />
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 flex flex-col px-8 gap-6 pt-4">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={onClose}
                className="font-[family-name:var(--font-bebas)] text-3xl text-white uppercase tracking-wider hover:text-[#F5C542] transition"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Footer Socials */}
          <div className="p-8 border-t border-white/10 flex gap-6 mt-auto">
            <a href="#" aria-label="Instagram" className="text-white hover:text-[#F5C542] transition">
              <InstagramLogo size={32} weight="fill" />
            </a>
            <a href="#" aria-label="TikTok" className="text-white hover:text-[#F5C542] transition">
              <TiktokLogo size={32} weight="fill" />
            </a>
            <a href="#" aria-label="Facebook" className="text-white hover:text-[#F5C542] transition">
              <FacebookLogo size={32} weight="fill" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}