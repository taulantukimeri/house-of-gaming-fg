import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <img
              src="/assets/logo-mark.svg"
              alt=""
              width={40}
              height={40}
              style={{ marginBottom: 16 }}
            />
            <div className="t-h3" style={{ maxWidth: 320 }}>
              Curated gear for people who play seriously.
            </div>
            <div className="t-body-sm" style={{ marginTop: 16, maxWidth: 360 }}>
              Berlin · Tokyo · Austin. Free EU shipping over €150. 30-day returns.
              FG warranty extension on every order.
            </div>
          </div>
          <div>
            <div className="footer-title">Catalog</div>
            <div className="footer-links">
              <Link href="/catalog/chairs" className="footer-link">
                Chairs
              </Link>
              <Link href="/catalog/desks" className="footer-link">
                Desks
              </Link>
              <Link href="/catalog/keyboards" className="footer-link">
                Keyboards
              </Link>
              <Link href="/catalog/mice" className="footer-link">
                Mice
              </Link>
              <Link href="/catalog/headsets" className="footer-link">
                Headsets
              </Link>
              <Link href="/catalog/accessories" className="footer-link">
                Accessories
              </Link>
            </div>
          </div>
          <div>
            <div className="footer-title">House</div>
            <div className="footer-links">
              <span className="footer-link">FG Verified program</span>
              <span className="footer-link">Editorial</span>
              <span className="footer-link">Pro athletes</span>
              <span className="footer-link">Trade-in</span>
              <span className="footer-link">About</span>
            </div>
          </div>
          <div>
            <div className="footer-title">Help</div>
            <div className="footer-links">
              <span className="footer-link">Shipping</span>
              <span className="footer-link">Returns</span>
              <span className="footer-link">Warranty</span>
              <span className="footer-link">Contact</span>
              <span className="footer-link">FAQ</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <small>© MMXXV HOUSE OF GAMING · FORGED GEAR · BERLIN</small>
          <small>EUR · ENGLISH · PRIVACY · TERMS</small>
        </div>
      </div>
    </footer>
  );
}
