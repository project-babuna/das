import crypto from "crypto";

export const ADMIN_COOKIE_NAME = "das_admin_session";
export const ADMIN_SESSION_SECONDS = 8 * 60 * 60;

function getConfig() {
  return {
    email: (process.env.ADMIN_EMAIL || "").trim().toLowerCase(),
    password: process.env.ADMIN_PASSWORD || "",
    secret: process.env.ADMIN_SESSION_SECRET || "",
  };
}

export function isAdminConfigured() {
  const config = getConfig();
  return Boolean(config.email && config.password && config.secret.length >= 32);
}

function safeEqual(left, right) {
  const leftDigest = crypto.createHash("sha256").update(String(left)).digest();
  const rightDigest = crypto.createHash("sha256").update(String(right)).digest();
  return crypto.timingSafeEqual(leftDigest, rightDigest);
}

function sign(value, secret) {
  return crypto.createHmac("sha256", secret).update(value).digest("base64url");
}

export function validateAdminCredentials(email, password) {
  if (!isAdminConfigured()) {
    return false;
  }

  const config = getConfig();
  return safeEqual(String(email).trim().toLowerCase(), config.email) && safeEqual(password, config.password);
}

export function createAdminSession() {
  const config = getConfig();
  const now = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(
    JSON.stringify({ sub: config.email, iat: now, exp: now + ADMIN_SESSION_SECONDS })
  ).toString("base64url");

  return `${payload}.${sign(payload, config.secret)}`;
}

export function verifyAdminSession(token) {
  if (!isAdminConfigured() || typeof token !== "string") {
    return null;
  }

  const [payload, signature] = token.split(".");
  if (!payload || !signature) {
    return null;
  }

  const config = getConfig();
  if (!safeEqual(signature, sign(payload, config.secret))) {
    return null;
  }

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    const now = Math.floor(Date.now() / 1000);

    if (data.sub !== config.email || !Number.isFinite(data.exp) || data.exp <= now) {
      return null;
    }

    return { email: data.sub, expiresAt: data.exp };
  } catch {
    return null;
  }
}

export function getAdminSession(request) {
  return verifyAdminSession(request.cookies.get(ADMIN_COOKIE_NAME)?.value);
}
