import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Truck, HandshakeIcon, Wallet, Layers, Award, Users2 } from "lucide-react";
import { EcosystemNetwork } from "@/components/site/EcosystemNetwork";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "2+FAPL — Onwards & Upwards · India's Multi-Brand Distribution House" },
      { name: "description", content: "2 Plus Fortune Alliances Pvt Ltd connects premium brands with rural, semi-urban and urban India through a multi-brand aggregation and last-mile distribution model." },
      { property: "og:title", content: "2+FAPL — India's Multi-Brand Distribution House" },
      { property: "og:description", content: "2 Plus Fortune Alliances Pvt Ltd connects premium brands with rural, semi-urban and urban India through a multi-brand aggregation and last-mile distribution model." },
    ],
  }),
  component: Index,
});

const industries = [
  "Kitchenware", "Home Appliances", "Home Furnishing", "Household Furniture",
  "Electricals", "Electronics", "White Goods", "Water Purifiers",
  "Portable Solar Products", "Mobiles & Accessories", "Health & Hygiene",
];

const pillars = [
  { icon: Truck, title: "Robust Distribution Network", body: "Deep reach across rural markets, anchored in dependable last-mile delivery." },
  { icon: HandshakeIcon, title: "Strategic Alliances", body: "Strong partnerships with OEMs, NBFCs, cooperative societies, trusts and foundations." },
  { icon: Layers, title: "Streamlined Supply Chain", body: "Efficient logistics, state warehousing and timely delivery across the country." },
  { icon: Wallet, title: "Accessibility & Affordability", body: "Hassle-free instalments — no processing fee, no interest, no insurance." },
];

const unique = [
  { n: "01", t: "Comprehensive Product Range", b: "From everyday essentials to timeless treasures across 11+ categories." },
  { n: "02", t: "Affordability With Quality", b: "Cost-effective products, ISI-marked and quality-assured." },
  { n: "03", t: "Efficient Supply Chain", b: "Timely deliveries with penalty clauses for untimely service." },
  { n: "04", t: "Expertise-Driven Operations", b: "Partner enablement with insights, knowledge and compliance alignment." },
];

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-emerald text-white">
        <div className="absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.22),transparent_55%)]" />
        <div className="absolute inset-0 -z-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(212,175,55,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.4) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-14 lg:pt-20 pb-16 lg:pb-24 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-sm border border-[color:var(--color-gold)]/40 bg-white/5 backdrop-blur px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-gold">
              <span className="h-1 w-1 rounded-full bg-[color:var(--color-gold)]" />
              Onwards & Upwards · Est. 30 June 2022
            </div>

            <h1 className="mt-6 font-display text-[44px] sm:text-6xl lg:text-7xl leading-[1.02] text-white">
              From <span className="text-gradient-gold">everyday essentials</span> <br />
              to timeless treasures.
            </h1>

            <p className="mt-6 max-w-xl text-base lg:text-lg text-white/75 leading-relaxed">
              2 Plus Fortune Alliances Private Limited (2+FAPL) is a Hyderabad-headquartered
              distribution house bridging premium brands with rural, semi-urban and urban India
              through a multi-brand aggregator model built on strategic partnerships,
              financial inclusion and last-mile connectivity.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/contact" className="btn-gold inline-flex items-center gap-2 rounded-sm px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.22em]">
                Partner With Us <ArrowRight size={14} />
              </Link>
              <Link to="/platform" className="rounded-sm px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] border border-white/30 text-white hover:bg-white hover:text-emerald transition">
                Explore Our Business
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 max-w-lg gap-8">
              {[
                ["11+", "Product Categories"],
                ["25+ Yrs", "Founder Experience"],
                ["18+", "Business Partners"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="font-display text-2xl lg:text-3xl text-gold">{v}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-white/60">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-md bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.18),transparent_70%)]" />
            <div className="relative rounded-md p-6 lg:p-8 bg-[color:var(--emerald-forest)]/70 border border-[color:var(--color-gold)]/30 backdrop-blur">
              <div className="flex items-center justify-between mb-4">
                <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Business Model</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/55">Aggregator Flow</div>
              </div>
              <EcosystemNetwork />
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES STRIP */}
      <section className="section-offwhite border-y border-[color:var(--color-border)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-8">
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold mb-4">Industries We Distribute</div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-emerald">
            {industries.map((i, idx) => (
              <span key={i} className="flex items-center gap-3">
                {i}
                {idx < industries.length - 1 && <span className="text-gold">·</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24 bg-white">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 mb-14">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Our Role as an Aggregator</div>
            <h2 className="font-display text-4xl lg:text-5xl mt-4 leading-tight text-emerald">
              Connecting urban manufacturers with India's underserved rural markets.
            </h2>
          </div>
          <p className="text-muted-foreground text-base lg:text-lg leading-relaxed self-end">
            Our mission is to build a strong bridge between brands and rural consumers by creating value
            through reach, reliability and trust — operating as an aggregator across the B2B2C model
            and institutional sales channels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map(({ icon: Icon, title, body }) => (
            <div key={title} className="card-gold rounded-md p-7 group transition">
              <Icon className="text-gold" size={22} />
              <h3 className="font-display text-xl mt-5 text-emerald leading-snug">{title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT MAKES US UNIQUE */}
      <section className="section-offwhite">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold">What Makes Us Unique</div>
          <h2 className="font-display text-4xl lg:text-5xl mt-4 text-emerald max-w-3xl leading-tight">
            A distribution house engineered for trust at scale.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {unique.map((u) => (
              <div key={u.n} className="bg-white border border-[color:var(--color-border)] rounded-md p-7">
                <div className="font-display text-3xl text-gold">{u.n}</div>
                <h3 className="font-display text-xl mt-4 text-emerald leading-snug">{u.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{u.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISTRIBUTION CHANNELS */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 mb-12">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Diversified Segments</div>
            <h2 className="font-display text-4xl lg:text-5xl mt-4 text-emerald leading-tight">
              2+FAPL channels.
            </h2>
          </div>
          <p className="text-muted-foreground text-base lg:text-lg leading-relaxed self-end">
            Expanding reach. Empowering growth. Enriching lives. Our distribution spans rural financial
            institutions, urban corporate B2B, wholesale bulk promotion and franchise-led retail.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { t: "Distribution in Financial Institutions (Rural)", b: "Partnering with rural financial institutions to ensure trust, accessibility and financial inclusion.", icon: Users2 },
            { t: "Corporate B2B (Urban)", b: "Building strong partnerships with corporates to deliver value-driven solutions in urban markets.", icon: Award },
            { t: "Wholesale / Bulk Promotion", b: "Serving businesses with bulk supply and promotional solutions for maximum impact.", icon: Layers },
            { t: "Retail (Franchise — Rural)", b: "Empowering entrepreneurs in rural areas through our franchise model for sustainable growth.", icon: HandshakeIcon },
          ].map(({ t, b, icon: Icon }) => (
            <div key={t} className="card-gold rounded-md p-7">
              <Icon className="text-gold" size={22} />
              <h3 className="font-display text-lg mt-5 text-emerald leading-snug">{t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.25em] text-gold">
          <span>Hassle-Free Instalment</span>
          <span className="opacity-40">·</span>
          <span>No Processing Fee</span>
          <span className="opacity-40">·</span>
          <span>No Interest</span>
          <span className="opacity-40">·</span>
          <span>No Insurance</span>
        </div>
      </section>

      {/* CONCLUSION CTA — Dark green for contrast */}
      <section className="bg-emerald text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Conclusion</div>
            <h2 className="font-display text-4xl lg:text-5xl mt-4 leading-tight text-white">
              Building <span className="text-gradient-gold">sustainable market ecosystems</span> for rural India.
            </h2>
            <p className="mt-5 text-white/80 leading-relaxed max-w-2xl">
              2+FAPL is not just distributing products — we are expanding market reach and delivering
              superior value to customers through innovative business models, structured and affordable pricing,
              and a growth-focused vision committed to economic empowerment.
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <Link to="/contact" className="btn-gold rounded-sm px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] inline-flex items-center gap-2">
              Speak With Our Team <ArrowRight size={14} />
            </Link>
            <Link to="/partners" className="rounded-sm px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] inline-flex items-center justify-center border border-white/30 text-white hover:bg-white hover:text-emerald transition">
              See Our Brands & Partners
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
