"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icon";
import { ProductArt } from "@/components/product-art";
import { ProductCard } from "@/components/product-card";
import { useCart } from "@/context/cart-context";
import type { Product } from "@/lib/types";

export function PDPScreen({ product: p, allProducts }: { product: Product; allProducts: Product[] }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [thumb, setThumb] = useState(0);
  const [config, setConfig] = useState<Record<string, string>>(() => {
    const c: Record<string, string> = {};
    Object.keys(p.swatches || {}).forEach((k) => { c[k] = p.swatches![k][0]; });
    return c;
  });
  const [qty, setQty] = useState(1);

  const related = allProducts.filter((x) => x.id !== p.id && x.cat === p.cat).slice(0, 4);
  const discount = p.msrp ? Math.round((1 - p.price / p.msrp) * 100) : 0;

  return (
    <div className="page-enter container" style={{ paddingTop: 24, paddingBottom: 64 }}>

      {/* Breadcrumb */}
      <div className="breadcrumb" style={{ marginBottom: 24 }}>
        <Link href="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <Link href={`/catalog/${p.cat}`} className="breadcrumb-link">{p.catLabel}</Link>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">{p.brand}</span>
      </div>

      <div className="pdp-layout">
        {/* Gallery */}
        <div>
          <div className="pdp-gallery">
            {discount > 0 && (
              <div style={{
                position: "absolute", top: 16, left: 16, zIndex: 2,
                background: "var(--ignition)", color: "#fff",
                fontWeight: 700, fontSize: 13,
                padding: "4px 10px", borderRadius: 4,
              }}>
                -{discount}%
              </div>
            )}
            {p.imageUrl
              ? <img src={p.imageUrl} alt={p.fullName} style={{ width: "100%", height: "100%", objectFit: "contain", position: "relative", zIndex: 1 }} />
              : <ProductArt kind={p.art} />
            }
          </div>
          {!p.imageUrl && (
            <div className="pdp-thumbs">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`pdp-thumb ${i === thumb ? "active" : ""}`} onClick={() => setThumb(i)} role="button" tabIndex={0}>
                  <ProductArt kind={p.art} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info panel */}
        <div>
          <div style={{ fontSize: 13, color: "var(--mute)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {p.brand}
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, lineHeight: 1.25, marginBottom: 16, color: "var(--bone)" }}>
            {p.fullName}
          </h1>

          {/* Stock */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: p.stock === "ok" ? "#ECFDF5" : p.stock === "warn" ? "#FFFBEB" : "#FEF2F2",
              color: p.stock === "ok" ? "#057A55" : p.stock === "warn" ? "#D97706" : "#E02424",
              fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 999,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }} />
              {p.stockLabel}
            </span>
            {p.stock === "warn" && <span style={{ fontSize: 12, color: "var(--mute)" }}>Only {p.quantity} left</span>}
          </div>

          {/* Price */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 700, color: "var(--bone)" }}>
              {p.price.toFixed(2)} €
            </span>
            {p.msrp && (
              <>
                <s style={{ fontSize: 18, color: "var(--mute)" }}>{p.msrp.toFixed(2)} €</s>
                <span style={{ background: "#E02424", color: "#fff", fontSize: 13, fontWeight: 700, padding: "2px 8px", borderRadius: 4 }}>
                  -{Math.round((1 - p.price / p.msrp) * 100)}%
                </span>
              </>
            )}
          </div>
          <div style={{ fontSize: 13, color: "var(--mute)", marginBottom: 24 }}>
            or {(p.price / 4).toFixed(2)} € × 4 interest-free instalments
          </div>

          <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--bone-dim)", marginBottom: 24, maxWidth: 480 }}>
            {p.long}
          </p>

          {/* Swatches */}
          {Object.entries(p.swatches || {}).map(([group, opts]) => (
            <div key={group} style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--bone)" }}>{group}</span>
                <span style={{ fontSize: 13, color: "var(--mute)" }}>{config[group]}</span>
              </div>
              <div className="swatch-row">
                {opts.map((o) => (
                  <span key={o} className={`swatch ${config[group] === o ? "active" : ""}`} onClick={() => setConfig({ ...config, [group]: o })} role="button" tabIndex={0}>
                    {o}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Qty */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--bone)", marginBottom: 8 }}>Quantity</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, width: "fit-content", border: "1px solid var(--border)", borderRadius: 6 }}>
              <button type="button" className="nav-icon" style={{ width: 40, height: 40, borderRadius: 0 }} onClick={() => setQty(Math.max(1, qty - 1))}>
                <Icon name="minus" size={16} />
              </button>
              <span style={{ minWidth: 48, textAlign: "center", fontWeight: 600 }}>{qty}</span>
              <button type="button" className="nav-icon" style={{ width: 40, height: 40, borderRadius: 0 }} onClick={() => setQty(qty + 1)}>
                <Icon name="plus" size={16} />
              </button>
            </div>
          </div>

          {/* CTA */}
          <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
            <button
              type="button"
              className="btn btn--primary btn--lg"
              style={{ flex: 1 }}
              onClick={() => p.stock !== "err" && addToCart(p, qty)}
              disabled={p.stock === "err"}
            >
              {p.stock === "err" ? "Out of Stock" : `Add to Cart — ${(p.price * qty).toFixed(2)} €`}
            </button>
            <button type="button" className="nav-icon" style={{ width: 52, height: 52, border: "1px solid var(--border)", borderRadius: 8 }} title="Add to Wishlist">
              <Icon name="heart" size={20} />
            </button>
          </div>

          {/* Guarantees */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "16px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
            {[
              { icon: "🚚", text: "Free shipping on orders over €150" },
              { icon: "↩️", text: "30-day hassle-free returns" },
              { icon: "🛡️", text: "Authentic product with manufacturer warranty" },
            ].map((g) => (
              <div key={g.text} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 13, color: "var(--bone-dim)" }}>
                <span style={{ fontSize: 18 }}>{g.icon}</span>
                {g.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Specs table */}
      <section style={{ marginTop: 64 }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, marginBottom: 24, color: "var(--bone)" }}>
          Technical Specifications
        </h2>
        <table className="spec">
          <tbody>
            {p.specs.map(([k, v]) => (
              <tr key={k}>
                <td>{k}</td>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section style={{ marginTop: 64 }}>
          <div className="sec-head">
            <h2 className="sec-title">You may also like</h2>
            <Link href={`/catalog/${p.cat}`} className="sec-link">See all {p.catLabel} →</Link>
          </div>
          <div className="featured-grid">
            {related.map((rp) => (
              <ProductCard key={rp.id} product={rp} onNavigate={() => router.push(`/product/${rp.id}`)} onAdd={() => addToCart(rp)} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
