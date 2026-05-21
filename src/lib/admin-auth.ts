import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "fg_admin_session";

function sessionToken(): string {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error("ADMIN_PASSWORD is not set");
  return createHmac("sha256", secret).update("fg-admin-v1").digest("hex");
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    const expected = Buffer.from(sessionToken());
    const received = Buffer.from(token);
    if (expected.length !== received.length) return false;
    return timingSafeEqual(expected, received);
  } catch {
    return false;
  }
}

export function verifyPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  try {
    const a = Buffer.from(password);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function adminSessionCookieValue(): string {
  return sessionToken();
}

export { COOKIE_NAME };
