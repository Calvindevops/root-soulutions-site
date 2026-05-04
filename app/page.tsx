import { HeroReassembly } from "@/components/home/HeroReassembly";
import { ValueBadges } from "@/components/home/ValueBadges";
import { SocialProofStrip } from "@/components/home/SocialProofStrip";
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
      {/* 1. HERO — scroll-3D-reassembly (V4 24s reel scrubbed in reverse) */}
      <HeroReassembly />
      <SectionDivider topColor="#1A1A1A" bottomColor="#2D5A27" variant="leaf-wave" />

      {/* 2. STARTER KIT — green */}
      <BundleCTA />
      <SectionDivider topColor="#2D5A27" bottomColor="#FFF8F0" variant="root-pattern" />

      {/* 3. VALUE BADGES — cream */}
      <ValueBadges />

      {/* 3.5 SOCIAL PROOF — dark strip */}
      <SocialProofStrip />

      {/* 4. MARQUEE — orange bridge (dark → purple) */}
      <ScrollingMarquee
        text="FLAVOR • WELLNESS • CULTURE • SOUL"
        bgColor="#e85c2a"
        textColor="white"
        icons={ingredientIcons}
      />

      {/* 5. FOUNDER STORY — purple */}
      <FounderStory />
      <SectionDivider topColor="#6B3FA0" bottomColor="#1A1A1A" variant="root-pattern" />

      {/* 6. MADE WITH SOUL — dark */}
      <FoodShowcase />

      {/* 7. TESTIMONIALS — orange (breaks up dark) */}
      <Testimonials />

      {/* 8. MARQUEE — green bridge (orange → cream) */}
      <ScrollingMarquee
        text="COOK WITH SOUL"
        bgColor="#2D5A27"
        textColor="white"
        icons={ingredientIcons}
      />

      {/* 9. RECIPE PREVIEW — cream */}
      <RecipePreview />
      <SectionDivider topColor="#FFF8F0" bottomColor="#F5C542" variant="root-pattern" />

      {/* 10. FAQ — gold */}
      <FAQSection />
      <SectionDivider topColor="#F5C542" bottomColor="#1A1A1A" variant="root-pattern" />

      {/* 11. NEWSLETTER — dark */}
      <NewsletterSignup />
    </>
  );
}
