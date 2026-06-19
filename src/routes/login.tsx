import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth, type Role } from "@/lib/mock/auth";
import { submitPartnerLead } from "@/lib/api/public";
import logoAsset from "@/assets/fortune-alliances-logo.png.asset.json";
import { Shield, Briefcase, Building2, User, CheckCircle2, X } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): { role?: Role } => {
    return {
      role: (search.role as Role) || undefined,
    };
  },
  head: () => ({ meta: [{ title: "Sign In — 2PlusFortuneAliances" }] }),
  component: LoginPage,
});

const ROLES: { id: Role; label: string; desc: string; icon: typeof Shield; demo: string }[] = [
  { id: "admin", label: "Admin", desc: "Network-wide oversight & governance", icon: Shield, demo: "admin@goldemi.com" },
  { id: "partner", label: "Partner", desc: "Distribution partner console", icon: Briefcase, demo: "partner@meridian.in" },
  { id: "branch", label: "Branch", desc: "Branch operations & customer desk", icon: Building2, demo: "branch@andheri-east.in" },
  { id: "customer", label: "Customer", desc: "Personal portfolio, orders & metal balance", icon: User, demo: "aarav.mehta@gmail.com" },
];

function LoginPage() {
  const { login, loginWithPassword, requestOtp, loginWithOtp } = useAuth();
  const nav = useNavigate();
  const [role, setRole] = useState<Role>("admin");
  const [email, setEmail] = useState("admin@goldemi.com");
  const [password, setPassword] = useState("");

  // Admin auth method: password or email OTP.
  const [authMethod, setAuthMethod] = useState<"password" | "otp">("password");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [info, setInfo] = useState("");

  // View mode: signin, register_customer, register_partner
  const [view, setView] = useState<"signin" | "register_customer" | "register_partner">("signin");
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Roles that authenticate against the real backend (vs. mock demo login).
  const usesBackend = role === "admin" || role === "partner" || role === "branch";

  // Registration Forms State
  const [customerForm, setCustomerForm] = useState({ name: "", phone: "", email: "", city: "", state: "" });
  const [partnerForm, setPartnerForm] = useState({ companyName: "", contactPerson: "", phone: "", email: "", gst: "", city: "", state: "" });

  useEffect(() => {
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    const r = params.get("role") as Role;
    if (r && ["admin", "partner", "branch", "customer"].includes(r)) {
      setRole(r);
      const demoEmail = ROLES.find((x) => x.id === r)?.demo || "";
      setEmail(demoEmail);
    }
    const mode = params.get("mode");
    if (mode === "register_customer") {
      setView("register_customer");
    } else if (mode === "register_partner") {
      setView("register_partner");
    }
  }, []);

  // Admin: request an email OTP (step 1 of the OTP flow).
  const sendOtpHandler = async () => {
    setError("");
    setInfo("");
    setLoading(true);
    try {
      await requestOtp(email);
      setOtpSent(true);
      setInfo(`A 6-digit code was sent to ${email}. Enter it below.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Admin, Partner and Branch authenticate against the real backend. The selected
    // role must match the account's actual role (enforced in loginWithPassword/Otp),
    // otherwise login is rejected. Customer remains a mock demo login for now.
    const dashboardFor: Record<Role, string> = {
      admin: "/dashboard/admin",
      partner: "/dashboard/partner",
      branch: "/dashboard/branch",
      customer: "/dashboard/customer",
    };

    if (role === "admin" || role === "partner" || role === "branch") {
      setLoading(true);
      try {
        if (authMethod === "otp") {
          // If the code hasn't been sent yet, the submit acts as "send OTP".
          if (!otpSent) {
            await requestOtp(email);
            setOtpSent(true);
            setInfo(`A 6-digit code was sent to ${email}. Enter it below.`);
            return;
          }
          await loginWithOtp(email, otp, role);
        } else {
          await loginWithPassword(email, password, role);
        }
        nav({ to: dashboardFor[role] });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Login failed");
      } finally {
        setLoading(false);
      }
      return;
    }

    login(email, role);
    nav({ to: dashboardFor[role] });
  };

  const handleRegisterCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("Registration request received! Our Relationship Manager will contact you soon to complete documents verification and activate your gold account.");
  };

  const handleRegisterPartner = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await submitPartnerLead({
        companyName: partnerForm.companyName,
        contactPerson: partnerForm.contactPerson,
        email: partnerForm.email,
        phone: partnerForm.phone,
        gst: partnerForm.gst,
        city: partnerForm.city,
        state: partnerForm.state,
      });
      setSuccessMsg("Partner request received! Our regional enablement team will contact you soon to verify your GST and finalize onboarding agreements.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  const pickRole = (r: Role) => {
    setRole(r);
    setError("");
    setInfo("");
    setPassword("");
    setOtp("");
    setOtpSent(false);
    setEmail(ROLES.find((x) => x.id === r)!.demo);
  };

  const switchAuthMethod = (m: "password" | "otp") => {
    setAuthMethod(m);
    setError("");
    setInfo("");
    setPassword("");
    setOtp("");
    setOtpSent(false);
  };

  return (
    <div className="min-h-screen bg-bg-section flex items-center justify-center p-6 text-text-primary">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/"><img src={logoAsset.url} alt="Fortune Alliances" className="h-12 mx-auto mb-6" /></Link>
          <div className="text-[10px] uppercase tracking-[0.3em] text-brand-gold-premium mb-2">
            {view === "signin" ? "Institutional Console" : view === "register_customer" ? "Customer Account Desk" : "Partner Network"}
          </div>
          <h1 className="font-display text-3xl text-brand-green-primary">
            {view === "signin" ? "Access your workspace" : view === "register_customer" ? "Create Customer Account" : "Become a Partner"}
          </h1>
          <p className="text-sm text-text-secondary mt-2">
            {view === "signin" ? "Select your role to continue" : "Fill out the registration details below"}
          </p>
        </div>

        <Card className="p-8 bg-white border border-border shadow-sm">
          {view === "signin" && (
            <form onSubmit={submit}>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {ROLES.map((r) => {
                  const Icon = r.icon;
                  const active = role === r.id;
                  return (
                    <button
                      key={r.id} type="button" onClick={() => pickRole(r.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${active ? "border-brand-green-primary bg-brand-green-primary text-white" : "border-border bg-white hover:border-brand-green-primary/50"}`}
                    >
                      <Icon size={20} className={active ? "text-white" : "text-text-secondary"} />
                      <div className="text-xs font-medium mt-2">{r.label}</div>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-text-secondary mb-6 text-center">{ROLES.find((r) => r.id === role)!.desc}</p>

              {/* Backend roles: choose password or email OTP */}
              {usesBackend && (
                <div className="grid grid-cols-2 gap-2 mb-4 p-1 rounded-lg bg-bg-section border border-border">
                  {(["password", "otp"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => switchAuthMethod(m)}
                      className={`h-9 rounded-md text-[11px] uppercase tracking-[0.18em] font-semibold transition-colors ${
                        authMethod === m
                          ? "bg-brand-green-primary text-white"
                          : "text-text-secondary hover:text-brand-green-primary"
                      }`}
                    >
                      {m === "password" ? "Password" : "Email OTP"}
                    </button>
                  ))}
                </div>
              )}

              <div className="space-y-4">
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary font-medium">Work Email</span>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 w-full h-11 px-4 rounded-lg bg-white border border-border outline-none focus:border-brand-green-primary focus:ring-1 focus:ring-brand-green-primary text-sm text-text-primary" />
                </label>

                {/* Password method (also the field for customer mock login) */}
                {!(usesBackend && authMethod === "otp") && (
                  <label className="block">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary font-medium">Password</span>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5 w-full h-11 px-4 rounded-lg bg-white border border-border outline-none focus:border-brand-green-primary focus:ring-1 focus:ring-brand-green-primary text-sm text-text-primary" />
                  </label>
                )}

                {/* OTP method (backend roles) */}
                {usesBackend && authMethod === "otp" && (
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={sendOtpHandler}
                      disabled={loading || !email}
                      className="w-full h-10 rounded-lg border border-brand-green-primary text-brand-green-primary text-[11px] uppercase tracking-[0.18em] font-semibold hover:bg-brand-green-primary hover:text-white transition-colors disabled:opacity-50"
                    >
                      {loading && !otpSent ? "Sending…" : otpSent ? "Resend Code" : "Send OTP to Email"}
                    </button>
                    {otpSent && (
                      <label className="block">
                        <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary font-medium">6-Digit Code</span>
                        <input
                          inputMode="numeric"
                          maxLength={6}
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                          placeholder="••••••"
                          className="mt-1.5 w-full h-11 px-4 rounded-lg bg-white border border-border outline-none focus:border-brand-green-primary focus:ring-1 focus:ring-brand-green-primary text-sm text-text-primary tracking-[0.4em] text-center"
                        />
                      </label>
                    )}
                  </div>
                )}
              </div>

              {info && (
                <p className="text-[12px] text-brand-green-primary mt-4 text-center bg-brand-green-secondary/10 border border-brand-green-secondary/30 rounded-lg py-2 px-3">
                  {info}
                </p>
              )}
              {error && (
                <p className="text-[12px] text-red-600 mt-4 text-center bg-red-50 border border-red-200 rounded-lg py-2 px-3">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || (usesBackend && authMethod === "otp" && otpSent && otp.length !== 6)}
                className="mt-6 w-full h-11 rounded-lg bg-brand-gold-premium text-brand-green-primary text-xs font-semibold uppercase tracking-[0.22em] hover:bg-brand-gold-rich transition-colors disabled:opacity-60"
              >
                {loading
                  ? "Please wait…"
                  : usesBackend && authMethod === "otp" && !otpSent
                    ? "Send OTP"
                    : usesBackend && authMethod === "otp"
                      ? "Verify & Enter"
                      : "Enter Console"}
              </button>
              <p className="text-[11px] text-text-secondary mt-4 text-center">
                {role === "admin"
                  ? "Signs in against the live backend. Demo admin: admin@goldemi.com / Admin@123"
                  : usesBackend
                    ? "Signs in against the live backend with your issued credentials."
                    : "Demo environment — the customer role is not validated."}
              </p>
            </form>
          )}

          {view === "register_customer" && (
            <form onSubmit={handleRegisterCustomer} className="space-y-4">
              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary font-medium">Full Name</span>
                <input required value={customerForm.name} onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })} className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border bg-white outline-none focus:border-brand-gold-premium text-sm" />
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary font-medium">Mobile Number</span>
                  <input required type="tel" value={customerForm.phone} onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })} className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border bg-white outline-none focus:border-brand-gold-premium text-sm" />
                </label>
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary font-medium">Email Address</span>
                  <input required type="email" value={customerForm.email} onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })} className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border bg-white outline-none focus:border-brand-gold-premium text-sm" />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary font-medium">City</span>
                  <input required value={customerForm.city} onChange={(e) => setCustomerForm({ ...customerForm, city: e.target.value })} className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border bg-white outline-none focus:border-brand-gold-premium text-sm" />
                </label>
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary font-medium">State</span>
                  <input required value={customerForm.state} onChange={(e) => setCustomerForm({ ...customerForm, state: e.target.value })} className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border bg-white outline-none focus:border-brand-gold-premium text-sm" />
                </label>
              </div>
              
              <button type="submit" className="w-full mt-6 h-11 bg-brand-green-primary text-white font-semibold text-xs uppercase tracking-[0.22em] rounded-lg hover:bg-brand-green-secondary transition-colors">
                Submit Customer Registration
              </button>
            </form>
          )}

          {view === "register_partner" && (
            <form onSubmit={handleRegisterPartner} className="space-y-4">
              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary font-medium">Company Name</span>
                <input required value={partnerForm.companyName} onChange={(e) => setPartnerForm({ ...partnerForm, companyName: e.target.value })} className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border bg-white outline-none focus:border-brand-gold-premium text-sm" />
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary font-medium">Contact Person</span>
                  <input required value={partnerForm.contactPerson} onChange={(e) => setPartnerForm({ ...partnerForm, contactPerson: e.target.value })} className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border bg-white outline-none focus:border-brand-gold-premium text-sm" />
                </label>
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary font-medium">GST Number</span>
                  <input required value={partnerForm.gst} onChange={(e) => setPartnerForm({ ...partnerForm, gst: e.target.value })} className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border bg-white outline-none focus:border-brand-gold-premium text-sm" />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary font-medium">Mobile Phone</span>
                  <input required type="tel" value={partnerForm.phone} onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })} className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border bg-white outline-none focus:border-brand-gold-premium text-sm" />
                </label>
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary font-medium">Work Email</span>
                  <input required type="email" value={partnerForm.email} onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })} className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border bg-white outline-none focus:border-brand-gold-premium text-sm" />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary font-medium">City</span>
                  <input required value={partnerForm.city} onChange={(e) => setPartnerForm({ ...partnerForm, city: e.target.value })} className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border bg-white outline-none focus:border-brand-gold-premium text-sm" />
                </label>
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary font-medium">State</span>
                  <input required value={partnerForm.state} onChange={(e) => setPartnerForm({ ...partnerForm, state: e.target.value })} className="mt-1.5 w-full h-10 px-3 rounded-lg border border-border bg-white outline-none focus:border-brand-gold-premium text-sm" />
                </label>
              </div>

              {error && (
                <p className="text-[12px] text-red-600 mt-2 text-center bg-red-50 border border-red-200 rounded-lg py-2 px-3">
                  {error}
                </p>
              )}

              <button type="submit" disabled={loading} className="w-full mt-6 h-11 bg-brand-green-primary text-white font-semibold text-xs uppercase tracking-[0.22em] rounded-lg hover:bg-brand-green-secondary transition-colors disabled:opacity-60">
                {loading ? "Submitting…" : "Apply as Partner"}
              </button>
            </form>
          )}

          {view === "signin" ? (
            <div className="mt-6 pt-5 border-t border-border flex flex-col gap-2.5 text-center text-xs text-text-secondary">
              <div>
                Don't have a Customer account?{" "}
                <button type="button" onClick={() => setView("register_customer")} className="text-brand-gold-premium font-semibold hover:underline">
                  Register here
                </button>
              </div>
              <div>
                Want to become a distribution partner?{" "}
                <button type="button" onClick={() => setView("register_partner")} className="text-brand-gold-premium font-semibold hover:underline">
                  Register as Partner
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6 pt-5 border-t border-border text-center text-xs">
              <button type="button" onClick={() => setView("signin")} className="text-text-secondary hover:text-brand-green-primary font-semibold">
                ← Back to Login
              </button>
            </div>
          )}
        </Card>

        <div className="text-center mt-6 text-[10px] uppercase tracking-[0.2em] text-text-secondary/60">
          © 2026 2PlusFortuneAliances · SOC 2 Type II · RBI Aligned
        </div>
      </div>

      {/* POPUP / DIALOG DESK */}
      {successMsg && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4">
          <Card className="w-full max-w-md p-6 bg-background relative border border-border shadow-2xl text-center text-text-primary">
            <button onClick={() => setSuccessMsg("")} className="absolute right-4 top-4 text-text-secondary hover:text-text-primary">
              <X size={18} />
            </button>
            <CheckCircle2 size={56} className="text-brand-gold-premium mx-auto mb-4" />
            <h3 className="font-display text-2xl text-brand-green-primary mb-2">Request Logged</h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-6 max-w-xs mx-auto">
              {successMsg}
            </p>
            <button
              onClick={() => { setSuccessMsg(""); setView("signin"); }}
              className="h-10 px-6 rounded-lg bg-brand-gold-premium text-brand-green-primary font-semibold text-xs uppercase tracking-[0.2em] hover:bg-brand-gold-rich transition-colors"
            >
              Back to Login
            </button>
          </Card>
        </div>
      )}
    </div>
  );
}
export default LoginPage;
