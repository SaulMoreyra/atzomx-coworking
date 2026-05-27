import { FEED_GRID_TILES, feedGridLayoutClasses } from "@/design-system";
import cx from "classnames";
import Image from "next/image";
import React, { type FC } from "react";
import BrandIllustration from "../ui/BrandIllustration/BrandIllustration";

/** Editorial asymmetric grid — sharp crops, varied spans */
const FeedGrid: FC = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-0.5 sm:gap-1 md:gap-1.5">
      {FEED_GRID_TILES.map((tile, index) => {
        const layoutClass = feedGridLayoutClasses[tile.layout];

        if (tile.type === "photo") {
          return (
            <div key={index} className={cx("relative overflow-hidden bg-brand-main/20", layoutClass)}>
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          );
        }

        return (
          <div
            key={index}
            className={cx("overflow-hidden flex items-center justify-center bg-brand-main/40", layoutClass)}>
            <BrandIllustration
              id={tile.id}
              className="h-full w-full [&_img]:h-full [&_img]:w-full [&_img]:object-cover"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
          </div>
        );
      })}
    </div>
  );
};

export default FeedGrid;
