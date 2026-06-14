import { useEffect, useState } from "react";
import { goldRateINR } from "@/lib/mock/data";
import { TrendingUp, Wifi } from "lucide-react";

export function LiveGoldRate({ compact = false }: { compact?: boolean }) {
  const [rate, setRate] = useState(goldRateINR);
  const [stamp, setStamp] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => {
      setRate((r) => Math.round(r + (Math.random() - 0.5) * 18));
      setStamp(new Date());
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="glass-card rounded-md p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(circle at 85% 15%, #D4AF37, transparent 55%)" }} />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-gold)] animate-pulse" /> Live Gold Rate · 24K
          </div>
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-foreground/55">
            <Wifi size={11} /> Augmont API · Sample
          </div>
        </div>
        <div className="flex items-end justify-between mt-3 flex-wrap gap-4">
          <div>
            <div className="font-display text-5xl lg:text-6xl leading-none">
              ₹ {rate.toLocaleString("en-IN")}
              <span className="text-base text-foreground/60"> / g</span>
            </div>
            <div className="text-[11px] text-foreground/65 mt-2 flex items-center gap-2">
              <TrendingUp size={12} className="text-gold" />
              Last updated {stamp.toLocaleTimeString("en-IN")} · 999 fineness · GST inclusive
            </div>
          </div>
          {!compact && (
            <div className="grid grid-cols-3 gap-3 text-xs">
              <Tile k="22K" v={`₹ ${Math.round(rate * 0.916).toLocaleString("en-IN")}`} />
              <Tile k="Silver" v={`₹ ${Math.round(rate * 0.012).toLocaleString("en-IN")}`} />
              <Tile k="Source" v="Augmont" gold />
            </div>
          )}
        </div>
        <div className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-foreground/55 border border-dashed border-[color:var(--color-border)] rounded-sm px-2.5 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          Reserved for real Augmont API integration
        </div>
      </div>
    </div>
  );
}

function Tile({ k, v, gold }: { k: string; v: string; gold?: boolean }) {
  return (
    <div className="rounded-sm border border-[color:var(--color-border)] bg-[color:var(--emerald-deep)]/60 p-2 min-w-[100px]">
      <div className="text-[9px] uppercase tracking-[0.2em] text-foreground/55">{k}</div>
      <div className={`mt-1 ${gold ? "text-gold" : ""}`}>{v}</div>
    </div>
  );
}