import type { Product } from "./types";

// Product data — sourced from notion-docs/pitch-deck-products.md + seasoning-breakdown.md
// This serves as the seed data AND fallback if Supabase is unavailable

export const products: Product[] = [
  {
    id: "simple-szn",
    handle: "simple-szn",
    shopifyVariantId: "gid://shopify/ProductVariant/42332036595797",
    title: "Simple SZN",
    subtitle: "Bright. Golden. Everyday.",
    description:
      "A turmeric-forward, low-sodium complete seasoning made from whole-food herbs and spices. The everyday blend that transforms any dish into something nourishing.",
    description_html:
      "<p>A turmeric-forward, low-sodium complete seasoning made from whole-food herbs and spices. The everyday blend that transforms any dish into something nourishing.</p>",
    price: 12.99,
    compare_at_price: null,
    images: ["/products/lineup-jars.png", "/brand/simple-label.png"],
    gradient_from: "#000000",
    gradient_to: "#0A0A0A",
    accent_color: "#E8A317",
    category: "blend",
    is_bundle: false,
    available: true,
    created_at: new Date().toISOString(),
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
  {
    id: "smokey-cajun-szn",
    handle: "smokey-cajun-szn",
    shopifyVariantId: "gid://shopify/ProductVariant/42331763507285",
    title: "Smokey Cajun SZN",
    subtitle: "Deep. Smoky. Bold.",
    description:
      "A bold, low-sodium Cajun spice blend with smoky paprika and warm heat from aji panca. Made for those who want depth without the sodium overload.",
    description_html:
      "<p>A bold, low-sodium Cajun spice blend with smoky paprika and warm heat from aji panca. Made for those who want depth without the sodium overload.</p>",
    price: 12.99,
    compare_at_price: null,
    images: ["/products/lineup-jars-2.png", "/products/label-smokey-cajun.png"],
    gradient_from: "#5BA3D9",
    gradient_to: "#1A3B8F",
    accent_color: "#E84B8A",
    category: "blend",
    is_bundle: false,
    available: true,
    created_at: new Date().toISOString(),
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
  {
    id: "garlicky-szn",
    handle: "garlicky-szn",
    shopifyVariantId: "gid://shopify/ProductVariant/42331761311829",
    title: "Garlicky SZN",
    subtitle: "Savory. Aromatic. Pure.",
    description:
      "A garlic-forward aromatic blend with bright parsley and warm coriander. The simplest formula with the biggest flavor — goes on everything.",
    description_html:
      "<p>A garlic-forward aromatic blend with bright parsley and warm coriander. The simplest formula with the biggest flavor — goes on everything.</p>",
    price: 12.99,
    compare_at_price: null,
    images: ["/products/product-garlicky-graffiti-wall-1.png", "/products/label-garlicky.png"],
    gradient_from: "#D4600A",
    gradient_to: "#8B3A06",
    accent_color: "#6B3FA0",
    category: "blend",
    is_bundle: false,
    available: true,
    created_at: new Date().toISOString(),
    ingredients: [
      "Garlic",
      "Parsley",
      "Onion",
      "Coriander",
      "Celtic Sea Salt",
    ],
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
  {
    id: "soulution-starter-kit",
    handle: "soulution-starter-kit",
    shopifyVariantId: "gid://shopify/ProductVariant/42332036759637",
    title: "The Soulution Starter Kit",
    subtitle: "All 3 Blends. One Kit. Save 10%.",
    description:
      "Get all three Root Soulutions blends in one bundle and save 10%. The complete toolkit for seasoning your whole kitchen with SOUL.",
    description_html:
      "<p>Get all three Root Soulutions blends in one bundle and save 10%. The complete toolkit for seasoning your whole kitchen with SOUL.</p>",
    price: 34.99,
    compare_at_price: 38.97,
    images: ["/products/lineup-all-3-bottles-graffiti-1.png"],
    gradient_from: "#1A2E14",
    gradient_to: "#0D1A0A",
    accent_color: "#F5C542",
    category: "bundle",
    is_bundle: true,
    available: true,
    created_at: new Date().toISOString(),
    ingredients: [],
    wellness_notes: [],
    use_cases: [],
  },
];

export function getProductByHandle(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}

export function getRelatedProducts(currentHandle: string): Product[] {
  return products.filter((p) => p.handle !== currentHandle && !p.is_bundle);
}
