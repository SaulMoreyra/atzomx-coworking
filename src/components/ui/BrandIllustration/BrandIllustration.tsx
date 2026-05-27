import {
  BRAND_ILLUSTRATIONS,
  getIllustrationSrc,
  type BrandIllustrationId,
} from "@/design-system";
import cx from "classnames";
import Image from "next/image";
import React, { type FC } from "react";

interface BrandIllustrationProps {
  id: BrandIllustrationId;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/** Renders brand illustrations — prefers `svgSrc` from design-system when available */
const BrandIllustration: FC<BrandIllustrationProps> = ({
  id,
  className,
  priority = false,
  sizes = "(max-width: 768px) 90vw, 480px",
}) => {
  const asset = BRAND_ILLUSTRATIONS[id];
  const src = getIllustrationSrc(id);

  return (
    <div className={cx("relative w-full", className)}>
      <Image
        src={src}
        alt={asset.alt}
        width={800}
        height={800}
        priority={priority}
        sizes={sizes}
        className="w-full h-auto object-contain"
      />
    </div>
  );
};

export default BrandIllustration;
