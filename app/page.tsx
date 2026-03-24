import { HeroBanner } from "@/components/home/HeroBanner";
import { ProductCards } from "@/components/home/ProductCards";
import { ValueBadges } from "@/components/home/ValueBadges";
import { ScrollingMarquee } from "@/components/home/ScrollingMarquee";
import { FounderStory } from "@/components/home/FounderStory";
import { BundleCTA } from "@/components/home/BundleCTA";
import { RecipePreview } from "@/components/home/RecipePreview";
import { FoodShowcase } from "@/components/home/FoodShowcase";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";
import { SectionDivider } from "@/components/ui/SectionDivider";

const chilliIcon = [
  { src: "/brand/chili-pepper.png", alt: "chili pepper" },
  { src: "/brand/garlic-illustration.png", alt: "garlic" },
];

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      {/* Hero → Products */}
      <SectionDivider topColor="#1A1A1A" bottomColor="#e85c2a" variant="leaf-wave" />
      <ProductCards />

      {/* Products → White badge section */}
      <SectionDivider topColor="#e85c2a" bottomColor="#FFF8F0" variant="root-pattern" />
      <ValueBadges />

      {/* Dark marquee bar with custom ingredient icons */}
      <ScrollingMarquee
        text="FLAVOR • WELLNESS • CULTURE • SOUL 🌿"
        bgColor="#1A1A1A"
        textColor="#F5C542"
        icons={chilliIcon}
      />

      {/* White section → Founder (purple) */}
      <SectionDivider topColor="#FFFFFF" bottomColor="#6B3FA0" variant="root-pattern" />
      <FounderStory />

      {/* Founder (purple) → White divider → Bundle (black) */}
      <SectionDivider topColor="#6B3FA0" bottomColor="#FFFFFF" variant="root-pattern" />
      <div className="bg-white py-4" />
      <SectionDivider topColor="#FFFFFF" bottomColor="#1A1A1A" variant="root-pattern" />
      <BundleCTA />

      {/* Bundle → White → Food showcase scroll */}
      <SectionDivider topColor="#1A1A1A" bottomColor="#FFFFFF" variant="root-pattern" />
      <FoodShowcase />

      {/* White marquee bar with custom icons */}
      <ScrollingMarquee
        text="COOK WITH SOUL"
        bgColor="#1A1A1A"
        textColor="white"
        icons={chilliIcon}
      />

      {/* White → Recipes (orange) */}
      <SectionDivider topColor="#1A1A1A" bottomColor="#e85c2a" variant="root-pattern" />
      <RecipePreview />

      {/* Recipes → White → Newsletter */}
      <SectionDivider topColor="#e85c2a" bottomColor="#FFFFFF" variant="root-pattern" />
      <div className="bg-white py-4" />
      <SectionDivider topColor="#FFFFFF" bottomColor="#F5C542" variant="root-pattern" />
      <NewsletterSignup />
    </>
  );
}
