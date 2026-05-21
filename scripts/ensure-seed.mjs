/**
 * Seeds the database only when empty (safe to run on every Hostinger build).
 */
import { PrismaClient } from "@prisma/client";
import { execSync } from "node:child_process";

const prisma = new PrismaClient();

try {
  const count = await prisma.product.count();
  if (count === 0) {
    console.log("[ensure-seed] No products found — running seed…");
    execSync("npx tsx prisma/seed.ts", { stdio: "inherit" });
  } else {
    console.log(`[ensure-seed] Database has ${count} products — skip seed.`);
  }
} finally {
  await prisma.$disconnect();
}
