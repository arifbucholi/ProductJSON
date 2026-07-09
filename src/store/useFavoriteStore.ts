import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types/product";

interface FavoriteStore {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (id: number) => void;
  toggleFavorite: (product: Product) => void;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (product) =>
        set((state) => ({
          favorites: [...state.favorites, product],
        })),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((p) => p.id !== id),
        })),

      toggleFavorite: (product) => {
        const exists = get().favorites.find((p) => p.id === product.id);

        if (exists) {
          get().removeFavorite(product.id);
        } else {
          get().addFavorite(product);
        }
      },
    }),
    {
      name: "favorite-storage", // key localStorage
    }
  )
);