"use client";

import { useState, useEffect } from "react";
import type { Product } from "./types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"shopify" | "local" | "loading">("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.products ?? []);
        setSource(data.source ?? "local");
      })
      .catch((err) => {
        setError(err.message);
        setSource("local");
      })
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, source, error };
}
