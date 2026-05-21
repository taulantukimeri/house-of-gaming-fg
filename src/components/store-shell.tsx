"use client";

import { CartDrawer } from "@/components/cart-drawer";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { ToastStack } from "@/components/toast-stack";
import { CartProvider } from "@/context/cart-context";

import type { Product } from "@/lib/types";

export function StoreShell({
  children,
  initialCart = [],
}: {
  children: React.ReactNode;
  initialCart?: Product[];
}) {
  return (
    <CartProvider initialCart={initialCart}>
      <div id="app-root">
        <Nav />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
        <ToastStack />
      </div>
    </CartProvider>
  );
}
