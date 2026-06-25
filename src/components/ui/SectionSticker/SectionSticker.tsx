import BrandIllustration from "@/components/ui/BrandIllustration/BrandIllustration";
import { type BrandIllustrationId } from "@/design-system";
import cx from "classnames";
import React, { type FC } from "react";

interface SectionStickerProps {
  id: BrandIllustrationId;
  className?: string;
  sizes?: string;
}

/** Decorative brand sticker — never blocks interaction or reading order */
const SectionSticker: FC<SectionStickerProps> = ({ id, className, sizes }) => (
  <div aria-hidden="true" className={cx("pointer-events-none select-none", className)}>
    <BrandIllustration id={id} sizes={sizes} />
  </div>
);

export default SectionSticker;
