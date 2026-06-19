import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AppShell } from "@/components/dashboard/AppShell";
import { PageToolbar } from "@/components/dashboard/widgets";
import { Card } from "@/components/ui/card";
import { PartnerDialog } from "@/components/admin/PartnerDialog";
import {
  listLeads, updateLeadStatus, type PartnerLead, type LeadStatus,
} from "@/lib/api/admin";
import { Search, X } from "lucide-react";

export const Route = createFileRoute("/admin/leads")({
  head: () => ({ meta: [{ title: "Partner Leads — 2PlusFortuneAliances" }] }),
  component: AdminLeadsPage,
});

const TABS: { key: "ALL" | LeadStatus; label: string }[] = [
  { key: "ALL", label: "All" },
  { key: "NEW", label: "New" },
  { key: "CONTACTED", label: "Contacted" },
  { key: "CONVERTED", label: "Converted" },
  { key: "REJECTED", label: "Rejected" },
];

const STATUS_STYLE: Record<LeadStatus, string> = {
  NEW: "bg-brand-gold-premium/15 text-brand-gold-premium",
  CONTACTED: "bg-blue-100 text-blue-700",
  CONVERTED: "bg-green-100 text-green-700",
  REJECTED: "bg-gray-200 text-gray-600",
};

function LeadPill({ status }: { status: LeadStatus }) {
  return (
    <span className={`px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] font-medium rounded-full ${STATUS_STYLE[status]}`}>
      {status}
    </span>
  );
}

function timeAgo(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso).getTime();
  const mins = Math.floor((Date.now() - d) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function AdminLeadsPage() {
  const qc = useQueryClient();
  const [tab, setTab] = useState<"ALL" | LeadStatus>("NEW");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<PartnerLead | null>(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", "leads", tab, q],
    queryFn: () => listLeads({ q: q || undefined, status: tab === "ALL" ? undefined : tab, size: 100 }),
  });

  const rows = data?.items ?? [];
  const refresh = () => {
    qc.invalidateQueries({ queryKey: ["admin", "leads"] });
    qc.invalidateQueries({ queryKey: ["admin", "leads-new-count"] });
  };

  return (
    <AppShell title="Partner Leads" subtitle="Onboarding enquiries from the public site">
      <PageToolbar>
        <div className="flex items-center gap-2 px-3 h-10 rounded-lg border border-border bg-background w-80">
          <Search size={14} className="text-text-secondary" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search company, contact or email…"
            className="bg-transparent outline-none text-sm flex-1"
          />
        </div>
      </PageToolbar>

      {/* Status tabs */}
      <div className="flex gap-1 mb-4 p-1 rounded-lg bg-bg-section border border-border w-fit">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`h-8 px-4 rounded-md text-[11px] uppercase tracking-[0.16em] font-semibold transition-colors ${
              tab === t.key ? "bg-brand-green-primary text-white" : "text-text-secondary hover:text-brand-green-primary"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-brand-green-secondary/20 text-[10px] uppercase tracking-[0.22em] text-text-secondary">
            <tr>
              <th className="text-left px-4 py-3">Company</th>
              <th className="text-left px-4 py-3">Contact</th>
              <th className="text-left px-4 py-3">Email / Phone</th>
              <th className="text-left px-4 py-3">Location</th>
              <th className="text-left px-4 py-3">Applied</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading && <tr><td colSpan={7} className="px-4 py-8 text-center text-text-secondary">Loading leads…</td></tr>}
            {isError && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-red-600">
                {error instanceof Error ? error.message : "Failed to load leads"}
              </td></tr>
            )}
            {!isLoading && !isError && rows.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-text-secondary">No leads in this view.</td></tr>
            )}
            {rows.map((l) => (
              <tr key={l.id} className="hover:bg-bg-section cursor-pointer" onClick={() => setSelected(l)}>
                <td className="px-4 py-3">
                  <div>{l.companyName}</div>
                  <div className="text-[10px] text-text-secondary">{l.gst ?? ""}</div>
                </td>
                <td className="px-4 py-3">{l.contactPerson}</td>
                <td className="px-4 py-3">
                  <div>{l.email}</div>
                  <div className="text-[10px] text-text-secondary">{l.phone}</div>
                </td>
                <td className="px-4 py-3">{[l.city, l.state].filter(Boolean).join(", ") || "—"}</td>
                <td className="px-4 py-3 text-text-secondary">{timeAgo(l.createdAt)}</td>
                <td className="px-4 py-3"><LeadPill status={l.status} /></td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelected(l); }}
                    className="text-xs text-brand-gold-premium hover:underline font-semibold"
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {selected && (
        <LeadDrawer
          lead={selected}
          onClose={() => setSelected(null)}
          onChanged={() => { setSelected(null); refresh(); }}
        />
      )}
    </AppShell>
  );
}

function LeadDrawer({ lead, onClose, onChanged }: { lead: PartnerLead; onClose: () => void; onChanged: () => void }) {
  const [notes, setNotes] = useState(lead.notes ?? "");
  const [converting, setConverting] = useState(false);
  const [err, setErr] = useState("");

  const setStatus = useMutation({
    mutationFn: (status: LeadStatus) => updateLeadStatus(lead.id, status, notes || undefined),
    onSuccess: onChanged,
    onError: (e) => setErr(e instanceof Error ? e.message : "Failed to update lead"),
  });

  const isClosed = lead.status === "CONVERTED" || lead.status === "REJECTED";

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
      <Card className="w-full max-w-md h-full p-6 bg-background overflow-y-auto rounded-none">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-display text-2xl text-brand-green-primary">{lead.companyName}</h3>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary"><X size={18} /></button>
        </div>
        <LeadPill status={lead.status} />

        <div className="mt-5 space-y-3 text-sm">
          <Row label="Contact Person" value={lead.contactPerson} />
          <Row label="Email" value={lead.email} />
          <Row label="Phone" value={lead.phone} />
          <Row label="GST" value={lead.gst ?? "—"} />
          <Row label="Location" value={[lead.city, lead.state].filter(Boolean).join(", ") || "—"} />
          <Row label="Applied" value={lead.createdAt ? new Date(lead.createdAt).toLocaleString("en-IN") : "—"} />
          {lead.convertedPartnerId != null && (
            <Row label="Converted → Partner" value={`#${lead.convertedPartnerId}`} />
          )}
        </div>

        <label className="block mt-5">
          <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary">Notes</span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Call outcome, follow-up details…"
            className="mt-1.5 w-full h-24 p-3 rounded-lg bg-background border border-border outline-none focus:border-brand-gold-premium text-sm"
          />
        </label>

        {err && <p className="text-[12px] text-red-600 mt-3 bg-red-50 border border-red-200 rounded-lg py-2 px-3">{err}</p>}

        {!isClosed && (
          <div className="mt-6 space-y-2">
            <button
              onClick={() => setConverting(true)}
              className="w-full h-11 rounded-lg bg-brand-gold-premium text-brand-green-primary text-xs uppercase tracking-[0.2em] font-semibold hover:bg-brand-gold-rich transition-colors"
            >
              ✦ Convert to Partner →
            </button>
            <div className="flex gap-2">
              {lead.status !== "CONTACTED" && (
                <button
                  onClick={() => setStatus.mutate("CONTACTED")}
                  disabled={setStatus.isPending}
                  className="flex-1 h-10 rounded-lg border border-border text-xs uppercase tracking-[0.18em] font-semibold hover:bg-bg-section disabled:opacity-60"
                >
                  Mark Contacted
                </button>
              )}
              <button
                onClick={() => setStatus.mutate("REJECTED")}
                disabled={setStatus.isPending}
                className="flex-1 h-10 rounded-lg border border-red-200 text-red-600 text-xs uppercase tracking-[0.18em] font-semibold hover:bg-red-50 disabled:opacity-60"
              >
                Reject
              </button>
            </div>
            {/* Save notes without changing status */}
            <button
              onClick={() => setStatus.mutate(lead.status)}
              disabled={setStatus.isPending}
              className="w-full h-9 rounded-lg text-[11px] uppercase tracking-[0.18em] text-text-secondary hover:text-brand-green-primary disabled:opacity-60"
            >
              Save notes only
            </button>
          </div>
        )}

        {converting && (
          <PartnerDialog
            prefill={{
              name: lead.companyName,
              registrationNumber: lead.gst ?? "",
              contactEmail: lead.email,
              contactPhone: lead.phone,
              city: lead.city ?? "",
              state: lead.state ?? "",
              contactPersonName: lead.contactPerson,
              loginEmail: lead.email,
            }}
            onClose={() => setConverting(false)}
            onCreated={() => {
              // Partner created → mark this lead converted, then close + refresh.
              setConverting(false);
              setStatus.mutate("CONVERTED");
            }}
          />
        )}
      </Card>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-text-secondary text-[11px] uppercase tracking-[0.18em]">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}
