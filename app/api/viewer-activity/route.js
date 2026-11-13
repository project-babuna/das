import { createHash, randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { isSupabaseConfigured, supabaseAdmin } from "@/lib/supabaseAdmin";
import { isViewerPage } from "@/lib/viewerActivity";

export const dynamic = "force-dynamic";

const COOKIE_NAME = "das_viewer";
const ACTIVE_WINDOW_MS = 75_000;
const COOKIE_AGE_SECONDS = 60 * 60 * 6;

function baselineForToday() {
  const day = new Date().toISOString().slice(0, 10);
  const seed = createHash("sha256").update(day).digest().readUInt32BE(0);
  return 100 + (seed % 51);
}

export async function POST(request) {
  const isProduction = process.env.VERCEL_ENV === "production";
  const isLocalDevelopment = process.env.NODE_ENV === "development" &&
    ["localhost", "127.0.0.1"].includes(request.nextUrl.hostname);
  if ((!isProduction && !isLocalDevelopment) || !isSupabaseConfigured()) {
    return NextResponse.json({ error: "Viewer activity is unavailable" }, { status: 503 });
  }

  const allowedHosts = isProduction
    ? ["www.dreamandscale.com", "dreamandscale.com"]
    : ["localhost", "127.0.0.1"];
  if (!allowedHosts.includes(request.nextUrl.hostname)) {
    return NextResponse.json({ error: "Viewer activity is unavailable" }, { status: 403 });
  }

  const origin = request.headers.get("origin");
  const allowedOrigins = isProduction
    ? ["https://www.dreamandscale.com", "https://dreamandscale.com"]
    : ["http://localhost:3000", "http://127.0.0.1:3000"];
  if (origin && !allowedOrigins.includes(origin)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  let pageKey;
  try {
    ({ pageKey } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (!isViewerPage(pageKey)) {
    return NextResponse.json({ error: "Unsupported page" }, { status: 400 });
  }

  const cookieValue = request.cookies.get(COOKIE_NAME)?.value;
  const viewerId = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cookieValue || "")
    ? cookieValue
    : randomUUID();
  const now = new Date();
  const { error: heartbeatError } = await supabaseAdmin.from("active_page_viewers").upsert(
    { page_key: pageKey, viewer_id: viewerId, last_seen_at: now.toISOString() },
    { onConflict: "page_key,viewer_id" },
  );
  if (heartbeatError) {
    console.error("Viewer heartbeat failed", heartbeatError);
    return NextResponse.json({ error: "Viewer activity is unavailable" }, { status: 503 });
  }

  const { count, error: countError } = await supabaseAdmin
    .from("active_page_viewers")
    .select("*", { count: "exact", head: true })
    .eq("page_key", pageKey)
    .gte("last_seen_at", new Date(now.getTime() - ACTIVE_WINDOW_MS).toISOString());
  if (countError) {
    console.error("Viewer count failed", countError);
    return NextResponse.json({ error: "Viewer activity is unavailable" }, { status: 503 });
  }

  // Keep the temporary presence table bounded without adding a separate cron.
  if (Math.random() < 0.005) {
    const { error: cleanupError } = await supabaseAdmin
      .from("active_page_viewers")
      .delete()
      .lt("last_seen_at", new Date(now.getTime() - 86_400_000).toISOString());
    if (cleanupError) console.error("Viewer cleanup failed", cleanupError);
  }

  const activeBrowsers = count ?? 0;
  const simulatedBaseline = baselineForToday();
  const response = NextResponse.json({
    activeBrowsers,
    simulatedBaseline,
    estimatedActivity: simulatedBaseline + activeBrowsers,
  });
  response.headers.set("Cache-Control", "no-store");
  response.cookies.set(COOKIE_NAME, viewerId, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_AGE_SECONDS,
  });
  return response;
}
