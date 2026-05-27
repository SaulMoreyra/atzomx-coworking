import { type ReviewType } from "@/common/types/planTypes";
import Image from "next/image";
import React, { type FC } from "react";
import Label from "../ui/Label/Label";

interface ReviewCardProps {
  review: ReviewType;
}

function getInitial(name: string): string {
  return name.trim().charAt(0).toUpperCase() || "?";
}

const ReviewCard: FC<ReviewCardProps> = ({
  review: {
    client: { image, name },
    rating,
    review,
  },
}) => {
  const starCount = Math.min(5, Math.max(1, Math.round(rating)));

  return (
    <article className="flex flex-col items-center p-6 md:p-8 gap-4 bg-brand-cream border border-brand-green/10 h-full">
      <div className="w-16 md:w-20 rounded-full overflow-hidden aspect-square relative ring-2 ring-brand-green/20">
        {image ? (
          <Image src={image} alt={name} fill={true} className="object-cover" sizes="80px" />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-brand-main/50 text-display text-xl font-semibold text-brand-green"
            aria-hidden="true">
            {getInitial(name)}
          </div>
        )}
      </div>
      <div className="flex flex-col items-center text-center gap-2 flex-1">
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
        <p className="text-body text-sm md:text-base text-brand-green/75 line-clamp-5 flex-1">
          {review}
        </p>
      </div>
    </article>
  );
};

export default ReviewCard;
