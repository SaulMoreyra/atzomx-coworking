"use client";

import { motion as m, type Variants } from "framer-motion";
import Image from "next/image";
import React, { type FC } from "react";
import BrandIllustration from "../ui/BrandIllustration/BrandIllustration";
import OrganicDivider from "../ui/OrganicDivider/OrganicDivider";
import { BRAND_CONTACT } from "@/design-system";
import { useTranslations } from "next-intl";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
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
      className="relative z-content min-h-[calc(100dvh-4.5rem-env(safe-area-inset-top,0px))] w-full bg-brand-main flex flex-col items-center px-5 pt-6 pb-10 md:pt-10 md:pb-14 text-brand-green">
      <h1 className="sr-only">Café y Coworking en el Centro de Oaxaca</h1>

      {/* Top — logo + tagline (~25% mockup) */}
      <div className="flex flex-col items-center text-center w-full shrink-0">
        <m.div
          variants={fadeUp}
          className="relative w-full max-w-[min(100%,320px)] aspect-[3.8/1] mb-3">
          <Image
            src="/images/logos/logo-letters.svg"
            alt="Atzomx"
            fill
            priority
            className="object-contain"
          />
        </m.div>

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
        variants={fadeUp}
        className="w-full flex-1 flex items-center justify-center py-4 md:py-8 min-h-[38vh] md:min-h-[42vh]">
        <BrandIllustration
          id="facade"
          priority
          className="w-full max-w-[min(92vw,400px)] md:max-w-[440px]"
          sizes="(max-width: 768px) 92vw, 440px"
        />
      </m.div>

      {/* Bottom — horario + CTAs discretos */}
      <div className="flex flex-col items-center gap-5 w-full shrink-0">
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
          <a
            href={BRAND_CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-label text-xs md:text-sm text-brand-green/70 hover:text-brand-green underline-offset-4 hover:underline focus-brand rounded-sm">
            {t("whatsapp")}
          </a>
        </m.div>
      </div>

      <OrganicDivider fill="cream" variant="cloud" />
    </m.section>
  );
};

export default Presentation;
