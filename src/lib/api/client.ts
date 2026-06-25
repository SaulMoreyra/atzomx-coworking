"use client";

import type { AdminUser } from "./admin-types";

const ACCESS_TOKEN_KEY = "atzomx_admin_access_token";

let accessTokenMemory: string | null = null;

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return accessTokenMemory;
  if (accessTokenMemory) return accessTokenMemory;
  return sessionStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string | null) {
  accessTokenMemory = token;
  if (typeof window === "undefined") return;
  if (token) {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
  } else {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  }
}

async function refreshAccessToken(): Promise<string | null> {
  const response = await fetch("/api/v1/auth/refresh", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) return null;

  const payload = (await response.json()) as {
    data?: { accessToken: string };
  };

  const token = payload.data?.accessToken ?? null;
  setAccessToken(token);
  return token;
}

export async function adminFetch<T>(
  input: string,
  init: RequestInit = {},
  retry = true
): Promise<T> {
  const headers = new Headers(init.headers);
  const token = getAccessToken();

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(input, {
    ...init,
    headers,
    credentials: "include",
  });

  if (response.status === 401 && retry) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      return await adminFetch<T>(input, init, false);
    }
  }

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.error ?? "Request failed");
  }

  return payload.data as T;
}

export async function loginAdmin(email: string, password: string) {
  const response = await fetch("/api/v1/auth/login", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error ?? "Login failed");
  }

  setAccessToken(payload.data.accessToken);
  return payload.data.user as AdminUser;
}

export async function logoutAdmin() {
  await fetch("/api/v1/auth/logout", {
    method: "POST",
    credentials: "include",
  });
  setAccessToken(null);
}

export async function fetchCurrentAdmin() {
  return await adminFetch<{ user: AdminUser }>("/api/v1/auth/me");
}
