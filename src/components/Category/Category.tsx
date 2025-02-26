"use client";

import { type CategoryType } from "@/common/types/categoryTypes";
import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import React, { type FC } from "react";

interface CategoryProps {
  category: CategoryType;
  className?: string;
}

const Category: FC<CategoryProps> = ({
  category: { name: category, image },
  className,
}) => {
  return (
    <Link
      href={`/search?category=${category}`}
      className={cx(
        "relative rounded-md p-10 flex flex-col items-center justify-center overflow-hidden",
        className
      )}
    >
      <Image
        src={image}
        alt={category}
        fill={true}
        className="absolute object-cover z-0 rounded-md transition-zoom"
      />
    </Link>
  );
};

export default Category;
