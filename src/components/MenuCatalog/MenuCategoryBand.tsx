"use client";

import HighlightShape from "@/components/ui/HighlightShape/HighlightShape";
import Label from "@/components/ui/Label/Label";
import OrganicDivider from "@/components/ui/OrganicDivider/OrganicDivider";
import { type FoodType } from "@/common/types/menuTypes";
import {
  brandSurfaces,
  highlightDividerVariants,
  planSlideSurfaces,
  type BrandSurface,
  type OrganicDividerFill,
} from "@/design-system";
import { useTranslations } from "next-intl";
import React, { type FC } from "react";
import cx from "classnames";
import MenuItemRow from "./MenuItemRow";
import { categorySectionId } from "./menuUtils";

interface MenuCategoryBandProps {
  category: string;
  items: FoodType[];
  index: number;
  previousSurface?: BrandSurface;
}

const toDividerFill = (surface: BrandSurface): OrganicDividerFill => {
  if (surface === "green") return "green";
  if (surface === "white") return "cream";
  return surface;
};

const MenuCategoryBand: FC<MenuCategoryBandProps> = ({
  category,
  items,
  index,
  previousSurface,
}) => {
  const t = useTranslations("menu");
  const surface = planSlideSurfaces[index % planSlideSurfaces.length];
  const showDivider = index === 0 || surface !== previousSurface;

  return (
    <>
      {showDivider ? (
        <OrganicDivider
          fill={toDividerFill(surface)}
          variant={highlightDividerVariants[index % highlightDividerVariants.length]}
        />
      ) : null}

      <section
        id={categorySectionId(category)}
        className={cx(
          brandSurfaces[surface],
          "scroll-mt-[calc(4.5rem+8rem+env(safe-area-inset-top,0px))] py-10 md:scroll-mt-[calc(4.5rem+7rem+env(safe-area-inset-top,0px))] md:py-14"
        )}>
        <div className="section-container max-w-5xl">
          <div className="mb-8 flex items-center gap-3 md:mb-10">
            <HighlightShape
              variant={highlightDividerVariants[index % highlightDividerVariants.length]}
              fill="accent"
              size={40}
              className="opacity-90"
            />
            <Label as="h2" className="text-label text-xl tracking-[0.15em] md:text-3xl">
              {t(`categories.${category}`)}
            </Label>
          </div>

          <ul className="grid grid-cols-1 gap-x-12 lg:grid-cols-2">
            {items.map(item => (
              <li key={item.id}>
                <MenuItemRow item={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default MenuCategoryBand;
