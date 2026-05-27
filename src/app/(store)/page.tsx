import { HomeScreen } from "@/screens/home-screen";
import { getAllProducts, getCategories } from "@/lib/products";
import { getBannerImages } from "@/lib/settings";
import type { ProductArt } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [categories, products, bannerImages] = await Promise.all([
    getCategories(),
    getAllProducts(),
    getBannerImages(),
  ]);

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
