"use client";

import { type ReviewType } from "@/common/types/planTypes";
import Image from "next/image";
import React, { type FC, useState } from "react";
import { ExternalLink } from "react-feather";
import Label from "../ui/Label/Label";
import cx from "classnames";

interface ReviewCardProps {
  review: ReviewType;
  googleMapsUri?: string;
  readMoreLabel: string;
  readLessLabel: string;
  viewOnGoogleLabel: string;
}

const COLLAPSE_THRESHOLD = 220;

function getInitial(name: string): string {
  return name.trim().charAt(0).toUpperCase() || "?";
}

const ReviewCard: FC<ReviewCardProps> = ({
  review: {
    client: { image, name },
    rating,
    review,
  },
  googleMapsUri,
  readMoreLabel,
  readLessLabel,
  viewOnGoogleLabel,
}) => {
  const [expanded, setExpanded] = useState(false);
  const starCount = Math.min(5, Math.max(1, Math.round(rating)));
  const isLong = review.length > COLLAPSE_THRESHOLD;
  const showToggle = isLong && !expanded;

  return (
    <article className="flex h-full flex-col items-center gap-4 border border-brand-green/10 bg-brand-cream p-6 md:p-8">
      <div className="relative aspect-square w-16 overflow-hidden rounded-full ring-2 ring-brand-green/20 md:w-20">
        {image ? (
          <Image src={image} alt={name} fill className="object-cover" sizes="80px" />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-brand-main/50 text-display text-xl font-semibold text-brand-green"
            aria-hidden="true">
            {getInitial(name)}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col items-center gap-3 text-center">
        <Label as="h3" className="text-sm normal-case tracking-wide font-semibold">
          {name}
        </Label>
        <div className="flex text-brand-green" aria-label={`${starCount} de 5 estrellas`}>
          {Array.from({ length: starCount }, (_, i) => (
            <span className="text-lg leading-none" key={i} aria-hidden="true">
              &#9733;
            </span>
          ))}
        </div>

        <p
          className={cx(
            "text-body flex-1 text-sm leading-relaxed text-brand-green/80 md:text-base",
            showToggle && "line-clamp-[8]"
          )}>
          {review}
        </p>

        {isLong ? (
          <button
            type="button"
            onClick={() => {
              setExpanded(prev => !prev);
            }}
            className="text-label min-h-[44px] text-[10px] tracking-[0.16em] text-brand-green/65 underline underline-offset-4 transition-colors duration-200 hover:text-brand-green focus-brand">
            {expanded ? readLessLabel : readMoreLabel}
          </button>
        ) : null}

        {googleMapsUri ? (
          <a
            href={googleMapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className="text-label inline-flex min-h-[44px] items-center gap-1.5 text-[10px] tracking-[0.14em] text-brand-green/60 transition-colors duration-200 hover:text-brand-green focus-brand">
            <ExternalLink size={12} aria-hidden="true" />
            {viewOnGoogleLabel}
          </a>
        ) : null}
      </div>
    </article>
  );
};

export default ReviewCard;
