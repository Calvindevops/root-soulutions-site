const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const adminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!;

const ADMIN_BASE = `https://${domain}/admin/api/2024-10`;

async function adminFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${ADMIN_BASE}${path}`, {
    ...options,
    headers: {
      "X-Shopify-Access-Token": adminToken,
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Shopify Admin API ${res.status}: ${body}`);
  }
  return res.json();
}

export interface ShopifyOrder {
  id: number;
  name: string;
  email: string;
  created_at: string;
  financial_status: string;
  fulfillment_status: string | null;
  total_price: string;
  currency: string;
  customer: { first_name: string; last_name: string; email: string } | null;
  line_items: { title: string; quantity: number; price: string }[];
}

export async function getShopifyOrders(limit = 50): Promise<ShopifyOrder[]> {
  const json = await adminFetch(`/orders.json?limit=${limit}&status=any`);
  return json.orders as ShopifyOrder[];
}

export async function updateShopifyVariantPrice(
  variantId: string,
  price: string
) {
  // Extract numeric ID from gid://shopify/ProductVariant/12345
  const numericId = variantId.replace(/\D/g, "");
  const json = await adminFetch(`/variants/${numericId}.json`, {
    method: "PUT",
    body: JSON.stringify({ variant: { id: numericId, price } }),
  });
  return json.variant;
}

export async function updateShopifyProductStatus(
  productId: string,
  status: "active" | "draft" | "archived"
) {
  // Extract numeric ID from gid://shopify/Product/12345
  const numericId = productId.replace(/\D/g, "");
  const json = await adminFetch(`/products/${numericId}.json`, {
    method: "PUT",
    body: JSON.stringify({ product: { id: numericId, status } }),
  });
  return json.product;
}
