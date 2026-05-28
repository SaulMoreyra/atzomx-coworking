"use client";

import { type FoodType } from "@/common/types/menuTypes";
import { useTranslations } from "next-intl";
import React, { type FC } from "react";
import MenuItemRow from "./MenuItemRow";
import { categorySectionId } from "./menuUtils";

interface MenuCategoryBandProps {
  category: string;
  items: FoodType[];
}

const MenuCategoryBand: FC<MenuCategoryBandProps> = ({ category, items }) => {
  const t = useTranslations("menu");

  return (
    <section
      id={categorySectionId(category)}
      className="scroll-mt-[calc(4.5rem+5.5rem+env(safe-area-inset-top,0px))] border-t border-brand-green/12 bg-brand-cream">
      <div className="section-container max-w-3xl py-10 md:py-12 lg:max-w-4xl">
        <header className="mb-8 border-b border-brand-green/12 pb-5 md:mb-10 md:pb-6">
          <h2 className="text-display-prose min-w-0 [overflow-wrap:anywhere] text-2xl font-bold leading-tight text-brand-green md:text-3xl">
            {t(`categories.${category}`)}
          </h2>
        </header>

        <ul className="grid grid-cols-1 gap-x-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" role="list">
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
