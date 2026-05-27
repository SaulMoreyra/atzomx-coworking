import { brandSurfaces, type BrandSurface } from "@/design-system";
import cx from "classnames";
import React, { type FC, type ReactNode } from "react";

interface SectionBlockProps {
  children: ReactNode;
  surface?: BrandSurface;
  id?: string;
  className?: string;
  as?: "section" | "div" | "article";
  rounded?: boolean;
}

const textBySurface: Partial<Record<BrandSurface, string>> = {
  green: "text-brand-on-green",
};

/** Branded surface wrapper — use for alternating color blocks across pages */
const SectionBlock: FC<SectionBlockProps> = ({
  children,
  surface = "cream",
  id,
  className,
  as: Tag = "section",
  rounded = false,
}) => {
  return (
    <Tag
      id={id}
      className={cx(
        brandSurfaces[surface],
        textBySurface[surface] ?? "text-brand-green",
        rounded && "rounded-xl",
        className
      )}>
      {children}
    </Tag>
  );
};

export default SectionBlock;
