"use client";

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
      <div className="section-container max-w-3xl py-4 md:py-5 lg:max-w-4xl">
        <label htmlFor="menu-search" className="sr-only">
          {t("search")}
        </label>
        <input
          id="menu-search"
          type="search"
          value={filter}
          placeholder={t("search")}
          onChange={event => {
            onFilterChange(event.target.value);
          }}
          className="text-body mb-3 w-full max-w-md border border-brand-green/15 bg-white px-4 py-2.5 text-sm text-brand-green focus-brand md:mb-4"
        />

        <span className="text-label mb-1.5 block text-[10px] tracking-[0.2em] text-brand-green/45">
          {t("titles.categories")}
        </span>
        <ul
          className="-mx-1 flex gap-x-2 overflow-x-auto pb-0.5 scroll-smooth md:gap-x-3 md:flex-wrap md:overflow-visible"
          role="list">
          {categories.map(category => {
            const isActive = activeCategory === category;

            return (
              <li key={category} className="shrink-0 md:shrink">
                <button
                  type="button"
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => {
                    onSelectCategory(category);
                  }}
                  className={cx(
                    "text-label min-h-[44px] whitespace-nowrap border-b-2 px-2 py-1.5 text-left text-[10px] tracking-[0.16em] transition-colors duration-200 focus-brand md:text-xs",
                    isActive
                      ? "border-brand-green text-brand-green"
                      : "border-transparent text-brand-green/50 hover:border-brand-green/25 hover:text-brand-green/80"
                  )}>
                  {t(`categories.${category}`)}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default MenuCategoryNav;
