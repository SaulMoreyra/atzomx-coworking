import { prisma } from "@/lib/prisma";
import { updateCategorySchema } from "@/lib/api/schemas";
import { serializeCategory } from "@/lib/api/serializers";
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

export async function PATCH(request: Request, context: RouteContext) {
  try {
    requireAuth(request);
    const { id } = await context.params;
    const body = updateCategorySchema.parse(await request.json());

    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing) {
      throw new ApiError(404, "Category not found");
    }

    const category = await prisma.category.update({
      where: { id },
      data: body,
    });

    revalidateProductCaches();
    return jsonOk(serializeCategory(category));
  } catch (error) {
    return jsonError(error);
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    requireAuth(request);
    const { id } = await context.params;

    const productCount = await prisma.product.count({ where: { categoryId: id } });
    if (productCount > 0) {
      throw new ApiError(400, "Cannot delete category with products");
    }

    await prisma.category.delete({ where: { id } });
    revalidateProductCaches();
    return jsonOk({ success: true });
  } catch (error) {
    return jsonError(error);
  }
}
