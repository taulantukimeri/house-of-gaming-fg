import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAllBannerSlides, createBannerSlide, type BannerSlideInput } from "@/lib/banners";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await getAllBannerSlides());
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as BannerSlideInput;
  const slide = await createBannerSlide(body);
  return NextResponse.json(slide, { status: 201 });
}
