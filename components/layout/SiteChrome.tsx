"use client";

import { Footer } from "@/components/layout/Footer";
import { FloatingNavPills } from "@/components/layout/FloatingNavPills";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";

interface SiteChromeProps {
  children: React.ReactNode;
}

export function SiteChrome({ children }: SiteChromeProps) {
  // AnnouncementBar shown site-wide for promo / conversion strip (page-cro)
  return (
    <>
      <AnnouncementBar />
      <FloatingNavPills topOffset={34} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
