import { AdminHeader } from "@/components/admin/admin-header";
import { ProductForm } from "@/components/admin/product-form";
import { getCategories, getProductById } from "@/lib/products";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getProductById(id),
    getCategories(),
  ]);

  if (!product) notFound();

  return (
    <div className="admin-wrap">
      <AdminHeader title={`Edit — ${product.name}`} />
      <ProductForm
        mode="edit"
        initial={product}
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
      />
    </div>
  );
}
