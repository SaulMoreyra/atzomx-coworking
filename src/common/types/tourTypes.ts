export type TourSceneId =
  | "0-calle"
  | "1-entrada"
  | "2-centro"
  | "3-salida"
  | "4-esquina"
  | "5-barra"
  | "6-subiendo"
  | "7-escaleras-1"
  | "8-escaleras-2"
  | "9-escaleras-3"
  | "10-terraza-1"
  | "11-terraza-2"
  | "12-sala-de-juntas"
  | "13-entrada-coworking"
  | "14-coworking-1"
  | "15-coworking-2"
  | "16-coworking-3"
  | "17-coworking-4";

/** Translation key under `tour.viewer.scenes`. */
export type TourSceneNameKey =
  | "street"
  | "entrance"
  | "center"
  | "exit"
  | "corner"
  | "bar"
  | "goingUp"
  | "stairs1"
  | "stairs2"
  | "stairs3"
  | "terrace1"
  | "terrace2"
  | "meetingRoom"
  | "coworkingEntrance"
  | "coworking1"
  | "coworking2"
  | "coworking3"
  | "coworking4";

export interface TourLevel {
  tileSize: number;
  size: number;
  fallbackOnly?: boolean;
}

export interface TourViewParameters {
  yaw: number;
  pitch: number;
  fov: number;
}

export interface TourLinkHotspot {
  yaw: number;
  pitch: number;
  /** Arrow rotation in radians. */
  rotation: number;
  target: TourSceneId;
}

export interface TourScene {
  id: TourSceneId;
  nameKey: TourSceneNameKey;
  levels: TourLevel[];
  faceSize: number;
  initialViewParameters: TourViewParameters;
  linkHotspots: TourLinkHotspot[];
}
