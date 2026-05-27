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
