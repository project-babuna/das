import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const DATASET_ID = process.env.META_DATASET_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const GRAPH_VERSION = process.env.META_GRAPH_API_VERSION || "v26.0";

export function metaCapiConfigured() {
  return process.env.VERCEL_ENV === "production" &&
    Boolean(DATASET_ID && ACCESS_TOKEN && ACCESS_TOKEN !== "your_access_token");
}

export function hashMetaUserData(value) {
  return crypto.createHash("sha256").update(String(value).trim().toLowerCase()).digest("hex");
}

export async function deliverMetaEvent(eventId) {
  if (!metaCapiConfigured()) return;
  const { data: claimed, error: claimError } = await supabaseAdmin.rpc("claim_meta_conversion", {
    p_event_id: eventId,
  });
  if (claimError) throw claimError;
  const record = claimed?.[0];
  if (!record) return;

  try {
    if (record.meta_deployment_environment !== "production") {
      throw new Error("Meta event was not created by a production deployment.");
    }
    let userData = record.payload.user_data || {};
    const eventPayload = { ...record.payload };
    if (record.event_name === "Purchase") {
      const { data: payment, error: paymentError } = await supabaseAdmin.from("payments")
        .select("lead_id, meta_fbp, meta_fbc, status, program_id, amount, currency")
        .eq("razorpay_order_id", record.razorpay_order_id).single();
      if (paymentError) throw paymentError;
      if (payment.status !== "success" || payment.program_id !== "clarity_session" ||
          payment.currency !== "INR" || payment.amount <= 0) {
        throw new Error("Purchase no longer matches a captured Clarity Session payment.");
      }
      const { data: lead, error: leadError } = await supabaseAdmin.from("leads")
        .select("name, email, phone").eq("id", payment.lead_id).single();
      if (leadError) throw leadError;
      userData = {};
      if (lead?.email) userData.em = [hashMetaUserData(lead.email)];
      if (lead?.phone) userData.ph = [hashMetaUserData(`91${lead.phone.replace(/\D/g, "")}`)];
      const nameParts = lead?.name?.trim().split(/\s+/) || [];
      if (nameParts.length > 1) {
        userData.fn = hashMetaUserData(nameParts[0]);
        userData.ln = hashMetaUserData(nameParts[nameParts.length - 1]);
      }
      if (payment.meta_fbp) userData.fbp = payment.meta_fbp;
      if (payment.meta_fbc) userData.fbc = payment.meta_fbc;
      const { data: matchContext, error: matchContextError } = await supabaseAdmin
        .from("payments")
        .select("meta_client_ip, meta_client_user_agent, meta_event_source_url, meta_referrer_url")
        .eq("razorpay_order_id", record.razorpay_order_id)
        .single();
      if (matchContextError) {
        console.warn("Purchase matching context was not available:", matchContextError);
      } else {
        if (matchContext.meta_client_ip) userData.client_ip_address = matchContext.meta_client_ip;
        if (matchContext.meta_client_user_agent) userData.client_user_agent = matchContext.meta_client_user_agent;
        if (matchContext.meta_event_source_url) eventPayload.event_source_url = matchContext.meta_event_source_url;
        if (matchContext.meta_referrer_url) eventPayload.referrer_url = matchContext.meta_referrer_url;
      }
    }
    const body = {
      data: [{ ...eventPayload, user_data: userData,
        event_id: record.event_id, event_name: record.event_name }],
    };
    const response = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${encodeURIComponent(DATASET_ID)}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${ACCESS_TOKEN}` },
        body: JSON.stringify(body),
        cache: "no-store",
      }
    );
    const result = await response.json();
    if (!response.ok || result.error || result.events_received !== 1) {
      throw new Error(result.error?.message || `Meta rejected event (${response.status}).`);
    }
    const { error } = await supabaseAdmin.from("meta_conversion_events").update({
      status: "sent", sent_at: new Date().toISOString(), locked_until: null,
      error_message: null, updated_at: new Date().toISOString(),
    }).eq("event_id", eventId);
    if (error) throw error;
  } catch (error) {
    await supabaseAdmin.from("meta_conversion_events").update({
      status: "failed", locked_until: null,
      error_message: String(error.message || error).slice(0, 500),
      updated_at: new Date().toISOString(),
    }).eq("event_id", eventId);
    throw error;
  }
}

export async function recordClarityPurchase(payment) {
  if (!metaCapiConfigured()) return;
  if (payment.program_id !== "clarity_session" || payment.status !== "success" ||
      payment.currency !== "INR" || !Number.isInteger(payment.amount) || payment.amount <= 0) return;
  await deliverMetaEvent(`purchase_${payment.razorpay_order_id}`);
}
