"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { isViewerPage } from "@/lib/viewerActivity";
import styles from "./ViewerActivity.module.css";

const HEARTBEAT_MS = 25_000;

export default function ViewerActivity({ enabled }) {
  const pathname = usePathname();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    if (!enabled || !isViewerPage(pathname)) return;
    let cancelled = false;

    async function update() {
      if (document.visibilityState !== "visible") return;
      try {
        const response = await fetch("/api/viewer-activity", {
          method: "POST",
          credentials: "same-origin",
          cache: "no-store",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pageKey: pathname }),
        });
        if (!response.ok) throw new Error("Viewer activity unavailable");
        const result = await response.json();
        if (!cancelled) setActivity(result);
      } catch {
        if (!cancelled) setActivity(null);
      }
    }

    setActivity(null);
    update();
    const timer = window.setInterval(update, HEARTBEAT_MS);
    document.addEventListener("visibilitychange", update);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", update);
    };
  }, [enabled, pathname]);

  if (!enabled || !isViewerPage(pathname) || !activity) return null;

  return (
    <aside className={styles.indicator} aria-label="Estimated site activity">
      <span className={styles.dot} aria-hidden="true" />
      <span>
        <strong>Estimated activity: {activity.estimatedActivity}</strong>
        <small>Simulated baseline {activity.simulatedBaseline} + {activity.activeBrowsers} active {activity.activeBrowsers === 1 ? "browser" : "browsers"} on this page.</small>
      </span>
    </aside>
  );
}
