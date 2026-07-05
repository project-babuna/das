import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("order_id");

    if (!orderId) {
      return NextResponse.json(
        { success: false, paid: false, message: "Missing order id." },
        { status: 400 }
      );
    }

    const { data: payment, error } = await supabaseAdmin
      .from("payments")
      .select("razorpay_order_id, status, program_id, expected_amount, expected_currency")
      .eq("razorpay_order_id", orderId)
      .single();

    if (error || !payment) {
      return NextResponse.json(
        { success: false, paid: false, message: "Payment order not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      paid: payment.status === "success",
      payment: {
        razorpay_order_id: payment.razorpay_order_id,
        status: payment.status,
        program_id: payment.program_id,
        expected_amount: payment.expected_amount,
        expected_currency: payment.expected_currency,
      },
    });
  } catch (error) {
    console.error("Payment status API error:", error);
    return NextResponse.json(
      { success: false, paid: false, message: "Could not verify payment status." },
      { status: 500 }
    );
  }
}
