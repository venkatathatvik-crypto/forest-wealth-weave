import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[color:var(--color-border)] bg-[color:var(--emerald-forest)]/70">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-12 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-[color:var(--color-gold)]/60 text-gold font-display text-xl">
              A
            </span>
            <span className="font-display text-xl">2PlusFortuneAliances</span>
          </div>
          <p className="mt-5 text-sm text-foreground/70 leading-relaxed max-w-xs">
            India's enterprise distribution backbone — connecting manufacturers, institutions and last-mile branches.
          </p>
        </div>

        {[
          {
            title: "Platform",
            links: [
              ["Distribution OS", "/platform"],
              ["Gold EMI Module", "/platform"],
              ["Partner Console", "/platform"],
              ["Analytics Suite", "/platform"],
            ],
          },
          {
            title: "Network",
            links: [
              ["Manufacturers", "/partners"],
              ["Financial Alliances", "/partners"],
              ["Branches", "/partners"],
              ["Customers", "/about"],
            ],
          },
          {
            title: "Company",
            links: [
              ["About", "/about"],
              ["Roadmap", "/roadmap"],
              ["Contact", "/contact"],
              ["Press", "/about"],
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
                  <Link to={to} className="text-sm text-foreground/80 hover:text-gold transition-colors">
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
        <p className="text-xs text-foreground/60">
          © {new Date().getFullYear()} 2PlusFortuneAliances Distribution Networks Pvt. Ltd. All rights reserved.
        </p>
        <p className="text-xs text-foreground/60 tracking-wider uppercase">
          Registered with SEBI · ISO 27001 · RBI Compliant
        </p>
      </div>
    </footer>
  );
}