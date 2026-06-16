import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useAuth, type Role } from "@/lib/mock/auth";
import logoAsset from "@/assets/fortune-alliances-logo.png.asset.json";
import {
  LayoutDashboard, Users, Coins, ShoppingCart, FileBarChart2,
  Building2, LogOut, Bell, Search, Settings as SettingsIcon,
  User, HelpCircle,
} from "lucide-react";
import type { ReactNode } from "react";

type NavItem = { to: string; search?: Record<string, unknown>; label: string; icon: typeof Users; roles: Role[] };

const NAV: NavItem[] = [
  { to: "/dashboard/admin", label: "Admin Console", icon: LayoutDashboard, roles: ["admin"] },
  { to: "/dashboard/partner", label: "Partner Console", icon: LayoutDashboard, roles: ["partner"] },
  { to: "/dashboard/branch", label: "Branch Console", icon: LayoutDashboard, roles: ["branch"] },
  { to: "/dashboard/customer", label: "Dashboard", icon: LayoutDashboard, roles: ["customer"] },
  { to: "/customers", label: "Customers", icon: Users, roles: ["admin", "partner", "branch"] },
  { to: "/gold-products", label: "Gold Products", icon: Coins, roles: ["admin", "partner", "branch", "customer"] },
  { to: "/orders", label: "Orders", icon: ShoppingCart, roles: ["admin", "partner", "branch"] },
  { to: "/orders", label: "My Orders", icon: ShoppingCart, roles: ["customer"] },
  { to: "/reports", label: "Reports", icon: FileBarChart2, roles: ["admin", "partner"] },
  { to: "/branches", label: "Branches", icon: Building2, roles: ["admin", "partner"] },
  { to: "/settings", search: { tab: "profile" }, label: "Profile", icon: User, roles: ["customer"] },
  { to: "/contact", label: "Support", icon: HelpCircle, roles: ["customer"] },
  { to: "/settings", label: "Settings", icon: SettingsIcon, roles: ["admin", "partner", "branch", "customer"] },
];

// Map the stored role (which may be a raw backend role like "ROLE_SUPER_ADMIN"
// after a real login, or a legacy mock role for demo logins) to the nav's Role.
function toNavRole(raw: string | undefined): Role {
  switch (raw) {
    case "ROLE_SUPER_ADMIN":
    case "admin":
      return "admin";
    case "ROLE_ALLIANCE_ADMIN":
    case "partner":
      return "partner";
    case "ROLE_BRANCH_MANAGER":
    case "ROLE_AGENT":
    case "branch":
      return "branch";
    case "ROLE_CUSTOMER":
    case "customer":
      return "customer";
    default:
      return "admin";
  }
}

export function AppShell({ children, title, subtitle }: { children: ReactNode; title: string; subtitle?: string }) {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const role: Role = toNavRole(user?.role);
  const items = NAV.filter((n) => n.roles.includes(role));

  // Clear session AND leave the dashboard — without the redirect the page stays
  // on /dashboard/* (role falls back to "admin"), so it looks like nothing happened.
  const handleSignOut = () => {
    logout();
    nav({ to: "/login" });
  };

  const allowed = NAV.some((n) => {
    const match = pathname === n.to || pathname.startsWith(n.to + "/");
    return match && n.roles.includes(role);
  });

  const isCustomerNewOrderBlocked = role === "customer" && pathname.startsWith("/orders/new");

  if (user && (!allowed || isCustomerNewOrderBlocked)) {
    return (
      <div className="min-h-screen bg-bg-section flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <h1 className="font-display text-4xl text-brand-green-primary mb-4">Access Denied</h1>
          <p className="text-sm text-text-secondary mb-6">You do not have permission to view this console workspace.</p>
          <button onClick={handleSignOut} className="px-6 py-2.5 rounded-lg bg-brand-gold-premium text-brand-green-primary text-xs font-semibold uppercase tracking-[0.22em] hover:bg-brand-gold-rich transition-colors">
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-section flex">
      <aside className="hidden lg:flex w-72 shrink-0 flex-col border-r border-sidebar-border bg-sidebar h-screen sticky top-0">
        <div className="h-20 flex items-center px-6 border-b border-sidebar-border">
          <Link to="/" className="flex items-center">
            <img src={logoAsset.url} alt="Fortune Alliances" className="h-10 w-auto object-contain" />
          </Link>
        </div>
        <div className="px-4 py-5 flex-1 overflow-y-auto">
          <div className="text-[10px] uppercase tracking-[0.28em] text-sidebar-foreground/70 px-2 mb-3">Console</div>
          <nav className="flex flex-col gap-1">
            {items.map((n) => {
              const activePath = pathname === n.to || pathname.startsWith(n.to + "/");
              
              const isSettings = n.to === "/settings";
              const isProfileLink = n.label === "Profile";
              const currentHasProfileTab = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "").get("tab") === "profile";
              
              let active = activePath;
              if (isSettings) {
                if (isProfileLink) {
                  active = activePath && currentHasProfileTab;
                } else {
                  active = activePath && !currentHasProfileTab;
                }
              }

              const Icon = n.icon;
              return (
                <Link
                  key={n.label + n.to}
                  to={n.to}
                  search={n.search}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    active
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <Icon size={16} />
                  <span>{n.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className="h-9 w-9 rounded-full bg-sidebar-primary grid place-items-center text-sidebar-primary-foreground font-display">
              {user?.name?.[0] ?? "A"}
            </div>
            <div className="min-w-0">
              <div className="text-sm truncate text-sidebar-foreground">{user?.name}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-sidebar-primary">{role}</div>
            </div>
          </div>
          <button onClick={handleSignOut} className="w-full flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] py-2 rounded-lg border border-sidebar-border hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-20 flex items-center justify-between px-6 lg:px-10 border-b border-border bg-background sticky top-0 z-30">
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-brand-gold-premium">{role} workspace</div>
            <h1 className="font-display text-2xl leading-none mt-1 text-brand-green-primary">{title}</h1>
            {subtitle && <p className="text-xs text-text-secondary mt-1">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 h-10 rounded-lg border border-border bg-background w-72">
              <Search size={14} className="text-text-secondary" />
              <input placeholder="Search ID, customer, order…" className="bg-transparent outline-none text-sm flex-1 placeholder:text-text-secondary/40" />
            </div>
            <button className="h-10 w-10 grid place-items-center rounded-lg border border-border hover:border-brand-gold-premium/60">
              <Bell size={15} />
            </button>
          </div>
        </header>
        <main className="flex-1 px-6 lg:px-10 py-8">{children}</main>
      </div>
    </div>
  );
}
