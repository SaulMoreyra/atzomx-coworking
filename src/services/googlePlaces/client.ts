import { BRAND_CONTACT } from "@/design-system";
import type { GooglePlaceDetails, GoogleTextSearchResponse } from "./types";

const PLACES_BASE = "https://places.googleapis.com/v1";
const REVALIDATE_SECONDS = 60 * 60 * 24 * 7; // 7 days — per Google cache guidance

function getApiKey(): string | undefined {
  const key = process.env.GOOGLE_PLACES_API_KEY?.trim();
  return key ?? undefined;
}

function normalizePlaceId(placeId: string): string {
  return placeId.replace(/^places\//, "");
}

async function placesFetch<T>(
  path: string,
  init: RequestInit & { fieldMask: string }
): Promise<T | null> {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  const { fieldMask, ...rest } = init;

  try {
    const response = await fetch(`${PLACES_BASE}${path}`, {
      ...rest,
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": fieldMask,
        ...rest.headers,
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      console.error("[google-places] request failed", path, response.status, await response.text());
      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("[google-places] request error", path, error);
    return null;
  }
}

async function resolvePlaceId(): Promise<string | null> {
  const configured = process.env.GOOGLE_PLACE_ID?.trim();
  if (configured) return normalizePlaceId(configured);

  const data = await placesFetch<GoogleTextSearchResponse>("/places:searchText", {
    method: "POST",
    fieldMask: "places.id,places.displayName",
    body: JSON.stringify({
      textQuery: "Atzomx Coworking Oaxaca de Juárez",
      locationBias: {
        circle: {
          center: { latitude: 17.0689553, longitude: -96.7181622 },
          radius: 500,
        },
      },
    }),
  });

  const id = data?.places?.[0]?.id;
  return id ? normalizePlaceId(id) : null;
}

export async function fetchGooglePlaceReviews(): Promise<GooglePlaceDetails | null> {
  const placeId = await resolvePlaceId();
  if (!placeId) return null;

  return await placesFetch<GooglePlaceDetails>(`/places/${encodeURIComponent(placeId)}`, {
    method: "GET",
    fieldMask: "id,rating,userRatingCount,googleMapsUri,reviews",
  });
}

export function getGoogleMapsReviewsUrl(): string {
  return BRAND_CONTACT.mapsLink;
}
