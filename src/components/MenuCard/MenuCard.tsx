import { type FoodType } from "@/common/types/menuTypes";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { type FC } from "react";
import { Heart } from "react-feather";

interface MenuCardProps {
  item: FoodType;
}

const MenuCard: FC<MenuCardProps> = ({ item }) => {
  const { id, category } = item;
  const t = useTranslations("menu");

  return (
    <div className="rounded-md shadow-md hover:border-gray-400 flex-col border border-gray-200 min-height-[190px]">
      <div className="p-6 flex gap-2">
        <div className="flex flex-col flex-1 gap-2">
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-semibold">
              {t(`menu.${category}.${id}.name`)}
            </h3>
            <p className="text-gray-400 text-sm">
              {t(`menu.${category}.${id}.description`)}
            </p>
          </div>
          <div className="flex divide-x divide-gray-200">
            {item.variants.length > 0 ? (
              item.variants.map((variant, index) => (
                <div
                  key={index}
                  className="min-w-[60px] md:min-w-[100px] px-2 md:px-5 first:pl-0">
                  <p className="text-xs text-gray-400">
                    {t(`variants.${variant.name}`)}
                  </p>
                  <h4 className="text-xl font-semibold">${variant.price}</h4>
                </div>
              ))
            ) : (
              <div className="min-w-[60px] md:min-w-[100px] px-2 md:px-5 first:pl-0">
                <h4 className="text-lg md:text-xl font-semibold">
                  ${item.price}
                </h4>
              </div>
            )}
          </div>
        </div>
        <div className="w-[100px] h-[100px] md:w-[140px] md:h-[140px] rounded-md overflow-hidden aspect-square relative">
          <Image
            src={item.image}
            alt={item.id}
            fill={true}
            className="object-cover"
          />
        </div>
      </div>
      <div className="border-b border-gray-200" />
      <div className="h-[64px] flex items-center px-6">
        <Heart className="text-gray-400" />
      </div>
    </div>
  );
};

export default MenuCard;
