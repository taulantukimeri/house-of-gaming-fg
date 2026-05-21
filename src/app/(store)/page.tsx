import { HomeScreen } from "@/screens/home-screen";
import { getAllProducts, getCategories } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getAllProducts(),
  ]);

  return (
    <HomeScreen
      categories={categories.map((c) => ({
        id: c.id,
        name: c.name,
        count: c.count,
        art: c.art as import("@/lib/types").ProductArt,
      }))}
      featuredProducts={products.slice(0, 4)}
      heroProduct={products.find((p) => p.id === "lg-gp2") ?? products[0]}
    />
  );
}
