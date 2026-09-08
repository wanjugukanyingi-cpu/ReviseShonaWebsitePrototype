import { useState } from "react";
import BookingLayout from "@/components/BookingLayout";

interface Props {
  onNavigate: (screen: number) => void;
}

export default function S14Confirmation({ onNavigate }: Props) {
  const [returnMethod, setReturnMethod] = useState<"doorstep" | "collection">("doorstep");
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <div className="min-h-screen bg-ivory flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 bg-shona-orange rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
          <span className="text-white text-2xl">✓</span>
        </div>
        <h2 className="font-serif text-3xl text-charcoal mb-3">Booking Confirmed</h2>
        <p className="text-warm-gray text-sm max-w-sm mb-2">Your reference is <strong className="text-charcoal font-mono">SH-2026-08-4291</strong></p>
        <p className="text-warm-gray text-sm max-w-sm mb-8">We'll collect your denim jeans on Tuesday, 19 August between 09:00–11:00. You'll receive a WhatsApp confirmation shortly.</p>
        <div className="flex gap-3">
          <button
            onClick={() => onNavigate(14)}
            className="bg-shona-orange text-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-shona-warm transition-colors"
          >
            Track my garment →
          </button>
          <button
            onClick={() => onNavigate(8)}
            className="bg-white border border-warm-border text-charcoal px-6 py-3 rounded-xl text-sm hover:border-shona-orange transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <BookingLayout step={5} title="Review and confirm">
      <div className="space-y-5">
        {/* Booking summary */}
        <div className="bg-white rounded-2xl border border-warm-border divide-y divide-warm-border">
          {[
            { label: "Garment", value: "Denim jeans — Loom & Thread" },
            { label: "Service", value: "Waist alteration" },
            { label: "Estimated price", value: "KES 800 – 1,200" },
            { label: "Pickup date", value: "Tuesday, 19 August 2026" },
            { label: "Pickup time", value: "09:00 – 11:00" },
            { label: "Address", value: "Westgate Apartments, Block C, Westlands" },
          ].map((row) => (
            <div key={row.label} className="flex items-start justify-between px-5 py-3.5">
              <span className="text-xs text-warm-gray w-32 flex-shrink-0">{row.label}</span>
              <span className="text-sm text-charcoal font-medium text-right">{row.value}</span>
            </div>
          ))}
        </div>

        {/* Return method */}
        <div>
          <label className="text-sm font-medium text-charcoal block mb-2">How would you like your garment returned?</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setReturnMethod("doorstep")}
              className={`py-4 px-4 rounded-xl border text-sm text-left transition-colors ${
                returnMethod === "doorstep"
                  ? "bg-shona-orange text-white border-shona-orange"
                  : "bg-white text-charcoal border-warm-border hover:border-shona-orange"
              }`}
            >
              <div className="text-xl mb-1">🚚</div>
              <div className="font-medium">Doorstep delivery</div>
              <div className={`text-xs mt-0.5 ${returnMethod === "doorstep" ? "text-white/80" : "text-warm-gray"}`}>We bring it back to you</div>
            </button>
            <button
              onClick={() => setReturnMethod("collection")}
              className={`py-4 px-4 rounded-xl border text-sm text-left transition-colors ${
                returnMethod === "collection"
                  ? "bg-shona-orange text-white border-shona-orange"
                  : "bg-white text-charcoal border-warm-border hover:border-shona-orange"
              }`}
            >
              <div className="text-xl mb-1">📦</div>
              <div className="font-medium">Collection</div>
              <div className={`text-xs mt-0.5 ${returnMethod === "collection" ? "text-white/80" : "text-warm-gray"}`}>You collect from a drop point</div>
            </button>
          </div>
        </div>

        {/* Note */}
        <div className="bg-ivory border border-warm-border rounded-xl px-4 py-3 text-xs text-warm-gray leading-relaxed">
          Final price is confirmed after specialist assessment. You'll receive a WhatsApp message with the recommendation and final price before any work begins — no surprises.
        </div>

        <button
          onClick={() => setConfirmed(true)}
          className="w-full bg-shona-orange text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-shona-warm transition-colors"
        >
          Confirm Booking
        </button>
      </div>
    </BookingLayout>
  );
}
