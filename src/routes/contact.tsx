import { createFileRoute } from "@tanstack/react-router";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — 2 Plus Fortune Alliances Pvt Ltd" },
      { name: "description", content: "Get in touch with 2+FAPL. Headquartered in Hyderabad. We look forward to working with you." },
      { property: "og:title", content: "Contact — 2 Plus Fortune Alliances Pvt Ltd" },
      { property: "og:description", content: "Get in touch with 2+FAPL. Headquartered in Hyderabad. We look forward to working with you." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact · Get In Touch"
        title={<>We look forward to <span className="text-brand-gold-premium">working with you</span>.</>}
        subtitle="2 Plus Fortune Alliances Pvt Ltd is headquartered in Hyderabad. Reach out to discuss partnership, distribution and alliance opportunities."
      />
      <section className="bg-brand-green-primary text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-10 pb-24 grid lg:grid-cols-[1fr_1.1fr] gap-12">
          <div>
            <div className="space-y-6 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="text-brand-gold-premium mt-0.5" size={18} />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-white/60">Phone</div>
                  <div className="mt-0.5 text-white">+91 99661 61616 · +91 73069 69696</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-brand-gold-premium mt-0.5" size={18} />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-white/60">Email</div>
                  <div className="mt-0.5 text-white">srikanth.pagolu@2plusfortunealliances.com</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-brand-gold-premium mt-0.5" size={18} />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-white/60">Headquarters</div>
                  <div className="mt-0.5 text-white leading-relaxed">
                    504, 5th Floor, Nami Shree Infratech, T19 Towers,<br />
                    MG Road, Rani Ganj, Hyderabad — 500003
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="text-brand-gold-premium mt-0.5" size={18} />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-white/60">Website</div>
                  <div className="mt-0.5 text-white">www.2plusfortunealliances.com</div>
                </div>
              </div>
            </div>
          </div>

          <form
            className="rounded-md p-8 lg:p-10 space-y-5 bg-white text-emerald"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you. The 2+FAPL team will be in touch shortly.");
            }}
          >
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Enquiry Form</div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Full name" name="name" />
              <Field label="Organisation" name="org" />
              <Field label="Work email" name="email" type="email" />
              <Field label="Phone" name="phone" />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-emerald/70">Engagement Interest</label>
              <select
                name="interest"
                className="mt-2 w-full bg-white border border-[color:var(--color-border)] rounded-sm px-3 py-3 text-sm text-emerald focus:outline-none focus:border-[color:var(--color-gold)]"
              >
                <option>Rural Financial Institutions Distribution</option>
                <option>Corporate B2B</option>
                <option>Wholesale / Bulk Promotion</option>
                <option>Retail Franchise (Rural)</option>
                <option>Manufacturer / Brand Partnership</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-emerald/70">Message</label>
              <textarea
                name="message"
                rows={5}
                className="mt-2 w-full bg-white border border-[color:var(--color-border)] rounded-sm px-3 py-3 text-sm text-emerald focus:outline-none focus:border-[color:var(--color-gold)]"
              />
            </div>
            <button type="submit" className="btn-gold rounded-sm px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em]">
              Submit Enquiry
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.25em] text-emerald/70">{label}</label>
      <input
        type={type}
        name={name}
        className="mt-2 w-full bg-white border border-[color:var(--color-border)] rounded-sm px-3 py-3 text-sm text-emerald focus:outline-none focus:border-[color:var(--color-gold)]"
      />
    </div>
  );
}