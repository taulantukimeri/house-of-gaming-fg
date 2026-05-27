import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { setBannerImage, BANNER_KEYS, type BannerCat } from "@/lib/settings";

type Params = { params: Promise<{ cat: string }> };

export async function PUT(request: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { cat } = await params;

  if (!Object.keys(BANNER_KEYS).includes(cat)) {
    return NextResponse.json({ error: "Invalid banner category" }, { status: 400 });
  }

  const body = await request.json().catch(() => ({}));
  const imageUrl = typeof body.imageUrl === "string" ? body.imageUrl.trim() : "";

  await setBannerImage(cat as BannerCat, imageUrl);
  return NextResponse.json({ ok: true, cat, imageUrl });
}
