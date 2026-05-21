"use client";

import { CartDrawer } from "@/components/cart-drawer";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { SearchOverlay } from "@/components/search-overlay";
import { ToastStack } from "@/components/toast-stack";
import { CartProvider } from "@/context/cart-context";
import { SearchProvider } from "@/context/search-context";

import type { Product } from "@/lib/types";

export function StoreShell({
  children,
  initialCart = [],
}: {
  children: React.ReactNode;
  initialCart?: Product[];
}) {
  return (
    <SearchProvider>
      <CartProvider initialCart={initialCart}>
        <div id="app-root">
          <Nav />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <SearchOverlay />
          <ToastStack />
        </div>
      </CartProvider>
    </SearchProvider>
  );
}
