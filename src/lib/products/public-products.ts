import { ProductType } from "@prisma/client";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { serializeProduct, decimalToNumber, mapPlanAreaToLegacy } from "@/lib/api/serializers";
import type { FoodType } from "@/common/types/menuTypes";
import type { PlanType } from "@/common/types/planTypes";
import { ALL_FOODS } from "@/mocks/menu";
import { ALL_PLANS } from "@/mocks/products";

const productInclude = {
  category: true,
  variants: { orderBy: { sortOrder: "asc" as const } },
  features: { orderBy: { sortOrder: "asc" as const } },
};

export async function fetchMenuProductsFromDb(): Promise<FoodType[] | null> {
  if (!isDatabaseConfigured()) return null;

  try {
    const products = await prisma.product.findMany({
      where: { type: ProductType.MENU, active: true },
      include: productInclude,
      orderBy: [{ sortOrder: "asc" }, { slug: "asc" }],
    });

    if (products.length === 0) return null;

    return products.map(product => ({
      id: product.slug,
      price: decimalToNumber(product.basePrice),
      image: product.image ?? "",
      category: product.category?.slug ?? "extras",
      variants: product.variants.map(v => ({
        name: v.slug,
        price: decimalToNumber(v.price),
      })),
    }));
  } catch {
    return null;
  }
}

export async function fetchPlanProductsFromDb(): Promise<PlanType[] | null> {
  if (!isDatabaseConfigured()) return null;

  try {
    const products = await prisma.product.findMany({
      where: { type: ProductType.PLAN, active: true },
      include: productInclude,
      orderBy: [{ sortOrder: "asc" }, { slug: "asc" }],
    });

    if (products.length === 0) return null;

    return products.map(product => ({
      id: product.slug,
      startPrice: decimalToNumber(product.basePrice),
      area: (mapPlanAreaToLegacy(product.planArea) ??
        "co-working") as PlanType["area"],
      features: product.features.map(f => f.featureKey),
    }));
  } catch {
    return null;
  }
}

export async function getPublicMenu(): Promise<FoodType[]> {
  const fromDb = await fetchMenuProductsFromDb();
  return fromDb ?? ALL_FOODS;
}

export async function getPublicPlans(): Promise<PlanType[]> {
  const fromDb = await fetchPlanProductsFromDb();
  return fromDb ?? ALL_PLANS;
}

export async function getPublicMenuApiResponse() {
  if (!isDatabaseConfigured()) {
    return ALL_FOODS.map(item => ({
      slug: item.id,
      categorySlug: item.category,
      basePrice: item.price,
      image: item.image,
      variants: item.variants.map(v => ({ slug: v.name, price: v.price })),
    }));
  }

  const products = await prisma.product.findMany({
    where: { type: ProductType.MENU, active: true },
    include: productInclude,
    orderBy: [{ sortOrder: "asc" }, { slug: "asc" }],
  });

  return products.map(p => {
    const serialized = serializeProduct(p);
    return {
      slug: serialized.slug,
      categorySlug: serialized.categorySlug,
      basePrice: serialized.basePrice,
      image: serialized.image,
      variants: serialized.variants.map(v => ({
        slug: v.slug,
        price: v.price,
      })),
    };
  });
}

export async function getPublicPlansApiResponse() {
  if (!isDatabaseConfigured()) {
    return ALL_PLANS.map(plan => ({
      slug: plan.id,
      planArea: plan.area,
      basePrice: plan.startPrice,
      featureKeys: plan.features,
    }));
  }

  const products = await prisma.product.findMany({
    where: { type: ProductType.PLAN, active: true },
    include: productInclude,
    orderBy: [{ sortOrder: "asc" }, { slug: "asc" }],
  });

  return products.map(p => {
    const serialized = serializeProduct(p);
    return {
      slug: serialized.slug,
      planArea: mapPlanAreaToLegacy(serialized.planArea),
      basePrice: serialized.basePrice,
      featureKeys: serialized.featureKeys,
    };
  });
}

export const productWriteInclude = productInclude;

export interface ProductCreateInput {
  slug: string;
  type: ProductType;
  categoryId?: string | null;
  basePrice: number;
  image?: string | null;
  active?: boolean;
  sortOrder?: number;
  planArea?: "cafeteria" | "co_working" | "meeting_room" | null;
  variants?: Array<{ slug: string; price: number; sortOrder?: number }>;
  features?: Array<{ featureKey: string; sortOrder?: number }>;
}
