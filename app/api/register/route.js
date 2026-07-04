import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      role,
      interest,
      message,
      source_page,
      utm_source,
      utm_medium,
      utm_campaign,
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: "Name and phone are required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("leads")
      .insert({
        name,
        email,
        phone,
        role,
        interest: interest || "clarity_session",
        message,
        source_page,
        utm_source,
        utm_medium,
        utm_campaign,
        status: "registered",
        payment_status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase lead insert error:", error);
      return NextResponse.json(
        { success: false, message: "Could not save registration." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      lead: data,
    });
  } catch (error) {
    console.error("Register API error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
