import { prisma } from "@/lib/prisma";

export const BANNER_KEYS = {
  mice:      "banner_image_mice",
  keyboards: "banner_image_keyboards",
  chairs:    "banner_image_chairs",
} as const;

export type BannerCat = keyof typeof BANNER_KEYS;

/** Returns the current banner imageUrl for each category (null = not set). */
export async function getBannerImages(): Promise<Record<BannerCat, string | null>> {
  const rows = await prisma.setting.findMany({
    where: { key: { in: Object.values(BANNER_KEYS) } },
  });

  const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));

  return {
    mice:      map[BANNER_KEYS.mice]      || null,
    keyboards: map[BANNER_KEYS.keyboards] || null,
    chairs:    map[BANNER_KEYS.chairs]    || null,
  };
}

/** Upserts a single banner imageUrl. */
export async function setBannerImage(cat: BannerCat, imageUrl: string) {
  const key = BANNER_KEYS[cat];
  await prisma.setting.upsert({
    where: { key },
    update: { value: imageUrl },
    create: { key, value: imageUrl },
  });
}
