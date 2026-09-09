import { NextResponse } from "next/server";
import { cloudinary, isCloudinaryConfigured } from "@/lib/cloudinary";
import { getClientIp, rateLimit } from "@/lib/rateLimit";
import { isSupabaseConfigured, supabaseAdmin } from "@/lib/supabaseAdmin";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LINKEDIN_PATTERN = /^https:\/\/(www\.)?linkedin\.com\/.+/i;
const CLOUDINARY_PREFIX = "dreamandscale/mentor-headshots/";
const ALLOWED_FORMATS = new Set(["jpg", "jpeg", "png", "webp"]);
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const RATE_LIMIT = { limit: 10, windowMs: 60 * 1000 };

function cleanString(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function errorResponse(message, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

async function removeUploadedAsset(publicId) {
  if (!publicId?.startsWith(CLOUDINARY_PREFIX)) return;
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      type: "authenticated",
      invalidate: true,
    });
  } catch (error) {
    console.warn("Could not clean up Cloudinary mentor headshot:", error?.message || error);
  }
}

export async function POST(request) {
  let uploadedPublicId = "";

  try {
    const rate = rateLimit({ key: `mentor:${getClientIp(request)}`, ...RATE_LIMIT });
    if (!rate.allowed) return errorResponse("Too many requests. Please try again later.", 429);
    if (!isCloudinaryConfigured() || !isSupabaseConfigured()) {
      return errorResponse("Mentor applications are not configured yet.", 503);
    }

    const body = await request.json();
    const fullNameRole = cleanString(body?.full_name_role, 160);
    const email = cleanString(body?.email, 120);
    const linkedinProfile = cleanString(body?.linkedin_profile, 300);
    const founderThoughts = cleanString(body?.founder_thoughts, 1500);
    const mentorshipModel = cleanString(body?.mentorship_model, 100);
    const sessionFee = cleanString(body?.session_fee, 160);
    const timeCommitment = cleanString(body?.time_commitment, 300);
    const consent = cleanString(body?.consent, 80);
    const otherQuestions = cleanString(body?.other_questions, 1500);
    const otherSuperpower = cleanString(body?.other_superpower, 120);
    const applicationId = cleanString(body?.application_id, 80);
    const cloudinaryAssetId = cleanString(body?.cloudinary_asset_id, 160);
    const cloudinaryPublicId = cleanString(body?.cloudinary_public_id, 300);
    const cloudinarySignature = cleanString(body?.cloudinary_signature, 200);
    const cloudinaryVersion = Number(body?.cloudinary_version);
    uploadedPublicId = cloudinaryPublicId;
    const superpowers = Array.isArray(body?.superpowers)
      ? body.superpowers.map((item) => cleanString(item, 80)).filter(Boolean).slice(0, 10)
      : [];

    if (
      !applicationId || !fullNameRole || !email || !founderThoughts || !mentorshipModel ||
      !sessionFee || !timeCommitment || !consent || !cloudinaryAssetId || !cloudinaryPublicId ||
      !cloudinarySignature || !Number.isInteger(cloudinaryVersion)
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
    if (cloudinaryPublicId !== `${CLOUDINARY_PREFIX}${applicationId}`) {
      return errorResponse("The uploaded headshot reference is invalid.");
    }
    if (!cloudinary.utils.verify_api_response_signature(cloudinaryPublicId, cloudinaryVersion, cloudinarySignature)) {
      return errorResponse("The uploaded headshot could not be verified.");
    }

    const asset = await cloudinary.api.resource(cloudinaryPublicId, {
      resource_type: "image",
      type: "authenticated",
    });
    if (
      asset.asset_id !== cloudinaryAssetId || asset.public_id !== cloudinaryPublicId ||
      asset.resource_type !== "image" || asset.type !== "authenticated" ||
      !ALLOWED_FORMATS.has(String(asset.format || "").toLowerCase()) ||
      !Number.isFinite(asset.bytes) || asset.bytes <= 0 || asset.bytes > MAX_IMAGE_SIZE
    ) {
      await removeUploadedAsset(cloudinaryPublicId);
      return errorResponse("The uploaded headshot is invalid.");
    }

    const { error } = await supabaseAdmin.from("mentor_applications").insert({
      id: applicationId,
      full_name_role: fullNameRole,
      email,
      linkedin_profile: linkedinProfile || null,
      superpowers,
      other_superpower: otherSuperpower || null,
      founder_thoughts: founderThoughts,
      mentorship_model: mentorshipModel,
      session_fee: sessionFee,
      time_commitment: timeCommitment,
      consent,
      other_questions: otherQuestions || null,
      cloudinary_asset_id: asset.asset_id,
      cloudinary_public_id: asset.public_id,
      cloudinary_version: asset.version,
      cloudinary_format: asset.format,
      cloudinary_resource_type: asset.resource_type,
      cloudinary_delivery_type: asset.type,
      headshot_original_name: cleanString(body?.headshot_original_name, 255) || null,
      headshot_size_bytes: asset.bytes,
      headshot_width: asset.width,
      headshot_height: asset.height,
      status: "new",
    });

    if (error) {
      await removeUploadedAsset(cloudinaryPublicId);
      console.error("Mentor application insert error:", error);
      return errorResponse("Could not save your mentor profile. Please try again.", 500);
    }

    return NextResponse.json({ success: true, application_id: applicationId });
  } catch (error) {
    console.error("Mentor application error:", error);
    if (uploadedPublicId) await removeUploadedAsset(uploadedPublicId);
    return errorResponse("Something went wrong. Please try again.", 500);
  }
}
