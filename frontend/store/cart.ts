"use client";

import { create } from "zustand";

export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  variantId: string;
  variantName: string;
  variantColor: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];

  addToCart: (item: CartItem) => void;

  removeFromCart: (productId: string, variantId: string) => void;

  updateQuantity: (
    productId: string,
    variantId: string,
    quantity: number
  ) => void;

  clearCart: () => void;
}

export const useCart = create<CartStore>((set) => ({
  items: [],

  addToCart: (item) =>
    set((state) => {
      const existing = state.items.find(
        (i) =>
          i.productId === item.productId &&
          i.variantId === item.variantId
      );

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === item.productId &&
            i.variantId === item.variantId
              ? {
                  ...i,
                  quantity: i.quantity + item.quantity,
                }
              : i
          ),
        };
      }

      return {
        items: [...state.items, item],
      };
    }),

  removeFromCart: (productId, variantId) =>
    set((state) => ({
      items: state.items.filter(
        (i) =>
          !(
            i.productId === productId &&
            i.variantId === variantId
          )
      ),
    })),

  updateQuantity: (productId, variantId, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.productId === productId &&
        i.variantId === variantId
          ? {
              ...i,
              quantity,
            }
          : i
      ),
    })),

  clearCart: () => set({ items: [] }),
}));