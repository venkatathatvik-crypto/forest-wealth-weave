const bars = [42, 68, 54, 81, 73, 92, 64, 88, 76, 95, 70, 84];

export function DashboardPreview() {
  return (
    <div className="glass-card rounded-md p-5 lg:p-7">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold/80">Distribution Console</div>
          <div className="font-display text-2xl mt-1">Network Performance</div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-foreground/60">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-gold)] animate-pulse" />
          Live · IST
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          ["GMV (₹ Cr)", "1,284", "+12.4%"],
          ["Active Branches", "9,612", "+318"],
          ["Disbursals", "₹ 412 Cr", "+8.1%"],
        ].map(([k, v, d]) => (
          <div key={k} className="rounded-sm border border-[color:var(--color-border)] bg-[color:var(--emerald-forest)]/60 p-3">
            <div className="text-[10px] uppercase tracking-[0.18em] text-foreground/55">{k}</div>
            <div className="font-display text-xl mt-1">{v}</div>
            <div className="text-[11px] text-gold mt-0.5">{d}</div>
          </div>
        ))}
      </div>

      <div className="rounded-sm border border-[color:var(--color-border)] bg-[color:var(--emerald-forest)]/40 p-4">
        <div className="flex items-end gap-1.5 h-32">
          {bars.map((b, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end">
              <div
                className="rounded-t-[2px]"
                style={{
                  height: `${b}%`,
                  background:
                    "linear-gradient(180deg, #F4D27A, #D4AF37 60%, #8C6B1F)",
                  boxShadow: "0 0 12px rgba(212,175,55,0.25)",
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-3 text-[10px] tracking-widest text-foreground/50 uppercase">
          <span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span><span>Dec</span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-sm border border-[color:var(--color-border)] p-3">
          <div className="text-[10px] uppercase tracking-[0.18em] text-foreground/55">Top State</div>
          <div className="font-display text-lg mt-1">Maharashtra</div>
          <div className="h-1 rounded-full bg-[color:var(--color-border)] mt-2 overflow-hidden">
            <div className="h-full w-[78%] bg-[color:var(--color-gold)]" />
          </div>
        </div>
        <div className="rounded-sm border border-[color:var(--color-border)] p-3">
          <div className="text-[10px] uppercase tracking-[0.18em] text-foreground/55">Gold EMI Book</div>
          <div className="font-display text-lg mt-1">₹ 1,932 Cr</div>
          <div className="h-1 rounded-full bg-[color:var(--color-border)] mt-2 overflow-hidden">
            <div className="h-full w-[62%] bg-[color:var(--color-gold)]" />
          </div>
        </div>
      </div>
    </div>
  );
}