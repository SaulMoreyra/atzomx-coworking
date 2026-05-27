"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Label from "../ui/Label/Label";
import HighlightShape from "../ui/HighlightShape/HighlightShape";
import MenuHeader from "../MenuHeader/MenuHeader";
import OrganicDivider from "../ui/OrganicDivider/OrganicDivider";

const MenuBanner = () => {
  const t = useTranslations("menu.banner");

  return (
    <>
      <MenuHeader />
      <section className="relative z-content w-full bg-brand-main pb-0 pt-site-menu-sticky text-brand-green">
        <div className="section-container flex max-w-5xl flex-col items-center py-8 text-center md:py-12">
          <p className="text-display mb-4 text-4xl text-brand-green md:text-6xl" aria-hidden="true">
            ATZOMX
          </p>

          <div className="mb-2 flex flex-col items-center gap-3">
            <HighlightShape variant="cloud" fill="accent" size={48} className="opacity-90" />
            <Label as="h1" className="text-sm tracking-[0.25em] md:text-base">
              {t("title")}
            </Label>
          </div>

          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-brand-green/70 md:text-xs">
            {t("taglineLine1")} · {t("taglineLine2")}
          </p>
        </div>

        <OrganicDivider fill="cream" variant="cloud" className="w-full shrink-0" />
      </section>
    </>
  );
};

export default MenuBanner;
