"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductArt } from "@/components/product-art";
import { StockPill } from "@/components/ui-primitives";
import { ORDERS } from "@/lib/data";
import type { Product } from "@/lib/types";

const TABS = [
  { id: "overview", label: "Overview", count: null as number | null },
  { id: "orders", label: "Orders", count: ORDERS.length },
  { id: "builds", label: "Saved builds", count: 2 },
  { id: "addresses", label: "Addresses", count: 2 },
  { id: "payment", label: "Payment methods", count: 1 },
  { id: "warranty", label: "Warranty", count: 3 },
  { id: "tradein", label: "Trade-in", count: null },
  { id: "settings", label: "Settings", count: null },
];

export function AccountScreen({
  suggestedProducts,
}: {
  suggestedProducts: Product[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState("overview");

  return (
    <div className="page-enter container" style={{ paddingTop: 32, paddingBottom: 64 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          marginBottom: 40,
          paddingBottom: 32,
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div>
          <div style={{ fontSize: 12, color: "var(--mute)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
            Member since 2024 · 3 orders
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--bone)" }}>
            Alex Park
          </h1>
          <p style={{ color: "var(--bone-dim)", marginTop: 12, fontSize: 15 }}>
            alex@studio.io · Berlin, DE
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.14em",
              color: "var(--mute)",
              textTransform: "uppercase",
            }}
          >
            LOYALTY WALLET
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 32,
              fontWeight: 700,
              marginTop: 4,
            }}
          >
            €120
          </div>
        </div>
      </div>

      <div className="account-grid">
        <aside>
          <div className="account-nav">
            {TABS.map((t) => (
              <div
                key={t.id}
                className={`account-nav-item ${tab === t.id ? "active" : ""}`}
                onClick={() => setTab(t.id)}
                role="button"
                tabIndex={0}
              >
                <span>{t.label}</span>
                {t.count !== null && (
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--mute)",
                    }}
                  >
                    {t.count}
                  </span>
                )}
              </div>
            ))}
          </div>
        </aside>

        <main>
          {tab === "overview" && (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 16,
                  marginBottom: 40,
                }}
              >
                {[
                  { eye: "LIFETIME", title: "€2 182", sub: "03 ORDERS" },
                  { eye: "IN TRANSIT", title: "01", sub: "ORDER 0029 · MON", volt: true },
                  { eye: "WARRANTY", title: "03", sub: "ITEMS COVERED" },
                  { eye: "FG CREDIT", title: "€120", sub: "EXPIRES 31 DEC" },
                ].map((s) => (
                  <div
                    key={s.eye}
                    style={{
                      padding: 24,
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      background: "var(--surface-1)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        letterSpacing: "0.16em",
                        color: s.volt ? "var(--voltage)" : "var(--mute)",
                      }}
                    >
                      — {s.eye}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 28,
                        fontWeight: 700,
                        marginTop: 12,
                      }}
                    >
                      {s.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        color: "var(--bone-dim)",
                        letterSpacing: "0.12em",
                        marginTop: 4,
                      }}
                    >
                      {s.sub}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                  {suggestedProducts.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      padding: 16,
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      background: "var(--surface-1)",
                      cursor: "pointer",
                    }}
                    onClick={() => router.push(`/product/${p.id}`)}
                    role="button"
                    tabIndex={0}
                  >
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <div
                        style={{
                          width: 64,
                          height: 64,
                          background: "var(--surface-2)",
                          borderRadius: 4,
                          display: "grid",
                          placeItems: "center",
                          color: "var(--bone-dim)",
                        }}
                      >
                        <ProductArt kind={p.art} size={40} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.3 }}>
                          {p.fullName}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 12,
                            color: "var(--bone-dim)",
                            marginTop: 4,
                          }}
                        >
                          €{p.price}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === "orders" && (
            <div>
              <h2 className="t-h1" style={{ marginBottom: 24 }}>
                Orders
              </h2>
              <div
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  overflow: "hidden",
                }}
              >
                {ORDERS.map((o, i) => (
                  <div
                    key={o.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "120px 1fr 140px 100px 100px",
                      gap: 16,
                      padding: 20,
                      borderBottom:
                        i < ORDERS.length - 1 ? "1px solid var(--border)" : "none",
                      alignItems: "center",
                      background: i === 0 ? "var(--surface-1)" : "transparent",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          color: "var(--voltage)",
                          letterSpacing: "0.14em",
                        }}
                      >
                        {o.id}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          color: "var(--mute)",
                          marginTop: 4,
                        }}
                      >
                        {o.date}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      {o.preview.map((art) => (
                        <div
                          key={art}
                          style={{
                            width: 48,
                            height: 48,
                            background: "var(--surface-2)",
                            borderRadius: 4,
                            display: "grid",
                            placeItems: "center",
                            color: "var(--bone-dim)",
                          }}
                        >
                          <ProductArt kind={art} size={32} />
                        </div>
                      ))}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--mute)" }}>
                      {o.items} items · {o.tracking}
                    </div>
                    <div>
                      <StockPill
                        stock={o.status === "Shipped" ? "warn" : "ok"}
                        label={o.status.toUpperCase()}
                      />
                    </div>
                    <div
                      style={{
                        textAlign: "right",
                        fontFamily: "var(--font-mono)",
                        fontSize: 16,
                        color: "var(--bone)",
                        fontWeight: 500,
                      }}
                    >
                      €{o.total}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab !== "overview" && tab !== "orders" && (
            <div
              style={{
                padding: 64,
                border: "1px solid var(--border)",
                borderRadius: 8,
                background: "var(--surface-1)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--mute)",
                  letterSpacing: "0.16em",
                }}
              >
                — SECTION PLACEHOLDER
              </div>
              <h3 className="t-h2" style={{ marginTop: 12 }}>
                {TABS.find((t) => t.id === tab)?.label}
              </h3>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
