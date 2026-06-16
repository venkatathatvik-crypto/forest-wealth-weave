import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";

export function StatCard({ label, value, delta, icon }: { label: string; value: string; delta?: string; icon?: ReactNode }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-text-secondary">{label}</div>
          <div className="font-display text-3xl mt-2 text-brand-green-primary">{value}</div>
          {delta && (
            <div className="text-[11px] text-brand-gold-premium mt-1 flex items-center gap-1">
              <ArrowUpRight size={12} /> {delta}
            </div>
          )}
        </div>
        {icon && <div className="h-10 w-10 grid place-items-center rounded-lg bg-brand-gold-premium/10 text-brand-gold-premium">{icon}</div>}
      </div>
    </Card>
  );
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Active: "bg-brand-green-secondary/15 text-brand-green-primary border-brand-green-secondary/30",
    Live: "bg-brand-green-secondary/15 text-brand-green-primary border-brand-green-secondary/30",
    Verified: "bg-brand-green-secondary/15 text-brand-green-primary border-brand-green-secondary/30",
    Delivered: "bg-brand-green-secondary/15 text-brand-green-primary border-brand-green-secondary/30",
    Onboarding: "bg-brand-gold-premium/15 text-brand-gold-premium border-brand-gold-premium/30",
    Setup: "bg-brand-gold-premium/15 text-brand-gold-premium border-brand-gold-premium/30",
    Pending: "bg-orange-500/15 text-orange-300 border-orange-500/30",
    Placed: "bg-orange-500/15 text-orange-300 border-orange-500/30",
    Processing: "bg-brand-gold-premium/15 text-brand-gold-premium border-brand-gold-premium/40",
    Dispatched: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    Paused: "bg-zinc-500/15 text-zinc-300 border-zinc-500/30",
    Cancelled: "bg-red-500/15 text-red-300 border-red-500/30",
    Rejected: "bg-red-500/15 text-red-300 border-red-500/30",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-lg border text-[10px] uppercase tracking-[0.16em] ${map[status] ?? "bg-white/5 border-white/10"}`}>{status}</span>;
}

export function PageToolbar({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-3 mb-5">{children}</div>;
}
