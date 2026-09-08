import { useState } from "react";
import PortalLayout from "@/components/PortalLayout";
import { useLiveMetric, ageLabel } from "@/hooks/useLiveData";

interface Props {
  onNavigate: (screen: number) => void;
}

const CATEGORIES = [
  { label: "Denim Jeans", base: 68 },
  { label: "Cotton Dresses", base: 52 },
  { label: "Linen Shirts", base: 41 },
  { label: "Corduroy Blazers", base: 38 },
  { label: "Knitwear", base: 27 },
  { label: "Trousers", base: 21 },
];

const RECENT = [
  { ref: "LT-2847", garment: "Denim jeans", issue: "Waist alteration", status: "In repair", customer: "Amira N.", age: "2d" },
  { ref: "LT-2846", garment: "Linen shirt", issue: "Seam repair", status: "Assessment", customer: "Kofi A.", age: "2d" },
  { ref: "LT-2845", garment: "Cotton dress", issue: "Zip replacement", status: "Quality check", customer: "Wanjiku M.", age: "3d" },
  { ref: "LT-2844", garment: "Corduroy blazer", issue: "Sleeve repair", status: "Approved", customer: "Sipho D.", age: "4d" },
  { ref: "LT-2843", garment: "Knitwear top", issue: "Hole repair", status: "Completed", customer: "Fatima O.", age: "5d" },
];

const STATUS_COLORS: Record<string, string> = {
  "In repair": "bg-blue-50 text-blue-700",
  Assessment: "bg-amber-50 text-amber-700",
  "Quality check": "bg-purple-50 text-purple-700",
  Approved: "bg-shona-pale text-shona-orange",
  Completed: "bg-green-50 text-green-700",
};

function LiveDot() {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-green-600 font-semibold">
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      LIVE
    </span>
  );
}

export default function S05BrandPortalOverview({ onNavigate }: Props) {
  const [demoMode, setDemoMode] = useState(false);

  const total = useLiveMetric(247);
  const repairs = useLiveMetric(134);
  const alterations = useLiveMetric(79);
  const inventory = useLiveMetric(34);

  const stats = [
    { label: "Total Aftercare Requests", metric: total, color: "text-shona-orange" },
    { label: "Repairs", metric: repairs, color: "text-charcoal" },
    { label: "Alterations", metric: alterations, color: "text-charcoal" },
    { label: "Inventory Recovery", metric: inventory, color: "text-charcoal" },
  ];

  const maxCat = Math.max(...CATEGORIES.map((c) => c.base)) + 10;

  return (
    <PortalLayout
      activeSection="overview"
      onNavigate={(s) => {
        const map = { overview: 4, tracking: 5, inventory: 6, intelligence: 7 };
        onNavigate(map[s]);
      }}
      onPartner={() => onNavigate(21)}
    >
      <div className="p-7">
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-3">
            <h2 className="font-serif text-2xl text-charcoal">Overview</h2>
            {!demoMode && <LiveDot />}
            {demoMode && (
              <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2.5 py-1 rounded-full">DEMO</span>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setDemoMode((d) => !d)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                demoMode
                  ? "bg-amber-100 text-amber-700 border-amber-200"
                  : "bg-white border-warm-border text-warm-gray hover:border-shona-orange"
              }`}
            >
              {demoMode ? "Exit demo" : "View demo"}
            </button>
            <button className="bg-shona-orange text-white text-sm px-4 py-1.5 rounded-lg">Export</button>
          </div>
        </div>

        {demoMode && (
          <div className="mb-5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800">
            <strong>Demo mode:</strong> This view uses sample data to illustrate how your brand's live dashboard will look once integrated. All numbers shown are illustrative.
          </div>
        )}

        {/* Live stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-warm-border p-5">
              <div className="text-xs text-warm-gray mb-2">{s.label}</div>
              <div className={`font-serif text-3xl ${s.color} mb-1 tabular-nums`}>{s.metric.value}</div>
              <div className="text-xs text-warm-gray-light">
                Updated {ageLabel(s.metric.lastUpdated)}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-5 mb-5">
          {/* Category breakdown */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-warm-border p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-semibold text-charcoal">Garment Categories</h3>
              <span className="text-xs text-warm-gray">by request volume</span>
            </div>
            <div className="space-y-3">
              {CATEGORIES.map((c) => (
                <div key={c.label} className="flex items-center gap-3">
                  <span className="text-xs text-warm-gray w-32">{c.label}</span>
                  <div className="flex-1 bg-ivory-dark rounded-full h-2">
                    <div
                      className="bg-shona-orange h-2 rounded-full transition-all duration-700"
                      style={{ width: `${(c.base / maxCat) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-charcoal w-6 text-right">{c.base}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Service split */}
          <div className="bg-white rounded-2xl border border-warm-border p-5">
            <h3 className="text-sm font-semibold text-charcoal mb-5">Service Split</h3>
            <div className="flex justify-center mb-6">
              <svg width="120" height="120" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#EEE8DF" strokeWidth="3.8" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#F47920" strokeWidth="3.8"
                  strokeDasharray="54.3 45.7" strokeDashoffset="25" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3D3A35" strokeWidth="3.8"
                  strokeDasharray="32 68" strokeDashoffset="-29.3" />
              </svg>
            </div>
            <div className="space-y-2">
              {[
                { label: "Repairs", pct: "54%", color: "bg-shona-orange" },
                { label: "Alterations", pct: "32%", color: "bg-charcoal-mid" },
                { label: "Inventory Recovery", pct: "14%", color: "bg-ivory-dark" },
              ].map((r) => (
                <div key={r.label} className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${r.color}`} />
                  <span className="text-xs text-warm-gray flex-1">{r.label}</span>
                  <span className="text-xs font-medium text-charcoal">{r.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent requests */}
        <div className="bg-white rounded-2xl border border-warm-border">
          <div className="px-5 py-4 border-b border-warm-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-charcoal">Recent Requests</h3>
            <button onClick={() => onNavigate(5)} className="text-xs text-shona-orange hover:underline">View Tracking Insights →</button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-warm-border">
                {["Ref", "Garment", "Issue", "Customer", "Status", "Age"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs text-warm-gray font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT.map((r) => (
                <tr key={r.ref} className="border-b border-warm-border last:border-0 hover:bg-ivory/50 transition-colors">
                  <td className="px-5 py-3 font-mono text-xs text-warm-gray">{r.ref}</td>
                  <td className="px-5 py-3 text-charcoal text-xs">{r.garment}</td>
                  <td className="px-5 py-3 text-charcoal-mid text-xs">{r.issue}</td>
                  <td className="px-5 py-3 text-charcoal-mid text-xs">{r.customer}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[r.status] ?? "bg-ivory text-warm-gray"}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-warm-gray">{r.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PortalLayout>
  );
}
