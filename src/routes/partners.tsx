import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partners — 2PlusFortuneAliances Distribution Network" },
      { name: "description", content: "Manufacturers, financial institutions, distributors and branches building India's distribution backbone with 2PlusFortuneAliances." },
      { property: "og:title", content: "Partners — 2PlusFortuneAliances Distribution Network" },
      { property: "og:description", content: "Manufacturers, financial institutions, distributors and branches building India's distribution backbone with 2PlusFortuneAliances." },
    ],
  }),
  component: PartnersPage,
});

const tiers = [
  {
    title: "Manufacturers & Brands",
    body: "Reach Tier 2–6 India with regulated last-mile distribution and live demand telemetry.",
    items: ["Consumer durables", "Two-wheelers", "Building materials", "Agritech equipment"],
  },
  {
    title: "Financial Institutions",
    body: "Plug into a curated origination channel with built-in KYC, underwriting and settlement rails.",
    items: ["Public sector banks", "Private banks", "NBFCs", "Asset managers"],
  },
  {
    title: "Distribution Partners",
    body: "Operate at institutional rigor with commercials, SLAs and consoles built for scale.",
    items: ["Regional distributors", "DSAs", "Franchise networks", "Marketplaces"],
  },
  {
    title: "Branches & Field Teams",
    body: "Offline-tolerant tooling and device management for the realities of Bharat.",
    items: ["Bank branches", "BC outlets", "Gold loan branches", "Retail touchpoints"],
  },
];

function PartnersPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-12">
        <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Partners</div>
        <h1 className="font-display text-5xl lg:text-7xl mt-5 max-w-4xl leading-[1.05]">
          The network is the <span className="text-gradient-gold">product</span>.
        </h1>
        <p className="mt-7 max-w-3xl text-lg text-foreground/75 leading-relaxed">
          We partner with institutions that share our standards for governance, customer
          protection and execution. Every node in the network is contracted, audited and
          observable.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-20 grid md:grid-cols-2 gap-6">
        {tiers.map((t) => (
          <div key={t.title} className="glass-card rounded-md p-8">
            <h3 className="font-display text-2xl">{t.title}</h3>
            <p className="mt-3 text-sm text-foreground/75 leading-relaxed">{t.body}</p>
            <div className="gold-divider opacity-50 my-5" />
            <ul className="grid grid-cols-2 gap-2 text-sm text-foreground/80">
              {t.items.map((i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[color:var(--color-gold)]" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-24">
        <div className="glass-card rounded-md p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <h2 className="font-display text-3xl max-w-xl leading-tight">
            Become a 2PlusFortuneAliances institutional partner.
          </h2>
          <Link to="/contact" className="btn-gold rounded-sm px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em]">
            Begin Partnership Review
          </Link>
        </div>
      </section>
    </>
  );
}