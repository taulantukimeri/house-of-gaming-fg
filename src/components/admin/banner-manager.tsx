"use client";

import { useRef, useState } from "react";
import type { BannerCat } from "@/lib/settings";

const SLOTS: { cat: BannerCat; label: string; desc: string }[] = [
  { cat: "mice",      label: "Slide 1 — Mice",      desc: "Summer Gaming Deals banner" },
  { cat: "keyboards", label: "Slide 2 — Keyboards",  desc: "New Arrivals banner" },
  { cat: "chairs",    label: "Slide 3 — Chairs",     desc: "Ergonomic Collection banner" },
];

export function BannerManager({
  initial,
}: {
  initial: Record<BannerCat, string | null>;
}) {
  const [images, setImages] = useState<Record<BannerCat, string | null>>(initial);
  const [uploading, setUploading] = useState<BannerCat | null>(null);
  const [saving, setSaving] = useState<BannerCat | null>(null);
  const [message, setMessage] = useState<{ cat: BannerCat; text: string; ok: boolean } | null>(null);
  const refs = {
    mice:      useRef<HTMLInputElement>(null),
    keyboards: useRef<HTMLInputElement>(null),
    chairs:    useRef<HTMLInputElement>(null),
  };

  async function handleUpload(cat: BannerCat, file: File) {
    setUploading(cat);
    setMessage(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();

      // Save the new URL immediately
      setSaving(cat);
      const saveRes = await fetch(`/api/admin/banners/${cat}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: url }),
      });
      if (!saveRes.ok) throw new Error("Save failed");

      setImages((prev) => ({ ...prev, [cat]: url }));
      setMessage({ cat, text: "Image saved ✓", ok: true });
    } catch (err) {
      setMessage({ cat, text: String(err), ok: false });
    } finally {
      setUploading(null);
      setSaving(null);
      if (refs[cat].current) refs[cat].current.value = "";
    }
  }

  async function handleRemove(cat: BannerCat) {
    setSaving(cat);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/banners/${cat}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: "" }),
      });
      if (!res.ok) throw new Error("Remove failed");
      setImages((prev) => ({ ...prev, [cat]: null }));
      setMessage({ cat, text: "Image removed", ok: true });
    } catch (err) {
      setMessage({ cat, text: String(err), ok: false });
    } finally {
      setSaving(null);
    }
  }

  return (
    <div style={{ display: "grid", gap: 24 }}>
      {SLOTS.map(({ cat, label, desc }) => {
        const url = images[cat];
        const busy = uploading === cat || saving === cat;
        const msg  = message?.cat === cat ? message : null;

        return (
          <div
            key={cat}
            style={{
              border: "1px solid var(--border)",
              borderRadius: 8,
              overflow: "hidden",
              background: "var(--surface-1)",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "16px 24px",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontWeight: 600, color: "var(--bone)" }}>{label}</div>
                <div className="t-caption" style={{ marginTop: 2 }}>{desc}</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {msg && (
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: msg.ok ? "var(--volt)" : "var(--ignit)",
                    }}
                  >
                    {msg.text}
                  </span>
                )}
                <button
                  type="button"
                  className="btn btn--primary btn--sm"
                  disabled={busy}
                  onClick={() => refs[cat].current?.click()}
                >
                  {uploading === cat ? "Uploading…" : url ? "Replace" : "Upload image"}
                </button>
                {url && (
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm"
                    disabled={busy}
                    onClick={() => handleRemove(cat)}
                  >
                    {saving === cat ? "…" : "Remove"}
                  </button>
                )}
                <input
                  ref={refs[cat]}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(cat, file);
                  }}
                />
              </div>
            </div>

            {/* Preview */}
            <div
              style={{
                height: 200,
                background: "var(--surface-2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {url ? (
                <img
                  src={url}
                  alt={label}
                  style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                />
              ) : (
                <span style={{ color: "var(--mute)", fontFamily: "var(--font-mono)", fontSize: 12 }}>
                  No image — default icon art shown
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
