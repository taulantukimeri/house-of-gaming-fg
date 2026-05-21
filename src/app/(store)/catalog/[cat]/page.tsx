import { PLPScreen } from "@/screens/plp-screen";
import { getCategoryById, getProductsByCategory } from "@/lib/products";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ cat: string }>;
}) {
  const { cat } = await params;
  const [category, products] = await Promise.all([
    getCategoryById(cat),
    getProductsByCategory(cat),
  ]);

  if (!category) notFound();

  return (
    <PLPScreen
      category={{
        id: category.id,
        name: category.name,
        count: category.count,
        art: category.art as import("@/lib/types").ProductArt,
      }}
      products={products}
    />
  );
}
