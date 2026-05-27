import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mapProduct } from "@/lib/products";
import { checkRateLimit } from "@/lib/rate-limit";

function getClientIp(request: Request): string {
  // x-real-ip is set by Nginx from the actual TCP socket — cannot be spoofed
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  // Take the rightmost (proxy-appended) entry, not the leftmost (client-supplied)
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const ips = forwarded.split(",").map((s) => s.trim()).filter(Boolean);
    return ips[ips.length - 1] ?? "unknown";
  }
  return "unknown";
}

export async function GET(request: Request) {
  // Rate-limit public search: 60 requests per 15-minute window per IP
  const ip = `search:${getClientIp(request)}`;
  const { allowed, retryAfterSec } = checkRateLimit(ip, { max: 60 });
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(retryAfterSec) } }
    );
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";

  if (q.length < 2) return NextResponse.json([]);

  // Cap query length to prevent excessively large DB patterns
  const safeQ = q.slice(0, 100);

  const rows = await prisma.product.findMany({
    where: {
      OR: [
        { fullName: { contains: safeQ } },
        { brand: { contains: safeQ } },
        { name: { contains: safeQ } },
        { catLabel: { contains: safeQ } },
      ],
    },
    take: 8,
    orderBy: { fullName: "asc" },
  });

  return NextResponse.json(rows.map(mapProduct));
}
