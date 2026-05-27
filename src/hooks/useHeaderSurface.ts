"use client";

import {
  DEFAULT_HEADER_SURFACE,
  HEADER_SURFACE_ATTR,
  type HeaderSurface,
} from "@/design-system/header";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const HEADER_SHELL_SELECTOR = ".site-header-shell";
const PROBE_OFFSET_PX = 4;

function parseSurface(value: string | undefined): HeaderSurface {
  if (value === "cream" || value === "accent" || value === "main") {
    return value;
  }
  return DEFAULT_HEADER_SURFACE;
}

function getHeaderHeight(): number {
  const shell = document.querySelector(HEADER_SHELL_SELECTOR);
  return shell?.getBoundingClientRect().height ?? 72;
}

function resolveSurfaceFromScroll(): HeaderSurface {
  const sections = document.querySelectorAll<HTMLElement>(`[${HEADER_SURFACE_ATTR}]`);
  if (sections.length === 0) {
    return DEFAULT_HEADER_SURFACE;
  }

  const probeY = getHeaderHeight() + PROBE_OFFSET_PX;
  let match: HTMLElement | null = null;

  for (const section of sections) {
    const { top, bottom } = section.getBoundingClientRect();
    if (top <= probeY && bottom > probeY) {
      match = section;
      break;
    }
  }

  if (!match) {
    let closestAbove: HTMLElement | null = null;
    let closestDistance = Number.POSITIVE_INFINITY;

    for (const section of sections) {
      const { top, bottom } = section.getBoundingClientRect();
      if (top <= probeY && bottom > 0) {
        const distance = probeY - top;
        if (distance < closestDistance) {
          closestDistance = distance;
          closestAbove = section;
        }
      }
    }

    match = closestAbove ?? sections[0];
  }

  return parseSurface(match?.dataset.headerSurface);
}

export function useHeaderSurface(active: boolean): HeaderSurface | null {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [surface, setSurface] = useState<HeaderSurface>(DEFAULT_HEADER_SURFACE);

  useEffect(() => {
    if (!active || !isHome) {
      return;
    }

    let frame = 0;

    const syncSurface = () => {
      frame = 0;
      setSurface(resolveSurfaceFromScroll());
    };

    const scheduleSync = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(syncSurface);
    };

    syncSurface();

    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync, { passive: true });
    window.addEventListener("hashchange", syncSurface);

    const sections = document.querySelectorAll<HTMLElement>(`[${HEADER_SURFACE_ATTR}]`);
    const headerHeight = getHeaderHeight();

    const observer = new IntersectionObserver(
      () => {
        scheduleSync();
      },
      {
        root: null,
        rootMargin: `-${headerHeight}px 0px -60% 0px`,
        threshold: 0,
      }
    );

    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
      observer.disconnect();
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
      window.removeEventListener("hashchange", syncSurface);
    };
  }, [active, isHome, pathname]);

  if (!isHome) {
    return null;
  }

  return surface;
}
