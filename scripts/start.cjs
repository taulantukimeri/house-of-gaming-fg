const path = require('path');
const root = path.join(__dirname, '..');

// Resolve DATABASE_URL to absolute path so it works regardless of CWD
if (!process.env.DATABASE_URL || process.env.DATABASE_URL.startsWith('file:./')) {
  process.env.DATABASE_URL = 'file:' + path.join(root, 'prisma', 'production.db');
}

process.env.PORT     = process.env.PORT     || '3000';
process.env.HOSTNAME = process.env.HOSTNAME || '0.0.0.0';

console.log('[start] DATABASE_URL:', process.env.DATABASE_URL);
console.log('[start] PORT:', process.env.PORT);

require(path.join(root, '.next', 'standalone', 'server.js'));
