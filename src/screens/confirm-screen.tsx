"use client";

import Link from "next/link";
import { Icon } from "@/components/icon";

export function ConfirmScreen() {
  return (
    <div
      className="page-enter container"
      style={{ paddingTop: 64, paddingBottom: 64, maxWidth: 720 }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 72,
            height: 72,
            borderRadius: "50%",
            border: "2px solid var(--voltage)",
            color: "var(--voltage)",
            marginBottom: 24,
          }}
        >
          <Icon name="check" size={32} />
        </div>
        <div style={{ fontSize: 13, color: "var(--mute)", marginBottom: 12, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Order confirmed
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "var(--bone)", marginTop: 8 }}>
          Thank you for your order!
        </h1>
        <p
          style={{
            color: "var(--bone-dim)",
            fontSize: 16,
            marginTop: 16,
            lineHeight: 1.6,
            maxWidth: 540,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Your order ships from Berlin on Monday. You will receive a tracking link in your inbox by 18:00 CET.
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            marginTop: 32,
          }}
        >
          <Link href="/account" className="btn btn--primary btn--lg">
            View order
          </Link>
          <Link href="/" className="btn btn--ghost btn--lg">
            Keep browsing
          </Link>
        </div>
      </div>
    </div>
  );
}
