import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

const EXPORT_LIMIT = 5000;

const resources = {
  leads: {
    table: "leads",
    searchFields: ["name", "email", "phone"],
    sortFields: new Set(["created_at", "name", "status", "payment_status", "interest"]),
    exportFields: [
      ["id", "Lead ID"],
      ["name", "Name"],
      ["email", "Email"],
      ["phone", "Phone"],
      ["role", "Profile"],
      ["interest", "Program"],
      ["status", "Lead Status"],
      ["payment_status", "Payment Status"],
      ["message", "Message"],
      ["source_page", "Source Page"],
      ["utm_source", "UTM Source"],
      ["utm_medium", "UTM Medium"],
      ["utm_campaign", "UTM Campaign"],
      ["created_at", "Created At"],
    ],
  },
  payments: {
    table: "payments",
    searchFields: ["razorpay_order_id", "razorpay_payment_id"],
    sortFields: new Set(["created_at", "amount", "status", "program_id"]),
    exportFields: [
      ["id", "Payment ID"],
      ["lead_id", "Lead ID"],
      ["lead_name", "Customer Name"],
      ["lead_email", "Customer Email"],
      ["lead_phone", "Customer Phone"],
      ["program_id", "Program"],
      ["amount", "Amount (paise)"],
      ["currency", "Currency"],
      ["status", "Status"],
      ["razorpay_order_id", "Razorpay Order ID"],
      ["razorpay_payment_id", "Razorpay Payment ID"],
      ["error_code", "Error Code"],
      ["error_description", "Error Description"],
      ["created_at", "Created At"],
      ["updated_at", "Updated At"],
    ],
  },
  queries: {
    table: "queries",
    searchFields: ["name", "email", "phone", "question"],
    sortFields: new Set(["created_at", "name", "status", "help_category"]),
    exportFields: [
      ["id", "Query ID"],
      ["name", "Name"],
      ["email", "Email"],
      ["phone", "Phone"],
      ["help_category", "Category"],
      ["status", "Status"],
      ["question", "Message"],
      ["source_page", "Source Page"],
      ["created_at", "Created At"],
    ],
  },
  emails: {
    table: "email_logs",
    searchFields: ["recipient", "subject", "provider_message_id"],
    sortFields: new Set(["created_at", "scheduled_for", "sent_at", "status", "email_type", "program_id"]),
    exportFields: [
      ["id", "Email Log ID"],
      ["lead_id", "Lead ID"],
      ["lead_name", "Customer Name"],
      ["lead_phone", "Customer Phone"],
      ["recipient", "Recipient"],
      ["program_id", "Program"],
      ["email_type", "Email Type"],
      ["subject", "Subject"],
      ["status", "Status"],
      ["provider_message_id", "Resend Email ID"],
      ["scheduled_for", "Scheduled For"],
      ["sent_at", "Sent At"],
      ["error_message", "Error"],
      ["created_at", "Created At"],
      ["updated_at", "Updated At"],
    ],
  },
};

function unauthorized() {
  const response = NextResponse.json({ success: false, message: "Admin login required." }, { status: 401 });
  response.headers.set("Cache-Control", "no-store");
  return response;
}

function cleanFilter(value, maxLength = 80) {
  if (typeof value !== "string") return "";
  return value
    .trim()
    .slice(0, maxLength)
    .replace(/[^\p{L}\p{N}\s@._+\-]/gu, "");
}

function clampNumber(value, minimum, maximum, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? Math.min(maximum, Math.max(minimum, parsed)) : fallback;
}

async function getOverview() {
  const count = async (table, column, value) => {
    let query = supabaseAdmin.from(table).select("*", { count: "exact", head: true });
    if (column && value) query = query.eq(column, value);
    const result = await query;
    if (result.error) throw result.error;
    return result.count || 0;
  };

  const optionalCount = async (table) => {
    try {
      return await count(table);
    } catch (error) {
      console.warn(`Optional admin count unavailable for ${table}:`, error?.message || error);
      return 0;
    }
  };

  const [totalLeads, paidLeads, totalPayments, newQueries, totalEmails] = await Promise.all([
    count("leads"),
    count("leads", "payment_status", "success"),
    count("payments"),
    count("queries", "status", "new"),
    optionalCount("email_logs"),
  ]);

  return { totalLeads, paidLeads, totalPayments, newQueries, totalEmails };
}

async function findRelatedLeadIds(search) {
  if (!search) return [];
  const expression = ["name", "email", "phone"]
    .map((field) => `${field}.ilike.%${search}%`)
    .join(",");
  const { data, error } = await supabaseAdmin.from("leads").select("id").or(expression).limit(200);
  if (error) throw error;
  return (data || []).map((row) => row.id).filter(Boolean);
}

function applyFilters(query, resource, params, paymentLeadIds) {
  const config = resources[resource];
  const search = cleanFilter(params.get("search"), 120);
  const status = cleanFilter(params.get("status"));
  const program = cleanFilter(params.get("program"));
  const paymentStatus = cleanFilter(params.get("paymentStatus"));
  const category = cleanFilter(params.get("category"));
  const emailType = cleanFilter(params.get("emailType"));
  const dateFrom = cleanFilter(params.get("dateFrom"), 10);
  const dateTo = cleanFilter(params.get("dateTo"), 10);

  if (search) {
    const expressions = config.searchFields.map((field) => `${field}.ilike.%${search}%`);
    if (["payments", "emails"].includes(resource) && paymentLeadIds.length) {
      expressions.push(`lead_id.in.(${paymentLeadIds.join(",")})`);
    }
    query = query.or(expressions.join(","));
  }

  if (status) query = query.eq("status", status);
  if (program && resource === "leads") query = query.eq("interest", program);
  if (program && resource === "payments") query = query.eq("program_id", program);
  if (program && resource === "emails") query = query.eq("program_id", program);
  if (paymentStatus && resource === "leads") query = query.eq("payment_status", paymentStatus);
  if (category && resource === "queries") query = query.eq("help_category", category);
  if (emailType && resource === "emails") query = query.eq("email_type", emailType);
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateFrom)) query = query.gte("created_at", `${dateFrom}T00:00:00.000Z`);
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateTo)) query = query.lte("created_at", `${dateTo}T23:59:59.999Z`);

  return query;
}

function sanitizeRow(resource, row) {
  if (resource === "leads") {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      role: row.role,
      interest: row.interest,
      message: row.message,
      source_page: row.source_page,
      utm_source: row.utm_source,
      utm_medium: row.utm_medium,
      utm_campaign: row.utm_campaign,
      status: row.status,
      payment_status: row.payment_status,
      created_at: row.created_at,
    };
  }

  if (resource === "payments") {
    return {
      id: row.id,
      lead_id: row.lead_id,
      lead_name: row.lead_name,
      lead_email: row.lead_email,
      lead_phone: row.lead_phone,
      program_id: row.program_id,
      amount: row.amount,
      currency: row.currency,
      status: row.status,
      razorpay_order_id: row.razorpay_order_id,
      razorpay_payment_id: row.razorpay_payment_id,
      error_code: row.error_code,
      error_description: row.error_description,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  if (resource === "emails") {
    return {
      id: row.id,
      lead_id: row.lead_id,
      lead_name: row.lead_name,
      lead_phone: row.lead_phone,
      recipient: row.recipient,
      program_id: row.program_id,
      email_type: row.email_type,
      subject: row.subject,
      status: row.status,
      provider_message_id: row.provider_message_id,
      scheduled_for: row.scheduled_for,
      sent_at: row.sent_at,
      last_event_at: row.last_event_at,
      error_message: row.error_message,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    help_category: row.help_category,
    question: row.question,
    source_page: row.source_page,
    status: row.status,
    created_at: row.created_at,
  };
}

async function attachLeadDetails(rows) {
  const leadIds = [...new Set(rows.map((row) => row.lead_id).filter(Boolean))];
  if (!leadIds.length) return rows;

  const { data, error } = await supabaseAdmin
    .from("leads")
    .select("id,name,email,phone")
    .in("id", leadIds);
  if (error) throw error;

  const leads = new Map((data || []).map((lead) => [lead.id, lead]));
  return rows.map((row) => ({
    ...row,
    lead_name: leads.get(row.lead_id)?.name || "",
    lead_email: leads.get(row.lead_id)?.email || "",
    lead_phone: leads.get(row.lead_id)?.phone || "",
  }));
}

async function getRows(resource, params, isExport) {
  const config = resources[resource];
  const search = cleanFilter(params.get("search"), 120);
  const paymentLeadIds = ["payments", "emails"].includes(resource)
    ? await findRelatedLeadIds(search)
    : [];
  const page = clampNumber(params.get("page"), 1, 100000, 1);
  const pageSize = clampNumber(params.get("pageSize"), 10, 100, 25);
  const sortByParam = cleanFilter(params.get("sortBy"));
  const sortBy = config.sortFields.has(sortByParam) ? sortByParam : "created_at";
  const ascending = params.get("sortDir") === "asc";

  let query = isExport
    ? supabaseAdmin.from(config.table).select("*")
    : supabaseAdmin.from(config.table).select("*", { count: "exact" });
  query = applyFilters(query, resource, params, paymentLeadIds);
  query = query.order(sortBy, { ascending, nullsFirst: false });

  if (isExport) {
    query = query.range(0, EXPORT_LIMIT - 1);
  } else {
    const from = (page - 1) * pageSize;
    query = query.range(from, from + pageSize - 1);
  }

  const { data, error, count } = await query;
  if (error) throw error;

  const hydrated = ["payments", "emails"].includes(resource)
    ? await attachLeadDetails(data || [])
    : data || [];
  return {
    rows: hydrated.map((row) => sanitizeRow(resource, row)),
    total: count || 0,
    page,
    pageSize,
    sortBy,
    sortDir: ascending ? "asc" : "desc",
  };
}

function csvCell(value) {
  let text = value == null ? "" : String(value);
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

function createCsv(resource, rows) {
  const fields = resources[resource].exportFields;
  return [
    fields.map(([, label]) => csvCell(label)).join(","),
    ...rows.map((row) => fields.map(([key]) => csvCell(row[key])).join(",")),
  ].join("\r\n");
}

export async function GET(request) {
  if (!getAdminSession(request)) return unauthorized();

  try {
    const params = request.nextUrl.searchParams;
    const resource = params.get("resource") || "leads";

    if (resource === "overview") {
      const response = NextResponse.json({ success: true, overview: await getOverview() });
      response.headers.set("Cache-Control", "no-store");
      return response;
    }

    if (!resources[resource]) {
      return NextResponse.json({ success: false, message: "Unknown admin resource." }, { status: 400 });
    }

    const isExport = params.get("format") === "csv";
    const result = await getRows(resource, params, isExport);

    if (isExport) {
      return new Response(createCsv(resource, result.rows), {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="dreamandscale-${resource}-${new Date()
            .toISOString()
            .slice(0, 10)}.csv"`,
          "Cache-Control": "no-store",
          "X-Export-Limit": String(EXPORT_LIMIT),
        },
      });
    }

    const response = NextResponse.json({ success: true, ...result });
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.error("Admin data API error:", error);
    return NextResponse.json(
      { success: false, message: "Could not load admin data." },
      { status: 500 }
    );
  }
}
