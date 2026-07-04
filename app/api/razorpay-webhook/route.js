import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request) {
  try {
    const rawBody = await request.text();

    const razorpaySignature = request.headers.get("x-razorpay-signature");

    if (!razorpaySignature) {
      return NextResponse.json(
        { success: false, message: "Missing Razorpay signature." },
        { status: 400 }
      );
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json(
        { success: false, message: "Invalid webhook signature." },
        { status: 400 }
      );
    }

    const event = JSON.parse(rawBody);

    const eventType = event.event;

    const paymentEntity = event.payload?.payment?.entity;
    const orderEntity = event.payload?.order?.entity;

    const razorpayPaymentId = paymentEntity?.id;
    const razorpayOrderId = paymentEntity?.order_id || orderEntity?.id || null;

    if (!razorpayOrderId) {
      return NextResponse.json({
        success: true,
        message: "Webhook received, but no order id found.",
      });
    }

    if (eventType === "payment.captured" || eventType === "order.paid") {
      const { data: payment } = await supabaseAdmin
        .from("payments")
        .update({
          status: "success",
          razorpay_payment_id: razorpayPaymentId,
          updated_at: new Date().toISOString(),
        })
        .eq("razorpay_order_id", razorpayOrderId)
        .select()
        .single();

      if (payment?.lead_id) {
        await supabaseAdmin
          .from("leads")
          .update({
            status: "paid",
            payment_status: "success",
          })
          .eq("id", payment.lead_id);
      }
    }

    if (eventType === "payment.failed") {
      await supabaseAdmin
        .from("payments")
        .update({
          status: "failed",
          razorpay_payment_id: razorpayPaymentId,
          error_code: paymentEntity?.error_code || null,
          error_description: paymentEntity?.error_description || null,
          updated_at: new Date().toISOString(),
        })
        .eq("razorpay_order_id", razorpayOrderId);
    }

    return NextResponse.json({
      success: true,
      message: "Webhook processed.",
    });
  } catch (error) {
    console.error("Razorpay webhook error:", error);

    return NextResponse.json(
      { success: false, message: "Webhook processing failed." },
      { status: 500 }
    );
  }
}
