"use client";

import { type ImageType } from "@/common/types/categoryTypes";
import cx from "classnames";
import Image from "next/image";
import React, { type FC } from "react";

interface CategoryProps {
  category: ImageType;
  className?: string;
}

const Category: FC<CategoryProps> = ({
  category: { name: category, image },
  className,
}) => {
  return (
    <div
      className={cx(
        "relative rounded-md p-10 flex flex-col items-center justify-center overflow-hidden",
        className
      )}>
      <Image
        src={image}
        alt={category}
        fill={true}
        className="absolute object-cover z-0 rounded-md transition-zoom"
      />
    </div>
  );
};

export default Category;
