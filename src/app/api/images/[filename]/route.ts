import { readFileSync } from "fs";
import { join, extname, resolve } from "path";

type Params = { params: Promise<{ filename: string }> };

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

function uploadsDir() {
  return process.env.UPLOADS_DIR ?? join(process.cwd(), "public", "uploads");
}

export async function GET(_req: Request, { params }: Params) {
  const { filename } = await params;

  // Resolve and verify the path stays within the uploads directory
  const dir = resolve(uploadsDir());
  const target = resolve(join(dir, filename));

  if (!target.startsWith(dir + (process.platform === "win32" ? "\\" : "/"))) {
    return new Response("Bad request", { status: 400 });
  }

  const ext = extname(target).toLowerCase();
  if (!Object.keys(MIME).includes(ext)) {
    return new Response("Bad request", { status: 400 });
  }

  try {
    const file = readFileSync(target);
    return new Response(file, {
      headers: {
        "Content-Type": MIME[ext] ?? "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
