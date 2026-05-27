-- CreateTable
CREATE TABLE "Setting" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL DEFAULT ''
);

-- Seed the three banner image slots with empty defaults
INSERT INTO "Setting" ("key", "value") VALUES
  ('banner_image_mice', ''),
  ('banner_image_keyboards', ''),
  ('banner_image_chairs', '');
