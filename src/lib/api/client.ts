// Minimal fetch wrapper for the Spring Boot backend.
//
// Base URL comes from VITE_API_BASE_URL (public env var, safe for the browser).
// The backend runs at http://localhost:8080 with context-path /gold-emi-api, so
// the default points there. NOTE: the Vite dev server also defaults to 8080 —
// run the frontend on a different port (or the backend elsewhere) to avoid a clash.

import type { ApiResponse } from "./types";

export const API_BASE_URL: string =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
  "http://localhost:8080/gold-emi-api";

const ACCESS_TOKEN_KEY = "fa.auth.accessToken";

export function getAccessToken(): string | null {
  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAccessToken(token: string | null) {
  try {
    if (token) localStorage.setItem(ACCESS_TOKEN_KEY, token);
    else localStorage.removeItem(ACCESS_TOKEN_KEY);
  } catch {
    /* ignore storage errors */
  }
}

/** Error carrying the HTTP status and backend message, for callers to handle. */
export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  /** Attach the bearer access token. Default true. */
  auth?: boolean;
  signal?: AbortSignal;
};

/**
 * Call the backend and unwrap its ApiResponse<T> envelope.
 * Throws ApiError on non-2xx or when success === false.
 */
export async function apiRequest<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, auth = true, signal } = opts;

  const headers: Record<string, string> = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = getAccessToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (e) {
    throw new ApiError(0, "Cannot reach the server. Is the backend running?");
  }

  let payload: ApiResponse<T> | null = null;
  try {
    payload = (await res.json()) as ApiResponse<T>;
  } catch {
    /* non-JSON response */
  }

  if (!res.ok || (payload && payload.success === false)) {
    const msg = payload?.message || `Request failed (HTTP ${res.status})`;
    throw new ApiError(res.status, msg);
  }

  return (payload?.data as T) ?? (undefined as T);
}
