"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icon";
import { useCart } from "@/context/cart-context";
import { useSearch } from "@/context/search-context";

const cats = [
  { id: "mice", label: "Mice" },
  { id: "keyboards", label: "Keyboards" },
  { id: "chairs", label: "Chairs" },
  { id: "desks", label: "Desks" },
  { id: "headsets", label: "Headsets" },
  { id: "accessories", label: "Accessories" },
];

export function Nav() {
  const pathname = usePathname();
  const { cartCount, openCart } = useCart();
  const { openSearch } = useSearch();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Top promo bar */}
      <div className="nav-promo-bar">
        Free EU shipping over €150 &nbsp;·&nbsp; 30-day returns &nbsp;·&nbsp; Secure payments &nbsp;·&nbsp; Authentic products with warranty
      </div>

      {/* Main nav */}
      <nav className="nav">
        <div className="nav-inner">

          {/* Logo */}
          <Link href="/" className="nav-logo" onClick={() => setMobileOpen(false)}>
            <img src="/assets/logo-mark.svg" alt="House of Gaming" width={34} height={34} />
            <div className="nav-logo-name">House of Gaming</div>
          </Link>

          {/* Search bar — placeholder text hidden at ≤640px via CSS */}
          <button type="button" className="nav-search-wrap" onClick={openSearch} aria-label="Search products">
            <span className="nav-search-icon">
              <Icon name="search" size={17} />
            </span>
            <span className="nav-search-placeholder">Search products, brands and categories…</span>
            <span className="nav-search-btn">
              <Icon name="search" size={16} />
              <span>Search</span>
            </span>
          </button>

          {/* Right icons */}
          <div className="nav-right">
            {/* Hidden at ≤640px — accessible via mobile menu instead */}
            <button type="button" className="nav-icon nav-icon--hide-mobile" title="Wishlist">
              <Icon name="heart" size={18} />
            </button>
            <Link href="/account" className="nav-icon nav-icon--hide-mobile" title="My Account">
              <Icon name="user" size={18} />
            </Link>
            <button type="button" className="nav-icon" title="Cart" onClick={openCart}>
              <Icon name="cart" size={18} />
              {cartCount > 0 && (
                <span className="nav-icon-badge">{cartCount}</span>
              )}
            </button>
            <button
              type="button"
              className="nav-icon nav-hamburger"
              title="Menu"
              onClick={() => setMobileOpen((o) => !o)}
            >
              <Icon name={mobileOpen ? "x" : "menu"} size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Category strip */}
      <div className="cat-bar">
        <div className="cat-bar-inner">
          {cats.map((c) => (
            <Link
              key={c.id}
              href={`/catalog/${c.id}`}
              className={"cat-bar-link " + (pathname.startsWith(`/catalog/${c.id}`) ? "active" : "")}
            >
              {c.label}
            </Link>
          ))}
          <Link href="/#offers" className="cat-bar-link cat-bar-link--hot">
            Special Offers
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="nav-mobile-menu">
          {cats.map((c) => (
            <Link
              key={c.id}
              href={`/catalog/${c.id}`}
              className={"nav-mobile-link " + (pathname.startsWith(`/catalog/${c.id}`) ? "active" : "")}
              onClick={() => setMobileOpen(false)}
            >
              {c.label}
            </Link>
          ))}
          <Link href="/#offers" className="nav-mobile-link" onClick={() => setMobileOpen(false)}>
            Special Offers
          </Link>
          <Link href="/account" className="nav-mobile-link" onClick={() => setMobileOpen(false)}>
            My Account
          </Link>
          <Link href="/account" className="nav-mobile-link" onClick={() => setMobileOpen(false)}>
            Wishlist
          </Link>
        </div>
      )}
    </>
  );
}
