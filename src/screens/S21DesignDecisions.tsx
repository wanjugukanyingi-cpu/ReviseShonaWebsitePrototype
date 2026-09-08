import ShonaLogo from "@/components/ShonaLogo";

interface Props {
  onNavigate: (screen: number) => void;
}

const DECISIONS = [
  {
    number: "01",
    title: "Progressive Disclosure",
    description: "Booking is broken into 5 focused steps rather than a single long form. Each step collects only what's needed at that point, reducing cognitive load and abandonment.",
    why: "Users complete shorter tasks more readily. Collecting information progressively also mirrors how specialists assess work in practice.",
  },
  {
    number: "02",
    title: "Predictable Pricing",
    description: "Common service types show price ranges upfront (e.g. 'Waist alteration: KES 800–1,200'). Assessment is required only where diagnosis is genuinely uncertain.",
    why: "Price uncertainty is a primary barrier to after-sales service uptake. Structured pricing reduces friction and builds trust — the same reason Uber shows fares before booking.",
  },
  {
    number: "03",
    title: "Structured Intake Before WhatsApp",
    description: "Customers complete garment intake and issue selection digitally before any human conversation. WhatsApp is used for approval and updates, not as a substitute for structured data.",
    why: "WhatsApp-first onboarding generates unstructured data that is hard to act on. A digital intake form creates structured records from the start.",
  },
  {
    number: "04",
    title: "Calendar-Based Scheduling",
    description: "Pickup scheduling uses a calendar and predefined time slots. Customers select availability without negotiation.",
    why: "Manual scheduling (back-and-forth messages) creates friction and operational overhead. Structured slots reduce both.",
  },
  {
    number: "05",
    title: "Address Form First, Map Second",
    description: "The address collection step leads with a structured form. The map is displayed as a secondary visual confirmation, not the primary input method.",
    why: "In many African cities, map-pin accuracy is unreliable. Address forms create structured, actionable location data. Maps help confirm but should not gatekeep.",
  },
  {
    number: "06",
    title: "Customer Tracking vs Brand Inventory Tracking — Separated by Design",
    description: "The customer's garment tracking (their repair journey) and the Brand Portal's Tracking Insights (inventory recovery) are distinct interfaces with different data.",
    why: "Conflating these would create confusion, erode customer trust, and misrepresent brand inventory data as customer-facing information. Strict separation is both a UX and trust requirement.",
  },
  {
    number: "07",
    title: "Human Specialist Escalation",
    description: "When pricing or diagnosis is uncertain, the booking flow surfaces an 'Assessment Required' state and routes the customer to a specialist — not to a dead end.",
    why: "Not all issues can be priced at intake. Honest uncertainty, followed by a clear escalation path, builds more trust than a false price.",
  },
  {
    number: "08",
    title: "Readable Catalogue / Table Design",
    description: "The Tracking Insights and Inventory Recovery tables use generous row height, soft borders, and clear column hierarchy. Status is colour-coded but also text-labelled.",
    why: "Dense tables cause decision fatigue. Spacious, scannable layouts with clear state labels reduce the mental effort required to act on data.",
  },
  {
    number: "09",
    title: "Operational Data Captured Throughout the Journey",
    description: "Every step of the booking and repair flow captures structured data — garment type, material, issue type, repair outcome — that feeds the Operational Intelligence view.",
    why: "After-sales data becomes a product asset only if it's structured at source. The booking design is built to generate useful data, not just to process bookings.",
  },
  {
    number: "10",
    title: "WhatsApp as Communication Layer",
    description: "WhatsApp is used for two defined purposes: automated status updates (tracking) and specialist chat (diagnosis). It is not the system core — the digital interface is.",
    why: "WhatsApp has very high adoption in target markets. But using it as the core system creates unstructured workflows. Positioning it as a communication layer preserves its reach while keeping data structured.",
  },
];

export default function S21DesignDecisions({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-ivory">
      <header className="bg-white px-6 py-4 border-b border-warm-border flex items-center justify-between">
        <ShonaLogo variant="small" />
        <h1 className="font-serif text-xl text-charcoal">Design Decisions</h1>
        <span className="text-xs text-warm-gray uppercase tracking-widest">Annotation Frame 21 / 21</span>
      </header>

      <div className="px-8 py-10 max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
            Research-Informed Design Decisions
          </div>
          <h2 className="font-serif text-4xl text-charcoal mb-3">10 Key UX Decisions</h2>
          <p className="text-warm-gray max-w-2xl leading-relaxed">
            These decisions were made in response to the design brief and informed by UX research principles. They are clearly labelled as design decisions and are separate from the original Shona source material.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {DECISIONS.map((d) => (
            <div key={d.number} className="bg-white rounded-2xl border border-warm-border p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="font-mono text-2xl text-shona-orange font-light flex-shrink-0 leading-none mt-0.5">{d.number}</div>
                <h3 className="font-serif text-lg text-charcoal leading-tight">{d.title}</h3>
              </div>
              <p className="text-sm text-charcoal-mid leading-relaxed mb-3">{d.description}</p>
              <div className="bg-shona-pale rounded-xl px-4 py-3">
                <div className="text-xs font-semibold text-shona-orange mb-1">Why this decision</div>
                <p className="text-xs text-charcoal-mid leading-relaxed">{d.why}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-charcoal rounded-2xl p-6 text-center">
          <div className="font-serif text-2xl text-white mb-2">End of Shona Prototype</div>
          <div className="text-warm-gray-light text-sm mb-5">21 screens · 2 brand portal sections · 5-step customer booking · System map · Design annotations</div>
          <div className="flex justify-center gap-3">
            <button onClick={() => onNavigate(0)} className="bg-shona-orange text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-shona-warm transition-colors">
              ← Back to Start
            </button>
            <button onClick={() => onNavigate(19)} className="bg-white/10 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-white/20 transition-colors border border-white/20">
              Partner with Shona →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
