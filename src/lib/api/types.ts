// Types mirroring the Spring Boot backend's auth contract.
// Backed by com.twoplus.goldemi DTOs. Role strings are used AS-IS from the
// backend (e.g. "ROLE_SUPER_ADMIN") — no mapping to the legacy mock roles.

/** Standard envelope returned by every backend endpoint (ApiResponse<T>). */
export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  timestamp?: string;
};

/** Backend RoleName enum values (raw, unmapped). */
export type BackendRole =
  | "ROLE_SUPER_ADMIN"
  | "ROLE_ALLIANCE_ADMIN"
  | "ROLE_BRANCH_MANAGER"
  | "ROLE_AGENT"
  | "ROLE_CUSTOMER";

/** UserResponse from /auth/me and embedded in AuthResponse. */
export type BackendUser = {
  uuid: string;
  email: string | null;
  mobile: string;
  firstName: string | null;
  lastName: string | null;
  role: BackendRole | string;
  allianceCompanyName: string | null;
  branchName: string | null;
  isActive: boolean;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  lastLoginAt: string | null;
  createdAt: string | null;
};

/** AuthResponse from /auth/login, /auth/otp/verify-login, /auth/refresh. */
export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  tokenType: string; // "Bearer"
  expiresIn: number;
  user: BackendUser;
};

/** Request body for POST /auth/login. */
export type LoginRequest = {
  identifier: string; // email or mobile
  password: string;
  deviceInfo?: string;
};
