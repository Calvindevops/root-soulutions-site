const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

const endpoint = `https://${domain}/api/2024-10/graphql.json`;

export async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors[0]?.message || "Shopify API error");
  }

  return json.data as T;
}

// Create a Shopify checkout from cart items
export async function createCheckout(
  items: { variantId: string; quantity: number }[]
) {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lines: items.map((item) => ({
        merchandiseId: item.variantId,
        quantity: item.quantity,
      })),
    },
  };

  const data = await shopifyFetch<{
    cartCreate: {
      cart: { id: string; checkoutUrl: string } | null;
      userErrors: { field: string[]; message: string }[];
    };
  }>({ query, variables });

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }

  return data.cartCreate.cart!;
}

// Fetch all products from Shopify (for when Collin adds them)
export async function getShopifyProducts() {
  const query = `
    {
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            description
            descriptionHtml
            priceRange {
              minVariantPrice { amount currencyCode }
            }
            compareAtPriceRange {
              minVariantPrice { amount currencyCode }
            }
            images(first: 5) {
              edges {
                node { url altText }
              }
            }
            variants(first: 5) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price { amount currencyCode }
                }
              }
            }
          }
        }
      }
    }
  `;

  return shopifyFetch<{
    products: {
      edges: {
        node: {
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
        };
      }[];
    };
  }>({ query });
}
