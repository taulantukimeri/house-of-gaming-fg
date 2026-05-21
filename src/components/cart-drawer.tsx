"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@/components/icon";
import { ProductArt } from "@/components/product-art";
import { useCart } from "@/context/cart-context";

export function CartDrawer() {
  const router = useRouter();
  const {
    cart: items,
    cartOpen,
    closeCart,
    updateQty,
    removeFromCart,
  } = useCart();

  if (!cartOpen) return null;

  const subtotal = items.reduce((s, it) => s + it.product.price * it.qty, 0);
  const shipping = subtotal > 150 ? 0 : 12;
  const total = subtotal + shipping;

  const goCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <>
      <div className="scrim" onClick={closeCart} role="presentation" />
      <aside className="drawer">
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div className="t-eyebrow">
              ▲ YOUR CART · {items.length}{" "}
              {items.length === 1 ? "ITEM" : "ITEMS"}
            </div>
            <div className="t-h2" style={{ marginTop: 4 }}>
              Cart
            </div>
          </div>
          <button type="button" className="nav-icon" onClick={closeCart}>
            <Icon name="x" size={20} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
          {items.length === 0 && (
            <div style={{ padding: 64, textAlign: "center" }}>
              <div style={{ color: "var(--mute)", marginBottom: 16 }}>
                <ProductArt kind="package" size={48} />
              </div>
              <div className="t-body-sm">No items yet. Browse the catalog.</div>
            </div>
          )}
          {items.map((it) => (
            <div
              key={it.product.id}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr auto",
                gap: 16,
                padding: "20px 24px",
                borderBottom: "1px solid var(--border)",
                alignItems: "start",
              }}
            >
              <div
                style={{
                  aspectRatio: "1",
                  background: "var(--surface-2)",
                  borderRadius: 4,
                  display: "grid",
                  placeItems: "center",
                  color: "var(--bone-dim)",
                }}
              >
                <ProductArt kind={it.product.art} size={48} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 14,
                    fontWeight: 600,
                    lineHeight: 1.3,
                  }}
                >
                  {it.product.fullName}
                </div>
                <div style={{ fontSize: 12, color: "var(--mute)", marginTop: 4 }}>
                  {it.product.blurb}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginTop: 12,
                    alignItems: "center",
                  }}
                >
                  <button
                    type="button"
                    className="nav-icon"
                    style={{ width: 28, height: 28 }}
                    onClick={() => updateQty(it.product.id, it.qty - 1)}
                  >
                    <Icon name="minus" size={14} />
                  </button>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 13,
                      minWidth: 20,
                      textAlign: "center",
                    }}
                  >
                    {it.qty}
                  </span>
                  <button
                    type="button"
                    className="nav-icon"
                    style={{ width: 28, height: 28 }}
                    onClick={() => updateQty(it.product.id, it.qty + 1)}
                  >
                    <Icon name="plus" size={14} />
                  </button>
                  <span
                    style={{
                      marginLeft: 16,
                      color: "var(--mute)",
                      fontSize: 11,
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.1em",
                      cursor: "pointer",
                      textTransform: "uppercase",
                    }}
                    onClick={() => removeFromCart(it.product.id)}
                    role="button"
                    tabIndex={0}
                  >
                    Remove
                  </span>
                </div>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 14,
                  color: "var(--bone)",
                  fontWeight: 500,
                }}
              >
                €{it.product.price * it.qty}
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div
            style={{
              borderTop: "1px solid var(--border)",
              padding: "20px 24px",
              background: "var(--surface-1)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
                fontSize: 13,
                color: "var(--bone-dim)",
              }}
            >
              <span>Subtotal</span>
              <span style={{ fontFamily: "var(--font-mono)" }}>€{subtotal}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
                fontSize: 13,
                color: "var(--bone-dim)",
              }}
            >
              <span>
                Shipping{" "}
                {shipping === 0 && (
                  <span style={{ color: "var(--voltage)" }}>· free over €150</span>
                )}
              </span>
              <span style={{ fontFamily: "var(--font-mono)" }}>
                {shipping === 0 ? "—" : `€${shipping}`}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 12,
                paddingTop: 12,
                borderTop: "1px solid var(--border)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--mute)",
                }}
              >
                TOTAL
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 24,
                  fontWeight: 600,
                }}
              >
                €{total}
              </span>
            </div>
            <button
              type="button"
              className="btn btn--primary btn--lg btn--block"
              style={{ marginTop: 20 }}
              onClick={goCheckout}
            >
              Checkout — €{total}
            </button>
            <div
              style={{
                textAlign: "center",
                marginTop: 12,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.14em",
                color: "var(--mute)",
                textTransform: "uppercase",
              }}
            >
              ▲ FG WARRANTY EXTENSION INCLUDED
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
