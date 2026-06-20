import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AppShell } from "@/components/dashboard/AppShell";
import { StatusPill, PageToolbar } from "@/components/dashboard/widgets";
import { Card } from "@/components/ui/card";
import { useAuth, backendRoleToMockRole } from "@/lib/mock/auth";
import {
  adminListBranches, adminUpdateBranch, adminDeactivateBranch, adminSyncBranchAugmont,
  partnerListBranches, partnerCreateBranch, partnerUpdateBranch, partnerDeactivateBranch,
  partnerCreateBranchManager,
  type Branch, type CreateBranchInput, type BranchManagerInput,
} from "@/lib/api/branches";
import { Plus, Pencil, Search, X, UserPlus } from "lucide-react";

export const Route = createFileRoute("/branches")({
  head: () => ({ meta: [{ title: "Branches — 2PlusFortuneAliances" }] }),
  component: BranchesPage,
});

function BranchesPage() {
  const { user } = useAuth();
  const isPartner = backendRoleToMockRole(user?.role) === "partner";
  const isAdmin = backendRoleToMockRole(user?.role) === "admin";
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<Branch | null>(null);
  const [creating, setCreating] = useState(false);
  const [managerFor, setManagerFor] = useState<Branch | null>(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["branches", isPartner ? "partner" : "admin", q],
    queryFn: () =>
      isPartner
        ? partnerListBranches({ q: q || undefined })
        : adminListBranches({ q: q || undefined }),
  });
  const rows = data?.items ?? [];
  const refresh = () => qc.invalidateQueries({ queryKey: ["branches"] });

  const deactivate = useMutation({
    mutationFn: (id: number) => (isPartner ? partnerDeactivateBranch(id) : adminDeactivateBranch(id)),
    onSuccess: refresh,
  });
  const sync = useMutation({
    mutationFn: (id: number) => adminSyncBranchAugmont(id),
    onSuccess: refresh,
  });

  return (
    <AppShell title="Branches" subtitle={isPartner ? "Your alliance's branches" : "All branches across the network"}>
      <PageToolbar>
        <div className="flex items-center gap-2 px-3 h-10 rounded-lg border border-border bg-background w-80">
          <Search size={14} className="text-text-secondary" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or city…" className="bg-transparent outline-none text-sm flex-1" />
        </div>
        <div className="flex-1" />
        {/* Create is a PARTNER action only — admin oversees but does not create. */}
        {isPartner && (
          <button
            onClick={() => setCreating(true)}
            className="h-10 px-4 rounded-lg bg-brand-gold-premium text-brand-green-primary text-xs uppercase tracking-[0.18em] font-semibold inline-flex items-center gap-2 hover:bg-brand-gold-rich transition-colors"
          >
            <Plus size={14} /> Create Branch
          </button>
        )}
      </PageToolbar>

      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-brand-green-secondary/20 text-[10px] uppercase tracking-[0.22em] text-text-secondary">
            <tr>
              <th className="text-left px-4 py-3">Branch</th>
              {isAdmin && <th className="text-left px-4 py-3">Partner</th>}
              <th className="text-left px-4 py-3">Location</th>
              <th className="text-left px-4 py-3">Contact</th>
              <th className="text-left px-4 py-3">Augmont</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading && <tr><td colSpan={7} className="px-4 py-8 text-center text-text-secondary">Loading branches…</td></tr>}
            {isError && <tr><td colSpan={7} className="px-4 py-8 text-center text-red-600">{error instanceof Error ? error.message : "Failed to load"}</td></tr>}
            {!isLoading && !isError && rows.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-text-secondary">
                {isPartner ? "No branches yet. Create your first one." : "No branches in the network."}
              </td></tr>
            )}
            {rows.map((b) => (
              <tr key={b.id} className="hover:bg-bg-section">
                <td className="px-4 py-3"><div>{b.name}</div><div className="text-[10px] text-text-secondary">{b.code ?? ""}</div></td>
                {isAdmin && <td className="px-4 py-3">{b.allianceCompanyName ?? "—"}</td>}
                <td className="px-4 py-3">{[b.city, b.state].filter(Boolean).join(", ") || "—"}</td>
                <td className="px-4 py-3">
                  <div>{b.contactEmail ?? "—"}</div>
                  <div className="text-[10px] text-text-secondary">{b.contactPhone ?? ""}</div>
                </td>
                <td className="px-4 py-3">
                  {b.syncedToAugmont
                    ? <span className="text-[10px] text-green-700">store #{b.augmontStoreId}</span>
                    : <span className="text-[10px] text-text-secondary/60">not synced</span>}
                </td>
                <td className="px-4 py-3"><StatusPill status={b.isActive ? "Active" : "Paused"} /></td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <button onClick={() => setEditing(b)} className="text-gold/90 hover:text-gold inline-flex items-center gap-1 text-xs text-brand-gold-premium"><Pencil size={12} /> Edit</button>
                  {isPartner && b.isActive && (
                    <button onClick={() => setManagerFor(b)} className="ml-3 text-xs text-brand-green-primary hover:underline inline-flex items-center gap-1"><UserPlus size={12} /> Add Manager</button>
                  )}
                  {isAdmin && !b.syncedToAugmont && (
                    <button onClick={() => sync.mutate(b.id)} disabled={sync.isPending} className="ml-3 text-xs text-brand-green-primary hover:underline disabled:opacity-50">Sync</button>
                  )}
                  {b.isActive && (
                    <button onClick={() => deactivate.mutate(b.id)} disabled={deactivate.isPending} className="ml-3 text-xs text-red-600 hover:underline disabled:opacity-50">Deactivate</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {(creating || editing) && (
        <BranchDialog
          isPartner={isPartner}
          initial={editing}
          onClose={() => { setCreating(false); setEditing(null); }}
          onSaved={() => { setCreating(false); setEditing(null); refresh(); }}
        />
      )}

      {managerFor && (
        <ManagerDialog
          branch={managerFor}
          onClose={() => setManagerFor(null)}
          onSaved={() => { setManagerFor(null); refresh(); }}
        />
      )}
    </AppShell>
  );
}

const i = "w-full h-10 px-3 rounded-lg bg-background border border-border outline-none focus:border-brand-gold-premium text-sm";

function BranchDialog({ isPartner, initial, onClose, onSaved }: {
  isPartner: boolean;
  initial: Branch | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<CreateBranchInput>({
    name: initial?.name ?? "",
    code: initial?.code ?? "",
    contactEmail: initial?.contactEmail ?? "",
    contactPhone: initial?.contactPhone ?? "",
    city: initial?.city ?? "",
    state: initial?.state ?? "",
    pincode: initial?.pincode ?? "",
    commissionRate: initial?.commissionRate ?? undefined,
  });
  const [err, setErr] = useState("");

  const save = useMutation({
    mutationFn: () => {
      const body: CreateBranchInput = {
        ...form,
        code: form.code || undefined,
        contactEmail: form.contactEmail || undefined,
        contactPhone: form.contactPhone || undefined,
        city: form.city || undefined,
        state: form.state || undefined,
        pincode: form.pincode || undefined,
      };
      if (initial) {
        return isPartner ? partnerUpdateBranch(initial.id, body) : adminUpdateBranch(initial.id, body);
      }
      // Create is partner-only (admin has no create button).
      return partnerCreateBranch(body);
    },
    onSuccess: onSaved,
    onError: (e) => setErr(e instanceof Error ? e.message : "Failed to save branch"),
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4 overflow-y-auto">
      <Card className="w-full max-w-lg p-6 bg-background my-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-2xl text-brand-green-primary">{initial ? "Edit Branch" : "Create Branch"}</h3>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary"><X size={18} /></button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setErr("");
            if (!form.name.trim()) {
              setErr("Branch name is required");
              return;
            }
            save.mutate();
          }}
          className="grid grid-cols-2 gap-3"
        >
          <Field label="Branch Name" full><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={i} /></Field>
          <Field label="Code"><input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className={i} /></Field>
          <Field label="Commission %"><input type="number" step="0.01" min="0" max="100" value={form.commissionRate ?? ""} onChange={(e) => setForm({ ...form, commissionRate: e.target.value === "" ? undefined : Number(e.target.value) })} className={i} /></Field>
          <Field label="Contact Email"><input type="email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} className={i} /></Field>
          <Field label="Contact Phone"><input value={form.contactPhone} onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} className={i} /></Field>
          <Field label="City"><input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={i} /></Field>
          <Field label="State"><input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className={i} /></Field>
          <Field label="Pincode"><input value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} className={i} /></Field>

          {err && <div className="col-span-2 text-[12px] text-red-600 bg-red-50 border border-red-200 rounded-lg py-2 px-3 whitespace-pre-line">{err}</div>}

          <div className="col-span-2 flex justify-end gap-2 mt-2">
            <button type="button" onClick={onClose} className="h-10 px-4 rounded-lg text-xs uppercase tracking-[0.18em] border border-border">Cancel</button>
            <button type="submit" disabled={save.isPending} className="h-10 px-4 rounded-lg bg-brand-gold-premium text-brand-green-primary text-xs uppercase tracking-[0.18em] font-semibold hover:bg-brand-gold-rich transition-colors disabled:opacity-60">
              {save.isPending ? "Saving…" : initial ? "Save Changes" : "Create"}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

function ManagerDialog({ branch, onClose, onSaved }: { branch: Branch; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState<BranchManagerInput>({ firstName: "", lastName: "", email: "", mobile: "" });
  const [err, setErr] = useState("");

  const save = useMutation({
    mutationFn: () => partnerCreateBranchManager(branch.id, {
      ...form,
      lastName: form.lastName || undefined,
    }),
    onSuccess: onSaved,
    onError: (e) => setErr(e instanceof Error ? e.message : "Failed to invite manager"),
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4 overflow-y-auto">
      <Card className="w-full max-w-md p-6 bg-background my-8">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-display text-2xl text-brand-green-primary">Add Branch Manager</h3>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary"><X size={18} /></button>
        </div>
        <p className="text-xs text-text-secondary mb-4">
          Invites a manager login for <span className="font-semibold text-brand-green-primary">{branch.name}</span>.
          A secure link is emailed for them to set their own password — no password is sent.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setErr("");
            if (!form.firstName.trim() || !form.email.trim() || !form.mobile.trim()) {
              setErr("First name, email, and mobile are required");
              return;
            }
            save.mutate();
          }}
          className="grid grid-cols-2 gap-3"
        >
          <Field label="First Name"><input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className={i} /></Field>
          <Field label="Last Name"><input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className={i} /></Field>
          <Field label="Email" full><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={i} /></Field>
          <Field label="Mobile" full><input value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className={i} placeholder="10-digit, starts 6-9" /></Field>

          {err && <div className="col-span-2 text-[12px] text-red-600 bg-red-50 border border-red-200 rounded-lg py-2 px-3 whitespace-pre-line">{err}</div>}

          <div className="col-span-2 flex justify-end gap-2 mt-2">
            <button type="button" onClick={onClose} className="h-10 px-4 rounded-lg text-xs uppercase tracking-[0.18em] border border-border">Cancel</button>
            <button type="submit" disabled={save.isPending} className="h-10 px-4 rounded-lg bg-brand-gold-premium text-brand-green-primary text-xs uppercase tracking-[0.18em] font-semibold hover:bg-brand-gold-rich transition-colors disabled:opacity-60">
              {save.isPending ? "Inviting…" : "Invite & Send Link"}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return <label className={`block ${full ? "col-span-2" : ""}`}><span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary">{label}</span><div className="mt-1.5">{children}</div></label>;
}
