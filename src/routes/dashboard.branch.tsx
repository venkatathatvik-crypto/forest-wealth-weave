import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/dashboard/AppShell";
import { StatCard, StatusPill } from "@/components/dashboard/widgets";
import { UserPlus, Coins, ShoppingCart, FileBarChart2 } from "lucide-react";
import { orders, goldProducts, customers, inr, goldRateINR } from "@/lib/mock/data";

export const Route = createFileRoute("/dashboard/branch")({
  head: () => ({ meta: [{ title: "Branch Console — 2PlusFortuneAliances" }] }),
  component: BranchDashboard,
});

function BranchDashboard() {
  return (
    <AppShell title="Branch Console" subtitle="Andheri East Hub · B-50211 · Mumbai">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/customers" className="glass-card rounded-md p-5 hover:border-[color:var(--color-gold)]/60 transition border border-[color:var(--color-border)]">
          <div className="h-10 w-10 rounded-sm bg-[color:var(--color-gold)]/10 text-gold grid place-items-center"><UserPlus size={16} /></div>
          <div className="font-display text-xl mt-3">Add Customer</div>
          <div className="text-xs text-foreground/60 mt-1">KYC onboarding desk</div>
        </Link>
        <Link to="/gold-products" className="glass-card rounded-md p-5 hover:border-[color:var(--color-gold)]/60 transition border border-[color:var(--color-border)]">
          <div className="h-10 w-10 rounded-sm bg-[color:var(--color-gold)]/10 text-gold grid place-items-center"><Coins size={16} /></div>
          <div className="font-display text-xl mt-3">Gold Products</div>
          <div className="text-xs text-foreground/60 mt-1">{goldProducts.length} SKUs in catalog</div>
        </Link>
        <Link to="/orders" className="glass-card rounded-md p-5 hover:border-[color:var(--color-gold)]/60 transition border border-[color:var(--color-border)]">
          <div className="h-10 w-10 rounded-sm bg-[color:var(--color-gold)]/10 text-gold grid place-items-center"><ShoppingCart size={16} /></div>
          <div className="font-display text-xl mt-3">Orders</div>
          <div className="text-xs text-foreground/60 mt-1">{orders.length} active orders</div>
        </Link>
        <Link to="/reports" className="glass-card rounded-md p-5 hover:border-[color:var(--color-gold)]/60 transition border border-[color:var(--color-border)]">
          <div className="h-10 w-10 rounded-sm bg-[color:var(--color-gold)]/10 text-gold grid place-items-center"><FileBarChart2 size={16} /></div>
          <div className="font-display text-xl mt-3">Reports</div>
          <div className="text-xs text-foreground/60 mt-1">Daybook · settlements</div>
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatCard label="Today's Orders" value="42" delta="+6 vs. yesterday" />
        <StatCard label="Today's Revenue" value={inr(842110)} delta="+₹84k" />
        <StatCard label="Gold Rate · 24K" value={`₹${goldRateINR}/g`} delta="MCX live" />
        <StatCard label="Walk-ins" value="58" delta="Footfall MoM +12%" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mt-6">
        <div className="glass-card rounded-md p-6">
          <div className="text-[10px] uppercase tracking-[0.28em] text-gold/80">Recent Branch Orders</div>
          <div className="mt-3 divide-y divide-[color:var(--color-border)]">
            {orders.slice(0, 5).map((o) => (
              <div key={o.id} className="py-3 flex items-center justify-between text-sm">
                <div>
                  <div>{o.id} · {o.product}</div>
                  <div className="text-[10px] text-foreground/55">{o.customer}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gold">{inr(o.amount)}</span>
                  <StatusPill status={o.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card rounded-md p-6">
          <div className="text-[10px] uppercase tracking-[0.28em] text-gold/80">Recent Customers</div>
          <div className="mt-3 divide-y divide-[color:var(--color-border)]">
            {customers.slice(0, 5).map((c) => (
              <div key={c.id} className="py-3 flex items-center justify-between text-sm">
                <div>
                  <div>{c.name}</div>
                  <div className="text-[10px] text-foreground/55">{c.phone} · {c.city}</div>
                </div>
                <StatusPill status={c.kyc} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
