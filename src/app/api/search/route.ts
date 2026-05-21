import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mapProduct } from "@/lib/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";

  if (q.length < 2) return NextResponse.json([]);

  const rows = await prisma.product.findMany({
    where: {
      OR: [
        { fullName: { contains: q } },
        { brand: { contains: q } },
        { name: { contains: q } },
        { catLabel: { contains: q } },
      ],
    },
    take: 8,
    orderBy: { fullName: "asc" },
  });

  return NextResponse.json(rows.map(mapProduct));
}
