/**
 * Brand illustration assets.
 * PNG placeholders today — set `svgSrc` when official SVGs are ready.
 */
export type BrandIllustrationId =
  | "facade"
  | "barista"
  | "community-table"
  | "cafe-croissant"
  | "coworking-laptop";

export interface BrandIllustrationAsset {
  src: string;
  alt: string;
  svgSrc?: string;
}

export const BRAND_ILLUSTRATIONS: Record<BrandIllustrationId, BrandIllustrationAsset> = {
  facade: {
    src: "/images/illustrations/facade.png",
    alt: "Ilustración de la fachada de Atzomx en Oaxaca",
  },
  barista: {
    src: "/images/illustrations/barista.png",
    alt: "Ilustración de barista preparando café de especialidad",
  },
  "community-table": {
    src: "/images/illustrations/community-table.png",
    alt: "Ilustración de comunidad trabajando en mesa compartida",
  },
  "cafe-croissant": {
    src: "/images/illustrations/cafe-croissant.png",
    alt: "Ilustración de persona disfrutando café y croissant",
  },
  "coworking-laptop": {
    src: "/images/illustrations/coworking-laptop.png",
    alt: "Ilustración de persona trabajando con laptop en Atzomx",
  },
};

/** Feed grid — alternates illustrations and photography like @atzomx Instagram */
export const FEED_GRID_TILES = [
  { type: "illustration" as const, id: "barista" as BrandIllustrationId, layout: "tall" },
  {
    type: "photo" as const,
    src: "/images/coworking/atzomx.webp",
    alt: "Fachada de Atzomx en el Centro de Oaxaca",
    layout: "square",
  },
  { type: "illustration" as const, id: "facade" as BrandIllustrationId, layout: "square" },
  {
    type: "photo" as const,
    src: "/images/coworking/meeting-room.webp",
    alt: "Interior del coworking Atzomx",
    layout: "wide",
  },
  { type: "illustration" as const, id: "coworking-laptop" as BrandIllustrationId, layout: "square" },
  {
    type: "photo" as const,
    src: "/images/coworking/art-latte.webp",
    alt: "Latte art en Atzomx Café",
    layout: "square",
  },
  { type: "illustration" as const, id: "community-table" as BrandIllustrationId, layout: "tall" },
  {
    type: "photo" as const,
    src: "/images/coworking/monitor.webp",
    alt: "Escritorio con monitor en Atzomx",
    layout: "square",
  },
  {
    type: "illustration" as const,
    id: "cafe-croissant" as BrandIllustrationId,
    layout: "banner",
  },
] as const;

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
