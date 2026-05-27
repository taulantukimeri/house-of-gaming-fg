import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">

          {/* Brand column */}
          <div>
            <img src="/assets/logo-mark.svg" alt="House of Gaming" width={44} height={44} style={{ marginBottom: 14, filter: "brightness(0) invert(1)" }} />
            <div className="footer-brand-name">House of Gaming</div>
            <div className="footer-brand-desc">
              Your one-stop destination for premium gaming gear. Authentic products, best prices, and fast delivery across Europe.
            </div>
            <div className="footer-social">
              <a href="#" className="footer-social-icon" aria-label="Facebook">f</a>
              <a href="#" className="footer-social-icon" aria-label="Instagram">in</a>
              <a href="#" className="footer-social-icon" aria-label="Twitter">𝕏</a>
            </div>
          </div>

          {/* Catalog */}
          <div>
            <div className="footer-col-title">Catalog</div>
            <div className="footer-links">
              <Link href="/catalog/mice" className="footer-link">Mice</Link>
              <Link href="/catalog/keyboards" className="footer-link">Keyboards</Link>
              <Link href="/catalog/chairs" className="footer-link">Chairs</Link>
              <Link href="/catalog/desks" className="footer-link">Desks</Link>
              <Link href="/catalog/headsets" className="footer-link">Headsets</Link>
              <Link href="/catalog/accessories" className="footer-link">Accessories</Link>
            </div>
          </div>

          {/* Account */}
          <div>
            <div className="footer-col-title">My Account</div>
            <div className="footer-links">
              <Link href="/account" className="footer-link">My Account</Link>
              <Link href="/account" className="footer-link">My Orders</Link>
              <Link href="/account" className="footer-link">Wishlist</Link>
              <Link href="/checkout" className="footer-link">Cart</Link>
            </div>
          </div>

          {/* Help */}
          <div>
            <div className="footer-col-title">Help &amp; FAQ</div>
            <div className="footer-links">
              <span className="footer-link">About Us</span>
              <span className="footer-link">Shipping Info</span>
              <span className="footer-link">Returns &amp; Refunds</span>
              <span className="footer-link">Warranty</span>
              <span className="footer-link">Contact Us</span>
              <span className="footer-link">FAQ</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="footer-col-title">Contact</div>
            <div className="footer-links">
              <span className="footer-link">support@houseofgaming.eu</span>
              <span className="footer-link">+383 44 000 000</span>
              <span className="footer-link">Mon–Sat: 09:00 – 18:00</span>
              <span className="footer-link" style={{ marginTop: 8 }}>Berlin · Prishtina · Vienna</span>
            </div>
          </div>

        </div>

        {/* Trust badges in footer */}
        <div className="footer-trust">
          {[
            { icon: "🔒", label: "Safe Shopping" },
            { icon: "🚚", label: "Fast Delivery" },
            { icon: "✅", label: "Authentic Products" },
            { icon: "💬", label: "Customer Support" },
            { icon: "🏷️", label: "Best Price Guaranteed" },
          ].map((b) => (
            <div key={b.label} className="footer-trust-item">
              <span className="footer-trust-icon">{b.icon}</span>
              <span>{b.label}</span>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <small>© 2025 House of Gaming. All rights reserved.</small>
          <div className="footer-bottom-links">
            <small>Privacy Policy</small>
            <small>Terms of Service</small>
            <small>Cookie Policy</small>
          </div>
        </div>
      </div>
    </footer>
  );
}
