import { prisma } from "@/lib/prisma";
import { requireAuth, jsonError, jsonOk } from "@/lib/auth/require-auth";

export async function GET(request: Request) {
  try {
    const auth = requireAuth(request);
    const user = await prisma.user.findUnique({
      where: { id: auth.userId },
      select: { id: true, email: true, name: true, role: true, active: true },
    });

    if (!user?.active) {
      throw new Error("User inactive");
    }

    return jsonOk({ user });
  } catch (error) {
    return jsonError(error);
  }
}
