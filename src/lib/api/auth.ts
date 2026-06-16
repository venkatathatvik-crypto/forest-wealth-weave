// Auth API calls against the Spring Boot backend (/api/v1/auth/*).
// Token storage helpers live in client.ts. Refresh token is kept in localStorage
// too (acceptable for this app; move to httpOnly cookie if hardening later).

import { apiRequest, setAccessToken } from "./client";
import type { AuthResponse, BackendUser, LoginRequest } from "./types";

const REFRESH_TOKEN_KEY = "fa.auth.refreshToken";

function setRefreshToken(token: string | null) {
  try {
    if (token) localStorage.setItem(REFRESH_TOKEN_KEY, token);
    else localStorage.removeItem(REFRESH_TOKEN_KEY);
  } catch {
    /* ignore */
  }
}

export function getRefreshToken(): string | null {
  try {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  } catch {
    return null;
  }
}

function persistTokens(auth: AuthResponse) {
  setAccessToken(auth.accessToken);
  setRefreshToken(auth.refreshToken);
}

/** POST /api/v1/auth/login — email/mobile + password. Stores tokens on success. */
export async function login(identifier: string, password: string): Promise<AuthResponse> {
  const body: LoginRequest = { identifier, password };
  const auth = await apiRequest<AuthResponse>("/api/v1/auth/login", {
    method: "POST",
    body,
    auth: false,
  });
  persistTokens(auth);
  return auth;
}

/** POST /api/v1/auth/otp/send — send a login OTP to an email/mobile. */
export async function sendOtp(identifier: string): Promise<void> {
  await apiRequest<void>("/api/v1/auth/otp/send", {
    method: "POST",
    body: { identifier, purpose: "LOGIN" },
    auth: false,
  });
}

/** POST /api/v1/auth/otp/verify-login — verify OTP and log in. Stores tokens on success. */
export async function verifyLoginOtp(identifier: string, otp: string): Promise<AuthResponse> {
  const auth = await apiRequest<AuthResponse>("/api/v1/auth/otp/verify-login", {
    method: "POST",
    body: { identifier, otp, purpose: "LOGIN" },
    auth: false,
  });
  persistTokens(auth);
  return auth;
}

/** GET /api/v1/auth/me — current user (requires a valid access token). */
export async function me(): Promise<BackendUser> {
  return apiRequest<BackendUser>("/api/v1/auth/me");
}

/** POST /api/v1/auth/refresh — rotate tokens using the stored refresh token. */
export async function refresh(): Promise<AuthResponse | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;
  const auth = await apiRequest<AuthResponse>("/api/v1/auth/refresh", {
    method: "POST",
    body: { refreshToken },
    auth: false,
  });
  persistTokens(auth);
  return auth;
}

/** POST /api/v1/auth/logout — revoke current refresh token, then clear local tokens. */
export async function logout(): Promise<void> {
  const refreshToken = getRefreshToken();
  try {
    if (refreshToken) {
      await apiRequest<void>("/api/v1/auth/logout", {
        method: "POST",
        body: { refreshToken },
      });
    }
  } catch {
    /* best-effort; clear locally regardless */
  } finally {
    setAccessToken(null);
    setRefreshToken(null);
  }
}

export function clearTokens() {
  setAccessToken(null);
  setRefreshToken(null);
}
