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

/**
 * Error carrying the HTTP status and backend message, for callers to handle.
 *
 * When the backend returns validation errors (HTTP 400, message = "Validation failed"),
 * `validationErrors` holds a map of { fieldName → errorMessage } and `message` is a
 * human-readable string joining all field errors (e.g. "Email: Invalid email format.
 * Phone: Invalid Indian mobile number.") so forms automatically show useful messages.
 */
export class ApiError extends Error {
  status: number;
  /** Structured field errors from the backend — only populated for validation failures. */
  validationErrors: Record<string, string> | null;

  constructor(status: number, message: string, validationErrors: Record<string, string> | null = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.validationErrors = validationErrors;
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
 * Field-name → human-readable label mapping for the most common backend fields.
 * Used to turn camelCase backend field names into readable labels in error messages.
 */
const FIELD_LABELS: Record<string, string> = {
  companyName: "Company name",
  contactPerson: "Contact person",
  email: "Email",
  phone: "Phone",
  mobile: "Mobile",
  gst: "GST",
  city: "City",
  state: "State",
  firstName: "First name",
  lastName: "Last name",
  password: "Password",
  identifier: "Email / Mobile",
  loginEmail: "Login email",
  loginMobile: "Login mobile",
  name: "Name",
  code: "Code",
  contactEmail: "Contact email",
  contactPhone: "Contact phone",
  pincode: "Pincode",
  commissionRate: "Commission rate",
  contactPersonName: "Contact person name",
  registrationNumber: "Registration number",
  type: "Type",
  token: "Token",
  refreshToken: "Refresh token",
  otp: "OTP",
};

/** Format a map or array of validation errors into a readable multi-line string. */
function formatValidationErrors(errors: unknown): string {
  if (!errors || typeof errors !== "object") return "";

  if (Array.isArray(errors)) {
    return errors
      .map((err: any) => {
        if (!err) return "";
        const field = err.field || err.fieldName;
        const msg = err.message || err.defaultMessage || String(err);
        if (field) {
          const label = FIELD_LABELS[field] ?? field;
          return `${label}: ${msg}`;
        }
        return msg;
      })
      .filter(Boolean)
      .join("\n");
  }

  return Object.entries(errors as Record<string, unknown>)
    .map(([field, msg]) => {
      const label = FIELD_LABELS[field] ?? field;
      return `${label}: ${String(msg)}`;
    })
    .join("\n");
}

/**
 * Call the backend and unwrap its ApiResponse<T> envelope.
 * Throws ApiError on non-2xx or when success === false.
 *
 * For validation errors (HTTP 400 with field-level data), the thrown ApiError
 * has a human-readable message listing every failing field, and a
 * `validationErrors` map for forms that want to highlight individual fields.
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
    // Check if this is a field-level validation error response.
    // Backend returns: { success: false, message: "Validation failed", data: { field: "msg" } }
    const hasFieldErrors =
      payload?.data !== null &&
      payload?.data !== undefined &&
      typeof payload?.data === "object" &&
      !Array.isArray(payload?.data) &&
      Object.keys(payload?.data).length > 0;

    const isValidationError =
      payload?.message?.toLowerCase() === "validation failed" ||
      (res.status === 400 && hasFieldErrors);

    if (isValidationError && payload?.data) {
      const fieldErrors = payload.data as Record<string, string>;
      const humanMessage = formatValidationErrors(fieldErrors);
      throw new ApiError(res.status, humanMessage, fieldErrors);
    }

    const msg = payload?.message || `Request failed (HTTP ${res.status})`;
    throw new ApiError(res.status, msg);
  }

  return (payload?.data as T) ?? (undefined as T);
}
