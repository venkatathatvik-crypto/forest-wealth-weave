import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth, type Role } from "@/lib/mock/auth";
import logoAsset from "@/assets/fortune-alliances-logo.png.asset.json";
import { Shield, Briefcase, Building2 } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign In — 2PlusFortuneAliances" }] }),
  component: LoginPage,
});

const ROLES: { id: Role; label: string; desc: string; icon: typeof Shield; demo: string }[] = [
  { id: "admin", label: "Admin", desc: "Network-wide oversight & governance", icon: Shield, demo: "admin@2plusfortune.in" },
  { id: "partner", label: "Partner", desc: "Distribution partner console", icon: Briefcase, demo: "partner@meridian.in" },
  { id: "branch", label: "Branch", desc: "Branch operations & customer desk", icon: Building2, demo: "branch@andheri-east.in" },
];

function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [role, setRole] = useState<Role>("admin");
  const [email, setEmail] = useState("admin@2plusfortune.in");
  const [password, setPassword] = useState("••••••••");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, role);
    nav({ to: role === "admin" ? "/dashboard/admin" : role === "partner" ? "/dashboard/partner" : "/dashboard/branch" });
  };

  const pickRole = (r: Role) => {
    setRole(r);
    setEmail(ROLES.find((x) => x.id === r)!.demo);
  };

  return (
    <div className="min-h-screen bg-[color:var(--emerald-deep)] grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between p-12 border-r border-[color:var(--color-border)] bg-[color:var(--emerald-forest)]/40">
        <Link to="/"><img src={logoAsset.url} alt="Fortune Alliances" className="h-14 w-auto" /></Link>
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Institutional Console</div>
          <h2 className="font-display text-4xl mt-4 leading-tight max-w-md">
            The alliance-led commerce backbone of Bharat.
          </h2>
          <p className="mt-4 text-sm text-foreground/70 max-w-md leading-relaxed">
            A unified workspace for manufacturers, financial institutions, distribution partners and branches —
            built to institutional-grade standards.
          </p>
        </div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">© 2026 2PlusFortuneAliances · SOC 2 Type II · RBI Aligned</div>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-12">
        <form onSubmit={submit} className="w-full max-w-md">
          <div className="lg:hidden mb-6"><img src={logoAsset.url} alt="" className="h-10" /></div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Sign In</div>
          <h1 className="font-display text-3xl mt-2">Access your console</h1>
          <p className="text-sm text-foreground/60 mt-2">Choose your role to enter the workspace.</p>

          <div className="grid grid-cols-3 gap-2 mt-7">
            {ROLES.map((r) => {
              const Icon = r.icon;
              const active = role === r.id;
              return (
                <button
                  key={r.id} type="button" onClick={() => pickRole(r.id)}
                  className={`p-3 rounded-sm border text-left transition ${active ? "border-[color:var(--color-gold)] bg-[color:var(--color-gold)]/10" : "border-[color:var(--color-border)] hover:border-[color:var(--color-gold)]/50"}`}
                >
                  <Icon size={16} className={active ? "text-gold" : "text-foreground/70"} />
                  <div className="text-xs font-medium mt-2">{r.label}</div>
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-foreground/55 mt-2">{ROLES.find((r) => r.id === role)!.desc}</p>

          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.22em] text-foreground/65">Work Email</span>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 w-full h-11 px-3 rounded-sm bg-[color:var(--emerald-forest)]/60 border border-[color:var(--color-border)] outline-none focus:border-[color:var(--color-gold)]/70 text-sm" />
            </label>
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.22em] text-foreground/65">Password</span>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5 w-full h-11 px-3 rounded-sm bg-[color:var(--emerald-forest)]/60 border border-[color:var(--color-border)] outline-none focus:border-[color:var(--color-gold)]/70 text-sm" />
            </label>
          </div>

          <button type="submit" className="btn-gold mt-6 w-full h-11 rounded-sm text-xs font-semibold uppercase tracking-[0.22em]">
            Enter Console
          </button>
          <p className="text-[11px] text-foreground/45 mt-4 text-center">
            Demo environment — credentials are not validated.
          </p>
        </form>
      </div>
    </div>
  );
}
