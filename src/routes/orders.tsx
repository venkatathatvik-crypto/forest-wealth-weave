import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { StatusPill, PageToolbar } from "@/components/dashboard/widgets";
import { Card } from "@/components/ui/card";
import { orders as seed, inr } from "@/lib/mock/data";
import { useAuth } from "@/lib/mock/auth";
import { Search, Plus } from "lucide-react";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "Orders — 2PlusFortuneAliances" }] }),
  component: OrdersPage,
});

const STAGES = [
  "Order Created",
  "Payment Confirmed",
  "Processing",
  "Dispatched",
  "Delivered"
] as const;

function OrdersPage() {
  const { user } = useAuth();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");

  const filtered = useMemo(() => {
    let list = seed;
    if (user?.role === "customer") {
      list = list.filter((o) => o.customer.toLowerCase() === user.name.toLowerCase());
    }
    return list.filter(
      (o) =>
        (status === "All" || o.status === status) &&
        (o.id.includes(q) ||
          o.customer.toLowerCase().includes(q.toLowerCase()) ||
          o.product.toLowerCase().includes(q.toLowerCase()))
    );
  }, [q, status, user]);

  const subtitle = user?.role === "customer"
    ? `${filtered.length} of your orders · live tracking enabled`
    : `${seed.length} orders · live tracking enabled`;

  return (
    <AppShell title={user?.role === "customer" ? "My Orders" : "Orders"} subtitle={subtitle}>
      <PageToolbar>
        <div className="flex items-center gap-2 px-3 h-10 rounded-lg border border-border bg-background w-80">
          <Search size={14} className="text-text-secondary" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search order, customer, product…" className="bg-transparent outline-none text-sm flex-1 text-text-primary" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-background text-sm text-text-primary">
          {["All", "Pending", "Processing", "Dispatched", "Delivered", "Cancelled"].map((s) => <option key={s}>{s}</option>)}
        </select>
        <div className="flex-1" />
        {user?.role !== "customer" && (
          <Link to="/orders/new" className="h-10 px-4 rounded-lg bg-brand-gold-premium text-brand-green-primary text-xs uppercase tracking-[0.18em] font-semibold inline-flex items-center gap-2 hover:bg-brand-gold-rich transition-colors">
            <Plus size={14} /> New Order
          </Link>
        )}
      </PageToolbar>

      <div className="space-y-3">
        {filtered.map((o) => {
          let stageIdx = 0;
          if (o.status === "Pending") stageIdx = 1; // Payment Confirmed
          else if (o.status === "Processing") stageIdx = 2;
          else if (o.status === "Dispatched") stageIdx = 3;
          else if (o.status === "Delivered") stageIdx = 4;

          return (
            <Card key={o.id} className="p-5 text-text-primary bg-white border border-border shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="font-display text-lg text-brand-green-primary">{o.id}</div>
                    <StatusPill status={o.status} />
                  </div>
                  <div className="text-xs text-text-secondary mt-1">{o.product} · {o.weight}g · {o.qty} qty · {o.branch}</div>
                  {user?.role === "customer" ? (
                    <div className="text-[11px] text-text-secondary mt-0.5">Ordered on {o.date}</div>
                  ) : (
                    <div className="text-[11px] text-text-secondary mt-0.5">Customer: {o.customer} · {o.date}</div>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-display text-xl text-brand-gold-premium">{inr(o.amount)}</div>
                </div>
              </div>
              {o.status !== "Cancelled" && (
                <div className="mt-4 grid grid-cols-5 gap-2">
                  {STAGES.map((s, idx) => (
                    <div key={s}>
                      <div className={`h-1 rounded-full ${idx <= stageIdx ? "bg-brand-gold-premium" : "bg-border"}`} />
                      <div className={`text-[10px] uppercase tracking-[0.18em] mt-1.5 ${idx <= stageIdx ? "text-brand-gold-premium font-semibold" : "text-text-secondary/50"}`}>{s}</div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}
