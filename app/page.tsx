import { HeroBanner } from "@/components/home/HeroBanner";
import { ValueBadges } from "@/components/home/ValueBadges";
import { ScrollingMarquee } from "@/components/home/ScrollingMarquee";
import { FounderStory } from "@/components/home/FounderStory";
import { BundleCTA } from "@/components/home/BundleCTA";
import { RecipePreview } from "@/components/home/RecipePreview";
import { FoodShowcase } from "@/components/home/FoodShowcase";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";
import { FAQSection } from "@/components/home/FAQSection";
import { Testimonials } from "@/components/home/Testimonials";
import { SectionDivider } from "@/components/ui/SectionDivider";

const ingredientIcons = [
  { src: "/brand/chili-pepper.png", alt: "chili pepper" },
  { src: "/brand/garlic-illustration.png", alt: "garlic" },
];

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <SectionDivider topColor="#1A1A1A" bottomColor="#2D5A27" variant="leaf-wave" />
      <BundleCTA />
      <SectionDivider topColor="#2D5A27" bottomColor="#FFF8F0" variant="root-pattern" />
      <ValueBadges />
      <ScrollingMarquee
        text="FLAVOR • WELLNESS • CULTURE • SOUL 🌿"
        bgColor="#1A1A1A"
        textColor="#F5C542"
        icons={ingredientIcons}
      />
      <FounderStory />
      <SectionDivider topColor="#6B3FA0" bottomColor="#1A1A1A" variant="root-pattern" />
      <FoodShowcase />
      <Testimonials />
      <ScrollingMarquee
        text="COOK WITH SOUL"
        bgColor="#1A1A1A"
        textColor="#F5C542"
        icons={ingredientIcons}
      />
      <RecipePreview />
      <SectionDivider topColor="#FFF8F0" bottomColor="#F5C542" variant="root-pattern" />
      <FAQSection />
      <SectionDivider topColor="#F5C542" bottomColor="#1A1A1A" variant="root-pattern" />
      <NewsletterSignup />
    </>
  );
}
