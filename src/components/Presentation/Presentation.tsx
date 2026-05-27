"use client";

import { motion as m, type Variants } from "framer-motion";
import React, { type FC } from "react";
import BrandIllustration from "../ui/BrandIllustration/BrandIllustration";
import OrganicDivider from "../ui/OrganicDivider/OrganicDivider";
import WhatsAppLink from "../WhatsAppLink/WhatsAppLink";
import { useTranslations } from "next-intl";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const fadeUpNoOpacity: Variants = {
  hidden: { y: 16 },
  visible: { y: 0, transition: { duration: 0.35 } },
};

const Presentation: FC = () => {
  const t = useTranslations("home.presentation");

  const onClickPlans = () => {
    document.getElementById("plans")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <m.section
      id="home"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative z-content min-h-[calc(100dvh-4.5rem-env(safe-area-inset-top,0px))] w-full overflow-x-clip bg-brand-main flex flex-col pt-6 pb-0 md:pt-10 text-brand-green"
      data-header-surface="main">
      <div className="flex flex-1 flex-col items-center px-5 w-full">
        <h1 className="sr-only">Café y Coworking en el Centro de Oaxaca</h1>

        {/* Top — wordmark + tagline */}
        <div className="flex flex-col items-center text-center w-full shrink-0">
          <m.p
            variants={fadeUp}
            aria-hidden="true"
            className="text-display text-5xl md:text-7xl text-brand-green mb-3">
            ATZOMX
          </m.p>

          <m.div variants={fadeUp} className="flex flex-col gap-1">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.28em] text-brand-green font-medium">
              {t("taglineLine1")}
            </p>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.28em] text-brand-green font-medium">
              {t("taglineLine2")}
            </p>
          </m.div>
        </div>

      {/* Center — fachada (~45% mockup) */}
      <m.div
        variants={fadeUpNoOpacity}
        className="w-full flex-1 flex items-center justify-center py-4 md:py-8 min-h-[38vh] md:min-h-[42vh]">
        <BrandIllustration
          id="facade"
          priority
          className="w-full max-w-[min(100%,400px)] md:max-w-[440px]"
          sizes="(max-width: 768px) 100vw, 440px"
        />
      </m.div>

      {/* Bottom — horario + CTAs discretos */}
      <div className="flex flex-col items-center gap-5 w-full shrink-0 mb-8 md:mb-10">
        <m.div variants={fadeUp} className="flex flex-col items-center gap-3">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] border border-brand-green rounded-full px-6 py-2 text-brand-green">
            {t("scheduleLabel")}
          </span>
          <p className="text-schedule text-brand-green">{t("scheduleHours")}</p>
        </m.div>

        <m.div variants={fadeUp} className="flex flex-wrap justify-center gap-x-5 gap-y-2 pt-1">
          <button
            type="button"
            onClick={onClickPlans}
            className="text-label text-xs md:text-sm text-brand-green underline-offset-4 hover:underline focus-brand rounded-sm">
            {t("plans")}
          </button>
          <span className="text-brand-green/30 hidden sm:inline" aria-hidden="true">
            ·
          </span>
          <WhatsAppLink className="text-label text-xs md:text-sm text-brand-green/70 hover:text-brand-green underline-offset-4 hover:underline focus-brand rounded-sm">
            {t("whatsapp")}
          </WhatsAppLink>
        </m.div>
      </div>
      </div>

      <OrganicDivider fill="cream" variant="cloud" className="w-full shrink-0" />
    </m.section>
  );
};

export default Presentation;
