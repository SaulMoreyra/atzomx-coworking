"use client";
import { type FoodType } from "@/common/types/menuTypes";
import { useScrollUp } from "@/hooks/useScrollUp";
import { ALL_FOODS } from "@/mocks/menu/lunch";
import React, { useState } from "react";
import cx from "classnames";
import Tabs from "../Tabs/Tabs";
import MenuCard from "../MenuCard/MenuCard";

const reduceToArrayByCategory = (obj: FoodType[]) => {
  const accumulator: Record<string, FoodType[]> = {};
  const objects = obj.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, accumulator);
  return objects;
};

const MenuListMobile = () => {
  const [activeTab, setActiveTab] = useState<string | number>("coffee");
  const isScrollUp = useScrollUp({ distance: 410 });
  const ALL_FOODS_BY_CATEGORY = reduceToArrayByCategory(ALL_FOODS);

  return (
    <>
      <section
        className={cx("sticky top-[100px] bg-white z-10 md:hidden", {
          "shadow-md": isScrollUp,
        })}>
        <Tabs
          tab={activeTab}
          onChange={tab => {
            setActiveTab(tab);
          }}
          className={cx("px-10", {
            "bg-primary-main": isScrollUp,
          })}>
          {Object.keys(ALL_FOODS_BY_CATEGORY).map(category => (
            <Tabs.Item
              className={cx({ "text-gray-300": isScrollUp })}
              activeClassName={cx({ "border-b-white text-white": isScrollUp })}
              key={category}
              value={category}>
              {category}
            </Tabs.Item>
          ))}
        </Tabs>
      </section>
      <section className="px-10 flex flex-col gap-10 my-12 md:hidden">
        {Object.entries(ALL_FOODS_BY_CATEGORY).map(
          ([category, items], index) => (
            <Tabs.Panel key={index} value={activeTab} tab={category}>
              <ul className="space-y-5">
                {items.map(item => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </ul>
            </Tabs.Panel>
          )
        )}
      </section>
    </>
  );
};

export default MenuListMobile;
