import shonaLogoSrc from "@/imports/lb.png";

interface Props {
  onEnter: () => void;
}

export default function S01Arrival({ onEnter }: Props) {
  return (
    <div
      className="min-h-screen bg-shona-orange flex flex-col items-center justify-center cursor-pointer select-none"
      onClick={onEnter}
    >
      <div className="flex flex-col items-center gap-0 animate-[fadeIn_1.2s_ease-out]">
        <img
          src={shonaLogoSrc}
          alt="Shona"
          className="w-64 h-64 rounded-3xl shadow-2xl"
        />
      </div>

      <p className="mt-14 text-white/70 text-sm tracking-[0.3em] uppercase animate-[fadeIn_2s_ease-out]">
        Tap anywhere to enter
      </p>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
