import type { CartItem } from "../types/cart";
import type { Product } from "../types/product";

/**
 * Tambah produk ke cart
 */
export const addItemToCart = (
  cart: CartItem[],
  product: Product,
  quantity = 1
): CartItem[] => {
  const existing = cart.find(
    (item) => item.product.id === product.id
  );

  if (existing) {
    return cart.map((item) =>
      item.product.id === product.id
        ? {
            ...item,
            quantity: item.quantity + quantity,
          }
        : item
    );
  }

  return [...cart, { product, quantity }];
};

/**
 * Hapus item dari cart
 */
export const removeItemFromCart = (
  cart: CartItem[],
  productId: number
): CartItem[] => {
  return cart.filter(
    (item) => item.product.id !== productId
  );
};

/**
 * Increase quantity
 */
export const increaseQty = (
  cart: CartItem[],
  productId: number
): CartItem[] => {
  return cart.map((item) =>
    item.product.id === productId
      ? {
          ...item,
          quantity: item.quantity + 1,
        }
      : item
  );
};

/**
 * Decrease quantity (min 1, tidak auto delete)
 */
export const decreaseQty = (
  cart: CartItem[],
  productId: number
): CartItem[] => {
  return cart.map((item) =>
    item.product.id === productId
      ? {
          ...item,
          quantity: Math.max(1, item.quantity - 1),
        }
      : item
  );
};

/**
 * Total item (untuk badge navbar)
 */
export const getTotalItems = (cart: CartItem[]): number => {
  return cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
};

/**
 * Subtotal harga
 */
export const getSubtotal = (cart: CartItem[]): number => {
  return cart.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );
};

/**
 * Clear cart
 */
export const clearCart = (): CartItem[] => {
  return [];
};