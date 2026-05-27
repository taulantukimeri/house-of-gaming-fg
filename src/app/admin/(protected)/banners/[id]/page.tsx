import { AdminHeader } from "@/components/admin/admin-header";
import { BannerSlideForm } from "@/components/admin/banner-slide-form";
import { getBannerSlideById } from "@/lib/banners";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditBannerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const slide = await getBannerSlideById(Number(id));
  if (!slide) notFound();

  return (
    <div className="admin-wrap">
      <AdminHeader title={`Edit Slide — ${slide.tag || `#${slide.id}`}`} />
      <BannerSlideForm mode="edit" initial={slide} />
    </div>
  );
}
