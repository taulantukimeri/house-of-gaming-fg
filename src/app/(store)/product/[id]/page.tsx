import { PDPScreen } from "@/screens/pdp-screen";
import { getAllProducts, getProductById } from "@/lib/products";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, allProducts] = await Promise.all([
    getProductById(id),
    getAllProducts(),
  ]);

  if (!product) notFound();

  return <PDPScreen product={product} allProducts={allProducts} />;
}
