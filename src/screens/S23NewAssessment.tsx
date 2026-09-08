import { useState } from "react";
import ShonaLogo from "@/components/ShonaLogo";

interface Props {
  onNavigate: (screen: number) => void;
}

type Step = 1 | 2 | 3;

const GARMENT_TYPES = ["Denim jeans", "Corduroy blazer", "Cotton dress", "Linen shirt", "Knitwear / jumper", "Linen trousers", "Coat / jacket", "Other"];
const DAMAGE_TYPES = ["Seam separation", "Zip failure", "Lining tear", "Moth / insect damage", "Staining", "Structural wear", "Button / fastener loss", "Other"];

export default function S23NewAssessment({ onNavigate }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    garmentType: "Denim jeans",
    sku: "",
    quantity: "1",
    damageType: "Seam separation",
    description: "",
    condition: "existing" as "existing" | "new",
    photoUploaded: false,
    priority: "standard" as "standard" | "urgent",
  });

  const set = (f: string) => (val: string | boolean) => setForm((v) => ({ ...v, [f]: val }));

  if (submitted) {
    const ref = `ASS-${Date.now().toString().slice(-6)}`;
    return (
      <div className="min-h-screen bg-ivory flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 bg-shona-orange rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-md">
          <span className="text-white text-2xl">✓</span>
        </div>
        <h2 className="font-serif text-3xl text-charcoal mb-2">Assessment Submitted</h2>
        <div className="text-xs font-mono text-warm-gray mb-5">Reference: <strong className="text-charcoal">{ref}</strong></div>
        <p className="text-warm-gray max-w-sm mb-8 text-sm leading-relaxed">
          A Shona specialist will review your submission and contact you within 1 business day with an assessment and recovery recommendation.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => { setSubmitted(false); setStep(1); setForm(f => ({ ...f, sku: "", description: "" })); }}
            className="bg-white border border-warm-border text-charcoal px-5 py-2.5 rounded-xl text-sm hover:border-shona-orange transition-colors"
          >
            New assessment
          </button>
          <button
            onClick={() => onNavigate(6)}
            className="bg-shona-orange text-white px-5 py-2.5 rounded-xl text-sm hover:bg-shona-warm transition-colors"
          >
            View Inventory Recovery →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-warm-border px-6 py-4 flex items-center justify-between bg-charcoal">
        <ShonaLogo variant="small" className="[&_span]:text-white" />
        <span className="text-xs text-warm-gray-light uppercase tracking-widest">New Inventory Assessment</span>
        <button onClick={() => onNavigate(6)} className="text-xs text-warm-gray-light hover:text-white transition-colors">← Cancel</button>
      </header>

      {/* Step indicator */}
      <div className="px-6 py-4 bg-ivory border-b border-warm-border">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          {([1, 2, 3] as Step[]).map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 flex-shrink-0 ${
                s < step ? "bg-shona-orange border-shona-orange text-white" :
                s === step ? "bg-white border-shona-orange text-shona-orange ring-4 ring-shona-pale" :
                "bg-white border-warm-border text-warm-gray"
              }`}>
                {s < step ? "✓" : s}
              </div>
              <span className={`text-xs ${s === step ? "text-charcoal font-medium" : "text-warm-gray"}`}>
                {s === 1 ? "Garment details" : s === 2 ? "Damage + photos" : "Review + submit"}
              </span>
              {s < 3 && <div className="flex-1 h-px bg-warm-border" />}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 px-6 py-8">
        <div className="max-w-lg mx-auto">

          {step === 1 && (
            <div className="space-y-5">
              <h2 className="font-serif text-2xl text-charcoal">Garment details</h2>
              <div>
                <label className="text-xs font-medium text-charcoal block mb-2">Garment type <span className="text-shona-orange">*</span></label>
                <div className="grid grid-cols-2 gap-2">
                  {GARMENT_TYPES.map((g) => (
                    <button key={g} onClick={() => set("garmentType")(g)}
                      className={`text-sm px-4 py-2.5 rounded-xl border text-left transition-colors ${form.garmentType === g ? "bg-shona-orange text-white border-shona-orange" : "bg-white text-charcoal border-warm-border hover:border-shona-orange"}`}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-charcoal block mb-1">SKU / product code</label>
                  <input value={form.sku} onChange={(e) => set("sku")(e.target.value)} placeholder="e.g. LT-DENIM-029W"
                    className="w-full border border-warm-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-shona-orange" />
                </div>
                <div>
                  <label className="text-xs font-medium text-charcoal block mb-1">Quantity <span className="text-shona-orange">*</span></label>
                  <input value={form.quantity} onChange={(e) => set("quantity")(e.target.value)} type="number" min="1"
                    className="w-full border border-warm-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-shona-orange" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-charcoal block mb-2">Inventory type</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["existing", "new"] as const).map((c) => (
                    <button key={c} onClick={() => set("condition")(c)}
                      className={`py-3 rounded-xl border text-sm font-medium transition-colors ${form.condition === c ? "bg-shona-orange text-white border-shona-orange" : "bg-white text-charcoal border-warm-border hover:border-shona-orange"}`}>
                      {c === "existing" ? "Existing inventory" : "Newly catalogued"}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => setStep(2)} className="w-full bg-shona-orange text-white py-3.5 rounded-xl font-medium text-sm hover:bg-shona-warm transition-colors">
                Continue →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h2 className="font-serif text-2xl text-charcoal">Damage + photos</h2>
              <div>
                <label className="text-xs font-medium text-charcoal block mb-2">Type of damage <span className="text-shona-orange">*</span></label>
                <div className="grid grid-cols-2 gap-2">
                  {DAMAGE_TYPES.map((d) => (
                    <button key={d} onClick={() => set("damageType")(d)}
                      className={`text-sm px-4 py-2.5 rounded-xl border text-left transition-colors ${form.damageType === d ? "bg-shona-orange text-white border-shona-orange" : "bg-white text-charcoal border-warm-border hover:border-shona-orange"}`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-charcoal block mb-1">Describe the damage</label>
                <textarea value={form.description} onChange={(e) => set("description")(e.target.value)} rows={3}
                  placeholder="Location of damage, severity, any relevant context for the specialist…"
                  className="w-full border border-warm-border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-shona-orange resize-none" />
              </div>
              <div onClick={() => set("photoUploaded")(!form.photoUploaded)}
                className={`border-2 border-dashed rounded-2xl px-6 py-7 text-center cursor-pointer transition-colors ${form.photoUploaded ? "border-shona-orange bg-shona-pale" : "border-warm-border hover:border-shona-orange"}`}>
                {form.photoUploaded ? (
                  <div><div className="text-shona-orange text-2xl mb-1">✓</div><div className="text-sm font-medium text-shona-orange">Photos uploaded</div><div className="text-xs text-warm-gray mt-1">Tap to change</div></div>
                ) : (
                  <div><div className="text-warm-gray-light text-2xl mb-1">📷</div><div className="text-sm font-medium text-charcoal-mid">Upload damage photos</div><div className="text-xs text-warm-gray mt-1">Show each affected area clearly</div></div>
                )}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 bg-ivory border border-warm-border text-charcoal py-3 rounded-xl text-sm hover:border-shona-orange transition-colors">← Back</button>
                <button onClick={() => setStep(3)} className="flex-1 bg-shona-orange text-white py-3 rounded-xl text-sm hover:bg-shona-warm transition-colors">Continue →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h2 className="font-serif text-2xl text-charcoal">Review + submit</h2>
              <div className="bg-white rounded-2xl border border-warm-border divide-y divide-warm-border">
                {[
                  { label: "Garment", value: form.garmentType },
                  { label: "SKU", value: form.sku || "Not provided" },
                  { label: "Quantity", value: form.quantity },
                  { label: "Inventory type", value: form.condition === "existing" ? "Existing inventory" : "Newly catalogued" },
                  { label: "Damage type", value: form.damageType },
                  { label: "Photos", value: form.photoUploaded ? "Uploaded" : "Not uploaded" },
                ].map((r) => (
                  <div key={r.label} className="flex items-center justify-between px-5 py-3">
                    <span className="text-xs text-warm-gray">{r.label}</span>
                    <span className="text-sm text-charcoal font-medium">{r.value}</span>
                  </div>
                ))}
              </div>
              <div>
                <label className="text-xs font-medium text-charcoal block mb-2">Priority</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["standard", "urgent"] as const).map((p) => (
                    <button key={p} onClick={() => set("priority")(p)}
                      className={`py-3 rounded-xl border text-sm font-medium transition-colors ${form.priority === p ? "bg-shona-orange text-white border-shona-orange" : "bg-white text-charcoal border-warm-border hover:border-shona-orange"}`}>
                      {p === "standard" ? "Standard (1–2 days)" : "Urgent (same day)"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 bg-ivory border border-warm-border text-charcoal py-3 rounded-xl text-sm hover:border-shona-orange transition-colors">← Back</button>
                <button onClick={() => setSubmitted(true)} className="flex-1 bg-shona-orange text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-shona-warm transition-colors">Submit for Assessment</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
