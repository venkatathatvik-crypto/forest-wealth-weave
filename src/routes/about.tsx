import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Auragold Distribution Networks" },
      { name: "description", content: "Auragold is the institutional infrastructure powering India's next-generation distribution and gold finance economy." },
      { property: "og:title", content: "About — Auragold Distribution Networks" },
      { property: "og:description", content: "Auragold is the institutional infrastructure powering India's next-generation distribution and gold finance economy." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-16">
        <div className="text-[10px] uppercase tracking-[0.3em] text-gold">About Auragold</div>
        <h1 className="font-display text-5xl lg:text-7xl mt-5 max-w-4xl leading-[1.05]">
          Engineering the <span className="text-gradient-gold">trusted layer</span> beneath India's commerce.
        </h1>
        <p className="mt-8 max-w-3xl text-lg text-foreground/75 leading-relaxed">
          Founded by veterans from financial services, distribution and enterprise software,
          Auragold operates the regulated infrastructure that connects manufacturers to the
          last branch — and the last branch to the largest financial institutions in the country.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-20 grid lg:grid-cols-3 gap-6">
        {[
          ["Mission", "Bring institutional rigor and modern technology to every transaction across India's distribution economy."],
          ["Vision", "A unified digital backbone where manufacturers, partners and customers transact with bank-grade certainty."],
          ["Operating Principle", "Govern like a regulator, execute like a startup, scale like a network."],
        ].map(([t, b]) => (
          <div key={t} className="glass-card rounded-md p-8">
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold">{t}</div>
            <p className="mt-4 text-foreground/85 leading-relaxed">{b}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-24">
        <div className="grid lg:grid-cols-4 gap-6">
          {[
            ["2019", "Founded in Mumbai"],
            ["2021", "First Fortune alliance signed"],
            ["2023", "₹500 Cr GMV milestone"],
            ["2025", "10,000+ branches onboarded"],
          ].map(([y, t]) => (
            <div key={y} className="border-l border-[color:var(--color-gold)]/40 pl-5">
              <div className="font-display text-3xl text-gold">{y}</div>
              <div className="mt-2 text-sm text-foreground/75">{t}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-24">
        <div className="glass-card rounded-md p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Leadership</div>
            <h2 className="font-display text-3xl mt-3">A team built for regulated scale.</h2>
          </div>
          <Link to="/contact" className="btn-gold rounded-sm px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em]">
            Speak with leadership
          </Link>
        </div>
      </section>
    </>
  );
}