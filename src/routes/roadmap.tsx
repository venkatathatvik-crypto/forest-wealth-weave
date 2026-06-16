import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Upcoming Additions — 2+FAPL" },
      { name: "description", content: "Expanding our portfolio. Enriching lives. New product categories planned for the 2+FAPL distribution network." },
      { property: "og:title", content: "Upcoming Additions — 2+FAPL" },
      { property: "og:description", content: "Expanding our portfolio. Enriching lives. New product categories planned for the 2+FAPL distribution network." },
    ],
  }),
  component: RoadmapPage,
});

const upcoming = [
  { n: "01", t: "Gold Ornaments & Coins", b: "Premium gold jewellery and bullion offerings — trust, prosperity, growth." },
  { n: "02", t: "Copper Utensils", b: "Health & wellness range — copper bottles, cookware and serveware." },
  { n: "03", t: "E-Bikes & E-Loaders", b: "Sustainable mobility solutions for last-mile and personal transport." },
  { n: "04", t: "Electricity Saving Instruments", b: "Energy-efficient products supporting cost savings and sustainability." },
  { n: "05", t: "FMCG — Grains, Spices, Masala", b: "Pulses, grains, spices and masalas for everyday household needs." },
  { n: "06", t: "Education Tools", b: "Classes 6th–12th across CBSE / ICSE / State Board, plus engineering learning kits." },
];

function RoadmapPage() {
  return (
    <>
      <PageHero
        eyebrow="Upcoming Additions · Growing Portfolio"
        title={<>Expanding our portfolio. <span className="text-brand-gold-premium">Enriching lives.</span></>}
        subtitle="Building a better tomorrow with new product categories planned for the 2+FAPL distribution network — diverse portfolio, new opportunities, stronger impact and sustainable growth."
      />

      <section className="section-offwhite">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {upcoming.map((u) => (
            <div key={u.n} className="card-gold rounded-md p-7 bg-white">
              <div className="font-display text-3xl text-gold">{u.n}</div>
              <h3 className="font-display text-xl mt-4 text-emerald leading-snug">{u.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{u.b}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-10 pb-16">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.25em] text-gold">
            <span>Diverse Portfolio</span>
            <span className="opacity-40">·</span>
            <span>New Opportunities</span>
            <span className="opacity-40">·</span>
            <span>Stronger Impact</span>
            <span className="opacity-40">·</span>
            <span>Sustainable Growth</span>
          </div>
        </div>
      </section>
    </>
  );
}