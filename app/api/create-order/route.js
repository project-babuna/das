import { NextResponse } from "next/server";
import { isIP } from "node:net";
import Razorpay from "razorpay";
import { getProgram } from "@/lib/programs";
import { getClientIp, rateLimit } from "@/lib/rateLimit";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const RATE_LIMIT = {
  limit: 5,
  windowMs: 60 * 1000,
};

function rateLimitError() {
  return NextResponse.json(
    { success: false, message: "Too many requests. Please try again later." },
    { status: 429 }
  );
}

function cleanTrackingUrl(value, allowedOrigin) {
  if (typeof value !== "string" || value.length > 2048) return null;
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol) ||
        (allowedOrigin && url.origin !== allowedOrigin)) return null;
    url.username = "";
    url.password = "";
    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return null;
  }
}

export async function POST(request) {
  try {
    const clientIp = getClientIp(request);
    const rate = rateLimit({
      key: `create-order:${clientIp}`,
      ...RATE_LIMIT,
    });

    if (!rate.allowed) {
      return rateLimitError();
    }

    const body = await request.json();
    const { lead_id } = body;

    if (!lead_id) {
      return NextResponse.json(
        { success: false, message: "lead_id is required." },
        { status: 400 }
      );
    }

    const { data: lead, error: leadError } = await supabaseAdmin
      .from("leads")
      .select("id, interest, payment_status")
      .eq("id", lead_id)
      .single();

    if (leadError || !lead) {
      return NextResponse.json(
        { success: false, message: "Registration not found." },
        { status: 404 }
      );
    }

    if (lead.payment_status === "success") {
      return NextResponse.json(
        { success: false, message: "This registration is already paid." },
        { status: 400 }
      );
    }

    const selectedProgram = getProgram(lead.interest);
    const amount = selectedProgram.amount;
    const currency = selectedProgram.currency;
    const clientUserAgent = request.headers.get("user-agent")?.slice(0, 1000) || null;
    const requestOrigin = new URL(request.url).origin;
    const eventSourceUrl = cleanTrackingUrl(
      body.event_source_url || request.headers.get("referer"),
      requestOrigin
    );
    const referrerUrl = cleanTrackingUrl(body.referrer_url);

    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt: `das_${lead_id.slice(0, 20)}`,
      notes: {
        lead_id,
        program_id: selectedProgram.id,
      },
    });

    const { error } = await supabaseAdmin.from("payments").insert({
      lead_id,
      razorpay_order_id: order.id,
      amount,
      currency,
      program_id: selectedProgram.id,
      expected_amount: amount,
      expected_currency: currency,
      meta_fbp: request.cookies.get("_fbp")?.value?.slice(0, 200) || null,
      meta_fbc: request.cookies.get("_fbc")?.value?.slice(0, 200) || null,
      status: "created",
    });

    if (error) {
      console.error("Payment insert error:", error);
      return NextResponse.json(
        { success: false, message: "Could not save payment order." },
        { status: 500 }
      );
    }

    const { error: metaEnvironmentError } = await supabaseAdmin.from("payments")
      .update({ meta_deployment_environment: process.env.VERCEL_ENV || "development" })
      .eq("razorpay_order_id", order.id);
    if (metaEnvironmentError) {
      console.error("Payment Meta environment was not saved:", metaEnvironmentError);
    }

    const { error: matchContextError } = await supabaseAdmin.from("payments")
      .update({
        meta_client_ip: isIP(clientIp) ? clientIp : null,
        meta_client_user_agent: clientUserAgent,
        meta_event_source_url: eventSourceUrl,
        meta_referrer_url: referrerUrl,
      })
      .eq("razorpay_order_id", order.id);
    if (matchContextError) {
      console.warn("Purchase matching context was not saved:", matchContextError);
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        key_id: process.env.RAZORPAY_KEY_ID,
      },
    });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { success: false, message: "Could not create payment order." },
      { status: 500 }
    );
  }
}
