import { jsonError, requirePortfolioAdmin } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 50 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm",
]);

function safeFilename(name: string) {
  const extension = name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
  const stem = name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "media";
  return `${stem}-${crypto.randomUUID()}.${extension}`;
}

export async function POST(request: Request) {
  const auth = await requirePortfolioAdmin(request);
  if (!auth.ok) return jsonError(auth.message, auth.status);

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return jsonError("Choose an image or video to upload.");
  if (!ALLOWED_TYPES.has(file.type)) return jsonError("Use a JPG, PNG, WebP, GIF, MP4, or WebM file.");
  if (file.size > MAX_FILE_SIZE) return jsonError("The file must be 50 MB or smaller.");

  const filename = safeFilename(file.name);
  const path = `uploads/${new Date().toISOString().slice(0, 10)}/${filename}`;
  const upload = await fetch(`${auth.config.url}/storage/v1/object/portfolio-media/${path}`, {
    method: "POST",
    headers: {
      apikey: auth.config.serviceKey,
      Authorization: `Bearer ${auth.config.serviceKey}`,
      "Content-Type": file.type,
      "x-upsert": "false",
    },
    body: file,
  });
  if (!upload.ok) return jsonError("The media file could not be uploaded.", 502);

  return Response.json({
    ok: true,
    url: `${auth.config.url}/storage/v1/object/public/portfolio-media/${path}`,
    name: file.name,
    type: file.type,
    size: file.size,
  });
}
