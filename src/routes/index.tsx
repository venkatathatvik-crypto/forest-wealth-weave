import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Truck, HandshakeIcon, Wallet, Layers, Award, Users2, X, CheckCircle, Building2 } from "lucide-react";
import { EcosystemNetwork } from "@/components/site/EcosystemNetwork";
import { useState } from "react";

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
  const [activeModal, setActiveModal] = useState<"" | "customer" | "partner" | "branch">("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Forms state
  const [customerForm, setCustomerForm] = useState({ name: "", phone: "", email: "", city: "", state: "" });
  const [partnerForm, setPartnerForm] = useState({ companyName: "", contactPerson: "", phone: "", email: "", gst: "", city: "", state: "" });
  const [branchForm, setBranchForm] = useState({ branchName: "", partnerName: "", manager: "", phone: "", location: "" });

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-brand-green-primary text-white">
        <div className="absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.22),transparent_55%)]" />
        <div className="absolute inset-0 -z-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(201,162,39,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.4) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-14 lg:pt-20 pb-16 lg:pb-24 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-lg border border-brand-gold-premium/40 bg-white/5 backdrop-blur px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-brand-gold-premium">
              <span className="h-1 w-1 rounded-full bg-brand-gold-premium" />
              Onwards & Upwards · Est. 30 June 2022
            </div>

            <h1 className="mt-6 font-display text-[44px] sm:text-6xl lg:text-7xl leading-[1.02] text-white">
              From <span className="text-brand-gold-premium">everyday essentials</span> <br />
              to timeless treasures.
            </h1>

            <p className="mt-6 max-w-xl text-base lg:text-lg text-white/75 leading-relaxed">
              2 Plus Fortune Alliances Private Limited (2+FAPL) is a Hyderabad-headquartered
              distribution house bridging premium brands with rural, semi-urban and urban India
              through a multi-brand aggregator model built on strategic partnerships,
              financial inclusion and last-mile connectivity.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] bg-brand-gold-premium text-brand-green-primary hover:bg-brand-gold-rich transition-colors">
                Partner With Us <ArrowRight size={14} />
              </Link>
              <Link to="/platform" className="rounded-lg px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] border border-white/30 text-white hover:bg-white hover:text-brand-green-primary transition">
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
                  <div className="font-display text-2xl lg:text-3xl text-brand-gold-premium">{v}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-white/60">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-lg bg-[radial-gradient(circle_at_center,rgba(201,162,39,0.18),transparent_70%)]" />
            <div className="relative rounded-lg p-6 lg:p-8 bg-brand-green-secondary/70 border border-brand-gold-premium/30 backdrop-blur">
              <div className="flex items-center justify-between mb-4">
                <div className="text-[10px] uppercase tracking-[0.3em] text-brand-gold-premium">Business Model</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/55">Aggregator Flow</div>
              </div>
              <EcosystemNetwork />
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES STRIP */}
      <section className="bg-bg-section border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-8">
          <div className="text-[10px] uppercase tracking-[0.3em] text-brand-gold-premium mb-4">Industries We Distribute</div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-brand-green-primary">
            {industries.map((i, idx) => (
              <span key={i} className="flex items-center gap-3">
                {i}
                {idx < industries.length - 1 && <span className="text-brand-gold-premium">·</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24 bg-white">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 mb-14">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-brand-gold-premium">Our Role as an Aggregator</div>
            <h2 className="font-display text-4xl lg:text-5xl mt-4 leading-tight text-brand-green-primary">
              Connecting urban manufacturers with India's underserved rural markets.
            </h2>
          </div>
          <p className="text-text-secondary text-base lg:text-lg leading-relaxed self-end">
            Our mission is to build a strong bridge between brands and rural consumers by creating value
            through reach, reliability and trust — operating as an aggregator across the B2B2C model
            and institutional sales channels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-lg p-7 border border-border bg-white shadow-sm hover:shadow-md transition group">
              <Icon className="text-brand-gold-premium" size={22} />
              <h3 className="font-display text-xl mt-5 text-brand-green-primary leading-snug">{title}</h3>
              <p className="mt-3 text-sm text-text-secondary leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT MAKES US UNIQUE */}
      <section className="bg-bg-section">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
          <div className="text-[10px] uppercase tracking-[0.3em] text-brand-gold-premium">What Makes Us Unique</div>
          <h2 className="font-display text-4xl lg:text-5xl mt-4 text-brand-green-primary max-w-3xl leading-tight">
            A distribution house engineered for trust at scale.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {unique.map((u) => (
              <div key={u.n} className="bg-white border border-border rounded-lg p-7 shadow-sm">
                <div className="font-display text-3xl text-brand-gold-premium">{u.n}</div>
                <h3 className="font-display text-xl mt-4 text-brand-green-primary leading-snug">{u.t}</h3>
                <p className="mt-3 text-sm text-text-secondary leading-relaxed">{u.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISTRIBUTION CHANNELS */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 mb-12">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-brand-gold-premium">Diversified Segments</div>
            <h2 className="font-display text-4xl lg:text-5xl mt-4 text-brand-green-primary leading-tight">
              2+FAPL channels.
            </h2>
          </div>
          <p className="text-text-secondary text-base lg:text-lg leading-relaxed self-end">
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
            <div key={t} className="rounded-lg p-7 border border-border bg-white shadow-sm hover:shadow-md transition">
              <Icon className="text-brand-gold-premium" size={22} />
              <h3 className="font-display text-lg mt-5 text-brand-green-primary leading-snug">{t}</h3>
              <p className="mt-3 text-sm text-text-secondary leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.25em] text-brand-gold-premium">
          <span>Hassle-Free Instalment</span>
          <span className="opacity-40">·</span>
          <span>No Processing Fee</span>
          <span className="opacity-40">·</span>
          <span>No Interest</span>
          <span className="opacity-40">·</span>
          <span>No Insurance</span>
        </div>
      </section>

      {/* JOIN THE ECOSYSTEM CTA SECTION */}
      <section className="bg-bg-section border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-[10px] uppercase tracking-[0.3em] text-brand-gold-premium mb-3 font-semibold">Join Our Ecosystem</div>
            <h2 className="font-display text-4xl lg:text-5xl text-brand-green-primary leading-tight">
              Join the 2+ Fortune Alliances Network
            </h2>
            <p className="text-text-secondary mt-4 text-sm sm:text-base leading-relaxed">
              Become part of India's digital distribution backbone. Select the path that fits your workspace goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-text-primary">
            {/* Card 1: Become a Customer */}
            <div className="bg-white border border-border rounded-lg p-8 shadow-sm flex flex-col justify-between hover:border-brand-gold-premium/55 hover:shadow-md transition duration-300">
              <div>
                <div className="h-12 w-12 rounded-lg bg-brand-gold-premium/15 text-brand-gold-premium grid place-items-center mb-6">
                  <Wallet size={22} />
                </div>
                <h3 className="font-display text-2xl text-brand-green-primary">Become a Customer</h3>
                <p className="text-sm text-text-secondary mt-3 leading-relaxed">
                  Access real-time gold rates, track your gold balances in grams, and request secure physical delivery or counter pickups.
                </p>
                <ul className="text-xs text-text-secondary space-y-2 mt-5">
                  <li className="flex items-center gap-2">✓ 24K certified purity bullion</li>
                  <li className="flex items-center gap-2">✓ Flexible purchase & EMI plans</li>
                  <li className="flex items-center gap-2">✓ Safe insured vault storage</li>
                </ul>
              </div>
              <button
                onClick={() => { setActiveModal("customer"); setFormSubmitted(false); setError(""); }}
                className="mt-8 w-full h-11 rounded-lg bg-brand-gold-premium hover:bg-brand-gold-rich text-brand-green-primary font-semibold text-xs uppercase tracking-[0.2em] transition-colors"
              >
                Apply Now
              </button>
            </div>

            {/* Card 2: Become a Partner */}
            <div className="bg-white border border-border rounded-lg p-8 shadow-sm flex flex-col justify-between hover:border-brand-gold-premium/55 hover:shadow-md transition duration-300">
              <div>
                <div className="h-12 w-12 rounded-lg bg-brand-gold-premium/15 text-brand-gold-premium grid place-items-center mb-6">
                  <HandshakeIcon size={22} />
                </div>
                <h3 className="font-display text-2xl text-brand-green-primary">Become a Partner</h3>
                <p className="text-sm text-text-secondary mt-3 leading-relaxed">
                  Expand distribution in your region. Aggregated wholesale pricing and support models designed for institutional success.
                </p>
                <ul className="text-xs text-text-secondary space-y-2 mt-5">
                  <li className="flex items-center gap-2">✓ Regional market exclusivity</li>
                  <li className="flex items-center gap-2">✓ Co-branded promotional material</li>
                  <li className="flex items-center gap-2">✓ Dedicated partner console logs</li>
                </ul>
              </div>
              <button
                onClick={() => { setActiveModal("partner"); setFormSubmitted(false); setError(""); }}
                className="mt-8 w-full h-11 rounded-lg border-2 border-brand-green-primary hover:bg-brand-green-primary hover:text-white text-brand-green-primary font-semibold text-xs uppercase tracking-[0.2em] transition-all"
              >
                Become a Partner
              </button>
            </div>

            {/* Card 3: Become a Branch */}
            <div className="bg-white border border-border rounded-lg p-8 shadow-sm flex flex-col justify-between hover:border-brand-gold-premium/55 hover:shadow-md transition duration-300">
              <div>
                <div className="h-12 w-12 rounded-lg bg-brand-gold-premium/15 text-brand-gold-premium grid place-items-center mb-6">
                  <Building2 size={22} />
                </div>
                <h3 className="font-display text-2xl text-brand-green-primary">Become a Branch</h3>
                <p className="text-sm text-text-secondary mt-3 leading-relaxed">
                  Establish a localized counter workspace. Assist with local onboarding, KYC validations, and counter cash purchases.
                </p>
                <ul className="text-xs text-text-secondary space-y-2 mt-5">
                  <li className="flex items-center gap-2">✓ Counter operation guidelines</li>
                  <li className="flex items-center gap-2">✓ Direct branch console access</li>
                  <li className="flex items-center gap-2">✓ Local marketing kit and banner</li>
                </ul>
              </div>
              <button
                onClick={() => { setActiveModal("branch"); setFormSubmitted(false); setError(""); }}
                className="mt-8 w-full h-11 rounded-lg border border-border hover:border-brand-gold-premium/55 text-brand-green-primary font-semibold text-xs uppercase tracking-[0.2em] transition-all"
              >
                Apply for Branch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONCLUSION CTA — Dark green for contrast */}
      <section className="bg-brand-green-primary text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-brand-gold-premium">Conclusion</div>
            <h2 className="font-display text-4xl lg:text-5xl mt-4 leading-tight text-white">
              Building <span className="text-brand-gold-premium">sustainable market ecosystems</span> for rural India.
            </h2>
            <p className="mt-5 text-white/80 leading-relaxed max-w-2xl">
              2+FAPL is not just distributing products — we are expanding market reach and delivering
              superior value to customers through innovative business models, structured and affordable pricing,
              and a growth-focused vision committed to economic empowerment.
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <Link to="/contact" className="rounded-lg px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] bg-brand-gold-premium text-brand-green-primary inline-flex items-center gap-2 hover:bg-brand-gold-rich transition-colors">
              Speak With Our Team <ArrowRight size={14} />
            </Link>
            <Link to="/partners" className="rounded-lg px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] inline-flex items-center justify-center border border-white/30 text-white hover:bg-white hover:text-brand-green-primary transition">
              See Our Brands & Partners
            </Link>
          </div>
        </div>
      </section>

      {/* ONBOARDING DIALOGS */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4">
          <Card className="w-full max-w-lg p-6 bg-background relative border border-border shadow-2xl text-text-primary">
            <button onClick={() => setActiveModal("")} className="absolute right-4 top-4 text-text-secondary hover:text-text-primary">
              <X size={18} />
            </button>

            {!formSubmitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setError("");
                  if (activeModal === "customer") {
                    if (
                      !customerForm.name.trim() ||
                      !customerForm.phone.trim() ||
                      !customerForm.email.trim() ||
                      !customerForm.city.trim() ||
                      !customerForm.state.trim()
                    ) {
                      setError("All fields are required");
                      return;
                    }
                  } else if (activeModal === "partner") {
                    if (
                      !partnerForm.companyName.trim() ||
                      !partnerForm.contactPerson.trim() ||
                      !partnerForm.gst.trim() ||
                      !partnerForm.phone.trim() ||
                      !partnerForm.email.trim() ||
                      !partnerForm.city.trim() ||
                      !partnerForm.state.trim()
                    ) {
                      setError("All fields are required");
                      return;
                    }
                  } else if (activeModal === "branch") {
                    if (
                      !branchForm.branchName.trim() ||
                      !branchForm.partnerName.trim() ||
                      !branchForm.manager.trim() ||
                      !branchForm.phone.trim() ||
                      !branchForm.location.trim()
                    ) {
                      setError("All fields are required");
                      return;
                    }
                  }
                  setFormSubmitted(true);
                }}
                className="space-y-4 text-left"
              >
                {activeModal === "customer" && (
                  <>
                    <h3 className="font-display text-2xl text-brand-green-primary text-center">Become a Customer</h3>
                    <p className="text-xs text-text-secondary text-center">Submit your details to establish a certified gold account.</p>
                    <label className="block">
                      <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary">Full Name</span>
                      <input value={customerForm.name} onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })} className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border bg-white outline-none focus:border-brand-gold-premium text-sm" />
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="block">
                        <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary">Mobile Number</span>
                        <input type="tel" value={customerForm.phone} onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })} className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border bg-white outline-none focus:border-brand-gold-premium text-sm" />
                      </label>
                      <label className="block">
                        <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary">Email Address</span>
                        <input type="email" value={customerForm.email} onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })} className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border bg-white outline-none focus:border-brand-gold-premium text-sm" />
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="block">
                        <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary">City</span>
                        <input value={customerForm.city} onChange={(e) => setCustomerForm({ ...customerForm, city: e.target.value })} className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border bg-white outline-none focus:border-brand-gold-premium text-sm" />
                      </label>
                      <label className="block">
                        <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary">State</span>
                        <input value={customerForm.state} onChange={(e) => setCustomerForm({ ...customerForm, state: e.target.value })} className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border bg-white outline-none focus:border-brand-gold-premium text-sm" />
                      </label>
                    </div>
                  </>
                )}

                {activeModal === "partner" && (
                  <>
                    <h3 className="font-display text-2xl text-brand-green-primary text-center">Become a Partner</h3>
                    <p className="text-xs text-text-secondary text-center">Register as a distribution or sourcing business partner.</p>
                    <label className="block">
                      <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary">Company Name</span>
                      <input value={partnerForm.companyName} onChange={(e) => setPartnerForm({ ...partnerForm, companyName: e.target.value })} className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border bg-white outline-none focus:border-brand-gold-premium text-sm" />
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="block">
                        <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary">Contact Person</span>
                        <input value={partnerForm.contactPerson} onChange={(e) => setPartnerForm({ ...partnerForm, contactPerson: e.target.value })} className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border bg-white outline-none focus:border-brand-gold-premium text-sm" />
                      </label>
                      <label className="block">
                        <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary">GST Number</span>
                        <input value={partnerForm.gst} onChange={(e) => setPartnerForm({ ...partnerForm, gst: e.target.value })} className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border bg-white outline-none focus:border-brand-gold-premium text-sm" />
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="block">
                        <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary">Mobile Phone</span>
                        <input type="tel" value={partnerForm.phone} onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })} className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border bg-white outline-none focus:border-brand-gold-premium text-sm" />
                      </label>
                      <label className="block">
                        <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary">Work Email</span>
                        <input type="email" value={partnerForm.email} onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })} className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border bg-white outline-none focus:border-brand-gold-premium text-sm" />
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="block">
                        <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary">City</span>
                        <input value={partnerForm.city} onChange={(e) => setPartnerForm({ ...partnerForm, city: e.target.value })} className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border bg-white outline-none focus:border-brand-gold-premium text-sm" />
                      </label>
                      <label className="block">
                        <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary">State</span>
                        <input value={partnerForm.state} onChange={(e) => setPartnerForm({ ...partnerForm, state: e.target.value })} className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border bg-white outline-none focus:border-brand-gold-premium text-sm" />
                      </label>
                    </div>
                  </>
                )}

                {activeModal === "branch" && (
                  <>
                    <h3 className="font-display text-2xl text-brand-green-primary text-center">Become a Branch</h3>
                    <p className="text-xs text-text-secondary text-center">Establish a local partner counter hub for customer administration.</p>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="block">
                        <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary">Branch Name / Area</span>
                        <input value={branchForm.branchName} onChange={(e) => setBranchForm({ ...branchForm, branchName: e.target.value })} className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border bg-white outline-none focus:border-brand-gold-premium text-sm" />
                      </label>
                      <label className="block">
                        <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary">Partner Name</span>
                        <input value={branchForm.partnerName} onChange={(e) => setBranchForm({ ...branchForm, partnerName: e.target.value })} className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border bg-white outline-none focus:border-brand-gold-premium text-sm" />
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="block">
                        <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary">Branch Manager</span>
                        <input value={branchForm.manager} onChange={(e) => setBranchForm({ ...branchForm, manager: e.target.value })} className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border bg-white outline-none focus:border-brand-gold-premium text-sm" />
                      </label>
                      <label className="block">
                        <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary">Phone Number</span>
                        <input type="tel" value={branchForm.phone} onChange={(e) => setBranchForm({ ...branchForm, phone: e.target.value })} className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border bg-white outline-none focus:border-brand-gold-premium text-sm" />
                      </label>
                    </div>
                    <label className="block">
                      <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary">Location / Address Details</span>
                      <input value={branchForm.location} onChange={(e) => setBranchForm({ ...branchForm, location: e.target.value })} className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border bg-white outline-none focus:border-brand-gold-premium text-sm" />
                    </label>
                  </>
                )}

                {error && (
                  <div className="text-[12px] text-red-600 text-center bg-red-50 border border-red-200 rounded-lg py-2 px-3">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full mt-6 h-11 bg-brand-green-primary text-white font-semibold text-xs uppercase tracking-[0.22em] rounded-lg hover:bg-brand-green-secondary transition-colors"
                >
                  Submit Application
                </button>
              </form>
            ) : (
              <div className="text-center py-6 text-text-primary">
                <CheckCircle size={56} className="text-brand-gold-premium mx-auto mb-4" />
                <h3 className="font-display text-2xl text-brand-green-primary">Application Submitted</h3>
                
                {activeModal === "customer" && (
                  <p className="text-sm text-text-secondary mt-3 leading-relaxed max-w-xs mx-auto text-center">
                    Customer Onboarding logged. Relationship Manager (RM) will verify your details and contact you within 24 hours to finalize KYC.
                  </p>
                )}
                
                {activeModal === "partner" && (
                  <p className="text-sm text-text-secondary mt-3 leading-relaxed max-w-xs mx-auto text-center">
                    Partner registration logged. Status: <span className="font-semibold text-brand-gold-rich text-center">Pending Approval</span>. Our regional director will schedule a call to verify your GST and finalize agreements.
                  </p>
                )}

                {activeModal === "branch" && (
                  <p className="text-sm text-text-secondary mt-3 leading-relaxed max-w-xs mx-auto text-center">
                    Branch Registration Logged. Status: <span className="font-semibold text-brand-gold-rich text-center">Pending Verification</span>. We will review location parameters and contact the partner manager.
                  </p>
                )}

                <button
                  onClick={() => setActiveModal("")}
                  className="mt-8 h-10 px-6 rounded-lg bg-brand-gold-premium text-brand-green-primary font-semibold text-xs uppercase tracking-[0.2em] hover:bg-brand-gold-rich transition-colors"
                >
                  Close Desk
                </button>
              </div>
            )}
          </Card>
        </div>
      )}
    </>
  );
}
