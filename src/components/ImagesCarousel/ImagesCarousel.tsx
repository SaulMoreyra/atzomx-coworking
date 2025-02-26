import React, { FC } from "react";
import Category from "../Category/Category";
import { CategoryType } from "@/common/types/categoryTypes";

type ImagesCarouselProps = {
  categories: CategoryType[];
};

const ImagesCarousel: FC<ImagesCarouselProps> = ({ categories }) => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col items-center">
        <p className="text-xl text-gray-400">Shop by category</p>
      </div>
      <div
        className={`grid grid-cols-1 gap-5 md:grid-cols-${categories.length} min-h-[50vh] items-center`}
      >
        {categories.map((category, index) => (
          <Category
            key={index}
            category={category}
            className="h-[30vh] md:odd:h-full md:even:h-[80%]"
          />
        ))}
      </div>
    </div>
  );
};

export default ImagesCarousel;
