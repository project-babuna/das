import { NextResponse } from "next/server";
import { getClientIp, rateLimit } from "@/lib/rateLimit";
import { isSupabaseConfigured, supabaseAdmin } from "@/lib/supabaseAdmin";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LINKEDIN_PATTERN = /^https:\/\/(www\.)?linkedin\.com\/.+/i;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const RATE_LIMIT = { limit: 10, windowMs: 60 * 1000 };

function cleanString(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function errorResponse(message, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

export async function POST(request) {
  try {
    const rate = rateLimit({ key: `mentor:${getClientIp(request)}`, ...RATE_LIMIT });
    if (!rate.allowed) return errorResponse("Too many requests. Please try again later.", 429);

    const data = await request.formData();
    const fullNameRole = cleanString(data.get("full_name_role"), 160);
    const email = cleanString(data.get("email"), 120);
    const linkedinProfile = cleanString(data.get("linkedin_profile"), 300);
    const founderThoughts = cleanString(data.get("founder_thoughts"), 1500);
    const mentorshipModel = cleanString(data.get("mentorship_model"), 100);
    const sessionFee = cleanString(data.get("session_fee"), 160);
    const timeCommitment = cleanString(data.get("time_commitment"), 300);
    const consent = cleanString(data.get("consent"), 80);
    const otherQuestions = cleanString(data.get("other_questions"), 1500);
    const otherSuperpower = cleanString(data.get("other_superpower"), 120);
    const headshot = data.get("headshot");
    let superpowers = [];

    try {
      const parsed = JSON.parse(cleanString(data.get("superpowers"), 1000));
      superpowers = Array.isArray(parsed)
        ? parsed.map((item) => cleanString(item, 80)).filter(Boolean).slice(0, 10)
        : [];
    } catch {
      return errorResponse("Please check your expertise selections.");
    }

    if (
      !fullNameRole ||
      !email ||
      !founderThoughts ||
      !mentorshipModel ||
      !sessionFee ||
      !timeCommitment ||
      !consent
    ) {
      return errorResponse("Please complete all required fields.");
    }

    if (!EMAIL_PATTERN.test(email)) return errorResponse("Please enter a valid email address.");
    if (linkedinProfile && !LINKEDIN_PATTERN.test(linkedinProfile)) {
      return errorResponse("Please enter a valid LinkedIn profile URL.");
    }
    if (!superpowers.length && !otherSuperpower) {
      return errorResponse("Please select at least one primary superpower.");
    }
    if (!(headshot instanceof File) || !headshot.size) {
      return errorResponse("Please upload a headshot photo.");
    }
    if (!ALLOWED_IMAGE_TYPES.has(headshot.type) || headshot.size > MAX_IMAGE_SIZE) {
      return errorResponse("Please upload a JPG, PNG, or WebP image smaller than 10 MB.");
    }

    if (!isSupabaseConfigured()) {
      return errorResponse("Mentor applications are not connected yet. Please configure Supabase.", 503);
    }

    const extensionByType = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
    };
    const extension = extensionByType[headshot.type];
    const storagePath = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
    const bytes = Buffer.from(await headshot.arrayBuffer());
    const upload = await supabaseAdmin.storage.from("mentor-headshots").upload(storagePath, bytes, {
      contentType: headshot.type,
      upsert: false,
    });

    if (upload.error) {
      console.error("Mentor headshot upload error:", upload.error);
      return errorResponse("Could not upload your headshot. Please try again.", 500);
    }

    const expertise = [...superpowers, otherSuperpower].filter(Boolean).join(", ");
    const summary = [
      `Full name & current role: ${fullNameRole}`,
      `Email: ${email}`,
      linkedinProfile ? `LinkedIn: ${linkedinProfile}` : null,
      `Primary superpowers: ${expertise}`,
      `Thoughts on DreamAndScale: ${founderThoughts}`,
      `Mentorship model: ${mentorshipModel}`,
      `Hourly / session fee: ${sessionFee}`,
      `Time commitment: ${timeCommitment}`,
      `Consent: ${consent}`,
      otherQuestions ? `Other questions/background: ${otherQuestions}` : null,
    ]
      .filter(Boolean)
      .join("\n\n");

    const insert = await supabaseAdmin.from("queries").insert({
      name: fullNameRole,
      email,
      phone: null,
      question: summary,
      help_category: "Knowledge partner collaboration",
      headshot_path: storagePath,
      source_page: "/mentor-details",
      status: "new",
    });

    if (insert.error) {
      await supabaseAdmin.storage.from("mentor-headshots").remove([storagePath]);
      console.error("Mentor application insert error:", insert.error);
      return errorResponse("Could not save your mentor profile. Please try again.", 500);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Mentor application error:", error);
    return errorResponse("Something went wrong. Please try again.", 500);
  }
}
