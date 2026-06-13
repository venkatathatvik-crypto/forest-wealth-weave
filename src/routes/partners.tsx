import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { StatusPill, PageToolbar } from "@/components/dashboard/widgets";
import { partners as seed, type Partner } from "@/lib/mock/data";
import { Plus, Pencil, Search, X } from "lucide-react";

export const Route = createFileRoute("/partners")({
  head: () => ({ meta: [{ title: "Partners — 2PlusFortuneAliances" }] }),
  component: PartnersPage,
});

function PartnersPage() {
  const [rows, setRows] = useState<Partner[]>(seed);
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("All");
  const [editing, setEditing] = useState<Partner | null>(null);
  const [open, setOpen] = useState(false);

  const regions = ["All", ...Array.from(new Set(rows.map((r) => r.region)))];
  const filtered = useMemo(
    () => rows.filter((r) => (region === "All" || r.region === region) && (r.name.toLowerCase().includes(q.toLowerCase()) || r.id.includes(q))),
    [rows, q, region],
  );

  const save = (p: Partner) => {
    setRows((prev) => {
      const exists = prev.find((x) => x.id === p.id);
      return exists ? prev.map((x) => (x.id === p.id ? p : x)) : [p, ...prev];
    });
    setOpen(false); setEditing(null);
  };

  return (
    <AppShell title="Partners" subtitle="Distribution partners across the Fortune Alliance network">
      <PageToolbar>
        <div className="flex items-center gap-2 px-3 h-10 rounded-sm border border-[color:var(--color-border)] bg-[color:var(--emerald-forest)]/40 w-72">
          <Search size={14} className="text-foreground/50" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search partner or ID…" className="bg-transparent outline-none text-sm flex-1" />
        </div>
        <select value={region} onChange={(e) => setRegion(e.target.value)} className="h-10 px-3 rounded-sm border border-[color:var(--color-border)] bg-[color:var(--emerald-forest)]/40 text-sm">
          {regions.map((r) => <option key={r}>{r}</option>)}
        </select>
        <div className="flex-1" />
        <button onClick={() => { setEditing(null); setOpen(true); }} className="btn-gold h-10 px-4 rounded-sm text-xs uppercase tracking-[0.18em] font-semibold inline-flex items-center gap-2">
          <Plus size={14} /> Create Partner
        </button>
      </PageToolbar>

      <div className="glass-card rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[color:var(--emerald-forest)]/60 text-[10px] uppercase tracking-[0.22em] text-foreground/65">
            <tr>
              <th className="text-left px-4 py-3">Partner</th>
              <th className="text-left px-4 py-3">Region</th>
              <th className="text-right px-4 py-3">Branches</th>
              <th className="text-right px-4 py-3">Customers</th>
              <th className="text-right px-4 py-3">GMV (₹ Cr)</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[color:var(--color-border)]">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-white/[0.02]">
                <td className="px-4 py-3"><div>{p.name}</div><div className="text-[10px] text-foreground/55">{p.id} · {p.contact}</div></td>
                <td className="px-4 py-3">{p.region}</td>
                <td className="px-4 py-3 text-right">{p.branches}</td>
                <td className="px-4 py-3 text-right">{p.customers.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3 text-right text-gold">{p.gmv.toFixed(1)}</td>
                <td className="px-4 py-3"><StatusPill status={p.status} /></td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => { setEditing(p); setOpen(true); }} className="text-gold/80 hover:text-gold inline-flex items-center gap-1 text-xs"><Pencil size={12} /> Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && <PartnerDialog initial={editing} onSave={save} onClose={() => { setOpen(false); setEditing(null); }} />}
    </AppShell>
  );
}

function PartnerDialog({ initial, onSave, onClose }: { initial: Partner | null; onSave: (p: Partner) => void; onClose: () => void }) {
  const [form, setForm] = useState<Partner>(
    initial ?? { id: `P-${Math.floor(1000 + Math.random() * 9000)}`, name: "", region: "West", branches: 0, customers: 0, gmv: 0, status: "Onboarding", contact: "", joined: new Date().toISOString().slice(0, 10) },
  );
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4">
      <div className="glass-card rounded-md w-full max-w-lg p-6 bg-[color:var(--emerald-forest)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-2xl">{initial ? "Edit Partner" : "Create Partner"}</h3>
          <button onClick={onClose} className="text-foreground/60 hover:text-foreground"><X size={18} /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="grid grid-cols-2 gap-3">
          <Field label="Partner Name" full><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} /></Field>
          <Field label="Region">
            <select value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} className={inputCls}>
              {["West", "North", "South", "East", "Central", "North-East"].map((r) => <option key={r}>{r}</option>)}
            </select>
          </Field>
          <Field label="Status">
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Partner["status"] })} className={inputCls}>
              {["Active", "Onboarding", "Paused"].map((r) => <option key={r}>{r}</option>)}
            </select>
          </Field>
          <Field label="Contact Email" full><input required type="email" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className={inputCls} /></Field>
          <Field label="Branches"><input type="number" value={form.branches} onChange={(e) => setForm({ ...form, branches: +e.target.value })} className={inputCls} /></Field>
          <Field label="GMV (₹ Cr)"><input type="number" step="0.1" value={form.gmv} onChange={(e) => setForm({ ...form, gmv: +e.target.value })} className={inputCls} /></Field>
          <div className="col-span-2 flex justify-end gap-2 mt-2">
            <button type="button" onClick={onClose} className="h-10 px-4 rounded-sm text-xs uppercase tracking-[0.18em] border border-[color:var(--color-border)]">Cancel</button>
            <button type="submit" className="btn-gold h-10 px-4 rounded-sm text-xs uppercase tracking-[0.18em] font-semibold">{initial ? "Save Changes" : "Create"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputCls = "w-full h-10 px-3 rounded-sm bg-[color:var(--emerald-deep)] border border-[color:var(--color-border)] outline-none focus:border-[color:var(--color-gold)]/70 text-sm";
function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`block ${full ? "col-span-2" : ""}`}>
      <span className="text-[10px] uppercase tracking-[0.22em] text-foreground/65">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
