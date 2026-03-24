import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Bebas_Neue } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Root Soulutions | Whole-Food Seasonings Crafted with SOUL",
  description:
    "Low-sodium, chemical-free, whole-food seasoning blends by Craft Eatery Food Genius Company L.L.C. Crafted with SOUL — Simplicity, Organic alignment, Uncompromised quality, Lifestyle-forward flavor.",
  keywords: [
    "seasoning",
    "low sodium",
    "whole food",
    "chemical free",
    "artisan spices",
    "root soulutions",
    "craft eatery",
  ],
  openGraph: {
    title: "Root Soulutions | Whole-Food Seasonings Crafted with SOUL",
    description:
      "Low-sodium, chemical-free, whole-food seasoning blends. No fillers. No shortcuts. Just honest flavor that nourishes.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${bebas.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
