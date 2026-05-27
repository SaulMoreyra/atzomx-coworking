/** Google Places API (New) — subset used for reviews */

export interface GooglePlaceReview {
  name?: string;
  rating?: number;
  text?: { text?: string; languageCode?: string };
  originalText?: { text?: string; languageCode?: string };
  authorAttribution?: {
    displayName?: string;
    uri?: string;
    photoUri?: string;
  };
  publishTime?: string;
}

export interface GooglePlaceDetails {
  id?: string;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: GooglePlaceReview[];
}

export interface GoogleTextSearchResponse {
  places?: Array<{ id?: string; displayName?: { text?: string } }>;
}
