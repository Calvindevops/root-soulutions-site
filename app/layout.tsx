import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Bebas_Neue } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { WelcomePopup } from "@/components/ui/WelcomePopup";
import { SiteChrome } from "@/components/layout/SiteChrome";
import SmoothScroll from "@/lib/SmoothScroll";
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <SmoothScroll />
          <SiteChrome>{children}</SiteChrome>
          <CartDrawer />
          <WelcomePopup />
        </CartProvider>
      </body>
    </html>
  );
}
