type SupabaseConfig = {
  url: string;
  anonKey: string;
  serviceKey: string;
  adminEmail: string;
};

export function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const anonKey = process.env.SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const adminEmail = process.env.ADMIN_EMAIL ?? "alimjdandash@gmail.com";
  if (!url || !anonKey || !serviceKey) return null;
  return { url, anonKey, serviceKey, adminEmail };
}

export async function supabaseServiceFetch(path: string, init: RequestInit = {}) {
  const config = getSupabaseConfig();
  if (!config) throw new Error("Portfolio administration is not configured.");

  const headers = new Headers(init.headers);
  headers.set("apikey", config.serviceKey);
  headers.set("Authorization", `Bearer ${config.serviceKey}`);
  if (init.body && !(init.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(`${config.url}${path}`, { ...init, headers, cache: "no-store" });
}

export async function requirePortfolioAdmin(request: Request) {
  const config = getSupabaseConfig();
  if (!config) return { ok: false as const, status: 503, message: "Administration is not configured." };

  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return { ok: false as const, status: 401, message: "Sign in is required." };
  }

  const response = await fetch(`${config.url}/auth/v1/user`, {
    headers: {
      apikey: config.anonKey,
      Authorization: authorization,
    },
    cache: "no-store",
  });
  if (!response.ok) return { ok: false as const, status: 401, message: "Your session is no longer valid." };

  const user = await response.json() as { id?: string; email?: string };
  if (!user.email || user.email.toLowerCase() !== config.adminEmail.toLowerCase()) {
    return { ok: false as const, status: 403, message: "This account is not allowed to manage the portfolio." };
  }

  return { ok: true as const, user: { id: user.id ?? "", email: user.email }, config };
}

export function jsonError(message: string, status = 400) {
  return Response.json({ ok: false, error: message }, { status });
}
