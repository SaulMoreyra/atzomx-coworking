"use client";

import { type PlanType } from "@/common/types/planTypes";
import Button from "@/components/Button/Button";
import { brandSurfaces, BRAND_CONTACT, type BrandSurface } from "@/design-system";
import cx from "classnames";
import { motion as m, type Variants } from "framer-motion";
import React, { type FC } from "react";
import PlanCard from "../PlanCard/PlanCard";
import Label from "../ui/Label/Label";
import { useTranslations } from "next-intl";

interface PlanBannerProps {
  plan: PlanType;
  surface: BrandSurface;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const PlanBanner: FC<PlanBannerProps> = ({ plan, surface }) => {
  const t = useTranslations(`home.plans.plans.${plan.id}`);
  const tPlans = useTranslations("home.plans");

  const bookText = t.has("book") ? t("book") : tPlans("defaultAsk");

  return (
    <m.article
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      className={cx("w-full text-brand-green", brandSurfaces[surface])}>
      <div
        className={cx(
          "section-container grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12",
          "items-center py-12 md:py-16 lg:py-20"
        )}>
        <div className="flex flex-col gap-6 order-2 lg:order-1">
          {plan.startPrice > 0 && (
            <m.div variants={fadeUp} className="flex items-center gap-4">
              <Label as="p" className="text-xs">
                {tPlans("from")}
              </Label>
              <span className="inline-flex items-center justify-center rounded-full bg-brand-cream px-6 py-2 text-2xl md:text-4xl font-semibold text-brand-green">
                ${plan.startPrice}
              </span>
            </m.div>
          )}

          <m.div variants={fadeUp} className="flex flex-col gap-3">
            <h3 className="text-display text-3xl md:text-5xl lg:text-6xl leading-none">
              {t("name")}
            </h3>
            <p className="text-body text-lg md:text-xl max-w-md text-brand-green/80">
              {t("description")}
            </p>
          </m.div>

          <m.div variants={fadeUp}>
            <a
              href={`${BRAND_CONTACT.whatsapp}?text=${encodeURIComponent(bookText)}`}
              target="_blank"
              rel="noopener noreferrer">
              <Button variant="primary" size="md">
                {tPlans("book")}
              </Button>
            </a>
          </m.div>
        </div>

        <m.div variants={fadeUp} className="order-1 lg:order-2 w-full max-w-md mx-auto lg:max-w-none">
          <PlanCard plan={plan} />
        </m.div>
      </div>
    </m.article>
  );
};

export default PlanBanner;
