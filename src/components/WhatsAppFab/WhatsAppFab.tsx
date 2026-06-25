"use client";

import { BRAND_CONTACT } from "@/design-system";
import { trackWhatsAppConversion } from "@/lib/analytics";
import { useTranslations } from "next-intl";
import React, { type FC } from "react";
import { MessageCircle } from "react-feather";

const WhatsAppFab: FC = () => {
  const t = useTranslations("home.whatsappFab");

  return (
    <a
      href={BRAND_CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("ariaLabel")}
      onClick={() => {
        trackWhatsAppConversion();
      }}
      className="focus-brand fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-green text-brand-cream shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 md:hidden">
      <MessageCircle size={26} aria-hidden="true" />
      <span className="sr-only">{t("label")}</span>
    </a>
  );
};

export default WhatsAppFab;
