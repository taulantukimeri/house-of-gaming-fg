import { HomeScreen } from "@/screens/home-screen";
import { getAllProducts, getCategories } from "@/lib/products";
import { getBannerSlides } from "@/lib/banners";
import type { ProductArt } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [categories, products, bannerSlides] = await Promise.all([
    getCategories(),
    getAllProducts(),
    getBannerSlides().catch(() => []),
  ]);

  return (
    <HomeScreen
      categories={categories.map((c) => ({
        id: c.id,
        name: c.name,
        count: c.count,
        art: c.art as ProductArt,
      }))}
      featuredProducts={products.slice(0, 8)}
      heroProduct={products[0] ?? null}
      bannerSlides={bannerSlides}
    />
  );
}
