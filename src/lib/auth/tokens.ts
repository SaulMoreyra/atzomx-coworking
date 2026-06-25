import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import type { UserRole } from "@prisma/client";
import {
  getJwtSecrets,
  JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
  parseDurationToMs,
} from "./constants";

export interface AccessTokenPayload {
  sub: string;
  role: UserRole;
  type: "access";
}

export function signAccessToken(userId: string, role: UserRole): string {
  const { accessSecret } = getJwtSecrets();
  const payload: AccessTokenPayload = { sub: userId, role, type: "access" };

  return jwt.sign(payload, accessSecret, {
    expiresIn: JWT_ACCESS_EXPIRES_IN,
  });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  const { accessSecret } = getJwtSecrets();
  const payload = jwt.verify(token, accessSecret) as AccessTokenPayload;

  if (payload.type !== "access") {
    throw new Error("Invalid token type");
  }

  return payload;
}

export function createRefreshTokenValue(): string {
  return randomBytes(48).toString("base64url");
}

export function getRefreshTokenExpiry(): Date {
  return new Date(Date.now() + parseDurationToMs(JWT_REFRESH_EXPIRES_IN));
}
