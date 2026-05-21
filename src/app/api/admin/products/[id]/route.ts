import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { getProductById, mapProduct, toDbFields, type ProductInput } from "@/lib/products";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(request: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json()) as ProductInput;

  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const category = await prisma.category.findUnique({
    where: { id: body.catId },
  });
  if (!category) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }

  const row = await prisma.product.update({
    where: { id },
    data: toDbFields({ ...body, id }),
  });
  return NextResponse.json(mapProduct(row));
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
