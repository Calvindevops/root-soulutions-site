import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductByHandle, getRelatedProducts } from "@/lib/products";
import { Star } from "@phosphor-icons/react/dist/ssr";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";
import { RelatedProductCard } from "@/components/product/RelatedProductCard";

export function generateStaticParams() {
  return [
    { handle: "simple-szn" },
    { handle: "smokey-cajun-szn" },
    { handle: "garlicky-szn" },
    { handle: "soulution-starter-kit" },
  ];
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const resolvedParams = await params;
  const handle = resolvedParams.handle;
  const product = getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(handle);

  return (
    <main>
      <section className="bg-[#2D5A27] py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:grid md:grid-cols-2 gap-12 items-start">
          <div 
            className="aspect-square rounded-[2rem] flex items-center justify-center relative overflow-hidden mb-8 md:mb-0"
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
            <p className="text-white/60 text-lg mb-2">{product.subtitle}</p>
            
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

            <p className="text-white/80 text-lg leading-relaxed mt-6">
              {product.description}
            </p>

            <ProductDetailClient product={product} />
          </div>
        </div>
      </section>

      {product.use_cases && product.use_cases.length > 0 && (
        <section className="bg-[#FFF8F0] py-16">
          <div className="max-w-[1400px] mx-auto px-6">
            <h2 className="heading-section text-[#2D5A27] text-center mb-8">PERFECT FOR</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {product.use_cases.map((useCase, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#2D5A27] text-white rounded-full px-5 py-2 text-sm font-bold uppercase"
                >
                  {useCase}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="bg-[#e85c2a] py-16">
          <div className="max-w-[1400px] mx-auto px-6">
            <h2 className="heading-section text-white text-center mb-12">SEASON YOUR WHOLE KITCHEN</h2>
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
              {relatedProducts.map((related) => (
                <div key={related.id} className="min-w-[280px] max-w-[300px] w-full snap-center shrink-0">
                  <RelatedProductCard product={related} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}