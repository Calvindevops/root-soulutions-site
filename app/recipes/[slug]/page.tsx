import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { recipes } from "@/lib/recipes";
import type { Recipe } from "@/lib/types";

interface PageParams {
  params: Promise<{ slug: string }>;
}

const BLEND_TO_PRODUCT: Record<string, { handle: string; title: string }> = {
  "simple-szn": {
    handle: "low-sodium-simple-szn-complete-seasoning",
    title: "Simple SZN",
  },
  "smokey-cajun-szn": {
    handle: "low-sodium-smokey-cajun-szn",
    title: "Smokey Cajun SZN",
  },
  "garlicky-szn": {
    handle: "low-sodium-garlicky-szn-blend",
    title: "Garlicky SZN",
  },
  "holy-trinity-szn": {
    handle: "soulutions-starter-kit",
    title: "Holy Trinity Bundle",
  },
};

export function generateStaticParams() {
  return recipes.filter((r) => r.hasRecipeCard).map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.slug === slug);
  if (!recipe) return { title: "Recipe not found" };
  return {
    title: `${recipe.title} | Root Soulutions Recipe`,
    description: `${recipe.title} made with Root Soulutions ${recipe.blendLabel}. Whole-food, low-sodium, chemical-free.`,
    openGraph: {
      title: recipe.title,
      description: `Made with Root Soulutions ${recipe.blendLabel}.`,
      images: [recipe.image],
    },
  };
}

function relatedRecipes(current: Recipe): Recipe[] {
  return recipes
    .filter((r) => r.hasRecipeCard && r.slug !== current.slug && r.blend === current.blend)
    .slice(0, 3);
}

export default async function RecipePage({ params }: PageParams) {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.slug === slug);
  if (!recipe || !recipe.hasRecipeCard) notFound();

  const product = BLEND_TO_PRODUCT[recipe.blend];
  const related = relatedRecipes(recipe);

  // Recipe schema for SEO (Google rich result)
  const recipeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    image: [recipe.image],
    description: `${recipe.title} made with Root Soulutions ${recipe.blendLabel}. Whole-food, low-sodium.`,
    keywords: `low sodium, whole food, chemical free, ${recipe.blendLabel.toLowerCase()}`,
    recipeCategory: "Main course",
    recipeCuisine: "American",
    author: { "@type": "Organization", name: "Root Soulutions" },
  };

  return (
    <main className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeJsonLd) }}
      />

      {/* Hero */}
      <section className="relative bg-[#1A1A1A] pt-32 pb-16 px-6 text-center overflow-hidden">
        <div className="max-w-[900px] mx-auto">
          <Link
            href="/recipes"
            className="inline-block mb-4 text-[#F5C542]/70 hover:text-[#F5C542] text-[11px] font-bold uppercase tracking-[0.22em] font-[family-name:var(--font-dm-sans)]"
          >
            ← All Recipes
          </Link>
          <span className="inline-block mb-4 rounded-full border-2 border-[#F5C542]/70 bg-black/45 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#F5C542]">
            Made with {recipe.blendLabel}
          </span>
          <h1 className="heading-hero text-white drop-shadow-[0_3px_14px_rgba(0,0,0,0.55)]">
            {recipe.title}
          </h1>
        </div>
      </section>

      {/* Recipe card image + Shop CTA */}
      <section className="bg-[#FFF8F0] py-16 px-6">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-3 gap-10 items-start">
          <div className="md:col-span-2">
            <div className="rounded-[1.5rem] overflow-hidden shadow-2xl ring-1 ring-black/5 bg-black">
              {(recipe.recipeCards ?? [recipe.image]).map((img, i) => (
                <div key={img} className="relative w-full" style={{ aspectRatio: "3/4" }}>
                  <Image
                    src={img}
                    alt={`${recipe.title} — step ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 700px"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>

          <aside className="md:col-span-1 space-y-6">
            {product && (
              <div className="rounded-[1.5rem] border-2 border-[#F5C542] bg-[#2D5A27] p-6 text-white">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#F5C542] mb-2 font-[family-name:var(--font-dm-sans)] font-bold">
                  Shop the Blend
                </p>
                <h3 className="heading-card text-white mb-3">{product.title}</h3>
                <p className="text-white/80 text-sm mb-5 font-[family-name:var(--font-dm-sans)]">
                  The exact blend used in this recipe. Whole-food, low-sodium, chemical-free.
                </p>
                <Link
                  href={`/products/${product.handle}`}
                  className="block text-center bg-[#e85c2a] text-white rounded-full px-6 py-3 btn-text hover:scale-105 hover:brightness-110 transition-all shadow-lg shadow-[#e85c2a]/30"
                >
                  GET {product.title.toUpperCase()}
                </Link>
              </div>
            )}

            <div className="rounded-[1.5rem] bg-white p-6 ring-1 ring-black/5 shadow">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#2D5A27] mb-3 font-[family-name:var(--font-dm-sans)] font-bold">
                Quick facts
              </p>
              <dl className="space-y-2 text-sm font-[family-name:var(--font-dm-sans)] text-[#1A1A1A]">
                <div className="flex justify-between">
                  <dt className="text-[#1A1A1A]/60">Blend</dt>
                  <dd className="font-bold">{recipe.blendLabel}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#1A1A1A]/60">Diet</dt>
                  <dd className="font-bold">Low Sodium · Whole Food</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#1A1A1A]/60">Made With</dt>
                  <dd className="font-bold">SOUL 💛</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      {/* Related recipes */}
      {related.length > 0 && (
        <section className="bg-[#FFF8F0] py-12 px-6 border-t border-[#1A1A1A]/10">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="heading-section text-[#2D5A27] mb-8 text-center">
              More with {recipe.blendLabel}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/recipes/${r.slug}`}
                  className="group rounded-[1.25rem] overflow-hidden shadow-lg ring-1 ring-black/5 bg-white hover:scale-[1.03] transition-transform"
                >
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image
                      src={r.image}
                      alt={r.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 360px"
                    />
                  </div>
                  <div className="p-4">
                    <span className="bg-[#F5C542] text-[#1A1A1A] rounded-full px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider inline-block mb-2 font-[family-name:var(--font-dm-sans)]">
                      {r.blendLabel}
                    </span>
                    <h3 className="font-[family-name:var(--font-dm-sans)] font-bold text-[#1A1A1A] text-sm leading-tight">
                      {r.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
