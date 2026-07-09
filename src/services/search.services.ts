import type { Product } from "../types/product";

interface SearchResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export async function searchProducts(
  query: string,
  limit = 12,
  skip = 0
): Promise<SearchResponse> {
  const res = await fetch(
    `https://dummyjson.com/products/search?q=${encodeURIComponent(
      query
    )}&limit=${limit}&skip=${skip}`
  );

  if (!res.ok) {
    throw new Error("Failed to search products");
  }

  return res.json();
}