// === Product ===
export interface Product {
  id: string;
  handle: string;
  title: string;
  subtitle: string;
  description: string;
  description_html: string;
  price: number;
  compare_at_price: number | null;
  images: string[];
  gradient_from: string;
  gradient_to: string;
  accent_color: string;
  category: "blend" | "bundle";
  is_bundle: boolean;
  available: boolean;
  created_at: string;
  // Extended fields (not in DB)
  ingredients?: string[];
  wellness_notes?: string[];
  use_cases?: string[];
}

// === Cart ===
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

// === Order ===
export interface OrderItem {
  product_id: string;
  title: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  stripe_session_id: string | null;
  stripe_payment_intent: string | null;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  subtotal: number;
  shipping: number;
  total: number;
  shipping_address: ShippingAddress | null;
  items: OrderItem[];
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

// === Customer ===
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  total_orders: number;
  total_spent: number;
  source: "website" | "farmers-market" | "wholesale";
  created_at: string;
}

// === Subscriber ===
export interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
}

// === Wholesale Inquiry ===
export interface WholesaleInquiry {
  id: string;
  business_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  business_type: string | null;
  location: string | null;
  message: string | null;
  status: "new" | "contacted" | "converted" | "declined";
  created_at: string;
}

// === Contact Message ===
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  read: boolean;
  created_at: string;
}

// === Recipe (hardcoded for now) ===
export interface Recipe {
  slug: string;
  title: string;
  blend: "simple-szn" | "smokey-cajun-szn" | "garlicky-szn" | "holy-trinity-szn" | "all-blends" | "garlicky-cajun-szn" | "garlicky-simple-szn";
  blendLabel: string;
  image: string;
  description?: string;
  /** Recipe card image paths (the full graphic with ingredients/procedure) */
  recipeCards?: string[];
  /** Whether this recipe has a popup-able recipe card */
  hasRecipeCard?: boolean;
}

// === Market (hardcoded for now) ===
export interface Market {
  name: string;
  address: string;
  day: string;
  hours: string;
  mapsUrl: string;
}

// === FAQ ===
export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  category: string;
  items: FAQItem[];
}
