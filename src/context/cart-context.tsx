"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, Product, Toast } from "@/lib/types";

interface CartContextValue {
  cart: CartItem[];
  cartCount: number;
  cartOpen: boolean;
  toasts: Toast[];
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, qty?: number) => void;
  updateQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function buildInitialCart(products: Product[]): CartItem[] {
  return products.map((product) => ({ product, qty: 1 }));
}

export function CartProvider({
  children,
  initialCart = [],
}: {
  children: ReactNode;
  initialCart?: Product[];
}) {
  const [cart, setCart] = useState<CartItem[]>(() => buildInitialCart(initialCart));
  const [cartOpen, setCartOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastIdRef = useRef(0);

  const cartCount = cart.reduce((s, it) => s + it.qty, 0);

  const addToCart = useCallback((product: Product, qty = 1) => {
    setCart((c) => {
      const existing = c.find((it) => it.product.id === product.id);
      if (existing) {
        return c.map((it) =>
          it.product.id === product.id
            ? { ...it, qty: it.qty + qty }
            : it
        );
      }
      return [...c, { product, qty }];
    });

    const id = toastIdRef.current++;
    setToasts((t) => [
      ...t,
      {
        id,
        title: `Added — ${product.fullName}`,
        sub: `${qty} × ${product.price.toFixed(2)} € · ${product.stockLabel.toLowerCase()}`,
      },
    ]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 4000);
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty <= 0) {
      setCart((c) => c.filter((it) => it.product.id !== id));
      return;
    }
    setCart((c) =>
      c.map((it) => (it.product.id === id ? { ...it, qty } : it))
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((c) => c.filter((it) => it.product.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      cartOpen,
      toasts,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      addToCart,
      updateQty,
      removeFromCart,
    }),
    [cart, cartCount, cartOpen, toasts, addToCart, updateQty, removeFromCart]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
