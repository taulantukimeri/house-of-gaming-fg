const { cpSync, existsSync, mkdirSync } = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

// Copy static assets into standalone output (needed when using output:'standalone')
if (existsSync(path.join(root, '.next/standalone'))) {
  cpSync(
    path.join(root, '.next/static'),
    path.join(root, '.next/standalone/.next/static'),
    { recursive: true }
  );
  console.log('[post-build] Copied .next/static to standalone');

  if (existsSync(path.join(root, 'public'))) {
    cpSync(
      path.join(root, 'public'),
      path.join(root, '.next/standalone/public'),
      { recursive: true }
    );
    console.log('[post-build] Copied public/ to standalone');
  }

  const prismaDir = path.join(root, 'node_modules/.prisma');
  if (existsSync(prismaDir)) {
    const dest = path.join(root, '.next/standalone/node_modules/.prisma');
    mkdirSync(dest, { recursive: true });
    cpSync(prismaDir, dest, { recursive: true });
    console.log('[post-build] Copied .prisma/ engine binaries to standalone');
  }
}
