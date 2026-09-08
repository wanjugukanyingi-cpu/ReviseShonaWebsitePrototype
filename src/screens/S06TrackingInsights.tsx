import { useState } from "react";
import PortalLayout from "@/components/PortalLayout";
import { useLiveMetric, ageLabel } from "@/hooks/useLiveData";

interface Props {
  onNavigate: (screen: number) => void;
}

const BASE_ROWS = [
  { ref: "LT-2847", garment: "Denim jeans", material: "Denim", age: "New", source: "Existing inventory", status: "In Repair", assessment: "Waist repair", work: "Waist seam reinforcement", outcome: "Repairable" },
  { ref: "LT-2841", garment: "Corduroy blazer", material: "Corduroy", age: "Old", source: "Existing inventory", status: "Assessment", assessment: "Sleeve repair", work: "Sleeve re-lining", outcome: "Pending" },
  { ref: "LT-2838", garment: "Cotton dress", material: "Cotton", age: "New", source: "Newly catalogued", status: "Recovered", assessment: "Zip replacement", work: "Zip unit replaced", outcome: "Recovered" },
  { ref: "LT-2835", garment: "Linen shirt", material: "Linen", age: "New", source: "Newly catalogued", status: "Assessment", assessment: "Seam repair", work: "Side seam re-stitched", outcome: "Repairable" },
  { ref: "LT-2830", garment: "Knit pullover", material: "Merino wool", age: "Old", source: "Existing inventory", status: "Not Viable", assessment: "Hole repair", work: "Extensive moth damage", outcome: "Write off" },
  { ref: "LT-2827", garment: "Denim shorts", material: "Denim", age: "New", source: "Newly catalogued", status: "Recovered", assessment: "Hem alteration", work: "Hem re-cut + finished", outcome: "Recovered" },
  { ref: "LT-2822", garment: "Linen trousers", material: "Linen", age: "New", source: "Existing inventory", status: "In Repair", assessment: "Waist adjustment", work: "Waistband let out 2cm", outcome: "Repairable" },
  { ref: "LT-2818", garment: "Cotton jacket", material: "Cotton blend", age: "Old", source: "Existing inventory", status: "Assessment", assessment: "Button loss", work: "Full button set replacement", outcome: "Pending" },
];

const STATUS_STYLES: Record<string, string> = {
  "In Repair": "bg-blue-50 text-blue-700",
  Assessment: "bg-amber-50 text-amber-700",
  Recovered: "bg-green-50 text-green-700",
  "Not Viable": "bg-red-50 text-red-600",
};

const OUTCOME_STYLES: Record<string, string> = {
  Repairable: "text-shona-orange font-medium",
  Pending: "text-warm-gray",
  Recovered: "text-green-700 font-medium",
  "Write off": "text-red-500",
};

function LiveDot() {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-green-600 font-semibold">
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      LIVE
    </span>
  );
}

export default function S06TrackingInsights({ onNavigate }: Props) {
  const [search, setSearch] = useState("");
  const totalItems = useLiveMetric(BASE_ROWS.length);

  const filtered = BASE_ROWS.filter((r) =>
    !search ||
    [r.garment, r.material, r.status, r.outcome].some((v) =>
      v.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <PortalLayout
      activeSection="tracking"
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
              <h2 className="font-serif text-2xl text-charcoal">Tracking Insights</h2>
              <div className="text-sm text-warm-gray mt-0.5">Brand inventory recovery only — not customer garments</div>
            </div>
            <LiveDot />
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Filter by garment, status…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-sm bg-white border border-warm-border rounded-lg px-3 py-1.5 text-charcoal placeholder:text-warm-gray-light w-52"
            />
            <button className="bg-shona-orange text-white text-sm px-4 py-1.5 rounded-lg">Export</button>
          </div>
        </div>

        {/* Live summary pills */}
        <div className="flex gap-3 mb-5">
          {[
            { label: "All", count: totalItems.value },
            { label: "Repairable", count: BASE_ROWS.filter((r) => r.outcome === "Repairable").length },
            { label: "Recovered", count: BASE_ROWS.filter((r) => r.outcome === "Recovered").length },
            { label: "Pending", count: BASE_ROWS.filter((r) => r.outcome === "Pending").length },
            { label: "Write off", count: BASE_ROWS.filter((r) => r.outcome === "Write off").length },
          ].map((pill) => (
            <div key={pill.label} className="bg-white border border-warm-border rounded-full px-4 py-1.5 text-xs text-charcoal-mid tabular-nums">
              <span className="font-semibold text-charcoal">{pill.count}</span> {pill.label}
            </div>
          ))}
          <div className="ml-auto flex items-center gap-1.5 text-xs text-warm-gray">
            Updated {ageLabel(totalItems.lastUpdated)}
          </div>
        </div>

        {/* Live table */}
        <div className="bg-white rounded-2xl border border-warm-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-portal-bg border-b border-warm-border">
                {["Ref", "Garment", "Material / Fabric", "New / Existing", "Source", "Status", "Assessment", "Work Required", "Outcome"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-warm-gray font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.ref} className="border-b border-warm-border last:border-0 hover:bg-ivory/40 transition-colors">
                  <td className="px-4 py-4 font-mono text-xs text-warm-gray">{r.ref}</td>
                  <td className="px-4 py-4 text-charcoal text-sm font-medium">{r.garment}</td>
                  <td className="px-4 py-4 text-warm-gray text-xs">{r.material}</td>
                  <td className="px-4 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${r.age === "New" ? "bg-shona-pale text-shona-orange" : "bg-ivory text-warm-gray"}`}>
                      {r.age}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-xs text-charcoal-mid">{r.source}</td>
                  <td className="px-4 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_STYLES[r.status] ?? "bg-ivory text-warm-gray"}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-xs text-charcoal-mid">{r.assessment}</td>
                  <td className="px-4 py-4 text-xs text-charcoal-mid max-w-[140px]">{r.work}</td>
                  <td className="px-4 py-4 text-xs">
                    <span className={OUTCOME_STYLES[r.outcome] ?? "text-warm-gray"}>{r.outcome}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-xs text-warm-gray">Showing {filtered.length} of {totalItems.value} items</div>
      </div>
    </PortalLayout>
  );
}
