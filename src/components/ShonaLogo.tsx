import shonaLogoSrc from "@/imports/lb.png";

interface ShonaLogoProps {
  variant?: "splash" | "nav" | "small";
  className?: string;
}

export default function ShonaLogo({ variant = "nav", className = "" }: ShonaLogoProps) {
  if (variant === "splash") {
    return (
      <img
        src={shonaLogoSrc}
        alt="Shona"
        className={`rounded-2xl ${className}`}
      />
    );
  }

  if (variant === "small") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <img src={shonaLogoSrc} alt="Shona" className="w-7 h-7 rounded" />
        <span className="font-serif text-base tracking-widest text-charcoal">SHONA</span>
      </div>
    );
  }

  // nav variant
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img src={shonaLogoSrc} alt="Shona" className="w-9 h-9 rounded" />
      <span className="font-serif text-xl tracking-widest text-charcoal">SHONA</span>
    </div>
  );
}
