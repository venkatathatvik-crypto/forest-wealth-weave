import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/dashboard/AppShell";
import { StatusPill } from "@/components/dashboard/widgets";
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
        <div className="text-[10px] uppercase tracking-[0.28em] text-gold/80 mb-3">Primary Actions</div>
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
        <div className="glass-card rounded-md p-6">
          <div className="flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-[0.28em] text-gold/80">Recent Branch Orders <span className="text-foreground/40 ml-2 normal-case tracking-normal">(sample data)</span></div>
            <Link to="/orders" className="text-[10px] uppercase tracking-[0.22em] text-foreground/55 hover:text-gold">View all →</Link>
          </div>
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
          <div className="flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-[0.28em] text-gold/80">Recent Customers <span className="text-foreground/40 ml-2 normal-case tracking-normal">(sample data)</span></div>
            <Link to="/customers" className="text-[10px] uppercase tracking-[0.22em] text-foreground/55 hover:text-gold">View all →</Link>
          </div>
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

function ActionCard({ to, icon: Icon, title, desc, primary }: { to: string; icon: typeof UserPlus; title: string; desc: string; primary?: boolean }) {
  return (
    <Link
      to={to}
      className={`relative rounded-md p-6 border transition group ${primary
        ? "border-[color:var(--color-gold)] bg-gradient-to-br from-[color:var(--color-gold)]/15 to-transparent hover:from-[color:var(--color-gold)]/25"
        : "border-[color:var(--color-border)] bg-[color:var(--emerald-forest)]/40 hover:border-[color:var(--color-gold)]/60"}`}
    >
      <div className={`h-12 w-12 rounded-sm grid place-items-center ${primary ? "bg-[color:var(--color-gold)] text-[color:var(--emerald-deep)]" : "bg-[color:var(--color-gold)]/10 text-gold"}`}>
        <Icon size={20} />
      </div>
      <div className="font-display text-xl mt-4">{title}</div>
      <div className="text-xs text-foreground/65 mt-1">{desc}</div>
      <div className="text-[10px] uppercase tracking-[0.22em] text-gold mt-4 opacity-70 group-hover:opacity-100">Open →</div>
    </Link>
  );
}

function Placeholder({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="glass-card rounded-md p-5">
      <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/60">{label}</div>
      <div className="font-display text-3xl mt-2 text-foreground/40">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-amber-300/70 mt-1">{note}</div>
    </div>
  );
}
