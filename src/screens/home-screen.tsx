"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProductArt } from "@/components/product-art";
import { ProductCard } from "@/components/product-card";
import { EyebrowBar } from "@/components/ui-primitives";
import { useCart } from "@/context/cart-context";
import type { Category, Product } from "@/lib/types";

export function HomeScreen({
  categories,
  featuredProducts,
  heroProduct,
}: {
  categories: Category[];
  featuredProducts: Product[];
  heroProduct: Product | null;
}) {
  const router = useRouter();
  const { addToCart } = useCart();

  return (
    <div className="page-enter">
      <section className="hero">
        <div className="hero-inner">
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 24,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--voltage)",
              }}
            >
              <span style={{ width: 24, height: 1, background: "var(--voltage)" }} />
              ▲ FG VERIFIED · SUMMER ISSUE
            </div>
            <h1 className="hero-title">
              Gear, not
              <br />
              <span className="em">gimmicks.</span>
            </h1>
            <p className="hero-body">
              A short catalog of seriously good hardware. Curated by people who play
              — chairs that hold up after eight hours, switches that don&apos;t lie
              about their travel, mice that don&apos;t ask to be charged.
            </p>
            <div className="hero-cta">
              <button
                type="button"
                className="btn btn--primary btn--lg"
                onClick={() => router.push("/catalog/mice")}
              >
                Shop the catalog
              </button>
              <button type="button" className="btn btn--ghost btn--lg">
                Read editorial
              </button>
            </div>
          </div>
          {heroProduct && (
            <div style={{ position: "relative" }}>
              <div
                style={{
                  border: "1px solid var(--border-strong)",
                  borderRadius: 12,
                  padding: 32,
                  background: "rgba(20,22,26,0.6)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 24,
                  }}
                >
                  <span className="fg-stamp">FG verified · this month</span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--mute)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    0029 / HG-FG
                  </span>
                </div>
                <div
                  style={{
                    aspectRatio: "4/3",
                    background: "var(--surface-2)",
                    borderRadius: 4,
                    display: "grid",
                    placeItems: "center",
                    color: "var(--bone-dim)",
                    marginBottom: 20,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "radial-gradient(ellipse at 65% 35%, rgba(198,255,61,0.08), transparent 70%)",
                    }}
                  />
                  <div style={{ position: "relative", width: "70%", height: "70%" }}>
                    {heroProduct.imageUrl
                      ? <img src={heroProduct.imageUrl} alt={heroProduct.fullName} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                      : <ProductArt kind={heroProduct.art} />
                    }
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  {heroProduct.fullName}
                </div>
                <div style={{ color: "var(--mute)", fontSize: 13, marginTop: 6 }}>
                  {heroProduct.blurb}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 20,
                      color: "var(--bone)",
                      fontWeight: 500,
                    }}
                  >
                    €{heroProduct.price}
                  </span>
                  <button
                    type="button"
                    className="btn btn--primary btn--sm"
                    onClick={() => router.push(`/product/${heroProduct.id}`)}
                  >
                    View details →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="container" style={{ paddingTop: 96 }}>
        <div className="sec-head">
          <div>
            <EyebrowBar>▲ CATALOG · 6 CATEGORIES</EyebrowBar>
            <h2 className="sec-title" style={{ marginTop: 12 }}>
              Shop by category
            </h2>
          </div>
          <Link href="/catalog/mice" className="sec-link">
            Browse all →
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {categories.map((c) => (
            <Link key={c.id} href={`/catalog/${c.id}`} className="cat-tile">
              <div className="cat-tile-meta">
                <span className="cat-tile-count">{c.count} ITEMS · FG CURATED</span>
                <div className="cat-tile-name">{c.name}</div>
              </div>
              <div className="cat-tile-cta">Explore →</div>
              <div className="cat-tile-art">
                <ProductArt kind={c.art} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container" style={{ paddingTop: 96 }} id="editorial">
        <div className="strip">
          <div>
            <div className="strip-eyebrow">— LIMITED · 042 / 500</div>
            <div className="strip-title">
              The Azoth × FG
              <br />
              anniversary deck.
            </div>
            <p className="strip-body">
              A custom run of 500 ROG Azoths with a milled aluminum case,
              FG-stamped weight, and a dedicated rotary for fan curves. Pre-order
              closes 30 June.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <button type="button" className="btn btn--ignit btn--lg">
                Pre-order — €329
              </button>
              <button type="button" className="btn btn--ghost btn--lg">
                Read story →
              </button>
            </div>
          </div>
          <div className="strip-art" style={{ textAlign: "center" }}>
            <div
              style={{
                display: "inline-block",
                padding: 24,
                border: "1px solid var(--border-strong)",
                borderRadius: 8,
                background: "rgba(0,0,0,0.4)",
              }}
            >
              <ProductArt kind="keyboard" />
              <div
                style={{
                  marginTop: 16,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--mute)",
                  letterSpacing: "0.18em",
                }}
              >
                SN · 042 / 500
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container" style={{ paddingTop: 96 }}>
        <div className="sec-head">
          <div>
            <EyebrowBar>▲ FG VERIFIED · TESTED 200+ HOURS</EyebrowBar>
            <h2 className="sec-title" style={{ marginTop: 12 }}>
              This month, we like
            </h2>
          </div>
          <Link href="/catalog/mice" className="sec-link">
            See all 18 →
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }}
        >
          {featuredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onNavigate={() => router.push(`/product/${p.id}`)}
              onAdd={() => addToCart(p)}
            />
          ))}
        </div>
      </section>

      <section className="container" style={{ paddingTop: 96 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
            border: "1px solid var(--border)",
            borderRadius: 8,
          }}
        >
          {[
            {
              eye: "— SHIPPING",
              title: "Free EU shipping",
              sub: "Over €150 · 2–5 days from Berlin",
            },
            {
              eye: "— RETURNS",
              title: "30 day returns",
              sub: "No questions, prepaid label included",
            },
            {
              eye: "— WARRANTY",
              title: "FG warranty extension",
              sub: "Free 12-month extension on every order",
            },
            {
              eye: "— TRADE-IN",
              title: "Trade-in program",
              sub: "Up to €120 credit on your old gear",
            },
          ].map((t, i) => (
            <div
              key={t.eye}
              style={{
                padding: 32,
                borderRight: i < 3 ? "1px solid var(--border)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--voltage)",
                  letterSpacing: "0.14em",
                }}
              >
                {t.eye}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 18,
                  fontWeight: 600,
                  marginTop: 12,
                  lineHeight: 1.3,
                }}
              >
                {t.title}
              </div>
              <div
                style={{
                  color: "var(--mute)",
                  fontSize: 13,
                  marginTop: 8,
                  lineHeight: 1.5,
                }}
              >
                {t.sub}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
