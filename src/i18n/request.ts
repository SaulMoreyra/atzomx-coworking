import { getUserLocale } from "@/services/locale";
import { getRequestConfig } from "next-intl/server";

const namespaces = ["home", "menu"];

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await getUserLocale();

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
