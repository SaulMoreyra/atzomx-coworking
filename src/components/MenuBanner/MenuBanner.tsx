"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Label from "../ui/Label/Label";
import BrandIllustration from "../ui/BrandIllustration/BrandIllustration";
import HighlightShape from "../ui/HighlightShape/HighlightShape";
import MenuHeader from "../MenuHeader/MenuHeader";
import OrganicDivider from "../ui/OrganicDivider/OrganicDivider";

const MenuBanner = () => {
  const t = useTranslations("menu.banner");

  return (
    <>
      <MenuHeader />
      <section className="relative z-content w-full bg-brand-main pb-0 pt-site-menu-chrome text-brand-green md:pt-site-menu-sticky">
        <div className="flex w-full flex-col items-center px-5">
          <div className="w-full max-w-2xl text-center">
            <p className="text-display mb-3 text-5xl text-brand-green md:text-6xl" aria-hidden="true">
              ATZOMX
            </p>

            <div className="mb-6 flex flex-col items-center gap-1">
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] md:text-xs">
                {t("taglineLine1")}
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] md:text-xs">
                {t("taglineLine2")}
              </p>
            </div>

            <div className="mx-auto mb-8 w-full max-w-[min(92vw,360px)]">
              <BrandIllustration id="facade" priority sizes="(max-width: 768px) 92vw, 360px" />
            </div>

            <div className="mb-6 flex flex-col items-center gap-3 md:mb-8">
              <HighlightShape variant="cloud" fill="accent" size={52} className="opacity-90" />
              <Label as="h1" className="text-sm tracking-[0.25em] md:text-base">
                {t("title")}
              </Label>
            </div>
          </div>
        </div>

        <OrganicDivider
          fill="cream"
          variant="cloud"
          className="hidden w-full shrink-0 md:block"
        />
      </section>
    </>
  );
};

export default MenuBanner;
