"use client";

import { ProductArt } from "@/components/product-art";
import { Icon } from "@/components/icon";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  onNavigate: () => void;
  onAdd?: () => void;
}

export function ProductCard({ product: p, onNavigate }: ProductCardProps) {
  const discount = p.msrp ? Math.round((1 - p.price / p.msrp) * 100) : 0;
  const isNew = p.badge?.label === "New";
  const isFlash = p.badge?.label === "24h";

  return (
    <div
      className="pcard"
      onClick={onNavigate}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onNavigate()}
    >
      {/* Image area */}
      <div className="pcard-img-wrap">
        {/* Top-left badges */}
        <div className="pcard-badges-left">
          {isNew && <span className="pcard-new-badge">New</span>}
          {isFlash && <span className="pcard-flash-badge">24h</span>}
        </div>

        {/* Discount badge — top-right */}
        {discount > 0 && (
          <span className="pcard-discount-badge">-{discount}%</span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          className="pcard-wish"
          title="Add to wishlist"
          onClick={(e) => e.stopPropagation()}
        >
          <Icon name="heart" size={15} />
        </button>

        <div className="pcard-img">
          {p.imageUrl
            ? <img src={p.imageUrl} alt={p.fullName} style={{ width: "80%", height: "80%", objectFit: "contain" }} />
            : <ProductArt kind={p.art} />
          }
        </div>
      </div>

      {/* Info */}
      <div className="pcard-body">
        <div className="pcard-title">{p.fullName}</div>
        <div className="pcard-price-row">
          {p.msrp && <s className="pcard-msrp">{p.msrp.toFixed(2)} €</s>}
          <span className="pcard-price">{p.price.toFixed(2)} €</span>
        </div>
        {p.stock === "warn" && (
          <div className="pcard-stock-warn">Only {p.quantity} left!</div>
        )}
      </div>
    </div>
  );
}
