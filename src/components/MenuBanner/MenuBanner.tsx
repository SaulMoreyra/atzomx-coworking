"use client";

import React from "react";
import Image from "next/image";
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
      <MenuHeader className="site-header-shell w-full shadow-md" />
      <section className="relative z-content w-full bg-brand-main flex flex-col items-center px-5 pt-site-header pb-0 md:pt-8 text-brand-green">
        <div className="relative w-full max-w-[min(100%,280px)] aspect-[3.8/1] mb-2">
          <Image
            src="/images/logos/logo-letters.svg"
            alt="Atzomx"
            fill
            priority
            className="object-contain"
          />
        </div>

        <div className="flex flex-col items-center gap-1 mb-6">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.28em] font-medium">
            {t("taglineLine1")}
          </p>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.28em] font-medium">
            {t("taglineLine2")}
          </p>
        </div>

        <div className="w-full max-w-[min(92vw,360px)] mb-8">
          <BrandIllustration id="facade" priority sizes="(max-width: 768px) 92vw, 360px" />
        </div>

        <div className="flex flex-col items-center gap-3 mb-8">
          <HighlightShape variant="cloud" fill="accent" size={52} className="opacity-90" />
          <Label as="h1" className="text-sm md:text-base tracking-[0.25em]">
            {t("title")}
          </Label>
        </div>

        <OrganicDivider fill="cream" variant="cloud" className="w-full" />
      </section>
    </>
  );
};

export default MenuBanner;
