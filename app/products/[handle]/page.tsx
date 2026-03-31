import { notFound } from "next/navigation";
import Image from "next/image";
import { getMergedProductByHandle, getMergedRelatedProducts } from "@/lib/fetch-products";
import { Star, Leaf } from "@phosphor-icons/react/dist/ssr";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";
import { RelatedProductCard } from "@/components/product/RelatedProductCard";
import { ScrollingMarquee } from "@/components/home/ScrollingMarquee";

// Revalidate every 60 seconds so Shopify images stay fresh
export const revalidate = 60;

export function generateStaticParams() {
  return [
    { handle: "low-sodium-simple-szn-complete-seasoning" },
    { handle: "low-sodium-smokey-cajun-szn" },
    { handle: "low-sodium-garlicky-szn-blend" },
    { handle: "soulutions-starter-kit" },
  ];
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const resolvedParams = await params;
  const handle = resolvedParams.handle;
  const product = await getMergedProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getMergedRelatedProducts(handle);

  return (
    <main>
      {/* Hero Product Section */}
      <section className="relative bg-[#2D5A27] py-16 overflow-hidden">
        <Image src="/brand/chili-pepper.png" alt="" width={70} height={70} className="absolute top-10 left-[3%] opacity-10 rotate-12 hidden lg:block" />
        <Image src="/brand/garlic-illustration.png" alt="" width={60} height={60} className="absolute bottom-10 right-[3%] opacity-10 -rotate-6 hidden lg:block" />

        <div className="max-w-[1400px] mx-auto px-6 md:grid md:grid-cols-2 gap-12 items-start">
          <div
            className="aspect-square rounded-[2rem] flex items-center justify-center relative overflow-hidden mb-8 md:mb-0 shadow-2xl"
            style={{
              background: `linear-gradient(to bottom, ${product.gradient_from}, ${product.gradient_to})`
            }}
          >
            {product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                className="object-contain p-12"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <span className="text-4xl text-center px-4 font-bold" style={{ color: product.accent_color }}>
                {product.title}
              </span>
            )}
          </div>

          <div>
            <h1 className="heading-hero text-white text-5xl">{product.title}</h1>
            <p className="text-white/60 text-lg mb-2 font-[family-name:var(--font-dm-sans)]">{product.subtitle}</p>

            <div className="flex flex-row items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} weight="fill" color="#F5C542" size={20} />
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <span className="text-white text-3xl font-bold">
                ${product.price.toFixed(2)}
              </span>
              {product.compare_at_price && (
                <span className="text-white/40 text-xl line-through">
                  ${product.compare_at_price.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-white/80 text-lg leading-relaxed mt-6 font-[family-name:var(--font-dm-sans)]">
              {product.description}
            </p>

            <ProductDetailClient product={product} />
          </div>
        </div>
      </section>

      {/* Ingredients Visual Grid */}
      {product.ingredients && product.ingredients.length > 0 && (
        <section className="bg-[#1A1A1A] py-16">
          <div className="max-w-[1400px] mx-auto px-6">
            <h2 className="heading-section text-[#F5C542] text-center mb-4">WHAT&apos;S INSIDE</h2>
            <p className="text-white/50 text-center mb-10 font-[family-name:var(--font-dm-sans)]">
              Whole-food ingredients. Nothing artificial. Just SOUL.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {product.ingredients.map((ingredient, idx) => (
                <div
                  key={idx}
                  className="rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-wider border border-white/15 text-white/90 font-[family-name:var(--font-dm-sans)] hover:bg-white/5 transition-colors"
                >
                  {ingredient}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Wellness Notes — Visual Cards */}
      {product.wellness_notes && product.wellness_notes.length > 0 && (
        <section className="bg-[#6B3FA0] py-16 relative overflow-hidden">
          <Image src="/brand/onion-turmeric-illustration.png" alt="" width={100} height={100} className="absolute top-8 right-[5%] opacity-10 rotate-12 hidden md:block" />

          <div className="max-w-[1400px] mx-auto px-6">
            <h2 className="heading-section text-white text-center mb-12">WELLNESS NOTES</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[900px] mx-auto">
              {product.wellness_notes.map((note, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 border border-white/15 rounded-[1.5rem] p-6 flex items-start gap-4"
                >
                  <div className="flex-shrink-0 mt-1">
                    <Leaf size={22} weight="fill" className="text-[#F5C542]" />
                  </div>
                  <p className="text-white/85 text-base leading-relaxed font-[family-name:var(--font-dm-sans)]">
                    {note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Perfect For — Use Cases */}
      {product.use_cases && product.use_cases.length > 0 && (
        <section className="bg-[#FFF8F0] py-16">
          <div className="max-w-[1400px] mx-auto px-6">
            <h2 className="heading-section text-[#2D5A27] text-center mb-8">PERFECT FOR</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {product.use_cases.map((useCase, idx) => (
                <div
                  key={idx}
                  className="bg-[#2D5A27] text-white rounded-full px-6 py-2.5 text-sm font-bold uppercase tracking-wider font-[family-name:var(--font-dm-sans)]"
                >
                  {useCase}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <>
          <ScrollingMarquee
            text="SEASON YOUR WHOLE KITCHEN"
            bgColor="#1A1A1A"
            textColor="#F5C542"
          />
          <section className="bg-[#1A1A1A] py-16">
            <div className="max-w-[1400px] mx-auto px-6">
              <div className="flex gap-6 overflow-x-auto pb-4 snap-x justify-center">
                {relatedProducts.map((related) => (
                  <div key={related.id} className="min-w-[280px] max-w-[300px] w-full snap-center shrink-0">
                    <RelatedProductCard product={related} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
