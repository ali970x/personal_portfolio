export type PortfolioEvent =
  | "page_view"
  | "open_case"
  | "open_live_product"
  | "play_project_video"
  | "download_project_video"
  | "download_cv"
  | "contact_submit";

function browserName(userAgent: string) {
  if (/Edg\//.test(userAgent)) return "Edge";
  if (/OPR\//.test(userAgent)) return "Opera";
  if (/Firefox\//.test(userAgent)) return "Firefox";
  if (/Chrome\//.test(userAgent)) return "Chrome";
  if (/Safari\//.test(userAgent)) return "Safari";
  return "Other";
}

function operatingSystem(userAgent: string) {
  if (/Windows/.test(userAgent)) return "Windows";
  if (/Android/.test(userAgent)) return "Android";
  if (/iPhone|iPad|iPod/.test(userAgent)) return "iOS";
  if (/Mac OS X/.test(userAgent)) return "macOS";
  if (/Linux/.test(userAgent)) return "Linux";
  return "Other";
}

function anonymousSessionId() {
  const key = "portfolio-anonymous-session";
  try {
    const saved = sessionStorage.getItem(key);
    if (saved) return saved;
    const generated = crypto.randomUUID();
    sessionStorage.setItem(key, generated);
    return generated;
  } catch {
    return crypto.randomUUID();
  }
}

function safeReferrer() {
  if (!document.referrer) return null;
  try {
    const value = new URL(document.referrer);
    return `${value.origin}${value.pathname}`.slice(0, 300);
  } catch {
    return null;
  }
}

export function trackPortfolioEvent(eventName: PortfolioEvent, projectId?: string) {
  if (typeof window === "undefined") return;
  const globalPrivacyControl = (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl;
  if (navigator.doNotTrack === "1" || globalPrivacyControl) return;

  const params = new URLSearchParams(window.location.search);
  const userAgent = navigator.userAgent;
  const payload = {
    eventName,
    projectId: projectId ?? null,
    sessionId: anonymousSessionId(),
    path: `${window.location.pathname}${window.location.hash}`,
    referrer: safeReferrer(),
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    deviceType: window.matchMedia("(pointer: coarse)").matches ? "touch" : "desktop",
    browser: browserName(userAgent),
    operatingSystem: operatingSystem(userAgent),
    utmSource: params.get("utm_source"),
    utmMedium: params.get("utm_medium"),
    utmCampaign: params.get("utm_campaign"),
  };

  if (!getSupabaseBrowserConfig()) return;
  void supabaseBrowserFetch("/rest/v1/portfolio_visitor_events", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      occurred_at: new Date().toISOString(),
      session_id: payload.sessionId,
      event_name: payload.eventName,
      path: payload.path,
      project_id: payload.projectId,
      referrer: payload.referrer,
      language: payload.language,
      timezone: payload.timezone,
      viewport_width: payload.viewportWidth,
      viewport_height: payload.viewportHeight,
      device_type: payload.deviceType,
      browser: payload.browser,
      operating_system: payload.operatingSystem,
      utm_source: payload.utmSource,
      utm_medium: payload.utmMedium,
      utm_campaign: payload.utmCampaign,
    }),
    keepalive: true,
  }).catch(() => undefined);
}
import { getSupabaseBrowserConfig, supabaseBrowserFetch } from "@/lib/supabase-browser";
