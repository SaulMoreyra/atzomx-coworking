"use client";

import { type FoodType } from "@/common/types/menuTypes";
import { useTranslations } from "next-intl";
import React, { type FC } from "react";
import cx from "classnames";
import MenuItemRow from "./MenuItemRow";
import { categorySectionId } from "./menuUtils";

interface MenuCategoryBandProps {
  category: string;
  items: FoodType[];
  bandIndex: number;
}

const MenuCategoryBand: FC<MenuCategoryBandProps> = ({ category, items, bandIndex }) => {
  const t = useTranslations("menu");
  const isAlt = bandIndex % 2 === 1;

  return (
    <section
      id={categorySectionId(category)}
      className={cx(
        "scroll-mt-[calc(4.5rem+6.5rem+env(safe-area-inset-top,0px))]",
        isAlt ? "bg-brand-main" : "bg-brand-cream"
      )}>
      <div className="section-container max-w-3xl py-10 md:py-12 lg:max-w-4xl">
        <header className="mb-8 md:mb-10">
          <p className="text-label mb-2 text-[10px] tracking-[0.2em] text-brand-green/45">
            {String(bandIndex + 1).padStart(2, "0")}
          </p>
          <h2 className="text-display-prose min-w-0 [overflow-wrap:anywhere] text-2xl font-bold leading-tight text-brand-green md:text-3xl">
            {t(`categories.${category}`)}
          </h2>
        </header>

        <ul className="flex flex-col divide-y divide-brand-green" role="list">
          {items.map(item => (
            <li key={item.id} className="min-w-0">
              <MenuItemRow item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default MenuCategoryBand;
