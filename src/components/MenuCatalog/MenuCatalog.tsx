"use client";

import MenuCategoryBand from "@/components/MenuCatalog/MenuCategoryBand";
import MenuCategoryNav from "@/components/MenuCatalog/MenuCategoryNav";
import { type FoodType } from "@/common/types/menuTypes";
import { useTranslations } from "next-intl";
import React, { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { categorySectionId, getScrollBehavior, groupFoodsByCategory } from "./menuUtils";

interface MenuCatalogProps {
  foods: FoodType[];
}

const SCROLL_LOCK_FALLBACK_MS = 800;

const MenuCatalog = ({ foods }: MenuCatalogProps) => {
  const t = useTranslations("menu");
  const navRef = useRef<HTMLElement>(null);
  const scrollLockRef = useRef(false);
  const [navHeight, setNavHeight] = useState<number | null>(null);
  const [filter, setFilter] = useState("");
  const [activeCategory, setActiveCategory] = useState("teas");

  const foodsByCategory = useMemo(() => {
    if (!filter.trim()) return groupFoodsByCategory(foods);

    const filtered = foods.filter(item => {
      const nameKey = `menu.${item.category}.${item.id}.name`;
      const descriptionKey = `menu.${item.category}.${item.id}.description`;
      const categoryKey = `categories.${item.category}`;
      const query = filter.toLowerCase();

      return [t(nameKey), t(descriptionKey), t(categoryKey)].some(text =>
        text.toLowerCase().includes(query)
      );
    });

    return groupFoodsByCategory(filtered);
  }, [filter, foods, t]);

  const categories = useMemo(() => Object.keys(foodsByCategory), [foodsByCategory]);
  const categoryEntries = Object.entries(foodsByCategory);

  const scrollToCategory = (category: string) => {
    const section = document.getElementById(categorySectionId(category));
    if (!section) return;

    setActiveCategory(category);
    scrollLockRef.current = true;

    let fallback = 0;
    const release = () => {
      scrollLockRef.current = false;
      window.clearTimeout(fallback);
      window.removeEventListener("scrollend", release);
    };
    window.addEventListener("scrollend", release, { once: true });
    fallback = window.setTimeout(release, SCROLL_LOCK_FALLBACK_MS);

    section.scrollIntoView({ behavior: getScrollBehavior(), block: "start" });
  };

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const observer = new ResizeObserver(() => {
      setNavHeight(nav.offsetHeight);
    });
    observer.observe(nav);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (categories.length === 0) return;

    if (!categories.includes(activeCategory)) {
      setActiveCategory(categories[0]);
    }

    const observers: IntersectionObserver[] = [];

    categories.forEach(category => {
      const element = document.getElementById(categorySectionId(category));
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !scrollLockRef.current) setActiveCategory(category);
        },
        { rootMargin: "-42% 0px -48% 0px", threshold: 0 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach(observer => {
        observer.disconnect();
      });
    };
  }, [categories]);

  const wrapperStyle = (
    navHeight === null ? undefined : { "--menu-nav-h": `${navHeight}px` }
  ) as CSSProperties | undefined;

  return (
    <div style={wrapperStyle}>
      <MenuCategoryNav
        ref={navRef}
        categories={categories}
        activeCategory={activeCategory}
        filter={filter}
        onFilterChange={setFilter}
        onSelectCategory={scrollToCategory}
      />

      {categories.length === 0 ? (
        <div className="section-container max-w-3xl py-16 lg:max-w-4xl">
          <p className="text-body text-sm text-brand-green/70 md:text-base">
            {t("search")}: “{filter}”
          </p>
        </div>
      ) : (
        <div className="flex flex-col pb-14 md:pb-20">
          {categoryEntries.map(([category, items], index) => (
            <MenuCategoryBand key={category} category={category} items={items} bandIndex={index} />
          ))}
          <aside className="border-t border-brand-green/10 bg-brand-cream">
            <div className="section-container max-w-3xl py-10 md:py-12 lg:max-w-4xl">
              <h2 className="text-display-prose text-xl font-bold leading-tight text-brand-green md:text-2xl">
                {t("coworkingNote.title")}
              </h2>
              <p className="text-body mt-3 text-sm leading-relaxed text-brand-green/75 md:text-base">
                {t("coworkingNote.text")}
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default MenuCatalog;
