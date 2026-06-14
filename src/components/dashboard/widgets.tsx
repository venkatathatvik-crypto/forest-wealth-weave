import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

export function StatCard({ label, value, delta, icon }: { label: string; value: string; delta?: string; icon?: ReactNode }) {
  return (
    <div className="glass-card rounded-md p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/60">{label}</div>
          <div className="font-display text-3xl mt-2">{value}</div>
          {delta && (
            <div className="text-[11px] text-gold mt-1 flex items-center gap-1">
              <ArrowUpRight size={12} /> {delta}
            </div>
          )}
        </div>
        {icon && <div className="h-10 w-10 grid place-items-center rounded-sm bg-[color:var(--color-gold)]/10 text-gold">{icon}</div>}
      </div>
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Active: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    Live: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    Verified: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    Delivered: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    Onboarding: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    Setup: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    Pending: "bg-orange-500/15 text-orange-300 border-orange-500/30",
    Placed: "bg-orange-500/15 text-orange-300 border-orange-500/30",
    Processing: "bg-[color:var(--color-gold)]/15 text-gold border-[color:var(--color-gold)]/40",
    Dispatched: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    Paused: "bg-zinc-500/15 text-zinc-300 border-zinc-500/30",
    Cancelled: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    Rejected: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-sm border text-[10px] uppercase tracking-[0.16em] ${map[status] ?? "bg-white/5 border-white/10"}`}>{status}</span>;
}

export function PageToolbar({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-3 mb-5">{children}</div>;
}
