import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join, extname, resolve } from "path";
import { isAdminAuthenticated } from "@/lib/admin-auth";

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_EXTS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp", "image/gif"];

function uploadsDir() {
  return process.env.UPLOADS_DIR ?? join(process.cwd(), "public", "uploads");
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check Content-Length header first to reject oversized uploads early
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_SIZE_BYTES * 2) {
    return NextResponse.json({ error: "File too large (max 5 MB)" }, { status: 413 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file || file.size === 0) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "File too large (max 5 MB)" }, { status: 413 });
  }

  // Validate by MIME type reported by the browser
  if (!ALLOWED_MIME.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  // Validate by extension
  const ext = extname(file.name).toLowerCase();
  if (!ALLOWED_EXTS.includes(ext)) {
    return NextResponse.json({ error: "Invalid file extension" }, { status: 400 });
  }

  const dir = uploadsDir();
  await mkdir(dir, { recursive: true });

  // Generate a random filename — never use the original filename from the client
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;

  // Resolve and verify the final path stays inside the uploads directory
  const targetPath = resolve(join(dir, filename));
  if (!targetPath.startsWith(resolve(dir))) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // Basic magic-byte check to verify actual image content
  const magic = buffer.subarray(0, 4);
  const isJpeg = magic[0] === 0xFF && magic[1] === 0xD8;
  const isPng  = magic[0] === 0x89 && magic[1] === 0x50 && magic[2] === 0x4E && magic[3] === 0x47;
  const isWebp = buffer.subarray(0, 12).toString("ascii").includes("WEBP");
  const isGif  = magic[0] === 0x47 && magic[1] === 0x49 && magic[2] === 0x46;
  if (!isJpeg && !isPng && !isWebp && !isGif) {
    return NextResponse.json({ error: "File content does not match image type" }, { status: 400 });
  }

  await writeFile(targetPath, buffer);

  return NextResponse.json({ url: `/api/images/${filename}` });
}
