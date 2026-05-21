import { prisma } from "@/lib/prisma";
import type { Product, ProductArt, ProductBadge, StockStatus } from "@/lib/types";
import type { Product as DbProduct } from "@prisma/client";

function parseBadge(raw: string | null): ProductBadge | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ProductBadge;
  } catch {
    return null;
  }
}

export function mapProduct(row: DbProduct): Product {
  return {
    id: row.id,
    sku: row.sku,
    cat: row.catId,
    catLabel: row.catLabel,
    brand: row.brand,
    name: row.name,
    fullName: row.fullName,
    blurb: row.blurb,
    long: row.description,
    price: row.price,
    msrp: row.msrp,
    stock: row.stock as StockStatus,
    stockLabel: row.stockLabel,
    verified: row.verified,
    badge: parseBadge(row.badge),
    art: row.art as ProductArt,
    specs: JSON.parse(row.specs) as [string, string][],
    swatches: row.swatches
      ? (JSON.parse(row.swatches) as Record<string, string[]>)
      : undefined,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({ orderBy: { fullName: "asc" } });
  return rows.map(mapProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  const row = await prisma.product.findUnique({ where: { id } });
  return row ? mapProduct(row) : null;
}

export async function getProductsByCategory(catId: string): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { catId },
    orderBy: { fullName: "asc" },
  });
  return rows.map(mapProduct);
}

export async function getProductIds(): Promise<string[]> {
  const rows = await prisma.product.findMany({ select: { id: true } });
  return rows.map((r) => r.id);
}

export async function getCategories() {
  return prisma.category.findMany({ orderBy: { name: "asc" } });
}

export async function getCategoryById(id: string) {
  return prisma.category.findUnique({ where: { id } });
}

export type ProductInput = {
  id: string;
  sku: string;
  catId: string;
  catLabel: string;
  brand: string;
  name: string;
  fullName: string;
  blurb: string;
  description: string;
  price: number;
  msrp: number | null;
  stock: string;
  stockLabel: string;
  verified: boolean;
  badge: ProductBadge | null;
  art: string;
  specs: [string, string][];
  swatches?: Record<string, string[]>;
};

export function toDbFields(input: ProductInput) {
  return {
    id: input.id,
    sku: input.sku,
    catId: input.catId,
    catLabel: input.catLabel,
    brand: input.brand,
    name: input.name,
    fullName: input.fullName,
    blurb: input.blurb,
    description: input.description,
    price: input.price,
    msrp: input.msrp,
    stock: input.stock,
    stockLabel: input.stockLabel,
    verified: input.verified,
    badge: input.badge ? JSON.stringify(input.badge) : null,
    art: input.art,
    specs: JSON.stringify(input.specs),
    swatches: input.swatches ? JSON.stringify(input.swatches) : null,
  };
}
