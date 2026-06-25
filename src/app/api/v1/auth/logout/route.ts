import { prisma } from "@/lib/prisma";
import { verifyTokenHash } from "@/lib/auth/password";
import {
  clearRefreshCookie,
  getRefreshTokenFromCookie,
  isProduction,
} from "@/lib/auth/cookies";
import { jsonError, jsonOk } from "@/lib/auth/require-auth";

export async function POST(request: Request) {
  try {
    const refreshValue = getRefreshTokenFromCookie(request);

    if (refreshValue) {
      const tokens = await prisma.refreshToken.findMany({
        where: { revokedAt: null },
        take: 50,
      });

      const match = tokens.find(token =>
        verifyTokenHash(refreshValue, token.tokenHash)
      );

      if (match) {
        await prisma.refreshToken.update({
          where: { id: match.id },
          data: { revokedAt: new Date() },
        });
      }
    }

    const response = jsonOk({ success: true });
    return clearRefreshCookie(response, isProduction());
  } catch (error) {
    return jsonError(error);
  }
}
