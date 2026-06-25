"use client";

import HomeSectionIntro from "@/components/ui/HomeSectionIntro/HomeSectionIntro";
import SectionSticker from "@/components/ui/SectionSticker/SectionSticker";
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
      <section
        id="faq"
        data-header-surface="main"
        className="relative w-full overflow-x-clip bg-brand-main py-14 text-brand-green md:py-20">
        <div className="section-container max-w-5xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-16 xl:gap-20">
            <div className="relative min-w-0">
              <HomeSectionIntro
                kicker={t("sectionTitle")}
                title={t("title")}
                subtitle={t("subtitle")}
              />

              <SectionSticker
                id="sticker-barista"
                sizes="(max-width: 1024px) 36vw, 200px"
                className="absolute -right-4 top-0 z-0 w-[9rem] opacity-40 md:w-[10rem] md:opacity-55 lg:hidden"
              />

              <div className="relative z-[1] mt-10 divide-y divide-brand-green md:mt-12" role="list">
                {items.map(item => (
                  <details
                    key={item.id}
                    role="listitem"
                    className="group transition-colors duration-200">
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
                    <div className="text-body pb-5 pt-1 text-sm leading-relaxed text-brand-green md:text-base">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            <aside className="relative min-w-0 lg:sticky lg:top-[calc(4.5rem+1.5rem+env(safe-area-inset-top,0px))] lg:self-start">
              <p className="text-body text-sm leading-relaxed text-brand-green/70">
                {t("moreQuestions")}
              </p>
              <WhatsAppLink className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center rounded-brand border border-brand-green bg-brand-green px-6 py-3 text-label text-sm text-brand-cream transition-colors duration-200 hover:border-brand-green/90 hover:bg-brand-green/90 focus-brand lg:w-auto">
                {t("whatsappCta")}
              </WhatsAppLink>
              <SectionSticker
                id="sticker-barista"
                sizes="176px"
                className="mx-auto mt-6 hidden w-[11rem] lg:block"
              />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqSection;
