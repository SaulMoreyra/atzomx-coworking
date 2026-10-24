import { pickMessages } from "@/i18n/pick-messages";
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import React, { type ReactNode } from "react";

interface IntlMessagesProps {
  namespaces?: readonly string[];
  children: ReactNode;
}

export const SHARED_CLIENT_MESSAGES = ["home.header", "home.whatsappFab"] as const;

const IntlMessages = ({ namespaces, children }: IntlMessagesProps) => {
  const locale = useLocale();
  const messages = useMessages();

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={namespaces ? pickMessages(messages, namespaces) : messages}>
      {children}
    </NextIntlClientProvider>
  );
};

export default IntlMessages;
