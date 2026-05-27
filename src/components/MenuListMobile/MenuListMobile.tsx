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

/** Height of the mobile category tab bar — must match fixed tabs + flow spacer */
const MOBILE_TABS_HEIGHT = "3rem";

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
          "fixed inset-x-0 top-site-header z-sticky border-b border-brand-green/10 bg-brand-main transition-shadow duration-200 md:hidden",
          isScrollUp && "shadow-md"
        )}
        style={{ height: MOBILE_TABS_HEIGHT }}>
        <Tabs tab={activeTab} onChange={scrollToTitle} className="h-full px-2">
          {Object.keys(ALL_FOODS_BY_CATEGORY).map(category => (
            <Tabs.Item schema="primary" key={category} value={category}>
              {t(category)}
            </Tabs.Item>
          ))}
        </Tabs>
      </section>

      <div className="md:hidden" style={{ height: MOBILE_TABS_HEIGHT }} aria-hidden="true" />

      <section
        id="panel-container"
        className="section-container mb-10 flex max-w-2xl scroll-mt-site-menu-chrome flex-col gap-8 bg-brand-cream max-md:px-5 max-md:py-6 md:hidden">
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
