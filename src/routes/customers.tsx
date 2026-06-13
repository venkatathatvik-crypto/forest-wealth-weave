import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { StatusPill, PageToolbar } from "@/components/dashboard/widgets";
import { customers as seed, type Customer } from "@/lib/mock/data";
import { Plus, Search, X } from "lucide-react";

export const Route = createFileRoute("/customers")({
  head: () => ({ meta: [{ title: "Customers — 2PlusFortuneAliances" }] }),
  component: CustomersPage,
});

function CustomersPage() {
  const [rows, setRows] = useState<Customer[]>(seed);
  const [q, setQ] = useState("");
  const [kyc, setKyc] = useState("All");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(
    () => rows.filter((r) =>
      (kyc === "All" || r.kyc === kyc) &&
      (r.name.toLowerCase().includes(q.toLowerCase()) || r.phone.includes(q) || r.id.includes(q)),
    ),
    [rows, q, kyc],
  );

  return (
    <AppShell title="Customers" subtitle={`${rows.length.toLocaleString("en-IN")} customers in the active book`}>
      <PageToolbar>
        <div className="flex items-center gap-2 px-3 h-10 rounded-sm border border-[color:var(--color-border)] bg-[color:var(--emerald-forest)]/40 w-80">
          <Search size={14} className="text-foreground/50" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, phone or ID…" className="bg-transparent outline-none text-sm flex-1" />
        </div>
        <select value={kyc} onChange={(e) => setKyc(e.target.value)} className="h-10 px-3 rounded-sm border border-[color:var(--color-border)] bg-[color:var(--emerald-forest)]/40 text-sm">
          {["All", "Verified", "Pending", "Rejected"].map((s) => <option key={s}>{s}</option>)}
        </select>
        <div className="flex-1" />
        <button onClick={() => setOpen(true)} className="btn-gold h-10 px-4 rounded-sm text-xs uppercase tracking-[0.18em] font-semibold inline-flex items-center gap-2">
          <Plus size={14} /> Create Customer
        </button>
      </PageToolbar>

      <div className="glass-card rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[color:var(--emerald-forest)]/60 text-[10px] uppercase tracking-[0.22em] text-foreground/65">
            <tr>
              <th className="text-left px-4 py-3">Customer</th>
              <th className="text-left px-4 py-3">Phone</th>
              <th className="text-left px-4 py-3">City</th>
              <th className="text-left px-4 py-3">Branch</th>
              <th className="text-right px-4 py-3">Gold (g)</th>
              <th className="text-left px-4 py-3">KYC</th>
              <th className="text-left px-4 py-3">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[color:var(--color-border)]">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-white/[0.02]">
                <td className="px-4 py-3"><div>{c.name}</div><div className="text-[10px] text-foreground/55">{c.id}</div></td>
                <td className="px-4 py-3">{c.phone}</td>
                <td className="px-4 py-3">{c.city}</td>
                <td className="px-4 py-3">{c.branch}</td>
                <td className="px-4 py-3 text-right text-gold">{c.gold.toFixed(1)}</td>
                <td className="px-4 py-3"><StatusPill status={c.kyc} /></td>
                <td className="px-4 py-3 text-foreground/70">{c.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && <CustomerDialog onSave={(c) => { setRows([c, ...rows]); setOpen(false); }} onClose={() => setOpen(false)} />}
    </AppShell>
  );
}

function CustomerDialog({ onSave, onClose }: { onSave: (c: Customer) => void; onClose: () => void }) {
  const [form, setForm] = useState<Customer>({
    id: `C-${Math.floor(90000 + Math.random() * 9999)}`,
    name: "", phone: "", city: "", kyc: "Pending", branch: "B-50211", gold: 0, joined: new Date().toISOString().slice(0, 10),
  });
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4">
      <div className="glass-card rounded-md w-full max-w-lg p-6 bg-[color:var(--emerald-forest)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-2xl">Create Customer</h3>
          <button onClick={onClose} className="text-foreground/60 hover:text-foreground"><X size={18} /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="grid grid-cols-2 gap-3">
          <Field label="Full Name" full><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={i} /></Field>
          <Field label="Phone"><input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={i} /></Field>
          <Field label="City"><input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={i} /></Field>
          <Field label="Branch"><input value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })} className={i} /></Field>
          <Field label="KYC">
            <select value={form.kyc} onChange={(e) => setForm({ ...form, kyc: e.target.value as Customer["kyc"] })} className={i}>
              {["Verified", "Pending", "Rejected"].map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <div className="col-span-2 flex justify-end gap-2 mt-2">
            <button type="button" onClick={onClose} className="h-10 px-4 rounded-sm text-xs uppercase tracking-[0.18em] border border-[color:var(--color-border)]">Cancel</button>
            <button type="submit" className="btn-gold h-10 px-4 rounded-sm text-xs uppercase tracking-[0.18em] font-semibold">Create Customer</button>
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
