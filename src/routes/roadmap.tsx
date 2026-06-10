import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Roadmap — 2PlusFortuneAliances" },
      { name: "description", content: "2PlusFortuneAliances's institutional roadmap across distribution, embedded finance and regulatory infrastructure." },
      { property: "og:title", content: "Roadmap — 2PlusFortuneAliances" },
      { property: "og:description", content: "2PlusFortuneAliances's institutional roadmap across distribution, embedded finance and regulatory infrastructure." },
    ],
  }),
  component: RoadmapPage,
});

const phases = [
  {
    q: "Q3 2025",
    title: "Distribution OS v4",
    body: "Unified order, settlement and partner P&L across the full network with sub-second reporting.",
    items: ["Real-time settlement ledger", "Branch-level cohort analytics", "Configurable revenue attribution"],
  },
  {
    q: "Q4 2025",
    title: "Gold EMI Expansion",
    body: "Scaling the Gold-backed financing book to ₹3,000 Cr across new institutional partners.",
    items: ["Two new bank alliances", "Securitisation pipeline", "Risk-weighted dashboards"],
  },
  {
    q: "Q1 2026",
    title: "Institutional API Layer",
    body: "Public, SLA-bound APIs for manufacturers and financial institutions to embed 2PlusFortuneAliances rails.",
    items: ["Open partner sandbox", "Webhook contract library", "Independent SOC 2 Type II audit"],
  },
  {
    q: "Q2 2026",
    title: "Bharat Branch Network",
    body: "Doubling field presence with 20,000+ branches across Tier 3–6 India.",
    items: ["Vernacular branch console", "Offline-first reconciliation", "Local language support desks"],
  },
];

function RoadmapPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-12">
        <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Roadmap</div>
        <h1 className="font-display text-5xl lg:text-7xl mt-5 max-w-4xl leading-[1.05]">
          A multi-year plan for <span className="text-gradient-gold">national-scale</span> distribution.
        </h1>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-24">
        <div className="relative">
          <div className="absolute left-3 lg:left-6 top-0 bottom-0 w-px bg-[color:var(--color-gold)]/30" />
          <ol className="space-y-8">
            {phases.map((p) => (
              <li key={p.q} className="relative pl-10 lg:pl-16">
                <span className="absolute left-2 lg:left-5 top-2 h-3 w-3 rounded-full bg-[color:var(--color-gold)] shadow-[0_0_0_4px_rgba(212,175,55,0.18)]" />
                <div className="glass-card rounded-md p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-gold">{p.q}</div>
                    <h3 className="font-display text-2xl">{p.title}</h3>
                  </div>
                  <p className="mt-3 text-foreground/75 leading-relaxed">{p.body}</p>
                  <div className="gold-divider opacity-40 my-5" />
                  <ul className="grid sm:grid-cols-3 gap-2 text-sm text-foreground/80">
                    {p.items.map((i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-[color:var(--color-gold)]" />
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}