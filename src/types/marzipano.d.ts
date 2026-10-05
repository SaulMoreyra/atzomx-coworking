/* eslint-disable @typescript-eslint/no-extraneous-class -- ambient declarations mirror the library's classes */
/** Minimal typings for the subset of `marzipano` used by `VirtualTour`. */
declare module "marzipano" {
  interface ViewParameters {
    yaw: number;
    pitch: number;
    fov: number;
  }

  type ViewLimiter = (params: ViewParameters) => ViewParameters;
  export type Movement = () => (params: ViewParameters) => ViewParameters;

  export class RectilinearView {
    constructor(params?: Partial<ViewParameters>, limiter?: ViewLimiter);
    setParameters(params: Partial<ViewParameters>): void;
    static limit: {
      traditional: (
        maxResolution: number,
        maxVFov: number,
        maxHFov?: number
      ) => ViewLimiter;
    };
  }

  export class CubeGeometry {
    constructor(
      levels: Array<{ tileSize: number; size: number; fallbackOnly?: boolean }>
    );
  }

  export class ImageUrlSource {
    static fromString(
      url: string,
      opts?: { cubeMapPreviewUrl?: string }
    ): ImageUrlSource;
  }

  export class HotspotContainer {
    createHotspot(
      element: HTMLElement,
      coords: { yaw: number; pitch: number }
    ): unknown;
  }

  export class Scene {
    hotspotContainer(): HotspotContainer;
    switchTo(opts?: { transitionDuration?: number }, done?: () => void): void;
  }

  export class ElementPressControlMethod {
    constructor(
      element: HTMLElement,
      parameter: "x" | "y" | "zoom",
      velocity: number,
      friction: number
    );
  }

  export class KeyControlMethod {
    constructor(
      keyCode: number,
      parameter: "x" | "y" | "zoom",
      velocity: number,
      friction: number,
      element?: HTMLElement
    );
  }

  export class Controls {
    registerMethod(
      id: string,
      method: ElementPressControlMethod | KeyControlMethod,
      enable?: boolean
    ): void;
  }

  export class Viewer {
    constructor(
      domElement: HTMLElement,
      opts?: { controls?: { mouseViewMode?: "drag" | "qtvr" } }
    );
    createScene(opts: {
      source: ImageUrlSource;
      geometry: CubeGeometry;
      view: RectilinearView;
      pinFirstLevel?: boolean;
    }): Scene;
    controls(): Controls;
    startMovement(fn: Movement): void;
    stopMovement(): void;
    setIdleMovement(timeout: number, movement?: Movement): void;
    destroy(): void;
  }

  export function autorotate(opts: {
    yawSpeed?: number;
    targetPitch?: number;
    targetFov?: number;
  }): Movement;
}
