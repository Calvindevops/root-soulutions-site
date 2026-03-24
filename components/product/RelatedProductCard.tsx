"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/types";

export function RelatedProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div 
      className="rounded-[2rem] overflow-hidden p-6 min-h-[350px] flex flex-col relative h-full w-full"
      style={{
        background: `linear-gradient(135deg, ${product.gradient_from}, ${product.gradient_to})`
      }}
    >
      <Link href={`/products/${product.handle}`} className="flex-1 flex flex-col items-center">
        <div 
          className="w-[150px] h-[150px] rounded-full border-4 flex items-center justify-center relative mb-6 overflow-hidden bg-black/5"
          style={{ borderColor: product.accent_color }}
        >
          {product.images[0] ? (
            <Image 
              src={product.images[0]} 
              alt={product.title} 
              fill
              className="object-contain p-3"
              sizes="150px"
            />
          ) : (
            <div className="w-full h-full" />
          )}
        </div>
        
        <h3 className="heading-card text-xl mb-1 text-center" style={{ color: product.accent_color }}>
          {product.title}
        </h3>
        <p className="text-white/70 text-xs text-center mb-4">
          {product.subtitle}
        </p>
      </Link>

      <div className="mt-auto flex flex-col items-center w-full gap-3 relative z-10">
        <span className="text-white text-xl font-bold">
          ${product.price.toFixed(2)}
        </span>
        <button 
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="w-full bg-white/20 text-white rounded-full px-6 py-2 btn-text text-sm hover:scale-105 hover:brightness-110 transition-all text-center"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}