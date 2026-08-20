import { jsonError, requirePortfolioAdmin, supabaseServiceFetch } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const auth = await requirePortfolioAdmin(request);
  if (!auth.ok) return jsonError(auth.message, auth.status);

  const requested = Number(new URL(request.url).searchParams.get("limit") ?? 300);
  const limit = Math.max(25, Math.min(1000, Number.isFinite(requested) ? requested : 300));
  const response = await supabaseServiceFetch(
    `/rest/v1/portfolio_visitor_events?select=*&order=occurred_at.desc&limit=${limit}`,
  );
  if (!response.ok) return jsonError("Could not load visitor activity.", 502);
  return Response.json({ ok: true, events: await response.json() });
}
