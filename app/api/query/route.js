import { NextResponse } from "next/server";
import { getClientIp, rateLimit } from "@/lib/rateLimit";
import { isSupabaseConfigured, supabaseAdmin } from "@/lib/supabaseAdmin";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[6-9]\d{9}$/;
const RATE_LIMIT = {
  limit: 20,
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

async function insertQuery(payload) {
  return supabaseAdmin
    .from("queries")
    .insert({
      name: payload.name,
      email: payload.email || null,
      phone: payload.phone || null,
      question: payload.question,
      source_page: payload.source_page || null,
      status: "new",
    })
    .select()
    .single();
}

export async function POST(request) {
  try {
    const clientIp = getClientIp(request);
    const rate = rateLimit({
      key: `query:${clientIp}`,
      ...RATE_LIMIT,
    });

    if (!rate.allowed) {
      return rateLimitError();
    }

    const body = await request.json();

    const name = cleanString(body?.name, 80);
    const email = cleanString(body?.email, 120);
    const phone = cleanPhone(body?.phone);
    const question = cleanString(body?.question || body?.message, 1500);
    const source_page = cleanString(body?.source_page, 300);

    if (!name || !question) {
      return validationError();
    }

    if (!email && !phone) {
      return validationError();
    }

    if (email && !EMAIL_PATTERN.test(email)) {
      return validationError();
    }

    if (phone && !PHONE_PATTERN.test(phone)) {
      return validationError();
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        {
          success: false,
          message: "Contact form is not connected yet. Please configure Supabase.",
        },
        { status: 503 }
      );
    }

    const { data, error } = await insertQuery({
      name,
      email,
      phone,
      question,
      source_page,
    });

    if (error) {
      console.error("Query insert error:", error);
      return NextResponse.json(
        { success: false, message: "Could not save query." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      query: data,
    });
  } catch (error) {
    console.error("Query API error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
