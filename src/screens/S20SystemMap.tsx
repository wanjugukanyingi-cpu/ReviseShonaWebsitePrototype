import ShonaLogo from "@/components/ShonaLogo";

interface Props {
  onNavigate: (screen: number) => void;
}

function Box({ label, sub, accent = false, dark = false }: { label: string; sub?: string; accent?: boolean; dark?: boolean }) {
  return (
    <div className={`rounded-xl px-4 py-3 text-center border ${
      accent ? "bg-shona-orange border-shona-orange text-white" :
      dark ? "bg-charcoal border-charcoal text-white" :
      "bg-white border-warm-border text-charcoal"
    }`}>
      <div className={`text-sm font-semibold ${accent || dark ? "text-white" : "text-charcoal"}`}>{label}</div>
      {sub && <div className={`text-xs mt-0.5 ${accent ? "text-white/75" : dark ? "text-warm-gray-light" : "text-warm-gray"}`}>{sub}</div>}
    </div>
  );
}

function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center my-1">
      <div className="w-px h-4 bg-warm-border" />
      {label && <div className="text-xs text-warm-gray bg-ivory px-2 py-0.5 rounded-full border border-warm-border my-0.5">{label}</div>}
      <div className="text-warm-gray text-sm">↓</div>
    </div>
  );
}

export default function S20SystemMap({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-ivory">
      <header className="bg-white px-6 py-4 border-b border-warm-border flex items-center justify-between">
        <ShonaLogo variant="small" />
        <h1 className="font-serif text-xl text-charcoal">Complete Shona System Map</h1>
        <button onClick={() => onNavigate(20)} className="text-sm text-shona-orange hover:underline">Design Decisions →</button>
      </header>

      <div className="px-6 py-8 max-w-5xl mx-auto">
        <p className="text-center text-warm-gray text-sm mb-8 max-w-lg mx-auto">
          Two parallel after-sales flows, coordinated by Shona, both generating intelligence that returns to the brand.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-6">
          {/* Brand flow */}
          <div>
            <div className="text-center mb-4">
              <span className="inline-block bg-charcoal text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full">Brand / Inventory Flow</span>
            </div>
            <div className="flex flex-col items-center w-full max-w-xs mx-auto">
              <Box label="Manufacturing / Product Design" sub="Garment created" />
              <Arrow />
              <Box label="Damaged / Defective Inventory" sub="Quality issue identified" />
              <Arrow label="Brand initiates" />
              <Box label="Shona Assessment" sub="Intake + specialist review" accent />
              <Arrow />
              <Box label="Repair / Alter / Recover" sub="Specialist does the work" />
              <Arrow />
              <Box label="Brand Ecosystem" sub="Recovered inventory re-enters stock" dark />
            </div>
          </div>

          {/* Customer flow */}
          <div>
            <div className="text-center mb-4">
              <span className="inline-block bg-shona-orange text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full">Customer Aftercare Flow</span>
            </div>
            <div className="flex flex-col items-center w-full max-w-xs mx-auto">
              <Box label="Brand Sale" sub="Customer purchases garment" />
              <Arrow />
              <Box label="Customer Purchase" sub="Garment in use" />
              <Arrow />
              <Box label="Repair / Alteration Request" sub="Customer initiates via Shona" />
              <Arrow label="Booking + intake" />
              <Box label="Shona Coordinates" sub="Specialist + logistics + comms" accent />
              <Arrow label="Price + approval" />
              <Box label="Address + Pickup" sub="Collection arranged" />
              <Arrow />
              <Box label="Repair / Alteration" sub="Specialist work completed" />
              <Arrow />
              <Box label="Quality Check" sub="Shona verifies" />
              <Arrow />
              <Box label="Return / Collection" sub="Garment back to customer" />
              <Arrow />
              <Box label="Customer Retained" sub="Stays in brand ecosystem" dark />
            </div>
          </div>
        </div>

        {/* Convergence */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-8">
            <div className="w-px h-8 bg-charcoal opacity-30" />
            <div className="w-px h-8 bg-shona-orange" />
          </div>
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            <div className="w-px h-8 bg-charcoal/30 justify-self-end" />
            <div className="w-px h-8 bg-shona-orange justify-self-start" />
          </div>
        </div>

        {/* Intelligence output */}
        <div className="max-w-xl mx-auto">
          <div className="bg-charcoal rounded-2xl p-6 text-center">
            <div className="text-white/50 text-xs uppercase tracking-widest mb-2">Both flows generate →</div>
            <div className="font-serif text-2xl text-white mb-2">Operational + Product Intelligence</div>
            <div className="text-warm-gray-light text-sm leading-relaxed mb-4">
              Repair patterns · Material failures · Fit issues · SKU performance · Turnaround data · Recovery rates
            </div>
            <Arrow />
            <div className="bg-shona-orange/20 rounded-xl px-5 py-3 border border-shona-orange/30">
              <div className="text-shona-warm font-semibold text-sm">Feeds back to the Brand</div>
              <div className="text-warm-gray-light text-xs mt-1">Product design · Manufacturing spec · Sizing · Quality control</div>
            </div>
          </div>
        </div>

        {/* Customer tracking note */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 flex items-start gap-2">
          <span className="text-amber-600 text-sm mt-0.5">⚠</span>
          <p className="text-sm text-amber-800">
            <strong>Important separation:</strong> Customer garment tracking (the customer's repair journey) is never mixed with Brand Tracking Insights (inventory recovery). These are distinct experiences with distinct data flows.
          </p>
        </div>
      </div>
    </div>
  );
}
