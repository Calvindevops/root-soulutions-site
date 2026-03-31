import { getShopifyProducts } from "./shopify";
import { products as localProducts } from "./products";
import { mergeProducts } from "./product-merge";
import type { Product } from "./types";

export async function getMergedProducts(): Promise<{
  products: Product[];
  source: "shopify" | "local";
}> {
  if (
    !process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ||
    !process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
  ) {
    return { products: localProducts, source: "local" };
  }

  try {
    const data = await getShopifyProducts();
    const nodes = data.products.edges.map((e) => e.node);
    const merged = mergeProducts(nodes, localProducts);
    return { products: merged, source: "shopify" };
  } catch (err) {
    console.error("Shopify fetch failed, using local fallback:", err);
    return { products: localProducts, source: "local" };
  }
}

export async function getMergedProductByHandle(
  handle: string
): Promise<Product | undefined> {
  const { products } = await getMergedProducts();
  return products.find((p) => p.handle === handle);
}

export async function getMergedRelatedProducts(
  currentHandle: string
): Promise<Product[]> {
  const { products } = await getMergedProducts();
  return products.filter(
    (p) => p.handle !== currentHandle && !p.is_bundle
  );
}
