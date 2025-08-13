'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image?: string; // miniatura en el drawer
};

type CartState = {
  items: CartItem[];

  addItem: (item: Omit<CartItem, 'qty'>, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;

  subtotal: () => number;
  totalItems: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item, qty = 1) =>
        set((state) => {
          const idx = state.items.findIndex((i) => i.id === item.id);
          if (idx >= 0) {
            const prev = state.items[idx];
            const next = {
              ...prev,
              qty: prev.qty + qty,
              image: prev.image ?? item.image, // <- rellena si antes no tenía
            };
            const items = [...state.items];
            items[idx] = next;
            return { items };
          }
          return {
            items: [...state.items, { ...item, qty: Math.max(1, qty) }],
          };
        }),
      removeItem: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),

      updateQty: (id, qty) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.id === id ? { ...i, qty: Math.max(1, qty) } : i
          ),
        })),

      clear: () => set({ items: [] }),

      subtotal: () => get().items.reduce((acc, it) => acc + it.price * it.qty, 0),

      totalItems: () => get().items.reduce((acc, it) => acc + it.qty, 0),
    }),
    { name: 'pineapple-cart' } // localStorage key
  )
);
