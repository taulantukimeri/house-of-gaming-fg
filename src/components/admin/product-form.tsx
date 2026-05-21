"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Product, ProductArt, ProductBadge, StockStatus } from "@/lib/types";

const ARTS: ProductArt[] = [
  "mouse",
  "keyboard",
  "headset",
  "chair",
  "desk",
  "controller",
];

const STOCKS: StockStatus[] = ["ok", "warn", "err"];

export type AdminCategory = {
  id: string;
  name: string;
};

function emptyProduct(): Partial<Product> {
  return {
    id: "",
    sku: "",
    cat: "mice",
    catLabel: "MICE",
    brand: "",
    name: "",
    fullName: "",
    blurb: "",
    long: "",
    price: 0,
    msrp: null,
    stock: "ok",
    stockLabel: "IN STOCK",
    verified: false,
    badge: null,
    art: "mouse",
    specs: [["", ""]],
    swatches: undefined,
  };
}

export function ProductForm({
  categories,
  initial,
  mode,
}: {
  categories: AdminCategory[];
  initial?: Product;
  mode: "create" | "edit";
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [id, setId] = useState(initial?.id ?? "");
  const [sku, setSku] = useState(initial?.sku ?? "");
  const [catId, setCatId] = useState(initial?.cat ?? "mice");
  const [catLabel, setCatLabel] = useState(initial?.catLabel ?? "MICE");
  const [brand, setBrand] = useState(initial?.brand ?? "");
  const [name, setName] = useState(initial?.name ?? "");
  const [fullName, setFullName] = useState(initial?.fullName ?? "");
  const [blurb, setBlurb] = useState(initial?.blurb ?? "");
  const [description, setDescription] = useState(initial?.long ?? "");
  const [price, setPrice] = useState(String(initial?.price ?? ""));
  const [msrp, setMsrp] = useState(
    initial?.msrp != null ? String(initial.msrp) : ""
  );
  const [stock, setStock] = useState<StockStatus>(initial?.stock ?? "ok");
  const [stockLabel, setStockLabel] = useState(
    initial?.stockLabel ?? "IN STOCK"
  );
  const [verified, setVerified] = useState(initial?.verified ?? false);
  const [badgeType, setBadgeType] = useState(initial?.badge?.type ?? "");
  const [badgeLabel, setBadgeLabel] = useState(initial?.badge?.label ?? "");
  const [art, setArt] = useState<ProductArt>(initial?.art ?? "mouse");
  const [specsText, setSpecsText] = useState(
    initial?.specs?.map(([k, v]) => `${k}|${v}`).join("\n") ?? ""
  );

  function onCategoryChange(nextCat: string) {
    setCatId(nextCat);
    const cat = categories.find((c) => c.id === nextCat);
    if (cat) {
      setCatLabel(cat.name.toUpperCase());
      setArt(cat.id === "accessories" ? "controller" : (cat.id as ProductArt));
    }
  }

  function parseSpecs(): [string, string][] {
    return specsText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [k, ...rest] = line.split("|");
        return [k.trim(), rest.join("|").trim()] as [string, string];
      })
      .filter(([k, v]) => k && v);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const badge: ProductBadge | null =
      badgeType && badgeLabel
        ? {
            type: badgeType as ProductBadge["type"],
            label: badgeLabel,
          }
        : null;

    const payload = {
      id: id.trim(),
      sku: sku.trim(),
      catId,
      catLabel,
      brand,
      name,
      fullName,
      blurb,
      description,
      price: parseInt(price, 10) || 0,
      msrp: msrp ? parseInt(msrp, 10) : null,
      stock,
      stockLabel,
      verified,
      badge,
      art,
      specs: parseSpecs().length ? parseSpecs() : [["Spec", "—"]],
      swatches: initial?.swatches,
    };

    const url =
      mode === "create" ? "/api/admin/products" : `/api/admin/products/${id}`;
    const method = mode === "create" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Save failed");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="admin-form-row">
        <label>
          <span>Product ID (URL slug)</span>
          <input
            className="input"
            value={id}
            onChange={(e) => setId(e.target.value)}
            disabled={mode === "edit"}
            required
            placeholder="lg-gp2"
          />
        </label>
        <label>
          <span>SKU</span>
          <input
            className="input"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            required
          />
        </label>
      </div>

      <div className="admin-form-row">
        <label>
          <span>Category</span>
          <select
            className="input"
            value={catId}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Category label (eyebrow)</span>
          <input
            className="input"
            value={catLabel}
            onChange={(e) => setCatLabel(e.target.value)}
          />
        </label>
      </div>

      <div className="admin-form-row">
        <label>
          <span>Brand</span>
          <input
            className="input"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Short name</span>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>

      <label>
        <span>Full name</span>
        <input
          className="input"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </label>

      <label>
        <span>Blurb (one line)</span>
        <input
          className="input"
          value={blurb}
          onChange={(e) => setBlurb(e.target.value)}
        />
      </label>

      <label>
        <span>Description</span>
        <textarea
          className="input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <div className="admin-form-row">
        <label>
          <span>Price (EUR)</span>
          <input
            className="input"
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label>
          <span>MSRP (optional)</span>
          <input
            className="input"
            type="number"
            min={0}
            value={msrp}
            onChange={(e) => setMsrp(e.target.value)}
          />
        </label>
      </div>

      <div className="admin-form-row">
        <label>
          <span>Stock status</span>
          <select
            className="input"
            value={stock}
            onChange={(e) => setStock(e.target.value as StockStatus)}
          >
            {STOCKS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Stock label</span>
          <input
            className="input"
            value={stockLabel}
            onChange={(e) => setStockLabel(e.target.value)}
          />
        </label>
      </div>

      <div className="admin-form-row">
        <label>
          <span>Art icon</span>
          <select
            className="input"
            value={art}
            onChange={(e) => setArt(e.target.value as ProductArt)}
          >
            {ARTS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </label>
        <label style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={verified}
            onChange={(e) => setVerified(e.target.checked)}
          />
          <span>FG verified</span>
        </label>
      </div>

      <div className="admin-form-row">
        <label>
          <span>Badge type (optional)</span>
          <select
            className="input"
            value={badgeType}
            onChange={(e) => setBadgeType(e.target.value)}
          >
            <option value="">None</option>
            <option value="volt">volt</option>
            <option value="ignit">ignit</option>
            <option value="ok">ok</option>
            <option value="warn">warn</option>
          </select>
        </label>
        <label>
          <span>Badge label</span>
          <input
            className="input"
            value={badgeLabel}
            onChange={(e) => setBadgeLabel(e.target.value)}
            disabled={!badgeType}
          />
        </label>
      </div>

      <label>
        <span>Specs (one per line: Key|Value)</span>
        <textarea
          className="input"
          value={specsText}
          onChange={(e) => setSpecsText(e.target.value)}
          placeholder={"Sensor|Hero 2 · 32 000 DPI\nWeight|60 g"}
        />
      </label>

      {error && <p className="admin-error">{error}</p>}

      <div style={{ display: "flex", gap: 12 }}>
        <button
          type="submit"
          className="btn btn--primary btn--lg"
          disabled={saving}
        >
          {saving ? "Saving…" : mode === "create" ? "Create product" : "Save changes"}
        </button>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => router.push("/admin")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export { emptyProduct };
