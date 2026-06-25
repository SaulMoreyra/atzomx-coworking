import { unstable_cache } from "next/cache";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { ProductType } from "@prisma/client";
import { serializeCategory } from "@/lib/api/serializers";
import { jsonOk } from "@/lib/auth/require-auth";

const MENU_CATEGORY_SLUGS = [
  "coffee",
  "lunch",
  "dessert",
  "smoothies",
  "frappes",
  "extras",
];

const getCachedCategories = unstable_cache(
  async () => {
    if (!isDatabaseConfigured()) {
      return MENU_CATEGORY_SLUGS.map((slug, index) => ({
        id: slug,
        slug,
        type: "MENU" as const,
        sortOrder: index,
        active: true,
      }));
    }

    try {
      const categories = await prisma.category.findMany({
        where: { active: true, type: ProductType.MENU },
        orderBy: [{ sortOrder: "asc" }, { slug: "asc" }],
      });
      return categories.map(serializeCategory);
    } catch {
      return MENU_CATEGORY_SLUGS.map((slug, index) => ({
        id: slug,
        slug,
        type: "MENU" as const,
        sortOrder: index,
        active: true,
      }));
    }
  },
  ["public-categories"],
  { tags: ["menu", "products"], revalidate: 60 }
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  let items = await getCachedCategories();
  if (type) {
    items = items.filter(item => item.type === type);
  }

  return jsonOk({ items });
}
