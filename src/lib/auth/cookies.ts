import {
  REFRESH_COOKIE_NAME,
  parseDurationToMs,
  JWT_REFRESH_EXPIRES_IN,
} from "./constants";

export function refreshCookieOptions(secure: boolean) {
  return {
    httpOnly: true,
    secure,
    sameSite: "lax" as const,
    path: "/",
    maxAge: Math.floor(parseDurationToMs(JWT_REFRESH_EXPIRES_IN) / 1000),
  };
}

export function setRefreshCookie(
  response: Response,
  token: string,
  secure: boolean
) {
  const headers = new Headers(response.headers);
  const opts = refreshCookieOptions(secure);
  const parts = [
    `${REFRESH_COOKIE_NAME}=${encodeURIComponent(token)}`,
    "HttpOnly",
    `Path=${opts.path}`,
    `Max-Age=${opts.maxAge}`,
    `SameSite=${opts.sameSite}`,
  ];

  if (secure) parts.push("Secure");

  headers.append("Set-Cookie", parts.join("; "));
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export function clearRefreshCookie(response: Response, secure: boolean) {
  const headers = new Headers(response.headers);
  const parts = [
    `${REFRESH_COOKIE_NAME}=`,
    "HttpOnly",
    "Path=/",
    "Max-Age=0",
    "SameSite=Lax",
  ];

  if (secure) parts.push("Secure");

  headers.append("Set-Cookie", parts.join("; "));
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export function getRefreshTokenFromCookie(request: Request): string | null {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";").map(part => part.trim());
  for (const cookie of cookies) {
    if (cookie.startsWith(`${REFRESH_COOKIE_NAME}=`)) {
      return decodeURIComponent(cookie.slice(REFRESH_COOKIE_NAME.length + 1));
    }
  }

  return null;
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}
