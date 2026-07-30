import { readFile } from "fs/promises";
import path from "path";
import { PDFDocument, PDFName, PDFString, StandardFonts, rgb } from "pdf-lib";

const COLORS = {
  ink: rgb(0.075, 0.12, 0.11),
  green: rgb(0.035, 0.19, 0.17),
  greenSoft: rgb(0.9, 0.94, 0.92),
  greenMid: rgb(0.12, 0.29, 0.26),
  gold: rgb(0.82, 0.62, 0.17),
  goldSoft: rgb(0.96, 0.92, 0.81),
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

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    url: "https://www.instagram.com/dreamandscale/",
    path: "M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm4.2 3.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6Zm0 2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Zm5.05-2.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z",
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/dreamandscale/",
    path: "M6.94 8.98H3V22h3.94V8.98ZM4.96 7.2A2.29 2.29 0 1 0 4.94 2.62 2.29 2.29 0 0 0 4.96 7.2ZM22 22h-3.94v-6.34c0-1.51-.03-3.46-2.11-3.46-2.11 0-2.43 1.65-2.43 3.35V22H9.58V8.98h3.78v1.78h.05a4.14 4.14 0 0 1 3.73-2.05c3.99 0 4.86 2.63 4.86 6.05V22Z",
  },
  {
    label: "Facebook",
    url: "https://www.facebook.com/dreamandscale",
    path: "M14 8.4V6.9c0-.72.48-.9.82-.9H17V2.2L13.86 2C10.38 2 9.6 4.6 9.6 6.26V8.4H7v4h2.6V22H14v-9.6h2.98l.42-4H14Z",
  },
  {
    label: "WhatsApp",
    url: "https://whatsapp.com/channel/0029Vb8GawwJf05k2XThc91n",
    path: "M12.04 2a9.86 9.86 0 0 0-8.43 14.95L2.42 22l5.19-1.14A9.86 9.86 0 1 0 12.04 2Zm0 1.98a7.88 7.88 0 0 1 0 15.76 7.79 7.79 0 0 1-3.86-1.02l-.37-.21-3.04.67.7-2.95-.24-.39a7.88 7.88 0 0 1 6.81-11.86Zm-3.35 3.9c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.61c.13.17 1.74 2.78 4.29 3.78 2.12.83 2.55.66 3.01.62.46-.04 1.48-.6 1.69-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29-.25-.13-1.48-.73-1.71-.81-.23-.08-.4-.13-.56.13-.17.25-.65.81-.8.98-.15.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.49-1.4-1.74-.15-.25-.02-.39.11-.52.12-.12.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.5Z",
  },
];

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

function addLinkAnnotation(pdf, page, links, { x, y, width, height, url }) {
  const annotation = pdf.context.register(
    pdf.context.obj({
      Type: "Annot",
      Subtype: "Link",
      Rect: [x, y, x + width, y + height],
      Border: [0, 0, 0],
      A: {
        Type: "Action",
        S: "URI",
        URI: PDFString.of(url),
      },
    })
  );
  links.push(annotation);
  page.node.set(PDFName.of("Annots"), pdf.context.obj(links));
}

export async function createPaymentReceipt({ lead, payment, program }) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595.28, 841.89]);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const fonts = { regular, bold };
  const logoBytes = await readFile(path.join(process.cwd(), "public", "brand", "logo-light.png"));
  const logo = await pdf.embedPng(logoBytes);
  const links = [];

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
  page.drawRectangle({ x: 0, y: 688, width: 595.28, height: 153.89, color: COLORS.green });
  page.drawRectangle({ x: 0, y: 688, width: 8, height: 153.89, color: COLORS.gold });

  const logoDimensions = logo.scaleToFit(218, 42);
  page.drawImage(logo, {
    x: 42,
    y: 773,
    width: logoDimensions.width,
    height: logoDimensions.height,
  });
  page.drawText("BUSINESS CLARITY BEFORE BIGGER RISKS", {
    x: 42,
    y: 727,
    size: 8,
    font: bold,
    color: rgb(0.76, 0.83, 0.81),
    characterSpacing: 0.85,
  });

  page.drawText("PAYMENT RECEIPT", {
    x: 382,
    y: 790,
    size: 12,
    font: bold,
    color: COLORS.white,
  });
  page.drawText(receiptNumber, {
    x: 382,
    y: 768,
    size: fitText(regular, receiptNumber, 170, 8.5, 7),
    font: regular,
    color: rgb(0.76, 0.83, 0.81),
  });
  page.drawRectangle({ x: 480, y: 716, width: 73, height: 27, color: COLORS.gold });
  page.drawCircle({ x: 495, y: 729.5, size: 3, color: COLORS.green });
  page.drawText("PAID", { x: 505, y: 725.5, size: 9, font: bold, color: COLORS.ink });

  page.drawText("Payment received", {
    x: 42,
    y: 641,
    size: 23,
    font: bold,
    color: COLORS.ink,
  });
  page.drawText("Your registration is confirmed. Keep this receipt for your records.", {
    x: 42,
    y: 617,
    size: 10.5,
    font: regular,
    color: COLORS.muted,
  });

  page.drawRectangle({
    x: 398,
    y: 605,
    width: 155,
    height: 54,
    color: COLORS.goldSoft,
    borderColor: rgb(0.89, 0.81, 0.59),
    borderWidth: 0.7,
  });
  drawLabel(page, bold, "Total paid", 414, 644);
  page.drawText(amount, {
    x: 414,
    y: 618,
    size: fitText(bold, amount, 122, 16, 11),
    font: bold,
    color: COLORS.green,
  });

  page.drawRectangle({
    x: 42,
    y: 480,
    width: 246,
    height: 105,
    color: COLORS.white,
    borderColor: COLORS.line,
    borderWidth: 0.8,
    borderRadius: 5,
  });
  page.drawRectangle({
    x: 307,
    y: 480,
    width: 246,
    height: 105,
    color: COLORS.white,
    borderColor: COLORS.line,
    borderWidth: 0.8,
    borderRadius: 5,
  });

  drawLabel(page, bold, "Received from", 58, 560);
  const customerName = safeText(lead?.name, "DreamAndScale learner");
  page.drawText(customerName, {
    x: 58,
    y: 534,
    size: fitText(bold, customerName, 210, 15, 9),
    font: bold,
    color: COLORS.ink,
  });
  page.drawText(safeText(lead?.email), {
    x: 58,
    y: 512,
    size: fitText(regular, safeText(lead?.email), 210, 9.5, 7),
    font: regular,
    color: COLORS.muted,
  });
  page.drawText(safeText(lead?.phone), {
    x: 58,
    y: 494,
    size: 9.5,
    font: regular,
    color: COLORS.muted,
  });

  drawDetail(page, fonts, {
    label: "Payment date",
    value: paidAt,
    x: 323,
    y: 560,
    width: 205,
  });
  drawDetail(page, fonts, {
    label: "Currency",
    value: payment?.currency || payment?.expected_currency || program.currency,
    x: 323,
    y: 514,
    width: 205,
  });

  page.drawRectangle({
    x: 42,
    y: 306,
    width: 511,
    height: 139,
    color: COLORS.white,
    borderColor: COLORS.line,
    borderWidth: 0.8,
    borderRadius: 5,
  });
  page.drawRectangle({ x: 42, y: 409, width: 511, height: 36, color: COLORS.greenSoft });
  page.drawText("PROGRAM", { x: 58, y: 421, size: 8.5, font: bold, color: COLORS.green });
  page.drawText("AMOUNT PAID", { x: 440, y: 421, size: 8.5, font: bold, color: COLORS.green });
  page.drawText(program.title, {
    x: 58,
    y: 377,
    size: fitText(bold, program.title, 330, 15, 10),
    font: bold,
    color: COLORS.ink,
  });
  page.drawText(description, {
    x: 58,
    y: 355,
    size: fitText(regular, description, 330, 10, 8),
    font: regular,
    color: COLORS.muted,
  });
  page.drawText(amount, {
    x: 440,
    y: 376,
    size: fitText(bold, amount, 96, 13, 9),
    font: bold,
    color: COLORS.ink,
  });
  page.drawLine({ start: { x: 58, y: 333 }, end: { x: 537, y: 333 }, thickness: 0.7, color: COLORS.line });
  page.drawText("Payment status", { x: 371, y: 314, size: 9.5, font: regular, color: COLORS.muted });
  page.drawText("Paid", {
    x: 440,
    y: 313,
    size: fitText(bold, "Paid", 96, 12, 8.5),
    font: bold,
    color: COLORS.green,
  });

  page.drawText("TRANSACTION DETAILS", {
    x: 42,
    y: 272,
    size: 9,
    font: bold,
    color: COLORS.green,
    characterSpacing: 0.7,
  });
  drawDetail(page, fonts, {
    label: "Razorpay payment ID",
    value: payment?.razorpay_payment_id,
    x: 42,
    y: 244,
    width: 235,
  });
  drawDetail(page, fonts, {
    label: "Razorpay order ID",
    value: payment?.razorpay_order_id,
    x: 307,
    y: 244,
    width: 235,
  });
  drawDetail(page, fonts, {
    label: "Receipt number",
    value: receiptNumber,
    x: 42,
    y: 194,
    width: 235,
  });
  drawDetail(page, fonts, {
    label: "Payment status",
    value: "Paid",
    x: 307,
    y: 194,
    width: 235,
  });

  page.drawLine({ start: { x: 42, y: 157 }, end: { x: 553, y: 157 }, thickness: 0.8, color: COLORS.line });
  page.drawText("This system-generated document acknowledges payment and is not a tax invoice.", {
    x: 42,
    y: 137,
    size: 8.5,
    font: regular,
    color: COLORS.muted,
  });

  page.drawRectangle({ x: 0, y: 0, width: 595.28, height: 118, color: COLORS.green });
  const footerLogoDimensions = logo.scaleToFit(174, 30);
  page.drawImage(logo, {
    x: 42,
    y: 78,
    width: footerLogoDimensions.width,
    height: footerLogoDimensions.height,
  });
  addLinkAnnotation(pdf, page, links, {
    x: 42,
    y: 76,
    width: footerLogoDimensions.width,
    height: footerLogoDimensions.height + 4,
    url: "https://www.dreamandscale.com",
  });
  const taglineOne = "Build Business Clarity Before You Build a Business.";
  const taglineTwo = "Helping aspiring founders understand how businesses actually work.";
  page.drawText(taglineOne, {
    x: 42,
    y: 58,
    size: fitText(regular, taglineOne, 225, 7.5, 6.5),
    font: regular,
    color: rgb(0.76, 0.83, 0.81),
  });
  page.drawText(taglineTwo, {
    x: 42,
    y: 44,
    size: fitText(regular, taglineTwo, 225, 7.5, 6.5),
    font: regular,
    color: rgb(0.76, 0.83, 0.81),
  });
  page.drawText("dreamandscale.com", { x: 42, y: 21, size: 7.8, font: regular, color: COLORS.white });
  addLinkAnnotation(pdf, page, links, {
    x: 42,
    y: 18,
    width: regular.widthOfTextAtSize("dreamandscale.com", 7.8),
    height: 12,
    url: "https://www.dreamandscale.com",
  });

  page.drawText("FOLLOW DREAMANDSCALE", {
    x: 300,
    y: 91,
    size: 7.5,
    font: bold,
    color: rgb(0.76, 0.83, 0.81),
    characterSpacing: 0.65,
  });
  const socialSlots = [300, 360, 420, 480];
  SOCIAL_LINKS.forEach(({ label, url, path: iconPath }, index) => {
    const socialX = socialSlots[index];
    page.drawSvgPath(iconPath, {
      x: socialX,
      y: 69.5,
      scale: 0.4,
      color: COLORS.white,
    });
    const labelX = socialX + 13;
    page.drawText(label, { x: labelX, y: 62.5, size: 7.2, font: regular, color: COLORS.white });
    const width = regular.widthOfTextAtSize(label, 7.2);
    addLinkAnnotation(pdf, page, links, { x: socialX, y: 57, width: width + 13, height: 16, url });
  });
  page.drawText("Questions about this payment? Reply to your confirmation email.", {
    x: 300,
    y: 39,
    size: 7.6,
    font: regular,
    color: rgb(0.62, 0.71, 0.68),
  });
  page.drawText("© 2026 DreamAndScale. All rights reserved.", {
    x: 300,
    y: 20,
    size: 7.3,
    font: regular,
    color: rgb(0.62, 0.71, 0.68),
  });

  return {
    bytes: Buffer.from(await pdf.save()),
    receiptNumber,
    paidAt,
    amount,
  };
}
