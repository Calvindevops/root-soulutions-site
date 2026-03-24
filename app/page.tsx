import { HeroBanner } from "@/components/home/HeroBanner";
import { ProductCards } from "@/components/home/ProductCards";
import { ValueBadges } from "@/components/home/ValueBadges";
import { ScrollingMarquee } from "@/components/home/ScrollingMarquee";
import { FounderStory } from "@/components/home/FounderStory";
import { BundleCTA } from "@/components/home/BundleCTA";
import { RecipePreview } from "@/components/home/RecipePreview";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      {/* Leaf-wave divider: hero (dark/image) → products (orange) */}
      <SectionDivider topColor="#1A1A1A" bottomColor="#e85c2a" variant="leaf-wave" />
      <ProductCards />
      {/* Leaf-wave divider: products (orange) → badges (cream) */}
      <SectionDivider topColor="#e85c2a" bottomColor="#FFF8F0" variant="leaf-wave" />
      <ValueBadges />
      <ScrollingMarquee text="FLAVOR • WELLNESS • CULTURE • SOUL 🌿" bgColor="#1A1A1A" textColor="#F5C542" />
      <FounderStory />
      {/* Root-pattern divider: founder (purple) → bundle (black) */}
      <SectionDivider topColor="#6B3FA0" bottomColor="#1A1A1A" variant="root-pattern" />
      <BundleCTA />
      <ScrollingMarquee text="COOK WITH SOUL 🍳" bgColor="#e85c2a" textColor="white" />
      <RecipePreview />
      {/* Root-pattern divider: recipes (orange) → newsletter (gold) */}
      <SectionDivider topColor="#e85c2a" bottomColor="#F5C542" variant="root-pattern" />
      <NewsletterSignup />
    </>
  );
}
