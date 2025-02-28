import { type FoodType } from "@/common/types/menuTypes";
import Image from "next/image";
import React, { type FC } from "react";
import { Heart } from "react-feather";

interface MenuCardProps {
  item: FoodType;
}

const MenuCard: FC<MenuCardProps> = ({ item }) => {
  return (
    <div className="rounded-md shadow-md hover:border-gray-400 flex-col border border-gray-200 min-height-[190px]">
      <div className="p-6 flex">
        <div className="flex flex-col flex-1 gap-2">
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-semibold">{item.name}</h3>
            <p className="text-gray-400 text-sm">{item.description}</p>
          </div>
          <div className="flex divide-x divide-gray-200">
            {item.variants.length > 1 ? (
              item.variants.map((variant, index) => (
                <div key={index} className="min-w-[100px] px-5 first:pl-0">
                  <p className="text-xs text-gray-400">{variant.name}</p>
                  <h4 className="text-xl font-semibold">${variant.price}</h4>
                </div>
              ))
            ) : (
              <div className="min-w-[100px] px-5 first:pl-0">
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
            alt={item.name}
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
