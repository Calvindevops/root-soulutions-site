"use client";

import { useState, useEffect } from "react";
import type { Product } from "./types";

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  source: string;
  error: string | null;
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<string>("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
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
