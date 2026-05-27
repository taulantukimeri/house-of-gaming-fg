import { AdminHeader } from "@/components/admin/admin-header";
import { BannerSlideForm } from "@/components/admin/banner-slide-form";

export const dynamic = "force-dynamic";

export default function NewBannerPage() {
  return (
    <div className="admin-wrap">
      <AdminHeader title="Add Banner Slide" />
      <BannerSlideForm mode="create" />
    </div>
  );
}
