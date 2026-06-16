import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — 2 Plus Fortune Alliances Pvt Ltd" },
      { name: "description", content: "Founded on 30 June 2022 and headquartered in Hyderabad, 2+FAPL is a strategic alliance built on mutual growth, shared success and value creation for stakeholders." },
      { property: "og:title", content: "About — 2 Plus Fortune Alliances Pvt Ltd" },
      { property: "og:description", content: "Founded on 30 June 2022 and headquartered in Hyderabad, 2+FAPL is a strategic alliance built on mutual growth, shared success and value creation for stakeholders." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About 2+FAPL · Est. 30 June 2022"
        title={<>A strategic alliance built on <span className="text-brand-gold-premium">mutual growth</span> and shared success.</>}
        subtitle="Founded on 30 June 2022 and headquartered in Hyderabad, 2 Plus Fortune Alliances Private Limited (2+FAPL) represents a strategic alliance between two fortunate enterprises, committed to fostering beneficial partnerships that drive value for all stakeholders."
      />

      <section className="section-offwhite">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 grid lg:grid-cols-3 gap-6">
          {[
            ["Vision", "To become India's most admired distribution house by empowering partners with knowledge, guiding them with expertise and offering a wide range of products and services that inspire confidence and put control back in their hands."],
            ["Mission", "To empower rural, semi-urban and urban clients to enhance their lifestyles by offering the latest products at affordable, structured prices and introducing innovative models that overcome the gaps in traditional supply infrastructure."],
            ["Objective", "To bridge the gap between premium brands and rural consumers through a seamless distribution ecosystem — affordable, high-quality products via an innovative aggregator model built on strategic partnerships, financial inclusion and last-mile connectivity."],
          ].map(([t, b]) => (
            <div key={t} className="card-gold rounded-md p-8 bg-white">
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold">{t}</div>
              <p className="mt-4 text-emerald leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOUNDER */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 bg-white">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Founder & Director</div>
            <h2 className="font-display text-5xl lg:text-6xl mt-4 text-emerald leading-tight">Srikanth Pagolu</h2>
            <p className="mt-4 text-gold text-sm uppercase tracking-[0.22em]">MBA · 25+ Years of Professional Experience</p>
          </div>
          <div className="card-gold rounded-md p-8">
            <p className="text-emerald leading-relaxed">
              An experienced leader with a proven track record in consumer product finance and
              micro-lending, with expertise across banking, insurance, broking, product distribution
              and MFI operations. Skilled in Direct Sales, Corporate Sales, Channel Sales,
              Key Account Management and Strategic Alliances.
            </p>
            <div className="gold-divider opacity-60 my-6" />
            <div className="grid grid-cols-2 gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {["Banking", "Insurance", "Broking", "Product Distribution", "Micro Finance Institutions", "Consumer Product Finance", "Channel Sales", "Strategic Alliances"].map((s) => (
                <div key={s} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-[color:var(--color-gold)]" />{s}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SENIOR MANAGEMENT */}
      <section className="section-offwhite">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Senior Management Team</div>
          <h2 className="font-display text-4xl lg:text-5xl mt-4 text-emerald">Leadership driving operations.</h2>
          <div className="grid sm:grid-cols-2 gap-6 mt-10 max-w-3xl">
            {[
              { name: "Sharada Manisha", role: "Independent Director" },
              { name: "Prasad Andrews", role: "Operations Head" },
            ].map((m) => (
              <div key={m.name} className="card-gold rounded-md p-8 bg-white">
                <div className="h-16 w-16 rounded-full bg-emerald grid place-items-center text-white font-display text-2xl">
                  {m.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="font-display text-2xl mt-5 text-emerald">{m.name}</h3>
                <div className="text-xs uppercase tracking-[0.22em] text-gold mt-2">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 bg-white">
        <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Why Choose Us</div>
        <h2 className="font-display text-4xl lg:text-5xl mt-4 text-emerald max-w-3xl leading-tight">Why 2+FAPL.</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {[
            ["Industry Expertise", "Deep understanding of the rural market, its operations and customer needs."],
            ["Tailored Offerings", "Curated products designed to meet market and consumer demands."],
            ["Value Driven Solutions", "Focused on business growth, not just commercial gains."],
            ["Service Commitment", "Quick complaint resolution and hassle-free replacements."],
          ].map(([t, b]) => (
            <div key={t} className="card-gold rounded-md p-7">
              <h3 className="font-display text-xl text-emerald leading-snug">{t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-emerald text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Get in touch</div>
            <h2 className="font-display text-3xl mt-3 text-white">Speak with our leadership team.</h2>
          </div>
          <Link to="/contact" className="btn-gold rounded-sm px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em]">
            Contact 2+FAPL
          </Link>
        </div>
      </section>
    </>
  );
}