"use client";

import { type FoodType } from "@/common/types/menuTypes";
import { runFireworks } from "@/lib/confetti";
import { useTranslations } from "next-intl";
import React, { type FC, useState } from "react";
import { Heart } from "react-feather";
import cx from "classnames";
import MenuItemImage from "./MenuItemImage";

interface MenuItemRowProps {
  item: FoodType;
}

const MenuItemRow: FC<MenuItemRowProps> = ({ item }) => {
  const { id, category } = item;
  const t = useTranslations("menu");
  const [checked, setChecked] = useState(false);
  const [animate, setAnimate] = useState(false);

  const name = t(`menu.${category}.${id}.name`);
  const description = t(`menu.${category}.${id}.description`);

  const onClickFavorite = () => {
    if (!checked) runFireworks();
    setChecked(prev => !prev);
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 300);
  };

  return (
    <article className="group border-b border-brand-green/10 py-5 last:border-b-0 md:py-6">
      <div className="flex min-w-0 gap-4 md:gap-5">
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-baseline gap-2">
            <h3 className="text-display-prose min-w-0 shrink text-base font-bold leading-snug text-brand-green md:text-lg">
              {name}
            </h3>
            {item.variants.length === 0 && (
              <>
                <span
                  className="mb-1 min-w-[1rem] flex-1 border-b border-dotted border-brand-green/30"
                  aria-hidden="true"
                />
                <p className="shrink-0 text-base font-semibold tabular-nums text-brand-green md:text-lg">
                  ${item.price < 0 ? "—" : item.price}
                </p>
              </>
            )}
          </div>

          {item.variants.length > 0 ? (
            <ul className="mt-3 space-y-2" role="list">
              {item.variants.map((variant, index) => (
                <li key={index} className="flex min-w-0 items-baseline gap-2">
                  <span className="text-body shrink-0 text-xs text-brand-green/55 md:text-sm">
                    {t(`variants.${variant.name}`)}
                  </span>
                  <span
                    className="mb-1 min-w-[1rem] flex-1 border-b border-dotted border-brand-green/25"
                    aria-hidden="true"
                  />
                  <span className="shrink-0 text-sm font-semibold tabular-nums text-brand-green md:text-base">
                    ${variant.price}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}

          <p className="text-body mt-2 text-sm leading-relaxed text-brand-green/60">{description}</p>

          <button
            type="button"
            className="focus-brand mt-3 flex h-11 w-11 items-center justify-center text-brand-green/35 transition-colors duration-200 hover:text-brand-accent"
            onClick={onClickFavorite}
            aria-pressed={checked}
            aria-label={checked ? "Quitar de favoritos" : "Agregar a favoritos"}>
            <Heart
              size={18}
              className={cx("transition-transform duration-300", {
                "scale-110": animate,
                "fill-brand-accent text-brand-accent": checked,
              })}
            />
          </button>
        </div>

        <figure className="relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden border border-brand-green/12 md:h-20 md:w-20">
          <MenuItemImage src={item.image} alt={name} category={category} sizes="80px" />
        </figure>
      </div>
    </article>
  );
};

export default MenuItemRow;
