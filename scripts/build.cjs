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
const { execSync } = require('child_process');
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

// ── Shared exec options (inherit env so DATABASE_URL propagates) ─────────────
const opts = { stdio: 'inherit', cwd: root, env: process.env };

const steps = [
  ['prisma generate',             'npx prisma generate'],
  ['prisma migrate deploy',       'npx prisma migrate deploy'],
  ['ensure-seed',                 'node scripts/ensure-seed.mjs'],
  ['next build',                  'npx next build'],
  ['post-build',                  'node scripts/post-build.cjs'],
];

for (const [label, cmd] of steps) {
  console.log(`\n[build] ── ${label} ──`);
  execSync(cmd, opts);
}

console.log('\n[build] ✓ All steps completed successfully.');
