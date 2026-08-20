import { getSupabaseConfig, supabaseServiceFetch } from "@/lib/supabase-server";
import { notifyPortfolioVisit } from "@/lib/visitor-notifications";

export const dynamic = "force-dynamic";

const allowedEvents = new Set([
  "page_view",
  "open_case",
  "open_live_product",
  "play_project_video",
  "download_project_video",
  "download_cv",
  "contact_submit",
]);

const short = (value: unknown, max = 240) => typeof value === "string" ? value.trim().slice(0, max) || null : null;
const integer = (value: unknown, max = 10000) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.max(0, Math.min(max, Math.round(parsed))) : null;
};

export async function POST(request: Request) {
  if (!getSupabaseConfig()) return Response.json({ ok: true, stored: false });

  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const eventName = short(body.eventName, 48);
  if (!eventName || !allowedEvents.has(eventName)) return Response.json({ ok: false }, { status: 400 });

  const record = {
    occurred_at: new Date().toISOString(),
    session_id: short(body.sessionId, 80),
    visitor_id: short(body.visitorId, 80),
    event_name: eventName,
    path: short(body.path, 300),
    project_id: short(body.projectId, 100),
    referrer: short(body.referrer, 300),
    language: short(body.language, 24),
    timezone: short(body.timezone, 80),
    viewport_width: integer(body.viewportWidth),
    viewport_height: integer(body.viewportHeight),
    device_type: short(body.deviceType, 32),
    browser: short(body.browser, 48),
    operating_system: short(body.operatingSystem, 48),
    utm_source: short(body.utmSource, 120),
    utm_medium: short(body.utmMedium, 120),
    utm_campaign: short(body.utmCampaign, 160),
  };

  try {
    const response = await supabaseServiceFetch("/rest/v1/portfolio_visitor_events", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify(record),
    });
    if (response.ok) void notifyPortfolioVisit(record);
    return Response.json({ ok: true, stored: response.ok });
  } catch {
    return Response.json({ ok: true, stored: false });
  }
}
