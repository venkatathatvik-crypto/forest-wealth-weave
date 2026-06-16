import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "admin" | "partner" | "branch" | "customer";
export type User = { email: string; name: string; role: Role };

type AuthCtx = {
  user: User | null;
  login: (email: string, role: Role) => User;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);
const KEY = "fa.auth.user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const login = (email: string, role: Role) => {
    const name = email.split("@")[0].replace(/\./g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "User";
    const u = { email, name, role };
    localStorage.setItem(KEY, JSON.stringify(u));
    setUser(u);
    return u;
  };

  const logout = () => {
    localStorage.removeItem(KEY);
    setUser(null);
  };

  return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth outside AuthProvider");
  return c;
}