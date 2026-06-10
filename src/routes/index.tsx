import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Banknote, Network, BarChart3, Building2, Workflow } from "lucide-react";
import { GoldParticles } from "@/components/site/GoldParticles";
import { EcosystemNetwork } from "@/components/site/EcosystemNetwork";
import { DashboardPreview } from "@/components/site/DashboardPreview";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "2PlusFortuneAliances — India's Digital Distribution Backbone" },
      { name: "description", content: "A unified commerce ecosystem connecting manufacturers, financial institutions, partners, branches and customers across India." },
      { property: "og:title", content: "2PlusFortuneAliances — India's Digital Distribution Backbone" },
      { property: "og:description", content: "A unified commerce ecosystem connecting manufacturers, financial institutions, partners, branches and customers across India." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <GoldParticles />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.10),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-16 lg:pt-24 pb-20 lg:pb-32 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center min-h-[88vh]">
          <div>
            <div className="inline-flex items-center gap-3 rounded-sm border border-[color:var(--color-border)] bg-[color:var(--emerald-forest)]/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-gold">
              <span className="h-1 w-1 rounded-full bg-[color:var(--color-gold)]" />
              Enterprise Distribution Platform
            </div>

            <h1 className="mt-7 font-display text-[44px] sm:text-6xl lg:text-7xl leading-[1.02]">
              Building India's <br />
              <span className="text-gradient-gold">Digital Distribution</span> <br />
              Backbone
            </h1>

            <p className="mt-7 max-w-xl text-base lg:text-lg text-foreground/75 leading-relaxed">
              Connecting manufacturers, financial institutions, partners, branches and customers
              through a single, institution-grade commerce ecosystem — engineered for
              Bharat's next decade of growth.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link to="/contact" className="btn-gold inline-flex items-center gap-2 rounded-sm px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.22em]">
                Request Enterprise Demo <ArrowRight size={14} />
              </Link>
              <Link to="/platform" className="btn-ghost-gold rounded-sm px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.22em]">
                Explore the Platform
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-3 max-w-lg gap-6">
              {[
                ["10,000+", "Branches"],
                ["₹1,200 Cr+", "Annual GMV"],
                ["28 States", "Coverage"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="font-display text-2xl lg:text-3xl text-gold">{v}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-foreground/60">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-md bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12),transparent_70%)]" />
            <div className="glass-card relative rounded-md p-6 lg:p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="text-[10px] uppercase tracking-[0.3em] text-gold">The Ecosystem</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-foreground/50">Live Network</div>
              </div>
              <EcosystemNetwork />
            </div>
          </div>
        </div>
        <div className="gold-divider opacity-40" />
      </section>

      {/* TRUST STRIP */}
      <section className="bg-[color:var(--emerald-forest)]/50 border-y border-[color:var(--color-border)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-wrap items-center justify-between gap-6">
          <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/60">
            Trusted by India's Leading Institutions
          </div>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-3 text-sm font-display text-foreground/70">
            <span>State Bank Alliance</span>
            <span className="text-gold/50">·</span>
            <span>HDFC Partner Network</span>
            <span className="text-gold/50">·</span>
            <span>Bajaj Finance</span>
            <span className="text-gold/50">·</span>
            <span>Muthoot Group</span>
            <span className="text-gold/50">·</span>
            <span>ICICI Securities</span>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 mb-14">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Platform Pillars</div>
            <h2 className="font-display text-4xl lg:text-5xl mt-4 leading-tight">
              Institutional infrastructure for a fragmented market.
            </h2>
          </div>
          <p className="text-foreground/75 text-base lg:text-lg leading-relaxed self-end">
            2PlusFortuneAliances operates the connective tissue of India's distribution economy — a regulated,
            audited and observable stack designed to move products, capital and trust across
            every tier of the country.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Network, title: "Unified Distribution OS", body: "One operating layer across manufacturers, distributors and branches with end-to-end order, inventory and settlement flows." },
            { icon: Banknote, title: "Embedded Gold Finance", body: "Pre-integrated Gold EMI, lease and securitisation rails — issued in partnership with regulated financial institutions." },
            { icon: ShieldCheck, title: "Institutional Compliance", body: "SOC 2, ISO 27001 and RBI-aligned controls with cryptographic audit trails on every transaction." },
            { icon: BarChart3, title: "Real-time Intelligence", body: "Executive dashboards, branch-level cohorts and predictive demand signals — refreshed in seconds, not days." },
            { icon: Building2, title: "Branch-Grade Tooling", body: "Field-ready consoles, KYC orchestration and offline-tolerant workflows engineered for Tier 2–6 India." },
            { icon: Workflow, title: "Partner Orchestration", body: "Configurable revenue shares, commercial contracts and SLA-bound APIs for institutional partners." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="glass-card rounded-md p-7 group hover:border-[color:var(--color-gold)]/60 transition-colors">
              <Icon className="text-gold" size={22} />
              <h3 className="font-display text-2xl mt-5">{title}</h3>
              <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{body}</p>
              <div className="gold-divider opacity-0 group-hover:opacity-60 mt-6 transition-opacity" />
            </div>
          ))}
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-24">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Operator Console</div>
            <h2 className="font-display text-4xl lg:text-5xl mt-4 leading-tight">
              A command center built for institutional scale.
            </h2>
            <p className="mt-5 text-foreground/75 leading-relaxed">
              Monitor GMV, settlement velocity, partner performance and Gold EMI book health
              across 28 states and 10,000+ branches — from a single boardroom-grade dashboard.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                "Real-time order tracking with branch-level lineage",
                "Configurable partner P&L and revenue attribution",
                "Risk-weighted Gold EMI book monitoring",
                "Regulator-ready audit export in one click",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-foreground/85">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[color:var(--color-gold)]" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <DashboardPreview />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-24">
        <div className="glass-card rounded-md p-10 lg:p-14 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.18),transparent_70%)]" />
          <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold">For Institutions & Manufacturers</div>
              <h2 className="font-display text-4xl lg:text-5xl mt-4 leading-tight">
                Distribute at the scale of a nation. <br />
                <span className="text-gradient-gold">Govern at the rigor of an institution.</span>
              </h2>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <Link to="/contact" className="btn-gold rounded-sm px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] inline-flex items-center gap-2">
                Schedule a Briefing <ArrowRight size={14} />
              </Link>
              <Link to="/platform" className="btn-ghost-gold rounded-sm px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] inline-flex items-center justify-center">
                Download Platform Brief
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
