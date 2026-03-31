import type { Product } from "./types";

interface ShopifyProductNode {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  priceRange: { minVariantPrice: { amount: string } };
  compareAtPriceRange: { minVariantPrice: { amount: string } };
  images: { edges: { node: { url: string; altText: string } }[] };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        price: { amount: string };
      };
    }[];
  };
}

const NEUTRAL_DEFAULTS = {
  gradient_from: "#1A1A1A",
  gradient_to: "#0A0A0A",
  accent_color: "#FFFFFF",
  subtitle: "",
  category: "blend" as const,
  is_bundle: false,
};

export function mergeProducts(
  shopifyNodes: ShopifyProductNode[],
  localProducts: Product[]
): Product[] {
  const localMap = new Map(localProducts.map((p) => [p.handle, p]));
  const merged: Product[] = [];
  const seenHandles = new Set<string>();

  for (const node of shopifyNodes) {
    const local = localMap.get(node.handle);
    seenHandles.add(node.handle);

    const firstVariant = node.variants.edges[0]?.node;
    const price = parseFloat(node.priceRange.minVariantPrice.amount);
    const compareAt = parseFloat(node.compareAtPriceRange.minVariantPrice.amount);
    const images = node.images.edges.map((e) => e.node.url);

    merged.push({
      id: local?.id ?? node.handle,
      handle: node.handle,
      // Shopify wins for ecommerce fields
      title: node.title,
      description: node.description,
      description_html: node.descriptionHtml,
      price,
      compare_at_price: compareAt > 0 && compareAt !== price ? compareAt : null,
      images: images.length > 0 ? images : local?.images ?? [],
      available: node.variants.edges.some((e) => e.node.availableForSale),
      created_at: local?.created_at ?? new Date().toISOString(),
      // Shopify IDs for checkout + admin
      shopify_variant_id: firstVariant?.id ?? undefined,
      shopify_product_id: node.id,
      // Local wins for RS-specific styling/enrichment
      subtitle: local?.subtitle ?? NEUTRAL_DEFAULTS.subtitle,
      gradient_from: local?.gradient_from ?? NEUTRAL_DEFAULTS.gradient_from,
      gradient_to: local?.gradient_to ?? NEUTRAL_DEFAULTS.gradient_to,
      accent_color: local?.accent_color ?? NEUTRAL_DEFAULTS.accent_color,
      category: local?.category ?? NEUTRAL_DEFAULTS.category,
      is_bundle: local?.is_bundle ?? NEUTRAL_DEFAULTS.is_bundle,
      ingredients: local?.ingredients,
      wellness_notes: local?.wellness_notes,
      use_cases: local?.use_cases,
    });
  }

  // Include local-only products that aren't in Shopify (fallback)
  for (const local of localProducts) {
    if (!seenHandles.has(local.handle)) {
      merged.push(local);
    }
  }

  return merged;
}

export type { ShopifyProductNode };
