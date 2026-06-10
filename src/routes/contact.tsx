import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — 2PlusFortuneAliances" },
      { name: "description", content: "Speak with 2PlusFortuneAliances's institutional partnerships team about distribution, gold finance and enterprise integrations." },
      { property: "og:title", content: "Contact — 2PlusFortuneAliances" },
      { property: "og:description", content: "Speak with 2PlusFortuneAliances's institutional partnerships team about distribution, gold finance and enterprise integrations." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-24 grid lg:grid-cols-[1fr_1.1fr] gap-12">
      <div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Contact</div>
        <h1 className="font-display text-5xl lg:text-6xl mt-5 leading-[1.05]">
          Speak with our <span className="text-gradient-gold">institutional</span> team.
        </h1>
        <p className="mt-6 text-foreground/75 leading-relaxed max-w-md">
          2PlusFortuneAliances partners with manufacturers, banks, NBFCs and large distributors. Share a
          brief and our partnerships desk will respond within one business day.
        </p>

        <div className="mt-10 space-y-5 text-sm">
          <div className="flex items-start gap-3">
            <Mail className="text-gold mt-0.5" size={18} />
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/55">Partnerships</div>
              <div className="mt-0.5">partnerships@auragold.in</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="text-gold mt-0.5" size={18} />
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/55">Boardline</div>
              <div className="mt-0.5">+91 22 6815 0000</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="text-gold mt-0.5" size={18} />
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/55">Headquarters</div>
              <div className="mt-0.5">One BKC, Bandra Kurla Complex, Mumbai 400051</div>
            </div>
          </div>
        </div>
      </div>

      <form
        className="glass-card rounded-md p-8 lg:p-10 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Thank you. Our partnerships team will be in touch shortly.");
        }}
      >
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Full name" name="name" />
          <Field label="Organisation" name="org" />
          <Field label="Work email" name="email" type="email" />
          <Field label="Role" name="role" />
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-[0.25em] text-foreground/65">Engagement interest</label>
          <select
            name="interest"
            className="mt-2 w-full bg-[color:var(--emerald-forest)]/70 border border-[color:var(--color-border)] rounded-sm px-3 py-3 text-sm focus:outline-none focus:border-[color:var(--color-gold)]"
          >
            <option>Distribution partnership</option>
            <option>Financial institution alliance</option>
            <option>Gold EMI integration</option>
            <option>Enterprise platform licensing</option>
          </select>
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-[0.25em] text-foreground/65">Message</label>
          <textarea
            name="message"
            rows={5}
            className="mt-2 w-full bg-[color:var(--emerald-forest)]/70 border border-[color:var(--color-border)] rounded-sm px-3 py-3 text-sm focus:outline-none focus:border-[color:var(--color-gold)]"
          />
        </div>
        <button type="submit" className="btn-gold rounded-sm px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em]">
          Submit Enquiry
        </button>
      </form>
    </section>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.25em] text-foreground/65">{label}</label>
      <input
        type={type}
        name={name}
        className="mt-2 w-full bg-[color:var(--emerald-forest)]/70 border border-[color:var(--color-border)] rounded-sm px-3 py-3 text-sm focus:outline-none focus:border-[color:var(--color-gold)]"
      />
    </div>
  );
}