import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/dashboard/AppShell";
import { StatCard } from "@/components/dashboard/widgets";
import { Card } from "@/components/ui/card";
import { Building2, ShoppingCart, IndianRupee, Activity } from "lucide-react";
import { branches, orders } from "@/lib/mock/data";
import { partnerListBranches } from "@/lib/api/branches";
import { DistributionChart } from "@/components/dashboard/DistributionChart";

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
  // Real count of this partner's own branches; the rest stays sample data.
  const { data: branchPage } = useQuery({
    queryKey: ["partner", "branches-count"],
    queryFn: () => partnerListBranches({ size: 1 }),
  });

  return (
    <AppShell title="Partner Console" subtitle="Meridian Capital Partners · Western region · sample data until backend integration">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="My Branches" value={branchPage ? String(branchPage.totalItems) : "…"} delta={branchPage ? "Live" : ""} icon={<Building2 size={16} />} />
        <StatCard label="Orders" value={String(orders.length)} delta="Sample data" icon={<ShoppingCart size={16} />} />
        <StatCard label="Revenue Overview" value="—" delta="Awaiting backend" icon={<IndianRupee size={16} />} />
        <StatCard label="Performance" value="—" delta="Awaiting backend" icon={<Activity size={16} />} />
      </div>

      <Card className="p-6 mt-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-brand-gold-premium/80">Distribution Volume</div>
            <h3 className="font-display text-xl mt-1 text-brand-green-primary">Gold throughput across the network · last 12 months</h3>
            <p className="text-xs text-text-secondary mt-1">Indexed kilograms dispatched through primary alliances, secondary partners and branch counters.</p>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-text-secondary">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-brand-gold-premium" /> Primary Alliances</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-brand-gold-rich" /> Secondary Partners</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-brand-green-secondary" /> Branches</span>
          </div>
        </div>
        <DistributionChart data={distributionSeries} />
      </Card>

      <div className="grid lg:grid-cols-3 gap-5 mt-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="text-[10px] uppercase tracking-[0.28em] text-brand-gold-premium/80">Performance Metrics</div>
            <h3 className="font-display text-xl mt-1 text-brand-green-primary">SLA & Conversion · last 12 weeks</h3>
            <div className="grid grid-cols-3 gap-4 mt-5">
              {[["Order SLA", "99.2%", 99], ["KYC Accuracy", "97.5%", 97], ["Settlement TAT", "T+1.2d", 92]].map(([k, v, w]) => (
                <div key={k as string}>
                  <div className="text-xs text-text-secondary">{k}</div>
                  <div className="font-display text-2xl mt-1 text-brand-green-primary">{v}</div>
                  <div className="h-1 rounded-full bg-border mt-2 overflow-hidden">
                    <div className="h-full bg-brand-gold-premium" style={{ width: `${w}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-end gap-2 h-32 mt-7">
              {[58, 64, 72, 68, 81, 76, 88, 84, 92, 86, 95, 91].map((b, i) => (
                <div key={i} className="flex-1 rounded-t-[2px]" style={{ height: `${b}%`, background: "linear-gradient(180deg, var(--brand-gold-premium), var(--brand-gold-rich) 60%, var(--brand-gold-rich))" }} />
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <div className="text-[10px] uppercase tracking-[0.28em] text-brand-gold-premium/80">Top Branches</div>
          <div className="mt-4 space-y-3">
            {branches.slice(0, 6).map((b) => (
              <div key={b.id} className="flex justify-between items-center text-sm border-b border-border py-2">
                <div>
                  <div>{b.name}</div>
                  <div className="text-[10px] text-text-secondary">{b.city}</div>
                </div>
                <div className="text-brand-gold-premium">{b.orders}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
