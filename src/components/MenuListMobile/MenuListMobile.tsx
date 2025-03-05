"use client";
import { type FoodType } from "@/common/types/menuTypes";
import { useScrollUp } from "@/hooks/useScrollUp";
import { ALL_FOODS } from "@/mocks/menu";
import React, { useState } from "react";
import cx from "classnames";
import Tabs from "../Tabs/Tabs";
import MenuCard from "../MenuCard/MenuCard";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("menu.categories");
  const [activeTab, setActiveTab] = useState<string | number>("coffee");
  const isScrollUp = useScrollUp({ distance: 380 });
  const ALL_FOODS_BY_CATEGORY = reduceToArrayByCategory(ALL_FOODS);

  const scrollToTitle = (category: string | number) => {
    const element = document.getElementById("panel-container");
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveTab(category);
  };

  return (
    <>
      <section
        className={cx("sticky top-[132px] bg-white z-10 md:hidden", {
          "shadow-md": isScrollUp,
        })}>
        <Tabs
          tab={activeTab}
          onChange={scrollToTitle}
          className={cx("px-5 md:px-10", {
            "bg-primary-main": isScrollUp,
          })}>
          {Object.keys(ALL_FOODS_BY_CATEGORY).map(category => (
            <Tabs.Item
              schema={isScrollUp ? "secondary" : "primary"}
              key={category}
              value={category}>
              {t(category)}
            </Tabs.Item>
          ))}
        </Tabs>
      </section>
      <section
        id="panel-container"
        className="px-5 md:px-10 flex flex-col gap-10 mt-12 mb-8 md:hidden scroll-mt-48">
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
