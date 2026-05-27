import { HomeScreen } from "@/screens/home-screen";
import { getAllProducts, getCategories } from "@/lib/products";
import type { ProductArt } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getAllProducts(),
  ]);

  // For each banner slide, find the first product in that category
  // that has an uploaded image. Falls back to null → SVG art shown instead.
  const bannerCategories = ["mice", "keyboards", "chairs"] as const;
  const bannerImages: Record<string, string | null> = {};
  for (const cat of bannerCategories) {
    const match = products.find((p) => p.cat === cat && p.imageUrl);
    bannerImages[cat] = match?.imageUrl ?? null;
  }

  return (
    <HomeScreen
      categories={categories.map((c) => ({
        id: c.id,
        name: c.name,
        count: c.count,
        art: c.art as ProductArt,
      }))}
      featuredProducts={products.slice(0, 4)}
      heroProduct={products.find((p) => p.id === "lg-gp2") ?? products[0] ?? null}
      bannerImages={bannerImages}
    />
  );
}
