import ShonaLogo from "@/components/ShonaLogo";

interface Props {
  onNavigate: (screen: number) => void;
}

const PRICE_BANDS = [
  { category: "Button replacement", examples: "Per button or set of 4", price: "KES 150", turnaround: "Same day" },
  { category: "Seam repair", examples: "Single seam, side or hem", price: "KES 250", turnaround: "1–2 days" },
  { category: "Zip replacement", examples: "Standard coil or metal zip", price: "KES 350", turnaround: "1–2 days" },
  { category: "Hem / length", examples: "Shorten or lengthen hem", price: "KES 400", turnaround: "1–3 days" },
  { category: "Waist alteration", examples: "Taken in or let out up to 4cm", price: "KES 650", turnaround: "2–4 days" },
  { category: "Fit adjustment", examples: "One area — waist, chest, shoulder", price: "KES 700", turnaround: "3–5 days" },
  { category: "Tear / hole repair", examples: "Depends on size and placement", price: "Assessment required", turnaround: "TBD" },
  { category: "Complex / reconstruction", examples: "Extensive damage, re-lining", price: "Assessment required", turnaround: "TBD" },
];

// Payment before work begins
const FLOW = [
  { step: "1", label: "Price Shown", sub: "Customer sees the exact price or range upfront before booking", highlight: true },
  { step: "2", label: "Assessment (if needed)", sub: "Complex issues reviewed by specialist — final price confirmed before proceeding" },
  { step: "3", label: "Customer Approves", sub: "Customer confirms they are happy with the price" },
  { step: "4", label: "Customer Pays", sub: "Payment collected upfront — before garment is collected for work", highlight: true },
  { step: "5", label: "Pickup + Work", sub: "Garment collected, work completed by specialist" },
  { step: "6", label: "Return / Collection", sub: "Repaired garment returned to customer" },
];

export default function S17PricingArchitecture({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-ivory">
      <header className="bg-white px-6 py-4 border-b border-warm-border flex items-center justify-between">
        <ShonaLogo variant="small" />
        <h1 className="font-serif text-xl text-charcoal">Pricing Architecture</h1>
        <button onClick={() => onNavigate(18)} className="text-sm text-shona-orange hover:underline">Partner with Shona →</button>
      </header>

      <div className="px-8 py-10 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-serif text-4xl text-charcoal mb-3">Transparent. Upfront. Paid Before Work Begins.</h2>
          <p className="text-warm-gray max-w-lg mx-auto">
            You see the price before you commit. You pay before we collect. No surprises after the garment has left your hands.
          </p>
        </div>

        {/* Why payment upfront */}
        <div className="bg-shona-pale border-l-4 border-shona-orange rounded-2xl px-6 py-4 mb-8">
          <div className="text-sm font-semibold text-charcoal mb-1">Why payment before pickup?</div>
          <p className="text-sm text-warm-gray leading-relaxed">
            Shona coordinates pickup, delivery and specialist work — all of which have a cost regardless of what happens after collection. Upfront payment protects both parties: the customer pays a confirmed price, and the specialist can begin work without waiting for settlement. It also removes awkward payment chasing at the point of return.
          </p>
        </div>

        {/* Pricing flow */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {FLOW.map((f) => (
            <div
              key={f.step}
              className={`rounded-2xl p-5 border flex flex-col ${
                f.highlight ? "bg-shona-orange text-white border-shona-orange" : "bg-white border-warm-border"
              }`}
            >
              <div className={`font-mono text-3xl font-light mb-2 ${f.highlight ? "text-white" : "text-shona-orange"}`}>{f.step}</div>
              <div className={`font-semibold text-sm mb-2 ${f.highlight ? "text-white" : "text-charcoal"}`}>{f.label}</div>
              <div className={`text-xs leading-relaxed ${f.highlight ? "text-white/80" : "text-warm-gray"}`}>{f.sub}</div>
            </div>
          ))}
        </div>

        {/* Price catalogue */}
        <div className="bg-white rounded-2xl border border-warm-border overflow-hidden mb-7">
          <div className="px-5 py-4 border-b border-warm-border bg-portal-bg flex items-center justify-between">
            <h3 className="text-sm font-semibold text-charcoal">Service Price List</h3>
            <span className="text-xs text-warm-gray italic">Nairobi market rates · Updated August 2026</span>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-warm-border">
                {["Service", "Description", "Price", "Turnaround"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs text-warm-gray font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRICE_BANDS.map((row) => (
                <tr key={row.category} className="border-b border-warm-border last:border-0 hover:bg-ivory/40 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-medium text-charcoal">{row.category}</td>
                  <td className="px-5 py-3.5 text-xs text-charcoal-mid">{row.examples}</td>
                  <td className="px-5 py-3.5">
                    <span className={`font-mono ${row.price.includes("Assessment") ? "text-warm-gray italic text-xs" : "text-charcoal font-semibold text-sm"}`}>
                      {row.price}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-charcoal-mid">{row.turnaround}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-charcoal rounded-2xl p-6 flex items-start gap-4">
          <div className="w-8 h-8 bg-shona-orange rounded-lg flex-shrink-0 flex items-center justify-center text-white text-sm font-bold">i</div>
          <div>
            <div className="text-white font-semibold text-sm mb-1">Prices will grow more precise over time</div>
            <p className="text-warm-gray-light text-sm leading-relaxed">
              Every completed job refines the price catalogue. As Shona processes more requests, pricing becomes more accurate for customers and more predictable for specialists.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
