/**
 * Ensures categories exist and removes legacy hardcoded products.
 * Safe to run on every build.
 */
import { PrismaClient } from "@prisma/client";
import { execSync } from "node:child_process";

const LEGACY_IDS = ["lg-gp2", "rog-az", "he-emb", "sb-ar", "sd-r3", "ra-vp", "wb-q", "fc-ke"];

const prisma = new PrismaClient();

try {
  // Remove legacy hardcoded products if they still exist
  const deleted = await prisma.product.deleteMany({ where: { id: { in: LEGACY_IDS } } });
  if (deleted.count > 0) {
    console.log(`[ensure-seed] Removed ${deleted.count} legacy hardcoded product(s).`);
  }

  // Seed categories (always safe — uses upsert)
  execSync("npx tsx prisma/seed.ts", { stdio: "inherit" });
} finally {
  await prisma.$disconnect();
}
