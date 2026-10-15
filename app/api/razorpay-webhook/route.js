import { NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay";
import {
  safelyRunEmail,
  sendPaymentSuccessEmail,
} from "@/lib/email";
import { safeCompareHex } from "@/lib/security";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { safelyRunWhatsApp, sendPaymentSuccessWhatsApp } from "@/lib/whatsapp";
import { recordClarityPurchase } from "@/lib/metaConversions";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

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

    if (!safeCompareHex(expectedSignature, razorpaySignature)) {
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
      const { data: payment, error: paymentLookupError } = await supabaseAdmin
        .from("payments")
        .select("id, lead_id, program_id, razorpay_order_id, expected_amount, expected_currency, status")
        .eq("razorpay_order_id", razorpayOrderId)
        .single();
      if (paymentLookupError) throw paymentLookupError;

      // A signed webhook authenticates the sender; the fetch confirms the current captured state.
      const capturedPayment = razorpayPaymentId
        ? await razorpay.payments.fetch(razorpayPaymentId)
        : null;
      const paidOrder = !capturedPayment
        ? await razorpay.orders.fetch(razorpayOrderId)
        : null;
      const paidAmount = capturedPayment?.amount ?? paidOrder?.amount_paid;
      const paidCurrency = capturedPayment?.currency ?? paidOrder?.currency;
      const eventOrderId = capturedPayment?.order_id ?? paidOrder?.id;
      const isVerifiedEvent =
        payment &&
        (capturedPayment?.status === "captured" || paidOrder?.status === "paid") &&
        eventOrderId === payment.razorpay_order_id &&
        paidAmount === payment.expected_amount &&
        paidCurrency === payment.expected_currency;

      if (isVerifiedEvent) {
        const { data: updatedPayment, error: paymentUpdateError } = await supabaseAdmin
          .from("payments")
          .update({
            status: "success",
            razorpay_payment_id: razorpayPaymentId || null,
            amount: paidAmount,
            currency: paidCurrency,
            updated_at: new Date().toISOString(),
          })
          .eq("razorpay_order_id", razorpayOrderId)
          .select()
          .single();
        if (paymentUpdateError) throw paymentUpdateError;

        if (updatedPayment?.lead_id) {
          await supabaseAdmin
            .from("leads")
            .update({
              status: "paid",
              payment_status: "success",
            })
            .eq("id", updatedPayment.lead_id);
        }

        try {
          await recordClarityPurchase(updatedPayment);
        } catch (metaError) {
          console.error("Meta Purchase delivery error:", metaError);
        }

        await Promise.all([
          safelyRunEmail(
            () => sendPaymentSuccessEmail(updatedPayment),
            "Webhook payment confirmation"
          ),
          safelyRunWhatsApp(
            () => sendPaymentSuccessWhatsApp(updatedPayment),
            "Webhook payment confirmation"
          ),
        ]);
      }
    }

    if (eventType === "payment.failed") {
      const { data: failedPayment } = await supabaseAdmin
        .from("payments")
        .update({
          status: "failed",
          razorpay_payment_id: razorpayPaymentId,
          error_code: paymentEntity?.error_code || null,
          error_description: paymentEntity?.error_description || null,
          updated_at: new Date().toISOString(),
        })
        .eq("razorpay_order_id", razorpayOrderId)
        .neq("status", "success")
        .select()
        .maybeSingle();

      if (failedPayment?.lead_id) {
        await supabaseAdmin
          .from("leads")
          .update({ payment_status: "failed" })
          .eq("id", failedPayment.lead_id)
          .neq("payment_status", "success");
      }

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
