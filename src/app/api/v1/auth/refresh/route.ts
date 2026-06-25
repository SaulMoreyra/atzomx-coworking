import { prisma } from "@/lib/prisma";
import { hashToken, verifyTokenHash } from "@/lib/auth/password";
import {
  createRefreshTokenValue,
  getRefreshTokenExpiry,
  signAccessToken,
} from "@/lib/auth/tokens";
import {
  getRefreshTokenFromCookie,
  isProduction,
  setRefreshCookie,
} from "@/lib/auth/cookies";
import { ApiError, jsonError, jsonOk } from "@/lib/auth/require-auth";

export async function POST(request: Request) {
  try {
    const refreshValue = getRefreshTokenFromCookie(request);
    if (!refreshValue) {
      throw new ApiError(401, "Missing refresh token");
    }

    const tokens = await prisma.refreshToken.findMany({
      where: {
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
      include: { user: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    const match = tokens.find(token => verifyTokenHash(refreshValue, token.tokenHash));

    if (!match?.user.active) {
      throw new ApiError(401, "Invalid refresh token");
    }

    await prisma.refreshToken.update({
      where: { id: match.id },
      data: { revokedAt: new Date() },
    });

    const newRefreshValue = createRefreshTokenValue();
    await prisma.refreshToken.create({
      data: {
        tokenHash: hashToken(newRefreshValue),
        userId: match.userId,
        expiresAt: getRefreshTokenExpiry(),
      },
    });

    const accessToken = signAccessToken(match.user.id, match.user.role);
    const response = jsonOk({
      accessToken,
      user: {
        id: match.user.id,
        email: match.user.email,
        name: match.user.name,
        role: match.user.role,
      },
    });

    return setRefreshCookie(response, newRefreshValue, isProduction());
  } catch (error) {
    return jsonError(error);
  }
}
