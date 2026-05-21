import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { getAllProducts, mapProduct, toDbFields, type ProductInput } from "@/lib/products";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const products = await getAllProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as ProductInput;

  if (!body.id?.trim() || !body.sku?.trim() || !body.fullName?.trim()) {
    return NextResponse.json(
      { error: "id, sku, and fullName are required" },
      { status: 400 }
    );
  }

  const category = await prisma.category.findUnique({
    where: { id: body.catId },
  });
  if (!category) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }

  try {
    const row = await prisma.product.create({ data: toDbFields(body) });
    return NextResponse.json(mapProduct(row), { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Product id or SKU already exists" },
      { status: 409 }
    );
  }
}
