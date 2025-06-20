import { type ReviewType } from "@/common/types/planTypes";
import Image from "next/image";
import React, { type FC } from "react";

interface ReviewCardProps {
  review: ReviewType;
}

const ReviewCard: FC<ReviewCardProps> = ({
  review: {
    client: { image, name },
    rating,
    review,
  },
}) => {
  return (
    <div className="flex flex-col items-center p-10 gap-5 bg-white rounded-md transition-transform duration-300 hover:scale-105">
      <div className="w-20 rounded-full overflow-hidden aspect-square relative">
        <Image src={image} alt={name} fill={true} className="object-cover" />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-lg font-bold">{name}</h1>
        <div className="flex text-yellow-500">
          {Array.from({ length: rating }, (_, i) => (
            <p className="text-2xl" key={i}>
              &#9733;
            </p>
          ))}
        </div>
        <p className="line-clamp-3 overflow-hidden text-gray-500 text-ellipsis">
          {review}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
