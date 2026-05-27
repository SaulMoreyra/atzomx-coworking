"use client";

import { type FoodType } from "@/common/types/menuTypes";
import MenuCard from "@/components/MenuCard/MenuCard";
import MenuInformation from "@/components/MenuInformation/MenuInformation";
import Label from "@/components/ui/Label/Label";
import OrganicDivider from "@/components/ui/OrganicDivider/OrganicDivider";
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
    <div className="hidden md:flex w-full pt-8 pb-4 gap-6 lg:gap-8">
      <div className="shrink-0 pl-6 md:pl-12 xl:pl-20">
        <aside className="sticky top-36 w-56 lg:w-64">
          <div className="bg-brand-main/40 border border-brand-green/10 p-5">
            <Label as="h2" className="text-sm tracking-[0.2em] mb-4 block">
              {t("titles.menu")}
            </Label>
            <input
              type="search"
              placeholder={t("search")}
              aria-label={t("search")}
              className="w-full p-3 mb-5 border border-brand-green/15 bg-brand-cream text-brand-green focus-brand text-body text-sm"
              onChange={e => {
                setFilter(e.target.value);
              }}
            />
            <Label as="h3" className="text-xs mb-3 block text-brand-green/50 tracking-[0.15em]">
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
                      "w-full text-left text-label text-xs py-2 px-3 transition-colors duration-200 focus-brand",
                      activeCategory === category
                        ? "bg-brand-accent text-brand-green"
                        : "text-brand-green/60 hover:bg-brand-main/60 hover:text-brand-green"
                    )}>
                    {t(`categories.${category}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <div className="flex-1 min-w-0">
        {Object.entries(ALL_FOODS_BY_CATEGORY).map(([category, items], index) => {
          const isAltBand = index % 2 === 1;
          const showDivider = index > 0;

          return (
            <section key={category} className="w-full">
              {showDivider && (
                <OrganicDivider
                  fill={isAltBand ? "main" : "cream"}
                  variant={highlightDividerVariants[index % highlightDividerVariants.length]}
                />
              )}
              <div
                id={category}
                className={cx(
                  "scroll-mt-site-header py-10 md:py-12 px-6 md:px-8 lg:px-10",
                  isAltBand ? "bg-brand-main/45" : "bg-brand-cream"
                )}>
                <Label as="h2" className="text-base tracking-[0.2em] mb-6 block">
                  {t(`categories.${category}`)}
                </Label>
                <ul className="divide-y divide-brand-green/10">
                  {items.map(item => (
                    <li key={item.id}>
                      <MenuCard item={item} />
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}
      </div>

      <div className="hidden lg:block shrink-0 w-[280px] pr-6 md:pr-12 xl:pr-20">
        <MenuInformation className="sticky top-36" />
      </div>
    </div>
  );
};

export default MenuList;
