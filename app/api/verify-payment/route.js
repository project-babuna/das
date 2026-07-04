import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request) {
  try {
    const body = await request.json();

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Missing payment verification fields." },
        { status: 400 }
      );
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isValid = generatedSignature === razorpay_signature;

    if (!isValid) {
      await supabaseAdmin
        .from("payments")
        .update({
          status: "signature_failed",
          razorpay_payment_id,
          razorpay_signature,
          updated_at: new Date().toISOString(),
        })
        .eq("razorpay_order_id", razorpay_order_id);

      return NextResponse.json(
        { success: false, message: "Invalid payment signature." },
        { status: 400 }
      );
    }

    const { data: payment, error: paymentError } = await supabaseAdmin
      .from("payments")
      .update({
        status: "success",
        razorpay_payment_id,
        razorpay_signature,
        updated_at: new Date().toISOString(),
      })
      .eq("razorpay_order_id", razorpay_order_id)
      .select()
      .single();

    if (paymentError) {
      console.error("Payment update error:", paymentError);
      return NextResponse.json(
        { success: false, message: "Payment verified but database update failed." },
        { status: 500 }
      );
    }

    if (payment?.lead_id) {
      await supabaseAdmin
        .from("leads")
        .update({
          payment_status: "success",
          status: "paid",
        })
        .eq("id", payment.lead_id);
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully.",
    });
  } catch (error) {
    console.error("Verify payment error:", error);
    return NextResponse.json(
      { success: false, message: "Payment verification failed." },
      { status: 500 }
    );
  }
}
