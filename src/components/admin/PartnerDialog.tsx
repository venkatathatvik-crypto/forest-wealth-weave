import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { createPartner, type CreatePartnerInput, type PartnerType } from "@/lib/api/admin";
import { X } from "lucide-react";

const TYPES: PartnerType[] = ["NBFC", "MFI", "COOPERATIVE", "BROKER", "CORPORATE", "OTHER"];
const inputCls =
  "w-full h-10 px-3 rounded-lg bg-background border border-border outline-none focus:border-brand-gold-premium text-sm";

/** Optional initial values, e.g. when converting a lead into a partner. */
export type PartnerDialogPrefill = Partial<CreatePartnerInput>;

/**
 * Shared "Add Partner" dialog. Creates the partner company + login user and
 * emails credentials. Used by the Partners page and the Leads "Convert" action.
 */
export function PartnerDialog({
  prefill,
  onClose,
  onCreated,
}: {
  prefill?: PartnerDialogPrefill;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [form, setForm] = useState<CreatePartnerInput>({
    name: "",
    type: "NBFC",
    registrationNumber: "",
    contactEmail: "",
    contactPhone: "",
    city: "",
    state: "",
    pincode: "",
    commissionRate: undefined,
    contactPersonName: "",
    loginEmail: "",
    loginMobile: "",
    ...prefill,
  });
  const [err, setErr] = useState("");

  const create = useMutation({
    mutationFn: () =>
      createPartner({
        ...form,
        registrationNumber: form.registrationNumber || undefined,
        contactEmail: form.contactEmail || undefined,
        contactPhone: form.contactPhone || undefined,
        city: form.city || undefined,
        state: form.state || undefined,
        pincode: form.pincode || undefined,
      }),
    onSuccess: onCreated,
    onError: (e) => setErr(e instanceof Error ? e.message : "Failed to create partner"),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!form.name.trim() || !form.contactPersonName.trim() || !form.loginEmail.trim() || !form.loginMobile.trim()) {
      setErr("Partner name, contact person, login email, and login mobile are required");
      return;
    }
    create.mutate();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4 overflow-y-auto">
      <Card className="w-full max-w-2xl p-6 bg-background my-8">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-display text-2xl text-brand-green-primary">Add Partner</h3>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
            <X size={18} />
          </button>
        </div>
        <p className="text-xs text-text-secondary mb-4">
          Creates the partner company and a login account. A secure link is emailed to the partner to set
          their own password — no password is sent.
        </p>
        <form onSubmit={submit} className="grid grid-cols-2 gap-3">
          <div className="col-span-2 text-[10px] uppercase tracking-[0.22em] text-brand-gold-premium/80 mt-1">
            Company
          </div>
          <Field label="Partner Name" full>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Type">
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as PartnerType })} className={inputCls}>
              {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Registration / GST No.">
            <input value={form.registrationNumber} onChange={(e) => setForm({ ...form, registrationNumber: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Contact Email">
            <input type="email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Contact Phone">
            <input value={form.contactPhone} onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} className={inputCls} />
          </Field>
          <Field label="City">
            <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputCls} />
          </Field>
          <Field label="State">
            <input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Pincode">
            <input value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Commission %">
            <input
              type="number" step="0.01" min="0" max="100"
              value={form.commissionRate ?? ""}
              onChange={(e) => setForm({ ...form, commissionRate: e.target.value === "" ? undefined : Number(e.target.value) })}
              className={inputCls}
            />
          </Field>

          <div className="col-span-2 text-[10px] uppercase tracking-[0.22em] text-brand-gold-premium/80 mt-2">
            Login User
          </div>
          <Field label="Contact Person Name" full>
            <input value={form.contactPersonName} onChange={(e) => setForm({ ...form, contactPersonName: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Login Email">
            <input type="email" value={form.loginEmail} onChange={(e) => setForm({ ...form, loginEmail: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Login Mobile">
            <input value={form.loginMobile} onChange={(e) => setForm({ ...form, loginMobile: e.target.value })} className={inputCls} />
          </Field>

          {err && (
            <div className="col-span-2 text-[12px] text-red-600 bg-red-50 border border-red-200 rounded-lg py-2 px-3 whitespace-pre-line">{err}</div>
          )}

          <div className="col-span-2 flex justify-end gap-2 mt-2">
            <button type="button" onClick={onClose} className="h-10 px-4 rounded-lg text-xs uppercase tracking-[0.18em] border border-border">
              Cancel
            </button>
            <button
              type="submit"
              disabled={create.isPending}
              className="h-10 px-4 rounded-lg bg-brand-gold-premium text-brand-green-primary text-xs uppercase tracking-[0.18em] font-semibold hover:bg-brand-gold-rich transition-colors disabled:opacity-60"
            >
              {create.isPending ? "Creating…" : "Create & Send Set-Password Link"}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`block ${full ? "col-span-2" : ""}`}>
      <span className="text-[10px] uppercase tracking-[0.22em] text-text-secondary">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
