// Advance the advertised session at 00:00 IST on the second Saturday.
export function getClaritySession(now = new Date()) {
  const novemberSession = new Date("2026-11-22T05:30:00.000Z");
  if (now < novemberSession) {
    return {
      dateTime: novemberSession.toISOString(),
      label: "22 November 2026 · 11:00 AM IST",
    };
  }

  const indiaNow = new Date(now.getTime() + 330 * 60 * 1000);
  let year = indiaNow.getUTCFullYear();
  let month = indiaNow.getUTCMonth();
  const secondWeekday = (y, m, weekday) => 8 + ((weekday - new Date(Date.UTC(y, m, 1)).getUTCDay() + 7) % 7);
  if (indiaNow.getUTCDate() >= secondWeekday(year, month, 6)) {
    month += 1;
  }
  const day = secondWeekday(year, month, 0);
  // 10:30 IST is 05:00 UTC.
  const date = new Date(Date.UTC(year, month, day, 5));
  return {
    dateTime: date.toISOString(),
    label: `${new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" }).format(date)} · 10:30 AM IST`,
  };
}
