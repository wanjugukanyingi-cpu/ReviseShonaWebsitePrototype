import { useState, useEffect } from "react";
import S01Arrival from "@/screens/S01Arrival";
import S02Landing from "@/screens/S02Landing";
import S03HowItWorks from "@/screens/S03HowItWorks";
import S04ForBrands from "@/screens/S04ForBrands";
import S05BrandPortalOverview from "@/screens/S05BrandPortalOverview";
import S06TrackingInsights from "@/screens/S06TrackingInsights";
import S07InventoryRecovery from "@/screens/S07InventoryRecovery";
import S08OperationalIntelligence from "@/screens/S08OperationalIntelligence";
import S09CustomerOverview from "@/screens/S09CustomerOverview";
import S10GarmentIntake from "@/screens/S10GarmentIntake";
import S11AssessmentPricing from "@/screens/S11AssessmentPricing";
import S12Address from "@/screens/S12Address";
import S13Calendar from "@/screens/S13Calendar";
import S14Confirmation from "@/screens/S14Confirmation";
import S15CustomerTracking from "@/screens/S15CustomerTracking";
import S16WhatsApp from "@/screens/S16WhatsApp";
import S17PricingArchitecture from "@/screens/S17PricingArchitecture";
import S18Resources from "@/screens/S18Resources";
import S19Partner from "@/screens/S19Partner";
import S20SystemMap from "@/screens/S20SystemMap";
import S21DesignDecisions from "@/screens/S21DesignDecisions";
import S22BrandOnboarding from "@/screens/S22BrandOnboarding";
import S23NewAssessment from "@/screens/S23NewAssessment";

const SCREENS = [
  { num: "01", label: "Landing: Arrival", group: "Public" },
  { num: "02", label: "Landing: Navigation", group: "Public" },
  { num: "03", label: "How Shona Works", group: "Public" },
  { num: "04", label: "For Brands", group: "Public" },
  { num: "05", label: "Brand Portal: Overview", group: "Brand Portal" },
  { num: "06", label: "Brand Portal: Tracking Insights", group: "Brand Portal" },
  { num: "07", label: "Brand Portal: Inventory Recovery", group: "Brand Portal" },
  { num: "08", label: "Brand Portal: Operational Intelligence", group: "Brand Portal" },
  { num: "09", label: "Customer: Aftercare Overview", group: "Customer" },
  { num: "10", label: "Customer Booking: Garment Intake", group: "Customer" },
  { num: "11", label: "Customer Booking: Assessment + Pricing", group: "Customer" },
  { num: "12", label: "Customer Booking: Address", group: "Customer" },
  { num: "13", label: "Customer Booking: Calendar", group: "Customer" },
  { num: "14", label: "Customer Booking: Confirmation", group: "Customer" },
  { num: "15", label: "Customer Tracking", group: "Customer" },
  { num: "16", label: "WhatsApp: Tracking + Specialist Chat", group: "Customer" },
  { num: "17", label: "Pricing Architecture", group: "Public" },
  { num: "18", label: "Resources", group: "Public" },
  { num: "19", label: "Partner with Shona", group: "Public" },
  { num: "20", label: "System Map", group: "Public" },
  { num: "21", label: "Design Decisions", group: "Annotations" },
  { num: "22", label: "Brand Onboarding", group: "Brand Portal" },
  { num: "23", label: "New Assessment Intake", group: "Brand Portal" },
];

const GROUP_COLORS: Record<string, string> = {
  Public: "text-warm-gray",
  "Brand Portal": "text-charcoal",
  Customer: "text-shona-orange",
  Annotations: "text-warm-gray",
};

export default function App() {
  const [screen, setScreen] = useState(() => {
    const h = parseInt(window.location.hash.replace("#", ""), 10);
    return isNaN(h) ? 0 : Math.max(0, Math.min(SCREENS.length - 1, h));
  });
  const [showNav, setShowNav] = useState(false);

  // Keep hash in sync for puppeteer navigation
  useEffect(() => {
    const handler = () => {
      const h = parseInt(window.location.hash.replace("#", ""), 10);
      if (!isNaN(h)) setScreen(Math.max(0, Math.min(SCREENS.length - 1, h)));
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  useEffect(() => {
    window.location.hash = String(screen);
  }, [screen]);

  const goTo = (idx: number) => {
    setScreen(Math.max(0, Math.min(SCREENS.length - 1, idx)));
    setShowNav(false);
    window.scrollTo(0, 0);
  };

  const isArrival = screen === 0;

  return (
    <div className="relative min-h-screen">
      {/* Prototype navigation bar — hidden on arrival screen */}
      {!isArrival && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-charcoal/95 backdrop-blur text-white flex items-center gap-3 px-4 py-2 text-xs shadow-lg">
          {/* Prev */}
          <button
            onClick={() => goTo(screen - 1)}
            disabled={screen === 0}
            className="w-7 h-7 rounded-lg border border-white/15 flex items-center justify-center hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          >
            ‹
          </button>

          {/* Screen info */}
          <button
            onClick={() => setShowNav(!showNav)}
            className="flex items-center gap-2 flex-1 min-w-0 hover:text-shona-warm transition-colors"
          >
            <span className="font-mono text-shona-orange font-semibold flex-shrink-0">
              {SCREENS[screen].num}
            </span>
            <span className="text-white/80 truncate">{SCREENS[screen].label}</span>
            <span className="text-white/30 flex-shrink-0">—</span>
            <span className={`flex-shrink-0 ${GROUP_COLORS[SCREENS[screen].group]}`}>
              {SCREENS[screen].group}
            </span>
            <span className="ml-auto text-white/30 flex-shrink-0">{screen + 1}/{SCREENS.length} ▾</span>
          </button>

          {/* Next */}
          <button
            onClick={() => goTo(screen + 1)}
            disabled={screen === SCREENS.length - 1}
            className="w-7 h-7 rounded-lg border border-white/15 flex items-center justify-center hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          >
            ›
          </button>
        </div>
      )}

      {/* Screen dropdown */}
      {showNav && !isArrival && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowNav(false)} />
          <div className="fixed top-9 left-0 right-0 z-50 bg-charcoal border-t border-white/10 shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-white/5">
              {SCREENS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`flex items-start gap-2.5 px-4 py-3 text-left hover:bg-white/5 transition-colors ${
                    i === screen ? "bg-shona-orange/15" : ""
                  }`}
                >
                  <span className={`font-mono text-xs font-semibold flex-shrink-0 mt-0.5 ${i === screen ? "text-shona-orange" : "text-white/40"}`}>
                    {s.num}
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs text-white truncate">{s.label}</div>
                    <div className={`text-[10px] mt-0.5 ${GROUP_COLORS[s.group] ?? "text-white/40"}`}>{s.group}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Screen content */}
      <div className={!isArrival ? "pt-9" : ""}>
        {screen === 0 && <S01Arrival onEnter={() => goTo(1)} />}
        {screen === 1 && <S02Landing onNavigate={goTo} />}
        {screen === 2 && <S03HowItWorks onNavigate={goTo} />}
        {screen === 3 && <S04ForBrands onNavigate={goTo} />}
        {screen === 4 && <S05BrandPortalOverview onNavigate={goTo} />}
        {screen === 5 && <S06TrackingInsights onNavigate={goTo} />}
        {screen === 6 && <S07InventoryRecovery onNavigate={goTo} />}
        {screen === 7 && <S08OperationalIntelligence onNavigate={goTo} />}
        {screen === 8 && <S09CustomerOverview onNavigate={goTo} />}
        {screen === 9 && <S10GarmentIntake onNavigate={goTo} />}
        {screen === 10 && <S11AssessmentPricing onNavigate={goTo} />}
        {screen === 11 && <S12Address onNavigate={goTo} />}
        {screen === 12 && <S13Calendar onNavigate={goTo} />}
        {screen === 13 && <S14Confirmation onNavigate={goTo} />}
        {screen === 14 && <S15CustomerTracking onNavigate={goTo} />}
        {screen === 15 && <S16WhatsApp onNavigate={goTo} />}
        {screen === 16 && <S17PricingArchitecture onNavigate={goTo} />}
        {screen === 17 && <S18Resources onNavigate={goTo} />}
        {screen === 18 && <S19Partner onNavigate={goTo} />}
        {screen === 19 && <S20SystemMap onNavigate={goTo} />}
        {screen === 20 && <S21DesignDecisions onNavigate={goTo} />}
        {screen === 21 && <S22BrandOnboarding onNavigate={goTo} />}
        {screen === 22 && <S23NewAssessment onNavigate={goTo} />}
      </div>
    </div>
  );
}
