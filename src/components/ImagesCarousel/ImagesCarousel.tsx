import React, { FC } from "react";
import Category from "../Category/Category";
import { ImageType } from "@/common/types/categoryTypes";

type ImagesCarouselProps = {
  images: ImageType[];
};

const ImagesCarousel: FC<ImagesCarouselProps> = ({ images }) => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col items-center">
        <p className="text-xl text-gray-400">Flavor & Atmosphere</p>
      </div>
      <div
        className={`grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5 min-h-[50vh] items-center`}
      >
        {images.map((category, index) => (
          <Category
            key={index}
            category={category}
            className="h-[30vh]   lg:odd:h-full lg:even:h-[80%]"
          />
        ))}
      </div>
    </div>
  );
};

export default ImagesCarousel;
