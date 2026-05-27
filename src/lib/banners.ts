import { prisma } from "@/lib/prisma";
import type { BannerSlide } from "@prisma/client";

export type { BannerSlide };

export async function getBannerSlides(): Promise<BannerSlide[]> {
  return prisma.bannerSlide.findMany({
    where: { active: true },
    orderBy: { position: "asc" },
  });
}

export async function getAllBannerSlides(): Promise<BannerSlide[]> {
  return prisma.bannerSlide.findMany({ orderBy: { position: "asc" } });
}

export async function getBannerSlideById(id: number): Promise<BannerSlide | null> {
  return prisma.bannerSlide.findUnique({ where: { id } });
}

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

export async function createBannerSlide(data: BannerSlideInput): Promise<BannerSlide> {
  return prisma.bannerSlide.create({ data });
}

export async function updateBannerSlide(id: number, data: Partial<BannerSlideInput>): Promise<BannerSlide> {
  return prisma.bannerSlide.update({ where: { id }, data });
}

export async function deleteBannerSlide(id: number): Promise<void> {
  await prisma.bannerSlide.delete({ where: { id } });
}
