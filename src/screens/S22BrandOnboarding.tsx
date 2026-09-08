import { useState } from "react";
import ShonaLogo from "@/components/ShonaLogo";

interface Props {
  onNavigate: (screen: number) => void;
}

type Step = "form" | "confirm" | "done";

export default function S22BrandOnboarding({ onNavigate }: Props) {
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState({
    brandName: "",
    contactName: "",
    role: "",
    email: "",
    phone: "",
    city: "",
    interest: "both" as "aftercare" | "inventory" | "both",
    size: "" as "" | "1-10" | "11-50" | "51-200" | "200+",
    message: "",
  });

  const set = (f: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((v) => ({ ...v, [f]: e.target.value }));

  const handleSubmit = () => {
    // In production this would POST to a form service (e.g. Formspree, Tally, Airtable API)
    // For now we compose a mailto link as a lightweight fallback
    const subject = encodeURIComponent(`Shona Partner Enquiry — ${form.brandName}`);
    const body = encodeURIComponent(
      `Brand: ${form.brandName}\nContact: ${form.contactName} (${form.role})\nEmail: ${form.email}\nPhone: ${form.phone}\nCity: ${form.city}\nTeam size: ${form.size}\nInterest: ${form.interest}\n\n${form.message}`
    );
    window.open(`mailto:hello@shona.co.ke?subject=${subject}&body=${body}`, "_blank");
    setStep("confirm");
  };

  if (step === "confirm") {
    return (
      <div className="min-h-screen bg-ivory flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 bg-shona-orange rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
          <span className="text-white text-2xl">✓</span>
        </div>
        <h2 className="font-serif text-4xl text-charcoal mb-3">You're on the list.</h2>
        <p className="text-warm-gray max-w-sm mb-2 text-base leading-relaxed">
          Thanks, <strong className="text-charcoal">{form.contactName || "there"}</strong>. We've received your enquiry for <strong className="text-charcoal">{form.brandName || "your brand"}</strong>.
        </p>
        <p className="text-warm-gray max-w-sm mb-8 text-sm">
          A member of the Shona team will be in touch at <strong className="text-charcoal">{form.email}</strong> to set up an initial conversation.
        </p>
        <div className="bg-shona-pale border border-shona-orange/20 rounded-2xl px-5 py-4 max-w-sm mb-8 text-left">
          <div className="text-xs font-semibold text-shona-orange uppercase tracking-wider mb-2">What happens next</div>
          <ol className="space-y-2 text-sm text-charcoal-mid">
            {["You'll receive a confirmation email shortly", "Shona team reviews your enquiry (1–2 business days)", "We schedule a 30-min intro call", "Pilot scope and onboarding plan agreed"].map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-5 h-5 bg-shona-orange rounded-full text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
        </div>
        <button onClick={() => onNavigate(1)} className="bg-shona-orange text-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-shona-warm transition-colors">
          Back to Shona →
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      <header className="bg-white px-6 py-4 border-b border-warm-border flex items-center justify-between">
        <ShonaLogo variant="small" />
        <span className="text-xs text-warm-gray uppercase tracking-widest">Brand Partner Onboarding</span>
        <button onClick={() => onNavigate(3)} className="text-xs text-warm-gray hover:text-shona-orange transition-colors">← Back to For Brands</button>
      </header>

      <div className="flex-1 px-6 py-10 max-w-5xl mx-auto w-full grid md:grid-cols-5 gap-12 items-start">
        {/* Left pitch — 2 cols */}
        <div className="md:col-span-2 pt-2">
          <div className="inline-block bg-shona-pale text-shona-orange text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
            Get Started
          </div>
          <h2 className="font-serif text-4xl text-charcoal leading-tight mb-4">
            Let's test what your after-sales process could become.
          </h2>
          <p className="text-warm-gray text-sm leading-relaxed mb-6">
            Fill in the form and we'll be in touch to explore what Shona can do for your brand — no commitment, no sales pressure.
          </p>
          <div className="space-y-3 mb-6">
            {["No technical setup required to start", "Works alongside your existing operations", "Pilot with a small batch of inventory", "Brand-aligned customer experience"].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <div className="w-4 h-4 bg-shona-orange rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] mt-0.5">✓</div>
                <span className="text-sm text-charcoal-mid">{item}</span>
              </div>
            ))}
          </div>
          <div className="bg-white border border-warm-border rounded-xl p-4 text-xs text-warm-gray">
            <div className="font-semibold text-charcoal mb-1">No email marketing platform?</div>
            Submitting this form sends an enquiry directly to the Shona team inbox. We'll follow up personally — no automated spam.
          </div>
        </div>

        {/* Form — 3 cols */}
        <div className="md:col-span-3 bg-white rounded-3xl border border-warm-border p-7 shadow-sm">
          <h3 className="font-serif text-xl text-charcoal mb-5">Tell us about your brand</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-charcoal block mb-1">Brand name <span className="text-shona-orange">*</span></label>
                <input value={form.brandName} onChange={set("brandName")} placeholder="Your brand" className="w-full border border-warm-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-shona-orange" />
              </div>
              <div>
                <label className="text-xs font-medium text-charcoal block mb-1">City / country</label>
                <input value={form.city} onChange={set("city")} placeholder="e.g. Nairobi, Kenya" className="w-full border border-warm-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-shona-orange" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-charcoal block mb-1">Your name <span className="text-shona-orange">*</span></label>
                <input value={form.contactName} onChange={set("contactName")} placeholder="Full name" className="w-full border border-warm-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-shona-orange" />
              </div>
              <div>
                <label className="text-xs font-medium text-charcoal block mb-1">Role</label>
                <input value={form.role} onChange={set("role")} placeholder="e.g. Founder, Head of Ops" className="w-full border border-warm-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-shona-orange" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-charcoal block mb-1">Email <span className="text-shona-orange">*</span></label>
                <input value={form.email} onChange={set("email")} type="email" placeholder="you@brand.com" className="w-full border border-warm-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-shona-orange" />
              </div>
              <div>
                <label className="text-xs font-medium text-charcoal block mb-1">Phone / WhatsApp</label>
                <input value={form.phone} onChange={set("phone")} placeholder="Optional" className="w-full border border-warm-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-shona-orange" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-charcoal block mb-1">Team / brand size</label>
                <select value={form.size} onChange={set("size")} className="w-full border border-warm-border rounded-xl px-3.5 py-2.5 text-sm text-charcoal focus:outline-none focus:border-shona-orange">
                  <option value="">Select…</option>
                  <option value="1-10">1–10 people</option>
                  <option value="11-50">11–50 people</option>
                  <option value="51-200">51–200 people</option>
                  <option value="200+">200+ people</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-charcoal block mb-1">Area of interest <span className="text-shona-orange">*</span></label>
                <select value={form.interest} onChange={set("interest")} className="w-full border border-warm-border rounded-xl px-3.5 py-2.5 text-sm text-charcoal focus:outline-none focus:border-shona-orange">
                  <option value="aftercare">Customer Aftercare</option>
                  <option value="inventory">Inventory Recovery</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-charcoal block mb-1">Anything you'd like us to know</label>
              <textarea value={form.message} onChange={set("message")} rows={3} placeholder="Current after-sales challenges, garment categories, volumes, or questions…" className="w-full border border-warm-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-shona-orange resize-none" />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!form.brandName || !form.contactName || !form.email}
              className="w-full bg-shona-orange text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-shona-warm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Request a Conversation →
            </button>
            <p className="text-center text-xs text-warm-gray">
              This opens your email client with your details pre-filled. No automated platform required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
