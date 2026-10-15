import { NextResponse } from "next/server";
import { deliverMetaEvent, metaCapiConfigured } from "@/lib/metaConversions";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET(request) {
  if (!process.env.CRON_SECRET ||
      request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  if (!metaCapiConfigured()) {
    return NextResponse.json({ success: false, message: "Meta CAPI is not configured." }, { status: 503 });
  }

  const { data, error } = await supabaseAdmin.from("meta_conversion_events")
    .select("event_id, status, locked_until")
    .in("status", ["pending", "failed", "sending"])
    .order("created_at", { ascending: true }).limit(50);
  if (error) {
    console.error("Meta retry query error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }

  let sent = 0;
  for (const event of data || []) {
    if (event.status === "sending" &&
        (!event.locked_until || new Date(event.locked_until).getTime() > Date.now())) continue;
    try {
      await deliverMetaEvent(event.event_id);
      sent += 1;
    } catch (deliveryError) {
      console.error("Meta retry error:", deliveryError);
    }
  }
  return NextResponse.json({ success: true, examined: data?.length || 0, sent });
}
