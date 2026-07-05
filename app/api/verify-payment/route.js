import { NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay";
import { safeCompareHex } from "@/lib/security";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

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

    const isValid = safeCompareHex(generatedSignature, razorpay_signature);

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

    const { data: storedPayment, error: fetchError } = await supabaseAdmin
      .from("payments")
      .select("id, lead_id, program_id, expected_amount, expected_currency, status")
      .eq("razorpay_order_id", razorpay_order_id)
      .single();

    if (fetchError || !storedPayment) {
      return NextResponse.json(
        { success: false, message: "Payment order not found." },
        { status: 404 }
      );
    }

    const razorpayPayment = await razorpay.payments.fetch(razorpay_payment_id);
    const isVerifiedPayment =
      razorpayPayment?.order_id === razorpay_order_id &&
      razorpayPayment?.amount === storedPayment.expected_amount &&
      razorpayPayment?.currency === storedPayment.expected_currency &&
      ["captured", "authorized"].includes(razorpayPayment?.status);

    if (!isVerifiedPayment) {
      await supabaseAdmin
        .from("payments")
        .update({
          status: "verification_failed",
          razorpay_payment_id,
          razorpay_signature,
          updated_at: new Date().toISOString(),
        })
        .eq("razorpay_order_id", razorpay_order_id);

      return NextResponse.json(
        { success: false, message: "Payment verification failed." },
        { status: 400 }
      );
    }

    const { data: payment, error: paymentError } = await supabaseAdmin
      .from("payments")
      .update({
        status: "success",
        razorpay_payment_id,
        razorpay_signature,
        amount: razorpayPayment.amount,
        currency: razorpayPayment.currency,
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
      order_id: razorpay_order_id,
    });
  } catch (error) {
    console.error("Verify payment error:", error);
    return NextResponse.json(
      { success: false, message: "Payment verification failed." },
      { status: 500 }
    );
  }
}
