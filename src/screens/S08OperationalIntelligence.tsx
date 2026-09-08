import PortalLayout from "@/components/PortalLayout";
import { useLiveMetric, ageLabel } from "@/hooks/useLiveData";

interface Props {
  onNavigate: (screen: number) => void;
}

const MATERIAL_PATTERNS = [
  { label: "Denim", issues: ["Waist seam separation", "Hem fraying"], base: 48 },
  { label: "Linen", issues: ["Side seam unravelling", "Collar wear"], base: 31 },
  { label: "Cotton", issues: ["Zip failure", "Button loss"], base: 27 },
  { label: "Corduroy", issues: ["Lining wear", "Sleeve stress"], base: 19 },
  { label: "Knitwear", issues: ["Hole / snag", "Moth damage"], base: 14 },
];

function LiveDot() {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-green-600 font-semibold">
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      LIVE
    </span>
  );
}

export default function S08OperationalIntelligence({ onNavigate }: Props) {
  const repeatIssues = useLiveMetric(18);
  const recoveryRate = useLiveMetric(64);
  const avgCost = useLiveMetric(1140, 15000);
  const turnaround = useLiveMetric(42, 20000); // stored as 42 = 4.2 days

  return (
    <PortalLayout
      activeSection="intelligence"
      onNavigate={(s) => {
        const map = { overview: 4, tracking: 5, inventory: 6, intelligence: 7 };
        onNavigate(map[s]);
      }}
      onPartner={() => onNavigate(21)}
    >
      <div className="p-7">
        {/* Header — removed date/brand label */}
        <div className="flex items-center gap-3 mb-2">
          <h2 className="font-serif text-2xl text-charcoal">Operational Intelligence</h2>
          <LiveDot />
        </div>
        <div className="text-sm text-warm-gray mb-5">Service data turned into product and manufacturing insight</div>

        {/* Callout insight */}
        <div className="mb-5 bg-charcoal rounded-2xl p-5 flex items-start gap-4">
          <div className="w-10 h-10 bg-shona-orange rounded-xl flex-shrink-0 flex items-center justify-center text-white text-lg">!</div>
          <div>
            <div className="text-white font-semibold text-sm mb-1">Key Insight This Period</div>
            <p className="text-warm-gray-light text-sm leading-relaxed">
              A high share of trouser alterations involve waist adjustments — 41% of all alteration requests. This pattern has recurred over 3 consecutive periods.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs text-warm-gray-light">Suggested action:</span>
              <span className="text-xs bg-shona-orange/20 text-shona-warm rounded-full px-3 py-1">Review fit profile · Check sizing blocks · Review waistband construction</span>
            </div>
          </div>
        </div>

        {/* Live metrics grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {[
            { label: "Top Repair Issue", value: "Seam separation", sub: "34% of all repairs", live: false },
            { label: "Top Alteration", value: "Waist adjustment", sub: "41% of all alterations", live: false },
            { label: "Most Affected Garment", value: "Denim jeans", sub: "68 requests", live: false },
            { label: "Most Affected SKU", value: "LT-DENIM-029W", sub: "Recurring waist issue", live: false },
            { label: "Avg. Turnaround", value: `${(turnaround.value / 10).toFixed(1)} days`, sub: `Updated ${ageLabel(turnaround.lastUpdated)}`, live: true },
            { label: "Avg. Cost / Item", value: `KES ${avgCost.value.toLocaleString()}`, sub: `Updated ${ageLabel(avgCost.lastUpdated)}`, live: true },
            { label: "Repeat Issues", value: `${repeatIssues.value}%`, sub: `Updated ${ageLabel(repeatIssues.lastUpdated)}`, live: true },
            { label: "Recovery Rate", value: `${recoveryRate.value}%`, sub: `Updated ${ageLabel(recoveryRate.lastUpdated)}`, live: true },
          ].map((m) => (
            <div key={m.label} className="bg-white rounded-xl border border-warm-border p-4">
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className="text-xs text-warm-gray">{m.label}</div>
                {m.live && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />}
              </div>
              <div className="text-base font-semibold text-charcoal leading-tight tabular-nums">{m.value}</div>
              <div className="text-xs text-warm-gray-light mt-1">{m.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          {/* Material patterns */}
          <div className="bg-white rounded-2xl border border-warm-border p-5">
            <h3 className="text-sm font-semibold text-charcoal mb-4">Material / Fabric Patterns</h3>
            <div className="space-y-4">
              {MATERIAL_PATTERNS.map((m) => (
                <div key={m.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-charcoal">{m.label}</span>
                    <span className="text-xs text-warm-gray">{m.base}% of issues</span>
                  </div>
                  <div className="bg-ivory-dark rounded-full h-1.5 mb-1.5">
                    <div className="bg-shona-orange h-1.5 rounded-full" style={{ width: `${m.base}%` }} />
                  </div>
                  <div className="flex gap-2">
                    {m.issues.map((i) => (
                      <span key={i} className="text-xs bg-ivory rounded-full px-2 py-0.5 text-warm-gray">{i}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action framework */}
          <div className="bg-white rounded-2xl border border-warm-border p-5">
            <h3 className="text-sm font-semibold text-charcoal mb-4">From Insight to Action</h3>
            <div className="space-y-3">
              {[
                { issue: "Recurring waist seam failures — Denim", action: "Review construction spec + seam allowance", priority: "High" },
                { issue: "Zip mechanisms failing at 12 months", action: "Evaluate zip supplier quality", priority: "Medium" },
                { issue: "Linen side seams unravelling", action: "Check thread + stitch tension spec", priority: "Medium" },
                { issue: "Merino knitwear — moth vulnerability", action: "Review packaging + storage guidance", priority: "Low" },
              ].map((item) => (
                <div key={item.issue} className="flex items-start gap-3 p-3 rounded-xl bg-ivory border border-warm-border">
                  <div className={`flex-shrink-0 text-xs px-2 py-1 rounded-full font-semibold ${
                    item.priority === "High" ? "bg-red-50 text-red-700" :
                    item.priority === "Medium" ? "bg-amber-50 text-amber-700" :
                    "bg-ivory-dark text-warm-gray"
                  }`}>{item.priority}</div>
                  <div>
                    <div className="text-xs font-medium text-charcoal">{item.issue}</div>
                    <div className="text-xs text-warm-gray mt-0.5">→ {item.action}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-warm-border text-xs text-warm-gray">
              Insights derived from service activity. Not a quality audit.
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
