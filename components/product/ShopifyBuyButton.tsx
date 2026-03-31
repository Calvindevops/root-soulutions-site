"use client";

import { useEffect, useRef } from "react";

// Map product handles to Shopify product IDs
// Domain: ahgadf-je.myshopify.com
const SHOPIFY_PRODUCT_IDS: Record<string, string> = {
  "low-sodium-simple-szn-complete-seasoning": "7353911246933",
  // TODO: Add remaining product IDs from Shopify admin
  // "low-sodium-smokey-cajun-szn": "",
  // "low-sodium-garlicky-szn-blend": "",
  // "soulutions-starter-kit": "",
};

const SHOPIFY_DOMAIN = "ahgadf-je.myshopify.com";
const SHOPIFY_TOKEN = "5337eab045544526f549658b1a593267";

export function hasBuyButton(handle: string): boolean {
  return handle in SHOPIFY_PRODUCT_IDS;
}

interface ShopifyBuyButtonProps {
  productHandle: string;
}

declare global {
  interface Window {
    ShopifyBuy?: {
      buildClient: (config: { domain: string; storefrontAccessToken: string }) => unknown;
      UI: {
        onReady: (client: unknown) => Promise<{
          createComponent: (type: string, config: Record<string, unknown>) => void;
        }>;
      };
    };
  }
}

export function ShopifyBuyButton({ productHandle }: ShopifyBuyButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  const productId = SHOPIFY_PRODUCT_IDS[productHandle];

  useEffect(() => {
    if (!productId || initializedRef.current) return;
    initializedRef.current = true;

    function initBuyButton() {
      if (!window.ShopifyBuy?.UI || !containerRef.current) return;

      const client = window.ShopifyBuy.buildClient({
        domain: SHOPIFY_DOMAIN,
        storefrontAccessToken: SHOPIFY_TOKEN,
      });

      window.ShopifyBuy.UI.onReady(client).then((ui) => {
        ui.createComponent("product", {
          id: productId,
          node: containerRef.current,
          moneyFormat: "%24%7B%7Bamount%7D%7D",
          options: {
            product: {
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "100%",
                    "margin-left": "0px",
                    "margin-bottom": "0px",
                  },
                },
                button: {
                  "font-family": "Lato, sans-serif",
                  "font-weight": "bold",
                  "font-size": "18px",
                  "padding-top": "16px",
                  "padding-bottom": "16px",
                  width: "100%",
                  ":hover": { "background-color": "#d15326" },
                  "background-color": "#e85c2a",
                  ":focus": { "background-color": "#d15326" },
                  "border-radius": "40px",
                },
              },
              contents: {
                img: false,
                title: false,
                price: false,
              },
              text: { button: "Add to cart" },
              googleFonts: ["Lato"],
            },
            modalProduct: {
              contents: {
                img: false,
                imgWithCarousel: true,
                button: false,
                buttonWithQuantity: true,
              },
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "100%",
                    "margin-left": "0px",
                    "margin-bottom": "0px",
                  },
                },
                button: {
                  "font-family": "Lato, sans-serif",
                  "font-weight": "bold",
                  ":hover": { "background-color": "#d15326" },
                  "background-color": "#e85c2a",
                  ":focus": { "background-color": "#d15326" },
                  "border-radius": "40px",
                },
              },
              googleFonts: ["Lato"],
              text: { button: "Add to cart" },
            },
            cart: {
              styles: {
                button: {
                  "font-family": "Lato, sans-serif",
                  "font-weight": "bold",
                  ":hover": { "background-color": "#d15326" },
                  "background-color": "#e85c2a",
                  ":focus": { "background-color": "#d15326" },
                  "border-radius": "40px",
                },
                title: { color: "#ffffff" },
                header: { color: "#ffffff" },
                lineItems: { color: "#ffffff" },
                subtotalText: { color: "#ffffff" },
                subtotal: { color: "#ffffff" },
                notice: { color: "#ffffff" },
                currency: { color: "#ffffff" },
                close: {
                  color: "#ffffff",
                  ":hover": { color: "#ffffff" },
                },
                empty: { color: "#ffffff" },
                noteDescription: { color: "#ffffff" },
                discountText: { color: "#ffffff" },
                discountIcon: { fill: "#ffffff" },
                discountAmount: { color: "#ffffff" },
                cart: { "background-color": "#2d5a27" },
                footer: { "background-color": "#2d5a27" },
              },
              text: { total: "Subtotal", button: "Checkout" },
              googleFonts: ["Lato"],
            },
            toggle: {
              styles: {
                toggle: {
                  "font-family": "Lato, sans-serif",
                  "font-weight": "bold",
                  "background-color": "#e85c2a",
                  ":hover": { "background-color": "#d15326" },
                  ":focus": { "background-color": "#d15326" },
                },
              },
              googleFonts: ["Lato"],
            },
            lineItem: {
              styles: {
                variantTitle: { color: "#ffffff" },
                title: { color: "#ffffff" },
                price: { color: "#ffffff" },
                fullPrice: { color: "#ffffff" },
                discount: { color: "#ffffff" },
                discountIcon: { fill: "#ffffff" },
                quantity: { color: "#ffffff" },
                quantityIncrement: { color: "#ffffff", "border-color": "#ffffff" },
                quantityDecrement: { color: "#ffffff", "border-color": "#ffffff" },
                quantityInput: { color: "#ffffff", "border-color": "#ffffff" },
              },
            },
          },
        });
      });
    }

    // Load the Shopify Buy Button SDK
    if (window.ShopifyBuy?.UI) {
      initBuyButton();
    } else {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
      script.onload = initBuyButton;
      document.head.appendChild(script);
    }
  }, [productId]);

  if (!productId) {
    // Fallback for products without Shopify IDs yet
    return null;
  }

  return <div ref={containerRef} className="w-full mt-6" />;
}
