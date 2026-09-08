import { useState } from "react";
import BookingLayout from "@/components/BookingLayout";

interface Props {
  onNavigate: (screen: number) => void;
}

const GARMENT_TYPES = [
  "Jeans / Trousers", "Dress", "Shirt / Blouse", "Jacket / Blazer",
  "Skirt", "Knitwear / Jumper", "Coat", "Other",
];

export default function S10GarmentIntake({ onNavigate }: Props) {
  const [garmentType, setGarmentType] = useState("Jeans / Trousers");
  const [orderRef, setOrderRef] = useState("LT-2025-08471");
  const [sku, setSku] = useState("");
  const [photoUploaded, setPhotoUploaded] = useState(false);

  return (
    <BookingLayout step={1} title="Tell us about your garment">
      <div className="space-y-6">
        {/* Garment type */}
        <div>
          <label className="text-sm font-medium text-charcoal block mb-2">Garment type</label>
          <div className="grid grid-cols-2 gap-2">
            {GARMENT_TYPES.map((g) => (
              <button
                key={g}
                onClick={() => setGarmentType(g)}
                className={`text-sm px-4 py-2.5 rounded-xl border text-left transition-colors ${
                  garmentType === g
                    ? "bg-shona-orange text-white border-shona-orange"
                    : "bg-white text-charcoal border-warm-border hover:border-shona-orange hover:text-shona-orange"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Order reference */}
        <div>
          <label className="text-sm font-medium text-charcoal block mb-2">
            Order / purchase reference <span className="text-shona-orange">*</span>
          </label>
          <input
            type="text"
            value={orderRef}
            onChange={(e) => setOrderRef(e.target.value)}
            placeholder="e.g. LT-2025-08471"
            className="w-full border border-warm-border rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-shona-orange transition-colors"
          />
          <div className="text-xs text-warm-gray mt-1">Found in your order confirmation email</div>
        </div>

        {/* SKU (optional) */}
        <div>
          <label className="text-sm font-medium text-charcoal block mb-2">
            SKU / product code <span className="text-warm-gray font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            placeholder="e.g. LT-DENIM-029W"
            className="w-full border border-warm-border rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-shona-orange transition-colors"
          />
        </div>

        {/* Photo upload */}
        <div>
          <label className="text-sm font-medium text-charcoal block mb-2">Photos of the garment</label>
          <div
            onClick={() => setPhotoUploaded(!photoUploaded)}
            className={`border-2 border-dashed rounded-2xl px-6 py-8 text-center cursor-pointer transition-colors ${
              photoUploaded ? "border-shona-orange bg-shona-pale" : "border-warm-border hover:border-shona-orange"
            }`}
          >
            {photoUploaded ? (
              <div>
                <div className="text-shona-orange text-2xl mb-2">✓</div>
                <div className="text-sm font-medium text-shona-orange">3 photos uploaded</div>
                <div className="text-xs text-warm-gray mt-1">Tap to change</div>
              </div>
            ) : (
              <div>
                <div className="text-warm-gray-light text-2xl mb-2">📷</div>
                <div className="text-sm font-medium text-charcoal-mid">Upload photos</div>
                <div className="text-xs text-warm-gray mt-1">Show the garment and any damage clearly</div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => onNavigate(10)}
          className="w-full bg-shona-orange text-white py-3.5 rounded-xl font-medium text-sm hover:bg-shona-warm transition-colors"
        >
          Continue to Issue &amp; Pricing →
        </button>
      </div>
    </BookingLayout>
  );
}
