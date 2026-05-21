"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icon";
import { ProductArt } from "@/components/product-art";
import { ProductCard } from "@/components/product-card";
import { Badge, EyebrowBar, FGStamp, StockPill } from "@/components/ui-primitives";
import { useCart } from "@/context/cart-context";
import type { Product } from "@/lib/types";

export function PDPScreen({
  product: p,
  allProducts,
}: {
  product: Product;
  allProducts: Product[];
}) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [thumb, setThumb] = useState(0);
  const [config, setConfig] = useState<Record<string, string>>(() => {
    const c: Record<string, string> = {};
    Object.keys(p.swatches || {}).forEach((k) => {
      c[k] = p.swatches![k][0];
    });
    return c;
  });
  const [qty, setQty] = useState(1);

  const related = allProducts.filter((x) => x.id !== p.id && x.cat === p.cat).slice(0, 3);
  const cross = allProducts.filter((x) => x.id !== p.id && x.cat !== p.cat).slice(0, 4);

  return (
    <div className="page-enter container" style={{ paddingTop: 32, paddingBottom: 64 }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.12em",
          color: "var(--mute)",
          textTransform: "uppercase",
          marginBottom: 32,
        }}
      >
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
          HOME
        </Link>
        <span style={{ margin: "0 8px" }}>/</span>
        <Link href={`/catalog/${p.cat}`} style={{ color: "inherit", textDecoration: "none" }}>
          {p.catLabel}
        </Link>
        <span style={{ margin: "0 8px" }}>/</span>
        <span style={{ color: "var(--bone-dim)" }}>{p.brand.toUpperCase()}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
        <div>
          <div className="pdp-gallery">
            {p.imageUrl
              ? <img src={p.imageUrl} alt={p.fullName} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              : <ProductArt kind={p.art} />
            }
          </div>
          {!p.imageUrl && (
            <div className="pdp-thumbs">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`pdp-thumb ${i === thumb ? "active" : ""}`}
                  onClick={() => setThumb(i)}
                  role="button"
                  tabIndex={0}
                >
                  <ProductArt kind={p.art} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            {p.verified ? (
              <FGStamp />
            ) : p.badge ? (
              <Badge kind={p.badge.type}>{p.badge.label}</Badge>
            ) : (
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--mute)",
                  textTransform: "uppercase",
                }}
              >
                {p.catLabel}
              </span>
            )}
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--bone-dim)",
                letterSpacing: "0.08em",
              }}
            >
              SKU · {p.sku}
            </span>
          </div>

          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--bone-dim)",
              letterSpacing: "0.08em",
              marginBottom: 8,
            }}
          >
            {p.brand}
          </div>
          <h1 className="t-display-md" style={{ marginBottom: 16 }}>
            {p.name}
          </h1>
          <p
            style={{
              color: "var(--bone-dim)",
              fontSize: 16,
              lineHeight: 1.6,
              marginBottom: 24,
              maxWidth: 480,
            }}
          >
            {p.long}
          </p>

          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 8 }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 40,
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              €{p.price}
            </span>
            {p.msrp && (
              <>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 16,
                    color: "var(--mute)",
                    textDecoration: "line-through",
                  }}
                >
                  €{p.msrp}
                </span>
                <Badge kind="ignit">SAVE €{p.msrp - p.price}</Badge>
              </>
            )}
          </div>
          <div style={{ fontSize: 13, color: "var(--mute)", marginBottom: 24 }}>
            or €{Math.round(p.price / 4)} × 4 with Klarna · 0% APR
          </div>

          <StockPill stock={p.stock} label={p.quantity > 0 && p.quantity <= 3 ? `Only ${p.quantity} left!` : p.stockLabel} />

          <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 20 }}>
            {Object.entries(p.swatches || {}).map(([group, opts]) => (
              <div key={group}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      color: "var(--mute)",
                      textTransform: "uppercase",
                    }}
                  >
                    {group}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--bone)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {config[group]}
                  </span>
                </div>
                <div className="swatch-row">
                  {opts.map((o) => (
                    <span
                      key={o}
                      className={`swatch ${config[group] === o ? "active" : ""}`}
                      onClick={() => setConfig({ ...config, [group]: o })}
                      role="button"
                      tabIndex={0}
                    >
                      {o}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--mute)",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                QTY
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  width: "fit-content",
                  border: "1px solid var(--border)",
                  borderRadius: 4,
                }}
              >
                <button
                  type="button"
                  className="nav-icon"
                  style={{ width: 40, height: 40, borderRadius: 0 }}
                  onClick={() => setQty(Math.max(1, qty - 1))}
                >
                  <Icon name="minus" size={16} />
                </button>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 14,
                    minWidth: 40,
                    textAlign: "center",
                  }}
                >
                  {qty}
                </span>
                <button
                  type="button"
                  className="nav-icon"
                  style={{ width: 40, height: 40, borderRadius: 0 }}
                  onClick={() => setQty(qty + 1)}
                >
                  <Icon name="plus" size={16} />
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
            <button
              type="button"
              className={
                "btn btn--lg " +
                (p.stock === "err"
                  ? "btn--secondary"
                  : p.badge?.type === "ignit"
                    ? "btn--ignit"
                    : "btn--primary")
              }
              style={{ flex: 1 }}
              onClick={() => p.stock !== "err" && addToCart(p, qty)}
            >
              {p.stock === "err"
                ? "Notify me when in stock"
                : p.badge?.type === "ignit"
                  ? `Pre-order — €${p.price * qty}`
                  : `Add to cart — €${p.price * qty}`}
            </button>
            <button type="button" className="btn btn--ghost btn--lg" title="Save for later">
              <Icon name="heart" size={18} />
            </button>
          </div>
        </div>
      </div>

      <section style={{ marginTop: 96, display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 64 }}>
        <div>
          <EyebrowBar>▲ THE TECHNICAL READOUT</EyebrowBar>
          <h2 className="t-display-md" style={{ marginTop: 16 }}>
            Specs in full.
          </h2>
        </div>
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

      <section style={{ marginTop: 96 }}>
        <div className="sec-head">
          <div>
            <EyebrowBar>— MORE IN {p.catLabel}</EyebrowBar>
            <h2 className="sec-title" style={{ marginTop: 12 }}>
              Often considered together
            </h2>
          </div>
          <Link href={`/catalog/${p.cat}`} className="sec-link">
            See all {p.catLabel.toLowerCase()} →
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[...related, ...cross].slice(0, 3).map((rp) => (
            <ProductCard
              key={rp.id}
              product={rp}
              onNavigate={() => router.push(`/product/${rp.id}`)}
              onAdd={() => addToCart(rp)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
