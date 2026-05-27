import {
  organicDividerFills,
  organicDividerPaths,
  type OrganicDividerFill,
  type OrganicDividerVariant,
} from "@/design-system/dividers";
import cx from "classnames";
import React, { type FC } from "react";

interface OrganicDividerProps {
  /** Color of the section below the divider */
  fill: OrganicDividerFill;
  variant?: OrganicDividerVariant;
  className?: string;
  flip?: boolean;
}

/** Soft organic transition between full-bleed color bands */
const OrganicDivider: FC<OrganicDividerProps> = ({
  fill,
  variant = "wave",
  className,
  flip = false,
}) => {
  return (
    <div
      className={cx("w-full leading-[0] -mt-px", flip && "rotate-180", className)}
      aria-hidden="true">
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block w-full h-8 sm:h-10 md:h-12 lg:h-14"
        role="presentation">
        <path d={organicDividerPaths[variant]} fill={organicDividerFills[fill]} />
      </svg>
    </div>
  );
};

export default OrganicDivider;
