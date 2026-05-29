import { NextResponse } from "next/server";
import type { UserRole } from "@prisma/client";
import type { ZodIssue } from "zod";
import { verifyAccessToken } from "./tokens";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: ZodIssue[]
  ) {
    super(message);
  }
}

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ data }, init);
}

export function jsonError(error: unknown) {
  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: error.message, details: error.details },
      { status: error.status }
    );
  }

  console.error(error);
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}

export interface AuthContext {
  userId: string;
  role: UserRole;
}

export function getBearerToken(request: Request): string | null {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) return null;
  return header.slice(7);
}

export function requireAuth(request: Request): AuthContext {
  const token = getBearerToken(request);
  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  try {
    const payload = verifyAccessToken(token);
    return { userId: payload.sub, role: payload.role };
  } catch {
    throw new ApiError(401, "Invalid or expired token");
  }
}

export function requireRole(auth: AuthContext, roles: UserRole[]): void {
  if (!roles.includes(auth.role)) {
    throw new ApiError(403, "Forbidden");
  }
}
