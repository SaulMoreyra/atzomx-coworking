"use client";

import Label from "@/components/ui/Label/Label";
import HighlightShape from "@/components/ui/HighlightShape/HighlightShape";
import OrganicDivider from "@/components/ui/OrganicDivider/OrganicDivider";
import WhatsAppLink from "@/components/WhatsAppLink/WhatsAppLink";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import { buildFaqJsonLd } from "@/lib/faq-jsonld";
import { ChevronDown } from "react-feather";
import cx from "classnames";

const FAQ_IDS = [
  "wifi",
  "reservation",
  "hours",
  "day-pass",
  "meeting-room",
  "cafe-vs-coworking",
  "payment",
  "parking",
] as const;

const FaqSection = () => {
  const t = useTranslations("home.faq");

  const items = FAQ_IDS.map(id => ({
    id,
    question: t(`items.${id}.question`),
    answer: t(`items.${id}.answer`),
  }));

  const faqJsonLd = useMemo(() => buildFaqJsonLd(items), [items]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <OrganicDivider fill="accent" variant="star" />
      <section id="faq" data-header-surface="accent" className="w-full bg-brand-accent py-14 text-brand-green md:py-20">
        <div className="section-container max-w-3xl">
          <div className="mb-10 flex flex-col items-center gap-3 text-center md:mb-12">
            <HighlightShape variant="clover" fill="main" size={52} className="opacity-95" />
            <Label as="p" className="text-xs tracking-[0.25em]">
              {t("sectionTitle")}
            </Label>
            <h2 className="text-label text-xl normal-case tracking-wide md:text-2xl">{t("title")}</h2>
            <p className="text-body max-w-xl text-sm leading-relaxed text-brand-green/70 md:text-base">
              {t("subtitle")}
            </p>
          </div>

          <div className="flex flex-col gap-3" role="list">
            {items.map(item => (
              <details
                key={item.id}
                role="listitem"
                className="group border border-brand-green/10 bg-brand-cream transition-colors duration-200 open:border-brand-green/20 open:shadow-sm">
                <summary className="text-label flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm normal-case tracking-wide marker:content-none md:px-6 md:text-base [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className={cx(
                      "shrink-0 text-brand-green/45 transition-transform duration-200",
                      "group-open:rotate-180 group-open:text-brand-green"
                    )}
                  />
                </summary>
                <div className="text-body border-t border-brand-green/10 px-5 pb-5 pt-3 text-sm leading-relaxed text-brand-green/75 md:px-6 md:text-base">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <p className="text-body text-sm text-brand-green/70">{t("moreQuestions")}</p>
            <WhatsAppLink className="inline-flex min-h-[44px] items-center justify-center rounded-brand border border-brand-green bg-brand-green px-6 py-3 text-label text-sm text-brand-cream transition-colors duration-200 hover:border-brand-green/90 hover:bg-brand-green/90 focus-brand">
              {t("whatsappCta")}
            </WhatsAppLink>
          </div>
        </div>
      </section>
      <OrganicDivider fill="cream" variant="cloud" />
    </>
  );
};

export default FaqSection;
