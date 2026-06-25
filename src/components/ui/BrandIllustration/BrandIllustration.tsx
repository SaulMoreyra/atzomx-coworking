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
  const isRaster = /\.(png|jpe?g|webp)$/i.test(src);
  const isSvg = /\.svg$/i.test(src);

  return (
    <div className={cx("relative max-w-full", className)}>
      <Image
        src={src}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        priority={priority}
        sizes={sizes}
        unoptimized={isRaster || isSvg}
        decoding="sync"
        className="h-auto w-full object-contain"
      />
    </div>
  );
};

export default BrandIllustration;
