import { prisma } from "@/lib/prisma";
import { createUserSchema } from "@/lib/api/schemas";
import { hashPassword } from "@/lib/auth/password";
import {
  ApiError,
  jsonError,
  jsonOk,
  requireAuth,
  requireRole,
} from "@/lib/auth/require-auth";

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

export async function GET(request: Request) {
  try {
    const auth = requireAuth(request);
    requireRole(auth, ["ADMIN"]);

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
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

    return jsonOk({ items: users.map(serializeUser) });
  } catch (error) {
    return jsonError(error);
  }
}

export async function POST(request: Request) {
  try {
    const auth = requireAuth(request);
    requireRole(auth, ["ADMIN"]);

    const body = createUserSchema.parse(await request.json());
    const existing = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existing) {
      throw new ApiError(409, "Email already in use");
    }

    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name ?? null,
        role: body.role ?? "STAFF",
        active: body.active ?? true,
        passwordHash: await hashPassword(body.password),
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

    return jsonOk(serializeUser(user), { status: 201 });
  } catch (error) {
    return jsonError(error);
  }
}
