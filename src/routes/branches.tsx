import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { StatusPill, PageToolbar } from "@/components/dashboard/widgets";
import { branches as seed, partners, type Branch } from "@/lib/mock/data";
import { Plus, Pencil, Search, X } from "lucide-react";

export const Route = createFileRoute("/branches")({
  head: () => ({ meta: [{ title: "Branches — 2PlusFortuneAliances" }] }),
  component: BranchesPage,
});

function BranchesPage() {
  const [rows, setRows] = useState<Branch[]>(seed);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [editing, setEditing] = useState<Branch | null>(null);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(
    () => rows.filter((r) =>
      (status === "All" || r.status === status) &&
      (r.name.toLowerCase().includes(q.toLowerCase()) || r.city.toLowerCase().includes(q.toLowerCase()) || r.id.includes(q)),
    ),
    [rows, q, status],
  );

  const save = (b: Branch) => {
    setRows((prev) => prev.find((x) => x.id === b.id) ? prev.map((x) => (x.id === b.id ? b : x)) : [b, ...prev]);
    setOpen(false); setEditing(null);
  };

  return (
    <AppShell title="Branches" subtitle="Last-mile branches operating across the network">
      <PageToolbar>
        <div className="flex items-center gap-2 px-3 h-10 rounded-sm border border-[color:var(--color-border)] bg-[color:var(--emerald-forest)]/40 w-72">
          <Search size={14} className="text-foreground/50" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, city, ID…" className="bg-transparent outline-none text-sm flex-1" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-10 px-3 rounded-sm border border-[color:var(--color-border)] bg-[color:var(--emerald-forest)]/40 text-sm">
          {["All", "Live", "Setup", "Paused"].map((r) => <option key={r}>{r}</option>)}
        </select>
        <div className="flex-1" />
        <button onClick={() => { setEditing(null); setOpen(true); }} className="btn-gold h-10 px-4 rounded-sm text-xs uppercase tracking-[0.18em] font-semibold inline-flex items-center gap-2">
          <Plus size={14} /> Create Branch
        </button>
      </PageToolbar>

      <div className="glass-card rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[color:var(--emerald-forest)]/60 text-[10px] uppercase tracking-[0.22em] text-foreground/65">
            <tr>
              <th className="text-left px-4 py-3">Branch</th>
              <th className="text-left px-4 py-3">Partner</th>
              <th className="text-left px-4 py-3">Location</th>
              <th className="text-left px-4 py-3">Manager</th>
              <th className="text-right px-4 py-3">Orders</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[color:var(--color-border)]">
            {filtered.map((b) => (
              <tr key={b.id} className="hover:bg-white/[0.02]">
                <td className="px-4 py-3"><div>{b.name}</div><div className="text-[10px] text-foreground/55">{b.id}</div></td>
                <td className="px-4 py-3">{b.partner}</td>
                <td className="px-4 py-3">{b.city}, {b.state}</td>
                <td className="px-4 py-3">{b.manager}</td>
                <td className="px-4 py-3 text-right text-gold">{b.orders.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3"><StatusPill status={b.status} /></td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => { setEditing(b); setOpen(true); }} className="text-gold/80 hover:text-gold inline-flex items-center gap-1 text-xs"><Pencil size={12} /> Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && <BranchDialog initial={editing} onSave={save} onClose={() => { setOpen(false); setEditing(null); }} />}
    </AppShell>
  );
}

function BranchDialog({ initial, onSave, onClose }: { initial: Branch | null; onSave: (b: Branch) => void; onClose: () => void }) {
  const [form, setForm] = useState<Branch>(
    initial ?? { id: `B-${Math.floor(50000 + Math.random() * 9999)}`, name: "", partner: partners[0].name, city: "", state: "", manager: "", orders: 0, status: "Setup" },
  );
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4">
      <div className="glass-card rounded-md w-full max-w-lg p-6 bg-[color:var(--emerald-forest)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-2xl">{initial ? "Edit Branch" : "Create Branch"}</h3>
          <button onClick={onClose} className="text-foreground/60 hover:text-foreground"><X size={18} /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="grid grid-cols-2 gap-3">
          <Field label="Branch Name" full><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={i} /></Field>
          <Field label="Partner" full>
            <select value={form.partner} onChange={(e) => setForm({ ...form, partner: e.target.value })} className={i}>
              {partners.map((p) => <option key={p.id}>{p.name}</option>)}
            </select>
          </Field>
          <Field label="City"><input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={i} /></Field>
          <Field label="State"><input required value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className={i} /></Field>
          <Field label="Branch Manager" full><input value={form.manager} onChange={(e) => setForm({ ...form, manager: e.target.value })} className={i} /></Field>
          <Field label="Status">
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Branch["status"] })} className={i}>
              {["Live", "Setup", "Paused"].map((r) => <option key={r}>{r}</option>)}
            </select>
          </Field>
          <Field label="Orders"><input type="number" value={form.orders} onChange={(e) => setForm({ ...form, orders: +e.target.value })} className={i} /></Field>
          <div className="col-span-2 flex justify-end gap-2 mt-2">
            <button type="button" onClick={onClose} className="h-10 px-4 rounded-sm text-xs uppercase tracking-[0.18em] border border-[color:var(--color-border)]">Cancel</button>
            <button type="submit" className="btn-gold h-10 px-4 rounded-sm text-xs uppercase tracking-[0.18em] font-semibold">{initial ? "Save Changes" : "Create"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const i = "w-full h-10 px-3 rounded-sm bg-[color:var(--emerald-deep)] border border-[color:var(--color-border)] outline-none focus:border-[color:var(--color-gold)]/70 text-sm";
function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return <label className={`block ${full ? "col-span-2" : ""}`}><span className="text-[10px] uppercase tracking-[0.22em] text-foreground/65">{label}</span><div className="mt-1.5">{children}</div></label>;
}
