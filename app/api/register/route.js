import { NextResponse } from "next/server";
import { getProgram, hasProgram } from "@/lib/programs";
import { getClientIp, rateLimit } from "@/lib/rateLimit";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[6-9]\d{9}$/;
const RATE_LIMIT = {
  limit: 5,
  windowMs: 60 * 1000,
};

function cleanString(value, maxLength) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function cleanPhone(value) {
  return cleanString(value, 20).replace(/\D/g, "").slice(0, 10);
}

function validationError() {
  return NextResponse.json(
    { success: false, message: "Please check your details and try again." },
    { status: 400 }
  );
}

function rateLimitError() {
  return NextResponse.json(
    { success: false, message: "Too many requests. Please try again later." },
    { status: 429 }
  );
}

export async function POST(request) {
  try {
    const clientIp = getClientIp(request);
    const rate = rateLimit({
      key: `register:${clientIp}`,
      ...RATE_LIMIT,
    });

    if (!rate.allowed) {
      return rateLimitError();
    }

    const body = await request.json();

    if (body?.website) {
      return NextResponse.json({ success: true });
    }

    const name = cleanString(body?.name, 80);
    const email = cleanString(body?.email, 120);
    const phone = cleanPhone(body?.phone);
    const role = cleanString(body?.role, 80);
    const message = cleanString(body?.message, 1000);
    const source_page = cleanString(body?.source_page, 300);
    const rawInterest = cleanString(body?.interest, 50);
    const interest = getProgram(hasProgram(rawInterest) ? rawInterest : "clarity_session").id;
    const utm_source = cleanString(body?.utm_source, 120);
    const utm_medium = cleanString(body?.utm_medium, 120);
    const utm_campaign = cleanString(body?.utm_campaign, 120);

    if (!name || !PHONE_PATTERN.test(phone)) {
      return validationError();
    }

    if (email && !EMAIL_PATTERN.test(email)) {
      return validationError();
    }

    const { data, error } = await supabaseAdmin
      .from("leads")
      .insert({
        name,
        email,
        phone,
        role,
        interest,
        message,
        source_page,
        utm_source,
        utm_medium,
        utm_campaign,
        status: "registered",
        payment_status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase lead insert error:", error);
      return NextResponse.json(
        { success: false, message: "Could not save registration." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      lead: data,
    });
  } catch (error) {
    console.error("Register API error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
