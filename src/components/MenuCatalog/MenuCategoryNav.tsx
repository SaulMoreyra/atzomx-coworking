"use client";

import Label from "@/components/ui/Label/Label";
import { useTranslations } from "next-intl";
import React, { type FC } from "react";
import cx from "classnames";

interface MenuCategoryNavProps {
  categories: string[];
  activeCategory: string;
  filter: string;
  onFilterChange: (value: string) => void;
  onSelectCategory: (category: string) => void;
}

const MenuCategoryNav: FC<MenuCategoryNavProps> = ({
  categories,
  activeCategory,
  filter,
  onFilterChange,
  onSelectCategory,
}) => {
  const t = useTranslations("menu");

  return (
    <nav
      className="sticky top-site-header z-sticky border-b border-brand-green/10 bg-brand-cream/95 backdrop-blur-sm"
      aria-label={t("titles.categories")}>
      <div className="section-container max-w-5xl py-4">
        <Label as="h2" className="sr-only">
          {t("titles.menu")}
        </Label>

        <input
          type="search"
          value={filter}
          placeholder={t("search")}
          aria-label={t("search")}
          onChange={event => {
            onFilterChange(event.target.value);
          }}
          className="text-body mb-4 w-full max-w-sm border border-brand-green/15 bg-white p-3 text-sm text-brand-green focus-brand"
        />

        <div className="scroll-snap-x flex gap-2 overflow-x-auto pb-1">
          {categories.map(category => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  onSelectCategory(category);
                }}
                aria-current={isActive ? "true" : undefined}
                className={cx(
                  "scroll-snap-start shrink-0 px-4 py-2.5 text-label text-xs transition-colors duration-200 focus-brand",
                  "min-h-[44px] border border-brand-green/15",
                  isActive
                    ? "border-brand-green bg-brand-main text-brand-green"
                    : "bg-brand-cream text-brand-green/55 hover:border-brand-green/30 hover:text-brand-green"
                )}>
                {t(`categories.${category}`)}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default MenuCategoryNav;
