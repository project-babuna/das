import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request) {
  try {
    const body = await request.json();

    const { name, email, phone, question, source_page } = body;

    if (!name || !question) {
      return NextResponse.json(
        { success: false, message: "Name and question are required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("queries")
      .insert({
        name,
        email,
        phone,
        question,
        source_page,
        status: "new",
      })
      .select()
      .single();

    if (error) {
      console.error("Query insert error:", error);
      return NextResponse.json(
        { success: false, message: "Could not save query." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      query: data,
    });
  } catch (error) {
    console.error("Query API error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
