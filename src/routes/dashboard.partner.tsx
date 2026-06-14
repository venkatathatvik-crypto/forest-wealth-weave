import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/dashboard/AppShell";
import { StatCard } from "@/components/dashboard/widgets";
import { Building2, ShoppingCart, IndianRupee, Activity } from "lucide-react";
import { branches, orders, inr } from "@/lib/mock/data";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const distributionSeries = [
  { month: "Jul", primary: 412, secondary: 268, branches: 184 },
  { month: "Aug", primary: 468, secondary: 295, branches: 201 },
  { month: "Sep", primary: 521, secondary: 332, branches: 224 },
  { month: "Oct", primary: 498, secondary: 358, branches: 246 },
  { month: "Nov", primary: 574, secondary: 391, branches: 271 },
  { month: "Dec", primary: 632, secondary: 422, branches: 298 },
  { month: "Jan", primary: 689, secondary: 461, branches: 325 },
  { month: "Feb", primary: 712, secondary: 489, branches: 348 },
  { month: "Mar", primary: 781, secondary: 524, branches: 376 },
  { month: "Apr", primary: 824, secondary: 561, branches: 402 },
  { month: "May", primary: 902, secondary: 598, branches: 431 },
  { month: "Jun", primary: 968, secondary: 642, branches: 458 },
];

export const Route = createFileRoute("/dashboard/partner")({
  head: () => ({ meta: [{ title: "Partner Console — 2PlusFortuneAliances" }] }),
  component: PartnerDashboard,
});

function PartnerDashboard() {
  return (
    <AppShell title="Partner Console" subtitle="Meridian Capital Partners · Western region · sample data until backend integration">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="My Branches" value={String(branches.length)} delta="Sample data" icon={<Building2 size={16} />} />
        <StatCard label="Orders" value={String(orders.length)} delta="Sample data" icon={<ShoppingCart size={16} />} />
        <StatCard label="Revenue Overview" value="—" delta="Awaiting backend" icon={<IndianRupee size={16} />} />
        <StatCard label="Performance" value="—" delta="Awaiting backend" icon={<Activity size={16} />} />
      </div>

      <div className="glass-card rounded-md p-6 mt-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-gold/80">Distribution Volume</div>
            <h3 className="font-display text-xl mt-1">Gold throughput across the network · last 12 months</h3>
            <p className="text-xs text-foreground/55 mt-1">Indexed kilograms dispatched through primary alliances, secondary partners and branch counters.</p>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-foreground/70">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#D4AF37]" /> Primary Alliances</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#8C6B1F]" /> Secondary Partners</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#5BA88A]" /> Branches</span>
          </div>
        </div>
        <div className="h-72 mt-5 -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={distributionSeries} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gPrimary" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.55} />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gSecondary" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8C6B1F" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#8C6B1F" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gBranches" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5BA88A" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#5BA88A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} axisLine={false} tickLine={false} width={40} />
              <Tooltip
                contentStyle={{
                  background: "rgba(8,32,30,0.95)",
                  border: "1px solid rgba(212,175,55,0.35)",
                  borderRadius: 4,
                  fontSize: 12,
                }}
                labelStyle={{ color: "#D4AF37", fontWeight: 600 }}
                formatter={(v: number) => [`${v} kg`, ""]}
              />
              <Area type="monotone" dataKey="primary" name="Primary Alliances" stroke="#D4AF37" strokeWidth={2} fill="url(#gPrimary)" />
              <Area type="monotone" dataKey="secondary" name="Secondary Partners" stroke="#8C6B1F" strokeWidth={2} fill="url(#gSecondary)" />
              <Area type="monotone" dataKey="branches" name="Branches" stroke="#5BA88A" strokeWidth={2} fill="url(#gBranches)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-6">
        <div className="lg:col-span-2 glass-card rounded-md p-6">
          <div className="text-[10px] uppercase tracking-[0.28em] text-gold/80">Performance Metrics</div>
          <h3 className="font-display text-xl mt-1">SLA & Conversion · last 12 weeks</h3>
          <div className="grid grid-cols-3 gap-4 mt-5">
            {[["Order SLA", "99.2%", 99], ["KYC Accuracy", "97.5%", 97], ["Settlement TAT", "T+1.2d", 92]].map(([k, v, w]) => (
              <div key={k as string}>
                <div className="text-xs text-foreground/60">{k}</div>
                <div className="font-display text-2xl mt-1">{v}</div>
                <div className="h-1 rounded-full bg-[color:var(--color-border)] mt-2 overflow-hidden">
                  <div className="h-full bg-[color:var(--color-gold)]" style={{ width: `${w}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-end gap-2 h-32 mt-7">
            {[58, 64, 72, 68, 81, 76, 88, 84, 92, 86, 95, 91].map((b, i) => (
              <div key={i} className="flex-1 rounded-t-[2px]" style={{ height: `${b}%`, background: "linear-gradient(180deg, #F4D27A, #D4AF37 60%, #8C6B1F)" }} />
            ))}
          </div>
        </div>

        <div className="glass-card rounded-md p-6">
          <div className="text-[10px] uppercase tracking-[0.28em] text-gold/80">Top Branches</div>
          <div className="mt-4 space-y-3">
            {branches.slice(0, 6).map((b) => (
              <div key={b.id} className="flex justify-between items-center text-sm border-b border-[color:var(--color-border)] py-2">
                <div>
                  <div>{b.name}</div>
                  <div className="text-[10px] text-foreground/55">{b.city}</div>
                </div>
                <div className="text-gold">{b.orders}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
