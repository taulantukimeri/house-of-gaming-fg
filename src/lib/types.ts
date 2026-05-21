export type StockStatus = "ok" | "warn" | "err";

export type ProductArt =
  | "mouse"
  | "keyboard"
  | "headset"
  | "chair"
  | "desk"
  | "controller";

export interface ProductBadge {
  type: "volt" | "ignit" | "ok" | "warn" | "mute" | "live";
  label: string;
}

export interface Product {
  id: string;
  sku: string;
  cat: string;
  catLabel: string;
  brand: string;
  name: string;
  fullName: string;
  blurb: string;
  long: string;
  price: number;
  msrp: number | null;
  stock: StockStatus;
  stockLabel: string;
  verified: boolean;
  badge?: ProductBadge | null;
  art: ProductArt;
  specs: [string, string][];
  swatches?: Record<string, string[]>;
}

export interface Category {
  id: string;
  name: string;
  count: number;
  art: ProductArt;
}

export interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: number;
  tracking: string;
  preview: ProductArt[];
}

export interface CartItem {
  product: Product;
  qty: number;
}

export interface Toast {
  id: number;
  title: string;
  sub?: string;
}
