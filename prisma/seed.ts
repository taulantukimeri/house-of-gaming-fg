import { PrismaClient } from "@prisma/client";
import { CATEGORIES, PRODUCTS } from "../src/lib/data";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding categories…");
  for (const c of CATEGORIES) {
    await prisma.category.upsert({
      where: { id: c.id },
      create: {
        id: c.id,
        name: c.name,
        count: c.count,
        art: c.art,
      },
      update: {
        name: c.name,
        count: c.count,
        art: c.art,
      },
    });
  }

  console.log("Seeding products…");
  for (const p of PRODUCTS) {
    await prisma.product.upsert({
      where: { id: p.id },
      create: {
        id: p.id,
        sku: p.sku,
        catId: p.cat,
        catLabel: p.catLabel,
        brand: p.brand,
        name: p.name,
        fullName: p.fullName,
        blurb: p.blurb,
        description: p.long,
        price: p.price,
        msrp: p.msrp,
        stock: p.stock,
        stockLabel: p.stockLabel,
        verified: p.verified,
        badge: p.badge ? JSON.stringify(p.badge) : null,
        art: p.art,
        specs: JSON.stringify(p.specs),
        swatches: p.swatches ? JSON.stringify(p.swatches) : null,
      },
      update: {
        sku: p.sku,
        catId: p.cat,
        catLabel: p.catLabel,
        brand: p.brand,
        name: p.name,
        fullName: p.fullName,
        blurb: p.blurb,
        description: p.long,
        price: p.price,
        msrp: p.msrp,
        stock: p.stock,
        stockLabel: p.stockLabel,
        verified: p.verified,
        badge: p.badge ? JSON.stringify(p.badge) : null,
        art: p.art,
        specs: JSON.stringify(p.specs),
        swatches: p.swatches ? JSON.stringify(p.swatches) : null,
      },
    });
  }

  console.log(`Done — ${CATEGORIES.length} categories, ${PRODUCTS.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
