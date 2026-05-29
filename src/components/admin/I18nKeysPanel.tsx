"use client";

import { useTranslations } from "next-intl";
import React, { useMemo } from "react";

interface I18nKeysPanelProps {
  type: "MENU" | "PLAN";
  slug: string;
  categorySlug?: string;
}

const LOCALES_PLACEHOLDER = "{es,en,fr,de}";

export default function I18nKeysPanel({ type, slug, categorySlug }: I18nKeysPanelProps) {
  const t = useTranslations("admin.i18nPanel");

  const keys = useMemo(() => {
    if (type === "MENU" && categorySlug) {
      return [
        t("menuNameKey", { locales: LOCALES_PLACEHOLDER, categorySlug, slug }),
        t("menuDescriptionKey", { locales: LOCALES_PLACEHOLDER, categorySlug, slug }),
      ];
    }

    if (type === "PLAN") {
      return [
        t("planTitleKey", { locales: LOCALES_PLACEHOLDER, slug }),
        t("planDescriptionKey", { locales: LOCALES_PLACEHOLDER, slug }),
      ];
    }

    return [];
  }, [categorySlug, slug, t, type]);

  if (keys.length === 0) return null;

  return (
    <aside className="admin-i18n-panel p-4 md:p-5">
      <h2 className="text-label text-xs tracking-[0.14em] text-brand-green/70">{t("title")}</h2>
      <p className="text-body mt-2 text-sm text-brand-green/70">{t("description")}</p>
      <ul className="mt-3 space-y-2 font-mono text-xs leading-relaxed text-brand-green/80">
        {keys.map(key => (
          <li key={key} className="break-all">
            {key}
          </li>
        ))}
      </ul>
    </aside>
  );
}
