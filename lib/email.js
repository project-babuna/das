import { Resend } from "resend";
import { createPaymentReceipt } from "@/lib/paymentReceipt";
import { getProgram } from "@/lib/programs";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.dreamandscale.com").replace(/\/$/, "");
const REMINDER_DELAY_MS = 12 * 60 * 60 * 1000;

export const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function emailConfiguration() {
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (!resend || !from) {
    throw new Error("Resend is not configured. Add RESEND_API_KEY and RESEND_FROM_EMAIL.");
  }

  return {
    from,
    replyTo: process.env.RESEND_REPLY_TO?.trim() || undefined,
  };
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function firstName(name) {
  return String(name || "there").trim().split(/\s+/)[0] || "there";
}

function formatAmount(amount, currency = "INR") {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(amount || 0) / 100);
}

function emailShell({ preview, heading, body, ctaLabel, ctaHref, footnote }) {
  return `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
  <body style="margin:0;background:#f4f2ec;color:#17211f;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preview)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f2ec;padding:32px 14px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;border:1px solid #dedbd2;border-radius:8px;overflow:hidden;">
          <tr><td style="background:#082f2a;padding:26px 32px;color:#ffffff;">
            <div style="font-family:Georgia,serif;font-size:27px;line-height:1.1;">DreamAndScale</div>
            <div style="margin-top:7px;color:#c9d4d1;font-size:12px;letter-spacing:.08em;text-transform:uppercase;">Business clarity before bigger risks</div>
          </td></tr>
          <tr><td style="padding:34px 32px 28px;">
            <h1 style="margin:0 0 18px;font-size:28px;line-height:1.2;color:#17211f;">${escapeHtml(heading)}</h1>
            <div style="color:#53615d;font-size:16px;line-height:1.7;">${body}</div>
            <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:26px;">
              <tr><td style="border-radius:6px;background:#d2a02b;">
                <a href="${escapeHtml(ctaHref)}" style="display:inline-block;padding:13px 20px;color:#14201e;text-decoration:none;font-size:15px;font-weight:700;">${escapeHtml(ctaLabel)}</a>
              </td></tr>
            </table>
            ${footnote ? `<p style="margin:24px 0 0;color:#7a8581;font-size:13px;line-height:1.55;">${escapeHtml(footnote)}</p>` : ""}
          </td></tr>
          <tr><td style="border-top:1px solid #ece9e1;padding:20px 32px;color:#7a8581;font-size:12px;line-height:1.55;">
            DreamAndScale · <a href="${SITE_URL}" style="color:#315f58;">dreamandscale.com</a>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

async function reserveEmailLog({
  lead,
  payment,
  emailType,
  subject,
  idempotencyKey,
  scheduledFor,
  metadata,
}) {
  const { data, error } = await supabaseAdmin
    .from("email_logs")
    .upsert(
      {
        lead_id: lead.id,
        payment_id: payment?.id || null,
        program_id: lead.interest || payment?.program_id || null,
        email_type: emailType,
        recipient: lead.email,
        subject,
        status: "processing",
        idempotency_key: idempotencyKey,
        scheduled_for: scheduledFor || null,
        metadata: metadata || {},
        updated_at: new Date().toISOString(),
      },
      { onConflict: "idempotency_key", ignoreDuplicates: true }
    )
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
}

async function sendLoggedEmail({
  lead,
  payment,
  emailType,
  subject,
  html,
  text,
  idempotencyKey,
  scheduledFor,
  metadata,
  attachments,
}) {
  if (!EMAIL_PATTERN.test(lead?.email || "")) {
    return { skipped: true, reason: "missing_email" };
  }

  const log = await reserveEmailLog({
    lead,
    payment,
    emailType,
    subject,
    idempotencyKey,
    scheduledFor,
    metadata,
  });

  if (!log) return { skipped: true, reason: "duplicate" };

  try {
    const { from, replyTo } = emailConfiguration();
    const { data, error } = await resend.emails.send(
      {
        from,
        to: [lead.email],
        subject,
        html,
        text,
        replyTo,
        scheduledAt: scheduledFor || undefined,
        attachments: attachments || undefined,
        tags: [
          { name: "email_type", value: emailType },
          { name: "program", value: lead.interest || payment?.program_id || "unknown" },
        ],
      },
      { idempotencyKey }
    );

    if (error) throw new Error(error.message || "Resend rejected the email.");

    const now = new Date().toISOString();
    const status = scheduledFor ? "scheduled" : "sent";
    const { error: updateError } = await supabaseAdmin
      .from("email_logs")
      .update({
        provider_message_id: data.id,
        status,
        sent_at: scheduledFor ? null : now,
        last_event_at: now,
        error_message: null,
        updated_at: now,
      })
      .eq("id", log.id);

    if (updateError) throw updateError;
    return { success: true, id: data.id, status };
  } catch (error) {
    await supabaseAdmin
      .from("email_logs")
      .update({
        status: "failed",
        error_message: String(error?.message || error).slice(0, 1000),
        updated_at: new Date().toISOString(),
      })
      .eq("id", log.id);
    throw error;
  }
}

export async function schedulePaymentReminder(lead) {
  if (!EMAIL_PATTERN.test(lead?.email || "")) return { skipped: true, reason: "missing_email" };

  const program = getProgram(lead.interest);
  const scheduledFor = new Date(Date.now() + REMINDER_DELAY_MS).toISOString();
  const retryHref = `${SITE_URL}/register?program=${encodeURIComponent(program.id)}`;
  const subject = `Complete your ${program.title} registration`;
  const body = `
    <p style="margin:0 0 14px;">Hi ${escapeHtml(firstName(lead.name))},</p>
    <p style="margin:0 0 14px;">Your registration for <strong>${escapeHtml(program.title)}</strong> is still waiting for payment.</p>
    <p style="margin:0;">Complete your ${escapeHtml(formatAmount(program.amount, program.currency))} payment when you are ready. If you have already paid, you can ignore this reminder.</p>`;

  return sendLoggedEmail({
    lead,
    emailType: "payment_reminder_12h",
    subject,
    html: emailShell({
      preview: `Complete your ${program.title} registration.`,
      heading: "Your registration is waiting",
      body,
      ctaLabel: "Complete Payment",
      ctaHref: retryHref,
      footnote: "This reminder was scheduled 12 hours after your registration.",
    }),
    text: `Hi ${firstName(lead.name)}, your ${program.title} registration is waiting for payment. Complete it here: ${retryHref}`,
    idempotencyKey: `payment-reminder-12h/${lead.id}`,
    scheduledFor,
    metadata: { reminder_delay_hours: 12 },
  });
}

export async function cancelPaymentReminder(leadId) {
  const { data: logs, error } = await supabaseAdmin
    .from("email_logs")
    .select("id,provider_message_id,status")
    .eq("lead_id", leadId)
    .eq("email_type", "payment_reminder_12h")
    .in("status", ["processing", "scheduled"])
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) throw error;
  const log = logs?.[0];
  if (!log) return { skipped: true };

  try {
    if (log.provider_message_id) {
      const { error: cancelError } = await resend.emails.cancel(log.provider_message_id);
      if (cancelError) throw new Error(cancelError.message || "Could not cancel reminder.");
    }

    const now = new Date().toISOString();
    await supabaseAdmin
      .from("email_logs")
      .update({ status: "canceled", last_event_at: now, updated_at: now })
      .eq("id", log.id);
    return { success: true };
  } catch (error) {
    console.error("Reminder cancellation error:", error);
    return { success: false };
  }
}

async function getLead(leadId) {
  const { data, error } = await supabaseAdmin
    .from("leads")
    .select("id,name,email,phone,interest,status,payment_status")
    .eq("id", leadId)
    .single();
  if (error) throw error;
  return data;
}

export async function sendPaymentSuccessEmail(payment) {
  if (!payment?.lead_id) return { skipped: true };
  const lead = await getLead(payment.lead_id);
  await cancelPaymentReminder(lead.id);

  const program = getProgram(lead.interest || payment.program_id);
  const amount = formatAmount(payment.amount || payment.expected_amount, payment.currency || payment.expected_currency);
  const receipt = await createPaymentReceipt({ lead, payment, program });
  const subject = `Payment confirmed — ${program.title}`;
  const body = `
    <p style="margin:0 0 14px;">Hi ${escapeHtml(firstName(lead.name))},</p>
    <p style="margin:0 0 14px;">Your payment of <strong>${escapeHtml(amount)}</strong> for <strong>${escapeHtml(program.title)}</strong> was successful.</p>
    <p style="margin:0 0 14px;">Your registration is confirmed. Program or session details will be shared through WhatsApp or email.</p>
    <p style="margin:0;">Your payment receipt is attached as a PDF for your records.</p>`;

  return sendLoggedEmail({
    lead,
    payment,
    emailType: "payment_success",
    subject,
    html: emailShell({
      preview: `Your ${program.title} registration is confirmed.`,
      heading: "Your registration is confirmed",
      body,
      ctaLabel: "Visit DreamAndScale",
      ctaHref: SITE_URL,
      footnote: payment.razorpay_order_id ? `Order reference: ${payment.razorpay_order_id}` : undefined,
    }),
    text: `Hi ${firstName(lead.name)}, your payment of ${amount} for ${program.title} was successful. Your registration is confirmed. Your PDF payment receipt is attached.`,
    idempotencyKey: `payment-success/${payment.razorpay_order_id || payment.id}`,
    attachments: [
      {
        filename: `dreamandscale-receipt-${receipt.receiptNumber.toLowerCase()}.pdf`,
        content: receipt.bytes.toString("base64"),
      },
    ],
    metadata: {
      razorpay_order_id: payment.razorpay_order_id || null,
      razorpay_payment_id: payment.razorpay_payment_id || null,
      amount,
      receipt_number: receipt.receiptNumber,
      paid_at: receipt.paidAt,
    },
  });
}

export async function sendPaymentFailedEmail(payment) {
  if (!payment?.lead_id) return { skipped: true };
  const lead = await getLead(payment.lead_id);
  const program = getProgram(lead.interest || payment.program_id);
  const retryHref = `${SITE_URL}/register?program=${encodeURIComponent(program.id)}`;
  const subject = `Payment not completed — ${program.title}`;
  const body = `
    <p style="margin:0 0 14px;">Hi ${escapeHtml(firstName(lead.name))},</p>
    <p style="margin:0 0 14px;">Your payment for <strong>${escapeHtml(program.title)}</strong> was not completed.</p>
    <p style="margin:0;">No registration has been confirmed. You can safely try again using the button below. If money was deducted, wait for your bank or Razorpay confirmation before retrying.</p>`;

  return sendLoggedEmail({
    lead,
    payment,
    emailType: "payment_failed",
    subject,
    html: emailShell({
      preview: `Your ${program.title} payment was not completed.`,
      heading: "Your payment was not completed",
      body,
      ctaLabel: "Try Payment Again",
      ctaHref: retryHref,
      footnote: "Need help? Reply to this email with your registered phone number.",
    }),
    text: `Hi ${firstName(lead.name)}, your payment for ${program.title} was not completed. Try again: ${retryHref}`,
    idempotencyKey: `payment-failed/${payment.razorpay_order_id || payment.id}`,
    metadata: {
      razorpay_order_id: payment.razorpay_order_id || null,
      error_code: payment.error_code || null,
    },
  });
}

export async function safelyRunEmail(task, context) {
  try {
    return await task();
  } catch (error) {
    console.error(`${context} email error:`, error);
    return { success: false, error: error?.message || String(error) };
  }
}
