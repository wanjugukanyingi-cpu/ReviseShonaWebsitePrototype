import { useState } from "react";
import BookingLayout from "@/components/BookingLayout";

interface Props {
  onNavigate: (screen: number) => void;
}

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const DATES = [
  [null, null, null, null, 1, 2, 3],
  [4, 5, 6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22, 23, 24],
  [25, 26, 27, 28, 29, 30, 31],
];

const UNAVAILABLE = [1, 2, 3, 7, 14, 21];
const SLOTS = ["09:00 – 11:00", "11:00 – 13:00", "14:00 – 16:00", "16:00 – 18:00"];
const SLOT_AVAIL = [true, true, false, true];

export default function S13Calendar({ onNavigate }: Props) {
  const [selectedDate, setSelectedDate] = useState(19);
  const [selectedSlot, setSelectedSlot] = useState(0);

  return (
    <BookingLayout step={4} title="When should we collect?">
      <div className="space-y-5">
        {/* Calendar */}
        <div className="bg-white rounded-2xl border border-warm-border p-5">
          <div className="flex items-center justify-between mb-4">
            <button className="w-8 h-8 rounded-lg border border-warm-border flex items-center justify-center text-charcoal-mid hover:border-shona-orange transition-colors">‹</button>
            <span className="text-sm font-semibold text-charcoal">August 2026</span>
            <button className="w-8 h-8 rounded-lg border border-warm-border flex items-center justify-center text-charcoal-mid hover:border-shona-orange transition-colors">›</button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-xs text-warm-gray font-medium py-1">{d}</div>
            ))}
          </div>

          {DATES.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7 gap-1 mb-1">
              {week.map((date, di) => {
                if (!date) return <div key={di} />;
                const unavail = UNAVAILABLE.includes(date);
                const selected = date === selectedDate;
                const today = date === 18;
                return (
                  <button
                    key={di}
                    disabled={unavail}
                    onClick={() => setSelectedDate(date)}
                    className={`h-9 w-9 mx-auto rounded-lg text-sm transition-colors ${
                      selected
                        ? "bg-shona-orange text-white font-semibold"
                        : unavail
                        ? "text-warm-gray-light cursor-not-allowed"
                        : today
                        ? "border border-shona-orange text-shona-orange font-medium hover:bg-shona-pale"
                        : "text-charcoal hover:bg-shona-pale hover:text-shona-orange"
                    }`}
                  >
                    {date}
                  </button>
                );
              })}
            </div>
          ))}

          <div className="mt-3 flex items-center gap-4 text-xs text-warm-gray">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-shona-orange" /> Selected</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded border border-shona-orange" /> Today</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-ivory-dark" /> Unavailable</div>
          </div>
        </div>

        {/* Time slots */}
        <div>
          <div className="text-sm font-medium text-charcoal mb-3">
            Available slots — {selectedDate ? `Tuesday, ${selectedDate} August` : "Select a date"}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {SLOTS.map((slot, i) => (
              <button
                key={i}
                disabled={!SLOT_AVAIL[i]}
                onClick={() => setSelectedSlot(i)}
                className={`py-3.5 px-4 rounded-xl border text-sm transition-colors ${
                  !SLOT_AVAIL[i]
                    ? "border-warm-border text-warm-gray-light bg-ivory cursor-not-allowed line-through"
                    : selectedSlot === i
                    ? "bg-shona-orange text-white border-shona-orange font-medium"
                    : "bg-white text-charcoal border-warm-border hover:border-shona-orange hover:text-shona-orange"
                }`}
              >
                {slot}
                {!SLOT_AVAIL[i] && <div className="text-xs mt-0.5">Fully booked</div>}
              </button>
            ))}
          </div>
        </div>

        {/* Selection summary */}
        {selectedDate && (
          <div className="bg-shona-pale rounded-xl px-4 py-3 flex items-center gap-3">
            <div className="text-shona-orange text-lg">📅</div>
            <div>
              <div className="text-sm font-medium text-charcoal">
                Tuesday, {selectedDate} August · {SLOTS[selectedSlot]}
              </div>
              <div className="text-xs text-warm-gray mt-0.5">Pickup from Westlands, Nairobi</div>
            </div>
          </div>
        )}

        <button
          onClick={() => onNavigate(13)}
          className="w-full bg-shona-orange text-white py-3.5 rounded-xl font-medium text-sm hover:bg-shona-warm transition-colors"
        >
          Continue to Confirm →
        </button>
      </div>
    </BookingLayout>
  );
}
