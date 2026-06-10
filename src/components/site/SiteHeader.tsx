import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/platform", label: "Platform" },
  { to: "/partners", label: "Partners" },
  { to: "/roadmap", label: "Roadmap" },
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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[color:var(--emerald-deep)]/85 border-b border-[color:var(--color-border)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-[color:var(--color-gold)]/60 text-gold font-display text-xl">
            A
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl tracking-wide">2PlusFortuneAliances</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold/80">
              Distribution Network
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="relative text-sm font-medium text-foreground/85 hover:text-gold transition-colors"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/contact" className="btn-ghost-gold px-4 py-2 rounded-sm text-xs uppercase tracking-[0.18em]">
            Partner Login
          </Link>
          <Link to="/contact" className="btn-gold px-4 py-2 rounded-sm text-xs uppercase tracking-[0.18em] font-semibold">
            Request Demo
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="lg:hidden text-gold"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[color:var(--color-border)] bg-[color:var(--emerald-forest)]">
          <div className="px-6 py-4 flex flex-col gap-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium hover:text-gold"
                activeProps={{ className: "text-gold" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-gold mt-2 px-4 py-2 rounded-sm text-xs uppercase tracking-[0.18em] font-semibold text-center">
              Request Demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}