"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import type { BannerSlide } from "@/lib/banners";

const ART_PRESETS = [
  { label: "Dark navy (default)", value: "linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)" },
  { label: "Deep blue",           value: "linear-gradient(135deg, #0F3460 0%, #16213E 100%)" },
  { label: "Dark purple",         value: "linear-gradient(135deg, #1A1A2E 0%, #2D1B4E 100%)" },
  { label: "Deep green",          value: "linear-gradient(135deg, #0D1F1A 0%, #1A3A2E 100%)" },
  { label: "Dark red",            value: "linear-gradient(135deg, #1F0D0D 0%, #3A1A1A 100%)" },
  { label: "Custom…",             value: "" },
];

export function BannerSlideForm({
  mode,
  initial,
}: {
  mode: "create" | "edit";
  initial?: BannerSlide;
}) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [tag,      setTag]      = useState(initial?.tag      ?? "");
  const [title,    setTitle]    = useState(initial?.title    ?? "");
  const [sub,      setSub]      = useState(initial?.sub      ?? "");
  const [cta,      setCta]      = useState(initial?.cta      ?? "Shop Now");
  const [href,     setHref]     = useState(initial?.href     ?? "/catalog");
  const [bg,       setBg]       = useState(initial?.bg       ?? ART_PRESETS[0].value);
  const [accent,   setAccent]   = useState(initial?.accent   ?? "#F26522");
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? "");
  const [position, setPosition] = useState(String(initial?.position ?? 0));
  const [active,   setActive]   = useState(initial?.active   ?? true);

  const [uploading, setUploading] = useState(false);
  const [saving,    setSaving]    = useState(false);
  const [error,     setError]     = useState("");

  // Detect if bg is a preset or custom
  const isPreset = ART_PRESETS.some((p) => p.value === bg && p.value !== "");
  const [bgMode, setBgMode] = useState<"preset" | "custom">(isPreset ? "preset" : "custom");

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setImageUrl(data.url);
    } catch (err) {
      setError(String(err));
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      tag,
      title,
      sub,
      cta,
      href,
      bg,
      accent,
      imageUrl: imageUrl || null,
      position: parseInt(position, 10) || 0,
      active,
    };

    const url    = mode === "create" ? "/api/admin/banners" : `/api/admin/banners/${initial!.id}`;
    const method = mode === "create" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setError(d.error || "Save failed");
      return;
    }

    router.push("/admin/banners");
    router.refresh();
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>

      {/* ── Live preview ─────────────────────────────── */}
      <div
        style={{
          borderRadius: 8,
          overflow: "hidden",
          marginBottom: 8,
          height: 160,
          background: bg,
          display: "flex",
          alignItems: "center",
          padding: "0 40px",
          gap: 32,
        }}
      >
        <div style={{ flex: 1 }}>
          {tag && (
            <div style={{
              display: "inline-block",
              background: accent,
              color: "#fff",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.1em",
              padding: "3px 10px",
              borderRadius: 4,
              marginBottom: 8,
            }}>
              {tag}
            </div>
          )}
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 22, lineHeight: 1.2, whiteSpace: "pre-line" }}>
            {title || "Slide title"}
          </div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginTop: 6 }}>
            {sub || "Subtitle text"}
          </div>
        </div>
        <div style={{ width: 120, height: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {imageUrl ? (
            <img src={imageUrl} alt="" style={{ maxHeight: 120, maxWidth: 120, objectFit: "contain" }} />
          ) : (
            <div style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-mono)", fontSize: 10, textAlign: "center" }}>
              No image
            </div>
          )}
        </div>
      </div>
      <p className="t-caption" style={{ marginBottom: 24 }}>↑ Live preview</p>

      {/* ── Text fields ──────────────────────────────── */}
      <div className="admin-form-row">
        <label>
          <span>Tag (small pill above title)</span>
          <input className="input" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Summer Gaming Deals" />
        </label>
        <label>
          <span>Accent colour</span>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input type="color" value={accent} onChange={(e) => setAccent(e.target.value)}
              style={{ width: 40, height: 38, padding: 2, border: "1px solid var(--border)", borderRadius: 4, cursor: "pointer", background: "var(--surface-2)" }} />
            <input className="input" value={accent} onChange={(e) => setAccent(e.target.value)}
              style={{ fontFamily: "var(--font-mono)", fontSize: 13 }} placeholder="#F26522" />
          </div>
        </label>
      </div>

      <label>
        <span>Title (use a new line to split into two lines)</span>
        <textarea
          className="input"
          rows={2}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={"Up to 50% OFF\nGaming Gear"}
          style={{ resize: "vertical" }}
        />
      </label>

      <label>
        <span>Subtitle</span>
        <input className="input" value={sub} onChange={(e) => setSub(e.target.value)}
          placeholder="Limited time offer on top-rated mice, keyboards and chairs" />
      </label>

      <div className="admin-form-row">
        <label>
          <span>Button text</span>
          <input className="input" value={cta} onChange={(e) => setCta(e.target.value)} placeholder="Shop Deals" />
        </label>
        <label>
          <span>Button link</span>
          <input className="input" value={href} onChange={(e) => setHref(e.target.value)} placeholder="/catalog/mice" />
        </label>
      </div>

      {/* ── Background ───────────────────────────────── */}
      <label>
        <span>Background</span>
        <select
          className="input"
          value={bgMode === "preset" ? bg : ""}
          onChange={(e) => {
            if (e.target.value === "") {
              setBgMode("custom");
            } else {
              setBgMode("preset");
              setBg(e.target.value);
            }
          }}
        >
          {ART_PRESETS.map((p) => (
            <option key={p.label} value={p.value}>{p.label}</option>
          ))}
        </select>
      </label>
      {bgMode === "custom" && (
        <label>
          <span>Custom CSS background (gradient or colour)</span>
          <input className="input" value={bg} onChange={(e) => setBg(e.target.value)}
            placeholder="linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)" style={{ fontFamily: "var(--font-mono)", fontSize: 12 }} />
        </label>
      )}

      {/* ── Image ────────────────────────────────────── */}
      <div className="admin-image-section">
        <span className="admin-image-label">Slide image (optional)</span>
        {imageUrl && (
          <div className="admin-image-preview">
            <img src={imageUrl} alt="Slide preview" />
            <button type="button" className="admin-image-remove" onClick={() => setImageUrl("")}>Remove</button>
          </div>
        )}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button type="button" className="btn btn--secondary btn--sm"
            onClick={() => fileRef.current?.click()} disabled={uploading}>
            {uploading ? "Uploading…" : imageUrl ? "Replace image" : "Upload image"}
          </button>
          {imageUrl && <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--mute)" }}>Image set</span>}
        </div>
        <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleImageUpload} style={{ display: "none" }} />
      </div>

      {/* ── Order & visibility ───────────────────────── */}
      <div className="admin-form-row">
        <label>
          <span>Display order (lower = first)</span>
          <input className="input" type="number" min={0} value={position}
            onChange={(e) => setPosition(e.target.value)} />
        </label>
        <label style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingTop: 24 }}>
          <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
          <span>Visible on storefront</span>
        </label>
      </div>

      {error && <p className="admin-error">{error}</p>}

      <div style={{ display: "flex", gap: 12 }}>
        <button type="submit" className="btn btn--primary btn--lg" disabled={saving}>
          {saving ? "Saving…" : mode === "create" ? "Create slide" : "Save changes"}
        </button>
        <button type="button" className="btn btn--ghost" onClick={() => router.push("/admin/banners")}>
          Cancel
        </button>
      </div>
    </form>
  );
}
