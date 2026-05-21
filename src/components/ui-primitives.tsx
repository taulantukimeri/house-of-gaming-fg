import type { ProductBadge, StockStatus } from "@/lib/types";

export function FGStamp() {
  return <span className="fg-stamp">FG verified</span>;
}

export function Badge({ kind, children }: { kind?: ProductBadge["type"]; children: React.ReactNode }) {
  return <span className={`badge badge--${kind || "mute"}`}>{children}</span>;
}

export function StockPill({ stock, label }: { stock: StockStatus; label: string }) {
  return (
    <span className={`stock ${stock}`}>
      <span className="stock-dot" />
      {label}
    </span>
  );
}

export function EyebrowBar({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow-with-bar">{children}</div>;
}
