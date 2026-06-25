"use client";

import { useTranslations } from "next-intl";
import React from "react";

const BENEFIT_KEYS = ["wifi", "plans", "coffee", "chairs", "feedback"] as const;

const ServiceBenefits = () => {
  const t = useTranslations("home.benefits");

  return (
    <div className="min-w-0 w-full">
      <p className="text-label mb-4 text-[10px] tracking-[0.2em] text-brand-green/45 md:text-xs">{t("sectionTitle")}</p>
      <ul className="divide-y divide-brand-green border-y border-brand-green" role="list">
        {BENEFIT_KEYS.map(key => (
          <li key={key} className="grid gap-2 py-5 md:grid-cols-[6.5rem_minmax(0,1fr)] md:gap-6 md:py-6">
            <h3 className="text-label text-[10px] tracking-[0.14em] text-brand-green md:text-xs">{t(`${key}.title`)}</h3>
            <p className="text-body text-sm leading-relaxed text-brand-green/75 md:text-base">{t(`${key}.description`)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceBenefits;
