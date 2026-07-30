import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const COLORS = {
  ink: rgb(0.075, 0.12, 0.11),
  green: rgb(0.035, 0.19, 0.17),
  greenSoft: rgb(0.9, 0.94, 0.92),
  gold: rgb(0.82, 0.62, 0.17),
  paper: rgb(0.975, 0.968, 0.945),
  white: rgb(1, 1, 1),
  muted: rgb(0.39, 0.44, 0.42),
  line: rgb(0.86, 0.85, 0.81),
};

const PROGRAM_DESCRIPTIONS = {
  clarity_session: "3-hour live Business Clarity Session",
  full_program: "Self-paced business clarity program",
  mentorship: "Self-paced program with live mentor support",
};

function cleanReference(value, fallback = "PAYMENT") {
  return String(value || fallback).replace(/[^a-zA-Z0-9]/g, "");
}

export function getReceiptNumber(payment) {
  const source = cleanReference(
    payment?.razorpay_payment_id || payment?.razorpay_order_id || payment?.id
  );
  return `DAS-${source.slice(-16).toUpperCase()}`;
}

function formatReceiptAmount(amount, currency = "INR") {
  const value = Number(amount || 0) / 100;
  return `${currency} ${new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)}`;
}

function formatReceiptDate(value) {
  const date = value ? new Date(value) : new Date();
  return `${new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date).replace(/\b(am|pm)\b/g, (value) => value.toUpperCase())} IST`;
}

function safeText(value, fallback = "Not provided") {
  const text = String(value || "").trim();
  return (text || fallback)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7E]/g, "?");
}

function fitText(font, value, maxWidth, initialSize, minimumSize = 8) {
  let size = initialSize;
  const text = safeText(value);
  while (size > minimumSize && font.widthOfTextAtSize(text, size) > maxWidth) {
    size -= 0.5;
  }
  return size;
}

function drawLabel(page, font, text, x, y) {
  page.drawText(text.toUpperCase(), {
    x,
    y,
    size: 8.5,
    font,
    color: COLORS.muted,
    characterSpacing: 0.7,
  });
}

function drawDetail(page, fonts, { label, value, x, y, width }) {
  drawLabel(page, fonts.bold, label, x, y);
  const size = fitText(fonts.regular, value, width, 10.5, 7.5);
  page.drawText(safeText(value), {
    x,
    y: y - 17,
    size,
    font: fonts.regular,
    color: COLORS.ink,
  });
}

export async function createPaymentReceipt({ lead, payment, program }) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595.28, 841.89]);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const brand = await pdf.embedFont(StandardFonts.TimesRomanBold);
  const fonts = { regular, bold, brand };

  const receiptNumber = getReceiptNumber(payment);
  const amount = formatReceiptAmount(
    payment?.amount || payment?.expected_amount || program.amount,
    payment?.currency || payment?.expected_currency || program.currency
  );
  const paidAt = formatReceiptDate(payment?.updated_at || payment?.created_at);
  const description =
    PROGRAM_DESCRIPTIONS[program.id] || "DreamAndScale learning program";

  pdf.setTitle(`${program.title} payment receipt`);
  pdf.setAuthor("DreamAndScale");
  pdf.setSubject(`Payment receipt ${receiptNumber}`);
  pdf.setCreator("DreamAndScale");
  pdf.setProducer("DreamAndScale");

  page.drawRectangle({ x: 0, y: 0, width: 595.28, height: 841.89, color: COLORS.paper });
  page.drawRectangle({ x: 0, y: 711.89, width: 595.28, height: 130, color: COLORS.green });
  page.drawRectangle({ x: 42, y: 742, width: 38, height: 4, color: COLORS.gold });

  page.drawText("DreamAndScale", {
    x: 42,
    y: 772,
    size: 24,
    font: brand,
    color: COLORS.white,
  });
  page.drawText("BUSINESS CLARITY", {
    x: 42,
    y: 720,
    size: 8.5,
    font: bold,
    color: rgb(0.77, 0.84, 0.82),
    characterSpacing: 1.3,
  });

  page.drawText("PAYMENT RECEIPT", {
    x: 366,
    y: 781,
    size: 14,
    font: bold,
    color: COLORS.white,
  });
  page.drawText(receiptNumber, {
    x: 366,
    y: 758,
    size: 9.5,
    font: regular,
    color: rgb(0.77, 0.84, 0.82),
  });
  page.drawRectangle({ x: 480, y: 718, width: 73, height: 25, color: COLORS.gold, borderRadius: 3 });
  page.drawText("PAID", {
    x: 505,
    y: 726,
    size: 9.5,
    font: bold,
    color: COLORS.ink,
  });

  page.drawText("Payment confirmed", {
    x: 42,
    y: 667,
    size: 24,
    font: bold,
    color: COLORS.ink,
  });
  page.drawText("Thank you. Your DreamAndScale registration is confirmed.", {
    x: 42,
    y: 642,
    size: 10.5,
    font: regular,
    color: COLORS.muted,
  });

  page.drawRectangle({
    x: 42,
    y: 508,
    width: 246,
    height: 105,
    color: COLORS.white,
    borderColor: COLORS.line,
    borderWidth: 0.8,
    borderRadius: 5,
  });
  page.drawRectangle({
    x: 307,
    y: 508,
    width: 246,
    height: 105,
    color: COLORS.white,
    borderColor: COLORS.line,
    borderWidth: 0.8,
    borderRadius: 5,
  });

  drawLabel(page, bold, "Billed to", 58, 588);
  const customerName = safeText(lead?.name, "DreamAndScale learner");
  page.drawText(customerName, {
    x: 58,
    y: 562,
    size: fitText(bold, customerName, 210, 15, 9),
    font: bold,
    color: COLORS.ink,
  });
  page.drawText(safeText(lead?.email), {
    x: 58,
    y: 540,
    size: fitText(regular, safeText(lead?.email), 210, 9.5, 7),
    font: regular,
    color: COLORS.muted,
  });
  page.drawText(safeText(lead?.phone), {
    x: 58,
    y: 522,
    size: 9.5,
    font: regular,
    color: COLORS.muted,
  });

  drawDetail(page, fonts, {
    label: "Payment date",
    value: paidAt,
    x: 323,
    y: 588,
    width: 205,
  });
  drawDetail(page, fonts, {
    label: "Currency",
    value: payment?.currency || payment?.expected_currency || program.currency,
    x: 323,
    y: 542,
    width: 205,
  });

  page.drawRectangle({
    x: 42,
    y: 334,
    width: 511,
    height: 139,
    color: COLORS.white,
    borderColor: COLORS.line,
    borderWidth: 0.8,
    borderRadius: 5,
  });
  page.drawRectangle({ x: 42, y: 437, width: 511, height: 36, color: COLORS.greenSoft });
  page.drawText("PROGRAM", { x: 58, y: 449, size: 8.5, font: bold, color: COLORS.green });
  page.drawText("AMOUNT PAID", { x: 440, y: 449, size: 8.5, font: bold, color: COLORS.green });
  page.drawText(program.title, {
    x: 58,
    y: 405,
    size: fitText(bold, program.title, 330, 15, 10),
    font: bold,
    color: COLORS.ink,
  });
  page.drawText(description, {
    x: 58,
    y: 383,
    size: fitText(regular, description, 330, 10, 8),
    font: regular,
    color: COLORS.muted,
  });
  page.drawText(amount, {
    x: 440,
    y: 404,
    size: fitText(bold, amount, 96, 13, 9),
    font: bold,
    color: COLORS.ink,
  });
  page.drawLine({ start: { x: 58, y: 361 }, end: { x: 537, y: 361 }, thickness: 0.7, color: COLORS.line });
  page.drawText("Total paid", { x: 373, y: 342, size: 9.5, font: regular, color: COLORS.muted });
  page.drawText(amount, {
    x: 440,
    y: 341,
    size: fitText(bold, amount, 96, 12, 8.5),
    font: bold,
    color: COLORS.green,
  });

  page.drawText("TRANSACTION DETAILS", {
    x: 42,
    y: 295,
    size: 9,
    font: bold,
    color: COLORS.green,
    characterSpacing: 0.7,
  });
  drawDetail(page, fonts, {
    label: "Razorpay payment ID",
    value: payment?.razorpay_payment_id,
    x: 42,
    y: 267,
    width: 235,
  });
  drawDetail(page, fonts, {
    label: "Razorpay order ID",
    value: payment?.razorpay_order_id,
    x: 307,
    y: 267,
    width: 235,
  });
  drawDetail(page, fonts, {
    label: "Receipt number",
    value: receiptNumber,
    x: 42,
    y: 215,
    width: 235,
  });
  drawDetail(page, fonts, {
    label: "Payment status",
    value: "Paid",
    x: 307,
    y: 215,
    width: 235,
  });

  page.drawLine({ start: { x: 42, y: 156 }, end: { x: 553, y: 156 }, thickness: 0.8, color: COLORS.line });
  page.drawText("This system-generated document acknowledges payment and is not a tax invoice.", {
    x: 42,
    y: 126,
    size: 8.5,
    font: regular,
    color: COLORS.muted,
  });
  page.drawText("DreamAndScale", { x: 42, y: 91, size: 10.5, font: bold, color: COLORS.green });
  page.drawText("www.dreamandscale.com", { x: 42, y: 73, size: 8.5, font: regular, color: COLORS.muted });
  page.drawText("Questions about this payment? Reply to your confirmation email.", {
    x: 306,
    y: 82,
    size: 8.5,
    font: regular,
    color: COLORS.muted,
  });

  return {
    bytes: Buffer.from(await pdf.save()),
    receiptNumber,
    paidAt,
    amount,
  };
}
