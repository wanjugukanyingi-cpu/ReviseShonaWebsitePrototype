import { useState } from "react";
import ShonaLogo from "@/components/ShonaLogo";

interface Props {
  onNavigate: (screen: number) => void;
}

export default function S19Partner({ onNavigate }: Props) {
  const [interest, setInterest] = useState<"aftercare" | "inventory" | "both">("both");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", brand: "", role: "", email: "", phone: "", message: "",
  });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  if (submitted) {
    return (
      <div className="min-h-screen bg-ivory flex flex-col items-center justify-center px-6 text-center">
        <div className="w-14 h-14 bg-shona-orange rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-md">
          <span className="text-white text-xl">✓</span>
        </div>
        <h2 className="font-serif text-3xl text-charcoal mb-3">Request received</h2>
        <p className="text-warm-gray max-w-sm mb-8">
          Thank you for reaching out. A member of the Shona team will be in touch to arrange a conversation.
        </p>
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
        <span className="text-xs text-warm-gray uppercase tracking-widest">Partner Enquiry</span>
      </header>

      <div className="flex-1 px-6 py-12 max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-12 items-start">
        {/* Left — pitch */}
        <div className="pt-2">
          <div className="inline-block bg-shona-pale text-shona-orange text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-5">
            For Clothing Brands
          </div>
          <h2 className="font-serif text-4xl text-charcoal leading-tight mb-5">
            Let's test what your after-sales process could become.
          </h2>
          <p className="text-warm-gray leading-relaxed mb-8 text-base">
            Shona works with clothing brands to build structured after-sales infrastructure — from inventory recovery to customer repair booking. Start with a conversation.
          </p>
          <div className="space-y-3">
            {[
              "Recover value from damaged inventory",
              "Give customers a trusted repair/alteration channel",
              "Generate product intelligence from service data",
              "Build your after-sales process without building it yourself",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-shona-orange rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs mt-0.5">✓</div>
                <span className="text-sm text-charcoal-mid">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div className="bg-white rounded-3xl border border-warm-border p-7 shadow-sm">
          <h3 className="font-serif text-xl text-charcoal mb-5">Request a conversation</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-charcoal block mb-1">Name <span className="text-shona-orange">*</span></label>
                <input value={form.name} onChange={set("name")} placeholder="Your name" className="w-full border border-warm-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-shona-orange" />
              </div>
              <div>
                <label className="text-xs font-medium text-charcoal block mb-1">Role</label>
                <input value={form.role} onChange={set("role")} placeholder="e.g. Founder, COO" className="w-full border border-warm-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-shona-orange" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-charcoal block mb-1">Brand / Company <span className="text-shona-orange">*</span></label>
              <input value={form.brand} onChange={set("brand")} placeholder="Your brand name" className="w-full border border-warm-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-shona-orange" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-charcoal block mb-1">Email <span className="text-shona-orange">*</span></label>
                <input value={form.email} onChange={set("email")} type="email" placeholder="you@brand.com" className="w-full border border-warm-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-shona-orange" />
              </div>
              <div>
                <label className="text-xs font-medium text-charcoal block mb-1">Phone</label>
                <input value={form.phone} onChange={set("phone")} placeholder="Optional" className="w-full border border-warm-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-shona-orange" />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-charcoal block mb-2">Area of interest <span className="text-shona-orange">*</span></label>
              <div className="grid grid-cols-3 gap-2">
                {(["aftercare", "inventory", "both"] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setInterest(opt)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-medium transition-colors text-center ${
                      interest === opt ? "bg-shona-orange text-white border-shona-orange" : "bg-white text-charcoal border-warm-border hover:border-shona-orange"
                    }`}
                  >
                    {opt === "aftercare" ? "Customer Aftercare" : opt === "inventory" ? "Inventory Recovery" : "Both"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-charcoal block mb-1">Message <span className="text-warm-gray font-normal">(optional)</span></label>
              <textarea value={form.message} onChange={set("message")} rows={3} placeholder="Tell us about your brand and what you're hoping to explore…" className="w-full border border-warm-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-shona-orange resize-none" />
            </div>

            <button
              onClick={() => setSubmitted(true)}
              className="w-full bg-shona-orange text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-shona-warm transition-colors"
            >
              Request a Conversation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
