"use client";

import Image from "next/image";
import React, { type FC, useEffect, useState } from "react";
import cx from "classnames";
import { MENU_DEFAULT_IMAGE } from "./menuUtils";

interface MenuItemImageProps {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
}

const MenuItemImage: FC<MenuItemImageProps> = ({ src, alt, sizes, className }) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className={cx("object-cover", className)}
      sizes={sizes}
      onError={() => {
        if (imgSrc !== MENU_DEFAULT_IMAGE) setImgSrc(MENU_DEFAULT_IMAGE);
      }}
    />
  );
};

export default MenuItemImage;
