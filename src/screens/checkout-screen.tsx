"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductArt } from "@/components/product-art";
import { useCart } from "@/context/cart-context";

export function CheckoutScreen() {
  const router = useRouter();
  const { cart: items } = useCart();
  const [step, setStep] = useState<"address" | "payment">("address");
  const [pay, setPay] = useState("card");

  const subtotal = items.reduce((s, it) => s + it.product.price * it.qty, 0);
  const shipping = subtotal > 150 ? 0 : 12;
  const tax = Math.round(subtotal * 0.19);
  const total = subtotal + shipping + tax;

  return (
    <div className="page-enter container" style={{ paddingTop: 32, paddingBottom: 64 }}>
      <div className="breadcrumb" style={{ marginBottom: 24 }}>
        <span className="breadcrumb-link" style={{ cursor: "pointer" }} onClick={() => router.push("/")}>Home</span>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-link" style={{ cursor: "pointer" }} onClick={() => router.back()}>Cart</span>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">Checkout</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--bone)" }}>
          Checkout
        </h1>
        <div style={{ fontSize: 12, color: "var(--mute)", textAlign: "right" }}>
          🔒 Secure · 256-bit TLS
        </div>
      </div>

      <div className="checkout-layout">
        <div>
          <div className="step-rail">
            <div className="step done">
              <div className="step-num">01 — CART</div>
              <div className="step-title">
                {items.length} items · {subtotal.toFixed(2)} €
              </div>
            </div>
            <div className={`step ${step === "address" ? "active" : step === "payment" ? "done" : ""}`}>
              <div className="step-num">02 — ADDRESS</div>
              <div className="step-title">
                {step === "address" ? "In progress" : "Berlin · DE"}
              </div>
            </div>
            <div className={`step ${step === "payment" ? "active" : ""}`}>
              <div className="step-num">03 — PAYMENT</div>
              <div className="step-title">
                {step === "payment" ? "In progress" : "Pending"}
              </div>
            </div>
          </div>

          {step === "address" && (
            <>
              <h2 className="t-h1" style={{ marginBottom: 24 }}>
                Where should it ship?
              </h2>
              <div className="form-grid full" style={{ marginBottom: 16 }}>
                <div className="field field-full">
                  <span className="field-label">EMAIL</span>
                  <input className="input" defaultValue="alex@studio.io" />
                </div>
              </div>
              <div className="form-grid" style={{ marginBottom: 16 }}>
                <div className="field">
                  <span className="field-label">FIRST NAME</span>
                  <input className="input" defaultValue="Alex" />
                </div>
                <div className="field">
                  <span className="field-label">LAST NAME</span>
                  <input className="input" defaultValue="Park" />
                </div>
              </div>
              <div className="form-grid full" style={{ marginBottom: 32 }}>
                <div className="field field-full">
                  <span className="field-label">STREET ADDRESS</span>
                  <input className="input" defaultValue="Linienstraße 142" />
                </div>
              </div>
              <button
                type="button"
                className="btn btn--primary btn--lg"
                onClick={() => setStep("payment")}
              >
                Continue to payment →
              </button>
            </>
          )}

          {step === "payment" && (
            <>
              <h2 className="t-h1" style={{ marginBottom: 24 }}>
                Payment
              </h2>
              <div className="checkout-pay-methods">
                {[
                  { id: "card", label: "CARD" },
                  { id: "klarna", label: "KLARNA · 4×" },
                  { id: "paypal", label: "PAYPAL" },
                ].map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setPay(m.id)}
                    role="button"
                    tabIndex={0}
                    style={{
                      padding: 14,
                      border: `1px solid ${pay === m.id ? "var(--voltage)" : "var(--border)"}`,
                      borderRadius: 4,
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      color: pay === m.id ? "var(--voltage)" : "var(--bone-dim)",
                      textAlign: "center",
                      cursor: "pointer",
                      background: pay === m.id ? "var(--voltage-soft)" : "var(--surface-1)",
                    }}
                  >
                    {m.label}
                  </div>
                ))}
              </div>
              {pay === "card" && (
                <div className="form-grid full" style={{ marginBottom: 32 }}>
                  <div className="field field-full">
                    <span className="field-label">CARD NUMBER</span>
                    <input
                      className="input"
                      defaultValue="4242 4242 4242 4242"
                      style={{ fontFamily: "var(--font-mono)" }}
                    />
                  </div>
                </div>
              )}
              <div className="checkout-btn-row">
                <button
                  type="button"
                  className="btn btn--ghost btn--lg"
                  onClick={() => setStep("address")}
                >
                  ← Back
                </button>
                <button
                  type="button"
                  className="btn btn--primary btn--lg"
                  onClick={() => router.push("/order/confirmed")}
                >
                  Place order — {total.toFixed(2)} €
                </button>
              </div>
            </>
          )}
        </div>

        <aside className="checkout-aside">
          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: 24,
              background: "var(--surface-1)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                fontWeight: 600,
                marginBottom: 20,
                color: "var(--bone)",
              }}
            >
              Your order
            </div>
            {items.map((it) => (
              <div
                key={it.product.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "56px 1fr auto",
                  gap: 12,
                  padding: "12px 0",
                  borderTop: "1px solid var(--border)",
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
                    position: "relative",
                  }}
                >
                  <ProductArt kind={it.product.art} size={36} />
                  <span
                    style={{
                      position: "absolute",
                      top: -6,
                      right: -6,
                      background: "var(--surface-3)",
                      borderRadius: 999,
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      padding: "2px 6px",
                      color: "var(--bone)",
                    }}
                  >
                    {it.qty}
                  </span>
                </div>
                <div>
                  <div style={{ fontSize: 13, color: "var(--bone)", lineHeight: 1.3 }}>
                    {it.product.fullName}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    color: "var(--bone)",
                  }}
                >
                  {(it.product.price * it.qty).toFixed(2)} €
                </div>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginTop: 16,
                paddingTop: 16,
                borderTop: "1px solid var(--border-strong)",
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
                TOTAL · EUR
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                {total.toFixed(2)} €
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
