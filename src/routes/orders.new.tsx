import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { customers, goldProducts, goldRateINR, inr } from "@/lib/mock/data";
import { Check, ChevronRight, ChevronLeft, Search, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/orders/new")({
  head: () => ({ meta: [{ title: "Create Order — 2PlusFortuneAliances" }] }),
  component: NewOrderPage,
});

const STEPS = ["Customer", "Product", "Quantity", "Review", "Confirm"] as const;

function NewOrderPage() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [q, setQ] = useState("");
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [productId, setProductId] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [placed, setPlaced] = useState(false);

  const customer = customers.find((c) => c.id === customerId);
  const product = goldProducts.find((p) => p.id === productId);
  const subtotal = product ? Math.round(goldRateINR * product.weight * (1 + product.premium / 100) * qty) : 0;

  const canNext =
    (step === 0 && !!customer) ||
    (step === 1 && !!product) ||
    (step === 2 && qty > 0) ||
    step >= 3;

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else {
      setPlaced(true);
    }
  };

  const filteredCustomers = useMemo(
    () => customers.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.phone.includes(q) || c.id.includes(q)),
    [q],
  );

  return (
    <AppShell title="Create New Gold Order" subtitle="5-step operational workflow · Augmont-ready">
      <div className="glass-card rounded-md p-5 mb-5">
        <div className="flex items-center justify-between gap-2 overflow-x-auto">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1 min-w-0">
              <div className={`h-7 w-7 grid place-items-center rounded-full text-[11px] font-semibold ${i < step ? "bg-[color:var(--color-gold)] text-[color:var(--emerald-deep)]" : i === step ? "bg-[color:var(--color-gold)]/15 text-gold border border-[color:var(--color-gold)]" : "bg-[color:var(--emerald-forest)]/60 text-foreground/40 border border-[color:var(--color-border)]"}`}>
                {i < step ? <Check size={12} /> : i + 1}
              </div>
              <div className={`text-[11px] uppercase tracking-[0.18em] whitespace-nowrap ${i === step ? "text-gold" : "text-foreground/55"}`}>{s}</div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-px ${i < step ? "bg-[color:var(--color-gold)]" : "bg-[color:var(--color-border)]"}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-md p-6 min-h-[360px]">
        {step === 0 && (
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-gold/80">Step 1</div>
            <h2 className="font-display text-2xl mt-1">Select Customer</h2>
            <div className="flex items-center gap-2 px-3 h-10 rounded-sm border border-[color:var(--color-border)] bg-[color:var(--emerald-forest)]/40 w-full max-w-sm mt-4">
              <Search size={14} className="text-foreground/50" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, phone or ID…" className="bg-transparent outline-none text-sm flex-1" />
            </div>
            <div className="grid md:grid-cols-2 gap-2 mt-4">
              {filteredCustomers.map((c) => (
                <button key={c.id} onClick={() => setCustomerId(c.id)} className={`text-left p-3 rounded-sm border transition ${customerId === c.id ? "border-[color:var(--color-gold)] bg-[color:var(--color-gold)]/10" : "border-[color:var(--color-border)] hover:border-[color:var(--color-gold)]/50"}`}>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">{c.name}</div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-gold">{c.kyc}</div>
                  </div>
                  <div className="text-[11px] text-foreground/55 mt-0.5">{c.id} · {c.phone} · {c.city}</div>
                </button>
              ))}
            </div>
          </div>
        )}
        {step === 1 && (
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-gold/80">Step 2</div>
            <h2 className="font-display text-2xl mt-1">Select Product</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
              {goldProducts.map((p) => {
                const active = productId === p.id;
                const price = Math.round(goldRateINR * p.weight * (1 + p.premium / 100));
                return (
                  <button key={p.id} onClick={() => setProductId(p.id)} className={`text-left p-4 rounded-sm border transition ${active ? "border-[color:var(--color-gold)] bg-[color:var(--color-gold)]/10" : "border-[color:var(--color-border)] hover:border-[color:var(--color-gold)]/50"}`}>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-gold/80">{p.purity} · {p.type}</div>
                    <div className="font-display text-lg mt-1">{p.name}</div>
                    <div className="text-[11px] text-foreground/55">{p.weight}g · stock {p.stock}</div>
                    <div className="font-display text-xl text-gold mt-2">{inr(price)}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-gold/80">Step 3</div>
            <h2 className="font-display text-2xl mt-1">Select Quantity</h2>
            <div className="mt-5 flex items-center gap-4">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-10 w-10 rounded-sm border border-[color:var(--color-border)]">−</button>
              <div className="font-display text-4xl w-20 text-center">{qty}</div>
              <button onClick={() => setQty(qty + 1)} className="h-10 w-10 rounded-sm border border-[color:var(--color-border)]">+</button>
              <div className="ml-4 text-sm text-foreground/70">
                {product ? <>Total weight <span className="text-gold">{(product.weight * qty).toFixed(1)} g</span> · Estimated <span className="text-gold">{inr(subtotal)}</span></> : "Select a product first"}
              </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-gold/80">Step 4</div>
            <h2 className="font-display text-2xl mt-1">Review Order</h2>
            <div className="mt-5 grid md:grid-cols-2 gap-4">
              <Block label="Customer">
                <div className="text-sm">{customer?.name}</div>
                <div className="text-[11px] text-foreground/55">{customer?.id} · {customer?.phone}</div>
              </Block>
              <Block label="Product">
                <div className="text-sm">{product?.name}</div>
                <div className="text-[11px] text-foreground/55">{product?.purity} · {product?.weight}g</div>
              </Block>
              <Block label="Quantity">
                <div className="font-display text-xl">{qty}</div>
              </Block>
              <Block label="Total Amount">
                <div className="font-display text-2xl text-gold">{inr(subtotal)}</div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/50 mt-1">Locked at ₹{goldRateINR}/g · valid 5 min</div>
              </Block>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="text-center py-10">
            <div className="h-16 w-16 mx-auto rounded-full bg-[color:var(--color-gold)]/15 grid place-items-center text-gold">
              <ShoppingBag size={26} />
            </div>
            <h2 className="font-display text-3xl mt-4">{placed ? "Order placed" : "Confirm & Place Order"}</h2>
            <p className="text-sm text-foreground/65 mt-2 max-w-md mx-auto">
              {placed
                ? `Order for ${customer?.name} secured at ${inr(subtotal)}. Augmont fulfilment workflow will execute on backend integration.`
                : "On submission this will be routed via the backend → Augmont API → fulfilment vault."}
            </p>
            {placed && (
              <button onClick={() => nav({ to: "/orders" })} className="btn-gold mt-6 h-10 px-6 rounded-sm text-xs uppercase tracking-[0.22em] font-semibold">
                View Orders
              </button>
            )}
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0 || placed} className="h-10 px-4 rounded-sm text-xs uppercase tracking-[0.18em] border border-[color:var(--color-border)] inline-flex items-center gap-1.5 disabled:opacity-40">
          <ChevronLeft size={14} /> Back
        </button>
        {!placed && (
          <button onClick={next} disabled={!canNext} className="btn-gold h-10 px-5 rounded-sm text-xs uppercase tracking-[0.18em] font-semibold inline-flex items-center gap-1.5 disabled:opacity-40">
            {step === STEPS.length - 1 ? "Place Order" : "Continue"} <ChevronRight size={14} />
          </button>
        )}
      </div>
    </AppShell>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-sm border border-[color:var(--color-border)] bg-[color:var(--emerald-forest)]/40 p-4">
      <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/55">{label}</div>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}