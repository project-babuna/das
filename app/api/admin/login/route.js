import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_SECONDS,
  createAdminSession,
  isAdminConfigured,
  validateAdminCredentials,
} from "@/lib/adminAuth";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const clientIp = getClientIp(request);
  const rate = rateLimit({ key: `admin-login:${clientIp}`, limit: 5, windowMs: 15 * 60 * 1000 });

  if (!rate.allowed) {
    return NextResponse.json(
      { success: false, message: "Too many login attempts. Please try again later." },
      { status: 429 }
    );
  }

  if (!isAdminConfigured()) {
    return NextResponse.json(
      { success: false, message: "Admin login has not been configured." },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
  }

  if (!validateAdminCredentials(body?.email, body?.password)) {
    return NextResponse.json(
      { success: false, message: "Email or password is incorrect." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE_NAME, createAdminSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: ADMIN_SESSION_SECONDS,
  });
  response.headers.set("Cache-Control", "no-store");
  return response;
}
