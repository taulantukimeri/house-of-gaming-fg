"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteBannerButton({ id }: { id: number }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete slide #${id}? This cannot be undone.`)) return;
    setBusy(true);
    const res = await fetch(`/api/admin/banners/${id}`, { method: "DELETE" });
    setBusy(false);
    if (res.ok) router.refresh();
    else alert("Delete failed");
  }

  return (
    <button type="button" className="btn btn--secondary btn--sm" onClick={handleDelete} disabled={busy}>
      {busy ? "…" : "Delete"}
    </button>
  );
}
