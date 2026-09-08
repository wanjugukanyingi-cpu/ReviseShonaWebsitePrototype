import ShonaLogo from "./ShonaLogo";

interface BookingLayoutProps {
  step: number;
  totalSteps?: number;
  title: string;
  children: React.ReactNode;
}

const STEPS = [
  "Garment",
  "Issue & Pricing",
  "Address",
  "Schedule",
  "Confirm",
];

export default function BookingLayout({ step, title, children }: BookingLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top nav */}
      <header className="border-b border-warm-border px-6 py-4 flex items-center justify-between">
        <ShonaLogo variant="small" />
        <span className="text-sm text-warm-gray">Aftercare Booking</span>
      </header>

      {/* Step indicator */}
      <div className="px-6 py-5 border-b border-warm-border bg-ivory">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((label, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                    i + 1 < step
                      ? "bg-shona-orange text-white"
                      : i + 1 === step
                      ? "bg-shona-orange text-white ring-4 ring-shona-pale"
                      : "bg-ivory-dark text-warm-gray"
                  }`}
                >
                  {i + 1 < step ? "✓" : i + 1}
                </div>
                <span
                  className={`text-xs hidden sm:block ${
                    i + 1 === step ? "text-charcoal font-medium" : "text-warm-gray"
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div className="relative h-1 bg-ivory-dark rounded-full">
            <div
              className="absolute inset-y-0 left-0 bg-shona-orange rounded-full transition-all"
              style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-xl mx-auto">
          <h2 className="font-serif text-2xl text-charcoal mb-6">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}
