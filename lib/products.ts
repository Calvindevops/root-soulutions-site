import type { Product } from "./types";

// Product data — sourced from notion-docs/pitch-deck-products.md + seasoning-breakdown.md
// This serves as the seed data AND fallback if Supabase is unavailable

export const products: Product[] = [
  {
    id: "simple-szn",
    handle: "low-sodium-simple-szn-complete-seasoning",
    title: "Simple SZN",
    subtitle: "Bright. Golden. Everyday.",
    description:
      "A turmeric-forward, low-sodium complete seasoning made from whole-food herbs and spices. The everyday blend that transforms any dish into something nourishing.",
    description_html:
      "<p>A turmeric-forward, low-sodium complete seasoning made from whole-food herbs and spices. The everyday blend that transforms any dish into something nourishing.</p>",
    price: 12.99,
    compare_at_price: null,
    images: ["/products/simple-szn-bottle.png", "/products/lineup-jars.webp"],
    gradient_from: "#000000",
    gradient_to: "#0A0A0A",
    accent_color: "#E8A317",
    category: "blend",
    is_bundle: false,
    available: true,
    created_at: new Date().toISOString(),
    ingredients: [
      "Turmeric",
      "Oregano",
      "Onion",
      "Garlic",
      "Basil",
      "Parsley",
      "Celtic Sea Salt",
    ],
    wellness_notes: [
      "Anti-inflammatory spices that support metabolic balance",
      "Herbs rich in antioxidants for immune health",
      "Aids digestion naturally with whole-food ingredients",
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
    handle: "low-sodium-smokey-cajun-szn",
    title: "Smokey Cajun SZN",
    subtitle: "Deep. Smoky. Bold.",
    description:
      "A bold, low-sodium Cajun spice blend with smoky paprika and warm heat from aji panca. Made for those who want depth without the sodium overload.",
    description_html:
      "<p>A bold, low-sodium Cajun spice blend with smoky paprika and warm heat from aji panca. Made for those who want depth without the sodium overload.</p>",
    price: 12.99,
    compare_at_price: null,
    images: ["/products/label-smokey-cajun.png", "/products/lineup-jars-2.webp"],
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
      "Paprika",
      "Thyme",
      "Celtic Sea Salt",
    ],
    wellness_notes: [
      "Rich in vitamin A and antioxidants from paprika",
      "Supports circulation and immune function",
      "Antimicrobial herbs for respiratory health",
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
    handle: "low-sodium-garlicky-szn-blend",
    title: "Garlicky SZN",
    subtitle: "Savory. Aromatic. Pure.",
    description:
      "A garlic-forward aromatic blend with bright parsley and warm coriander. The simplest formula with the biggest flavor — goes on everything.",
    description_html:
      "<p>A garlic-forward aromatic blend with bright parsley and warm coriander. The simplest formula with the biggest flavor — goes on everything.</p>",
    price: 12.99,
    compare_at_price: null,
    images: ["/products/product-garlicky-graffiti-wall-1.webp", "/products/label-garlicky.png", "/products/product-garlicky-graffiti-wall-2.webp"],
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
      "Celtic Sea Salt",
    ],
    wellness_notes: [
      "Supports circulation, detoxification, and immune defense",
      "Rich in vitamins K and C from whole herbs",
      "Aids digestion with anti-inflammatory properties",
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
    handle: "soulutions-starter-kit",
    title: "The Soulution Starter Kit",
    subtitle: "All 3 Blends. One Kit. Save 10%.",
    description:
      "Get all three Root Soulutions blends in one bundle and save 10%. The complete toolkit for seasoning your whole kitchen with SOUL.",
    description_html:
      "<p>Get all three Root Soulutions blends in one bundle and save 10%. The complete toolkit for seasoning your whole kitchen with SOUL.</p>",
    price: 34.99,
    compare_at_price: 38.97,
    images: ["/products/lineup-all-3-bottles-graffiti-1.webp"],
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
