import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { DeleteProductButton } from "@/components/admin/delete-product-button";
import { getAllProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const products = await getAllProducts();

  return (
    <div className="admin-wrap">
      <AdminHeader title="Products">
        <Link href="/admin/products/new" className="btn btn--primary btn--sm">
          Add product
        </Link>
      </AdminHeader>

      <p className="t-body-sm" style={{ marginBottom: 24 }}>
        {products.length} products in the database. Changes appear on the
        storefront immediately.
      </p>

      <div
        style={{
          border: "1px solid var(--border)",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>
                  <div style={{ fontWeight: 600 }}>{p.fullName}</div>
                  <div className="t-caption">{p.id}</div>
                </td>
                <td style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>
                  {p.sku}
                </td>
                <td>{p.catLabel}</td>
                <td style={{ fontFamily: "var(--font-mono)" }}>€{p.price}</td>
                <td>
                  <span className={`stock ${p.stock}`} style={{ padding: "4px 10px" }}>
                    <span className="stock-dot" />
                    {p.stockLabel}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="btn btn--ghost btn--sm"
                    >
                      Edit
                    </Link>
                    <DeleteProductButton id={p.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
