"use client";
import { FoodType } from "@/common/types/menuTypes";
import MenuCard from "@/components/MenuCard/MenuCard";
import { ALL_FOODS } from "@/mocks/menu/lunch";
import { useMemo, useState } from "react";

const reduceToArrayByCategory = (obj: FoodType[]) => {
  return obj.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, FoodType[]>
  );
};

const MenuList = () => {
  const [filter, setFilter] = useState<string>("");

  const ALL_COFFEES = useMemo(() => {
    if (!filter) return reduceToArrayByCategory(ALL_FOODS);

    const filteredMenu = ALL_FOODS.filter(item => {
      const name = item.name.toLowerCase();
      const description = item.description.toLowerCase();
      const filterLower = filter.toLowerCase();
      return (
        name.includes(filterLower) ||
        description.includes(filterLower) ||
        item.category.includes(filterLower)
      );
    });

    return reduceToArrayByCategory(filteredMenu);
  }, [filter]);

  return (
    <>
      <section className="self-start w-[287px] sticky top-36">
        <h1 className="text-2xl font-semibold text-gray-700 mb-5 uppercase">
          Menu
        </h1>
        <input
          type="text"
          placeholder="Search"
          className="w-full p-3 border border-gray-200 rounded-md mb-5"
          onChange={e => setFilter(e.target.value)}
        />
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Categories
          </h2>
          <ul className="space-y-2">
            {Object.keys(ALL_COFFEES).map((category, index) => (
              <li key={index} className="text-gray-400 cursor-pointer">
                {category}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="flex flex-col flex-1 gap-5 mb-24">
        {Object.entries(ALL_COFFEES).map(([category, items], index) => (
          <div key={index} className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              {category}
            </h2>
            <ul className="space-y-5">
              {items.map(item => (
                <MenuCard key={item.id} item={item} />
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
};

export default MenuList;
