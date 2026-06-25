import type { PlanArea, Product, ProductVariant, PlanFeature, Category } from "@prisma/client";

export type ProductWithRelations = Product & {
  category: Category | null;
  variants: ProductVariant[];
  features: PlanFeature[];
};

export function decimalToNumber(value: unknown): number {
  if (typeof value === "number") return value;
  if (value && typeof value === "object" && "toString" in value) {
    return Number(String(value));
  }
  return Number(value);
}

export function serializeVariant(variant: ProductVariant) {
  return {
    id: variant.id,
    slug: variant.slug,
    price: decimalToNumber(variant.price),
    sortOrder: variant.sortOrder,
  };
}

export function serializeProduct(product: ProductWithRelations) {
  return {
    id: product.id,
    slug: product.slug,
    type: product.type,
    categoryId: product.categoryId,
    categorySlug: product.category?.slug ?? null,
    basePrice: decimalToNumber(product.basePrice),
    image: product.image,
    active: product.active,
    sortOrder: product.sortOrder,
    planArea: product.planArea,
    variants: product.variants
      .slice()
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map(serializeVariant),
    featureKeys: product.features
      .slice()
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map(f => f.featureKey),
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };
}

export function serializeCategory(category: Category) {
  return {
    id: category.id,
    slug: category.slug,
    type: category.type,
    sortOrder: category.sortOrder,
    active: category.active,
  };
}

export function mapPlanAreaToLegacy(area: PlanArea | null): string | null {
  if (!area) return null;
  switch (area) {
    case "cafeteria":
      return "cafeteria";
    case "co_working":
      return "co-working";
    case "meeting_room":
      return "meeting-room";
    default:
      return null;
  }
}

export function mapLegacyPlanArea(area: string): PlanArea {
  switch (area) {
    case "cafeteria":
      return "cafeteria";
    case "co-working":
      return "co_working";
    case "meeting-room":
      return "meeting_room";
    default:
      return "co_working";
  }
}
