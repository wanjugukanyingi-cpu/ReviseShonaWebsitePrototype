import ShonaLogo from "@/components/ShonaLogo";

interface Props {
  onNavigate: (screen: number) => void;
}

const VALUE_PROPS = [
  {
    number: "01",
    title: "Recover Value",
    body: "Damaged or defective inventory doesn't have to be written off. Shona coordinates specialist assessment and repair so garments can re-enter your stock at full or partial value.",
  },
  {
    number: "02",
    title: "Retain Customers",
    body: "When a customer's garment needs repair or alteration, Shona gives them a trusted, structured channel — keeping them in your brand ecosystem rather than losing them to a generic tailor.",
  },
  {
    number: "03",
    title: "Learn from After-Sales Data",
    body: "Every repair and alteration generates structured data about which garments, materials and designs need attention. Shona turns service activity into product and manufacturing intelligence.",
  },
];

export default function S04ForBrands({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-ivory">
      <header className="px-8 py-5 border-b border-warm-border bg-white flex items-center justify-between">
        <ShonaLogo variant="small" />
        <h1 className="font-serif text-xl text-charcoal">For Brands</h1>
        {/* Leads to brand onboarding, not the portal */}
        <button
          onClick={() => onNavigate(21)}
          className="bg-shona-orange text-white text-sm px-4 py-2 rounded-xl hover:bg-shona-warm transition-colors"
        >
          Partner with Shona →
        </button>
      </header>

      <div className="px-8 py-14 max-w-5xl mx-auto">
        {/* Positioning statement */}
        <div className="text-center mb-16">
          <div className="inline-block bg-shona-pale text-shona-orange text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-5">
            Infrastructure, not a marketplace
          </div>
          <h2 className="font-serif text-5xl text-charcoal leading-tight mb-5">
            Your After-Sales Process,<br />
            <em className="not-italic text-shona-orange">Structured and Visible</em>
          </h2>
          <p className="text-warm-gray max-w-xl mx-auto text-base leading-relaxed">
            Shona is the operational layer your clothing brand needs to handle what happens after the sale — without building it yourself.
          </p>
        </div>

        {/* Value props — no stats beneath */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {VALUE_PROPS.map((vp) => (
            <div key={vp.number} className="bg-white rounded-2xl border border-warm-border p-6 flex flex-col">
              <div className="text-shona-orange font-mono text-2xl font-light mb-4">{vp.number}</div>
              <h3 className="font-serif text-xl text-charcoal mb-3">{vp.title}</h3>
              <p className="text-warm-gray text-sm leading-relaxed flex-1">{vp.body}</p>
            </div>
          ))}
        </div>

        {/* Infrastructure positioning */}
        <div className="bg-charcoal rounded-3xl p-8 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-shona-orange text-xs font-semibold tracking-widest uppercase mb-4">Why infrastructure matters</div>
            <h3 className="font-serif text-3xl text-white mb-4">Not a repair marketplace. A service layer for your brand.</h3>
            <p className="text-warm-gray-light text-sm leading-relaxed">
              Marketplaces commoditise your after-sales activity and dilute your brand. Shona operates as white-label infrastructure — your customers interact with a service that feels native to your brand, while Shona coordinates the logistics, specialists and communication behind the scenes.
            </p>
          </div>
          <div className="space-y-3">
            {["Intake and specialist coordination", "Logistics and communication", "Price transparency + customer approval", "Structured data capture", "Brand-aligned customer experience"].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-shona-orange flex-shrink-0 flex items-center justify-center text-white text-xs">✓</div>
                <span className="text-white text-sm">{item}</span>
              </div>
            ))}
            {/* CTA now leads to brand onboarding */}
            <button
              onClick={() => onNavigate(21)}
              className="mt-4 w-full bg-shona-orange text-white py-3 rounded-xl font-medium hover:bg-shona-warm transition-colors"
            >
              Get started with Shona →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
