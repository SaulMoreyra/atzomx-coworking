"use client";

import { useTranslations } from "next-intl";
import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Search, X } from "react-feather";
import cx from "classnames";
import { getScrollBehavior } from "./menuUtils";

interface MenuCategoryNavProps {
  categories: string[];
  activeCategory: string;
  filter: string;
  onFilterChange: (value: string) => void;
  onSelectCategory: (category: string) => void;
}

const iconButtonClass =
  "focus-brand flex h-11 w-11 shrink-0 items-center justify-center rounded-none border border-brand-green text-brand-green transition-colors duration-200 hover:bg-brand-main/50 disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent";

const MenuCategoryNav = forwardRef<HTMLElement, MenuCategoryNavProps>(
  ({ categories, activeCategory, filter, onFilterChange, onSelectCategory }, ref) => {
    const t = useTranslations("menu");
    const railRef = useRef<HTMLUListElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const instantRailScrollRef = useRef(false);
    const [searchOpen, setSearchOpen] = useState(filter.length > 0);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const updateRailEdges = useCallback(() => {
      const rail = railRef.current;
      if (!rail) return;
      setCanScrollPrev(rail.scrollLeft > 1);
      setCanScrollNext(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 1);
    }, []);

    useEffect(() => {
      const rail = railRef.current;
      if (!rail) return;

      updateRailEdges();
      const resizeObserver = new ResizeObserver(updateRailEdges);
      resizeObserver.observe(rail);
      Array.from(rail.children).forEach(child => {
        resizeObserver.observe(child);
      });
      rail.addEventListener("scroll", updateRailEdges, { passive: true });

      return () => {
        resizeObserver.disconnect();
        rail.removeEventListener("scroll", updateRailEdges);
      };
    }, [searchOpen, categories, updateRailEdges]);

    useEffect(() => {
      const rail = railRef.current;
      const button = rail?.querySelector<HTMLElement>(`[data-category="${activeCategory}"]`);
      const instant = instantRailScrollRef.current;
      instantRailScrollRef.current = false;
      if (!rail || !button) return;

      const start = button.offsetLeft;
      const end = start + button.offsetWidth;
      if (start >= rail.scrollLeft && end <= rail.scrollLeft + rail.clientWidth) return;

      rail.scrollTo({
        left: start - (rail.clientWidth - button.offsetWidth) / 2,
        behavior: instant ? "auto" : getScrollBehavior(),
      });
    }, [activeCategory, searchOpen]);

    useEffect(() => {
      if (searchOpen) inputRef.current?.focus();
    }, [searchOpen]);

    const closeSearch = () => {
      onFilterChange("");
      setSearchOpen(false);
    };

    const scrollRail = (direction: 1 | -1) => {
      const rail = railRef.current;
      if (!rail) return;
      rail.scrollBy({ left: direction * rail.clientWidth * 0.8, behavior: getScrollBehavior() });
    };

    return (
      <nav
        ref={ref}
        className="sticky top-site-header z-sticky border-b border-brand-green/10 bg-brand-cream/95 backdrop-blur-sm"
        aria-label={t("titles.categories")}>
        <div className="section-container flex max-w-3xl items-center gap-2 py-3 lg:max-w-4xl">
          {searchOpen ? (
            <>
              <label htmlFor="menu-search" className="sr-only">
                {t("search")}
              </label>
              <div className="relative min-w-0 flex-1">
                <Search
                  size={16}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-brand-green/45"
                />
                <input
                  ref={inputRef}
                  id="menu-search"
                  type="search"
                  value={filter}
                  placeholder={t("search")}
                  onChange={event => {
                    onFilterChange(event.target.value);
                  }}
                  onKeyDown={event => {
                    if (event.key === "Escape") closeSearch();
                  }}
                  className="text-body h-11 w-full rounded-none border border-brand-green bg-white pl-9 pr-4 text-base text-brand-green focus-brand md:text-sm"
                />
              </div>
              <button
                type="button"
                className={iconButtonClass}
                onClick={closeSearch}
                aria-label={t("nav.closeSearch")}>
                <X size={18} aria-hidden="true" />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className={iconButtonClass}
                onClick={() => {
                  setSearchOpen(true);
                }}
                aria-expanded={false}
                aria-label={t("nav.openSearch")}>
                <Search size={18} aria-hidden="true" />
              </button>

              <span className="sr-only">{t("titles.categories")}</span>
              <ul
                ref={railRef}
                className="flex min-w-0 flex-1 snap-x snap-proximity gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                role="list">
                {categories.map(category => {
                  const isActive = activeCategory === category;

                  return (
                    <li key={category} className="shrink-0 snap-start">
                      <button
                        type="button"
                        data-category={category}
                        aria-current={isActive ? "true" : undefined}
                        onClick={() => {
                          instantRailScrollRef.current = !isActive;
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

              <div className="hidden shrink-0 gap-2 md:flex">
                <button
                  type="button"
                  className={iconButtonClass}
                  onClick={() => {
                    scrollRail(-1);
                  }}
                  disabled={!canScrollPrev}
                  aria-label={t("nav.prev")}>
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className={iconButtonClass}
                  onClick={() => {
                    scrollRail(1);
                  }}
                  disabled={!canScrollNext}
                  aria-label={t("nav.next")}>
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </div>
            </>
          )}
        </div>
      </nav>
    );
  }
);

MenuCategoryNav.displayName = "MenuCategoryNav";

export default MenuCategoryNav;
