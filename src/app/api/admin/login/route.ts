import { NextResponse } from "next/server";
import {
  adminSessionCookieValue,
  COOKIE_NAME,
  verifyPassword,
} from "@/lib/admin-auth";
import { checkRateLimit, resetRateLimit } from "@/lib/rate-limit";

/**
 * Returns the real client IP.
 *
 * Priority order:
 *  1. x-real-ip  — set by Nginx/Hostinger from the actual TCP socket; cannot be
 *                   spoofed by the client because the proxy overwrites it.
 *  2. Rightmost x-forwarded-for entry — the IP appended by the nearest trusted
 *     proxy. We deliberately ignore the leftmost entries, which the client can
 *     forge by sending a fake X-Forwarded-For header before the proxy adds its
 *     own. Taking [0] (leftmost) is the classic rate-limit bypass vector.
 */
function getClientIp(request: Request): string {
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const ips = forwarded.split(",").map((s) => s.trim()).filter(Boolean);
    // Rightmost = added by the nearest proxy; leftmost = client-supplied (untrusted)
    return ips[ips.length - 1] ?? "unknown";
  }

  return "unknown";
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed, retryAfterSec } = checkRateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: `Too many attempts. Try again in ${Math.ceil(retryAfterSec / 60)} minutes.` },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfterSec) },
      }
    );
  }

  const body = await request.json().catch(() => ({}));
  const password = typeof body.password === "string" ? body.password : "";

  if (!verifyPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  // Successful login — clear the rate limit counter for this IP
  resetRateLimit(ip);

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, adminSessionCookieValue(), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    // path: "/" so the browser sends this cookie to BOTH /admin/* page routes
    // AND /api/admin/* API routes. Using "/admin" would silently block all
    // admin API calls (create/edit/delete/upload) because "/api/admin" does not
    // start with "/admin" per RFC 6265 path-matching rules.
    path: "/",
    maxAge: 60 * 60 * 8, // 8-hour session
  });
  return response;
}
