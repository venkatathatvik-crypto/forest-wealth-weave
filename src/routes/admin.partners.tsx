import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AppShell } from "@/components/dashboard/AppShell";
import { StatusPill, PageToolbar } from "@/components/dashboard/widgets";
import { Card } from "@/components/ui/card";
import { PartnerDialog } from "@/components/admin/PartnerDialog";
import { listPartners, deactivatePartner, type Partner } from "@/lib/api/admin";
import { Plus, Search } from "lucide-react";

export const Route = createFileRoute("/admin/partners")({
  head: () => ({ meta: [{ title: "Partners — 2PlusFortuneAliances" }] }),
  component: AdminPartnersPage,
});

function AdminPartnersPage() {
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", "partners", q],
    queryFn: () => listPartners({ q: q || undefined, size: 50 }),
  });

  const deactivate = useMutation({
    mutationFn: (id: number) => deactivatePartner(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "partners"] }),
  });

  const rows = data?.items ?? [];

  return (
    <AppShell title="Partners" subtitle="Alliance companies in the distribution network">
      <PageToolbar>
        <div className="flex items-center gap-2 px-3 h-10 rounded-lg border border-border bg-background w-80">
          <Search size={14} className="text-text-secondary" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by partner name…"
            className="bg-transparent outline-none text-sm flex-1"
          />
        </div>
        <div className="flex-1" />
        <button
          onClick={() => setOpen(true)}
          className="h-10 px-4 rounded-lg bg-brand-gold-premium text-brand-green-primary text-xs uppercase tracking-[0.18em] font-semibold inline-flex items-center gap-2 hover:bg-brand-gold-rich transition-colors"
        >
          <Plus size={14} /> Add Partner
        </button>
      </PageToolbar>

      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-brand-green-secondary/20 text-[10px] uppercase tracking-[0.22em] text-text-secondary">
            <tr>
              <th className="text-left px-4 py-3">Partner</th>
              <th className="text-left px-4 py-3">Type</th>
              <th className="text-left px-4 py-3">Contact</th>
              <th className="text-left px-4 py-3">Location</th>
              <th className="text-right px-4 py-3">Branches</th>
              <th className="text-right px-4 py-3">Commission</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading && (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-text-secondary">Loading partners…</td></tr>
            )}
            {isError && (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-red-600">
                {error instanceof Error ? error.message : "Failed to load partners"}
              </td></tr>
            )}
            {!isLoading && !isError && rows.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-text-secondary">No partners yet. Add the first one.</td></tr>
            )}
            {rows.map((p: Partner) => (
              <tr key={p.id} className="hover:bg-bg-section">
                <td className="px-4 py-3">
                  <div>{p.name}</div>
                  <div className="text-[10px] text-text-secondary">{p.registrationNumber ?? "—"}</div>
                </td>
                <td className="px-4 py-3">{p.type}</td>
                <td className="px-4 py-3">
                  <div>{p.contactEmail ?? "—"}</div>
                  <div className="text-[10px] text-text-secondary">{p.contactPhone ?? ""}</div>
                </td>
                <td className="px-4 py-3">{[p.city, p.state].filter(Boolean).join(", ") || "—"}</td>
                <td className="px-4 py-3 text-right">{p.branchCount}</td>
                <td className="px-4 py-3 text-right text-brand-gold-premium">
                  {p.commissionRate != null ? `${p.commissionRate}%` : "—"}
                </td>
                <td className="px-4 py-3"><StatusPill status={p.isActive ? "Active" : "Paused"} /></td>
                <td className="px-4 py-3 text-right">
                  {p.isActive && (
                    <button
                      onClick={() => deactivate.mutate(p.id)}
                      disabled={deactivate.isPending}
                      className="text-xs text-red-600 hover:underline disabled:opacity-50"
                    >
                      Deactivate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {open && (
        <PartnerDialog
          onClose={() => setOpen(false)}
          onCreated={() => {
            setOpen(false);
            qc.invalidateQueries({ queryKey: ["admin", "partners"] });
          }}
        />
      )}
    </AppShell>
  );
}
