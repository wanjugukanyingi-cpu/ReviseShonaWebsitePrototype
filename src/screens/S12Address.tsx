import { useState } from "react";
import BookingLayout from "@/components/BookingLayout";

interface Props {
  onNavigate: (screen: number) => void;
}

export default function S12Address({ onNavigate }: Props) {
  const [form, setForm] = useState({
    name: "Amira Njoroge",
    phone: "0712 345 678",
    building: "Westgate Apartments, Block C",
    street: "Westlands, Nairobi",
    directions: "3rd floor, green door. Ring bell for C7.",
  });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <BookingLayout step={3} title="Where should we collect from?">
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-charcoal block mb-1.5">Full name <span className="text-shona-orange">*</span></label>
            <input
              value={form.name}
              onChange={set("name")}
              className="w-full border border-warm-border rounded-xl px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:border-shona-orange"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-charcoal block mb-1.5">Phone number <span className="text-shona-orange">*</span></label>
            <input
              value={form.phone}
              onChange={set("phone")}
              className="w-full border border-warm-border rounded-xl px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:border-shona-orange"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-charcoal block mb-1.5">Building / estate / compound</label>
          <input
            value={form.building}
            onChange={set("building")}
            className="w-full border border-warm-border rounded-xl px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:border-shona-orange"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-charcoal block mb-1.5">Street / area <span className="text-shona-orange">*</span></label>
          <input
            value={form.street}
            onChange={set("street")}
            className="w-full border border-warm-border rounded-xl px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:border-shona-orange"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-charcoal block mb-1.5">Additional directions <span className="text-warm-gray font-normal">(optional)</span></label>
          <textarea
            value={form.directions}
            onChange={set("directions")}
            rows={2}
            className="w-full border border-warm-border rounded-xl px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:border-shona-orange resize-none"
            placeholder="Floor, door colour, landmark, gate code…"
          />
        </div>

        {/* Map placeholder (secondary) */}
        <div className="bg-ivory-dark rounded-2xl overflow-hidden border border-warm-border">
          <div className="h-40 relative flex items-center justify-center bg-[#e8e4dd]">
            {/* Simple map placeholder with grid lines */}
            <svg width="100%" height="100%" className="absolute inset-0 opacity-20">
              {[...Array(8)].map((_, i) => (
                <line key={`h${i}`} x1="0" y1={`${i * 14}%`} x2="100%" y2={`${i * 14}%`} stroke="#6B6860" strokeWidth="0.5" />
              ))}
              {[...Array(12)].map((_, i) => (
                <line key={`v${i}`} x1={`${i * 9}%`} y1="0" x2={`${i * 9}%`} y2="100%" stroke="#6B6860" strokeWidth="0.5" />
              ))}
            </svg>
            <div className="relative flex flex-col items-center">
              <div className="w-8 h-8 bg-shona-orange rounded-full flex items-center justify-center text-white text-sm shadow-lg">📍</div>
              <div className="mt-1 bg-white text-xs text-charcoal px-3 py-1 rounded-full shadow-sm border border-warm-border">
                Westlands, Nairobi
              </div>
            </div>
          </div>
          <div className="px-4 py-2.5 flex items-center gap-2">
            <span className="text-xs text-warm-gray">Map confirms your area. Address form is the primary input.</span>
            <span className="ml-auto text-xs text-shona-orange cursor-pointer hover:underline">Refine pin →</span>
          </div>
        </div>

        <button
          onClick={() => onNavigate(12)}
          className="w-full bg-shona-orange text-white py-3.5 rounded-xl font-medium text-sm hover:bg-shona-warm transition-colors"
        >
          Continue to Schedule Pickup →
        </button>
      </div>
    </BookingLayout>
  );
}
