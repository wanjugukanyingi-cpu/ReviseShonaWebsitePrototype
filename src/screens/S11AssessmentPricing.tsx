import { useState } from "react";
import BookingLayout from "@/components/BookingLayout";

interface Props {
  onNavigate: (screen: number) => void;
}

const ISSUES = [
  { id: "zip", label: "Zip", icon: "🔗" },
  { id: "seam", label: "Seam", icon: "🧵" },
  { id: "button", label: "Button", icon: "⭕" },
  { id: "tear", label: "Tear / Hole", icon: "✂️" },
  { id: "fit", label: "Fit", icon: "📐" },
  { id: "length", label: "Length / Hem", icon: "📏" },
  { id: "waist", label: "Waist", icon: "⭕" },
  { id: "other", label: "Other", icon: "+" },
];

// Realistic Kenyan market prices (KES)
const PRICE_INFO: Record<string, { price: string; exact: number; days: string; assessed: boolean; note?: string }> = {
  zip:    { price: "KES 350", exact: 350, days: "1–2", assessed: false, note: "Standard zip replacement, coil or metal" },
  seam:   { price: "KES 250", exact: 250, days: "1–2", assessed: false, note: "Single seam re-stitched" },
  button: { price: "KES 150", exact: 150, days: "Same day", assessed: false, note: "Per button or full set of 4" },
  tear:   { price: "KES 450", exact: 450, days: "2–4", assessed: true,  note: "Depends on size and location" },
  fit:    { price: "KES 700", exact: 700, days: "3–5", assessed: false, note: "General fit adjustment, one area" },
  length: { price: "KES 400", exact: 400, days: "1–3", assessed: false, note: "Hem shortening or lengthening" },
  waist:  { price: "KES 650", exact: 650, days: "2–4", assessed: false, note: "Waist taken in or let out up to 4cm" },
  other:  { price: "",        exact: 0,   days: "",    assessed: true  },
};

// WhatsApp number for specialist chat
const SPECIALIST_WHATSAPP = "https://wa.me/254700000000?text=Hi%2C%20I%20need%20help%20identifying%20what%20my%20garment%20needs.%20Can%20you%20help%3F";

export default function S11AssessmentPricing({ onNavigate }: Props) {
  const [selectedIssue, setSelectedIssue] = useState("waist");
  const [description, setDescription] = useState("");
  const pricing = PRICE_INFO[selectedIssue];

  return (
    <BookingLayout step={2} title="Describe the issue">
      <div className="space-y-6">
        {/* Issue selector */}
        <div>
          <label className="text-sm font-medium text-charcoal block mb-2">What needs attention?</label>
          <div className="grid grid-cols-4 gap-2">
            {ISSUES.map((issue) => (
              <button
                key={issue.id}
                onClick={() => setSelectedIssue(issue.id)}
                className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-center transition-colors ${
                  selectedIssue === issue.id
                    ? "bg-shona-orange text-white border-shona-orange"
                    : "bg-white text-charcoal border-warm-border hover:border-shona-orange"
                }`}
              >
                <span className="text-lg">{issue.icon}</span>
                <span className="text-xs font-medium">{issue.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-charcoal block mb-2">
            Describe the issue <span className="text-warm-gray font-normal">(optional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full border border-warm-border rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-shona-orange transition-colors resize-none"
            placeholder="Any details that help our specialist understand the issue…"
          />
        </div>

        {/* Pricing display */}
        {pricing && !pricing.assessed ? (
          <div className="bg-shona-pale border border-shona-orange/20 rounded-2xl p-5">
            <div className="text-xs font-semibold text-shona-orange uppercase tracking-wider mb-3">Price</div>
            <div className="flex items-baseline gap-2 mb-1">
              <div className="font-serif text-4xl text-charcoal">{pricing.price}</div>
            </div>
            {pricing.note && (
              <div className="text-xs text-warm-gray mb-3">{pricing.note}</div>
            )}
            <div className="flex items-center gap-4 text-sm text-charcoal-mid">
              <span>⏱ Turnaround: {pricing.days} days</span>
            </div>
            <div className="mt-3 pt-3 border-t border-shona-orange/15 text-xs text-warm-gray">
              Price confirmed after collection. You approve before any work begins. Payment is collected before work starts.
            </div>
          </div>
        ) : pricing.assessed ? (
          <div className="bg-ivory border border-warm-border rounded-2xl p-5">
            <div className="text-xs font-semibold text-charcoal-mid uppercase tracking-wider mb-2">Assessment Required</div>
            <p className="text-sm text-warm-gray leading-relaxed mb-3">
              This type of issue needs a specialist review before we can give you a final price.
            </p>
            <div className="text-sm text-charcoal bg-white rounded-xl p-3 border border-warm-border">
              Specialist assesses garment → Final price sent to you → You approve and pay → Work begins
            </div>
          </div>
        ) : null}

        {/* Not sure? Talk to a seamstress */}
        <a
          href={SPECIALIST_WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-[#25D366] rounded-2xl px-5 py-4 hover:bg-[#1ebe5d] transition-colors cursor-pointer"
        >
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center text-white text-lg flex-shrink-0">💬</div>
          <div className="flex-1">
            <div className="text-white font-semibold text-sm">Not sure? Talk to a seamstress</div>
            <div className="text-white/80 text-xs mt-0.5">
              Opens WhatsApp — our specialist will help identify what you need, then send you a link back here to complete booking.
            </div>
          </div>
          <div className="text-white/70 text-xs flex-shrink-0">↗ WhatsApp</div>
        </a>

        <button
          onClick={() => onNavigate(11)}
          className="w-full bg-shona-orange text-white py-3.5 rounded-xl font-medium text-sm hover:bg-shona-warm transition-colors"
        >
          Continue to Address →
        </button>
      </div>
    </BookingLayout>
  );
}
