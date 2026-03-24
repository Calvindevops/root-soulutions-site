"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChartBar,
  Package,
  ShoppingCart,
  Users,
  Handshake,
  ChatCircle,
  Envelope
} from "@phosphor-icons/react";

const navLinks = [
  { name: "Dashboard", href: "/admin", icon: ChartBar },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Wholesale", href: "/admin/wholesale", icon: Handshake },
  { name: "Messages", href: "/admin/messages", icon: ChatCircle },
  { name: "Subscribers", href: "/admin/subscribers", icon: Envelope },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 w-64 h-screen bg-[#1A1A1A] flex flex-col z-50">
      <div className="p-6">
        <h1 className="text-[#F5C542] text-xl tracking-wider" style={{ fontFamily: 'var(--font-accent), sans-serif' }}>ROOT SOULUTIONS</h1>
      </div>
      <div className="px-6 mb-4">
        <span className="text-xs text-white/40 uppercase tracking-widest">ADMIN PANEL</span>
      </div>
      <nav className="flex-1 flex flex-col space-y-1 px-3">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/admin');
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center px-3 py-3 rounded-lg transition ${
                isActive
                  ? "bg-[#2D5A27] text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon weight="regular" size={20} className="mr-3 shrink-0" />
              {link.name}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 mt-auto">
        <Link href="/" className="block text-white/40 text-sm px-6 py-6 hover:text-white transition">
          ← Back to Site
        </Link>
      </div>
    </div>
  );
}
