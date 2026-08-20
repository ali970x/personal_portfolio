import { getSupabaseConfig } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export async function GET() {
  const config = getSupabaseConfig();
  return Response.json({
    configured: Boolean(config),
    supabaseUrl: config?.url ?? "",
    anonKey: config?.anonKey ?? "",
    adminEmail: config?.adminEmail ?? process.env.ADMIN_EMAIL ?? "alimjdandash@gmail.com",
  });
}
