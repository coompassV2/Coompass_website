import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const MEASUREMENT_ID = (
  import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined
)?.trim();
const ENABLE_IN_DEV =
  (import.meta.env.VITE_GA_ENABLE_IN_DEV as string | undefined) === "true";
const TRACKING_ENABLED =
  Boolean(MEASUREMENT_ID) && (import.meta.env.PROD || ENABLE_IN_DEV);

function initGoogleAnalytics(measurementId: string) {
  const scriptId = `gtag-js-${measurementId}`;
  if (!document.getElementById(scriptId)) {
    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };

  const initKey = `__ga_initialized_${measurementId}`;
  const globalState = window as Window & Record<string, unknown>;
  if (!globalState[initKey]) {
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      send_page_view: false,
      anonymize_ip: true,
    });
    globalState[initKey] = true;
  }
}

export function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (!TRACKING_ENABLED || !MEASUREMENT_ID) return;
    initGoogleAnalytics(MEASUREMENT_ID);
  }, []);

  useEffect(() => {
    if (!TRACKING_ENABLED || typeof window.gtag !== "function") return;

    const pagePath = `${location.pathname}${location.search}${location.hash}`;
    window.gtag("event", "page_view", {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location.pathname, location.search, location.hash]);

  return null;
}
