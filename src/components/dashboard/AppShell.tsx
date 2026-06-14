import { Link, useRouterState } from "@tanstack/react-router";
import { useAuth, type Role } from "@/lib/mock/auth";
import logoAsset from "@/assets/fortune-alliances-logo.png.asset.json";
import {
  LayoutDashboard, Users, Coins, ShoppingCart, FileBarChart2,
  Building2, LogOut, Bell, Search, Settings as SettingsIcon, Handshake,
} from "lucide-react";
import type { ReactNode } from "react";

type NavItem = { to: string; label: string; icon: typeof Users; roles: Role[] };

const NAV: NavItem[] = [
  { to: "/dashboard/admin", label: "Admin Console", icon: LayoutDashboard, roles: ["admin"] },
  { to: "/dashboard/partner", label: "Partner Console", icon: LayoutDashboard, roles: ["partner"] },
  { to: "/dashboard/branch", label: "Branch Console", icon: LayoutDashboard, roles: ["branch"] },
  { to: "/customers", label: "Customers", icon: Users, roles: ["admin", "partner", "branch"] },
  { to: "/gold-products", label: "Gold Products", icon: Coins, roles: ["admin", "partner", "branch"] },
  { to: "/orders", label: "Orders", icon: ShoppingCart, roles: ["admin", "partner", "branch"] },
  { to: "/reports", label: "Reports", icon: FileBarChart2, roles: ["admin", "partner"] },
  { to: "/branches", label: "Branches", icon: Building2, roles: ["admin", "partner"] },
  { to: "/partners", label: "Partners", icon: Handshake, roles: ["admin"] },
  { to: "/settings", label: "Settings", icon: SettingsIcon, roles: ["admin", "partner", "branch"] },
];

export function AppShell({ children, title, subtitle }: { children: ReactNode; title: string; subtitle?: string }) {
  const { user, logout } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const role: Role = user?.role ?? "admin";
  const items = NAV.filter((n) => n.roles.includes(role));

  return (
    <div className="min-h-screen bg-[color:var(--emerald-deep)] flex">
      <aside className="hidden lg:flex w-72 shrink-0 flex-col border-r border-[color:var(--color-border)] bg-[color:var(--emerald-forest)]/60">
        <div className="h-20 flex items-center px-6 border-b border-[color:var(--color-border)]">
          <Link to="/" className="flex items-center">
            <img src={logoAsset.url} alt="Fortune Alliances" className="h-10 w-auto object-contain" />
          </Link>
        </div>
        <div className="px-4 py-5 flex-1 overflow-y-auto">
          <div className="text-[10px] uppercase tracking-[0.28em] text-gold/70 px-2 mb-3">Console</div>
          <nav className="flex flex-col gap-1">
            {items.map((n) => {
              const active = pathname === n.to || pathname.startsWith(n.to + "/");
              const Icon = n.icon;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors ${
                    active
                      ? "bg-[color:var(--color-gold)]/10 text-gold border-l-2 border-[color:var(--color-gold)]"
                      : "text-foreground/75 hover:text-foreground hover:bg-white/[0.03] border-l-2 border-transparent"
                  }`}
                >
                  <Icon size={16} />
                  <span>{n.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-[color:var(--color-border)]">
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className="h-9 w-9 rounded-full bg-[color:var(--color-gold)]/15 grid place-items-center text-gold font-display">
              {user?.name?.[0] ?? "A"}
            </div>
            <div className="min-w-0">
              <div className="text-sm truncate">{user?.name}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-gold/80">{role}</div>
            </div>
          </div>
          <button onClick={logout} className="w-full flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] py-2 rounded-sm border border-[color:var(--color-border)] hover:border-[color:var(--color-gold)]/60 hover:text-gold transition">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-20 flex items-center justify-between px-6 lg:px-10 border-b border-[color:var(--color-border)] bg-[color:var(--emerald-deep)]/80 backdrop-blur-xl sticky top-0 z-30">
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-gold/80">{role} workspace</div>
            <h1 className="font-display text-2xl leading-none mt-1">{title}</h1>
            {subtitle && <p className="text-xs text-foreground/60 mt-1">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 h-10 rounded-sm border border-[color:var(--color-border)] bg-[color:var(--emerald-forest)]/40 w-72">
              <Search size={14} className="text-foreground/50" />
              <input placeholder="Search ID, customer, order…" className="bg-transparent outline-none text-sm flex-1 placeholder:text-foreground/40" />
            </div>
            <button className="h-10 w-10 grid place-items-center rounded-sm border border-[color:var(--color-border)] hover:border-[color:var(--color-gold)]/60">
              <Bell size={15} />
            </button>
          </div>
        </header>
        <main className="flex-1 px-6 lg:px-10 py-8">{children}</main>
      </div>
    </div>
  );
}
