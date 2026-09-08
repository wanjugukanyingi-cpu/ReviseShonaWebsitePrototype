import PortalLayout from "@/components/PortalLayout";
import { useLiveMetric, ageLabel } from "@/hooks/useLiveData";

interface Props {
  onNavigate: (screen: number) => void;
}

const BASE_STAGES = [
  { id: "received", label: "Items Received", base: 34, color: "bg-blue-100 text-blue-800" },
  { id: "assessment", label: "Assessment", base: 12, color: "bg-amber-100 text-amber-800" },
  { id: "repairable", label: "Repairable", base: 9, color: "bg-shona-pale text-shona-orange" },
  { id: "recovered", label: "Recovered", base: 18, color: "bg-green-100 text-green-800" },
  { id: "not-viable", label: "Not Viable", base: 4, color: "bg-red-50 text-red-700" },
];

const ITEMS = [
  { sku: "LT-DENIM-029W", category: "Denim jeans", damage: "Waist seam separation", qty: 6, estimate: "KES 1,200", value: "KES 8,400", rec: "Recover" },
  { sku: "LT-CORD-018M", category: "Corduroy blazer", damage: "Sleeve lining tear", qty: 3, estimate: "KES 1,800", value: "KES 16,200", rec: "Recover" },
  { sku: "LT-KNIT-007F", category: "Merino pullover", damage: "Extensive moth damage", qty: 2, estimate: "KES 3,500", value: "KES 4,200", rec: "Write off" },
  { sku: "LT-LINEN-041S", category: "Linen shirt", damage: "Side seam unravelled", qty: 8, estimate: "KES 900", value: "KES 7,200", rec: "Recover" },
  { sku: "LT-COTT-055D", category: "Cotton dress", damage: "Zip mechanism failed", qty: 4, estimate: "KES 800", value: "KES 5,600", rec: "Recover" },
  { sku: "LT-TROU-012L", category: "Linen trousers", damage: "Waistband structural failure", qty: 5, estimate: "KES 1,400", value: "KES 10,500", rec: "Hold" },
];

const REC_STYLES: Record<string, string> = {
  Recover: "bg-green-100 text-green-800 font-semibold",
  Hold: "bg-amber-100 text-amber-800 font-semibold",
  "Write off": "bg-red-50 text-red-700 font-semibold",
};

function LiveDot() {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-green-600 font-semibold">
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      LIVE
    </span>
  );
}

export default function S07InventoryRecovery({ onNavigate }: Props) {
  const received = useLiveMetric(34);
  const recovered = useLiveMetric(18);

  const stages = BASE_STAGES.map((s) => ({
    ...s,
    count: s.id === "received" ? received.value : s.id === "recovered" ? recovered.value : s.base,
  }));

  return (
    <PortalLayout
      activeSection="inventory"
      onNavigate={(s) => {
        const map = { overview: 4, tracking: 5, inventory: 6, intelligence: 7 };
        onNavigate(map[s]);
      }}
      onPartner={() => onNavigate(21)}
    >
      <div className="p-7">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="font-serif text-2xl text-charcoal">Inventory Recovery</h2>
              <div className="text-sm text-warm-gray mt-0.5">Assessment and recovery workflow for brand inventory</div>
            </div>
            <LiveDot />
          </div>
          {/* "New Assessment" leads to intake flow */}
          <button
            onClick={() => onNavigate(22)}
            className="bg-shona-orange text-white text-sm px-4 py-2 rounded-lg hover:bg-shona-warm transition-colors"
          >
            + New Assessment
          </button>
        </div>

        {/* Live pipeline */}
        <div className="bg-white rounded-2xl border border-warm-border p-5 mb-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-semibold text-warm-gray uppercase tracking-wider">Recovery Pipeline</div>
            <div className="text-xs text-warm-gray">Updated {ageLabel(received.lastUpdated)}</div>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {stages.map((stage, i) => (
              <div key={stage.id} className="flex items-center gap-2 flex-shrink-0">
                <div className={`rounded-xl px-5 py-3 text-center min-w-[110px] ${stage.color}`}>
                  <div className="text-2xl font-serif font-light tabular-nums">{stage.count}</div>
                  <div className="text-xs font-medium mt-0.5">{stage.label}</div>
                </div>
                {i < stages.length - 1 && (
                  <div className="text-warm-gray-light text-lg flex-shrink-0">→</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-shona-pale border-l-4 border-shona-orange rounded-xl px-5 py-3 mb-5">
          <div className="text-sm font-medium text-charcoal">Professional assessment protects garment quality and brand trust.</div>
          <div className="text-xs text-warm-gray mt-1">All recommendations are made by Shona-vetted specialists before any work proceeds. No garment is repaired without a Shona assessment and brand approval.</div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-warm-border overflow-hidden">
          <div className="px-5 py-4 border-b border-warm-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-charcoal">Assessment Log</h3>
            <span className="text-xs text-warm-gray">{ITEMS.length} items assessed this period</span>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-portal-bg border-b border-warm-border">
                {["SKU / Category", "Damage", "Qty", "Repair Estimate", "Expected Recovered Value", "Recommendation"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs text-warm-gray font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ITEMS.map((item) => (
                <tr key={item.sku} className="border-b border-warm-border last:border-0 hover:bg-ivory/40 transition-colors">
                  <td className="px-5 py-4">
                    <div className="text-sm font-medium text-charcoal">{item.category}</div>
                    <div className="text-xs font-mono text-warm-gray mt-0.5">{item.sku}</div>
                  </td>
                  <td className="px-5 py-4 text-xs text-charcoal-mid">{item.damage}</td>
                  <td className="px-5 py-4 text-sm text-charcoal">{item.qty}</td>
                  <td className="px-5 py-4 text-sm text-charcoal font-mono">{item.estimate}</td>
                  <td className="px-5 py-4 text-sm text-charcoal font-mono font-semibold">{item.value}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-3 py-1.5 rounded-full ${REC_STYLES[item.rec] ?? "bg-ivory text-warm-gray"}`}>
                      {item.rec}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          {[
            { label: "Total items assessed", value: "28" },
            { label: "Estimated recovery value", value: "KES 52,100" },
            { label: "Recovery rate", value: `${Math.round((recovered.value / received.value) * 100)}%` },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-warm-border rounded-xl px-5 py-4">
              <div className="text-xs text-warm-gray mb-1">{s.label}</div>
              <div className="font-serif text-2xl text-charcoal tabular-nums">{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
}
