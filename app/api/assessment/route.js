import { NextResponse } from "next/server";
import {
  assessmentQuestionBank,
  getAssessmentOption,
  getAssessmentQuestion,
  scoreAssessment,
} from "@/app/assessmentContent";
import { getClientIp, rateLimit } from "@/lib/rateLimit";
import { isSupabaseConfigured, supabaseAdmin } from "@/lib/supabaseAdmin";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[6-9]\d{9}$/;
const RATE_LIMIT = {
  limit: 10,
  windowMs: 60 * 1000,
};

function cleanString(value, maxLength) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function cleanPhone(value) {
  return cleanString(value, 20).replace(/\D/g, "").slice(0, 10);
}

function validationError() {
  return NextResponse.json(
    { success: false, message: "Please check your assessment details and try again." },
    { status: 400 }
  );
}

function rateLimitError() {
  return NextResponse.json(
    { success: false, message: "Too many assessment requests. Please try again later." },
    { status: 429 }
  );
}

function cleanAnswers(rawAnswers) {
  if (!rawAnswers || typeof rawAnswers !== "object" || Array.isArray(rawAnswers)) {
    return null;
  }

  const answers = {};
  const seenTopics = new Set();
  const answerEntries = Object.entries(rawAnswers);

  if (answerEntries.length !== assessmentQuestionBank.length) {
    return null;
  }

  for (const [questionId, value] of answerEntries) {
    const question = getAssessmentQuestion(questionId);
    const option = getAssessmentOption(questionId, value);

    if (!question || !option || seenTopics.has(question.topicId)) {
      return null;
    }

    seenTopics.add(question.topicId);
    answers[question.id] = option.id;
  }

  for (const topic of assessmentQuestionBank) {
    if (!seenTopics.has(topic.id)) {
      return null;
    }
  }

  return answers;
}

function buildAssessmentMessage({ report, answers }) {
  const categoryLines = report.categoryScores
    .map((category) => `- ${category.title}: ${category.rating} (${category.earned}/${category.max})`)
    .join("\n");
  const answerLines = assessmentQuestionBank
    .map((topic) => {
      const questionId = Object.keys(answers).find((answerId) => answerId.startsWith(`${topic.id}:`));
      const question = getAssessmentQuestion(questionId);

      if (!question) {
        return null;
      }

      const selectedOption = getAssessmentOption(questionId, answers[questionId]);
      const answerText = selectedOption ? selectedOption.label : `Answer score: ${answers[question.id]}`;

      return `- ${question.question}\n  ${answerText}`;
    })
    .filter(Boolean)
    .join("\n");

  return [
    "Business Readiness Assessment completed.",
    "",
    `Overall score: ${report.earned}/${report.max} (${report.percentage}%)`,
    `Readiness level: ${report.level}`,
    report.weakestCategory
      ? `Area needing most clarity: ${report.weakestCategory.title}`
      : "Area needing most clarity: No major clarity gap surfaced in this diagnostic.",
    "",
    "Category scores:",
    categoryLines,
    "",
    "Summary:",
    report.summary,
    "",
    "Important note:",
    report.note,
    "",
    "Recommended next step: Book the ₹199 Business Clarity Session to review assumptions, identify hidden gaps, and decide what to validate before taking bigger business risks.",
    "",
    "Answer log:",
    answerLines,
  ].join("\n");
}

export async function POST(request) {
  try {
    const clientIp = getClientIp(request);
    const rate = rateLimit({
      key: `assessment:${clientIp}`,
      ...RATE_LIMIT,
    });

    if (!rate.allowed) {
      return rateLimitError();
    }

    const body = await request.json();

    if (body?.website) {
      return NextResponse.json({ success: true });
    }

    const name = cleanString(body?.name, 80);
    const email = cleanString(body?.email, 120);
    const phone = cleanPhone(body?.phone);
    const role = cleanString(body?.role, 80);
    const source_page = cleanString(body?.source_page, 300);
    const answers = cleanAnswers(body?.answers);

    if (!name || !PHONE_PATTERN.test(phone) || !email || !EMAIL_PATTERN.test(email) || !role) {
      return validationError();
    }

    if (!answers) {
      return validationError();
    }

    const report = scoreAssessment(answers);

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        {
          success: false,
          message: "Assessment form is not connected yet. Please configure Supabase.",
        },
        { status: 503 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("leads")
      .insert({
        name,
        email,
        phone,
        role,
        interest: "clarity_session",
        message: buildAssessmentMessage({ report, answers }),
        source_page,
        status: "assessment_completed",
        payment_status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Assessment lead insert error:", error);
      return NextResponse.json(
        { success: false, message: "Could not save your assessment." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      lead_id: data?.id,
      report,
    });
  } catch (error) {
    console.error("Assessment API error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
