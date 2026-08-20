type VisitorNotification = {
  event_name: string | null;
  visitor_id: string | null;
  session_id: string | null;
  path: string | null;
  referrer: string | null;
  language: string | null;
  timezone: string | null;
  viewport_width: number | null;
  viewport_height: number | null;
  device_type: string | null;
  browser: string | null;
  operating_system: string | null;
};

declare global {
  var portfolioNotifiedSessions: Set<string> | undefined;
}

function messageFor(event: VisitorNotification) {
  return [
    "New portfolio visit",
    `Page: ${event.path ?? "/"}`,
    `Device: ${event.device_type ?? "unknown"} · ${event.operating_system ?? "unknown"} · ${event.browser ?? "unknown"}`,
    `Language: ${event.language ?? "unknown"} · ${event.viewport_width ?? "?"}x${event.viewport_height ?? "?"}`,
    `Referrer: ${event.referrer ?? "direct"}`,
    `Timezone: ${event.timezone ?? "unknown"}`,
  ].join("\n");
}

async function sendTelegram(message: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: message, disable_web_page_preview: true }),
  });
}

async function sendEmail(message: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.VISITOR_NOTIFICATION_EMAIL;
  const from = process.env.VISITOR_NOTIFICATION_FROM;
  if (!apiKey || !to || !from) return;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject: "New portfolio visit", text: message }),
  });
}

async function sendWhatsApp(message: string) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const to = process.env.WHATSAPP_NOTIFICATION_TO;
  const template = process.env.WHATSAPP_TEMPLATE_NAME;
  if (!token || !phoneNumberId || !to || !template) return;
  await fetch(`https://graph.facebook.com/v22.0/${phoneNumberId}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "template",
      template: {
        name: template,
        language: { code: process.env.WHATSAPP_TEMPLATE_LANGUAGE ?? "en_US" },
        components: [{ type: "body", parameters: [{ type: "text", text: message.slice(0, 1000) }] }],
      },
    }),
  });
}

export async function notifyPortfolioVisit(event: VisitorNotification) {
  if (event.event_name !== "page_view") return;
  const visitorSession = event.session_id || event.visitor_id;
  if (!visitorSession) return;
  const notified = globalThis.portfolioNotifiedSessions ?? new Set<string>();
  globalThis.portfolioNotifiedSessions = notified;
  if (notified.has(visitorSession)) return;
  notified.add(visitorSession);

  const message = messageFor(event);
  await Promise.allSettled([sendTelegram(message), sendEmail(message), sendWhatsApp(message)]);
}
