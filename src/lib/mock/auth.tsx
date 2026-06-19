import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import * as authApi from "@/lib/api/auth";
import { getAccessToken } from "@/lib/api/client";
import type { BackendUser } from "@/lib/api/types";

// Legacy mock role union — still used by pages that branch on a friendly role
// string (partner/branch/customer demo paths). Real logins carry the raw backend
// role (e.g. "ROLE_ALLIANCE"); use backendRoleToMockRole to normalise.
export type Role = "admin" | "partner" | "branch" | "customer";

/** Map a raw backend role to the frontend's mock Role (null if unrecognised). */
export function backendRoleToMockRole(raw: string | null | undefined): Role | null {
  switch (raw) {
    case "ROLE_ADMIN": return "admin";
    case "ROLE_ALLIANCE": return "partner";
    case "ROLE_BRANCH":
    case "ROLE_AGENT": return "branch";
    case "ROLE_CUSTOMER": return "customer";
    default: return null;
  }
}

export type User = {
  email: string;
  name: string;
  /** Friendly mock role (demo paths) OR the raw backend role e.g. "ROLE_SUPER_ADMIN". */
  role: Role | string;
};

type AuthCtx = {
  user: User | null;
  /** Full backend user when authenticated via the real API (null for mock demo logins). */
  backendUser: BackendUser | null;
  /** Demo/mock login used by the partner/branch/customer role buttons. */
  login: (email: string, role: Role) => User;
  /**
   * Real backend login (email/mobile + password). Throws on failure.
   * If {@link expectedRole} is given and the account's role doesn't match, the
   * login is rejected (no session established) with an "Invalid credentials" error.
   */
  loginWithPassword: (identifier: string, password: string, expectedRole?: Role) => Promise<User>;
  /** Send a login OTP to the given email/mobile. Throws on failure. */
  requestOtp: (identifier: string) => Promise<void>;
  /** Verify the OTP and log in. Optional role guard like loginWithPassword. */
  loginWithOtp: (identifier: string, otp: string, expectedRole?: Role) => Promise<User>;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);
const KEY = "fa.auth.user";

function displayName(u: BackendUser): string {
  const full = [u.firstName, u.lastName].filter(Boolean).join(" ").trim();
  if (full) return full;
  if (u.email) return u.email.split("@")[0];
  return u.mobile;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [backendUser, setBackendUser] = useState<BackendUser | null>(null);

  // Restore session: prefer a real backend session (token present) and verify it
  // via /me; otherwise fall back to a persisted mock-demo user.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (getAccessToken()) {
        try {
          const bu = await authApi.me();
          if (cancelled) return;
          setBackendUser(bu);
          setUser({ email: bu.email ?? bu.mobile, name: displayName(bu), role: bu.role });
          return;
        } catch {
          // token invalid/expired — clear and fall through to mock
          authApi.clearTokens();
        }
      }
      try {
        const raw = localStorage.getItem(KEY);
        if (raw && !cancelled) setUser(JSON.parse(raw));
      } catch {
        /* ignore */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Mock/demo login (unchanged behavior) — used by non-admin role buttons.
  const login = (email: string, role: Role) => {
    const name =
      email.split("@")[0].replace(/\./g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "User";
    const u: User = { email, name, role };
    localStorage.setItem(KEY, JSON.stringify(u));
    setBackendUser(null);
    setUser(u);
    return u;
  };

  // Apply an authenticated backend user to context (shared by password & OTP login).
  // If expectedRole is given and the account's role differs, reject: clear the
  // just-issued tokens and throw a generic "Invalid credentials" (no impersonation).
  const applyBackendUser = (bu: BackendUser, expectedRole?: Role): User => {
    if (expectedRole && backendRoleToMockRole(bu.role) !== expectedRole) {
      authApi.clearTokens();
      throw new Error("Invalid credentials");
    }
    const u: User = { email: bu.email ?? bu.mobile, name: displayName(bu), role: bu.role };
    // Don't persist a mock user when we have a real session (tokens drive restore).
    localStorage.removeItem(KEY);
    setBackendUser(bu);
    setUser(u);
    return u;
  };

  // Real backend login (password).
  const loginWithPassword = async (identifier: string, password: string, expectedRole?: Role) => {
    const res = await authApi.login(identifier, password);
    return applyBackendUser(res.user, expectedRole);
  };

  // OTP login — request the code, then verify it.
  const requestOtp = (identifier: string) => authApi.sendOtp(identifier);
  const loginWithOtp = async (identifier: string, otp: string, expectedRole?: Role) => {
    const res = await authApi.verifyLoginOtp(identifier, otp);
    return applyBackendUser(res.user, expectedRole);
  };

  const logout = () => {
    void authApi.logout();
    localStorage.removeItem(KEY);
    setBackendUser(null);
    setUser(null);
  };

  return (
    <Ctx.Provider
      value={{ user, backendUser, login, loginWithPassword, requestOtp, loginWithOtp, logout }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth outside AuthProvider");
  return c;
}
