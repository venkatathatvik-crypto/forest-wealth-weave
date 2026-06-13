import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/fortune-alliances-logo.png.asset.json";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/platform", label: "Business Model" },
  { to: "/partners", label: "Brands & Partners" },
  { to: "/roadmap", label: "Upcoming" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 bg-white ${
        scrolled
          ? "border-b border-[color:var(--color-border)] shadow-[0_2px_20px_-12px_rgba(11,61,46,0.18)]"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group" aria-label="2+FAPL — Home">
          <div className="h-12 lg:h-14 rounded-sm bg-emerald grid place-items-center px-2">
            <img
              src={logoAsset.url}
              alt="2 Plus Fortune Alliances"
              className="h-10 lg:h-12 w-auto object-contain"
              loading="eager"
              decoding="async"
            />
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="font-display text-lg text-emerald">2+ Fortune Alliances</div>
            <div className="text-[9px] uppercase tracking-[0.28em] text-gold">Onwards & Upwards</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="relative text-sm font-medium text-emerald hover:text-gold transition-colors"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/login" className="btn-ghost-gold px-4 py-2 rounded-sm text-xs uppercase tracking-[0.18em] font-semibold">
            Partner Login
          </Link>
          <Link to="/contact" className="btn-emerald px-4 py-2 rounded-sm text-xs uppercase tracking-[0.18em] font-semibold">
            Contact Us
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="lg:hidden text-emerald"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[color:var(--color-border)] bg-white">
          <div className="px-6 py-4 flex flex-col gap-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium text-emerald hover:text-gold"
                activeProps={{ className: "text-gold" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-emerald mt-2 px-4 py-2 rounded-sm text-xs uppercase tracking-[0.18em] font-semibold text-center">
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}