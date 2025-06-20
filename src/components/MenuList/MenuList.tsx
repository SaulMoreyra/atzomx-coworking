"use client";
import { type FoodType } from "@/common/types/menuTypes";
import MenuCard from "@/components/MenuCard/MenuCard";
import { ALL_FOODS } from "@/mocks/menu";
import { useTranslations } from "next-intl";
import React, { useMemo, useState } from "react";

const reduceToArrayByCategory = (obj: FoodType[]) => {
  return obj.reduce<Record<string, FoodType[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
};

const MenuList = () => {
  const [filter, setFilter] = useState<string>("");
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

      const filterResult = [
        name.includes(filterLower),
        description.includes(filterLower),
        category.includes(filterLower),
      ].some(Boolean);

      return filterResult;
    });

    return reduceToArrayByCategory(filteredMenu);
  }, [filter]);

  const scrollToTitle = (category: string) => () => {
    const element = document.getElementById(category);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <section className="self-start top-36 sticky hidden md:block">
        <h1 className="text-2xl font-semibold text-gray-700 mb-5 uppercase">
          {t("titles.menu")}
        </h1>
        <input
          type="text"
          placeholder="Search"
          className="w-full p-3 border border-gray-200 rounded-md mb-5"
          onChange={e => {
            setFilter(e.target.value);
          }}
        />
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-gray-700 mb-2 hidden md:block">
            {t("titles.categories")}
          </h2>
          <ul className="space-y-0 md:space-y-2 flex md:block">
            {Object.keys(ALL_FOODS_BY_CATEGORY).map((category, index) => (
              <li
                key={index}
                className="text-gray-400 cursor-pointer inline md:block"
                onClick={scrollToTitle(category)}>
                {t(`categories.${category}`)}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="flex-col flex-1 gap-8 hidden md:flex">
        {Object.entries(ALL_FOODS_BY_CATEGORY).map(
          ([category, items], index) => (
            <div key={index} className="flex flex-col">
              <h1
                id={category}
                className="text-2xl font-semibold text-gray-700 mb-5 uppercase scroll-mt-36">
                {t(`categories.${category}`)}
              </h1>
              <ul className="space-y-5">
                {items.map(item => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </ul>
            </div>
          )
        )}
      </section>
    </>
  );
};

export default MenuList;
