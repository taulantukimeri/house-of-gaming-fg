-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "art" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Product" (
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
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "badge" TEXT,
    "art" TEXT NOT NULL,
    "specs" TEXT NOT NULL,
    "swatches" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Product_catId_fkey" FOREIGN KEY ("catId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");
