import ShonaLogo from "@/components/ShonaLogo";

interface Props {
  onNavigate: (screen: number) => void;
}

const STAGES = [
  { id: "submitted", label: "Request Submitted", date: "19 Aug, 10:22am", done: true },
  { id: "collected", label: "Garment Collected", date: "19 Aug, 10:47am", done: true },
  { id: "assessment", label: "Assessment", date: "20 Aug, 2:15pm", done: true },
  { id: "approved", label: "Approved", date: "20 Aug, 4:30pm", done: true },
  { id: "in-repair", label: "In Repair", date: "21 Aug — in progress", done: false, active: true },
  { id: "quality-check", label: "Quality Check", date: "Expected 22 Aug", done: false },
  { id: "ready", label: "Ready", date: "—", done: false },
  { id: "returned", label: "Returned / Collected", date: "—", done: false },
];

export default function S15CustomerTracking({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-ivory">
      <header className="bg-white px-6 py-4 border-b border-warm-border flex items-center justify-between">
        <ShonaLogo variant="small" />
        <span className="text-xs text-warm-gray uppercase tracking-widest">Track Your Garment</span>
      </header>

      <div className="max-w-lg mx-auto px-6 py-8">
        {/* Garment card */}
        <div className="bg-white rounded-2xl border border-warm-border p-5 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs text-warm-gray uppercase tracking-wider mb-1">Booking Reference</div>
              <div className="font-mono font-semibold text-charcoal">SH-2026-08-4291</div>
            </div>
            <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">In Repair</span>
          </div>
          <div className="mt-4 pt-4 border-t border-warm-border grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-warm-gray mb-0.5">Garment</div>
              <div className="text-sm font-medium text-charcoal">Denim jeans</div>
            </div>
            <div>
              <div className="text-xs text-warm-gray mb-0.5">Service</div>
              <div className="text-sm font-medium text-charcoal">Waist alteration</div>
            </div>
            <div>
              <div className="text-xs text-warm-gray mb-0.5">Approved price</div>
              <div className="text-sm font-medium text-charcoal">KES 950</div>
            </div>
            <div>
              <div className="text-xs text-warm-gray mb-0.5">Est. return</div>
              <div className="text-sm font-medium text-charcoal">23 Aug 2026</div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl border border-warm-border p-5">
          <h3 className="text-sm font-semibold text-charcoal mb-5">Your Garment's Journey</h3>
          <div className="relative">
            {/* Vertical track */}
            <div className="absolute left-4 top-4 bottom-4 w-px bg-warm-border" />
            <div
              className="absolute left-4 top-4 w-px bg-shona-orange"
              style={{ height: `${(4 / 7) * 100}%` }}
            />

            <div className="space-y-1">
              {STAGES.map((stage, i) => (
                <div key={stage.id} className="flex items-start gap-4 py-2.5">
                  <div
                    className={`relative z-10 w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold border-2 ${
                      stage.done
                        ? "bg-shona-orange border-shona-orange text-white"
                        : stage.active
                        ? "bg-white border-shona-orange text-shona-orange ring-4 ring-shona-pale"
                        : "bg-white border-warm-border text-warm-gray-light"
                    }`}
                  >
                    {stage.done ? "✓" : i + 1}
                  </div>
                  <div className="flex-1 pt-1">
                    <div className={`text-sm font-medium ${stage.done || stage.active ? "text-charcoal" : "text-warm-gray"}`}>
                      {stage.label}
                    </div>
                    <div className={`text-xs mt-0.5 ${stage.active ? "text-shona-orange font-medium" : "text-warm-gray"}`}>
                      {stage.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* WhatsApp tracking CTA */}
        <div
          className="mt-4 bg-[#25D366] rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-[#1ebe5d] transition-colors"
          onClick={() => onNavigate(15)}
        >
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0">💬</div>
          <div>
            <div className="text-white font-medium text-sm">Get WhatsApp updates</div>
            <div className="text-white/80 text-xs mt-0.5">Receive automated status updates on WhatsApp</div>
          </div>
          <div className="ml-auto text-white/80 text-sm">→</div>
        </div>

        <div
          className="mt-3 bg-white border border-warm-border rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:border-shona-orange transition-colors"
          onClick={() => onNavigate(15)}
        >
          <div className="w-10 h-10 bg-shona-pale rounded-xl flex items-center justify-center text-shona-orange text-lg flex-shrink-0">🧵</div>
          <div>
            <div className="text-charcoal font-medium text-sm">Chat with a specialist</div>
            <div className="text-warm-gray text-xs mt-0.5">Technical questions about your repair or alteration</div>
          </div>
          <div className="ml-auto text-warm-gray text-sm">→</div>
        </div>
      </div>
    </div>
  );
}
