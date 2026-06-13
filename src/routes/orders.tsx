import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { StatusPill, PageToolbar } from "@/components/dashboard/widgets";
import { orders as seed, inr } from "@/lib/mock/data";
import { Search } from "lucide-react";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "Orders — 2PlusFortuneAliances" }] }),
  component: OrdersPage,
});

const STAGES = ["Placed", "Processing", "Dispatched", "Delivered"] as const;

function OrdersPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const filtered = useMemo(
    () => seed.filter((o) => (status === "All" || o.status === status) && (o.id.includes(q) || o.customer.toLowerCase().includes(q.toLowerCase()) || o.product.toLowerCase().includes(q.toLowerCase()))),
    [q, status],
  );

  return (
    <AppShell title="Orders" subtitle={`${seed.length} orders · live tracking enabled`}>
      <PageToolbar>
        <div className="flex items-center gap-2 px-3 h-10 rounded-sm border border-[color:var(--color-border)] bg-[color:var(--emerald-forest)]/40 w-80">
          <Search size={14} className="text-foreground/50" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search order, customer, product…" className="bg-transparent outline-none text-sm flex-1" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-10 px-3 rounded-sm border border-[color:var(--color-border)] bg-[color:var(--emerald-forest)]/40 text-sm">
          {["All", "Placed", "Processing", "Dispatched", "Delivered", "Cancelled"].map((s) => <option key={s}>{s}</option>)}
        </select>
      </PageToolbar>

      <div className="space-y-3">
        {filtered.map((o) => {
          const stageIdx = STAGES.indexOf(o.status as typeof STAGES[number]);
          return (
            <div key={o.id} className="glass-card rounded-md p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="font-display text-lg">{o.id}</div>
                    <StatusPill status={o.status} />
                  </div>
                  <div className="text-xs text-foreground/60 mt-1">{o.product} · {o.weight}g · {o.qty} qty · {o.branch}</div>
                  <div className="text-[11px] text-foreground/50 mt-0.5">Customer: {o.customer} · {o.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-xl text-gold">{inr(o.amount)}</div>
                </div>
              </div>
              {o.status !== "Cancelled" && (
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {STAGES.map((s, idx) => (
                    <div key={s}>
                      <div className={`h-1 rounded-full ${idx <= stageIdx ? "bg-[color:var(--color-gold)]" : "bg-[color:var(--color-border)]"}`} />
                      <div className={`text-[10px] uppercase tracking-[0.18em] mt-1.5 ${idx <= stageIdx ? "text-gold" : "text-foreground/50"}`}>{s}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
