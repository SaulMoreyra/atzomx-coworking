"use client";
import React from "react";
import { useScrollUp } from "@/hooks/useScrollUp";
import cx from "classnames";
import Image from "next/image";
import MenuHeader from "../MenuHeader/MenuHeader";

const MenuBanner = () => {
  const isScrollUp = useScrollUp({ distance: 100 });

  return (
    <>
      <MenuHeader
        className={cx(
          "fixed min-h-[100px] top-0 z-20 w-full transition-opacity duration-300",
          { "opacity-0": !isScrollUp, "opacity-100 md:shadow-md": isScrollUp }
        )}
      />
      <div className="flex flex-col">
        <MenuHeader />
        <div className="flex flex-col items-center justify-center relative">
          <div className="absolute h-[168px] bg-primary-main w-full top-0 -mt-[1px]" />
          <div className="relative top-1 w-full max-h-[336px] max-w-[520px] md:rounded-md overflow-hidden aspect-square">
            <Image
              src="/images/coworking/atzomx.jpg"
              alt="header"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuBanner;
