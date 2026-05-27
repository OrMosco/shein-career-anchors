const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const isAnalyticsEnabled = () =>
  typeof window !== "undefined" && typeof document !== "undefined" && Boolean(measurementId);

export const initializeAnalytics = () => {
  if (!isAnalyticsEnabled()) {
    return;
  }

  if (document.querySelector(`script[data-analytics="ga-script"]`)) {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.dataset.analytics = "ga-script";
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || ((...args: unknown[]) => {
    window.dataLayer.push(args);
  });
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { send_page_view: false });
};

export const trackPageView = (pagePath: string) => {
  if (!isAnalyticsEnabled() || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "page_view", {
    page_path: pagePath,
    page_location: window.location.href,
    page_title: document.title,
  });
};
