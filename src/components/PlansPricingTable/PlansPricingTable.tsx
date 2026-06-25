"use client";

import { type PlanType } from "@/common/types/planTypes";
import WhatsAppLink from "@/components/WhatsAppLink/WhatsAppLink";
import Label from "@/components/ui/Label/Label";
import HighlightShape from "@/components/ui/HighlightShape/HighlightShape";
import OrganicDivider from "@/components/ui/OrganicDivider/OrganicDivider";
import { useTranslations } from "next-intl";
import React, { type FC } from "react";
import { MessageCircle } from "react-feather";
import cx from "classnames";

interface PlansPricingTableProps {
  plans: PlanType[];
}

const PRICING_PLAN_IDS = ["standard", "individual", "monitor", "meeting-room"] as const;

const PERIOD_KEYS = ["hour", "day", "week", "month"] as const;

interface PricingRowProps {
  plan: PlanType;
  planName: string;
  bookMessage: string;
  formatPrice: (value: number) => string;
  t: ReturnType<typeof useTranslations<"home.pricingTable">>;
  variant?: "card" | "row";
  rowIndex?: number;
}

const PricingRow: FC<PricingRowProps> = ({
  plan,
  planName,
  bookMessage,
  formatPrice,
  t,
  variant = "row",
  rowIndex = 0,
}) => {
  const periods = PERIOD_KEYS.map(key => ({
    key,
    label: t(`columns.${key}`),
    value: key === "hour" ? formatPrice(plan.startPrice) : t("contact"),
    isPrimary: key === "hour",
  }));

  if (variant === "card") {
    return (
      <article className="flex flex-col bg-brand-cream p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-label text-base normal-case tracking-wide text-brand-green">{planName}</h3>
          <span className="shrink-0 rounded-full bg-brand-main px-3 py-1 text-lg font-semibold tabular-nums text-brand-green">
            {formatPrice(plan.startPrice)}
            <span className="text-label ml-1 text-[10px] font-normal uppercase tracking-wider text-brand-green/55">
              /{t("columns.hour").toLowerCase()}
            </span>
          </span>
        </div>

        <dl className="mt-4 grid grid-cols-3 gap-3 pt-4">
          {periods.slice(1).map(period => (
            <div key={period.key}>
              <dt className="text-[10px] uppercase tracking-[0.16em] text-brand-green/45">{period.label}</dt>
              <dd className="text-label mt-1 text-sm text-brand-green/60">{period.value}</dd>
            </div>
          ))}
        </dl>

        <WhatsAppLink
          message={bookMessage}
          className="text-label mt-5 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-brand border border-brand-green bg-brand-green px-4 py-3 text-sm text-brand-cream transition-colors duration-200 hover:bg-brand-green/90 focus-brand">
          <MessageCircle size={16} aria-hidden="true" />
          {t("book")}
        </WhatsAppLink>
      </article>
    );
  }

  return (
    <tr
      className={cx(
        "border-b border-brand-green last:border-b-0",
        rowIndex % 2 === 0 ? "bg-brand-cream" : "bg-brand-main/25"
      )}>
      <th scope="row" className="text-label px-5 py-4 text-left text-sm normal-case tracking-wide text-brand-green md:px-6">
        {planName}
      </th>
      {periods.map(period => (
        <td
          key={period.key}
          className={cx(
            "px-4 py-4 tabular-nums md:px-5",
            period.isPrimary ? "text-lg font-semibold text-brand-green" : "text-sm text-brand-green/55"
          )}>
          {period.value}
        </td>
      ))}
      <td className="px-4 py-4 md:px-5">
        <WhatsAppLink
          message={bookMessage}
          className="text-label inline-flex min-h-[44px] items-center gap-2 rounded-brand border border-brand-green bg-brand-cream px-4 py-2 text-xs text-brand-green transition-colors duration-200 hover:border-brand-green hover:bg-brand-main/50 focus-brand">
          <MessageCircle size={14} aria-hidden="true" />
          {t("book")}
        </WhatsAppLink>
      </td>
    </tr>
  );
};

const PlansPricingTable: FC<PlansPricingTableProps> = ({ plans }) => {
  const t = useTranslations("home.pricingTable");
  const tPlans = useTranslations("home.plans");

  const pricingPlans = plans.filter(plan =>
    PRICING_PLAN_IDS.includes(plan.id as (typeof PRICING_PLAN_IDS)[number])
  );

  const formatPrice = (value: number) => (value === 0 ? "$0" : `$${value}`);

  return (
    <>
      <OrganicDivider fill="cream" variant="clover" />
      <section className="w-full bg-brand-cream pt-14 md:pt-20" aria-labelledby="pricing-table-heading">
        <div className="section-container max-w-5xl">
          <div className="mb-10 flex flex-col items-center gap-3 text-center md:mb-12">
            <HighlightShape variant="star" fill="accent" size={52} className="opacity-90" />
            <Label as="p" className="text-xs tracking-[0.25em]">
              {t("sectionTitle")}
            </Label>
            <h2
              id="pricing-table-heading"
              className="text-label text-xl normal-case tracking-wide text-brand-green md:text-2xl">
              {t("title")}
            </h2>
            <p className="text-body max-w-2xl text-sm leading-relaxed text-brand-green/65 md:text-base">
              {t("subtitle")}
            </p>
          </div>

          {/* Mobile — pricing cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:hidden">
            {pricingPlans.map(plan => (
              <PricingRow
                key={plan.id}
                plan={plan}
                planName={tPlans(`plans.${plan.id}.name`)}
                bookMessage={tPlans(`plans.${plan.id}.book`)}
                formatPrice={formatPrice}
                t={t}
                variant="card"
              />
            ))}
          </div>

          {/* Desktop — comparison table */}
          <div className="hidden overflow-hidden border border-brand-green lg:block">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">{t("title")}</caption>
              <thead>
                <tr className="border-b border-brand-green bg-brand-main/60">
                  <th scope="col" className="text-label px-6 py-4 text-xs normal-case tracking-wider text-brand-green">
                    {t("columns.plan")}
                  </th>
                  {PERIOD_KEYS.map(key => (
                    <th
                      key={key}
                      scope="col"
                      className={cx(
                        "text-label px-5 py-4 text-xs normal-case tracking-wider text-brand-green",
                        key === "hour" && "bg-brand-accent/40"
                      )}>
                      {t(`columns.${key}`)}
                    </th>
                  ))}
                  <th scope="col" className="text-label px-5 py-4 text-xs normal-case tracking-wider text-brand-green">
                    <span className="sr-only">{t("columns.action")}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricingPlans.map((plan, index) => (
                  <PricingRow
                    key={plan.id}
                    plan={plan}
                    planName={tPlans(`plans.${plan.id}.name`)}
                    bookMessage={tPlans(`plans.${plan.id}.book`)}
                    formatPrice={formatPrice}
                    t={t}
                    variant="row"
                    rowIndex={index}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-body mt-6 text-center text-xs leading-relaxed text-brand-green/55 md:text-sm">
            {t("footnote")}
          </p>

          <article className="mt-6 flex flex-col gap-3 bg-brand-main/40 p-5 md:flex-row md:items-center md:justify-between md:p-6">
            <div>
              <p className="text-label text-sm normal-case tracking-wide text-brand-green">{t("freePlan.title")}</p>
              <p className="text-body mt-1 max-w-prose text-sm leading-relaxed text-brand-green/70">
                {t("freePlan.description")}
              </p>
            </div>
            <WhatsAppLink
              message={tPlans("plans.free.book")}
              className="text-label inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-brand border border-brand-green bg-brand-cream px-5 py-3 text-xs text-brand-green transition-colors duration-200 hover:border-brand-green hover:bg-brand-accent/30 focus-brand">
              {t("freePlan.cta")}
            </WhatsAppLink>
          </article>
        </div>
      </section>
    </>
  );
};

export default PlansPricingTable;
