import { createFileRoute, Link } from "@tanstack/react-router";
import { EcosystemNetwork } from "@/components/site/EcosystemNetwork";
import { Megaphone, MessageCircle, Target, Smartphone, Share2, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/platform")({
  head: () => ({
    meta: [
      { title: "Business Model & Digital Initiatives — 2+FAPL" },
      { name: "description", content: "The 2+FAPL aggregator business model and digital initiatives — from manufacturer to customer via partners, branches and financial institutions." },
      { property: "og:title", content: "Business Model & Digital Initiatives — 2+FAPL" },
      { property: "og:description", content: "The 2+FAPL aggregator business model and digital initiatives — from manufacturer to customer via partners, branches and financial institutions." },
    ],
  }),
  component: PlatformPage,
});

const digital = [
  { n: "01", icon: Megaphone, title: "Digital Marketing", body: "Build brand awareness, engage audiences and drive conversions through smart digital campaigns." },
  { n: "02", icon: MessageCircle, title: "WhatsApp Commerce", body: "Connect, communicate and convert customers seamlessly on the world's most trusted messaging platform." },
  { n: "03", icon: Target, title: "Lead Generation", body: "Generate high-quality leads consistently and build a strong sales pipeline." },
  { n: "04", icon: Smartphone, title: "Mobile Ordering App", body: "Simplify ordering, enhance customer experience and drive repeat business." },
  { n: "05", icon: Share2, title: "Social Media Visibility", body: "Strengthen reach and recall across digital channels with consistent, premium presence." },
  { n: "06", icon: BarChart3, title: "Data Insights & Analytics", body: "Make smarter decisions with real-time insights and data-driven strategies for sustainable growth." },
];

const flowSteps = [
  "Indent received from NBFC Partner",
  "2+FAPL processes and confirms order",
  "Manufacturer dispatches from anywhere in India",
  "Goods received at 2+FAPL State Warehouses",
  "Dispatch to NBFC Partner Branches",
  "Branch checks for damage / defects",
  "Confirmation of delivery to end customer",
];

function PlatformPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-14 bg-white">
        <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Business Model</div>
        <h1 className="font-display text-5xl lg:text-7xl mt-5 max-w-4xl leading-[1.05] text-emerald">
          The 2+FAPL <span className="text-gradient-gold">aggregator</span> model.
        </h1>
        <p className="mt-7 max-w-3xl text-lg text-muted-foreground leading-relaxed">
          We operate as an intermediary bridging brands and rural markets — optimising logistics,
          warehousing and last-mile delivery through partnerships with MFIs, NBFCs, cooperative societies,
          Section 8 companies, trusts and foundations.
        </p>
      </section>

      {/* ECOSYSTEM */}
      <section className="section-offwhite">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div className="card-gold rounded-md p-6 lg:p-8 bg-white">
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold mb-4">Distribution Ecosystem</div>
            <EcosystemNetwork />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Six-Tier Flow</div>
            <h2 className="font-display text-4xl mt-4 text-emerald leading-tight">
              From manufacturers to last-mile customers.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Our distribution flow connects manufacturers and OEMs to end consumers in rural,
              semi-urban and urban India through a structured chain of aggregators, financial
              institutions, partners and branches.
            </p>
          </div>
        </div>
      </section>

      {/* SUPPLY FLOW */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 bg-white">
        <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Product Supply — End-to-End Flow</div>
        <h2 className="font-display text-4xl lg:text-5xl mt-4 text-emerald max-w-3xl leading-tight">
          Indent. Procure. Warehouse. Deliver. Confirm.
        </h2>
        <ol className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {flowSteps.map((step, i) => (
            <li key={step} className="card-gold rounded-md p-6">
              <div className="font-display text-3xl text-gold">{String(i + 1).padStart(2, "0")}</div>
              <p className="mt-3 text-sm text-emerald leading-snug">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* DIGITAL INITIATIVES */}
      <section className="section-offwhite">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Digital Initiatives</div>
          <h2 className="font-display text-4xl lg:text-5xl mt-4 text-emerald max-w-3xl leading-tight">
            Embracing digital. Empowering growth. Creating value.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {digital.map(({ n, icon: Icon, title, body }) => (
              <div key={title} className="card-gold rounded-md p-7 bg-white">
                <div className="flex items-center justify-between">
                  <Icon className="text-gold" size={22} />
                  <span className="font-display text-2xl text-gold/70">{n}</span>
                </div>
                <h3 className="font-display text-xl mt-5 text-emerald leading-snug">{title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 flex flex-col lg:flex-row items-center justify-between gap-6">
          <h3 className="font-display text-3xl text-white max-w-2xl">
            Curious about partnership opportunities with 2+FAPL?
          </h3>
          <Link to="/contact" className="btn-gold rounded-sm px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em]">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}