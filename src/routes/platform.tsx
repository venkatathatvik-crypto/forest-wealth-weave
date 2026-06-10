import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardPreview } from "@/components/site/DashboardPreview";
import { Box, Coins, FileCheck2, LayoutDashboard, Users2, Workflow } from "lucide-react";

export const Route = createFileRoute("/platform")({
  head: () => ({
    meta: [
      { title: "Platform — 2PlusFortuneAliances Distribution OS" },
      { name: "description", content: "Distribution OS, Gold EMI module, partner console and analytics suite — the 2PlusFortuneAliances institutional commerce platform." },
      { property: "og:title", content: "Platform — 2PlusFortuneAliances Distribution OS" },
      { property: "og:description", content: "Distribution OS, Gold EMI module, partner console and analytics suite — the 2PlusFortuneAliances institutional commerce platform." },
    ],
  }),
  component: PlatformPage,
});

const modules = [
  { icon: LayoutDashboard, title: "Distribution OS", body: "Order, inventory, settlement and reconciliation across every tier of the network." },
  { icon: Coins, title: "Gold EMI Module", body: "Pre-integrated Gold-backed EMI rails, issued in partnership with regulated NBFCs and banks." },
  { icon: Users2, title: "Partner Console", body: "Onboarding, commercials, SLAs and revenue attribution for institutional partners." },
  { icon: Box, title: "Branch Toolkit", body: "Offline-tolerant field workflows, KYC orchestration and device management." },
  { icon: Workflow, title: "Workflow Studio", body: "Configure approval ladders, exception handling and policy enforcement without code." },
  { icon: FileCheck2, title: "Audit & Compliance", body: "Cryptographic transaction lineage with regulator-ready export pipelines." },
];

function PlatformPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-12">
        <div className="text-[10px] uppercase tracking-[0.3em] text-gold">The Platform</div>
        <h1 className="font-display text-5xl lg:text-7xl mt-5 max-w-4xl leading-[1.05]">
          One operating layer for <span className="text-gradient-gold">India's distribution economy</span>.
        </h1>
        <p className="mt-7 max-w-3xl text-lg text-foreground/75 leading-relaxed">
          2PlusFortuneAliances is a modular, institutional-grade platform. Deploy individual modules or
          operate the full stack — every layer is audited, observable and ready for regulated scale.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-20 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {modules.map(({ icon: Icon, title, body }) => (
          <div key={title} className="glass-card rounded-md p-7">
            <Icon className="text-gold" size={22} />
            <h3 className="font-display text-2xl mt-5">{title}</h3>
            <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{body}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-24 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
        <DashboardPreview />
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Operator Console</div>
          <h2 className="font-display text-4xl lg:text-5xl mt-4 leading-tight">
            Boardroom-grade telemetry, across every branch.
          </h2>
          <p className="mt-5 text-foreground/75 leading-relaxed">
            The 2PlusFortuneAliances console unifies GMV, settlement, partner performance and risk metrics
            into a single, defensible view of the network.
          </p>
          <Link to="/contact" className="btn-gold inline-flex mt-7 rounded-sm px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em]">
            Request Console Walkthrough
          </Link>
        </div>
      </section>
    </>
  );
}