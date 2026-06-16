import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import * as authApi from "@/lib/api/auth";
import { getAccessToken } from "@/lib/api/client";
import type { BackendUser } from "@/lib/api/types";

// Legacy mock role union — still used by pages that branch on a friendly role
// string (partner/branch/customer demo paths). The admin path now authenticates
// against the real backend, where the role is the raw "ROLE_SUPER_ADMIN" string.
export type Role = "admin" | "partner" | "branch" | "customer";

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
  /** Real backend login (email/mobile + password). Throws on failure. */
  loginWithPassword: (identifier: string, password: string) => Promise<User>;
  /** Send a login OTP to the given email/mobile. Throws on failure. */
  requestOtp: (identifier: string) => Promise<void>;
  /** Verify the OTP and log in. Throws on failure. */
  loginWithOtp: (identifier: string, otp: string) => Promise<User>;
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
  const applyBackendUser = (bu: BackendUser): User => {
    const u: User = { email: bu.email ?? bu.mobile, name: displayName(bu), role: bu.role };
    // Don't persist a mock user when we have a real session (tokens drive restore).
    localStorage.removeItem(KEY);
    setBackendUser(bu);
    setUser(u);
    return u;
  };

  // Real backend login (password).
  const loginWithPassword = async (identifier: string, password: string) => {
    const res = await authApi.login(identifier, password);
    return applyBackendUser(res.user);
  };

  // OTP login — request the code, then verify it.
  const requestOtp = (identifier: string) => authApi.sendOtp(identifier);
  const loginWithOtp = async (identifier: string, otp: string) => {
    const res = await authApi.verifyLoginOtp(identifier, otp);
    return applyBackendUser(res.user);
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
