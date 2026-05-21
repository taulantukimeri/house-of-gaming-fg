"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteProductButton({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete product "${id}"? This cannot be undone.`)) return;
    setBusy(true);
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    setBusy(false);
    if (res.ok) {
      router.refresh();
    } else {
      alert("Delete failed");
    }
  }

  return (
    <button
      type="button"
      className="btn btn--secondary btn--sm"
      onClick={handleDelete}
      disabled={busy}
    >
      {busy ? "…" : "Delete"}
    </button>
  );
}
