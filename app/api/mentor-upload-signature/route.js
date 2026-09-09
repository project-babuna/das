import { NextResponse } from "next/server";
import { cloudinary, getCloudinaryConfig, isCloudinaryConfigured } from "@/lib/cloudinary";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const RATE_LIMIT = { limit: 10, windowMs: 60 * 1000 };

function errorResponse(message, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

export async function POST(request) {
  try {
    const rate = rateLimit({ key: `mentor-upload:${getClientIp(request)}`, ...RATE_LIMIT });
    if (!rate.allowed) return errorResponse("Too many upload attempts. Please try again later.", 429);
    if (!isCloudinaryConfigured()) return errorResponse("Mentor image uploads are not configured yet.", 503);

    const body = await request.json();
    const fileType = typeof body?.file_type === "string" ? body.file_type : "";
    const fileSize = Number(body?.file_size);
    if (!ALLOWED_IMAGE_TYPES.has(fileType)) return errorResponse("Please upload a JPG, PNG, or WebP image.");
    if (!Number.isFinite(fileSize) || fileSize <= 0 || fileSize > MAX_IMAGE_SIZE) {
      return errorResponse("Please upload an image smaller than 10 MB.");
    }

    const applicationId = crypto.randomUUID();
    const publicId = `dreamandscale/mentor-headshots/${applicationId}`;
    const timestamp = Math.floor(Date.now() / 1000);
    const uploadParameters = { public_id: publicId, timestamp, type: "authenticated" };
    const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
    const signature = cloudinary.utils.api_sign_request(uploadParameters, apiSecret);

    return NextResponse.json({
      success: true,
      application_id: applicationId,
      cloud_name: cloudName,
      api_key: apiKey,
      signature,
      upload_parameters: uploadParameters,
    });
  } catch (error) {
    console.error("Mentor upload signature error:", error);
    return errorResponse("Could not prepare the image upload.", 500);
  }
}
