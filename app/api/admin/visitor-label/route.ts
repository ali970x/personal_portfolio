import { jsonError, requirePortfolioAdmin, supabaseServiceFetch } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request) {
  const auth = await requirePortfolioAdmin(request);
  if (!auth.ok) return jsonError(auth.message, auth.status);

  const body = await request.json().catch(() => null) as { visitorId?: unknown; label?: unknown } | null;
  const visitorId = typeof body?.visitorId === "string" ? body.visitorId.trim().slice(0, 80) : "";
  const label = typeof body?.label === "string" ? body.label.trim().slice(0, 80) : "";
  if (!visitorId) return jsonError("A visitor identifier is required.");

  const response = label
    ? await supabaseServiceFetch("/rest/v1/portfolio_visitor_labels?on_conflict=visitor_id", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify({ visitor_id: visitorId, label, updated_at: new Date().toISOString() }),
    })
    : await supabaseServiceFetch(`/rest/v1/portfolio_visitor_labels?visitor_id=eq.${encodeURIComponent(visitorId)}`, { method: "DELETE" });

  if (!response.ok) return jsonError("Could not save the device name. Run the latest Supabase SQL migration first.", 502);
  return Response.json({ ok: true, visitorId, label });
}
