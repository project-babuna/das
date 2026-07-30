"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./AdminDashboard.module.css";

const resourceLabels = {
  leads: "Leads",
  payments: "Payments",
  queries: "Queries",
  emails: "Email activity",
};

const programLabels = {
  clarity_session: "Clarity Session",
  full_program: "Full Program",
  mentorship: "DreamAndScale Plus",
};

const initialFilters = {
  search: "",
  status: "all",
  program: "all",
  paymentStatus: "all",
  category: "all",
  emailType: "all",
  dateFrom: "",
  dateTo: "",
};

const statusOptions = {
  leads: ["registered", "assessment_completed", "paid"],
  payments: ["created", "success", "failed", "signature_failed"],
  queries: ["new", "in_progress", "resolved", "closed"],
  emails: [
    "processing",
    "scheduled",
    "sent",
    "delivered",
    "opened",
    "clicked",
    "delivery_delayed",
    "failed",
    "bounced",
    "suppressed",
    "complained",
    "canceled",
  ],
};

const emailTypeOptions = ["payment_success", "payment_reminder_12h"];

const categoryOptions = [
  "General enquiries",
  "Program and mentorship support",
  "Payment and registration help",
  "Want to be a knowledge partner",
];

function titleCase(value) {
  if (!value) return "—";
  return String(value)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatCurrency(amount, currency = "INR") {
  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount)) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency || "INR",
    maximumFractionDigits: 0,
  }).format(numericAmount / 100);
}

function truncate(value, length = 72) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  return text.length > length ? `${text.slice(0, length).trim()}…` : text || "—";
}

function Status({ value }) {
  const normalized = String(value || "unknown").toLowerCase();
  const tone = ["success", "paid", "resolved", "sent", "delivered", "opened", "clicked"].includes(normalized)
    ? styles.statusSuccess
    : ["failed", "signature_failed", "closed", "bounced", "suppressed", "complained"].includes(normalized)
      ? styles.statusDanger
      : ["created", "pending", "new", "registered", "processing", "scheduled", "delivery_delayed"].includes(normalized)
        ? styles.statusPending
        : styles.statusNeutral;

  return <span className={`${styles.status} ${tone}`}>{titleCase(value)}</span>;
}

function SortHeader({ label, field, sortBy, sortDir, onSort }) {
  const active = sortBy === field;
  return (
    <button className={styles.sortButton} type="button" onClick={() => onSort(field)}>
      <span>{label}</span>
      <span aria-hidden="true">{active ? (sortDir === "asc" ? "↑" : "↓") : "↕"}</span>
    </button>
  );
}

function Login({ configured, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Login failed.");
      onSuccess(email);
    } catch (loginError) {
      setError(loginError.message || "Login failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className={styles.loginPage}>
      <section className={styles.loginShell}>
        <div className={styles.loginBrand}>
          <img src="/brand/logo-light.png" alt="DreamAndScale" />
          <p>Admin Operations</p>
          <h1>Business data, clearly organized.</h1>
          <span>Secure access to registrations, payments, customer queries, and email activity.</span>
        </div>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div>
            <p className={styles.kicker}>Protected workspace</p>
            <h2>Admin login</h2>
            <p>Use your DreamAndScale administrator credentials.</p>
          </div>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="username"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          {!configured && (
            <p className={styles.configNotice}>
              Add the three ADMIN environment variables before signing in.
            </p>
          )}
          {error && <p className={styles.formError}>{error}</p>}
          <button
            className={styles.primaryButton}
            type="submit"
            disabled={submitting || !email.trim() || !password}
          >
            {submitting ? "Signing in…" : "Sign in securely"}
          </button>
        </form>
      </section>
    </main>
  );
}

function DetailDrawer({ resource, row, onClose }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const labels = {
    id: "Record ID",
    lead_id: "Lead ID",
    name: "Name",
    lead_name: "Customer",
    email: "Email",
    lead_email: "Customer email",
    phone: "Phone",
    lead_phone: "Customer phone",
    role: "Profile",
    interest: "Program",
    program_id: "Program",
    status: "Status",
    payment_status: "Payment status",
    amount: "Amount",
    currency: "Currency",
    razorpay_order_id: "Razorpay order ID",
    razorpay_payment_id: "Razorpay payment ID",
    error_code: "Error code",
    error_description: "Error description",
    recipient: "Recipient",
    email_type: "Email type",
    subject: "Subject",
    provider_message_id: "Resend email ID",
    scheduled_for: "Scheduled for",
    sent_at: "Sent",
    last_event_at: "Last delivery event",
    error_message: "Delivery error",
    help_category: "Category",
    message: "Lead notes",
    question: "Message",
    source_page: "Source page",
    utm_source: "UTM source",
    utm_medium: "UTM medium",
    utm_campaign: "UTM campaign",
    created_at: "Created",
    updated_at: "Updated",
  };

  function displayValue(key, value) {
    if (key === "amount") return formatCurrency(value, row.currency);
    if (key.endsWith("_at") || key === "scheduled_for") return formatDate(value);
    if (["interest", "program_id"].includes(key)) return programLabels[value] || titleCase(value);
    return value == null || value === "" ? "—" : String(value);
  }

  return (
    <div className={styles.drawerBackdrop} role="presentation" onMouseDown={onClose}>
      <aside
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-labelledby="record-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className={styles.drawerHeader}>
          <div>
            <p className={styles.kicker}>{resourceLabels[resource]} record</p>
            <h2 id="record-title">{row.name || row.lead_name || titleCase(row.status)}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close record details">×</button>
        </header>
        <div className={styles.drawerBody}>
          {Object.entries(row).map(([key, value]) =>
            labels[key] ? (
              <div className={styles.detailField} key={key}>
                <span>{labels[key]}</span>
                <p>{displayValue(key, value)}</p>
              </div>
            ) : null
          )}
        </div>
      </aside>
    </div>
  );
}

export default function AdminDashboard() {
  const [auth, setAuth] = useState({ state: "loading", configured: true, email: "" });
  const [resource, setResource] = useState("leads");
  const [rows, setRows] = useState([]);
  const [overview, setOverview] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortDir, setSortDir] = useState("desc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const buildParams = useCallback(
    (extra = {}) => {
      const params = new URLSearchParams({
        resource,
        page: String(page),
        pageSize: String(pageSize),
        sortBy,
        sortDir,
      });
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "all") params.set(key, value);
      });
      Object.entries(extra).forEach(([key, value]) => params.set(key, value));
      return params;
    },
    [filters, page, pageSize, resource, sortBy, sortDir]
  );

  const loadOverview = useCallback(async () => {
    const response = await fetch("/api/admin/data?resource=overview", { cache: "no-store" });
    if (response.status === 401) {
      setAuth((current) => ({ ...current, state: "guest" }));
      return;
    }
    const result = await response.json();
    if (response.ok) setOverview(result.overview);
  }, []);

  useEffect(() => {
    fetch("/api/admin/session", { cache: "no-store" })
      .then((response) => response.json())
      .then((result) =>
        setAuth({
          state: result.authenticated ? "authenticated" : "guest",
          configured: result.configured,
          email: result.email || "",
        })
      )
      .catch(() => setAuth({ state: "guest", configured: true, email: "" }));
  }, []);

  useEffect(() => {
    if (auth.state !== "authenticated") return undefined;
    loadOverview();
    return undefined;
  }, [auth.state, loadOverview, refreshKey]);

  useEffect(() => {
    if (auth.state !== "authenticated") return undefined;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError("");
      setRows([]);
      try {
        const response = await fetch(`/api/admin/data?${buildParams()}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (response.status === 401) {
          setAuth((current) => ({ ...current, state: "guest" }));
          return;
        }
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Could not load data.");
        setRows(result.rows || []);
        setTotal(result.total || 0);
      } catch (loadError) {
        if (loadError.name !== "AbortError") {
          setRows([]);
          setTotal(0);
          setError(loadError.message || "Could not load data.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, filters.search ? 300 : 0);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [auth.state, buildParams, filters.search, refreshKey]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const firstRecord = total ? (page - 1) * pageSize + 1 : 0;
  const lastRecord = Math.min(page * pageSize, total);
  const exportHref = useMemo(
    () => `/api/admin/data?${buildParams({ format: "csv" })}`,
    [buildParams]
  );

  function handleAuthenticated(email) {
    setAuth({ state: "authenticated", configured: true, email });
  }

  function changeResource(nextResource) {
    setResource(nextResource);
    setFilters(initialFilters);
    setPage(1);
    setSortBy("created_at");
    setSortDir("desc");
    setSelectedRow(null);
  }

  function updateFilter(key, value) {
    setFilters((current) => ({ ...current, [key]: value }));
    setPage(1);
  }

  function handleSort(field) {
    if (sortBy === field) setSortDir((direction) => (direction === "asc" ? "desc" : "asc"));
    else {
      setSortBy(field);
      setSortDir("asc");
    }
    setPage(1);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuth({ state: "guest", configured: true, email: "" });
    setRows([]);
    setOverview(null);
  }

  if (auth.state === "loading") {
    return <main className={styles.loadingPage}><span>Loading secure workspace…</span></main>;
  }

  if (auth.state !== "authenticated") {
    return <Login configured={auth.configured} onSuccess={handleAuthenticated} />;
  }

  return (
    <main className={styles.adminPage}>
      <header className={styles.topbar}>
        <div className={styles.topbarBrand}>
          <img src="/brand/logo-light.png" alt="DreamAndScale" />
          <span>Admin</span>
        </div>
        <div className={styles.adminIdentity}>
          <span>{auth.email}</span>
          <button type="button" onClick={logout}>Sign out</button>
        </div>
      </header>

      <div className={styles.workspace}>
        <aside className={styles.sidebar}>
          <div>
            <p className={styles.sidebarLabel}>Workspace</p>
            <nav aria-label="Admin sections">
              {Object.entries(resourceLabels).map(([key, label]) => (
                <button
                  className={resource === key ? styles.navActive : ""}
                  type="button"
                  key={key}
                  onClick={() => changeResource(key)}
                >
                  <span>{label}</span>
                  <span aria-hidden="true">›</span>
                </button>
              ))}
            </nav>
          </div>
          <a href="/" target="_blank" rel="noreferrer">View website ↗</a>
        </aside>

        <section className={styles.content}>
          <div className={styles.pageHeader}>
            <div>
              <p className={styles.kicker}>Operations dashboard</p>
              <h1>{resourceLabels[resource]}</h1>
              <p>Review, filter, and export DreamAndScale customer records.</p>
            </div>
            <div className={styles.headerActions}>
              <button type="button" onClick={() => setRefreshKey((key) => key + 1)}>Refresh</button>
              <a className={styles.exportButton} href={exportHref}>Export CSV</a>
            </div>
          </div>

          <div className={styles.metrics}>
            <article><span>Total leads</span><strong>{overview?.totalLeads ?? "—"}</strong></article>
            <article><span>Paid registrations</span><strong>{overview?.paidLeads ?? "—"}</strong></article>
            <article><span>Payment records</span><strong>{overview?.totalPayments ?? "—"}</strong></article>
            <article><span>New queries</span><strong>{overview?.newQueries ?? "—"}</strong></article>
            <article><span>Email records</span><strong>{overview?.totalEmails ?? "—"}</strong></article>
          </div>

          <section className={styles.dataPanel}>
            <div className={styles.filters}>
              <label className={styles.searchField}>
                <span>Search</span>
                <input
                  type="search"
                  value={filters.search}
                  placeholder={
                    resource === "payments"
                      ? "Customer, order or payment ID"
                      : resource === "emails"
                        ? "Customer, recipient, subject or Resend ID"
                        : "Name, email, phone or message"
                  }
                  onChange={(event) => updateFilter("search", event.target.value)}
                />
              </label>
              <label>
                <span>{resource === "emails" ? "Delivery status" : "Status"}</span>
                <select value={filters.status} onChange={(event) => updateFilter("status", event.target.value)}>
                  <option value="all">All {resource === "emails" ? "delivery statuses" : "statuses"}</option>
                  {statusOptions[resource].map((status) => <option key={status} value={status}>{titleCase(status)}</option>)}
                </select>
              </label>
              {["leads", "payments", "emails"].includes(resource) && (
                <label>
                  <span>Program</span>
                  <select value={filters.program} onChange={(event) => updateFilter("program", event.target.value)}>
                    <option value="all">All programs</option>
                    {Object.entries(programLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
                  </select>
                </label>
              )}
              {resource === "leads" && (
                <label>
                  <span>Payment</span>
                  <select value={filters.paymentStatus} onChange={(event) => updateFilter("paymentStatus", event.target.value)}>
                    <option value="all">All payments</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                    <option value="success">Successful</option>
                  </select>
                </label>
              )}
              {resource === "queries" && (
                <label>
                  <span>Category</span>
                  <select value={filters.category} onChange={(event) => updateFilter("category", event.target.value)}>
                    <option value="all">All categories</option>
                    {categoryOptions.map((category) => <option key={category} value={category}>{category}</option>)}
                  </select>
                </label>
              )}
              {resource === "emails" && (
                <label>
                  <span>Email message</span>
                  <select value={filters.emailType} onChange={(event) => updateFilter("emailType", event.target.value)}>
                    <option value="all">All email messages</option>
                    {emailTypeOptions.map((type) => <option key={type} value={type}>{titleCase(type)}</option>)}
                  </select>
                </label>
              )}
              <label>
                <span>From</span>
                <input type="date" value={filters.dateFrom} onChange={(event) => updateFilter("dateFrom", event.target.value)} />
              </label>
              <label>
                <span>To</span>
                <input type="date" value={filters.dateTo} onChange={(event) => updateFilter("dateTo", event.target.value)} />
              </label>
              <button
                className={styles.clearButton}
                type="button"
                onClick={() => { setFilters(initialFilters); setPage(1); }}
              >
                Clear filters
              </button>
            </div>

            {error && <div className={styles.dataError}>{error}</div>}

            <div className={styles.tableWrap} aria-busy={loading}>
              <table>
                <thead>
                  {resource === "leads" && (
                    <tr>
                      <th><SortHeader label="Lead" field="name" sortBy={sortBy} sortDir={sortDir} onSort={handleSort} /></th>
                      <th>Contact</th>
                      <th><SortHeader label="Program" field="interest" sortBy={sortBy} sortDir={sortDir} onSort={handleSort} /></th>
                      <th><SortHeader label="Lead status" field="status" sortBy={sortBy} sortDir={sortDir} onSort={handleSort} /></th>
                      <th><SortHeader label="Payment" field="payment_status" sortBy={sortBy} sortDir={sortDir} onSort={handleSort} /></th>
                      <th>Source</th>
                      <th><SortHeader label="Created" field="created_at" sortBy={sortBy} sortDir={sortDir} onSort={handleSort} /></th>
                      <th><span className="sr-only">Actions</span></th>
                    </tr>
                  )}
                  {resource === "payments" && (
                    <tr>
                      <th>Customer</th>
                      <th><SortHeader label="Program" field="program_id" sortBy={sortBy} sortDir={sortDir} onSort={handleSort} /></th>
                      <th><SortHeader label="Amount" field="amount" sortBy={sortBy} sortDir={sortDir} onSort={handleSort} /></th>
                      <th><SortHeader label="Status" field="status" sortBy={sortBy} sortDir={sortDir} onSort={handleSort} /></th>
                      <th>Order ID</th>
                      <th>Payment ID</th>
                      <th><SortHeader label="Created" field="created_at" sortBy={sortBy} sortDir={sortDir} onSort={handleSort} /></th>
                      <th><span className="sr-only">Actions</span></th>
                    </tr>
                  )}
                  {resource === "queries" && (
                    <tr>
                      <th><SortHeader label="Contact" field="name" sortBy={sortBy} sortDir={sortDir} onSort={handleSort} /></th>
                      <th>Category</th>
                      <th>Message</th>
                      <th><SortHeader label="Status" field="status" sortBy={sortBy} sortDir={sortDir} onSort={handleSort} /></th>
                      <th>Source</th>
                      <th><SortHeader label="Created" field="created_at" sortBy={sortBy} sortDir={sortDir} onSort={handleSort} /></th>
                      <th><span className="sr-only">Actions</span></th>
                    </tr>
                  )}
                  {resource === "emails" && (
                    <tr>
                      <th>Customer</th>
                      <th><SortHeader label="Type" field="email_type" sortBy={sortBy} sortDir={sortDir} onSort={handleSort} /></th>
                      <th><SortHeader label="Program" field="program_id" sortBy={sortBy} sortDir={sortDir} onSort={handleSort} /></th>
                      <th>Subject</th>
                      <th><SortHeader label="Status" field="status" sortBy={sortBy} sortDir={sortDir} onSort={handleSort} /></th>
                      <th><SortHeader label="Scheduled" field="scheduled_for" sortBy={sortBy} sortDir={sortDir} onSort={handleSort} /></th>
                      <th><SortHeader label="Created" field="created_at" sortBy={sortBy} sortDir={sortDir} onSort={handleSort} /></th>
                      <th><span className="sr-only">Actions</span></th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  {!loading && rows.length === 0 && (
                    <tr><td className={styles.emptyState} colSpan="8">No records match these filters.</td></tr>
                  )}
                  {rows.map((row) => (
                    <tr key={row.id}>
                      {resource === "leads" && (
                        <>
                          <td><strong>{row.name || "—"}</strong><small>{titleCase(row.role)}</small></td>
                          <td><span>{row.email || "—"}</span><small>{row.phone || "—"}</small></td>
                          <td>{programLabels[row.interest] || titleCase(row.interest)}</td>
                          <td><Status value={row.status} /></td>
                          <td><Status value={row.payment_status} /></td>
                          <td title={row.source_page}>{truncate(row.source_page, 28)}</td>
                          <td>{formatDate(row.created_at)}</td>
                        </>
                      )}
                      {resource === "payments" && (
                        <>
                          <td><strong>{row.lead_name || "Unknown"}</strong><small>{row.lead_phone || row.lead_email || "—"}</small></td>
                          <td>{programLabels[row.program_id] || titleCase(row.program_id)}</td>
                          <td><strong>{formatCurrency(row.amount, row.currency)}</strong></td>
                          <td><Status value={row.status} /></td>
                          <td className={styles.mono}>{truncate(row.razorpay_order_id, 22)}</td>
                          <td className={styles.mono}>{truncate(row.razorpay_payment_id, 22)}</td>
                          <td>{formatDate(row.created_at)}</td>
                        </>
                      )}
                      {resource === "queries" && (
                        <>
                          <td><strong>{row.name || "—"}</strong><small>{row.phone || row.email || "—"}</small></td>
                          <td>{row.help_category || "General enquiry"}</td>
                          <td title={row.question}>{truncate(row.question)}</td>
                          <td><Status value={row.status} /></td>
                          <td title={row.source_page}>{truncate(row.source_page, 28)}</td>
                          <td>{formatDate(row.created_at)}</td>
                        </>
                      )}
                      {resource === "emails" && (
                        <>
                          <td><strong>{row.lead_name || "Unknown"}</strong><small>{row.recipient || row.lead_phone || "—"}</small></td>
                          <td>{titleCase(row.email_type)}</td>
                          <td>{programLabels[row.program_id] || titleCase(row.program_id)}</td>
                          <td title={row.subject}>{truncate(row.subject, 46)}</td>
                          <td><Status value={row.status} /></td>
                          <td>{formatDate(row.scheduled_for)}</td>
                          <td>{formatDate(row.created_at)}</td>
                        </>
                      )}
                      <td><button className={styles.viewButton} type="button" onClick={() => setSelectedRow(row)}>View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {loading && <div className={styles.tableLoading}>Loading records…</div>}
            </div>

            <footer className={styles.pagination}>
              <div>
                <span>Rows per page</span>
                <select value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1); }}>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
              </div>
              <p>{firstRecord}–{lastRecord} of {total}</p>
              <div className={styles.pageButtons}>
                <button type="button" disabled={page <= 1} onClick={() => setPage((current) => current - 1)}>Previous</button>
                <span>Page {page} of {totalPages}</span>
                <button type="button" disabled={page >= totalPages} onClick={() => setPage((current) => current + 1)}>Next</button>
              </div>
            </footer>
          </section>
        </section>
      </div>

      {selectedRow && <DetailDrawer resource={resource} row={selectedRow} onClose={() => setSelectedRow(null)} />}
    </main>
  );
}
