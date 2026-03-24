"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { List, ShoppingBag } from "@phosphor-icons/react";
import { useCart } from "@/lib/cart-context";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const { openCart, itemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-[34px] bg-[#2D5A27] h-[70px] z-50 flex items-center justify-between px-4 md:px-8 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
        {/* Mobile Left */}
        <div className="md:hidden flex-1">
          <button onClick={() => setIsMobileMenuOpen(true)} aria-label="Open Menu" className="flex items-center">
            <List size={28} color="white" weight="regular" />
          </button>
        </div>

        {/* Desktop Left */}
        <div className="hidden md:flex flex-1 gap-6">
          <Link href="/" className="text-white uppercase font-[family-name:var(--font-dm-sans)] font-bold text-[14px] tracking-wider hover:opacity-80 transition">HOME</Link>
          <Link href="/shop" className="text-white uppercase font-[family-name:var(--font-dm-sans)] font-bold text-[14px] tracking-wider hover:opacity-80 transition">SHOP</Link>
          <Link href="/markets" className="text-white uppercase font-[family-name:var(--font-dm-sans)] font-bold text-[14px] tracking-wider hover:opacity-80 transition">MARKETS</Link>
          <Link href="/about" className="text-white uppercase font-[family-name:var(--font-dm-sans)] font-bold text-[14px] tracking-wider hover:opacity-80 transition">OUR STORY</Link>
        </div>

        {/* Center */}
        <div className="flex-shrink-0 flex justify-center">
          <Link href="/" className="block">
            <Image
              src="/brand/rs-logo-text.png"
              alt="Root Soulutions"
              width={180}
              height={38}
              className="h-[35px] w-auto"
              priority
            />
          </Link>
        </div>

        {/* Mobile Right */}
        <div className="md:hidden flex-1 flex justify-end">
          <button onClick={openCart} className="relative text-white flex items-center" aria-label="Cart">
            <ShoppingBag size={28} weight="regular" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#e85c2a] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{itemCount}</span>
            )}
          </button>
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex flex-1 gap-6 items-center justify-end">
          <Link href="/recipes" className="text-white uppercase font-[family-name:var(--font-dm-sans)] font-bold text-[14px] tracking-wider hover:opacity-80 transition">RECIPES</Link>
          <Link href="/wholesale" className="text-white uppercase font-[family-name:var(--font-dm-sans)] font-bold text-[14px] tracking-wider hover:opacity-80 transition">WHOLESALE</Link>
          <button onClick={openCart} className="rounded-full border border-white px-4 py-1.5 text-white flex items-center gap-2 hover:bg-white hover:text-[#2D5A27] transition">
            <span className="font-[family-name:var(--font-dm-sans)] font-bold text-[14px] tracking-wider">CART ({itemCount})</span>
          </button>
        </div>
      </nav>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}