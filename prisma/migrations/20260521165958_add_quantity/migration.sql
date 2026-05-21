-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sku" TEXT NOT NULL,
    "catId" TEXT NOT NULL,
    "catLabel" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "blurb" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "msrp" INTEGER,
    "stock" TEXT NOT NULL,
    "stockLabel" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "badge" TEXT,
    "art" TEXT NOT NULL,
    "specs" TEXT NOT NULL,
    "swatches" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Product_catId_fkey" FOREIGN KEY ("catId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("art", "badge", "blurb", "brand", "catId", "catLabel", "createdAt", "description", "fullName", "id", "msrp", "name", "price", "sku", "specs", "stock", "stockLabel", "swatches", "updatedAt", "verified") SELECT "art", "badge", "blurb", "brand", "catId", "catLabel", "createdAt", "description", "fullName", "id", "msrp", "name", "price", "sku", "specs", "stock", "stockLabel", "swatches", "updatedAt", "verified" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
