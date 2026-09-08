import ShonaLogo from "@/components/ShonaLogo";

interface Props {
  onNavigate: (screen: number) => void;
}

const ARTICLES = [
  { title: "Why after-sales is the next competitive frontier for clothing brands", date: "Aug 2026", tag: "Strategy" },
  { title: "The hidden cost of damaged inventory: what brands are losing", date: "Jul 2026", tag: "Operations" },
  { title: "Repair as retention: keeping customers inside your brand ecosystem", date: "Jun 2026", tag: "Customer" },
  { title: "From repair data to product insight: closing the loop in fashion", date: "May 2026", tag: "Intelligence" },
];

export default function S18Resources({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      <header className="bg-white px-6 py-4 border-b border-warm-border flex items-center justify-between">
        <ShonaLogo variant="small" />
        <h1 className="font-serif text-xl text-charcoal">Resources</h1>
        <button onClick={() => onNavigate(18)} className="bg-shona-orange text-white text-sm px-4 py-2 rounded-xl">
          Partner with Shona →
        </button>
      </header>

      <div className="px-8 py-12 max-w-4xl mx-auto flex-1">
        <div className="text-center mb-12">
          <h2 className="font-serif text-5xl text-charcoal mb-4">Read Shona</h2>
          <p className="text-warm-gray max-w-lg mx-auto leading-relaxed">
            Thinking on after-sales, repair infrastructure, brand operations and what happens to clothes after the sale.
          </p>
        </div>

        {/* LinkedIn newsletter CTA */}
        <div className="bg-[#0A66C2] rounded-3xl p-7 text-center mb-10">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg viewBox="0 0 24 24" fill="#0A66C2" width="24" height="24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </div>
          <h3 className="font-serif text-2xl text-white mb-2">Shona on LinkedIn</h3>
          <p className="text-white/80 text-sm mb-5 max-w-sm mx-auto">
            The Shona newsletter is published on LinkedIn. Follow along for thinking on after-sales, repair infrastructure and brand operations.
          </p>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-[#0A66C2] font-semibold px-7 py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm"
          >
            Read Shona on LinkedIn ↗
          </a>
          <div className="mt-3 text-xs text-white/50">Opens in a new tab — external link to LinkedIn</div>
        </div>

        {/* Article previews */}
        <div>
          <div className="text-xs font-semibold text-warm-gray uppercase tracking-widest mb-5">Recent Topics</div>
          <div className="grid md:grid-cols-2 gap-4">
            {ARTICLES.map((a) => (
              <div key={a.title} className="bg-white rounded-2xl border border-warm-border p-5 hover:border-shona-orange transition-colors cursor-pointer">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs bg-shona-pale text-shona-orange font-semibold px-2.5 py-1 rounded-full">{a.tag}</span>
                  <span className="text-xs text-warm-gray">{a.date}</span>
                </div>
                <h4 className="text-sm font-medium text-charcoal leading-snug">{a.title}</h4>
                <div className="mt-3 text-xs text-shona-orange font-medium">Read on LinkedIn ↗</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-charcoal px-8 py-5 flex items-center justify-between">
        <ShonaLogo variant="small" className="[&_span]:text-white" />
        <div className="text-warm-gray-light text-xs">After-sales infrastructure for clothing brands</div>
      </footer>
    </div>
  );
}
