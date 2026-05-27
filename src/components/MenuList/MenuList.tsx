"use client";

import { type FoodType } from "@/common/types/menuTypes";
import MenuCard from "@/components/MenuCard/MenuCard";
import MenuInformation from "@/components/MenuInformation/MenuInformation";
import HighlightShape from "@/components/ui/HighlightShape/HighlightShape";
import Label from "@/components/ui/Label/Label";
import { highlightDividerVariants } from "@/design-system";
import { ALL_FOODS } from "@/mocks/menu";
import { useTranslations } from "next-intl";
import React, { useMemo, useState } from "react";
import cx from "classnames";

const reduceToArrayByCategory = (obj: FoodType[]) => {
  return obj.reduce<Record<string, FoodType[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
};

const MenuList = () => {
  const [filter, setFilter] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("");
  const t = useTranslations("menu");

  const ALL_FOODS_BY_CATEGORY = useMemo(() => {
    if (!filter) return reduceToArrayByCategory(ALL_FOODS);

    const filteredMenu = ALL_FOODS.filter(item => {
      const nameKey = `menu.${item.category}.${item.id}.name`;
      const descriptionKey = `menu.${item.category}.${item.id}.description`;
      const categoryKey = `categories.${item.category}`;

      const name = t(nameKey).toLowerCase();
      const description = t(descriptionKey).toLowerCase();
      const category = t(categoryKey).toLowerCase();
      const filterLower = filter.toLowerCase();

      return [name, description, category].some(text => text.includes(filterLower));
    });

    return reduceToArrayByCategory(filteredMenu);
  }, [filter, t]);

  const scrollToTitle = (category: string) => {
    setActiveCategory(category);
    document.getElementById(category)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const categories = Object.keys(ALL_FOODS_BY_CATEGORY);

  return (
    <div className="hidden w-full bg-brand-cream pb-14 pt-8 md:block md:pt-site-menu-sticky">
      <div className="section-container flex max-w-7xl gap-6 lg:gap-10">
        <aside className="sticky top-site-menu-sticky w-52 shrink-0 self-start lg:w-56">
          <div className="border border-brand-green/10 bg-brand-main p-5">
            <Label as="h2" className="mb-4 block text-sm tracking-[0.2em]">
              {t("titles.menu")}
            </Label>
            <input
              type="search"
              placeholder={t("search")}
              aria-label={t("search")}
              className="text-body mb-5 w-full border border-brand-green/15 bg-brand-cream p-3 text-sm text-brand-green focus-brand"
              onChange={e => {
                setFilter(e.target.value);
              }}
            />
            <Label as="h3" className="mb-3 block text-xs tracking-[0.15em] text-brand-green/50">
              {t("titles.categories")}
            </Label>
            <ul className="space-y-1">
              {categories.map(category => (
                <li key={category}>
                  <button
                    type="button"
                    onClick={() => {
                      scrollToTitle(category);
                    }}
                    className={cx(
                      "focus-brand w-full px-3 py-2 text-left text-label text-xs transition-colors duration-200",
                      activeCategory === category
                        ? "bg-brand-accent text-brand-green"
                        : "text-brand-green/60 hover:bg-brand-cream/20 hover:text-brand-green"
                    )}>
                    {t(`categories.${category}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="min-w-0 flex-1 space-y-12">
          {Object.entries(ALL_FOODS_BY_CATEGORY).map(([category, items], index) => (
            <section key={category} id={category} className="scroll-mt-site-header">
              <div className="mb-6 flex items-center gap-3 border-b border-brand-green/10 pb-4">
                <HighlightShape
                  variant={highlightDividerVariants[index % highlightDividerVariants.length]}
                  fill="accent"
                  size={36}
                  className="opacity-90"
                />
                <Label as="h2" className="block text-base tracking-[0.2em]">
                  {t(`categories.${category}`)}
                </Label>
              </div>
              <ul className="divide-y divide-brand-green/10 border border-brand-green/10 bg-brand-cream px-4 md:px-6">
                {items.map(item => (
                  <li key={item.id}>
                    <MenuCard item={item} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="hidden w-64 shrink-0 lg:block xl:w-72">
          <MenuInformation className="sticky top-site-menu-sticky" />
        </div>
      </div>
    </div>
  );
};

export default MenuList;
