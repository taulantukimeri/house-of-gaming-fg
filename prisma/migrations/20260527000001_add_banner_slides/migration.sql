-- CreateTable
CREATE TABLE "BannerSlide" (
    "id"       INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "active"   BOOLEAN NOT NULL DEFAULT true,
    "tag"      TEXT NOT NULL DEFAULT '',
    "title"    TEXT NOT NULL DEFAULT '',
    "sub"      TEXT NOT NULL DEFAULT '',
    "cta"      TEXT NOT NULL DEFAULT 'Shop Now',
    "href"     TEXT NOT NULL DEFAULT '/catalog',
    "imageUrl" TEXT,
    "bg"       TEXT NOT NULL DEFAULT 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
    "accent"   TEXT NOT NULL DEFAULT '#F26522'
);

-- Seed the 3 default slides that were previously hardcoded
INSERT INTO "BannerSlide" ("position","active","tag","title","sub","cta","href","imageUrl","bg","accent") VALUES
  (0, 1, 'Summer Gaming Deals',  'Up to 50% OFF\nGaming Gear',        'Limited time offer on top-rated mice, keyboards and chairs',             'Shop Deals',     '/catalog/mice',      NULL, 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)', '#F26522'),
  (1, 1, 'New Arrivals',         'Pro Gaming\nKeyboards',             'Hall-effect switches, wireless freedom, per-key RGB — all in stock',     'Shop Keyboards', '/catalog/keyboards', NULL, 'linear-gradient(135deg, #0F3460 0%, #16213E 100%)', '#F26522'),
  (2, 1, 'Ergonomic Collection', 'Gaming Chairs\nFrom €109',          'From budget-friendly to pro-grade — chairs built for long sessions',     'Shop Chairs',    '/catalog/chairs',    NULL, 'linear-gradient(135deg, #1A1A2E 0%, #2D1B4E 100%)', '#F26522');
