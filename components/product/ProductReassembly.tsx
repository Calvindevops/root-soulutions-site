import { ScrollReassembly } from "@/components/scroll/ScrollReassembly";

const PRODUCT_FRAMES_BY_HANDLE: Record<string, { slug: string; tagline: string }> = {
  "low-sodium-smokey-cajun-szn": {
    slug: "smokey-cajun-reassembly",
    tagline: "Smoke. Heat. Soul.",
  },
  "low-sodium-simple-szn-complete-seasoning": {
    slug: "simple-szn-reassembly",
    tagline: "Simple. Honest. Whole.",
  },
  "low-sodium-garlicky-szn-blend": {
    slug: "garlicky-szn-reassembly",
    tagline: "Garlic. Herbs. Depth.",
  },
  "soulutions-starter-kit": {
    slug: "lineup-shot",
    tagline: "The whole lineup.",
  },
};

interface ProductReassemblyProps {
  handle: string;
  title: string;
}

export function ProductReassembly({ handle, title }: ProductReassemblyProps) {
  const config = PRODUCT_FRAMES_BY_HANDLE[handle];
  if (!config) return null;

  return (
    <ScrollReassembly
      videoSrc={`/videos/${config.slug}.mp4`}
      framePattern={`/frames/${config.slug}/f%03d.jpg`}
      frameCount={60}
      scrollHeight="250vh"
      className="bg-[#1A1A1A]"
      mediaClassName="brightness-95"
      reverse
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      <div className="relative z-10 h-full flex flex-col justify-end items-center pb-20 px-6 text-center">
        <h2 className="heading-section text-[#F5C542] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          {title}
        </h2>
        <p className="mt-4 text-xl md:text-2xl text-white font-[family-name:var(--font-dm-sans)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          {config.tagline}
        </p>
      </div>
    </ScrollReassembly>
  );
}
