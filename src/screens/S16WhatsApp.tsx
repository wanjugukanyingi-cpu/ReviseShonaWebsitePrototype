import ShonaLogo from "@/components/ShonaLogo";
import { useState, useEffect } from "react";

interface Props {
  onNavigate: (screen: number) => void;
}

const INITIAL_MESSAGES = [
  { from: "shona", text: "Hi Amira 👋 Your Shona booking is confirmed.\nRef: SH-2026-08-4291\nWe'll collect your denim jeans on Tuesday 19 Aug, 09:00–11:00.", time: "19 Aug, 08:15", delivered: true },
  { from: "shona", text: "✅ Garment collected. Our specialist will assess your waist alteration request shortly.", time: "19 Aug, 10:47", delivered: true },
  { from: "shona", text: "📋 Assessment complete. Recommended work: waist let out by 3cm.\n\nFinal price: KES 650.\n\nReply YES to approve and your payment link will follow.", time: "20 Aug, 4:30", delivered: true },
  { from: "customer", text: "YES", time: "20 Aug, 4:45", delivered: true },
  { from: "shona", text: "✓ Approved! Here is your secure payment link:\nshona.co.ke/pay/SH-2026-08-4291\n\nPayment is required before work begins.", time: "20 Aug, 4:46", delivered: true },
  { from: "customer", text: "[Payment confirmed]", time: "20 Aug, 5:02", delivered: true },
  { from: "shona", text: "🧵 Payment received. Your jeans are now with the specialist. Expected completion: 22 Aug.", time: "20 Aug, 5:03", delivered: true },
];

const LIVE_MESSAGES = [
  { from: "shona" as const, text: "✅ Quality check passed. Your garment is ready for return.", delay: 3000 },
  { from: "shona" as const, text: "🚚 Your jeans are out for delivery. Estimated arrival: today between 14:00–16:00.", delay: 7000 },
];

function ChatBubble({ msg }: { msg: { from: string; text: string; time?: string; delivered?: boolean } }) {
  const isCustomer = msg.from === "customer";
  return (
    <div className={`flex gap-2 ${isCustomer ? "flex-row-reverse" : ""}`}>
      {!isCustomer && (
        <div className="w-7 h-7 bg-shona-orange rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs mt-1 font-bold">S</div>
      )}
      <div className={`max-w-[78%] flex flex-col ${isCustomer ? "items-end" : "items-start"}`}>
        <div className={`rounded-2xl px-3.5 py-2.5 text-sm leading-snug whitespace-pre-line ${
          isCustomer
            ? "bg-[#dcf8c6] text-[#1a1a1a] rounded-tr-sm"
            : "bg-white text-charcoal rounded-tl-sm shadow-sm"
        }`}>
          {msg.text}
        </div>
        {msg.time && (
          <div className="text-[10px] text-warm-gray mt-1 px-1 flex items-center gap-1">
            {msg.time}
            {msg.delivered && isCustomer && <span className="text-blue-400">✓✓</span>}
          </div>
        )}
      </div>
    </div>
  );
}

export default function S16WhatsApp({ onNavigate }: Props) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [typing, setTyping] = useState(false);
  const [liveIdx, setLiveIdx] = useState(0);

  // Simulate incoming live message
  useEffect(() => {
    if (liveIdx >= LIVE_MESSAGES.length) return;
    const msg = LIVE_MESSAGES[liveIdx];
    const timer = setTimeout(() => {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages((m) => [
          ...m,
          { ...msg, time: "Now", delivered: true },
        ]);
        setLiveIdx((i) => i + 1);
      }, 1500);
    }, msg.delay);
    return () => clearTimeout(timer);
  }, [liveIdx]);

  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      <header className="bg-white px-6 py-4 border-b border-warm-border flex items-center justify-between">
        <ShonaLogo variant="small" />
        <h1 className="font-serif text-xl text-charcoal">WhatsApp Tracking</h1>
        <button
          onClick={() => onNavigate(1)}
          className="text-sm text-shona-orange font-medium hover:underline"
        >
          ← Back to Shona
        </button>
      </header>

      <div className="flex-1 px-6 py-8 flex flex-col items-center">
        <div className="w-full max-w-sm">
          {/* Explainer */}
          <div className="bg-white border border-warm-border rounded-2xl px-4 py-3 mb-4 text-center">
            <div className="text-xs font-semibold text-charcoal mb-1">Automated tracking updates via WhatsApp</div>
            <div className="text-xs text-warm-gray">You receive status updates at every key milestone. Reply YES to approve and proceed to payment. No human agent needed for standard journeys.</div>
          </div>

          {/* Phone mockup */}
          <div className="bg-gray-100 rounded-3xl overflow-hidden border-4 border-gray-200 shadow-xl mx-auto">
            {/* WhatsApp header */}
            <div className="bg-[#075E54] px-4 py-3 flex items-center gap-2.5">
              <div className="w-9 h-9 bg-shona-orange rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">S</div>
              <div className="flex-1">
                <div className="text-white text-sm font-medium">Shona Tracking</div>
                <div className="text-white/60 text-xs">Automated updates · Ref SH-2026-08-4291</div>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white/60 text-xs">Live</span>
              </div>
            </div>

            {/* Chat area */}
            <div className="bg-[#e5ddd5] p-3 space-y-3 h-[400px] overflow-y-auto">
              <div className="text-center text-[10px] text-[#668777] bg-[#cfe9ba] px-3 py-1 rounded-full inline-block w-full">
                Messages are end-to-end encrypted
              </div>
              {messages.map((msg, i) => (
                <ChatBubble key={i} msg={msg} />
              ))}
              {typing && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 bg-shona-orange rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">S</div>
                  <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <div className="flex gap-1 items-center h-4">
                      <div className="w-1.5 h-1.5 bg-warm-gray rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-1.5 h-1.5 bg-warm-gray rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-1.5 h-1.5 bg-warm-gray rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input bar */}
            <div className="bg-[#f0f0f0] px-3 py-2.5 flex items-center gap-2">
              <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-xs text-gray-400">Message…</div>
              <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center text-white text-sm">▶</div>
            </div>
          </div>

          {/* Note about specialist chat */}
          <div className="mt-4 bg-white border border-warm-border rounded-2xl px-4 py-3">
            <div className="text-xs font-medium text-charcoal mb-1">Need to speak to a specialist?</div>
            <div className="text-xs text-warm-gray mb-2">For technical questions about your repair, use the specialist chat from your booking page — that's a separate conversation with a human seamstress.</div>
            <button
              onClick={() => onNavigate(10)}
              className="text-xs text-shona-orange font-medium hover:underline"
            >
              Go to Assessment + Pricing page →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
