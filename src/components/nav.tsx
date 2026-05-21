"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icon";
import { useCart } from "@/context/cart-context";
import { useSearch } from "@/context/search-context";

const cats = [
  { id: "chairs", label: "Chairs" },
  { id: "desks", label: "Desks" },
  { id: "keyboards", label: "Keyboards" },
  { id: "mice", label: "Mice" },
  { id: "headsets", label: "Headsets" },
];

export function Nav() {
  const pathname = usePathname();
  const { cartCount, openCart } = useCart();
  const { openSearch } = useSearch();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo" onClick={() => setMobileOpen(false)}>
          <img src="/assets/logo-mark.svg" alt="" width={28} height={28} />
          <div>
            <div className="nav-logo-text">HOUSE OF GAMING</div>
            <div className="nav-logo-fg">FG · FORGED GEAR</div>
          </div>
        </Link>
        <div className="nav-cats">
          {cats.map((c) => (
            <Link
              key={c.id}
              href={`/catalog/${c.id}`}
              className={"nav-link " + (pathname === `/catalog/${c.id}` ? "active" : "")}
            >
              {c.label}
            </Link>
          ))}
          <Link href="/#editorial" className="nav-link">
            Editorial
          </Link>
        </div>
        <div className="nav-right">
          <button type="button" className="nav-icon" title="Search" onClick={openSearch}>
            <Icon name="search" size={18} />
          </button>
          <button
            type="button"
            className="nav-icon"
            title="Cart"
            onClick={openCart}
          >
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

      {mobileOpen && (
        <div className="nav-mobile-menu">
          {cats.map((c) => (
            <Link
              key={c.id}
              href={`/catalog/${c.id}`}
              className={"nav-mobile-link " + (pathname === `/catalog/${c.id}` ? "active" : "")}
              onClick={() => setMobileOpen(false)}
            >
              {c.label}
            </Link>
          ))}
          <Link
            href="/#editorial"
            className="nav-mobile-link"
            onClick={() => setMobileOpen(false)}
          >
            Editorial
          </Link>
        </div>
      )}
    </nav>
  );
}
