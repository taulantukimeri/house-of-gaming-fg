import { AdminHeader } from "@/components/admin/admin-header";
import { ProductForm } from "@/components/admin/product-form";
import { getCategories } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div className="admin-wrap">
      <AdminHeader title="Add product" />
      <ProductForm
        mode="create"
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
      />
    </div>
  );
}
