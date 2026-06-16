import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { goldProducts, goldRateINR, inr } from "@/lib/mock/data";
import { TrendingUp, ShoppingBag, X } from "lucide-react";

export const Route = createFileRoute("/gold-products")({
  head: () => ({ meta: [{ title: "Gold Products — 2PlusFortuneAliances" }] }),
  component: GoldProductsPage,
});

function GoldProductsPage() {
  const [rate, setRate] = useState(goldRateINR);
  const [purchase, setPurchase] = useState<{ name: string; total: number } | null>(null);

  useEffect(() => {
    const t = setInterval(() => setRate((r) => Math.round(r + (Math.random() - 0.5) * 18)), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <AppShell title="Gold Products" subtitle="Bullion catalog · live MCX-aligned pricing">
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1 glass-card rounded-md p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 70% 30%, #D4AF37, transparent 60%)" }} />
          <div className="relative">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-gold)] animate-pulse" /> Live · MCX
            </div>
            <div className="font-display text-5xl mt-3">₹ {rate.toLocaleString("en-IN")}<span className="text-base text-foreground/60"> / g</span></div>
            <div className="text-xs text-foreground/65 mt-2">24K · 999 fineness · GST inclusive</div>
            <div className="grid grid-cols-3 gap-3 mt-6 text-xs">
              <Tile k="22K" v={`₹ ${Math.round(rate * 0.916).toLocaleString("en-IN")}`} />
              <Tile k="Silver" v={`₹ ${Math.round(rate * 0.012).toLocaleString("en-IN")}`} />
              <Tile k="24h Δ" v="+0.42%" gold />
            </div>
            <div className="flex items-center gap-2 text-[11px] text-foreground/55 mt-5"><TrendingUp size={12} /> Updates every 3s · BIS hallmarked supply</div>
          </div>
        </div>

        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
          {goldProducts.map((p) => {
            const price = Math.round(rate * p.weight * (1 + p.premium / 100));
            return (
              <div key={p.id} className="glass-card rounded-md p-5 flex gap-4">
                <div className="h-20 w-20 shrink-0 rounded-sm grid place-items-center text-4xl" style={{ background: "linear-gradient(135deg, #2a1d08, #6b4f15)", boxShadow: "inset 0 0 20px rgba(212,175,55,0.3)" }}>
                  {p.type === "Bar" ? "▰" : p.type === "Digital" ? "⚡" : p.type === "EMI" ? "📅" : "●"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-gold/80">{p.purity} · {p.type}</div>
                  <div className="font-display text-lg mt-0.5 truncate">{p.name}</div>
                  <div className="text-[11px] text-foreground/55">{p.id} · {p.weight}g · stock {p.stock}</div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="font-display text-xl text-gold">{inr(price)}</div>
                    <button onClick={() => setPurchase({ name: p.name, total: price })} className="btn-gold h-9 px-3 rounded-sm text-[11px] uppercase tracking-[0.18em] font-semibold inline-flex items-center gap-1">
                      <ShoppingBag size={12} /> Buy Gold
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {purchase && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4">
          <div className="glass-card rounded-md w-full max-w-md p-6 bg-[color:var(--emerald-forest)] text-center">
            <button onClick={() => setPurchase(null)} className="absolute"><X /></button>
            <div className="text-6xl">🪙</div>
            <h3 className="font-display text-2xl mt-3">Order placed</h3>
            <p className="text-sm text-foreground/70 mt-2">{purchase.name} secured at <span className="text-gold">{inr(purchase.total)}</span>. Settlement T+1 via partner vault.</p>
            <button onClick={() => setPurchase(null)} className="btn-gold mt-5 h-10 px-5 rounded-sm text-xs uppercase tracking-[0.18em] font-semibold">Done</button>
          </div>
        </div>
      )}
    </AppShell>
  );
}

function Tile({ k, v, gold }: { k: string; v: string; gold?: boolean }) {
  return (
    <div className="rounded-sm border border-[color:var(--color-border)] bg-[color:var(--emerald-deep)]/60 p-2">
      <div className="text-[9px] uppercase tracking-[0.2em] text-foreground/55">{k}</div>
      <div className={`mt-1 ${gold ? "text-gold" : ""}`}>{v}</div>
    </div>
  );
}
