import type { ManagedRecord } from "@/lib/managed-content";
import { jsonError, requirePortfolioAdmin, supabaseServiceFetch } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

const allowedKinds = new Set<ManagedRecord["kind"]>(["project", "site", "section"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export async function GET(request: Request) {
  const auth = await requirePortfolioAdmin(request);
  if (!auth.ok) return jsonError(auth.message, auth.status);

  const response = await supabaseServiceFetch(
    "/rest/v1/portfolio_records?select=*&order=sort_order.asc,updated_at.desc",
  );
  if (!response.ok) return jsonError("Could not load portfolio content.", 502);
  return Response.json({ ok: true, records: await response.json() });
}

export async function POST(request: Request) {
  const auth = await requirePortfolioAdmin(request);
  if (!auth.ok) return jsonError(auth.message, auth.status);

  let body: Partial<ManagedRecord>;
  try {
    body = await request.json() as Partial<ManagedRecord>;
  } catch {
    return jsonError("The content payload is not valid JSON.");
  }

  const key = typeof body.key === "string" ? body.key.trim().slice(0, 160) : "";
  if (!key || !body.kind || !allowedKinds.has(body.kind) || !isRecord(body.data)) {
    return jsonError("A key, valid content type, and content object are required.");
  }

  const record: ManagedRecord = {
    key,
    kind: body.kind,
    data: body.data,
    sort_order: Number.isFinite(body.sort_order) ? Number(body.sort_order) : 0,
    is_visible: body.is_visible !== false,
  };
  const response = await supabaseServiceFetch(
    "/rest/v1/portfolio_records?on_conflict=key",
    {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify({ ...record, updated_at: new Date().toISOString() }),
    },
  );
  if (!response.ok) return jsonError("The content could not be saved.", 502);
  const saved = await response.json() as ManagedRecord[];
  return Response.json({ ok: true, record: saved[0] ?? record });
}

export async function DELETE(request: Request) {
  const auth = await requirePortfolioAdmin(request);
  if (!auth.ok) return jsonError(auth.message, auth.status);

  const key = new URL(request.url).searchParams.get("key")?.trim();
  if (!key) return jsonError("A content key is required.");
  const response = await supabaseServiceFetch(
    `/rest/v1/portfolio_records?key=eq.${encodeURIComponent(key)}`,
    { method: "DELETE", headers: { Prefer: "return=minimal" } },
  );
  if (!response.ok) return jsonError("The content could not be deleted.", 502);
  return Response.json({ ok: true });
}
