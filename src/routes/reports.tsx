import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { orders, partners, inr } from "@/lib/mock/data";
import { Download, FileSpreadsheet, FileText } from "lucide-react";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports — 2PlusFortuneAliances" }] }),
  component: ReportsPage,
});

function ReportsPage() {
  const [range, setRange] = useState("Last 30 days");
  const total = orders.reduce((s, o) => s + o.amount, 0);

  const downloadCsv = () => {
    const headers = ["Order ID", "Customer", "Branch", "Product", "Qty", "Weight (g)", "Amount", "Status", "Date"];
    const rows = orders.map((o) => [o.id, o.customer, o.branch, o.product, o.qty, o.weight, o.amount, o.status, o.date]);
    const csv = [headers, ...rows].map((r) => r.map((x) => `"${String(x).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `sales-report-${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPdf = () => {
    const html = `<!doctype html><html><head><meta charset='utf-8'><title>2PlusFortuneAliances · Sales Report</title>
      <style>body{font-family:Georgia,serif;padding:48px;color:#0B3D2E}h1{color:#0B3D2E;border-bottom:2px solid #D4AF37;padding-bottom:8px}
      table{width:100%;border-collapse:collapse;margin-top:20px;font-size:12px}th,td{padding:8px;border-bottom:1px solid #ccc;text-align:left}
      th{background:#0B3D2E;color:#D4AF37}.gold{color:#8C6B1F;font-weight:bold}</style></head><body>
      <h1>2PlusFortuneAliances · Sales Report</h1><p>Period: ${range} · Generated ${new Date().toLocaleString("en-IN")}</p>
      <p>Total GMV: <span class='gold'>${inr(total)}</span> · Orders: ${orders.length}</p>
      <table><thead><tr><th>Order</th><th>Customer</th><th>Product</th><th>Branch</th><th>Amount</th><th>Status</th></tr></thead>
      <tbody>${orders.map((o) => `<tr><td>${o.id}</td><td>${o.customer}</td><td>${o.product}</td><td>${o.branch}</td><td class='gold'>${inr(o.amount)}</td><td>${o.status}</td></tr>`).join("")}</tbody></table>
      <script>window.onload=()=>window.print()</script></body></html>`;
    const w = window.open("", "_blank"); if (w) { w.document.write(html); w.document.close(); }
  };

  const reports = [
    { name: "Sales Report", desc: "Order-level GMV across the network", icon: FileSpreadsheet },
    { name: "Partner Settlement", desc: "Commercials, holdbacks, payouts", icon: FileText },
    { name: "Branch Daybook", desc: "Per-branch reconciliation", icon: FileSpreadsheet },
    { name: "Customer Ledger", desc: "Gold accumulation & redemptions", icon: FileText },
    { name: "Gold EMI Book", desc: "Disbursals, repayments, NPAs", icon: FileSpreadsheet },
    { name: "Regulatory Pack", desc: "RBI, GST and audit exports", icon: FileText },
  ];

  return (
    <AppShell title="Reports" subtitle="Institutional reporting · downloadable artifacts">
      <div className="glass-card rounded-md p-6 mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.28em] text-gold/80">Active Report</div>
          <h2 className="font-display text-2xl mt-1">Sales Report</h2>
          <p className="text-sm text-foreground/65 mt-1">Period · {range} · {orders.length} orders · {inr(total)} GMV</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={range} onChange={(e) => setRange(e.target.value)} className="h-10 px-3 rounded-sm border border-[color:var(--color-border)] bg-[color:var(--emerald-forest)]/40 text-sm">
            {["Today", "Last 7 days", "Last 30 days", "Quarter to date", "Year to date"].map((s) => <option key={s}>{s}</option>)}
          </select>
          <button onClick={downloadCsv} className="h-10 px-4 rounded-sm text-xs uppercase tracking-[0.18em] border border-[color:var(--color-border)] hover:border-[color:var(--color-gold)]/60 inline-flex items-center gap-2">
            <Download size={14} /> Excel (CSV)
          </button>
          <button onClick={downloadPdf} className="btn-gold h-10 px-4 rounded-sm text-xs uppercase tracking-[0.18em] font-semibold inline-flex items-center gap-2">
            <Download size={14} /> PDF
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="glass-card rounded-md p-6">
          <div className="text-[10px] uppercase tracking-[0.28em] text-gold/80">GMV by Partner</div>
          <div className="mt-4 space-y-3">
            {partners.map((p) => (
              <div key={p.id}>
                <div className="flex justify-between text-sm"><span>{p.name}</span><span className="text-gold">₹ {p.gmv.toFixed(1)} Cr</span></div>
                <div className="h-1 rounded-full bg-[color:var(--color-border)] mt-1.5 overflow-hidden">
                  <div className="h-full bg-[color:var(--color-gold)]" style={{ width: `${(p.gmv / 265) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-md p-6">
          <div className="text-[10px] uppercase tracking-[0.28em] text-gold/80">Available Reports</div>
          <div className="mt-3 divide-y divide-[color:var(--color-border)]">
            {reports.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.name} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 grid place-items-center rounded-sm bg-[color:var(--color-gold)]/10 text-gold"><Icon size={15} /></div>
                    <div>
                      <div className="text-sm">{r.name}</div>
                      <div className="text-[11px] text-foreground/55">{r.desc}</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={downloadCsv} className="h-8 px-2 text-[10px] uppercase tracking-[0.18em] rounded-sm border border-[color:var(--color-border)] hover:border-[color:var(--color-gold)]/60">CSV</button>
                    <button onClick={downloadPdf} className="h-8 px-2 text-[10px] uppercase tracking-[0.18em] rounded-sm border border-[color:var(--color-border)] hover:border-[color:var(--color-gold)]/60">PDF</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
