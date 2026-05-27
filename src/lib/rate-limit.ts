const attempts = new Map<string, { count: number; resetAt: number }>();

const DEFAULT_MAX = 10;
const WINDOW_MS  = 15 * 60 * 1000; // 15 minutes
const BLOCK_MS   = 30 * 60 * 1000; // 30-minute lockout after exceeding limit

export function checkRateLimit(
  key: string,
  options?: { max?: number }
): { allowed: boolean; retryAfterSec: number } {
  const max = options?.max ?? DEFAULT_MAX;
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSec: 0 };
  }

  if (entry.count >= max) {
    // Extend lockout window on continued hammering
    if (entry.resetAt - now < WINDOW_MS) {
      entry.resetAt = now + BLOCK_MS;
    }
    const retryAfterSec = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfterSec };
  }

  entry.count += 1;
  return { allowed: true, retryAfterSec: 0 };
}

export function resetRateLimit(key: string) {
  attempts.delete(key);
}
