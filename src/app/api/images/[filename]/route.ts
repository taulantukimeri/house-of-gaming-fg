import { readFileSync } from "fs";
import { join, extname } from "path";

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

  if (filename.includes("..") || filename.includes("/")) {
    return new Response("Bad request", { status: 400 });
  }

  try {
    const file = readFileSync(join(uploadsDir(), filename));
    const mime = MIME[extname(filename).toLowerCase()] ?? "application/octet-stream";
    return new Response(file, {
      headers: {
        "Content-Type": mime,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
