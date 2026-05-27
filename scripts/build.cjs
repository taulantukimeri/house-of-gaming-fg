'use strict';
/**
 * Production build script.
 *
 * Runs the full build pipeline in a single Node process so DATABASE_URL
 * is available to every step — including `prisma migrate deploy` — without
 * requiring a committed .env.production file.
 *
 * Priority:
 *  1. DATABASE_URL already set in the environment (Hostinger hPanel env var)
 *  2. Fallback to the well-known Hostinger production path
 */
const { execSync }  = require('child_process');
const { rmSync, existsSync } = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

// ── DATABASE_URL fallback ────────────────────────────────────────────────────
if (!process.env.DATABASE_URL || process.env.DATABASE_URL.startsWith('file:./')) {
  const dbPath = path.join(root, 'prisma', 'production.db');
  process.env.DATABASE_URL = 'file:' + dbPath;
  console.log('[build] DATABASE_URL not set — defaulting to:', process.env.DATABASE_URL);
} else {
  console.log('[build] DATABASE_URL:', process.env.DATABASE_URL);
}

// ── Clean stale build output to free disk space ──────────────────────────────
// Removes .next/cache (webpack cache can grow to hundreds of MB) and the
// previous standalone output so old engine binaries don't accumulate.
const toClean = [
  path.join(root, '.next', 'cache'),
  path.join(root, '.next', 'standalone'),
];
for (const dir of toClean) {
  if (existsSync(dir)) {
    console.log('[build] Cleaning', dir);
    rmSync(dir, { recursive: true, force: true });
  }
}

// ── Shared exec options (inherit env so DATABASE_URL propagates) ─────────────
const opts = { stdio: 'inherit', cwd: root, env: process.env };

const steps = [
  ['prisma generate',       'npx prisma generate'],
  ['prisma migrate deploy', 'npx prisma migrate deploy'],
  ['ensure-seed',           'node scripts/ensure-seed.mjs'],
  ['next build',            'npx next build'],
  ['post-build',            'node scripts/post-build.cjs'],
];

for (const [label, cmd] of steps) {
  console.log(`\n[build] ── ${label} ──`);
  execSync(cmd, opts);
}

console.log('\n[build] ✓ All steps completed successfully.');
