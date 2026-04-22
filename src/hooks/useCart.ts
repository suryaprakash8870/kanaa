"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  variantId: string;
  productId: string;
  name: string;
  weight: string;
  price: number;
  mrp?: number;
  image?: string;
  color?: string;
  qty: number;
  stock: number;
};

type CartState = {
  lines: CartLine[];
  open: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  add: (line: Omit<CartLine, "qty">, qty?: number) => void;
  remove: (variantId: string) => void;
  setQty: (variantId: string, qty: number) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      open: false,
      openDrawer: () => set({ open: true }),
      closeDrawer: () => set({ open: false }),
      add: (line, qty = 1) =>
        set((s) => {
          const existing = s.lines.find((l) => l.variantId === line.variantId);
          if (existing) {
            return {
              open: true,
              lines: s.lines.map((l) =>
                l.variantId === line.variantId
                  ? { ...l, qty: Math.min(l.qty + qty, line.stock || 99) }
                  : l
              ),
            };
          }
          return { open: true, lines: [...s.lines, { ...line, qty }] };
        }),
      remove: (variantId) =>
        set((s) => ({ lines: s.lines.filter((l) => l.variantId !== variantId) })),
      setQty: (variantId, qty) =>
        set((s) => ({
          lines: s.lines
            .map((l) => (l.variantId === variantId ? { ...l, qty } : l))
            .filter((l) => l.qty > 0),
        })),
      clear: () => set({ lines: [] }),
      count: () => get().lines.reduce((n, l) => n + l.qty, 0),
      subtotal: () => get().lines.reduce((n, l) => n + l.price * l.qty, 0),
    }),
    { name: "kanaa-cart" },
  ),
);
