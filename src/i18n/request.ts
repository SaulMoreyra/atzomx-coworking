import { getUserLocale } from "@/services/locale";
import type { AbstractIntlMessages } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { defaultLocale, type Locale } from "./config";

const namespaces = [
  "home",
  "menu",
  "blog",
  "remoteWork",
  "alrededor",
  "tour",
  "admin",
];

type Messages = AbstractIntlMessages;

const isPlainObject = (value: unknown): value is Messages =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/** Fills keys missing in `messages` with the ones from `fallback`, recursively */
function mergeWithFallback(fallback: Messages, messages: Messages): Messages {
  const merged: Messages = { ...fallback };
  for (const [key, value] of Object.entries(messages)) {
    merged[key] =
      isPlainObject(value) && isPlainObject(fallback[key])
        ? mergeWithFallback(fallback[key], value)
        : value;
  }
  return merged;
}

async function loadNamespace(
  locale: Locale,
  namespace: string
): Promise<Messages | null> {
  try {
    return (await import(`../../messages/${locale}/${namespace}.json`)).default;
  } catch {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `[i18n] Missing messages/${locale}/${namespace}.json — falling back to "${defaultLocale}"`
      );
    }
    return null;
  }
}

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  const messages = await Promise.all(
    namespaces.map(async namespace => {
      const fallback = await loadNamespace(defaultLocale, namespace);
      if (locale === defaultLocale) return fallback ?? {};

      const localized = await loadNamespace(locale, namespace);
      if (localized === null) return fallback ?? {};
      return fallback === null
        ? localized
        : mergeWithFallback(fallback, localized);
    })
  );

  return {
    locale,
    messages: Object.fromEntries(
      namespaces.map((namespace, index) => [namespace, messages[index]])
    ),
  };
});
