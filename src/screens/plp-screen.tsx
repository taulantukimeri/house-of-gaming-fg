"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import { useCart } from "@/context/cart-context";
import type { Category, Product } from "@/lib/types";

const CAT_DESC: Record<string, string> = {
  mice: "From ultra-lightweight wireless to wired precision — find the gaming mouse that matches your grip style and playstyle.",
  keyboards: "Mechanical, Hall-effect, wireless. Full-size to 60%. Every switch type in stock.",
  chairs: "Engineered for long sessions. From entry-level to pro-grade ergonomic seating.",
  desks: "Sit-stand frames, cable management and full-surface mats for your perfect setup.",
  headsets: "Hi-Res certified, ANC, wireless. Crystal-clear audio for competitive and immersive play.",
  accessories: "Mousepads, keycaps, charging mats, stream decks and more.",
};

const BRANDS: Record<string, string[]> = {
  mice: ["Logitech G", "Razer", "SteelSeries", "ASUS ROG", "Corsair", "HyperX", "ZOWIE"],
  keyboards: ["Logitech G", "Razer", "SteelSeries", "Corsair", "HyperX", "Keychron", "ASUS ROG"],
  chairs: ["Secretlab", "ASUS ROG", "Corsair", "DXRacer", "AndaSeat"],
  desks: ["Secretlab", "Flexispot", "Uplift", "ASUS ROG"],
  headsets: ["Logitech G", "Razer", "SteelSeries", "Corsair", "HyperX", "ASUS ROG"],
  accessories: ["Logitech G", "Razer", "SteelSeries", "Corsair", "HyperX", "Keychron"],
};

const PRICE_RANGES = [
  { label: "Under €50", min: 0, max: 50 },
  { label: "€50 – €100", min: 50, max: 100 },
  { label: "€100 – €200", min: 100, max: 200 },
  { label: "€200 – €500", min: 200, max: 500 },
  { label: "Over €500", min: 500, max: Infinity },
];

const PAGE_SIZE = 12;

export function PLPScreen({ category, products }: { category: Category; products: Product[] }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);
  const [activeBrands, setActiveBrands] = useState<Set<string>>(new Set());
  const [activePriceRange, setActivePriceRange] = useState<number | null>(null);
  const [inStockOnly, setInStockOnly] = useState(true);

  const brands = BRANDS[category.id] ?? [];

  const toggleBrand = (b: string) => {
    setActiveBrands((prev) => {
      const next = new Set(prev);
      next.has(b) ? next.delete(b) : next.add(b);
      return next;
    });
    setPage(1);
  };

  let filtered = products;
  if (inStockOnly) filtered = filtered.filter((p) => p.stock !== "err");
  if (activeBrands.size > 0) filtered = filtered.filter((p) => activeBrands.has(p.brand));
  if (activePriceRange !== null) {
    const r = PRICE_RANGES[activePriceRange];
    filtered = filtered.filter((p) => p.price >= r.min && p.price < r.max);
  }

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "newest") return b.id.localeCompare(a.id);
    if (sort === "discount") {
      const da = a.msrp ? (1 - a.price / a.msrp) : 0;
      const db = b.msrp ? (1 - b.price / b.msrp) : 0;
      return db - da;
    }
    return 0;
  });

  const visibleProducts = sorted.slice(0, page * PAGE_SIZE);
  const hasMore = visibleProducts.length < sorted.length;

  return (
    <div className="page-enter container" style={{ paddingTop: 32, paddingBottom: 64 }}>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link href="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">{category.name}</span>
      </div>

      {/* Page heading */}
      <div className="plp-header">
        <div>
          <h1 className="plp-title">{category.name}</h1>
          <p className="plp-desc">{CAT_DESC[category.id] || ""}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span className="plp-count">{sorted.length} products</span>
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(1); }}
            className="input"
            style={{ width: 220 }}
          >
            <option value="default">Sort: Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
            <option value="discount">Highest Discount %</option>
          </select>
        </div>
      </div>

      <div className="plp-layout">
        {/* Sidebar filters */}
        <aside className="filter-side">
          <div className="filter-group" style={{ borderTop: "1px solid var(--border)" }}>
            <h4>Availability</h4>
            <label className="filter-checkbox">
              <input type="checkbox" checked={inStockOnly} onChange={(e) => { setInStockOnly(e.target.checked); setPage(1); }} />
              <span>In Stock only</span>
            </label>
            <label className="filter-checkbox">
              <input type="checkbox" defaultChecked={false} />
              <span>Special Offers</span>
            </label>
          </div>

          <div className="filter-group">
            <h4>Brand</h4>
            {brands.map((b) => (
              <label key={b} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={activeBrands.has(b)}
                  onChange={() => toggleBrand(b)}
                />
                <span>{b}</span>
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Price Range</h4>
            {PRICE_RANGES.map((r, i) => (
              <label key={r.label} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={activePriceRange === i}
                  onChange={() => { setActivePriceRange(activePriceRange === i ? null : i); setPage(1); }}
                />
                <span>{r.label}</span>
              </label>
            ))}
          </div>

          {activeBrands.size > 0 || activePriceRange !== null ? (
            <button
              type="button"
              className="btn btn--ghost"
              style={{ width: "100%", marginTop: 8, fontSize: 13 }}
              onClick={() => { setActiveBrands(new Set()); setActivePriceRange(null); setPage(1); }}
            >
              Clear filters
            </button>
          ) : null}
        </aside>

        {/* Product grid */}
        <div>
          <div className="plp-grid">
            {visibleProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onNavigate={() => router.push(`/product/${p.id}`)}
                onAdd={() => addToCart(p)}
              />
            ))}
          </div>

          {sorted.length === 0 && (
            <div style={{ padding: "64px 0", textAlign: "center", color: "var(--mute)" }}>
              No products found in this category.
            </div>
          )}

          {sorted.length > 0 && (
            <div className="load-more-wrap">
              {hasMore ? (
                <button type="button" className="load-more-btn" onClick={() => setPage((p) => p + 1)}>
                  Show more products
                </button>
              ) : (
                <span className="load-more-end">End of results</span>
              )}
              <span style={{ fontSize: 12, color: "var(--mute)" }}>
                Showing {visibleProducts.length} of {sorted.length} products
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
