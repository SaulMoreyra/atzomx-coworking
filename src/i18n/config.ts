export type Locale = (typeof locales)[number];

export const locales = ["es", "en", "fr", "de"] as const;
export const defaultLocale: Locale = "es";

/** Native language names — add an entry when extending `locales` */
export const localeLabels = {
  es: { name: "Español", short: "ES" },
  en: { name: "English", short: "EN" },
  fr: { name: "Français", short: "FR" },
  de: { name: "Deutsch", short: "DE" },
} as const satisfies Record<Locale, { name: string; short: string }>;

/** Segmented pill UI up to this count; beyond that, use the compact popover menu */
export const LOCALE_SEGMENTED_MAX = 3;

export function isLocale(value: string | undefined | null): value is Locale {
  return locales.includes(value as Locale);
}
