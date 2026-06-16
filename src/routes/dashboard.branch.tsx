import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/dashboard/AppShell";
import { StatusPill } from "@/components/dashboard/widgets";
import { Card } from "@/components/ui/card";
import { LiveGoldRate } from "@/components/dashboard/LiveGoldRate";
import { UserPlus, Coins, ShoppingCart, PackageSearch } from "lucide-react";
import { orders, customers, inr } from "@/lib/mock/data";

export const Route = createFileRoute("/dashboard/branch")({
  head: () => ({ meta: [{ title: "Branch Console — 2PlusFortuneAliances" }] }),
  component: BranchDashboard,
});

function BranchDashboard() {
  return (
    <AppShell title="Branch Console" subtitle="Andheri East Hub · B-50211 · Mumbai">
      {/* PRIMARY ACTIONS — most prominent */}
      <div className="mb-6">
        <div className="text-[10px] uppercase tracking-[0.28em] text-brand-gold-premium/80 mb-3">Primary Actions</div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <ActionCard to="/customers" icon={UserPlus} title="Add Customer" desc="KYC & onboarding desk" />
          <ActionCard to="/orders/new" icon={ShoppingCart} title="New Gold Order" desc="Start 5-step workflow" primary />
          <ActionCard to="/gold-products" icon={Coins} title="View Gold Products" desc="Catalog · live rate" />
          <ActionCard to="/orders" icon={PackageSearch} title="Order Tracking" desc="Status & fulfilment" />
        </div>
      </div>

      {/* LIVE GOLD RATE — hero widget */}
      <LiveGoldRate />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <Placeholder label="Today's Orders" value="—" note="Sample · awaiting backend" />
        <Placeholder label="Today's Revenue" value="—" note="Sample · awaiting backend" />
        <Placeholder label="Walk-ins" value="—" note="Sample · awaiting CRM" />
        <Placeholder label="Active KYC" value="—" note="Sample · awaiting KYC API" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mt-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-[0.28em] text-brand-gold-premium/80">Recent Branch Orders <span className="text-text-secondary/40 ml-2 normal-case tracking-normal">(sample data)</span></div>
            <Link to="/orders" className="text-[10px] uppercase tracking-[0.22em] text-text-secondary/55 hover:text-brand-gold-premium">View all →</Link>
          </div>
          <div className="mt-3 divide-y divide-border">
            {orders.slice(0, 5).map((o) => (
              <div key={o.id} className="py-3 flex items-center justify-between text-sm">
                <div>
                  <div>{o.id} · {o.product}</div>
                  <div className="text-[10px] text-text-secondary">{o.customer}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-brand-gold-premium">{inr(o.amount)}</span>
                  <StatusPill status={o.status} />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-[0.28em] text-brand-gold-premium/80">Recent Customers <span className="text-text-secondary/40 ml-2 normal-case tracking-normal">(sample data)</span></div>
            <Link to="/customers" className="text-[10px] uppercase tracking-[0.22em] text-text-secondary/55 hover:text-brand-gold-premium">View all →</Link>
          </div>
          <div className="mt-3 divide-y divide-border">
            {customers.slice(0, 5).map((c) => (
              <div key={c.id} className="py-3 flex items-center justify-between text-sm">
                <div>
                  <div>{c.name}</div>
                  <div className="text-[10px] text-text-secondary">{c.phone} · {c.city}</div>
                </div>
                <StatusPill status={c.kyc} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

function ActionCard({ to, icon: Icon, title, desc, primary }: { to: string; icon: typeof UserPlus; title: string; desc: string; primary?: boolean }) {
  return (
    <Link
      to={to}
      className={`relative rounded-lg p-6 border transition group ${primary
        ? "border-brand-gold-premium bg-brand-gold-premium/10 hover:bg-brand-gold-premium/15"
        : "border-border bg-white hover:border-brand-gold-premium/60"}`}
    >
      <div className={`h-12 w-12 rounded-lg grid place-items-center ${primary ? "bg-brand-gold-premium text-brand-green-primary" : "bg-brand-gold-premium/10 text-brand-gold-premium"}`}>
        <Icon size={20} />
      </div>
      <div className="font-display text-xl mt-4 text-brand-green-primary">{title}</div>
      <div className="text-xs text-text-secondary mt-1">{desc}</div>
      <div className="text-[10px] uppercase tracking-[0.22em] text-brand-gold-premium mt-4 opacity-70 group-hover:opacity-100">Open →</div>
    </Link>
  );
}

function Placeholder({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <Card className="p-5">
      <div className="text-[10px] uppercase tracking-[0.22em] text-text-secondary">{label}</div>
      <div className="font-display text-3xl mt-2 text-text-secondary/40">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-brand-gold-premium/70 mt-1">{note}</div>
    </Card>
  );
}
