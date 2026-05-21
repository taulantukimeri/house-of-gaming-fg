import { PrismaClient } from "@prisma/client";
import { CATEGORIES } from "../src/lib/data";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding categories…");
  for (const c of CATEGORIES) {
    await prisma.category.upsert({
      where: { id: c.id },
      create: { id: c.id, name: c.name, count: c.count, art: c.art },
      update: { name: c.name, count: c.count, art: c.art },
    });
  }
  console.log(`Done — ${CATEGORIES.length} categories seeded.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
