import { type FeedGridLayout, feedGridLayoutClasses } from "./illustrations";

export type SpaceGalleryTileId =
  | "terrace"
  | "desks"
  | "meeting-room"
  | "coffee-bar"
  | "monitor-desk"
  | "facade"
  | "community"
  | "latte-art";

export interface SpaceGalleryTile {
  id: SpaceGalleryTileId;
  /** Replace file at this path when real photo is ready — no code change needed */
  src: string;
  layout: FeedGridLayout;
}

/** Real-space gallery tiles — swap images in public/images/coworking/ */
export const SPACE_GALLERY_TILES: SpaceGalleryTile[] = [
  { id: "terrace", src: "/images/coworking/puff.webp", layout: "wide" },
  { id: "desks", src: "/images/coworking/standar.webp", layout: "square" },
  { id: "meeting-room", src: "/images/coworking/meeting-room.webp", layout: "tall" },
  { id: "coffee-bar", src: "/images/coworking/coffeebar.webp", layout: "square" },
  { id: "monitor-desk", src: "/images/coworking/monitor.webp", layout: "square" },
  { id: "facade", src: "/images/coworking/atzomx.webp", layout: "square" },
  { id: "community", src: "/images/coworking/lunch.webp", layout: "wide" },
  { id: "latte-art", src: "/images/coworking/art-latte.webp", layout: "square" },
];

export const SPACE_GALLERY_DEFAULT_IMAGE = "/images/coworking/default-space.webp";

export { feedGridLayoutClasses };
