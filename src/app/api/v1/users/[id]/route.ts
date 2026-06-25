import { prisma } from "@/lib/prisma";
import { updateUserSchema } from "@/lib/api/schemas";
import { hashPassword } from "@/lib/auth/password";
import {
  ApiError,
  jsonError,
  jsonOk,
  requireAuth,
  requireRole,
} from "@/lib/auth/require-auth";

interface RouteContext {
  params: Promise<{ id: string }>;
}

function serializeUser(user: {
  id: string;
  email: string;
  name: string | null;
  role: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    active: user.active,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const auth = requireAuth(request);
    requireRole(auth, ["ADMIN"]);

    const { id } = await context.params;
    const body = updateUserSchema.parse(await request.json());

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      throw new ApiError(404, "User not found");
    }

    if (body.email && body.email !== existing.email) {
      const emailTaken = await prisma.user.findUnique({
        where: { email: body.email },
      });
      if (emailTaken) {
        throw new ApiError(409, "Email already in use");
      }
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(body.email !== undefined ? { email: body.email } : {}),
        ...(body.name !== undefined ? { name: body.name } : {}),
        ...(body.role !== undefined ? { role: body.role } : {}),
        ...(body.active !== undefined ? { active: body.active } : {}),
        ...(body.password
          ? { passwordHash: await hashPassword(body.password) }
          : {}),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return jsonOk(serializeUser(user));
  } catch (error) {
    return jsonError(error);
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    const auth = requireAuth(request);
    requireRole(auth, ["ADMIN"]);

    const { id } = await context.params;

    if (auth.userId === id) {
      throw new ApiError(400, "You cannot delete your own account");
    }

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      throw new ApiError(404, "User not found");
    }

    await prisma.user.delete({ where: { id } });
    return jsonOk({ success: true });
  } catch (error) {
    return jsonError(error);
  }
}
