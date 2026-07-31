import { createPaymentReceipt } from "@/lib/paymentReceipt";
import { getProgram } from "@/lib/programs";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const DEFAULT_GRAPH_API_VERSION = "v23.0";
const DEFAULT_COUNTRY_CODE = "91";

function getConfiguration() {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN?.trim();
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID?.trim();
  const templateName = process.env.WHATSAPP_PAYMENT_SUCCESS_TEMPLATE?.trim();

  if (!accessToken || !phoneNumberId || !templateName) return null;

  const graphApiVersion = process.env.WHATSAPP_GRAPH_API_VERSION?.trim() || DEFAULT_GRAPH_API_VERSION;
  if (!/^v\d+\.\d+$/.test(graphApiVersion)) {
    throw new Error("WHATSAPP_GRAPH_API_VERSION must use a value such as v23.0.");
  }

  return {
    accessToken,
    phoneNumberId,
    templateName,
    graphApiVersion,
    languageCode: process.env.WHATSAPP_TEMPLATE_LANGUAGE_CODE?.trim() || "en",
  };
}

function normalizeWhatsAppNumber(value) {
  let digits = String(value || "").replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);

  const countryCode =
    String(process.env.WHATSAPP_DEFAULT_COUNTRY_CODE || DEFAULT_COUNTRY_CODE).replace(/\D/g, "") ||
    DEFAULT_COUNTRY_CODE;

  if (digits.length === 10) digits = `${countryCode}${digits}`;
  else if (digits.length === 11 && digits.startsWith("0")) digits = `${countryCode}${digits.slice(1)}`;

  return /^\d{8,15}$/.test(digits) ? digits : "";
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

async function parseMetaResponse(response) {
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = payload?.error?.message || `WhatsApp API request failed with status ${response.status}.`;
    throw new Error(message);
  }
  return payload;
}

async function uploadReceipt(configuration, receipt, filename) {
  const form = new FormData();
  form.append("messaging_product", "whatsapp");
  form.append("type", "application/pdf");
  form.append("file", new Blob([receipt.bytes], { type: "application/pdf" }), filename);

  const response = await fetch(
    `https://graph.facebook.com/${configuration.graphApiVersion}/${configuration.phoneNumberId}/media`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${configuration.accessToken}` },
      body: form,
      cache: "no-store",
    }
  );
  const payload = await parseMetaResponse(response);
  if (!payload.id) throw new Error("WhatsApp media upload did not return a media ID.");
  return payload.id;
}

async function sendReceiptTemplate({ configuration, to, lead, payment, program, receipt, mediaId, filename }) {
  const amount = formatAmount(
    payment.amount || payment.expected_amount || program.amount,
    payment.currency || payment.expected_currency || program.currency
  );

  const response = await fetch(
    `https://graph.facebook.com/${configuration.graphApiVersion}/${configuration.phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${configuration.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "template",
        template: {
          name: configuration.templateName,
          language: { code: configuration.languageCode },
          components: [
            {
              type: "header",
              parameters: [{ type: "document", document: { id: mediaId, filename } }],
            },
            {
              type: "body",
              parameters: [
                { type: "text", text: firstName(lead.name) },
                { type: "text", text: amount },
                { type: "text", text: program.title },
                { type: "text", text: receipt.receiptNumber },
              ],
            },
          ],
        },
      }),
      cache: "no-store",
    }
  );

  return parseMetaResponse(response);
}

async function reserveLog({ lead, payment, recipient, templateName, metadata }) {
  const idempotencyKey = `payment-success/${payment.razorpay_order_id || payment.id}`;
  const logRecord = {
    lead_id: lead.id,
    payment_id: payment.id,
    recipient,
    message_type: "payment_success",
    template_name: templateName,
    status: "processing",
    idempotency_key: idempotencyKey,
    metadata,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabaseAdmin
    .from("whatsapp_logs")
    .upsert(logRecord, { onConflict: "idempotency_key", ignoreDuplicates: true })
    .select()
    .maybeSingle();

  if (error) throw error;
  if (data) return data;

  const { data: existing, error: existingError } = await supabaseAdmin
    .from("whatsapp_logs")
    .select("id,status")
    .eq("idempotency_key", idempotencyKey)
    .maybeSingle();
  if (existingError) throw existingError;
  if (!existing || existing.status !== "failed") return null;

  const { data: retry, error: retryError } = await supabaseAdmin
    .from("whatsapp_logs")
    .update({ ...logRecord, error_message: null })
    .eq("id", existing.id)
    .eq("status", "failed")
    .select()
    .maybeSingle();
  if (retryError) throw retryError;
  return retry;
}

export async function sendPaymentSuccessWhatsApp(payment) {
  const configuration = getConfiguration();
  if (!configuration) return { skipped: true, reason: "not_configured" };
  if (!payment?.lead_id || !payment?.id) return { skipped: true, reason: "missing_payment" };

  const { data: lead, error: leadError } = await supabaseAdmin
    .from("leads")
    .select("id,name,phone,interest")
    .eq("id", payment.lead_id)
    .single();
  if (leadError) throw leadError;

  const recipient = normalizeWhatsAppNumber(lead.phone);
  if (!recipient) return { skipped: true, reason: "invalid_phone" };

  const program = getProgram(lead.interest || payment.program_id);
  const receipt = await createPaymentReceipt({ lead, payment, program });
  const filename = `dreamandscale-receipt-${receipt.receiptNumber.toLowerCase()}.pdf`;
  const log = await reserveLog({
    lead,
    payment,
    recipient,
    templateName: configuration.templateName,
    metadata: {
      program_id: program.id,
      razorpay_order_id: payment.razorpay_order_id || null,
      razorpay_payment_id: payment.razorpay_payment_id || null,
      receipt_number: receipt.receiptNumber,
    },
  });
  if (!log) return { skipped: true, reason: "duplicate" };

  try {
    const mediaId = await uploadReceipt(configuration, receipt, filename);
    const response = await sendReceiptTemplate({
      configuration,
      to: recipient,
      lead,
      payment,
      program,
      receipt,
      mediaId,
      filename,
    });
    const messageId = response?.messages?.[0]?.id || null;

    const { error: updateError } = await supabaseAdmin
      .from("whatsapp_logs")
      .update({
        status: "sent",
        media_id: mediaId,
        provider_message_id: messageId,
        sent_at: new Date().toISOString(),
        error_message: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", log.id);
    if (updateError) throw updateError;

    return { success: true, id: messageId };
  } catch (error) {
    await supabaseAdmin
      .from("whatsapp_logs")
      .update({
        status: "failed",
        error_message: String(error?.message || error).slice(0, 1000),
        updated_at: new Date().toISOString(),
      })
      .eq("id", log.id);
    throw error;
  }
}

export async function safelyRunWhatsApp(task, context) {
  try {
    return await task();
  } catch (error) {
    console.error(`${context} WhatsApp error:`, error);
    return { success: false, error: error?.message || String(error) };
  }
}
