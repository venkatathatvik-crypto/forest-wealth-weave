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
              { label: "About 2+FAPL", to: "/about" },
              { label: "Founder", to: "/about" },
              { label: "Leadership", to: "/about" },
              { label: "Contact", to: "/contact" },
            ],
          },
          {
            title: "Business",
            links: [
              { label: "Business Model", to: "/platform" },
              { label: "Digital Initiatives", to: "/platform" },
              { label: "Distribution Channels", to: "/" },
              { label: "Upcoming Additions", to: "/roadmap" },
            ],
          },
          {
            title: "Network",
            links: [
              { label: "Manufacturing Brands", to: "/partners" },
              { label: "Business Partners", to: "/partners" },
              { label: "Branches", to: "/partners" },
              { label: "Customer Login", to: "/login", search: { role: "customer" } },
              { label: "Partner Login", to: "/login", search: { role: "partner" } },
            ],
          },
        ].map((col) => (
          <div key={col.title}>
            <div className="text-xs uppercase tracking-[0.25em] text-gold mb-5">
              {col.title}
            </div>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} search={link.search} className="text-sm text-white/80 hover:text-gold transition-colors">
                    {link.label}
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