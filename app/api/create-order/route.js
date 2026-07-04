import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const programOrders = {
  clarity_session: {
    amount: 19900,
    label: "DreamAndScale Clarity Session",
  },
  full_program: {
    amount: 999900,
    label: "DreamAndScale Full Program",
  },
  mentorship: {
    amount: 4999000,
    label: "DreamAndScale Plus",
  },
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { lead_id, program = "clarity_session" } = body;

    if (!lead_id) {
      return NextResponse.json(
        { success: false, message: "lead_id is required." },
        { status: 400 }
      );
    }

    const selectedProgram = programOrders[program];

    if (!selectedProgram) {
      return NextResponse.json(
        { success: false, message: "Invalid program selected." },
        { status: 400 }
      );
    }

    const amount = selectedProgram.amount;

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `das_${lead_id.slice(0, 20)}`,
      notes: {
        lead_id,
        program: selectedProgram.label,
      },
    });

    const { error } = await supabaseAdmin.from("payments").insert({
      lead_id,
      razorpay_order_id: order.id,
      amount,
      currency: "INR",
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
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { success: false, message: "Could not create payment order." },
      { status: 500 }
    );
  }
}
