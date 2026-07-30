import crypto from "crypto";
import { NextResponse } from "next/server";
import { safelyRunEmail, sendPaymentReminder } from "@/lib/email";
import { isSupabaseConfigured, supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;
const BATCH_SIZE = 25;
const CANDIDATE_LIMIT = 250;

function safeEqual(left, right) {
  if (!left || !right) return false;
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function authorized(request) {
  const secret = process.env.CRON_SECRET;
  const authorization = request.headers.get("authorization") || "";
  return secret?.length >= 32 && safeEqual(authorization, `Bearer ${secret}`);
}

export async function GET(request) {
  if (!authorized(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: false, message: "Supabase is not configured." }, { status: 503 });
  }

  try {
    const cutoff = new Date(Date.now() - TWELVE_HOURS_MS).toISOString();
    const { data: candidates, error } = await supabaseAdmin
      .from("leads")
      .select("id,name,email,phone,interest,status,payment_status,created_at")
      .lte("created_at", cutoff)
      .neq("payment_status", "success")
      .neq("status", "paid")
      .order("created_at", { ascending: false })
      .limit(CANDIDATE_LIMIT);

    if (error) throw error;

    const candidateIds = (candidates || []).map((lead) => lead.id);
    let successfulLeadIds = new Set();
    let previouslyRemindedLeadIds = new Set();

    if (candidateIds.length) {
      const [paymentsResult, remindersResult] = await Promise.all([
        supabaseAdmin
          .from("payments")
          .select("lead_id")
          .in("lead_id", candidateIds)
          .eq("status", "success"),
        supabaseAdmin
          .from("email_logs")
          .select("lead_id")
          .in("lead_id", candidateIds)
          .eq("email_type", "payment_reminder_12h"),
      ]);

      if (paymentsResult.error) throw paymentsResult.error;
      if (remindersResult.error) throw remindersResult.error;

      successfulLeadIds = new Set((paymentsResult.data || []).map((row) => row.lead_id));
      previouslyRemindedLeadIds = new Set((remindersResult.data || []).map((row) => row.lead_id));
    }

    const leads = (candidates || [])
      .filter((lead) => !successfulLeadIds.has(lead.id))
      .filter((lead) => !previouslyRemindedLeadIds.has(lead.id))
      .slice(0, BATCH_SIZE);

    const results = [];
    for (const lead of leads || []) {
      results.push(
        await safelyRunEmail(
          () => sendPaymentReminder(lead),
          `12-hour reminder for lead ${lead.id}`
        )
      );
    }

    const sent = results.filter((result) => result?.success).length;
    const skipped = results.filter((result) => result?.skipped).length;
    const failed = results.length - sent - skipped;

    return NextResponse.json({
      success: true,
      candidates: candidates?.length || 0,
      checked: leads.length,
      skippedPaid: successfulLeadIds.size,
      skippedPreviouslyReminded: previouslyRemindedLeadIds.size,
      sent,
      skipped,
      failed,
      cutoff,
    });
  } catch (error) {
    console.error("Payment reminder cron error:", error);
    return NextResponse.json(
      { success: false, message: "Could not process payment reminders." },
      { status: 500 }
    );
  }
}
