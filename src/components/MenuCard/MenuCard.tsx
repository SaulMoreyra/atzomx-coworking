import { type FoodType } from "@/common/types/menuTypes";
import { runFireworks } from "@/lib/confetti";
import { useTranslations } from "next-intl";
import React, { type FC } from "react";
import { Heart } from "react-feather";
import cx from "classnames";
import MenuItemImage from "../MenuCatalog/MenuItemImage";

interface MenuCardProps {
  item: FoodType;
}

const MenuCard: FC<MenuCardProps> = ({ item }) => {
  const { id, category } = item;
  const t = useTranslations("menu");
  const [checked, setChecked] = React.useState(false);
  const [animate, setAnimate] = React.useState(false);

  const onClickFavorite = () => {
    if (!checked) runFireworks();
    setChecked(prev => {
      return !prev;
    });
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 300);
  };

  const name = t(`menu.${category}.${id}.name`);

  return (
    <article className="group py-5 md:py-6">
      <div className="flex gap-4 md:gap-5">
        <div className="flex flex-col flex-1 gap-3 min-w-0">
          <div>
            <h3 className="text-label text-sm md:text-base normal-case tracking-wide text-brand-green">
              {name}
            </h3>
            <p className="text-body text-sm text-brand-green/60 mt-1.5 leading-relaxed">
              {t(`menu.${category}.${id}.description`)}
            </p>
          </div>
          <div className="flex divide-x divide-brand-green/10">
            {item.variants.length > 0 ? (
              item.variants.map((variant, index) => (
                <div key={index} className="min-w-[60px] md:min-w-[90px] px-3 first:pl-0">
                  <p className="text-[10px] text-brand-green/45 uppercase tracking-wider">
                    {t(`variants.${variant.name}`)}
                  </p>
                  <p className="text-lg font-semibold text-brand-green tabular-nums">${variant.price}</p>
                </div>
              ))
            ) : (
              <div className="px-1">
                <p className="text-lg md:text-xl font-semibold text-brand-green tabular-nums">
                  ${item.price < 0 ? "—" : item.price}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="w-[88px] h-[88px] md:w-[104px] md:h-[104px] overflow-hidden shrink-0 relative border border-brand-green/10">
          <MenuItemImage src={item.image} alt={name} category={category} sizes="104px" />
        </div>
      </div>

      <button
        type="button"
        className="mt-3 h-10 w-10 flex items-center justify-center focus-brand text-brand-green/35 hover:text-brand-accent transition-colors duration-200"
        onClick={onClickFavorite}
        aria-pressed={checked}
        aria-label={checked ? "Quitar de favoritos" : "Agregar a favoritos"}>
        <Heart
          size={18}
          className={cx("transition-transform duration-300", {
            "scale-110": animate,
            "text-brand-accent fill-brand-accent": checked,
          })}
        />
      </button>
    </article>
  );
};

export default MenuCard;
