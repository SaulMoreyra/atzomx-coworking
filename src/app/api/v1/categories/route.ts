import { prisma } from "@/lib/prisma";
import {
  createCategorySchema,
  listCategoriesQuerySchema,
} from "@/lib/api/schemas";
import { serializeCategory } from "@/lib/api/serializers";
import { jsonError, jsonOk, requireAuth } from "@/lib/auth/require-auth";
import { revalidateProductCaches } from "@/lib/api/revalidate";

export async function GET(request: Request) {
  try {
    requireAuth(request);
    const { searchParams } = new URL(request.url);
    const query = listCategoriesQuerySchema.parse({
      type: searchParams.get("type") ?? undefined,
    });

    const categories = await prisma.category.findMany({
      where: query.type ? { type: query.type } : undefined,
      orderBy: [{ sortOrder: "asc" }, { slug: "asc" }],
    });

    return jsonOk({ items: categories.map(serializeCategory) });
  } catch (error) {
    return jsonError(error);
  }
}

export async function POST(request: Request) {
  try {
    requireAuth(request);
    const body = createCategorySchema.parse(await request.json());

    const category = await prisma.category.create({
      data: {
        slug: body.slug,
        type: body.type,
        sortOrder: body.sortOrder ?? 0,
        active: body.active ?? true,
      },
    });

    revalidateProductCaches();
    return jsonOk(serializeCategory(category), { status: 201 });
  } catch (error) {
    return jsonError(error);
  }
}
