"use client";

import { type PlanType } from "@/common/types/planTypes";
import WhatsAppLink from "@/components/WhatsAppLink/WhatsAppLink";
import cx from "classnames";
import { motion as m, type Variants } from "framer-motion";
import React, { type FC } from "react";
import PlanCard from "../PlanCard/PlanCard";
import Label from "../ui/Label/Label";
import { useTranslations } from "next-intl";

interface PlanBannerProps {
  plan: PlanType;
  reverse?: boolean;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const PlanBanner: FC<PlanBannerProps> = ({ plan, reverse = false }) => {
  const t = useTranslations(`home.plans.plans.${plan.id}`);
  const tPlans = useTranslations("home.plans");

  const bookText = t.has("book") ? t("book") : tPlans("defaultAsk");

  return (
    <m.article
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="w-full bg-brand-cream text-brand-green">
      <div
        className={cx(
          "section-container grid grid-cols-1 items-center gap-8 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 lg:py-20",
          reverse && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
        )}>
        <div className="flex min-w-0 flex-col gap-6">
          {plan.startPrice > 0 && (
            <m.div variants={fadeUp} className="flex items-center gap-4">
              <Label as="p" className="text-xs">
                {tPlans("from")}
              </Label>
              <span className="inline-flex items-center justify-center rounded-full bg-brand-main px-6 py-2 text-2xl font-semibold tabular-nums text-brand-green md:text-4xl">
                ${plan.startPrice}
              </span>
            </m.div>
          )}

          <m.div variants={fadeUp} className="flex min-w-0 flex-col gap-3">
            <h3 className="text-display-prose min-w-0 [overflow-wrap:anywhere] text-3xl font-bold leading-none md:text-4xl lg:text-5xl">
              {t("name")}
            </h3>
            <p className="text-body max-w-md text-lg text-brand-green/80 md:text-xl">{t("description")}</p>
          </m.div>

          <m.div variants={fadeUp}>
            <WhatsAppLink
              message={bookText}
              className="inline-flex min-h-[44px] items-center justify-center rounded-brand border border-brand-green bg-brand-green px-6 py-3 text-base text-label text-brand-on-green transition-colors duration-200 hover:border-brand-green/90 hover:bg-brand-green/90 focus-brand">
              {tPlans("book")}
            </WhatsAppLink>
          </m.div>
        </div>

        <m.div variants={fadeUp} className="mx-auto w-full min-w-0 max-w-md lg:max-w-none">
          <PlanCard plan={plan} />
        </m.div>
      </div>
    </m.article>
  );
};

export default PlanBanner;
