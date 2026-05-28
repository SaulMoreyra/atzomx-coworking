"use client";

import HomeSectionIntro from "@/components/ui/HomeSectionIntro/HomeSectionIntro";
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
      <section id="faq" data-header-surface="cream" className="w-full border-t border-brand-green/10 bg-brand-cream py-14 text-brand-green md:py-20">
        <div className="section-container max-w-5xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-16 xl:gap-20">
            <div className="min-w-0">
              <HomeSectionIntro kicker={t("sectionTitle")} title={t("title")} subtitle={t("subtitle")} />

              <div className="mt-10 border-t border-brand-green/12" role="list">
                {items.map(item => (
                  <details
                    key={item.id}
                    role="listitem"
                    className="group border-b border-brand-green/12 transition-colors duration-200 open:border-brand-green/20">
                    <summary className="text-label flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm normal-case tracking-wide marker:content-none md:text-base [&::-webkit-details-marker]:hidden">
                      <span className="min-w-0 pr-2">{item.question}</span>
                      <ChevronDown
                        size={18}
                        aria-hidden="true"
                        className={cx(
                          "shrink-0 text-brand-green/45 transition-transform duration-200",
                          "group-open:rotate-180 group-open:text-brand-green"
                        )}
                      />
                    </summary>
                    <div className="text-body border-t border-brand-green/10 pb-5 pt-3 text-sm leading-relaxed text-brand-green/75 md:text-base">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            <aside className="lg:sticky lg:top-[calc(4.5rem+1.5rem+env(safe-area-inset-top,0px))] lg:self-start">
              <p className="text-body text-sm leading-relaxed text-brand-green/70">{t("moreQuestions")}</p>
              <WhatsAppLink className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center rounded-brand border border-brand-green bg-brand-green px-6 py-3 text-label text-sm text-brand-cream transition-colors duration-200 hover:border-brand-green/90 hover:bg-brand-green/90 focus-brand lg:w-auto">
                {t("whatsappCta")}
              </WhatsAppLink>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqSection;
