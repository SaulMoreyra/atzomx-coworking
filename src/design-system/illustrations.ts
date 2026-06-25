/** Brand illustration assets — official SVGs with PNG fallbacks. */
export type BrandIllustrationId =
  | "facade"
  | "barista"
  | "community-table"
  | "cafe-croissant"
  | "coworking-laptop"
  | "sticker-barista"
  | "sticker-laptop-man";

export interface BrandIllustrationAsset {
  src: string;
  alt: string;
  svgSrc?: string;
  /** Intrinsic width of the active asset (SVG viewBox when available). */
  width: number;
  /** Intrinsic height of the active asset (SVG viewBox when available). */
  height: number;
}

export const BRAND_ILLUSTRATIONS: Record<BrandIllustrationId, BrandIllustrationAsset> = {
  facade: {
    src: "/images/illustrations/facade.png",
    svgSrc: "/images/logos/logo-house.svg",
    alt: "Ilustración de la fachada de Atzomx en Oaxaca",
    width: 521,
    height: 287,
  },
  barista: {
    src: "/images/illustrations/barista.png",
    alt: "Ilustración de barista preparando café de especialidad",
    width: 800,
    height: 800,
  },
  "community-table": {
    src: "/images/illustrations/community-table.png",
    svgSrc: "/images/illustrations/illustration-team-work.svg",
    alt: "Ilustración de comunidad trabajando en mesa compartida",
    width: 499,
    height: 425,
  },
  "cafe-croissant": {
    src: "/images/illustrations/cafe-croissant.png",
    svgSrc: "/images/illustrations/illustration-woman-croissant.svg",
    alt: "Ilustración de persona disfrutando café y croissant",
    width: 316,
    height: 410,
  },
  "coworking-laptop": {
    src: "/images/illustrations/coworking-laptop.png",
    svgSrc: "/images/illustrations/illustration-man-board.svg",
    alt: "Ilustración de persona trabajando con pizarra y laptop en Atzomx",
    width: 366,
    height: 393,
  },
  "sticker-barista": {
    src: "/images/illustrations/sticker-barista.svg",
    alt: "Sticker de barista preparando café en Atzomx",
    width: 381,
    height: 454,
  },
  "sticker-laptop-man": {
    src: "/images/illustrations/sticker-laptop-man.svg",
    alt: "Sticker de persona trabajando con laptop en Atzomx",
    width: 356,
    height: 410,
  },
};

/** Feed grid layout spans — shared by SpaceGallery tile sizing */
export type FeedGridLayout = "square" | "tall" | "wide" | "banner";

export const feedGridLayoutClasses: Record<FeedGridLayout, string> = {
  square: "col-span-1 aspect-square",
  tall: "col-span-1 row-span-2 min-h-[240px] sm:min-h-[280px] md:min-h-[420px]",
  wide: "col-span-2 aspect-[2/1]",
  banner: "col-span-2 lg:col-span-3 aspect-[5/2] sm:aspect-[3/1]",
};

export function getIllustrationSrc(id: BrandIllustrationId): string {
  const asset = BRAND_ILLUSTRATIONS[id];
  return asset.svgSrc ?? asset.src;
}
