import ShonaLogo from "@/components/ShonaLogo";

interface Props {
  onNavigate: (screen: number) => void;
}

export default function S09CustomerOverview({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      <header className="px-6 py-4 border-b border-warm-border bg-white flex items-center justify-between">
        <ShonaLogo variant="small" />
        <span className="text-xs text-warm-gray uppercase tracking-widest">Aftercare</span>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="max-w-lg mx-auto">
          <div className="w-16 h-16 bg-shona-orange rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-md">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9,22 9,12 15,12 15,22" />
            </svg>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight mb-4">
            Repair it. Alter it.<br />
            <em className="not-italic text-shona-orange">Keep wearing it.</em>
          </h1>
          <p className="text-warm-gray text-base leading-relaxed mb-10">
            Keep the clothes you love in use for longer. Shona connects you with trusted specialists who understand your garment and your brand.
          </p>

          {/* Main CTAs */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => onNavigate(9)}
              className="bg-shona-orange text-white rounded-2xl px-6 py-6 flex flex-col items-start gap-2 hover:bg-shona-warm transition-colors shadow-sm"
            >
              <div className="text-2xl">🧵</div>
              <div className="font-semibold text-lg">Repair my garment</div>
              <div className="text-sm text-white/80">Fix a seam, zip, button, tear or other damage</div>
            </button>
            <button
              onClick={() => onNavigate(9)}
              className="bg-charcoal text-white rounded-2xl px-6 py-6 flex flex-col items-start gap-2 hover:bg-charcoal-mid transition-colors shadow-sm"
            >
              <div className="text-2xl">✂️</div>
              <div className="font-semibold text-lg">Alter my garment</div>
              <div className="text-sm text-white/80">Adjust fit — waist, hem, length, sleeves</div>
            </button>
          </div>

          {/* Specialist option */}
          <div
            className="bg-white border border-warm-border rounded-2xl px-5 py-4 flex items-center gap-4 cursor-pointer hover:border-shona-orange transition-colors"
            onClick={() => onNavigate(15)}
          >
            <div className="w-10 h-10 bg-shona-pale rounded-xl flex items-center justify-center flex-shrink-0 text-shona-orange text-lg">💬</div>
            <div className="text-left">
              <div className="text-sm font-medium text-charcoal">Not sure what you need?</div>
              <div className="text-xs text-warm-gray mt-0.5">Talk to a Shona specialist — we'll guide you through the options.</div>
            </div>
            <div className="ml-auto text-warm-gray-light">→</div>
          </div>
        </div>
      </main>

      {/* How it works strip */}
      <div className="bg-white border-t border-warm-border px-6 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs text-warm-gray uppercase tracking-widest text-center mb-4">How it works</div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { step: "1", label: "Describe your garment" },
              { step: "2", label: "Get a price estimate" },
              { step: "3", label: "Book a pickup" },
              { step: "4", label: "Track your repair" },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-7 h-7 bg-shona-orange rounded-full text-white text-xs font-semibold flex items-center justify-center mx-auto mb-2">{s.step}</div>
                <div className="text-xs text-charcoal-mid leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
