import { AdminHeader } from "@/components/admin/admin-header";
import { BannerManager } from "@/components/admin/banner-manager";
import { getBannerImages } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function BannersPage() {
  const images = await getBannerImages();

  return (
    <div className="admin-wrap">
      <AdminHeader title="Banner Images" />
      <p className="t-body-sm" style={{ marginBottom: 32 }}>
        Upload an image for each homepage banner slide. Recommended size: 800×600 px, transparent or dark background.
        Leave empty to show the default icon art.
      </p>
      <BannerManager initial={images} />
    </div>
  );
}
