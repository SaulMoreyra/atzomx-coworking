export type BlogCategory = "coworking" | "coffee" | "community" | "oaxaca";

export interface BlogPost {
  id: string;
  slug: string;
  category: BlogCategory;
  publishedAt: string;
  coverImage: string;
  readingMinutes: number;
  featured?: boolean;
}

export type BlogContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; src: string; alt: string };
