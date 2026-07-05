import { NextResponse } from "next/server";
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
      status: "created",
    });

    if (error) {
      console.error("Payment insert error:", error);
      return NextResponse.json(
        { success: false, message: "Could not save payment order." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
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
