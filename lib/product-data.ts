import type { Product } from "./types";
import { products as staticProducts } from "./products";

// RS-specific enrichment data that Shopify doesn't have
// Keyed by handle — merges with Shopify product data
const enrichment: Record<string, {
  subtitle: string;
  gradient_from: string;
  gradient_to: string;
  accent_color: string;
  ingredients: string[];
  wellness_notes: string[];
  use_cases: string[];
}> = {
  "simple-szn": {
    subtitle: "Bright. Golden. Everyday.",
    gradient_from: "#000000",
    gradient_to: "#0A0A0A",
    accent_color: "#E8A317",
    ingredients: ["Thyme", "Oregano", "Onion", "Garlic", "Black Pepper", "White Pepper", "Cumin", "Turmeric", "Aji Panca", "Basil", "Parsley", "Celtic Sea Salt"],
    wellness_notes: [
      "Turmeric: anti-inflammatory, supports metabolic balance",
      "Cumin: aids digestion, rich in iron",
      "Oregano: antioxidant-rich, supports immune health",
      "Celtic Sea Salt: unrefined, naturally mineral-rich",
    ],
    use_cases: ["Veggies", "Rice", "Eggs", "Chicken", "Soups", "Roasted Potatoes", "Daily Cooking"],
  },
  "smokey-cajun-szn": {
    subtitle: "Deep. Smoky. Bold.",
    gradient_from: "#5BA3D9",
    gradient_to: "#1A3B8F",
    accent_color: "#E84B8A",
    ingredients: ["Garlic", "Onion", "Oregano", "Spanish Hot Paprika", "Hungarian Smoky Paprika", "White Pepper", "Black Pepper", "Aji Panca", "Thyme", "Celtic Sea Salt"],
    wellness_notes: [
      "Paprika: rich in vitamin A and antioxidants",
      "Garlic: supports circulation and immune function",
      "Thyme: antimicrobial, supports respiratory health",
      "Low sodium: heart-healthy alternative to traditional Cajun blends",
    ],
    use_cases: ["Seafood", "Chicken", "Veggies", "Rice", "Soups", "Grilling", "Meal Prep"],
  },
  "garlicky-szn": {
    subtitle: "Savory. Aromatic. Pure.",
    gradient_from: "#D4600A",
    gradient_to: "#8B3A06",
    accent_color: "#6B3FA0",
    ingredients: ["Garlic", "Parsley", "Onion", "Coriander", "Celtic Sea Salt"],
    wellness_notes: [
      "Garlic: supports circulation, detoxification, immune defense",
      "Parsley: rich in vitamin K and C",
      "Coriander: aids digestion, anti-inflammatory",
      "Simplest formula — fewest ingredients, maximum flavor",
    ],
    use_cases: ["Pasta", "Veggies", "Seafood", "Bread Dips", "Potatoes", "Chicken", "Everyday Cooking"],
  },
  "soulution-starter-kit": {
    subtitle: "All 3 Blends. One Kit. Save 10%.",
    gradient_from: "#1A2E14",
    gradient_to: "#0D1A0A",
    accent_color: "#F5C542",
    ingredients: [],
    wellness_notes: [],
    use_cases: [],
  },
};

const SHOPIFY_CONFIGURED =
  typeof process !== "undefined" &&
  !!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN &&
  !!process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

/**
 * Fetch products — Shopify API if configured, otherwise static fallback.
 * Shopify images, prices, and descriptions override static data.
 * RS enrichment data (gradients, ingredients, wellness) merges on top.
 */
export async function getProducts(): Promise<Product[]> {
  if (!SHOPIFY_CONFIGURED) {
    return staticProducts;
  }

  try {
    const { getShopifyProducts } = await import("./shopify");
    const data = await getShopifyProducts();

    return data.products.edges.map(({ node }) => {
      const enrich = enrichment[node.handle] || {};
      const staticProduct = staticProducts.find(p => p.handle === node.handle);

      const shopifyImages = node.images.edges.map(e => e.node.url);
      const price = parseFloat(node.priceRange.minVariantPrice.amount);
      const compareAt = parseFloat(node.compareAtPriceRange.minVariantPrice.amount);

      return {
        id: node.handle,
        handle: node.handle,
        title: node.title,
        subtitle: enrich.subtitle || staticProduct?.subtitle || "",
        description: node.description,
        description_html: node.descriptionHtml,
        price,
        compare_at_price: compareAt > price ? compareAt : null,
        // Shopify images take priority, fall back to static
        images: shopifyImages.length > 0 ? shopifyImages : (staticProduct?.images || []),
        gradient_from: enrich.gradient_from || staticProduct?.gradient_from || "#000000",
        gradient_to: enrich.gradient_to || staticProduct?.gradient_to || "#0A0A0A",
        accent_color: enrich.accent_color || staticProduct?.accent_color || "#F5C542",
        category: node.handle.includes("kit") || node.handle.includes("bundle") ? "bundle" as const : "blend" as const,
        is_bundle: node.handle.includes("kit") || node.handle.includes("bundle"),
        available: node.variants.edges.some(v => v.node.availableForSale),
        created_at: new Date().toISOString(),
        ingredients: enrich.ingredients || staticProduct?.ingredients || [],
        wellness_notes: enrich.wellness_notes || staticProduct?.wellness_notes || [],
        use_cases: enrich.use_cases || staticProduct?.use_cases || [],
        // Store Shopify variant ID for checkout
        shopifyVariantId: node.variants.edges[0]?.node.id,
      } as Product & { shopifyVariantId?: string };
    });
  } catch (error) {
    console.error("Shopify fetch failed, using static fallback:", error);
    return staticProducts;
  }
}

/**
 * Get single product by handle — same Shopify-first logic.
 */
export async function getProductByHandleAsync(handle: string): Promise<Product | undefined> {
  const all = await getProducts();
  return all.find(p => p.handle === handle);
}

/**
 * Get related products (exclude current + bundles).
 */
export async function getRelatedProductsAsync(currentHandle: string): Promise<Product[]> {
  const all = await getProducts();
  return all.filter(p => p.handle !== currentHandle && !p.is_bundle);
}
