type SupabaseBrowserConfig = {
  url: string;
  anonKey: string;
  adminEmail: string;
};

function environmentValue(name: string) {
  const viteEnvironment = import.meta.env as Record<string, string | undefined>;
  const nodeEnvironment = typeof process === "undefined"
    ? undefined
    : process.env?.[name];
  return viteEnvironment[name] ?? nodeEnvironment;
}

export function getSupabaseBrowserConfig(): SupabaseBrowserConfig | null {
  const url = environmentValue("VITE_SUPABASE_URL")
    ?? environmentValue("NEXT_PUBLIC_SUPABASE_URL");
  const anonKey = environmentValue("VITE_SUPABASE_ANON_KEY")
    ?? environmentValue("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  const adminEmail = environmentValue("VITE_PORTFOLIO_ADMIN_EMAIL")
    ?? environmentValue("NEXT_PUBLIC_PORTFOLIO_ADMIN_EMAIL")
    ?? "alimjdandash@gmail.com";

  if (!url || !anonKey) return null;
  return { url: url.replace(/\/$/, ""), anonKey, adminEmail };
}

export async function supabaseBrowserFetch(
  path: string,
  init: RequestInit = {},
  accessToken?: string,
) {
  const config = getSupabaseBrowserConfig();
  if (!config) throw new Error("Supabase is not configured yet.");

  const headers = new Headers(init.headers);
  headers.set("apikey", config.anonKey);
  headers.set("Authorization", `Bearer ${accessToken ?? config.anonKey}`);
  if (init.body && !(init.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(`${config.url}${path}`, { ...init, headers });
}

export async function signInWithSupabase(email: string, password: string) {
  const config = getSupabaseBrowserConfig();
  if (!config) throw new Error("Supabase is not configured yet.");

  const response = await fetch(`${config.url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: config.anonKey, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const payload = await response.json() as { access_token?: string; error_description?: string };
  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error_description ?? "Sign in failed.");
  }
  return payload.access_token;
}

function safeFileName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "media";
}

export async function uploadPortfolioMedia(file: File, accessToken: string) {
  const path = `uploads/${Date.now()}-${safeFileName(file.name)}`;
  const response = await supabaseBrowserFetch(
    `/storage/v1/object/portfolio-media/${path.split("/").map(encodeURIComponent).join("/")}`,
    { method: "POST", headers: { "Content-Type": file.type, "x-upsert": "true" }, body: file },
    accessToken,
  );
  if (!response.ok) throw new Error("Upload failed. Check the storage policy and file size.");
  const config = getSupabaseBrowserConfig();
  return `${config!.url}/storage/v1/object/public/portfolio-media/${path.split("/").map(encodeURIComponent).join("/")}`;
}
