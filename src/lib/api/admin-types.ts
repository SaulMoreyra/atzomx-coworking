export interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  role: "ADMIN" | "STAFF";
}

export interface SerializedVariant {
  id?: string;
  slug: string;
  price: number;
  sortOrder: number;
}

export interface SerializedProduct {
  id: string;
  slug: string;
  type: "MENU" | "PLAN";
  categoryId: string | null;
  categorySlug: string | null;
  basePrice: number;
  image: string | null;
  active: boolean;
  sortOrder: number;
  planArea: "cafeteria" | "co_working" | "meeting_room" | null;
  variants: SerializedVariant[];
  featureKeys: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SerializedCategory {
  id: string;
  slug: string;
  type: "MENU" | "PLAN";
  sortOrder: number;
  active: boolean;
}

export interface AdminUserRecord {
  id: string;
  email: string;
  name: string | null;
  role: "ADMIN" | "STAFF";
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
