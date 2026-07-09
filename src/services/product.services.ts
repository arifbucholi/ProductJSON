import api from "../api/axios";
import type { Product, ProductResponse } from "../types/product";

export const getProducts = async (
  skip: number,
  limit: number
): Promise<ProductResponse> => {
  const { data } = await api.get(
    `/products?limit=${limit}&skip=${skip}`
  );

  return data;
};

export const getProductById = async (
  id: number
): Promise<Product> => {
  const { data } = await api.get(`/products/${id}`);

  return data;
};

export const searchProducts = async (
  keyword: string
): Promise<ProductResponse> => {
  const { data } = await api.get(
    `/products/search?q=${keyword}`
  );

  return data;
};