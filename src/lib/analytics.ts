export const WHATSAPP_CONVERSION_SEND_TO = "AW-16900625108/TrwICJDbkoUbENSl7Po-";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Fire Google Ads conversion — call only on intentional WhatsApp / booking clicks */
export const trackWhatsAppConversion = () => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", "conversion", {
    send_to: WHATSAPP_CONVERSION_SEND_TO,
  });
};
