import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { DeleteBannerButton } from "@/components/admin/delete-banner-button";
import { getAllBannerSlides } from "@/lib/banners";

export const dynamic = "force-dynamic";

export default async function BannersPage() {
  const slides = await getAllBannerSlides();

  return (
    <div className="admin-wrap">
      <AdminHeader title="Banner Slides">
        <Link href="/admin/banners/new" className="btn btn--primary btn--sm">
          Add slide
        </Link>
      </AdminHeader>

      <p className="t-body-sm" style={{ marginBottom: 24 }}>
        {slides.length} slide{slides.length !== 1 ? "s" : ""}. Changes appear on the storefront immediately.
      </p>

      <div style={{ display: "grid", gap: 16 }}>
        {slides.map((s) => (
          <div
            key={s.id}
            style={{
              border: "1px solid var(--border)",
              borderRadius: 8,
              overflow: "hidden",
              background: "var(--surface-1)",
              display: "grid",
              gridTemplateColumns: "200px 1fr auto",
              alignItems: "stretch",
            }}
          >
            {/* Mini preview */}
            <div
              style={{
                background: s.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 100,
                padding: 16,
              }}
            >
              {s.imageUrl ? (
                <img
                  src={s.imageUrl}
                  alt={s.tag}
                  style={{ maxHeight: 80, maxWidth: "100%", objectFit: "contain" }}
                />
              ) : (
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "rgba(255,255,255,0.4)",
                    textAlign: "center",
                  }}
                >
                  No image
                </div>
              )}
            </div>

            {/* Info */}
            <div style={{ padding: "16px 24px" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                <span
                  style={{
                    background: s.accent,
                    color: "#fff",
                    fontSize: 10,
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.1em",
                    padding: "2px 8px",
                    borderRadius: 4,
                  }}
                >
                  {s.tag || "—"}
                </span>
                {!s.active && (
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--mute)" }}>
                    HIDDEN
                  </span>
                )}
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--mute)", marginLeft: "auto" }}>
                  pos {s.position}
                </span>
              </div>
              <div style={{ fontWeight: 600, color: "var(--bone)", marginBottom: 4 }}>
                {s.title.replace("\n", " · ") || "—"}
              </div>
              <div className="t-caption">{s.sub || "—"}</div>
              <div style={{ marginTop: 8, display: "flex", gap: 16, fontSize: 12, color: "var(--mute)", fontFamily: "var(--font-mono)" }}>
                <span>CTA: {s.cta}</span>
                <span>→ {s.href}</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8, justifyContent: "center" }}>
              <Link href={`/admin/banners/${s.id}`} className="btn btn--ghost btn--sm">
                Edit
              </Link>
              <DeleteBannerButton id={s.id} />
            </div>
          </div>
        ))}

        {slides.length === 0 && (
          <div style={{ padding: 48, textAlign: "center", color: "var(--mute)", fontFamily: "var(--font-mono)", fontSize: 12 }}>
            No slides yet — click "Add slide" to create one.
          </div>
        )}
      </div>
    </div>
  );
}
