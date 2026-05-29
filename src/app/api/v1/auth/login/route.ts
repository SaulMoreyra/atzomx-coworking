import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, hashToken } from "@/lib/auth/password";
import {
  createRefreshTokenValue,
  getRefreshTokenExpiry,
  signAccessToken,
} from "@/lib/auth/tokens";
import { isProduction, setRefreshCookie } from "@/lib/auth/cookies";
import { loginSchema } from "@/lib/api/schemas";
import { ApiError, jsonError, jsonOk } from "@/lib/auth/require-auth";
import { checkRateLimit, resetRateLimit } from "@/lib/auth/rate-limit";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") ?? "local";
    if (!checkRateLimit(`login:${ip}`)) {
      throw new ApiError(429, "Too many login attempts. Try again later.");
    }

    const body = loginSchema.parse(await request.json());
    const user = await prisma.user.findUnique({ where: { email: body.email } });

    if (!user?.active || !(await verifyPassword(body.password, user.passwordHash))) {
      throw new ApiError(401, "Invalid email or password");
    }

    resetRateLimit(`login:${ip}`);

    const refreshValue = createRefreshTokenValue();
    await prisma.refreshToken.create({
      data: {
        tokenHash: hashToken(refreshValue),
        userId: user.id,
        expiresAt: getRefreshTokenExpiry(),
      },
    });

    const accessToken = signAccessToken(user.id, user.role);
    const response = jsonOk({
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    return setRefreshCookie(response, refreshValue, isProduction());
  } catch (error) {
    return jsonError(error);
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
