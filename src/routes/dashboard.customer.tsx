import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { useAuth } from "@/lib/mock/auth";
import { Card } from "@/components/ui/card";
import { StatusPill } from "@/components/dashboard/widgets";
import { customers, orders, goldRateINR, inr } from "@/lib/mock/data";
import {
  Coins, ShoppingCart, ShieldAlert, Award, PhoneCall,
  Sparkles, ShieldCheck, MapPin, Truck, RefreshCw, X
} from "lucide-react";

export const Route = createFileRoute("/dashboard/customer")({
  head: () => ({ meta: [{ title: "Customer Dashboard — 2PlusFortuneAliances" }] }),
  component: CustomerDashboard,
});

type RedemptionOption = {
  formFactor: "coin" | "bar" | "";
  deliveryMethod: "home" | "pickup" | "";
  weight: number;
  address: string;
};

function CustomerDashboard() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [rate, setRate] = useState(goldRateINR);

  // Live gold rate updater
  useEffect(() => {
    const t = setInterval(() => setRate((r) => Math.round(r + (Math.random() - 0.5) * 18)), 3000);
    return () => clearInterval(t);
  }, []);

  // Look up customer details in database
  const customerProfile = customers.find(
    (c) => c.name.toLowerCase() === (user?.name || "").toLowerCase()
  ) || {
    id: "C-90211",
    name: user?.name || "Aarav Mehta",
    phone: "+91 98201 12345",
    city: "Mumbai",
    kyc: "Verified" as const,
    branch: "B-50211",
    gold: 42.5,
    joined: "2025-09-12"
  };

  // Look up relationship & branch details
  const branchDetails = {
    "B-50211": { name: "Andheri East Hub", partner: "Meridian Capital Partners", rm: "Anika Shah" },
    "B-50212": { name: "Indiranagar Centre", partner: "Coromandel Financial Network", rm: "Karthik Iyer" },
    "B-50213": { name: "Sector 18 Outlet", partner: "Saraswati Distributors", rm: "Priya Sinha" },
    "B-50214": { name: "Banjara Hills Desk", partner: "Coromandel Financial Network", rm: "Rahul Reddy" },
    "B-50215": { name: "Salt Lake Sector V", partner: "Saraswati Distributors", rm: "Anjali Bose" },
    "B-50216": { name: "Koregaon Park Branch", partner: "Meridian Capital Partners", rm: "Devansh Patil" },
    "B-50217": { name: "MG Road Counter", partner: "Konkan Retail Trust", rm: "Sneha D'Souza" }
  }[customerProfile.branch] || { name: "Andheri East Hub", partner: "Meridian Capital Partners", rm: "Anika Shah" };

  // Calculate values
  const totalGold = customerProfile.gold;
  const currentValue = Math.round(totalGold * rate);

  // Filter orders for recent transactions
  const myOrders = orders.filter(
    (o) => o.customer.toLowerCase() === customerProfile.name.toLowerCase()
  );

  // Redemption state
  const [redemptions, setRedemptions] = useState<{ id: string; item: string; method: string; date: string; status: string }[]>([
    { id: "RDM-774021", item: "Heritage 5g Coin", method: "Store Pickup", date: "2026-06-02", status: "Completed" }
  ]);
  const [redeemModalOpen, setRedeemModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RedemptionOption>({
    formFactor: "",
    deliveryMethod: "",
    weight: 1,
    address: ""
  });

  const handleRedemptionSubmit = () => {
    const newRedeem = {
      id: `RDM-${Math.floor(700000 + Math.random() * 200000)}`,
      item: `${formData.weight}g ${formData.formFactor === "coin" ? "Gold Coin" : "Gold Bar"}`,
      method: formData.deliveryMethod === "home" ? "Home Delivery" : "Store Pickup",
      date: new Date().toISOString().slice(0, 10),
      status: "Pending Approval"
    };
    setRedemptions([newRedeem, ...redemptions]);
    setStep(4);
  };

  return (
    <AppShell title="Customer Portal" subtitle="Portfolio dashboard · personal metal accounts">
      {/* 1. KEY PORTFOLIO METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 relative overflow-hidden bg-white border border-border shadow-sm">
          <div className="absolute right-0 top-0 h-16 w-16 bg-brand-gold-premium/5 rounded-bl-full flex items-center justify-center text-brand-gold-premium pl-4 pb-4">
            <Coins size={22} />
          </div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-text-secondary font-medium">Gold Holdings</div>
          <div className="font-display text-4xl mt-3 text-brand-green-primary">{totalGold.toFixed(2)} <span className="text-base font-sans text-text-secondary">grams</span></div>
          <div className="text-xs text-brand-gold-premium font-semibold mt-2">24K 999 Purity Certified</div>
        </Card>

        <Card className="p-6 relative overflow-hidden bg-white border border-border shadow-sm">
          <div className="absolute right-0 top-0 h-16 w-16 bg-brand-gold-premium/5 rounded-bl-full flex items-center justify-center text-brand-gold-premium pl-4 pb-4">
            <Award size={22} />
          </div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-text-secondary font-medium">Current Value</div>
          <div className="font-display text-4xl mt-3 text-brand-green-primary">{inr(currentValue)}</div>
          <div className="text-xs text-text-secondary mt-2">Valued at live market pricing</div>
        </Card>

        <Card className="p-6 relative overflow-hidden bg-white border border-border shadow-sm">
          <div className="absolute right-0 top-0 h-16 w-16 bg-brand-gold-premium/5 rounded-bl-full flex items-center justify-center text-brand-gold-premium pl-4 pb-4 animate-pulse">
            <RefreshCw size={18} />
          </div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-text-secondary font-medium">Last Updated Gold Rate</div>
          <div className="font-display text-4xl mt-3 text-brand-gold-premium">₹ {rate.toLocaleString("en-IN")}<span className="text-base font-sans text-text-secondary"> / g</span></div>
          <div className="text-xs text-text-secondary mt-2 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-brand-gold-premium animate-ping" /> Live MCX-aligned feed
          </div>
        </Card>
      </div>

      {/* 2. QUICK ACTIONS */}
      <div className="mb-8">
        <div className="text-[10px] uppercase tracking-[0.28em] text-brand-gold-premium/80 mb-4">Quick Actions</div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <button onClick={() => nav({ to: "/gold-products" })} className="p-5 text-left rounded-lg border border-border bg-white hover:border-brand-gold-premium/60 transition group shadow-sm">
            <div className="h-10 w-10 rounded-md bg-brand-gold-premium/10 text-brand-gold-premium grid place-items-center group-hover:bg-brand-gold-premium group-hover:text-brand-green-primary transition-colors">
              <Coins size={18} />
            </div>
            <div className="font-display text-lg mt-4 text-brand-green-primary">Buy Gold</div>
            <div className="text-xs text-text-secondary mt-1">Invest at live rates</div>
          </button>

          <button onClick={() => { setStep(1); setFormData({ formFactor: "", deliveryMethod: "", weight: 1, address: "" }); setRedeemModalOpen(true); }} className="p-5 text-left rounded-lg border border-border bg-white hover:border-brand-gold-premium/60 transition group shadow-sm">
            <div className="h-10 w-10 rounded-md bg-brand-gold-premium/10 text-brand-gold-premium grid place-items-center group-hover:bg-brand-gold-premium group-hover:text-brand-green-primary transition-colors">
              <Sparkles size={18} />
            </div>
            <div className="font-display text-lg mt-4 text-brand-green-primary">Redeem Gold</div>
            <div className="text-xs text-text-secondary mt-1">Request physical delivery</div>
          </button>

          <button onClick={() => nav({ to: "/orders" })} className="p-5 text-left rounded-lg border border-border bg-white hover:border-brand-gold-premium/60 transition group shadow-sm">
            <div className="h-10 w-10 rounded-md bg-brand-gold-premium/10 text-brand-gold-premium grid place-items-center group-hover:bg-brand-gold-premium group-hover:text-brand-green-primary transition-colors">
              <ShoppingCart size={18} />
            </div>
            <div className="font-display text-lg mt-4 text-brand-green-primary">View Orders</div>
            <div className="text-xs text-text-secondary mt-1">Track purchases & history</div>
          </button>

          <button onClick={() => nav({ to: "/contact" })} className="p-5 text-left rounded-lg border border-border bg-white hover:border-brand-gold-premium/60 transition group shadow-sm">
            <div className="h-10 w-10 rounded-md bg-brand-gold-premium/10 text-brand-gold-premium grid place-items-center group-hover:bg-brand-gold-premium group-hover:text-brand-green-primary transition-colors">
              <PhoneCall size={18} />
            </div>
            <div className="font-display text-lg mt-4 text-brand-green-primary">Contact Support</div>
            <div className="text-xs text-text-secondary mt-1">Reach out to branch counter</div>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* 3. PROFILE & ECOSYSTEM PARTNERS */}
        <Card className="p-6 lg:col-span-1 border border-border bg-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-brand-gold-premium/80 mb-4">My Account Details</div>
            <div className="space-y-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-text-secondary">Customer Name</div>
                <div className="font-display text-lg text-brand-green-primary mt-0.5">{customerProfile.name}</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-text-secondary">Customer ID</div>
                  <div className="text-sm font-medium mt-0.5">{customerProfile.id}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-text-secondary">Mobile</div>
                  <div className="text-sm font-medium mt-0.5">{customerProfile.phone}</div>
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-text-secondary">Email Address</div>
                <div className="text-sm font-medium mt-0.5">{user?.email}</div>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-6 pt-5 bg-brand-green-secondary/5 rounded-lg p-3">
            <div className="text-[9px] uppercase tracking-[0.25em] text-brand-gold-premium/80 mb-3 font-semibold">Ecosystem Connection</div>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-text-secondary">Distribution Partner:</span>
                <span className="font-semibold text-brand-green-primary">{branchDetails.partner}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Branch Counter:</span>
                <span className="font-semibold text-brand-green-primary">{branchDetails.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Relationship Manager:</span>
                <span className="font-semibold text-brand-gold-premium">{branchDetails.rm}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* 4. KYC STATUS */}
        <Card className="p-6 lg:col-span-1 border border-border bg-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-brand-gold-premium/80 mb-4">KYC Compliance Status</div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary">Verification status:</span>
              <StatusPill status={customerProfile.kyc} />
            </div>
            {customerProfile.kyc === "Verified" ? (
              <div className="space-y-3">
                <div className="flex gap-2.5 text-sm text-text-primary">
                  <ShieldCheck size={16} className="text-brand-gold-premium shrink-0 mt-0.5" />
                  <span>Your account is fully compliant with RBI regulations.</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">You have full access to buy, store, transfer, and redeem physical bullion products at our branches and partner counters.</p>
              </div>
            ) : customerProfile.kyc === "Pending" ? (
              <div className="space-y-3">
                <div className="flex gap-2.5 text-sm text-text-primary">
                  <ShieldAlert size={16} className="text-brand-gold-rich shrink-0 mt-0.5" />
                  <span>KYC audit in progress.</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">Our compliance team is verifying your Aadhaar / PAN card documents. Buy and redeem capabilities will be unlocked upon approval.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex gap-2.5 text-sm text-text-primary">
                  <ShieldAlert size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <span>KYC submission rejected.</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">Your proof of address did not match the registration details. Please re-submit documents via our settings profile desk or contact your RM {branchDetails.rm}.</p>
              </div>
            )}
          </div>
          <Link to="/settings" search={{ tab: "profile" }} className="w-full mt-6 h-10 border border-border hover:border-brand-gold-premium/60 transition-colors flex items-center justify-center text-xs uppercase tracking-[0.2em] font-semibold text-brand-green-primary rounded-lg bg-bg-section">
            View / Update KYC
          </Link>
        </Card>

        {/* 5. LIVE AUGMONT SPACE */}
        <Card className="p-6 lg:col-span-1 border border-border bg-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-brand-gold-premium/80 mb-3">Augmont API Integration</div>
            <div className="rounded-lg border border-dashed border-brand-gold-premium/30 p-4 bg-brand-gold-premium/5">
              <div className="flex items-center gap-2 text-xs font-semibold text-brand-gold-premium">
                <Sparkles size={14} className="animate-spin" /> Ready for Live Connection
              </div>
              <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                Vaulting, real-time settlement, and instant gold buy/sell rates will be driven via Augmont API channels.
              </p>
              <div className="mt-3 text-[10px] uppercase tracking-[0.18em] text-text-secondary/40 font-mono">
                API ENDPOINT: https://api.augmont.com/v1
              </div>
            </div>
          </div>
          <div className="text-xs text-text-secondary italic mt-4">
            Security: 256-bit encrypted credentials will authenticate transactions.
          </div>
        </Card>
      </div>

      {/* 6. RECENT TRANSACTIONS */}
      <Card className="p-6 border border-border bg-white shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="text-[10px] uppercase tracking-[0.28em] text-brand-gold-premium/80">Recent Activity Ledger</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-brand-green-secondary/15 text-[10px] uppercase tracking-[0.22em] text-text-secondary">
              <tr>
                <th className="text-left p-3">Transaction ID</th>
                <th className="text-left p-3">Type</th>
                <th className="text-left p-3">Details / Product</th>
                <th className="text-left p-3">Delivery Mode</th>
                <th className="text-left p-3">Date</th>
                <th className="text-right p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {myOrders.map((o) => (
                <tr key={o.id} className="hover:bg-bg-section text-xs">
                  <td className="p-3 font-semibold text-brand-green-primary">{o.id}</td>
                  <td className="p-3"><span className="px-2 py-0.5 text-[9px] uppercase tracking-[0.15em] font-medium bg-brand-gold-premium/15 text-brand-gold-premium rounded-full">Purchase</span></td>
                  <td className="p-3">{o.product} ({o.weight}g)</td>
                  <td className="p-3">Counter Delivery</td>
                  <td className="p-3 text-text-secondary">{o.date}</td>
                  <td className="p-3 text-right"><StatusPill status={o.status} /></td>
                </tr>
              ))}
              {redemptions.map((r) => (
                <tr key={r.id} className="hover:bg-bg-section text-xs">
                  <td className="p-3 font-semibold text-brand-green-primary">{r.id}</td>
                  <td className="p-3"><span className="px-2 py-0.5 text-[9px] uppercase tracking-[0.15em] font-medium bg-brand-green-secondary/25 text-brand-green-primary rounded-full">Redeem</span></td>
                  <td className="p-3">{r.item}</td>
                  <td className="p-3">{r.method}</td>
                  <td className="p-3 text-text-secondary">{r.date}</td>
                  <td className="p-3 text-right"><StatusPill status={r.status} /></td>
                </tr>
              ))}
              {myOrders.length === 0 && redemptions.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-text-secondary text-xs">No transactions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* REDEMPTION INTERACTIVE MODAL */}
      {redeemModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4">
          <Card className="w-full max-w-lg p-6 bg-background relative border border-border shadow-2xl text-text-primary">
            <button onClick={() => setRedeemModalOpen(false)} className="absolute right-4 top-4 text-text-secondary hover:text-text-primary">
              <X size={18} />
            </button>

            {step === 1 && (
              <div>
                <h3 className="font-display text-2xl text-brand-green-primary mb-2">Simulated Gold Redemption</h3>
                <p className="text-xs text-text-secondary mb-6">Convert your digital metal balance into physical certified bullion.</p>
                
                <div className="text-[10px] uppercase tracking-[0.2em] text-text-secondary mb-3">Step 1: Choose Gold Form Factor</div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setFormData({ ...formData, formFactor: "coin" })}
                    className={`p-5 rounded-lg border-2 text-left transition ${formData.formFactor === "coin" ? "border-brand-gold-premium bg-brand-gold-premium/5 animate-pulse" : "border-border hover:border-brand-gold-premium/30 bg-white"}`}
                  >
                    <div className="text-3xl">🪙</div>
                    <div className="font-display text-lg text-brand-green-primary mt-2">Physical Gold Coin</div>
                    <div className="text-xs text-text-secondary mt-1">Available in 1g, 5g, 10g</div>
                  </button>
                  <button
                    onClick={() => setFormData({ ...formData, formFactor: "bar" })}
                    className={`p-5 rounded-lg border-2 text-left transition ${formData.formFactor === "bar" ? "border-brand-gold-premium bg-brand-gold-premium/5 animate-pulse" : "border-border hover:border-brand-gold-premium/30 bg-white"}`}
                  >
                    <div className="text-3xl">▰</div>
                    <div className="font-display text-lg text-brand-green-primary mt-2">Gold Bar / Bullion</div>
                    <div className="text-xs text-text-secondary mt-1">Available in 50g, 100g</div>
                  </button>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    disabled={!formData.formFactor}
                    onClick={() => setStep(2)}
                    className="h-10 px-5 rounded-lg bg-brand-gold-premium text-brand-green-primary text-xs uppercase tracking-[0.2em] font-semibold hover:bg-brand-gold-rich transition-colors disabled:opacity-50"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="font-display text-2xl text-brand-green-primary mb-2">Delivery / Collection Method</h3>
                <p className="text-xs text-text-secondary mb-6">Select how you want to secure your physical gold coins or bars.</p>

                <div className="text-[10px] uppercase tracking-[0.2em] text-text-secondary mb-3">Step 2: Choose Fulfillment Channel</div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setFormData({ ...formData, deliveryMethod: "home" })}
                    className={`p-5 rounded-lg border-2 text-left transition ${formData.deliveryMethod === "home" ? "border-brand-gold-premium bg-brand-gold-premium/5" : "border-border hover:border-brand-gold-premium/30 bg-white"}`}
                  >
                    <Truck size={24} className="text-brand-gold-premium mb-2" />
                    <div className="font-display text-lg text-brand-green-primary">Insured Home Delivery</div>
                    <div className="text-xs text-text-secondary mt-1">Dispatched via secured transit</div>
                  </button>
                  <button
                    onClick={() => setFormData({ ...formData, deliveryMethod: "pickup" })}
                    className={`p-5 rounded-lg border-2 text-left transition ${formData.deliveryMethod === "pickup" ? "border-brand-gold-premium bg-brand-gold-premium/5" : "border-border hover:border-brand-gold-premium/30 bg-white"}`}
                  >
                    <MapPin size={24} className="text-brand-gold-premium mb-2" />
                    <div className="font-display text-lg text-brand-green-primary">Branch Counter Pickup</div>
                    <div className="text-xs text-text-secondary mt-1">Collect at {branchDetails.name}</div>
                  </button>
                </div>

                <div className="flex justify-between mt-6">
                  <button onClick={() => setStep(1)} className="h-10 px-5 rounded-lg border border-border text-xs uppercase tracking-[0.2em]">Back</button>
                  <button
                    disabled={!formData.deliveryMethod}
                    onClick={() => setStep(3)}
                    className="h-10 px-5 rounded-lg bg-brand-gold-premium text-brand-green-primary text-xs uppercase tracking-[0.2em] font-semibold hover:bg-brand-gold-rich transition-colors disabled:opacity-50"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="font-display text-2xl text-brand-green-primary mb-2">Redemption Details</h3>
                <p className="text-xs text-text-secondary mb-6">Confirm weight and addresses for fulfillment of gold bullion.</p>

                <div className="space-y-4">
                  <div>
                    <label className="block">
                      <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary">Weight to Redeem (grams)</span>
                      <select
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                        className="mt-1.5 w-full h-10 px-3 rounded-lg bg-white border border-border outline-none text-sm"
                      >
                        {formData.formFactor === "coin" ? (
                          [1, 5, 10].map((w) => <option key={w} value={w}>{w}g coin</option>)
                        ) : (
                          [50, 100].map((w) => <option key={w} value={w}>{w}g bar</option>)
                        )}
                      </select>
                    </label>
                    <p className="text-[10px] text-brand-gold-rich mt-1.5">Your Account Balance: {totalGold.toFixed(2)}g</p>
                  </div>

                  {formData.deliveryMethod === "home" ? (
                    <div>
                      <label className="block">
                        <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary">Shipping Address</span>
                        <textarea
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="Enter complete shipping address with PIN code…"
                          className="mt-1.5 w-full p-3 h-24 rounded-lg bg-white border border-border outline-none text-sm text-text-primary"
                        />
                      </label>
                    </div>
                  ) : (
                    <div className="p-4 rounded-lg bg-bg-section border border-border text-xs">
                      <div className="font-bold text-brand-green-primary mb-1">Collection Location:</div>
                      <div>{branchDetails.name} · {branchDetails.partner}</div>
                      <div>Relationship Manager: {branchDetails.rm}</div>
                      <div className="text-text-secondary mt-1">Please bring a valid photo ID for verification during counter collection.</div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between mt-6">
                  <button onClick={() => setStep(2)} className="h-10 px-5 rounded-lg border border-border text-xs uppercase tracking-[0.2em]">Back</button>
                  <button
                    disabled={formData.weight > totalGold || (formData.deliveryMethod === "home" && !formData.address.trim())}
                    onClick={handleRedemptionSubmit}
                    className="h-10 px-5 rounded-lg bg-brand-gold-premium text-brand-green-primary text-xs uppercase tracking-[0.2em] font-semibold hover:bg-brand-gold-rich transition-colors disabled:opacity-50"
                  >
                    Submit Request
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="text-center py-6">
                <div className="text-6xl mb-4">✨</div>
                <h3 className="font-display text-2xl text-brand-green-primary mb-2">Request Submitted</h3>
                <p className="text-sm text-text-secondary mb-6 max-w-sm mx-auto">
                  Your redemption request has been logged successfully. The debit from your metal balance is pending compliance authorization.
                </p>

                <div className="p-4 rounded-lg bg-brand-green-secondary/5 border border-brand-gold-premium/30 text-xs mb-6 max-w-md mx-auto">
                  <div className="font-bold text-brand-green-primary text-center">What happens next?</div>
                  <p className="mt-1 text-text-secondary text-center">
                    Your Relationship Manager <span className="font-semibold text-brand-green-primary">{branchDetails.rm}</span> will call you on {customerProfile.phone} to confirm the OTP and coordinate dispatch/pickup.
                  </p>
                </div>

                <button
                  onClick={() => setRedeemModalOpen(false)}
                  className="h-10 px-6 rounded-lg bg-brand-gold-premium text-brand-green-primary text-xs uppercase tracking-[0.2em] font-semibold hover:bg-brand-gold-rich transition-colors"
                >
                  Done
                </button>
              </div>
            )}
          </Card>
        </div>
      )}
    </AppShell>
  );
}
export default CustomerDashboard;
