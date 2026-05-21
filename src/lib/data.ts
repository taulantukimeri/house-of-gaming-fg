import type { Category, Order, Product } from "./types";

export const PRODUCTS: Product[] = [];

export const CATEGORIES: Category[] = [
  { id: "chairs", name: "Chairs", count: 14, art: "chair" },
  { id: "desks", name: "Desks", count: 8, art: "desk" },
  { id: "keyboards", name: "Keyboards", count: 32, art: "keyboard" },
  { id: "mice", name: "Mice", count: 18, art: "mouse" },
  { id: "headsets", name: "Headsets", count: 22, art: "headset" },
  { id: "accessories", name: "Accessories", count: 60, art: "controller" },
];

export const ORDERS: Order[] = [
  {
    id: "0029",
    date: "12 May 2026",
    status: "Shipped",
    total: 488,
    items: 2,
    tracking: "DHL EA-2087-91X",
    preview: ["mouse", "headset"],
  },
  {
    id: "0014",
    date: "02 Apr 2026",
    status: "Delivered",
    total: 1495,
    items: 1,
    tracking: "—",
    preview: ["chair"],
  },
  {
    id: "0007",
    date: "18 Feb 2026",
    status: "Delivered",
    total: 199,
    items: 1,
    tracking: "—",
    preview: ["keyboard"],
  },
];

export function byId(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function byCat(cat: string): Product[] {
  return PRODUCTS.filter((p) => p.cat === cat);
}

export const INITIAL_CART_IDS: string[] = [];
