"use client";

import {
  SPACE_GALLERY_DEFAULT_IMAGE,
  SPACE_GALLERY_TILES,
  feedGridLayoutClasses,
  type SpaceGalleryTile,
} from "@/design-system/gallery";
import HighlightShape from "@/components/ui/HighlightShape/HighlightShape";
import Label from "@/components/ui/Label/Label";
import OrganicDivider from "@/components/ui/OrganicDivider/OrganicDivider";
import cx from "classnames";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React, { useCallback, useEffect, useState } from "react";
import { X, ZoomIn } from "react-feather";

const GalleryTileImage: React.FC<{
  tile: SpaceGalleryTile;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
}> = ({ tile, alt, className, sizes, priority }) => {
  const [src, setSrc] = useState(tile.src);

  useEffect(() => {
    setSrc(tile.src);
  }, [tile.src]);

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      className={className}
      sizes={sizes}
      onError={() => {
        if (src !== SPACE_GALLERY_DEFAULT_IMAGE) setSrc(SPACE_GALLERY_DEFAULT_IMAGE);
      }}
    />
  );
};

const SpaceGallery = () => {
  const t = useTranslations("home.gallery");
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeTile = SPACE_GALLERY_TILES.find(tile => tile.id === activeId);

  const closeLightbox = useCallback(() => {
    setActiveId(null);
  }, []);

  useEffect(() => {
    if (!activeId) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeId, closeLightbox]);

  return (
    <>
      <OrganicDivider fill="main" variant="wave" />
      <section id="gallery" className="w-full bg-brand-main py-14 text-brand-green md:py-20">
        <div className="section-container mb-10 flex flex-col items-center gap-3 text-center md:mb-12">
          <HighlightShape variant="clover" fill="accent" size={52} className="opacity-95" />
          <Label as="p" className="text-xs tracking-[0.25em]">
            {t("sectionTitle")}
          </Label>
          <h2 className="text-label text-xl normal-case tracking-wide md:text-2xl">{t("title")}</h2>
          <p className="text-body max-w-2xl text-sm leading-relaxed text-brand-green/70 md:text-base">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 auto-rows-fr gap-1 sm:gap-1.5 md:gap-2 lg:grid-cols-4">
          {SPACE_GALLERY_TILES.map(tile => {
            const label = t(`tiles.${tile.id}.label`);
            const alt = t(`tiles.${tile.id}.alt`);

            return (
              <button
                key={tile.id}
                type="button"
                onClick={() => {
                  setActiveId(tile.id);
                }}
                className={cx(
                  "group relative min-h-[140px] overflow-hidden bg-brand-cream/40 text-left",
                  "transition-shadow duration-200 hover:shadow-[0_8px_24px_-10px_rgba(47,62,34,0.2)] focus-brand",
                  feedGridLayoutClasses[tile.layout]
                )}
                aria-label={t("openPhoto", { label })}>
                <GalleryTileImage
                  tile={tile}
                  alt={alt}
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-green/75 to-transparent px-3 pb-3 pt-8">
                  <span className="text-label block text-[10px] tracking-[0.14em] text-brand-cream md:text-xs">
                    {label}
                  </span>
                </span>
                <span
                  className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-brand-cream/90 text-brand-green opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                  aria-hidden="true">
                  <ZoomIn size={16} />
                </span>
              </button>
            );
          })}
        </div>
      </section>
      <OrganicDivider fill="cream" variant="cloud" />

      {activeTile ? (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-brand-green/60 p-4 backdrop-blur-sm md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={t(`tiles.${activeTile.id}.label`)}
          onClick={closeLightbox}>
          <button
            type="button"
            onClick={closeLightbox}
            className="focus-brand absolute right-4 top-4 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-brand-cream text-brand-green md:right-8 md:top-8"
            aria-label={t("closePhoto")}>
            <X size={20} />
          </button>
          <figure
            className="relative h-[min(80vh,720px)] w-full max-w-5xl overflow-hidden border border-brand-green/15 bg-brand-cream shadow-2xl"
            onClick={event => {
              event.stopPropagation();
            }}>
            <GalleryTileImage
              tile={activeTile}
              alt={t(`tiles.${activeTile.id}.alt`)}
              className="object-contain"
              sizes="100vw"
              priority
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-brand-green/80 px-4 py-3 text-center">
              <p className="text-label text-xs tracking-[0.14em] text-brand-cream md:text-sm">
                {t(`tiles.${activeTile.id}.label`)}
              </p>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </>
  );
};

export default SpaceGallery;
