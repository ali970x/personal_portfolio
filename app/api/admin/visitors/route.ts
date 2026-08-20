import { jsonError, requirePortfolioAdmin, supabaseServiceFetch } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const auth = await requirePortfolioAdmin(request);
  if (!auth.ok) return jsonError(auth.message, auth.status);

  const requested = Number(new URL(request.url).searchParams.get("limit") ?? 300);
  const limit = Math.max(25, Math.min(1000, Number.isFinite(requested) ? requested : 300));
  const [eventsResponse, labelsResponse] = await Promise.all([
    supabaseServiceFetch(`/rest/v1/portfolio_visitor_events?select=*&order=occurred_at.desc&limit=${limit}`),
    supabaseServiceFetch("/rest/v1/portfolio_visitor_labels?select=visitor_id,label"),
  ]);
  if (!eventsResponse.ok) return jsonError("Could not load visitor activity.", 502);

  const events = await eventsResponse.json();
  const labels = labelsResponse.ok
    ? Object.fromEntries((await labelsResponse.json() as { visitor_id: string; label: string }[]).map((item) => [item.visitor_id, item.label]))
    : {};
  return Response.json({ ok: true, events, labels });
}

export async function DELETE(request: Request) {
  const auth = await requirePortfolioAdmin(request);
  if (!auth.ok) return jsonError(auth.message, auth.status);

  const response = await supabaseServiceFetch("/rest/v1/portfolio_visitor_events?id=gt.0", { method: "DELETE" });
  if (!response.ok) return jsonError("Could not clear visitor activity.", 502);
  return Response.json({ ok: true });
}
