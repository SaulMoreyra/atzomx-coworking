import { getRequestConfig } from "next-intl/server";

const namespaces = ["home"];

export default getRequestConfig(async ({ requestLocale }) => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = "en";

  const messages = await Promise.all(
    namespaces.map(
      async namespace =>
        await import(`../../messages/${locale}/${namespace}.json`)
    )
  );

  return {
    locale,
    messages: Object.fromEntries(
      namespaces.map((namespace, index) => [namespace, messages[index].default])
    ),
  };
});
