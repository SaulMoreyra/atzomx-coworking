"use client";

import type { TourLinkHotspot, TourSceneId } from "@/common/types/tourTypes";
import { TOUR_SCENES, TOUR_TILES_BASE_PATH } from "@/mocks/tour360";
import cx from "classnames";
import type { Movement, RectilinearView, Scene, Viewer } from "marzipano";
import { useTranslations } from "next-intl";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Maximize,
  Minimize,
  Minus,
  Pause,
  Play,
  Plus,
} from "react-feather";

type Status = "loading" | "ready" | "error";
type PressControl = "up" | "down" | "left" | "right" | "zoomIn" | "zoomOut";

interface SceneHandle {
  scene: Scene;
  view: RectilinearView;
}

interface HotspotHandle {
  label: HTMLSpanElement;
  button: HTMLButtonElement;
  target: TourSceneId;
}

const PRESS_VELOCITY = 0.7;
const PRESS_FRICTION = 3;
const AUTOROTATE_IDLE_MS = 3000;

/** [control, axis, direction, keyCode] — same velocities as the Marzipano Tool export. */
const PRESS_CONTROLS: Array<
  [PressControl, "x" | "y" | "zoom", 1 | -1, number]
> = [
  ["up", "y", -1, 38],
  ["down", "y", 1, 40],
  ["left", "x", -1, 37],
  ["right", "x", 1, 39],
  ["zoomIn", "zoom", -1, 187],
  ["zoomOut", "zoom", 1, 189],
];

/** Feather `arrow-up`, inlined because hotspots are plain DOM nodes owned by Marzipano. */
const HOTSPOT_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>';

const STOP_PROPAGATION_EVENTS = [
  "touchstart",
  "touchmove",
  "touchend",
  "touchcancel",
  "wheel",
];

const createHotspotElement = (
  hotspot: TourLinkHotspot,
  onSelect: (id: TourSceneId) => void
) => {
  const wrapper = document.createElement("div");

  const button = document.createElement("button");
  button.type = "button";
  button.className =
    "group relative -ml-7 -mt-7 flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand-cream bg-brand-green/80 text-brand-cream shadow-lg transition-colors duration-200 hover:bg-brand-green focus-brand";
  button.innerHTML = HOTSPOT_ICON;
  const icon = button.firstElementChild as SVGElement;
  icon.style.transform = `rotate(${hotspot.rotation}rad)`;
  button.addEventListener("click", () => {
    onSelect(hotspot.target);
  });

  const label = document.createElement("span");
  label.className =
    "text-label pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-sm bg-brand-green px-2 py-1 text-[10px] tracking-[0.14em] text-brand-cream opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100";
  button.appendChild(label);

  // Keep drag/zoom gestures on the hotspot from moving the panorama underneath.
  STOP_PROPAGATION_EVENTS.forEach(eventName => {
    wrapper.addEventListener(eventName, event => {
      event.stopPropagation();
    });
  });

  wrapper.appendChild(button);
  return { wrapper, button, label };
};

const VirtualTour = () => {
  const t = useTranslations("tour.viewer");
  const containerRef = useRef<HTMLDivElement>(null);
  const panoRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pressRefs = useRef<
    Partial<Record<PressControl, HTMLButtonElement | null>>
  >({});
  const viewerRef = useRef<Viewer | null>(null);
  const scenesRef = useRef(new Map<TourSceneId, SceneHandle>());
  const hotspotsRef = useRef<HotspotHandle[]>([]);
  const autorotateRef = useRef<Movement | null>(null);
  const isAutorotatingRef = useRef(false);

  const [status, setStatus] = useState<Status>("loading");
  const [currentId, setCurrentId] = useState<TourSceneId>(TOUR_SCENES[0].id);
  const [isAutorotating, setIsAutorotating] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const startAutorotate = useCallback(() => {
    const viewer = viewerRef.current;
    const movement = autorotateRef.current;
    if (!viewer || !movement || !isAutorotatingRef.current) return;
    viewer.startMovement(movement);
    viewer.setIdleMovement(AUTOROTATE_IDLE_MS, movement);
  }, []);

  const stopAutorotate = useCallback(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    viewer.stopMovement();
    viewer.setIdleMovement(Infinity);
  }, []);

  const switchScene = useCallback(
    (id: TourSceneId) => {
      const handle = scenesRef.current.get(id);
      const sceneData = TOUR_SCENES.find(scene => scene.id === id);
      if (!handle || !sceneData) return;

      stopAutorotate();
      handle.view.setParameters(sceneData.initialViewParameters);
      handle.scene.switchTo();
      startAutorotate();
      setCurrentId(id);
    },
    [startAutorotate, stopAutorotate]
  );

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const mod = await import("marzipano");
      const Marzipano =
        (mod as unknown as { default?: typeof mod }).default ?? mod;
      const panoElement = panoRef.current;
      const containerElement = containerRef.current;
      if (cancelled || !panoElement || !containerElement) return;

      const viewer = new Marzipano.Viewer(panoElement, {
        controls: { mouseViewMode: "drag" },
      });

      TOUR_SCENES.forEach(sceneData => {
        const source = Marzipano.ImageUrlSource.fromString(
          `${TOUR_TILES_BASE_PATH}/${sceneData.id}/{z}/{f}/{y}/{x}.jpg`,
          {
            cubeMapPreviewUrl: `${TOUR_TILES_BASE_PATH}/${sceneData.id}/preview.jpg`,
          }
        );
        const geometry = new Marzipano.CubeGeometry(sceneData.levels);
        const limiter = Marzipano.RectilinearView.limit.traditional(
          sceneData.faceSize,
          (100 * Math.PI) / 180,
          (120 * Math.PI) / 180
        );
        const view = new Marzipano.RectilinearView(
          sceneData.initialViewParameters,
          limiter
        );
        const scene = viewer.createScene({
          source,
          geometry,
          view,
          pinFirstLevel: true,
        });

        sceneData.linkHotspots.forEach(hotspot => {
          const { wrapper, button, label } = createHotspotElement(
            hotspot,
            switchScene
          );
          scene
            .hotspotContainer()
            .createHotspot(wrapper, { yaw: hotspot.yaw, pitch: hotspot.pitch });
          hotspotsRef.current.push({ button, label, target: hotspot.target });
        });

        scenesRef.current.set(sceneData.id, { scene, view });
      });

      const controls = viewer.controls();
      PRESS_CONTROLS.forEach(([control, axis, direction, keyCode]) => {
        const element = pressRefs.current[control];
        if (element) {
          controls.registerMethod(
            `${control}Element`,
            new Marzipano.ElementPressControlMethod(
              element,
              axis,
              direction * PRESS_VELOCITY,
              PRESS_FRICTION
            ),
            true
          );
        }
        // Keys only act while the viewer has focus, so page scrolling is untouched.
        controls.registerMethod(
          `${control}Key`,
          new Marzipano.KeyControlMethod(
            keyCode,
            axis,
            direction * PRESS_VELOCITY,
            PRESS_FRICTION,
            containerElement
          ),
          true
        );
      });

      autorotateRef.current = Marzipano.autorotate({
        yawSpeed: 0.03,
        targetPitch: 0,
        targetFov: Math.PI / 2,
      });
      viewerRef.current = viewer;
      setStatus("ready");
      switchScene(TOUR_SCENES[0].id);
    };

    init().catch(() => {
      if (!cancelled) setStatus("error");
    });

    return () => {
      cancelled = true;
      viewerRef.current?.destroy();
      viewerRef.current = null;
      scenesRef.current.clear();
      hotspotsRef.current = [];
    };
  }, [switchScene]);

  // Hotspot labels live outside React, so refresh them when the locale changes.
  useEffect(() => {
    if (status !== "ready") return;
    hotspotsRef.current.forEach(({ button, label, target }) => {
      const sceneData = TOUR_SCENES.find(scene => scene.id === target);
      if (!sceneData) return;
      const sceneName = t(`scenes.${sceneData.nameKey}`);
      label.textContent = sceneName;
      button.setAttribute("aria-label", t("goTo", { scene: sceneName }));
    });
  }, [status, t]);

  useEffect(() => {
    setCanFullscreen(document.fullscreenEnabled);
    const onChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node))
        setIsMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isMenuOpen]);

  const selectScene = (id: TourSceneId) => {
    switchScene(id);
    setIsMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  // Keys pressed inside the menu must not reach the viewer's arrow-key controls.
  const onMenuKeyDown = (event: React.KeyboardEvent) => {
    event.stopPropagation();
    if (event.key === "Escape" && isMenuOpen) {
      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    }
  };

  const toggleAutorotate = () => {
    const next = !isAutorotatingRef.current;
    isAutorotatingRef.current = next;
    setIsAutorotating(next);
    if (next) startAutorotate();
    else stopAutorotate();
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void containerRef.current?.requestFullscreen();
  };

  const controlButtonClass =
    "flex h-11 w-11 items-center justify-center rounded-full bg-brand-green/80 text-brand-cream transition-colors duration-200 hover:bg-brand-green focus-brand disabled:opacity-50";

  const pressButton = (control: PressControl, icon: React.ReactNode) => (
    <button
      type="button"
      ref={element => {
        pressRefs.current[control] = element;
      }}
      aria-label={t(`controls.${control}`)}
      disabled={status !== "ready"}
      className={controlButtonClass}>
      {icon}
    </button>
  );

  const currentScene =
    TOUR_SCENES.find(scene => scene.id === currentId) ?? TOUR_SCENES[0];
  const currentSceneName = t(`scenes.${currentScene.nameKey}`);

  return (
    <section
      aria-label={t("label")}
      className="w-full bg-brand-cream text-brand-green">
      <div className="section-container py-8 md:py-12">
        <div
          ref={containerRef}
          tabIndex={0}
          aria-label={t("viewerLabel")}
          aria-describedby="virtual-tour-hint"
          className={cx(
            "relative w-full overflow-hidden bg-brand-green focus-brand",
            isFullscreen
              ? "h-screen"
              : "h-[70vh] min-h-[420px] rounded-brand border border-brand-green"
          )}>
          <div ref={panoRef} className="absolute inset-0" />

          {status !== "ready" ? (
            <div
              className="absolute inset-0 flex items-center justify-center p-6 text-center"
              role="status">
              <p className="text-body max-w-sm text-sm text-brand-cream md:text-base">
                {status === "error" ? t("error") : t("loading")}
              </p>
            </div>
          ) : null}

          <div
            ref={menuRef}
            onKeyDown={onMenuKeyDown}
            className="pointer-events-none absolute bottom-20 left-4 top-4 flex max-w-[calc(100%-8rem)] flex-col items-start gap-2">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => {
                setIsMenuOpen(open => !open);
              }}
              aria-expanded={isMenuOpen}
              aria-controls="virtual-tour-scenes"
              aria-label={`${t("scenesMenu")}: ${currentSceneName}`}
              disabled={status !== "ready"}
              className="text-label pointer-events-auto inline-flex min-h-[44px] max-w-full items-center gap-2 rounded-full border border-brand-cream/60 bg-brand-green/80 px-4 text-[10px] tracking-[0.14em] text-brand-cream transition-colors duration-200 hover:bg-brand-green focus-brand disabled:opacity-50 md:text-xs">
              <span className="truncate">{currentSceneName}</span>
              <ChevronDown
                size={16}
                aria-hidden="true"
                className={cx(
                  "shrink-0 transition-transform duration-200",
                  isMenuOpen && "rotate-180"
                )}
              />
            </button>

            {isMenuOpen ? (
              <nav
                id="virtual-tour-scenes"
                aria-label={t("scenesLabel")}
                className="pointer-events-auto min-h-0 w-56 overflow-y-auto overscroll-contain rounded-brand border border-brand-cream/30 bg-brand-green/95 py-2 shadow-lg">
                <ul>
                  {TOUR_SCENES.map(scene => {
                    const isCurrent = scene.id === currentId;
                    return (
                      <li key={scene.id}>
                        <button
                          type="button"
                          onClick={() => {
                            selectScene(scene.id);
                          }}
                          aria-current={isCurrent ? "true" : undefined}
                          className={cx(
                            "text-label flex min-h-[44px] w-full items-center justify-between gap-3 px-4 text-left text-[10px] tracking-[0.14em] transition-colors duration-200 focus-brand md:text-xs",
                            isCurrent
                              ? "bg-brand-cream text-brand-green"
                              : "text-brand-cream hover:bg-brand-cream/10"
                          )}>
                          {t(`scenes.${scene.nameKey}`)}
                          {isCurrent ? (
                            <Check size={14} aria-hidden="true" />
                          ) : null}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ) : null}
          </div>

          <div className="absolute right-4 top-4 flex gap-2">
            <button
              type="button"
              onClick={toggleAutorotate}
              aria-pressed={isAutorotating}
              aria-label={t(
                isAutorotating ? "controls.pause" : "controls.play"
              )}
              disabled={status !== "ready"}
              className={controlButtonClass}>
              {isAutorotating ? (
                <Pause size={18} aria-hidden="true" />
              ) : (
                <Play size={18} aria-hidden="true" />
              )}
            </button>
            {canFullscreen ? (
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={t(
                  isFullscreen
                    ? "controls.exitFullscreen"
                    : "controls.fullscreen"
                )}
                className={controlButtonClass}>
                {isFullscreen ? (
                  <Minimize size={18} aria-hidden="true" />
                ) : (
                  <Maximize size={18} aria-hidden="true" />
                )}
              </button>
            ) : null}
          </div>

          <div className="absolute bottom-4 right-4 hidden gap-2 md:flex">
            {pressButton("zoomOut", <Minus size={18} aria-hidden="true" />)}
            {pressButton("zoomIn", <Plus size={18} aria-hidden="true" />)}
            {pressButton("left", <ChevronLeft size={18} aria-hidden="true" />)}
            {pressButton("up", <ChevronUp size={18} aria-hidden="true" />)}
            {pressButton("down", <ChevronDown size={18} aria-hidden="true" />)}
            {pressButton(
              "right",
              <ChevronRight size={18} aria-hidden="true" />
            )}
          </div>
        </div>

        <p
          id="virtual-tour-hint"
          className="text-body mt-4 text-sm text-brand-green/70">
          {t("hint")}
        </p>
      </div>
    </section>
  );
};

export default VirtualTour;
