import { getSupabaseConfig, supabaseServiceFetch } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!getSupabaseConfig()) {
    return Response.json({ configured: false, records: [] }, {
      headers: { "Cache-Control": "no-store" },
    });
  }

  try {
    const response = await supabaseServiceFetch(
      "/rest/v1/portfolio_records?select=*&is_visible=eq.true&order=sort_order.asc",
    );
    if (!response.ok) throw new Error("Content service unavailable");
    return Response.json({ configured: true, records: await response.json() }, {
      headers: { "Cache-Control": "public, max-age=30, stale-while-revalidate=300" },
    });
  } catch {
    return Response.json({ configured: true, records: [] }, { status: 200 });
  }
}
