import { prisma } from "@/lib/prisma";
import type { BannerSlide } from "@/lib/types";

export type { BannerSlide };

export type BannerSlideInput = {
  position?: number;
  active?: boolean;
  tag: string;
  title: string;
  sub: string;
  cta: string;
  href: string;
  imageUrl?: string | null;
  bg: string;
  accent: string;
};

/**
 * Returns active slides for the storefront.
 * Catches any DB error (e.g. table not yet migrated) and returns [] so the
 * page still renders with the hardcoded fallback slide.
 */
export async function getBannerSlides(): Promise<BannerSlide[]> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await (prisma as any).bannerSlide.findMany({
      where: { active: true },
      orderBy: { position: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getAllBannerSlides(): Promise<BannerSlide[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (prisma as any).bannerSlide.findMany({ orderBy: { position: "asc" } });
}

export async function getBannerSlideById(id: number): Promise<BannerSlide | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (prisma as any).bannerSlide.findUnique({ where: { id } });
}

export async function createBannerSlide(data: BannerSlideInput): Promise<BannerSlide> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (prisma as any).bannerSlide.create({ data });
}

export async function updateBannerSlide(id: number, data: Partial<BannerSlideInput>): Promise<BannerSlide> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (prisma as any).bannerSlide.update({ where: { id }, data });
}

export async function deleteBannerSlide(id: number): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (prisma as any).bannerSlide.delete({ where: { id } });
}
