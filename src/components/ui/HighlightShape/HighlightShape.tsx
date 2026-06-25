import React, { type FC } from "react";
import {
  organicDividerFills,
  organicDividerPaths,
  type OrganicDividerFill,
  type OrganicDividerVariant,
} from "@/design-system/dividers";
import cx from "classnames";

interface HighlightShapeProps {
  variant?: OrganicDividerVariant;
  fill?: OrganicDividerFill;
  className?: string;
  size?: number;
}

/**
 * Decorative highlight blob — mirrors @atzomx Instagram story highlights.
 * Use beside section titles or as subtle brand accents.
 */
const HighlightShape: FC<HighlightShapeProps> = ({
  variant = "star",
  fill = "accent",
  className,
  size = 48,
}) => {
  return (
    <svg
      viewBox="0 0 1440 120"
      width={size}
      height={Math.round(size * (120 / 1440))}
      className={cx("shrink-0", className)}
      role="presentation"
      aria-hidden="true">
      <path d={organicDividerPaths[variant]} fill={organicDividerFills[fill]} />
    </svg>
  );
};

export default HighlightShape;
