"use client";

import { ProductArt } from "@/components/product-art";
import { Badge, FGStamp, StockPill } from "@/components/ui-primitives";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  onNavigate: () => void;
  onAdd: () => void;
}

export function ProductCard({ product: p, onNavigate, onAdd }: ProductCardProps) {
  return (
    <div className="pcard" onClick={onNavigate} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onNavigate()}>
      <div className="pcard-top">
        {p.verified ? (
          <FGStamp />
        ) : p.badge ? (
          <Badge kind={p.badge.type}>{p.badge.label}</Badge>
        ) : (
          <span className="t-eyebrow" style={{ color: "var(--mute)" }}>
            {p.catLabel}
          </span>
        )}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--bone-dim)",
          }}
        >
          {p.sku}
        </span>
      </div>
      <div className="pcard-img">
        <ProductArt kind={p.art} />
      </div>
      <div className="pcard-body">
        <div className="pcard-title">{p.fullName}</div>
        <div className="pcard-meta">{p.blurb}</div>
      </div>
      <div className="pcard-foot">
        <span className="pcard-price">
          {p.msrp && <s>€{p.msrp}</s>}€{p.price}
        </span>
        <StockPill stock={p.stock} label={p.stockLabel} />
      </div>
      <div style={{ padding: "0 16px 16px" }}>
        <button
          type="button"
          className={
            "btn btn--block " +
            (p.stock === "err"
              ? "btn--secondary"
              : p.badge?.type === "ignit"
                ? "btn--ignit"
                : "btn--primary")
          }
          onClick={(e) => {
            e.stopPropagation();
            if (p.stock !== "err") onAdd();
          }}
        >
          {p.stock === "err"
            ? "Notify me"
            : p.badge?.type === "ignit"
              ? "Pre-order"
              : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
