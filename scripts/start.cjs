const path = require('path');
const root = path.join(__dirname, '..');

process.on('uncaughtException', (err) => {
  console.error('[start] UNCAUGHT EXCEPTION:', err.message);
  console.error(err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('[start] UNHANDLED REJECTION:', reason);
  if (reason && reason.stack) console.error(reason.stack);
  process.exit(1);
});

// Resolve DATABASE_URL to absolute path so it works regardless of CWD
if (!process.env.DATABASE_URL || process.env.DATABASE_URL.startsWith('file:./')) {
  process.env.DATABASE_URL = 'file:' + path.join(root, 'prisma', 'production.db');
}

process.env.PORT     = process.env.PORT     || '3000';
process.env.HOSTNAME = process.env.HOSTNAME || '0.0.0.0';

console.log('[start] root:', root);
console.log('[start] DATABASE_URL:', process.env.DATABASE_URL);
console.log('[start] PORT:', process.env.PORT);
console.log('[start] HOSTNAME:', process.env.HOSTNAME);
console.log('[start] NODE_VERSION:', process.version);

const serverPath = path.join(root, '.next', 'standalone', 'server.js');
console.log('[start] loading server from:', serverPath);

const fs = require('fs');
if (!fs.existsSync(serverPath)) {
  console.error('[start] ERROR: server.js not found at', serverPath);
  console.error('[start] Contents of .next/standalone (if exists):');
  const standaloneDir = path.join(root, '.next', 'standalone');
  if (fs.existsSync(standaloneDir)) {
    console.error(fs.readdirSync(standaloneDir).join(', '));
  } else {
    console.error('  (directory does not exist)');
  }
  process.exit(1);
}

try {
  require(serverPath);
} catch (err) {
  console.error('[start] FAILED TO LOAD SERVER:', err.message);
  console.error(err.stack);
  process.exit(1);
}
