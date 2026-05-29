import { prisma } from "@/lib/prisma";
import { updateProductSchema } from "@/lib/api/schemas";
import { serializeProduct } from "@/lib/api/serializers";
import { productWriteInclude } from "@/lib/products/public-products";
import {
  ApiError,
  jsonError,
  jsonOk,
  requireAuth,
} from "@/lib/auth/require-auth";
import { revalidateProductCaches } from "@/lib/api/revalidate";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    requireAuth(request);
    const { id } = await context.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: productWriteInclude,
    });

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    return jsonOk(serializeProduct(product));
  } catch (error) {
    return jsonError(error);
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    requireAuth(request);
    const { id } = await context.params;
    const body = updateProductSchema.parse(await request.json());

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      throw new ApiError(404, "Product not found");
    }

    await prisma.$transaction(async tx => {
      await tx.product.update({
        where: { id },
        data: {
          ...(body.slug !== undefined ? { slug: body.slug } : {}),
          ...(body.type !== undefined ? { type: body.type } : {}),
          ...(body.categoryId !== undefined
            ? { categoryId: body.categoryId }
            : {}),
          ...(body.basePrice !== undefined ? { basePrice: body.basePrice } : {}),
          ...(body.image !== undefined ? { image: body.image } : {}),
          ...(body.active !== undefined ? { active: body.active } : {}),
          ...(body.sortOrder !== undefined ? { sortOrder: body.sortOrder } : {}),
          ...(body.planArea !== undefined ? { planArea: body.planArea } : {}),
        },
      });

      if (body.variants) {
        await tx.productVariant.deleteMany({ where: { productId: id } });
        if (body.variants.length > 0) {
          await tx.productVariant.createMany({
            data: body.variants.map((variant, index) => ({
              productId: id,
              slug: variant.slug,
              price: variant.price,
              sortOrder: variant.sortOrder ?? index,
            })),
          });
        }
      }

      if (body.features) {
        await tx.planFeature.deleteMany({ where: { productId: id } });
        if (body.features.length > 0) {
          await tx.planFeature.createMany({
            data: body.features.map((feature, index) => ({
              productId: id,
              featureKey: feature.featureKey,
              sortOrder: feature.sortOrder ?? index,
            })),
          });
        }
      }
    });

    const product = await prisma.product.findUniqueOrThrow({
      where: { id },
      include: productWriteInclude,
    });

    revalidateProductCaches();
    return jsonOk(serializeProduct(product));
  } catch (error) {
    return jsonError(error);
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    requireAuth(request);
    const { id } = await context.params;

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      throw new ApiError(404, "Product not found");
    }

    await prisma.product.delete({ where: { id } });
    revalidateProductCaches();
    return jsonOk({ success: true });
  } catch (error) {
    return jsonError(error);
  }
}
