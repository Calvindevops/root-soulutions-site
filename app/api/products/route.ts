import { NextResponse } from "next/server";
import { getShopifyProducts } from "@/lib/shopify";
import { products as localProducts } from "@/lib/products";

// Local enrichment data keyed by Shopify handle
const enrichment: Record<
  string,
  {
    localId: string;
    subtitle: string;
    gradient_from: string;
    gradient_to: string;
    accent_color: string;
    category: "blend" | "bundle";
    is_bundle: boolean;
    ingredients: string[];
    wellness_notes: string[];
    use_cases: string[];
  }
> = {
  "low-sodium-garlicky-szn-blend": {
    localId: "garlicky-szn",
    subtitle: "Savory. Aromatic. Pure.",
    gradient_from: "#D4600A",
    gradient_to: "#8B3A06",
    accent_color: "#6B3FA0",
    category: "blend",
    is_bundle: false,
    ingredients: ["Garlic", "Parsley", "Onion", "Coriander", "Celtic Sea Salt"],
    wellness_notes: [
      "Garlic: supports circulation, detoxification, immune defense",
      "Parsley: rich in vitamin K and C",
      "Coriander: aids digestion, anti-inflammatory",
      "Simplest formula — fewest ingredients, maximum flavor",
    ],
    use_cases: [
      "Pasta",
      "Veggies",
      "Seafood",
      "Bread Dips",
      "Potatoes",
      "Chicken",
      "Everyday Cooking",
    ],
  },
  "low-sodium-smokey-cajun-szn": {
    localId: "smokey-cajun-szn",
    subtitle: "Deep. Smoky. Bold.",
    gradient_from: "#5BA3D9",
    gradient_to: "#1A3B8F",
    accent_color: "#E84B8A",
    category: "blend",
    is_bundle: false,
    ingredients: [
      "Garlic",
      "Onion",
      "Oregano",
      "Spanish Hot Paprika",
      "Hungarian Smoky Paprika",
      "White Pepper",
      "Black Pepper",
      "Aji Panca",
      "Thyme",
      "Celtic Sea Salt",
    ],
    wellness_notes: [
      "Paprika: rich in vitamin A and antioxidants",
      "Garlic: supports circulation and immune function",
      "Thyme: antimicrobial, supports respiratory health",
      "Low sodium: heart-healthy alternative to traditional Cajun blends",
    ],
    use_cases: [
      "Seafood",
      "Chicken",
      "Veggies",
      "Rice",
      "Soups",
      "Grilling",
      "Meal Prep",
    ],
  },
  "low-sodium-simple-szn-complete-seasoning": {
    localId: "simple-szn",
    subtitle: "Bright. Golden. Everyday.",
    gradient_from: "#000000",
    gradient_to: "#0A0A0A",
    accent_color: "#E8A317",
    category: "blend",
    is_bundle: false,
    ingredients: [
      "Thyme",
      "Oregano",
      "Onion",
      "Garlic",
      "Black Pepper",
      "White Pepper",
      "Cumin",
      "Turmeric",
      "Aji Panca",
      "Basil",
      "Parsley",
      "Celtic Sea Salt",
    ],
    wellness_notes: [
      "Turmeric: anti-inflammatory, supports metabolic balance",
      "Cumin: aids digestion, rich in iron",
      "Oregano: antioxidant-rich, supports immune health",
      "Celtic Sea Salt: unrefined, naturally mineral-rich",
    ],
    use_cases: [
      "Veggies",
      "Rice",
      "Eggs",
      "Chicken",
      "Soups",
      "Roasted Potatoes",
      "Daily Cooking",
    ],
  },
  "soulutions-starter-kit": {
    localId: "soulution-starter-kit",
    subtitle: "All 3 Blends. One Kit. Save 10%.",
    gradient_from: "#1A2E14",
    gradient_to: "#0D1A0A",
    accent_color: "#F5C542",
    category: "bundle",
    is_bundle: true,
    ingredients: [],
    wellness_notes: [],
    use_cases: [],
  },
};

export async function GET() {
  try {
    const shopifyData = await getShopifyProducts();
    const products = shopifyData.products.edges.map((edge) => {
      const node = edge.node;
      const enrich = enrichment[node.handle];
      const variant = node.variants.edges[0]?.node;
      const price = parseFloat(
        node.priceRange.minVariantPrice.amount
      );
      const compareAt = node.compareAtPriceRange?.minVariantPrice?.amount
        ? parseFloat(node.compareAtPriceRange.minVariantPrice.amount)
        : null;

      return {
        id: enrich?.localId ?? node.handle,
        handle: node.handle,
        title: node.title,
        description: node.description,
        description_html: node.descriptionHtml,
        price,
        compare_at_price: compareAt && compareAt > price ? compareAt : null,
        images: node.images.edges.map((img) => img.node.url),
        available: variant?.availableForSale ?? true,
        created_at: new Date().toISOString(),
        shopify_variant_id: variant?.id ?? null,
        shopify_product_id: node.id,
        subtitle: enrich?.subtitle ?? "",
        gradient_from: enrich?.gradient_from ?? "#1A1A1A",
        gradient_to: enrich?.gradient_to ?? "#0A0A0A",
        accent_color: enrich?.accent_color ?? "#F5C542",
        category: enrich?.category ?? "blend",
        is_bundle: enrich?.is_bundle ?? false,
        ingredients: enrich?.ingredients ?? [],
        wellness_notes: enrich?.wellness_notes ?? [],
        use_cases: enrich?.use_cases ?? [],
      };
    });

    return NextResponse.json({ products, source: "shopify" });
  } catch {
    // Fallback to local product data
    return NextResponse.json({ products: localProducts, source: "local" });
  }
}
