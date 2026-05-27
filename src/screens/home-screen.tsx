"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductArt } from "@/components/product-art";
import { ProductCard } from "@/components/product-card";
import { useCart } from "@/context/cart-context";
import type { Category, Product } from "@/lib/types";
import type { BannerSlide } from "@/lib/banners";

const TRUST_BADGES = [
  { icon: "🔒", title: "Safe Shopping", sub: "Encrypted & secure checkout" },
  { icon: "🚚", title: "Fast Delivery", sub: "EU-wide, 2–5 working days" },
  { icon: "📦", title: "100k+ Products", sub: "Authentic & under warranty" },
  { icon: "💬", title: "Customer Support", sub: "Answer within seconds" },
  { icon: "🏷️", title: "Best Price Guaranteed", sub: "On every product" },
];

const BRANDS = [
  { name: "Logitech G", href: "/catalog/mice" },
  { name: "ASUS ROG", href: "/catalog/mice" },
  { name: "Razer", href: "/catalog/mice" },
  { name: "SteelSeries", href: "/catalog/keyboards" },
  { name: "Corsair", href: "/catalog/keyboards" },
  { name: "HyperX", href: "/catalog/headsets" },
  { name: "Secretlab", href: "/catalog/chairs" },
  { name: "Keychron", href: "/catalog/keyboards" },
];

const TOP_CATS = [
  { id: "mice", label: "Mice", art: "mouse" as const, bg: "#FFF5EE", color: "#F26522" },
  { id: "keyboards", label: "Keyboards", art: "keyboard" as const, bg: "#1A1A2E", color: "#FFFFFF" },
  { id: "chairs", label: "Chairs", art: "chair" as const, bg: "#F0FFF4", color: "#057A55" },
];

export function HomeScreen({
  categories,
  featuredProducts,
  heroProduct,
  bannerSlides = [],
}: {
  categories: Category[];
  featuredProducts: Product[];
  heroProduct: Product | null;
  bannerSlides?: BannerSlide[];
}) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [slide, setSlide] = useState(0);

  // Fallback slide if DB is empty
  const slides = bannerSlides.length > 0 ? bannerSlides : [{
    id: 0, position: 0, active: true,
    tag: "House of Gaming", title: "Your Gaming HQ", sub: "Browse our full catalogue",
    cta: "Shop now", href: "/catalog/mice", imageUrl: null,
    bg: "linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)", accent: "#F26522",
  } as BannerSlide];

  const current = slides[Math.min(slide, slides.length - 1)];

  const saleProducts = featuredProducts.filter((p) => p.msrp);
  const recommended = featuredProducts.slice(0, 4);

  return (
    <div className="page-enter">

      {/* ══════════════════════════════════════════════
          BANNER CAROUSEL
      ══════════════════════════════════════════════ */}
      <section className="banner-section">
        <div className="banner-slide" style={{ background: current.bg }}>
          <div className="banner-inner">
            <div className="banner-content">
              {current.tag && (
                <div className="banner-tag" style={{ background: current.accent }}>
                  {current.tag}
                </div>
              )}
              <h1 className="banner-title">
                {current.title.split("\n").map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </h1>
              {current.sub && <p className="banner-sub">{current.sub}</p>}
              <Link href={current.href} className="btn btn--primary btn--lg" style={{ display: "inline-flex", textDecoration: "none" }}>
                {current.cta}
              </Link>
            </div>
            <div className="banner-art-wrap">
              <div className="banner-art-inner">
                {current.imageUrl ? (
                  <img
                    src={current.imageUrl}
                    alt={current.tag}
                    style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }}
                  />
                ) : (
                  <ProductArt kind="mouse" />
                )}
              </div>
            </div>
          </div>

          {/* Arrows — only shown when there are multiple slides */}
          {slides.length > 1 && (
            <>
              <button
                className="banner-arrow banner-arrow--prev"
                onClick={() => setSlide((slide - 1 + slides.length) % slides.length)}
                aria-label="Previous"
              >‹</button>
              <button
                className="banner-arrow banner-arrow--next"
                onClick={() => setSlide((slide + 1) % slides.length)}
                aria-label="Next"
              >›</button>
            </>
          )}
        </div>

        {/* Dots */}
        {slides.length > 1 && (
          <div className="banner-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={"banner-dot " + (i === slide ? "active" : "")}
                onClick={() => setSlide(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* ══════════════════════════════════════════════
          TRUST BADGES
      ══════════════════════════════════════════════ */}
      <div className="trust-strip">
        <div className="trust-strip-inner">
          {TRUST_BADGES.map((b) => (
            <div key={b.title} className="trust-item">
              <span className="trust-icon">{b.icon}</span>
              <div>
                <div className="trust-title">{b.title}</div>
                <div className="trust-sub">{b.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          BRAND LOGOS
      ══════════════════════════════════════════════ */}
      <div className="brands-strip">
        <div className="brands-strip-inner">
          {BRANDS.map((b) => (
            <Link key={b.name} href={b.href} className="brand-logo-item">
              {b.name}
            </Link>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          TOP CATEGORIES (3 large cards)
      ══════════════════════════════════════════════ */}
      <section className="container" style={{ paddingTop: 48 }}>
        <div className="sec-head">
          <h2 className="sec-title">Most Popular Categories</h2>
          <Link href="/catalog/mice" className="sec-link">View all categories →</Link>
        </div>
        <div className="top-cat-grid">
          {TOP_CATS.map((c) => (
            <Link key={c.id} href={`/catalog/${c.id}`} className="top-cat-card" style={{ background: c.bg }} >
              <div className="top-cat-text" style={{ color: c.color }}>
                <div className="top-cat-label">{c.label}</div>
                <span className="top-cat-cta" style={{ background: c.color === "#FFFFFF" ? "#F26522" : c.color }}>
                  Shop Now
                </span>
              </div>
              <div className="top-cat-art" style={{ color: c.color === "#FFFFFF" ? "rgba(255,255,255,0.9)" : c.color }}>
                <ProductArt kind={c.art} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          RECOMMENDED FOR YOU
      ══════════════════════════════════════════════ */}
      <section className="container" style={{ paddingTop: 48 }}>
        <div className="sec-head">
          <h2 className="sec-title">Recommended for You</h2>
          <Link href="/catalog/mice" className="sec-link">See all →</Link>
        </div>
        <div className="featured-grid">
          {recommended.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onNavigate={() => router.push(`/product/${p.id}`)}
              onAdd={() => addToCart(p)}
            />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SPECIAL OFFERS (sale items)
      ══════════════════════════════════════════════ */}
      {saleProducts.length > 0 && (
        <section className="container" style={{ paddingTop: 48 }} id="offers">
          <div className="sec-head">
            <h2 className="sec-title">
              <span className="sec-title-badge">Special Offers</span>
            </h2>
            <Link href="/catalog/mice" className="sec-link">View all offers →</Link>
          </div>
          <div className="featured-grid">
            {saleProducts.slice(0, 4).map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onNavigate={() => router.push(`/product/${p.id}`)}
                onAdd={() => addToCart(p)}
              />
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════
          BROWSE ALL CATEGORIES (compact grid)
      ══════════════════════════════════════════════ */}
      <section className="container" style={{ paddingTop: 48 }}>
        <div className="sec-head">
          <h2 className="sec-title">Shop by Category</h2>
          <Link href="/catalog/mice" className="sec-link">Browse all →</Link>
        </div>
        <div className="cat-grid">
          {categories.map((c) => (
            <Link key={c.id} href={`/catalog/${c.id}`} className="cat-tile">
              <div className="cat-tile-art">
                <ProductArt kind={c.art} />
              </div>
              <div className="cat-tile-name">{c.name}</div>
              <span className="cat-tile-count">{c.count} items</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          BEST SELLERS
      ══════════════════════════════════════════════ */}
      <section className="container" style={{ paddingTop: 48 }}>
        <div className="sec-head">
          <h2 className="sec-title">Best Sellers</h2>
          <Link href="/catalog/mice" className="sec-link">See all →</Link>
        </div>
        <div className="featured-grid">
          {featuredProducts.slice(4, 8).map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onNavigate={() => router.push(`/product/${p.id}`)}
              onAdd={() => addToCart(p)}
            />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          NEWSLETTER BANNER
      ══════════════════════════════════════════════ */}
      <section className="container" style={{ paddingTop: 48 }}>
        <div className="newsletter-banner">
          <div>
            <div className="newsletter-title">Stay in the loop</div>
            <div className="newsletter-sub">Get the latest deals, new arrivals and exclusive offers straight to your inbox.</div>
          </div>
          <div className="newsletter-form">
            <input className="newsletter-input" type="email" placeholder="Your email address" />
            <button type="button" className="btn btn--primary">Subscribe</button>
          </div>
        </div>
      </section>

    </div>
  );
}
