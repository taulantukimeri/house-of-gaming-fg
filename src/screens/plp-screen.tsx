"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import { EyebrowBar } from "@/components/ui-primitives";
import { useCart } from "@/context/cart-context";
import type { Category, Product } from "@/lib/types";

const CAT_COPY: Record<string, string> = {
  mice: "Wireless, lightweight, and pro-grade. From 54 g sniping shells to 8 K Hz tracking. Tested 200 h before they get the FG stamp.",
  keyboards: "Mechanical, hot-swap, analog hall-effect. From 60% to full-size, gasket to tray-mount. We list the switch specs, not adjectives.",
  chairs: "Engineered for eight-hour sessions. Pixelated lumbar, NeoHybrid leatherette, magnetic head pillows.",
  desks: "Sit/stand frames, magnetic cable trays, full-surface mats. Built for the desk you actually use.",
  headsets: "Hi-Res certified drivers, active noise cancellation, dual-battery base stations. No latency, no cables, no compromise.",
  accessories: "Switches, keycaps, controllers, cable management, lighting. The 5% that makes a 50% difference.",
};

export function PLPScreen({
  category,
  products,
}: {
  category: Category;
  products: Product[];
}) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [sort, setSort] = useState("curated");
  const display = products;

  return (
    <div className="page-enter container" style={{ paddingTop: 48, paddingBottom: 64 }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.12em",
          color: "var(--mute)",
          textTransform: "uppercase",
          marginBottom: 24,
        }}
      >
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
          HOME
        </Link>
        <span style={{ margin: "0 8px" }}>/</span>
        <span style={{ color: "var(--bone-dim)" }}>{category.name.toUpperCase()}</span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          borderBottom: "1px solid var(--border)",
          paddingBottom: 32,
          marginBottom: 32,
        }}
      >
        <div>
          <EyebrowBar>▲ FG CURATED · {category.count} ITEMS</EyebrowBar>
          <h1 className="t-display-lg" style={{ marginTop: 16 }}>
            {category.name}
          </h1>
          <p style={{ color: "var(--bone-dim)", marginTop: 16, maxWidth: 560, lineHeight: 1.55 }}>
            {CAT_COPY[category.id] || CAT_COPY.mice}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--mute)",
              letterSpacing: "0.14em",
            }}
          >
            SORT
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="input"
            style={{ width: 200, padding: "8px 12px" }}
          >
            <option value="curated">FG curated</option>
            <option value="new">Newest</option>
            <option value="price-asc">Price · low to high</option>
            <option value="price-desc">Price · high to low</option>
          </select>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 48 }}>
        <aside className="filter-side">
          <div className="filter-group" style={{ borderTop: "1px solid var(--border)" }}>
            <h4>Brand</h4>
            {["Logitech G", "ASUS ROG", "Razer", "SteelSeries", "Wooting", "Secretlab", "Herman Miller"].map(
              (b, i) => (
                <label key={b} className="filter-checkbox">
                  <input type="checkbox" defaultChecked={i < 2} readOnly />
                  <span>{b}</span>
                  <span className="count">{[8, 4, 6, 3, 1, 5, 2][i]}</span>
                </label>
              )
            )}
          </div>
          <div className="filter-group">
            <h4>FG status</h4>
            <label className="filter-checkbox">
              <input type="checkbox" defaultChecked readOnly />
              <span style={{ color: "var(--voltage)" }}>▲ FG Verified only</span>
              <span className="count">12</span>
            </label>
          </div>
        </aside>

        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 24,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.12em",
              color: "var(--mute)",
              textTransform: "uppercase",
            }}
          >
            <span>
              SHOWING <span style={{ color: "var(--bone)" }}>{display.length}</span> OF{" "}
              {category.count}
            </span>
            <span>
              <span style={{ color: "var(--voltage)" }}>▲</span> FG verified · sorted by curation
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {display.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onNavigate={() => router.push(`/product/${p.id}`)}
                onAdd={() => addToCart(p)}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
