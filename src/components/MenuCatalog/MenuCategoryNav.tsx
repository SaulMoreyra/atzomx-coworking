"use client";

import { useTranslations } from "next-intl";
import React, { type FC } from "react";
import { Search } from "react-feather";
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
      className="sticky top-site-header z-sticky bg-brand-cream/95 backdrop-blur-sm"
      aria-label={t("titles.categories")}>
      <div className="section-container max-w-3xl py-4 md:py-5 lg:max-w-4xl">
        <label htmlFor="menu-search" className="sr-only">
          {t("search")}
        </label>
        <div className="relative mb-4 max-w-md">
          <Search
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-brand-green/45"
          />
          <input
            id="menu-search"
            type="search"
            value={filter}
            placeholder={t("search")}
            onChange={event => {
              onFilterChange(event.target.value);
            }}
            className="text-body w-full rounded-none border border-brand-green bg-white py-2.5 pl-9 pr-4 text-sm text-brand-green focus-brand"
          />
        </div>

        <span className="text-label mb-2 block text-[10px] tracking-[0.2em] text-brand-green/45">
          {t("titles.categories")}
        </span>
        <ul
          className="-mx-0.5 flex gap-2 overflow-x-auto pb-1 scroll-smooth md:flex-wrap md:overflow-visible"
          role="list">
          {categories.map(category => {
            const isActive = activeCategory === category;

            return (
              <li key={category} className="shrink-0">
                <button
                  type="button"
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => {
                    onSelectCategory(category);
                  }}
                  className={cx(
                    "text-label min-h-[44px] whitespace-nowrap rounded-none border px-3 py-2 text-[10px] tracking-[0.14em] transition-colors duration-200 focus-brand md:text-xs",
                    isActive
                      ? "border-brand-green bg-brand-green text-brand-cream"
                      : "border-brand-green bg-transparent text-brand-green/65 hover:bg-brand-main/50 hover:text-brand-green"
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
