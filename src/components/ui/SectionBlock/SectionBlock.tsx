import { brandSurfaces, type BrandSurface } from "@/design-system";
import { HEADER_SURFACE_ATTR, type HeaderSurface } from "@/design-system/header";
import cx from "classnames";
import React, { type FC, type ReactNode } from "react";

interface SectionBlockProps {
  children: ReactNode;
  surface?: BrandSurface;
  headerSurface?: HeaderSurface;
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
  headerSurface,
  id,
  className,
  as: Tag = "section",
  rounded = false,
}) => {
  return (
    <Tag
      id={id}
      {...(headerSurface ? { [HEADER_SURFACE_ATTR]: headerSurface } : {})}
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
