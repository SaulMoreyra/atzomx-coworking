import { prisma } from "@/lib/prisma";
import {
  createProductSchema,
  listProductsQuerySchema,
} from "@/lib/api/schemas";
import { serializeProduct } from "@/lib/api/serializers";
import { productWriteInclude } from "@/lib/products/public-products";
import {
  ApiError,
  jsonError,
  jsonOk,
  requireAuth,
} from "@/lib/auth/require-auth";
import { revalidateProductCaches } from "@/lib/api/revalidate";

export async function GET(request: Request) {
  try {
    requireAuth(request);
    const { searchParams } = new URL(request.url);
    const query = listProductsQuerySchema.parse({
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      type: searchParams.get("type") ?? undefined,
      category: searchParams.get("category") ?? undefined,
      active: searchParams.get("active") ?? undefined,
    });

    const where = {
      ...(query.type ? { type: query.type } : {}),
      ...(query.active !== undefined ? { active: query.active } : {}),
      ...(query.category
        ? { category: { slug: query.category } }
        : {}),
    };

    const [total, products] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        include: productWriteInclude,
        orderBy: [{ sortOrder: "asc" }, { slug: "asc" }],
        skip: (query.page - 1) * query.limit,
        take: query.limit,
      }),
    ]);

    return jsonOk({
      items: products.map(serializeProduct),
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit),
      },
    });
  } catch (error) {
    return jsonError(error);
  }
}

export async function POST(request: Request) {
  try {
    requireAuth(request);
    const body = createProductSchema.parse(await request.json());

    if (body.type === "MENU" && !body.categoryId) {
      throw new ApiError(400, "Menu products require a category");
    }

    if (body.type === "PLAN" && !body.planArea) {
      throw new ApiError(400, "Plan products require planArea");
    }

    const product = await prisma.product.create({
      data: {
        slug: body.slug,
        type: body.type,
        categoryId: body.categoryId ?? null,
        basePrice: body.basePrice,
        image: body.image ?? null,
        active: body.active ?? true,
        sortOrder: body.sortOrder ?? 0,
        planArea: body.planArea ?? null,
        variants: body.variants?.length
          ? {
              create: body.variants.map((variant, index) => ({
                slug: variant.slug,
                price: variant.price,
                sortOrder: variant.sortOrder ?? index,
              })),
            }
          : undefined,
        features: body.features?.length
          ? {
              create: body.features.map((feature, index) => ({
                featureKey: feature.featureKey,
                sortOrder: feature.sortOrder ?? index,
              })),
            }
          : undefined,
      },
      include: productWriteInclude,
    });

    revalidateProductCaches();
    return jsonOk(serializeProduct(product), { status: 201 });
  } catch (error) {
    return jsonError(error);
  }
}
