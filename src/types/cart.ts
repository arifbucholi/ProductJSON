import type { Product } from "./product";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];

  addToCart: (product: Product, quantity?: number) => void;

  removeFromCart: (productId: number) => void;

  increaseQuantity: (productId: number) => void;

  decreaseQuantity: (productId: number) => void;

  clearCart: () => void;

  getTotalItems: () => number;

  getSubtotal: () => number;
}