import { type ReviewType } from "@/common/types/planTypes";
import { ALL_REVIEWS } from "@/mocks/products";
import { fetchGooglePlaceReviews, getGoogleMapsReviewsUrl } from "@/services/googlePlaces/client";
import type { GooglePlaceReview } from "@/services/googlePlaces/types";
import { unstable_cache } from "next/cache";

export interface ReviewsResult {
  reviews: ReviewType[];
  source: "google" | "static";
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
}

function mapGoogleReview(review: GooglePlaceReview, index: number): ReviewType | null {
  const text = review.text?.text?.trim() ?? review.originalText?.text?.trim();
  if (!text) return null;

  const name = review.authorAttribution?.displayName?.trim() ?? "Google user";
  const rating = Math.min(5, Math.max(1, Math.round(review.rating ?? 5)));

  return {
    id: review.name ?? `google-review-${index}`,
    client: {
      name,
      image: review.authorAttribution?.photoUri?.trim() ?? "",
    },
    rating,
    review: text,
    source: "google",
  };
}

async function loadReviews(): Promise<ReviewsResult> {
  const place = await fetchGooglePlaceReviews();

  if (!place?.reviews?.length) {
    return {
      reviews: ALL_REVIEWS.map((review, index) => ({
        ...review,
        id: review.id ?? `static-${index}`,
        source: "static" as const,
      })),
      source: "static",
      googleMapsUri: getGoogleMapsReviewsUrl(),
    };
  }

  const reviews = place.reviews
    .map(mapGoogleReview)
    .filter((review): review is ReviewType => review !== null);

  if (reviews.length === 0) {
    return {
      reviews: ALL_REVIEWS.map((review, index) => ({
        ...review,
        id: review.id ?? `static-${index}`,
        source: "static" as const,
      })),
      source: "static",
      googleMapsUri: place.googleMapsUri ?? getGoogleMapsReviewsUrl(),
    };
  }

  return {
    reviews,
    source: "google",
    rating: place.rating,
    userRatingCount: place.userRatingCount,
    googleMapsUri: place.googleMapsUri ?? getGoogleMapsReviewsUrl(),
  };
}

const getCachedReviews = unstable_cache(loadReviews, ["atzomx-google-reviews"], {
  revalidate: 60 * 60 * 24 * 7,
  tags: ["google-reviews"],
});

export async function getReviews(): Promise<ReviewsResult> {
  return await getCachedReviews();
}
