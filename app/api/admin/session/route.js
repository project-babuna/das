import { NextResponse } from "next/server";
import { getAdminSession, isAdminConfigured } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const session = getAdminSession(request);
  const response = NextResponse.json({
    authenticated: Boolean(session),
    configured: isAdminConfigured(),
    email: session?.email || null,
  });
  response.headers.set("Cache-Control", "no-store");
  return response;
}
