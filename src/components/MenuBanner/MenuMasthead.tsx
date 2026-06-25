"use client";

import HomeSectionIntro from "@/components/ui/HomeSectionIntro/HomeSectionIntro";
import { useTranslations } from "next-intl";
import React from "react";

interface MenuMastheadProps {
  itemCount: number;
}

const MenuMasthead = ({ itemCount }: MenuMastheadProps) => {
  const t = useTranslations("menu.banner");

  return (
    <section className="relative z-content w-full bg-brand-cream pt-site-menu-sticky text-brand-green">
      <div className="section-container max-w-3xl py-10 md:py-14 lg:max-w-4xl">
        <HomeSectionIntro
          kicker={t("itemsCount", { count: itemCount })}
          title={t("title")}
          subtitle={t("tagline")}
          titleClassName="text-3xl md:text-4xl lg:text-5xl"
        />
      </div>
    </section>
  );
};

export default MenuMasthead;
