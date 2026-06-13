import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/dashboard/AppShell";
import { StatCard } from "@/components/dashboard/widgets";
import { Handshake, Building2, Users, ShoppingCart, Coins } from "lucide-react";
import { partners, branches, customers, orders, activity, inr } from "@/lib/mock/data";
import { DashboardPreview } from "@/components/site/DashboardPreview";

export const Route = createFileRoute("/dashboard/admin")({
  head: () => ({ meta: [{ title: "Admin Console — 2PlusFortuneAliances" }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const totalGold = customers.reduce((s, c) => s + c.gold, 0);
  const totalGmv = partners.reduce((s, p) => s + p.gmv, 0);
  return (
    <AppShell title="Network Overview" subtitle="Live operating metrics across the Fortune Alliance network">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard label="Total Partners" value={String(partners.length * 47)} delta="+6 this quarter" icon={<Handshake size={16} />} />
        <StatCard label="Total Branches" value="9,612" delta="+318 MoM" icon={<Building2 size={16} />} />
        <StatCard label="Total Customers" value="1.24M" delta="+4.2% MoM" icon={<Users size={16} />} />
        <StatCard label="Total Orders" value="184,210" delta="+12.4% MoM" icon={<ShoppingCart size={16} />} />
        <StatCard label="Gold Volume" value={`${(totalGold * 1840).toFixed(0)} kg`} delta="+8.1% MoM" icon={<Coins size={16} />} />
        <StatCard label="GMV (₹)" value={`₹ ${totalGmv.toFixed(0)} Cr`} delta="+11.6% MoM" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-6">
        <div className="lg:col-span-2"><DashboardPreview /></div>
        <div className="glass-card rounded-md p-5">
          <div className="text-[10px] uppercase tracking-[0.28em] text-gold/80">Recent Activity</div>
          <h3 className="font-display text-xl mt-1">Network signal</h3>
          <div className="mt-5 space-y-4">
            {activity.map((a, i) => (
              <div key={i} className="flex gap-3">
                <div className="h-2 w-2 mt-1.5 rounded-full bg-[color:var(--color-gold)]" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm"><span className="text-gold">{a.who}</span> {a.what}</div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/50 mt-0.5">{a.when}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mt-6">
        <div className="glass-card rounded-md p-6">
          <div className="text-[10px] uppercase tracking-[0.28em] text-gold/80">Top Partners by GMV</div>
          <div className="mt-4 space-y-3">
            {[...partners].sort((a, b) => b.gmv - a.gmv).slice(0, 5).map((p) => (
              <div key={p.id}>
                <div className="flex justify-between text-sm"><span>{p.name}</span><span className="text-gold">₹{p.gmv} Cr</span></div>
                <div className="h-1 rounded-full bg-[color:var(--color-border)] mt-1.5 overflow-hidden">
                  <div className="h-full bg-[color:var(--color-gold)]" style={{ width: `${(p.gmv / 265) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card rounded-md p-6">
          <div className="text-[10px] uppercase tracking-[0.28em] text-gold/80">Latest Orders</div>
          <div className="mt-3 space-y-2">
            {orders.slice(0, 5).map((o) => (
              <div key={o.id} className="flex items-center justify-between text-sm border-b border-[color:var(--color-border)] py-2">
                <div>
                  <div>{o.id}</div>
                  <div className="text-[10px] text-foreground/55">{o.customer} · {o.branch}</div>
                </div>
                <div className="text-gold">{inr(o.amount)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
