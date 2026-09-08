export type PlaceCategory = "cafe" | "food" | "park" | "culture";

export interface NearbyPlace {
  id: string;
  category: PlaceCategory;
  walkMinutes: number;
  walkMeters: number;
  mapsUrl: string;
}

export const PLACE_CATEGORIES: PlaceCategory[] = [
  "cafe",
  "food",
  "park",
  "culture",
];

export const NEARBY_PLACES: NearbyPlace[] = [
  {
    id: "centro-cultural-san-pablo",
    category: "culture",
    walkMinutes: 3,
    walkMeters: 250,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Centro+Cultural+San+Pablo+Oaxaca",
  },
  {
    id: "museo-textil",
    category: "culture",
    walkMinutes: 3,
    walkMeters: 250,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Museo+Textil+de+Oaxaca",
  },
  {
    id: "andador-turistico",
    category: "culture",
    walkMinutes: 8,
    walkMeters: 600,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Andador+Tur%C3%ADstico+Oaxaca",
  },
  {
    id: "cafe-rustiko",
    category: "cafe",
    walkMinutes: 8,
    walkMeters: 650,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Caf%C3%A9+R%C3%BAstiko+Oaxaca",
  },
  {
    id: "zocalo",
    category: "culture",
    walkMinutes: 10,
    walkMeters: 750,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Z%C3%B3calo+de+Oaxaca",
  },
  {
    id: "boulenc",
    category: "food",
    walkMinutes: 10,
    walkMeters: 800,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Boulenc+Oaxaca",
  },
  {
    id: "mercado-benito-juarez",
    category: "food",
    walkMinutes: 10,
    walkMeters: 800,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Mercado+Benito+Ju%C3%A1rez+Oaxaca",
  },
  {
    id: "casa-juarez",
    category: "culture",
    walkMinutes: 12,
    walkMeters: 950,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Museo+de+Sitio+Casa+Ju%C3%A1rez+Oaxaca",
  },
  {
    id: "casa-oaxaca",
    category: "food",
    walkMinutes: 12,
    walkMeters: 950,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Casa+Oaxaca+el+Restaurante",
  },
  {
    id: "jardin-etnobiologico",
    category: "park",
    walkMinutes: 15,
    walkMeters: 1200,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Jard%C3%ADn+Etnobiol%C3%B3gico+de+Oaxaca",
  },
];
