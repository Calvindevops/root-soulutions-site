"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { List, ShoppingBag } from "@phosphor-icons/react";
import { useCart } from "@/lib/cart-context";
import { MobileMenu } from "./MobileMenu";

const LEFT_LINKS = [
  { href: "/", label: "HOME" },
  { href: "/shop", label: "SHOP" },
  { href: "/markets", label: "MARKETS" },
  { href: "/about", label: "OUR STORY" },
];

const RIGHT_LINKS = [
  { href: "/recipes", label: "RECIPES" },
  { href: "/wholesale", label: "WHOLESALE" },
  { href: "/foundation", label: "ROOTING FOR YOU" },
];

interface FloatingNavPillsProps {
  topOffset?: number;
}

const HERO_ROUTES = new Set<string>(["/", "/shop", "/foundation"]);

export function FloatingNavPills({ topOffset = 0 }: FloatingNavPillsProps) {
  const pathname = usePathname();
  const { openCart, itemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const isHero = HERO_ROUTES.has(pathname);
    const computeThreshold = () =>
      isHero ? Math.round(window.innerHeight * 0.7) : 60;
    let threshold = computeThreshold();
    const onScroll = () => setScrolled(window.scrollY > threshold);
    const onResize = () => {
      threshold = computeThreshold();
      onScroll();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [pathname]);

  const linkClass = (href: string) => {
    const active = pathname === href;
    const base =
      "font-[family-name:var(--font-dm-sans)] text-[12px] font-bold uppercase tracking-[0.18em] rounded-full px-3.5 py-1.5 transition-all duration-200 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]";
    if (active) return `${base} bg-[#F5C542] text-[#1A1A1A] shadow-md`;
    return `${base} text-white hover:bg-[#F5C542] hover:text-[#1A1A1A] hover:shadow-lg hover:scale-105`;
  };

  return (
    <>
      <header
        style={{ top: `${topOffset}px` }}
        className={`pointer-events-none fixed inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/55 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.35)] px-3 py-2 md:px-6 md:py-3"
            : "px-3 pt-3 md:px-6 md:pt-5"
        }`}
      >
        <nav className="pointer-events-auto mx-auto flex h-[60px] max-w-[1500px] items-center justify-between gap-4 px-2 md:px-4">
          {/* Mobile hamburger (left) */}
          <div className="flex flex-1 md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
              className="flex h-11 w-11 items-center justify-center rounded-full text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] hover:bg-[#F5C542] hover:text-[#1A1A1A] transition"
            >
              <List size={26} weight="bold" />
            </button>
          </div>

          {/* Desktop left links */}
          <div className="hidden flex-1 items-center gap-1 md:flex">
            {LEFT_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Center logo */}
          <div className="flex flex-shrink-0 justify-center">
            <Link href="/" aria-label="Root Soulutions home" className="block">
              <Image
                src="/brand/rs-logo-text.png"
                alt="Root Soulutions"
                width={200}
                height={48}
                className="h-[48px] w-auto drop-shadow-[0_3px_10px_rgba(0,0,0,0.85)]"
                priority
              />
            </Link>
          </div>

          {/* Mobile cart (right) */}
          <div className="flex flex-1 justify-end md:hidden">
            <button
              type="button"
              onClick={openCart}
              aria-label="Cart"
              className="relative flex h-11 w-11 items-center justify-center rounded-full text-[#F5C542] drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] hover:bg-[#F5C542] hover:text-[#1A1A1A] transition"
            >
              <ShoppingBag size={26} weight="bold" />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#e85c2a] text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Desktop right links + cart */}
          <div className="hidden flex-1 items-center justify-end gap-1 md:flex">
            {RIGHT_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={openCart}
              className="ml-2 flex items-center gap-2 rounded-full border-2 border-[#F5C542] bg-transparent px-4 py-1.5 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] transition hover:bg-[#F5C542] hover:text-[#1A1A1A] hover:scale-105"
            >
              <ShoppingBag size={16} weight="bold" />
              <span className="font-[family-name:var(--font-dm-sans)] text-[12px] font-bold uppercase tracking-[0.18em]">
                CART ({itemCount})
              </span>
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
