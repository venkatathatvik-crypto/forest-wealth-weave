import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Brands & Business Partners — 2+FAPL" },
      { name: "description", content: "Associated manufacturing brands and business partners working with 2 Plus Fortune Alliances across rural, retail, corporate and B2B channels." },
      { property: "og:title", content: "Brands & Business Partners — 2+FAPL" },
      { property: "og:description", content: "Associated manufacturing brands and business partners working with 2 Plus Fortune Alliances across rural, retail, corporate and B2B channels." },
    ],
  }),
  component: PartnersPage,
});

const brandCategories: { title: string; tagline: string; brands: string[] }[] = [
  {
    title: "Home & Kitchen Appliances",
    tagline: "Partnering for quality. Delivering trust.",
    brands: ["Prestige", "Pigeon", "Rico", "Orient Electric", "Crompton", "Bajaj Electricals", "Whirlpool", "LG", "Godrej", "Haier", "Hesa", "Hi-Tech", "Komaki", "Augmont", "United"],
  },
  {
    title: "Electronics & Appliances",
    tagline: "Innovation. Trust. Excellence.",
    brands: ["Samsung", "Vivo", "IFB", "Akai", "d.light", "Sun King", "Third Wave Power", "Kent Mineral RO", "Usha", "Philips", "Lenovo", "HP"],
  },
  {
    title: "Lifestyle, Mobility & Other Solutions",
    tagline: "One network. Many possibilities.",
    brands: ["Sampy", "Singer", "Copper Master", "Easy 2 Learn", "Ion Exchange", "Luminous", "Borosil", "Cello", "Jaypee"],
  },
];

const businessPartners = [
  "Sugmya Finance MFI", "Vedika Credit Capital", "HESA Consumer Products Pvt Ltd",
  "South India Finvest Pvt Ltd (SIF Access Pvt Ltd)", "Navachethana MFI", "Maximal Finance & Investments",
  "Navodit Foundation", "Investment Trust of India", "Aarthsiddhi Services Pvt Ltd",
  "PJ Aruvi Finance", "Sangamam Foundation", "Utthejana Trading & Services Pvt Ltd",
  "The Pavagada Souharda Multipurpose Co-op Ltd", "Suyoga Coop. Society", "Chhaya Foundation",
  "Gnanashale Coop. Society", "Anandam Finance", "Jeevan Abhivriddhi Benefit Nidhi",
];

function PartnersPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-14">
        <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Brands & Partners</div>
        <h1 className="font-display text-5xl lg:text-6xl mt-5 max-w-4xl leading-[1.05] text-emerald">
          Associated manufacturing brands and <span className="text-gradient-gold">trusted business partners</span>.
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground leading-relaxed">
          2+FAPL collaborates with leading OEMs and a network of rural financial institutions,
          cooperative societies, NBFCs, foundations and trusts to deliver quality products across India.
        </p>
      </section>

      {brandCategories.map((cat, idx) => (
        <section key={cat.title} className={`${idx % 2 === 1 ? "section-offwhite" : ""}`}>
          <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-gold">{`0${idx + 1}`} · Category</div>
                <h2 className="font-display text-3xl lg:text-4xl mt-3 text-emerald">{cat.title}</h2>
              </div>
              <p className="text-sm text-muted-foreground italic">{cat.tagline}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {cat.brands.map((b) => (
                <div
                  key={b}
                  className="bg-white border border-[color:var(--color-border)] rounded-sm h-24 grid place-items-center text-center px-3 hover:border-[color:var(--color-gold)] hover:shadow-md transition"
                >
                  <span className="font-display text-lg text-emerald">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section-offwhite">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Our Business Partners</div>
          <h2 className="font-display text-4xl lg:text-5xl mt-4 text-emerald max-w-3xl leading-tight">
            Financial institutions, foundations and cooperatives powering last-mile reach.
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {businessPartners.map((p) => (
              <div key={p} className="card-gold rounded-sm p-5">
                <div className="text-[10px] uppercase tracking-[0.22em] text-gold mb-2">Partner</div>
                <div className="font-display text-lg text-emerald leading-snug">{p}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}