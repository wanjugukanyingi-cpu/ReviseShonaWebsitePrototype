import ShonaLogo from "@/components/ShonaLogo";

interface Props {
  onNavigate: (screen: number) => void;
}

const BRAND_STEPS = [
  { label: "Manufacturing", sub: "Product design phase" },
  { label: "Damage / Quality Issue", sub: "Defect identified in inventory" },
  { label: "Shona Assessment", sub: "Professional intake + diagnosis" },
  { label: "Repair / Alteration", sub: "Specialist-led restoration" },
  { label: "Recover Value", sub: "Repaired item returns to stock" },
  { label: "Brand Ecosystem", sub: "Revenue retained, waste reduced" },
];

const CUSTOMER_STEPS = [
  { label: "Brand Sale", sub: "Customer purchases garment" },
  { label: "Repair / Alteration Need", sub: "Customer initiates request" },
  { label: "Shona Intake", sub: "Booking + garment details" },
  { label: "Specialist + Assessment", sub: "Diagnosis + pricing" },
  { label: "Repair / Alteration", sub: "Skilled specialist does the work" },
  { label: "Quality Check + Return", sub: "Garment returned to customer" },
  { label: "Customer Retained", sub: "Stays in brand ecosystem" },
];

function FlowStep({ label, sub, isLast = false }: { label: string; sub: string; isLast?: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white border border-warm-border rounded-xl px-4 py-3 text-center w-full shadow-sm">
        <div className="text-sm font-semibold text-charcoal">{label}</div>
        <div className="text-xs text-warm-gray mt-0.5">{sub}</div>
      </div>
      {!isLast && (
        <div className="w-px h-4 bg-warm-border my-0.5" />
      )}
    </div>
  );
}

export default function S03HowItWorks({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Nav */}
      <header className="px-8 py-5 border-b border-warm-border bg-white flex items-center justify-between">
        <ShonaLogo variant="small" />
        <h1 className="font-serif text-xl text-charcoal">How Shona Works</h1>
        <button onClick={() => onNavigate(4)} className="text-sm text-shona-orange font-medium hover:underline">For Brands →</button>
      </header>

      <div className="px-8 py-10 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block bg-shona-pale text-shona-orange text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
            One System. Two Experiences.
          </div>
          <h2 className="font-serif text-4xl text-charcoal mb-3">
            After-Sales, Structured for Everyone
          </h2>
          <p className="text-warm-gray max-w-xl mx-auto text-base">
            Shona coordinates the whole after-sales process — for brands recovering inventory and for customers repairing garments they love.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Brand Experience */}
          <div className="bg-white rounded-3xl border border-warm-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-charcoal rounded-lg flex items-center justify-center text-white text-xs font-bold">B</div>
              <div>
                <div className="text-sm font-semibold text-charcoal">Experience 1</div>
                <div className="text-xs text-warm-gray">Brand / Acquisition / Inventory</div>
              </div>
            </div>
            <div className="space-y-0">
              {BRAND_STEPS.map((step, i) => (
                <FlowStep key={i} label={step.label} sub={step.sub} isLast={i === BRAND_STEPS.length - 1} />
              ))}
            </div>
            <div className="mt-4 bg-shona-pale rounded-xl p-3 text-center">
              <div className="text-xs text-shona-orange font-semibold">+ Revenue Recovery Opportunity</div>
              <div className="text-xs text-warm-gray mt-0.5">Recovered inventory returned to sale at full or partial value</div>
            </div>
          </div>

          {/* Customer Experience */}
          <div className="bg-white rounded-3xl border border-warm-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-shona-orange rounded-lg flex items-center justify-center text-white text-xs font-bold">C</div>
              <div>
                <div className="text-sm font-semibold text-charcoal">Experience 2</div>
                <div className="text-xs text-warm-gray">Customer Aftercare Journey</div>
              </div>
            </div>
            <div className="space-y-0">
              {CUSTOMER_STEPS.map((step, i) => (
                <FlowStep key={i} label={step.label} sub={step.sub} isLast={i === CUSTOMER_STEPS.length - 1} />
              ))}
            </div>
            <div className="mt-4 bg-ivory rounded-xl p-3 text-center border border-warm-border">
              <div className="text-xs text-charcoal-mid font-semibold">+ Brand Loyalty Retained</div>
              <div className="text-xs text-warm-gray mt-0.5">Customer stays in ecosystem with a positive after-sales experience</div>
            </div>
          </div>
        </div>

        {/* Shared output */}
        <div className="mt-6 bg-charcoal rounded-2xl p-6 text-center">
          <div className="text-white/50 text-xs uppercase tracking-widest mb-2">Both experiences feed →</div>
          <div className="text-white font-serif text-2xl mb-2">Operational + Product Intelligence</div>
          <div className="text-warm-gray-light text-sm max-w-md mx-auto">
            Every repair, alteration and recovery generates data that helps brands improve product design, materials and sizing.
          </div>
          <button
            onClick={() => onNavigate(7)}
            className="mt-4 bg-shona-orange text-white text-sm px-5 py-2.5 rounded-xl hover:bg-shona-warm transition-colors"
          >
            See Operational Intelligence →
          </button>
        </div>
      </div>
    </div>
  );
}
