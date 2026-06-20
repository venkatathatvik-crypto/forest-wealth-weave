import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { validateSetPasswordToken, setPassword } from "@/lib/api/public";
import logoAsset from "@/assets/fortune-alliances-logo.png.asset.json";
import { Card } from "@/components/ui/card";
import { CheckCircle2, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/set-password")({
  validateSearch: (search: Record<string, unknown>): { token?: string } => ({
    token: typeof search.token === "string" ? search.token : undefined,
  }),
  head: () => ({ meta: [{ title: "Set Password — 2PlusFortuneAliances" }] }),
  component: SetPasswordPage,
});

function SetPasswordPage() {
  const { token } = Route.useSearch();
  const nav = useNavigate();

  const [phase, setPhase] = useState<"checking" | "valid" | "invalid" | "done">("checking");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Validate the link token on load.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!token) {
        setPhase("invalid");
        setError("This link is missing its token.");
        return;
      }
      try {
        const res = await validateSetPasswordToken(token);
        if (cancelled) return;
        setEmail(res.email);
        setPhase("valid");
      } catch (e) {
        if (cancelled) return;
        setPhase("invalid");
        setError(e instanceof Error ? e.message : "This link is invalid or has expired.");
      }
    })();
    return () => { cancelled = true; };
  }, [token]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (pw.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (pw !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    try {
      await setPassword(token!, pw);
      setPhase("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to set password");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    "mt-1.5 w-full h-11 px-4 rounded-lg bg-white border border-border outline-none focus:border-brand-green-primary focus:ring-1 focus:ring-brand-green-primary text-sm text-text-primary";

  return (
    <div className="min-h-screen bg-bg-section flex items-center justify-center p-6 text-text-primary">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/"><img src={logoAsset.url} alt="Fortune Alliances" className="h-12 mx-auto mb-6" /></Link>
          <div className="text-[10px] uppercase tracking-[0.3em] text-brand-gold-premium mb-2">Account Activation</div>
          <h1 className="font-display text-3xl text-brand-green-primary">Set your password</h1>
        </div>

        <Card className="p-8 bg-white border border-border shadow-sm">
          {phase === "checking" && (
            <p className="text-center text-sm text-text-secondary py-6">Verifying your link…</p>
          )}

          {phase === "invalid" && (
            <div className="text-center py-4">
              <ShieldAlert size={48} className="text-red-500 mx-auto mb-4" />
              <p className="text-sm text-text-secondary mb-6">{error}</p>
              <p className="text-xs text-text-secondary">
                Please ask your administrator to resend the activation link.
              </p>
              <Link to="/login" className="inline-block mt-6 text-brand-gold-premium font-semibold text-sm hover:underline">
                ← Back to Login
              </Link>
            </div>
          )}

          {phase === "valid" && (
            <form onSubmit={submit} className="space-y-4">
              <p className="text-sm text-text-secondary">
                Setting password for <span className="font-semibold text-brand-green-primary">{email}</span>
              </p>
              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary font-medium">New Password</span>
                <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} className={inputCls} placeholder="At least 8 characters" />
              </label>
              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary font-medium">Confirm Password</span>
                <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={inputCls} />
              </label>

              {error && (
                <p className="text-[12px] text-red-600 text-center bg-red-50 border border-red-200 rounded-lg py-2 px-3 whitespace-pre-line">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 w-full h-11 rounded-lg bg-brand-gold-premium text-brand-green-primary text-xs font-semibold uppercase tracking-[0.22em] hover:bg-brand-gold-rich transition-colors disabled:opacity-60"
              >
                {submitting ? "Setting…" : "Set Password"}
              </button>
            </form>
          )}

          {phase === "done" && (
            <div className="text-center py-4">
              <CheckCircle2 size={48} className="text-brand-gold-premium mx-auto mb-4" />
              <h3 className="font-display text-xl text-brand-green-primary mb-2">Password set</h3>
              <p className="text-sm text-text-secondary mb-6">Your account is active. You can now sign in.</p>
              <button
                onClick={() => nav({ to: "/login" })}
                className="h-10 px-6 rounded-lg bg-brand-gold-premium text-brand-green-primary font-semibold text-xs uppercase tracking-[0.2em] hover:bg-brand-gold-rich transition-colors"
              >
                Go to Login
              </button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
