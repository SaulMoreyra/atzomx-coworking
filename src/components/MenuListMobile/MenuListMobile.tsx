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
  return obj.reduce<Record<string, FoodType[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
};

const MenuListMobile = () => {
  const t = useTranslations("menu.categories");
  const [activeTab, setActiveTab] = useState<string | number>("coffee");
  const isScrollUp = useScrollUp({ distance: 400 });
  const ALL_FOODS_BY_CATEGORY = reduceToArrayByCategory(ALL_FOODS);

  const scrollToTitle = (category: string | number) => {
    document.getElementById("panel-container")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveTab(category);
  };

  return (
    <>
      <section
        className={cx(
          "sticky z-sticky md:hidden bg-brand-cream border-b border-brand-green/10 top-site-header transition-shadow duration-200",
          isScrollUp && "shadow-md"
        )}>
        <Tabs tab={activeTab} onChange={scrollToTitle} className="px-2">
          {Object.keys(ALL_FOODS_BY_CATEGORY).map(category => (
            <Tabs.Item schema="primary" key={category} value={category}>
              {t(category)}
            </Tabs.Item>
          ))}
        </Tabs>
      </section>
      <section
        id="panel-container"
        className="section-container flex flex-col gap-8 mt-6 mb-10 md:hidden scroll-mt-site-header">
        {Object.entries(ALL_FOODS_BY_CATEGORY).map(([category, items]) => (
          <Tabs.Panel key={category} value={activeTab} tab={category}>
            <ul className="divide-y divide-brand-green/10">
              {items.map(item => (
                <li key={item.id}>
                  <MenuCard item={item} />
                </li>
              ))}
            </ul>
          </Tabs.Panel>
        ))}
      </section>
    </>
  );
};

export default MenuListMobile;
