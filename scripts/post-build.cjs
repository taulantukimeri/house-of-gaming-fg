const { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync, renameSync } = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

if (!existsSync(path.join(root, '.next/standalone'))) {
  console.error('[post-build] ERROR: .next/standalone does not exist — build may have failed');
  process.exit(1);
}

// Copy static assets into standalone output (needed when using output:'standalone')
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

// Also copy @prisma/client into standalone in case Next.js didn't include it
const prismaClientDir = path.join(root, 'node_modules/@prisma/client');
if (existsSync(prismaClientDir)) {
  const dest = path.join(root, '.next/standalone/node_modules/@prisma');
  mkdirSync(dest, { recursive: true });
  cpSync(prismaClientDir, path.join(dest, 'client'), { recursive: true });
  console.log('[post-build] Copied @prisma/client to standalone');
}

// Wrap standalone/server.js with error handling so crashes are always logged
// regardless of whether Hostinger calls start.cjs or server.js directly
const standaloneServerPath = path.join(root, '.next/standalone/server.js');
const standaloneServerOrigPath = path.join(root, '.next/standalone/server-next.js');

if (existsSync(standaloneServerPath)) {
  renameSync(standaloneServerPath, standaloneServerOrigPath);

  const wrapper = `
'use strict';
const path = require('path');

process.on('uncaughtException', function(err) {
  process.stderr.write('[server] UNCAUGHT EXCEPTION: ' + err.message + '\\n');
  process.stderr.write(err.stack + '\\n');
  process.exit(1);
});

process.on('unhandledRejection', function(reason) {
  process.stderr.write('[server] UNHANDLED REJECTION: ' + String(reason) + '\\n');
  if (reason && reason.stack) process.stderr.write(reason.stack + '\\n');
  process.exit(1);
});

// Fix DATABASE_URL to absolute path if not already absolute
if (!process.env.DATABASE_URL || process.env.DATABASE_URL === 'file:./prisma/production.db') {
  var dbPath = path.resolve(__dirname, '..', '..', 'prisma', 'production.db');
  process.env.DATABASE_URL = 'file:' + dbPath;
}

process.stdout.write('[server] DATABASE_URL: ' + process.env.DATABASE_URL + '\\n');
process.stdout.write('[server] PORT: ' + (process.env.PORT || '3000') + '\\n');
process.stdout.write('[server] NODE_VERSION: ' + process.version + '\\n');
process.stdout.write('[server] CWD: ' + process.cwd() + '\\n');
process.stdout.write('[server] __dirname: ' + __dirname + '\\n');

try {
  require('./server-next.js');
} catch(err) {
  process.stderr.write('[server] FAILED TO START: ' + err.message + '\\n');
  process.stderr.write(err.stack + '\\n');
  process.exit(1);
}
`.trim();

  writeFileSync(standaloneServerPath, wrapper);
  console.log('[post-build] Wrapped standalone/server.js with error handling');
}
