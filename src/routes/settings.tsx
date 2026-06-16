import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/dashboard/AppShell";
import { useAuth } from "@/lib/mock/auth";
import { Bell, Lock, User, Building2, Plug, Shield } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — 2PlusFortuneAliances" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { user } = useAuth();
  const sections = [
    { icon: User, title: "Profile", desc: "Personal details, contact information and signature" },
    ...(user?.role !== "customer" ? [
      { icon: Building2, title: "Organisation", desc: "Entity registration, branch hierarchy and territories" },
    ] : []),
    { icon: Lock, title: "Security", desc: "Password, MFA enrolment and active session control" },
    { icon: Bell, title: "Notifications", desc: "Email, SMS and in-app alert preferences" },
    ...(user?.role !== "customer" ? [
      { icon: Plug, title: "Integrations", desc: "Augmont API, payment gateways, KYC and accounting" },
      { icon: Shield, title: "Compliance", desc: "RBI advisories, GST configuration and audit log access" },
    ] : []),
  ];
  return (
    <AppShell title="Settings" subtitle="Workspace configuration · operational controls">
      <div className="glass-card rounded-md p-6 mb-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-[color:var(--color-gold)]/15 grid place-items-center text-gold font-display text-xl">
            {user?.name?.[0] ?? "U"}
          </div>
          <div>
            <div className="font-display text-xl">{user?.name}</div>
            <div className="text-xs text-foreground/60">{user?.email} · <span className="text-gold uppercase tracking-[0.18em] text-[10px]">{user?.role}</span></div>
          </div>
        </div>
        <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/55">Workspace ID · WK-{user?.role?.toUpperCase()}-0001</div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="glass-card rounded-md p-5 hover:border-[color:var(--color-gold)]/60 transition cursor-pointer">
              <div className="h-10 w-10 rounded-sm bg-[color:var(--color-gold)]/10 text-gold grid place-items-center"><Icon size={16} /></div>
              <div className="font-display text-lg mt-3">{s.title}</div>
              <div className="text-xs text-foreground/60 mt-1">{s.desc}</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/40 mt-3">Configure →</div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}