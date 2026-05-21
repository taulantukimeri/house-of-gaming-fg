"use client";

import { Icon } from "@/components/icon";
import { useCart } from "@/context/cart-context";

export function ToastStack() {
  const { toasts } = useCart();
  if (!toasts.length) return null;

  return (
    <div className="toast-stack">
      {toasts.map((t) => (
        <div key={t.id} className="toast-msg">
          <Icon name="check" size={16} />
          <div>
            <div style={{ fontSize: 14, color: "var(--bone)" }}>{t.title}</div>
            {t.sub && (
              <div style={{ color: "var(--mute)", fontSize: 12, marginTop: 2 }}>
                {t.sub}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
