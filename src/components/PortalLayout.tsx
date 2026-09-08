import ShonaLogo from "./ShonaLogo";

interface PortalLayoutProps {
  activeSection: "overview" | "tracking" | "inventory" | "intelligence";
  onNavigate: (section: "overview" | "tracking" | "inventory" | "intelligence") => void;
  onPartner?: () => void;
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { id: "overview" as const, label: "Overview", icon: "⬡" },
  { id: "tracking" as const, label: "Tracking Insights", icon: "◈" },
  { id: "inventory" as const, label: "Inventory Recovery", icon: "◻" },
  { id: "intelligence" as const, label: "Operational Intelligence", icon: "◆" },
];

export default function PortalLayout({ activeSection, onNavigate, onPartner, children }: PortalLayoutProps) {
  return (
    <div className="flex h-screen bg-portal-bg overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 bg-charcoal flex-shrink-0 flex flex-col py-6">
        <div className="px-5 mb-8">
          <ShonaLogo variant="small" className="[&_span]:text-white" />
          <div className="mt-1 text-xs text-warm-gray-light tracking-wider uppercase">Brand Portal</div>
        </div>

        <nav className="flex flex-col gap-0.5 px-3 flex-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-colors ${
                activeSection === item.id
                  ? "bg-shona-orange text-white font-medium"
                  : "text-warm-gray-light hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="text-xs">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Partner with Shona CTA — replaces brand tag */}
        <div className="px-4 mt-auto pt-4 border-t border-white/10">
          <button
            onClick={onPartner}
            className="w-full bg-shona-orange text-white text-xs font-semibold rounded-xl px-3 py-2.5 hover:bg-shona-warm transition-colors"
          >
            Partner with Shona
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
