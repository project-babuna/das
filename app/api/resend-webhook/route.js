import { NextResponse } from "next/server";
import { resend } from "@/lib/email";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const STATUS_BY_EVENT = {
  "email.scheduled": "scheduled",
  "email.sent": "sent",
  "email.delivered": "delivered",
  "email.delivery_delayed": "delivery_delayed",
  "email.opened": "opened",
  "email.clicked": "clicked",
  "email.bounced": "bounced",
  "email.complained": "complained",
  "email.suppressed": "suppressed",
  "email.failed": "failed",
};

export async function POST(request) {
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;
  if (!resend || !webhookSecret) {
    return NextResponse.json({ success: false, message: "Webhook is not configured." }, { status: 503 });
  }

  try {
    const payload = await request.text();
    const event = resend.webhooks.verify({
      payload,
      headers: {
        id: request.headers.get("svix-id"),
        timestamp: request.headers.get("svix-timestamp"),
        signature: request.headers.get("svix-signature"),
      },
      webhookSecret,
    });

    const providerMessageId = event?.data?.email_id;
    const status = STATUS_BY_EVENT[event?.type];
    if (!providerMessageId || !status) {
      return NextResponse.json({ success: true, message: "Event ignored." });
    }

    const eventAt = event.created_at || new Date().toISOString();
    const { data: current } = await supabaseAdmin
      .from("email_logs")
      .select("id,last_event_at")
      .eq("provider_message_id", providerMessageId)
      .maybeSingle();

    if (!current) {
      return NextResponse.json({ success: true, message: "Email log not found." });
    }

    if (current.last_event_at && new Date(current.last_event_at) > new Date(eventAt)) {
      return NextResponse.json({ success: true, message: "Older event ignored." });
    }

    const failedReason = event?.data?.failed?.reason || event?.data?.bounce?.message || null;
    const update = {
      status,
      last_event_at: eventAt,
      last_webhook_id: request.headers.get("svix-id"),
      error_message: failedReason,
      updated_at: new Date().toISOString(),
    };
    if (["sent", "delivered", "opened", "clicked"].includes(status)) {
      update.sent_at = eventAt;
    }
    const { error } = await supabaseAdmin
      .from("email_logs")
      .update(update)
      .eq("id", current.id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend webhook error:", error);
    return NextResponse.json({ success: false, message: "Invalid webhook." }, { status: 400 });
  }
}
