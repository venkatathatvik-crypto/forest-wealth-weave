import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/fortune-alliances-logo.png.asset.json";

export function SiteFooter() {
  return (
    <footer className="bg-emerald text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-12 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <img
            src={logoAsset.url}
            alt="2 Plus Fortune Alliances"
            className="h-14 w-auto object-contain"
            loading="lazy"
            decoding="async"
          />
          <p className="mt-5 text-sm text-white/75 leading-relaxed max-w-xs">
            2 Plus Fortune Alliances Pvt Ltd — bridging premium brands with rural, semi-urban
            and urban India through a multi-brand aggregation and last-mile distribution model.
          </p>
        </div>

        {[
          {
            title: "Company",
            links: [
              ["About 2+FAPL", "/about"],
              ["Founder", "/about"],
              ["Leadership", "/about"],
              ["Contact", "/contact"],
            ],
          },
          {
            title: "Business",
            links: [
              ["Business Model", "/platform"],
              ["Digital Initiatives", "/platform"],
              ["Distribution Channels", "/"],
              ["Upcoming Additions", "/roadmap"],
            ],
          },
          {
            title: "Network",
            links: [
              ["Manufacturing Brands", "/partners"],
              ["Business Partners", "/partners"],
              ["Branches", "/partners"],
              ["Partner Login", "/login"],
            ],
          },
        ].map((col) => (
          <div key={col.title}>
            <div className="text-xs uppercase tracking-[0.25em] text-gold mb-5">
              {col.title}
            </div>
            <ul className="space-y-3">
              {col.links.map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-white/80 hover:text-gold transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="gold-divider opacity-40" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/65">
          © {new Date().getFullYear()} 2 Plus Fortune Alliances Private Limited. All rights reserved.
        </p>
        <p className="text-xs text-white/65 tracking-wider uppercase">
          Hyderabad · India · www.2plusfortunealliances.com
        </p>
      </div>
    </footer>
  );
}