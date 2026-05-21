const { cpSync, copyFileSync, existsSync, mkdirSync } = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

// Static assets must be served from standalone's .next/static
if (existsSync(path.join(root, '.next/standalone'))) {
  cpSync(
    path.join(root, '.next/static'),
    path.join(root, '.next/standalone/.next/static'),
    { recursive: true }
  );
  console.log('[post-build] Copied .next/static to standalone');

  // Public folder (logo, favicons, etc.)
  if (existsSync(path.join(root, 'public'))) {
    cpSync(
      path.join(root, 'public'),
      path.join(root, '.next/standalone/public'),
      { recursive: true }
    );
    console.log('[post-build] Copied public/ to standalone');
  }

  // Prisma query engine binary (nft tracer misses .prisma/client)
  const prismaDir = path.join(root, 'node_modules/.prisma');
  if (existsSync(prismaDir)) {
    const dest = path.join(root, '.next/standalone/node_modules/.prisma');
    mkdirSync(dest, { recursive: true });
    cpSync(prismaDir, dest, { recursive: true });
    console.log('[post-build] Copied .prisma/ engine binaries to standalone');
  }
}

// ── Hostinger: copy the SQLite database to the runtime (nodejs) directory ──
// Build runs in: /home/u.../domains/site.com/public_html/.builds/source/repository/
// Runtime runs from: /home/u.../domains/site.com/nodejs/
// The DB created here during build must be placed where the server can open it.
if (root.includes('/public_html/')) {
  const domainDir = root.split('/public_html/')[0]; // /home/u.../domains/site.com
  const nodejsDir = path.join(domainDir, 'nodejs');
  const buildDb   = path.join(root, 'prisma', 'production.db');

  if (existsSync(nodejsDir) && existsSync(buildDb)) {
    const runtimePrismaDir = path.join(nodejsDir, 'prisma');
    mkdirSync(runtimePrismaDir, { recursive: true });
    copyFileSync(buildDb, path.join(runtimePrismaDir, 'production.db'));
    console.log('[post-build] Copied database to runtime:', runtimePrismaDir);
  } else {
    console.log('[post-build] Skipped DB copy — nodejsDir:', nodejsDir, 'exists:', existsSync(nodejsDir));
  }
}
