import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { Product } from "../types/product";
import type { CartItem } from "../types/cart";

interface CartState {
  items: CartItem[];

  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: number) => void;
  increaseQty: (productId: number) => void;
  decreaseQty: (productId: number) => void;
  clearCart: () => void;

  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product, qty = 1) => {
        const items = get().items;

        const existing = items.find(
          (item) => item.product.id === product.id
        );

        if (existing) {
          set({
            items: items.map((item) =>
              item.product.id === product.id
                ? {
                    ...item,
                    quantity: item.quantity + qty,
                  }
                : item
            ),
          });
        } else {
          set({
            items: [...items, { product, quantity: qty }],
          });
        }
      },

      removeFromCart: (productId) => {
        set({
          items: get().items.filter(
            (item) => item.product.id !== productId
          ),
        });
      },

      increaseQty: (productId) => {
        set({
          items: get().items.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        });
      },

      decreaseQty: (productId) => {
        set({
          items: get().items.map((item) =>
            item.product.id === productId
              ? {
                  ...item,
                  quantity: Math.max(1, item.quantity - 1),
                }
              : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
        localStorage.removeItem("cart-storage"); // 🔥 FIX PENTING
      },

      getTotalItems: () =>
        get().items.reduce(
          (total, item) => total + item.quantity,
          0
        ),

      getSubtotal: () =>
        get().items.reduce(
          (total, item) =>
            total + item.product.price * item.quantity,
          0
        ),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),

      // 🔥 penting biar tidak rehydrate “ghost data”
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);