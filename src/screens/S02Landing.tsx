import ShonaLogo from "@/components/ShonaLogo";

interface Props {
  onNavigate: (screen: number) => void;
}

export default function S02Landing({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      {/* Nav */}
      <header className="sticky top-8 z-30 mx-6 mt-4">
        <div className="bg-white/90 backdrop-blur border border-warm-border rounded-2xl px-6 py-3 flex items-center justify-between shadow-sm">
          <ShonaLogo variant="nav" />
          <nav className="hidden md:flex items-center gap-6 text-sm text-charcoal-mid">
            <button onClick={() => onNavigate(2)} className="hover:text-shona-orange transition-colors">How Shona Works</button>
            <button onClick={() => onNavigate(3)} className="hover:text-shona-orange transition-colors">For Brands</button>
            <button onClick={() => onNavigate(8)} className="hover:text-shona-orange transition-colors">Aftercare</button>
            <button onClick={() => onNavigate(17)} className="hover:text-shona-orange transition-colors">Resources</button>
          </nav>
          <button
            onClick={() => onNavigate(18)}
            className="bg-shona-orange text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-shona-warm transition-colors"
          >
            Partner with Shona
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 px-8 md:px-20 pt-16 pb-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-shona-pale text-shona-orange text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6">
              After-Sales Infrastructure
            </div>
            <h1 className="font-serif text-5xl md:text-6xl text-charcoal leading-tight mb-6">
              Welcome to<br />
              <em className="not-italic text-shona-orange">Shona</em>
            </h1>
            <p className="text-lg text-charcoal-mid leading-relaxed mb-4">
              Here to streamline your after-sales process. Recover value and maintain your customers.
            </p>
            <p className="text-base text-warm-gray leading-relaxed mb-10">
              Shona helps your clothing brand recover damaged inventory and gives your customers a trusted way to repair and alter garments they've purchased — while generating operational intelligence for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onNavigate(3)}
                className="bg-shona-orange text-white px-6 py-3 rounded-xl font-medium hover:bg-shona-warm transition-colors"
              >
                For Brands →
              </button>
              <button
                onClick={() => onNavigate(8)}
                className="bg-white text-charcoal border border-warm-border px-6 py-3 rounded-xl font-medium hover:border-shona-orange hover:text-shona-orange transition-colors"
              >
                Customer Aftercare →
              </button>
              <button
                onClick={() => onNavigate(17)}
                className="text-shona-orange underline underline-offset-4 px-6 py-3 text-sm font-medium hover:text-shona-warm transition-colors"
              >
                Resources
              </button>
            </div>
          </div>

          {/* Visual panel */}
          <div className="hidden md:block">
            <div className="bg-white rounded-3xl p-8 border border-warm-border shadow-sm">
              <div className="text-xs font-semibold text-warm-gray uppercase tracking-widest mb-5">Two Experiences, One System</div>
              <div className="space-y-3">
                <div className="bg-shona-pale border-l-4 border-shona-orange rounded-xl p-4">
                  <div className="text-xs font-semibold text-shona-orange uppercase tracking-wider mb-1">For Brands</div>
                  <div className="text-sm text-charcoal-mid">Recover damaged inventory · Learn from service data · Retain customers</div>
                </div>
                <div className="bg-ivory rounded-xl p-4 border border-warm-border">
                  <div className="text-xs font-semibold text-charcoal-mid uppercase tracking-wider mb-1">For Customers</div>
                  <div className="text-sm text-charcoal-mid">Repair or alter garments · Track your item · Stay in the brand ecosystem</div>
                </div>
              </div>
              <div className="mt-5 pt-5 border-t border-warm-border">
                <div className="text-xs text-warm-gray mb-3">Both experiences feed →</div>
                <div className="bg-charcoal rounded-xl p-3 text-center text-white text-sm font-medium">
                  Operational + Product Intelligence
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer strip */}
      <footer className="bg-charcoal px-8 py-6 flex items-center justify-between">
        <ShonaLogo variant="small" className="[&_span]:text-white" />
        <div className="text-warm-gray-light text-xs">After-sales infrastructure for clothing brands</div>
      </footer>
    </div>
  );
}
