import { type ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
}

/**
 * Shared hero section matching the home page green banner style.
 * Used on all public-facing site pages.
 */
export function PageHero({ eyebrow, title, subtitle, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-green-primary text-white">
      {/* radial gold glow top-right */}
      <div className="absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.22),transparent_55%)]" />
      {/* subtle gold grid overlay */}
      <div
        className="absolute inset-0 -z-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,162,39,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-14 lg:pt-20 pb-16 lg:pb-24">
        {/* eyebrow badge */}
        <div className="inline-flex items-center gap-3 rounded-lg border border-brand-gold-premium/40 bg-white/5 backdrop-blur px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-brand-gold-premium">
          <span className="h-1 w-1 rounded-full bg-brand-gold-premium" />
          {eyebrow}
        </div>

        {/* headline */}
        <h1 className="mt-6 font-display text-[40px] sm:text-5xl lg:text-6xl leading-[1.05] text-white max-w-4xl">
          {title}
        </h1>

        {/* optional subtitle */}
        {subtitle && (
          <p className="mt-6 max-w-2xl text-base lg:text-lg text-white/75 leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* optional extra content (CTAs, stats, etc.) */}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
