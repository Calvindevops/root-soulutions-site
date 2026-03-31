"use client";

import { useState, useEffect, useRef } from "react";
import { products as localProducts } from "./products";
import type { Product } from "./types";

// Module-level cache so all components share one fetch
let cachedProducts: Product[] | null = null;
let cachedSource: "shopify" | "local" = "local";
let fetchPromise: Promise<void> | null = null;

function fetchProducts(): Promise<void> {
  if (fetchPromise) return fetchPromise;
  fetchPromise = fetch("/api/products")
    .then((r) => r.json())
    .then((data) => {
      cachedProducts = data.products ?? localProducts;
      cachedSource = data.source ?? "local";
    })
    .catch(() => {
      cachedProducts = localProducts;
      cachedSource = "local";
    });
  return fetchPromise;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(cachedProducts ?? localProducts);
  const [loading, setLoading] = useState(!cachedProducts);
  const [source, setSource] = useState<"shopify" | "local">(cachedSource);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    if (cachedProducts) {
      setProducts(cachedProducts);
      setSource(cachedSource);
      setLoading(false);
      return;
    }
    fetchProducts().then(() => {
      if (mounted.current && cachedProducts) {
        setProducts(cachedProducts);
        setSource(cachedSource);
        setLoading(false);
      }
    });
    return () => { mounted.current = false; };
  }, []);

  return { products, loading, source, error: null };
}
