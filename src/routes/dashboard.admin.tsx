import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/dashboard/AppShell";
import { StatCard } from "@/components/dashboard/widgets";
import { Card } from "@/components/ui/card";
import { Handshake, Building2, Users, ShoppingCart, Coins } from "lucide-react";
import { partners, branches, customers, orders, activity, inr } from "@/lib/mock/data";
import { DashboardPreview } from "@/components/site/DashboardPreview";

export const Route = createFileRoute("/dashboard/admin")({
  head: () => ({ meta: [{ title: "Admin Console — 2PlusFortuneAliances" }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <AppShell title="Network Overview" subtitle="Operational workspace · Fortune Alliance network · sample data shown until backend integration">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard label="Partners" value={String(partners.length)} delta="Sample data" icon={<Handshake size={16} />} />
        <StatCard label="Branches" value={String(branches.length)} delta="Sample data" icon={<Building2 size={16} />} />
        <StatCard label="Customers" value={String(customers.length)} delta="Sample data" icon={<Users size={16} />} />
        <StatCard label="Orders" value={String(orders.length)} delta="Sample data" icon={<ShoppingCart size={16} />} />
        <StatCard label="Gold Volume" value="—" delta="Awaiting Augmont API" icon={<Coins size={16} />} />
        <StatCard label="System Activity" value="Live" delta="All systems nominal" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-6">
        <div className="lg:col-span-2"><DashboardPreview /></div>
        <Card className="p-5">
          <div className="text-[10px] uppercase tracking-[0.28em] text-brand-gold-premium/80">Recent Activity</div>
          <h3 className="font-display text-xl mt-1 text-brand-green-primary">Network signal</h3>
          <div className="mt-5 space-y-4">
            {activity.map((a, i) => (
              <div key={i} className="flex gap-3">
                <div className="h-2 w-2 mt-1.5 rounded-full bg-brand-gold-premium" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm"><span className="text-brand-gold-premium">{a.who}</span> {a.what}</div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-text-secondary/50 mt-0.5">{a.when}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mt-6">
        <Card className="p-6">
          <div className="text-[10px] uppercase tracking-[0.28em] text-brand-gold-premium/80">Top Partners by GMV</div>
          <div className="mt-4 space-y-3">
            {[...partners].sort((a, b) => b.gmv - a.gmv).slice(0, 5).map((p) => (
              <div key={p.id}>
                <div className="flex justify-between text-sm"><span>{p.name}</span><span className="text-brand-gold-premium">₹{p.gmv} Cr</span></div>
                <div className="h-1 rounded-full bg-border mt-1.5 overflow-hidden">
                  <div className="h-full bg-brand-gold-premium" style={{ width: `${(p.gmv / 265) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-[10px] uppercase tracking-[0.28em] text-brand-gold-premium/80">Latest Orders</div>
          <div className="mt-3 space-y-2">
            {orders.slice(0, 5).map((o) => (
              <div key={o.id} className="flex items-center justify-between text-sm border-b border-border py-2">
                <div>
                  <div>{o.id}</div>
                  <div className="text-[10px] text-text-secondary">{o.customer} · {o.branch}</div>
                </div>
                <div className="text-brand-gold-premium">{inr(o.amount)}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
