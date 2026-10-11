"use client";

import { useEffect, useState } from "react";
import { getClaritySession } from "../../lib/claritySchedule.mjs";

export default function ClaritySessionDate() {
  const [session, setSession] = useState(null);
  useEffect(() => {
    const refresh = () => {
      const next = getClaritySession();
      setSession(current => current?.dateTime === next.dateTime ? current : next);
    };
    refresh();
    const timer = setInterval(refresh, 1000);
    document.addEventListener("visibilitychange", refresh);
    return () => { clearInterval(timer); document.removeEventListener("visibilitychange", refresh); };
  }, []);
  return session ? <time dateTime={session.dateTime}>{session.label}</time> : <span>Second Sunday of every month · 10:30 AM IST</span>;
}
