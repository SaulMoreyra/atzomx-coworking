"use client";

import MenuCategoryBand from "@/components/MenuCatalog/MenuCategoryBand";
import MenuCategoryNav from "@/components/MenuCatalog/MenuCategoryNav";
import { planSlideSurfaces } from "@/design-system";
import { ALL_FOODS } from "@/mocks/menu";
import { useTranslations } from "next-intl";
import React, { useEffect, useMemo, useState } from "react";
import { categorySectionId, groupFoodsByCategory } from "./menuUtils";

const MenuCatalog = () => {
  const t = useTranslations("menu");
  const [filter, setFilter] = useState("");
  const [activeCategory, setActiveCategory] = useState("coffee");

  const foodsByCategory = useMemo(() => {
    if (!filter.trim()) return groupFoodsByCategory(ALL_FOODS);

    const filtered = ALL_FOODS.filter(item => {
      const nameKey = `menu.${item.category}.${item.id}.name`;
      const descriptionKey = `menu.${item.category}.${item.id}.description`;
      const categoryKey = `categories.${item.category}`;
      const query = filter.toLowerCase();

      return [t(nameKey), t(descriptionKey), t(categoryKey)].some(text =>
        text.toLowerCase().includes(query)
      );
    });

    return groupFoodsByCategory(filtered);
  }, [filter, t]);

  const categories = Object.keys(foodsByCategory);
  const categoryEntries = Object.entries(foodsByCategory);

  const scrollToCategory = (category: string) => {
    setActiveCategory(category);
    document.getElementById(categorySectionId(category))?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

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
          if (entry.isIntersecting) setActiveCategory(category);
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

  if (categories.length === 0) {
    return (
      <div className="section-container max-w-5xl py-16 text-center">
        <p className="text-body text-brand-green/70">{t("search")}: “{filter}”</p>
      </div>
    );
  }

  return (
    <>
      <MenuCategoryNav
        categories={categories}
        activeCategory={activeCategory}
        filter={filter}
        onFilterChange={setFilter}
        onSelectCategory={scrollToCategory}
      />

      <div className="flex flex-col">
        {categoryEntries.map(([category, items], index) => {
          const previousSurface =
            index === 0 ? undefined : planSlideSurfaces[(index - 1) % planSlideSurfaces.length];

          return (
            <MenuCategoryBand
              key={category}
              category={category}
              items={items}
              index={index}
              previousSurface={previousSurface}
            />
          );
        })}
      </div>
    </>
  );
};

export default MenuCatalog;
