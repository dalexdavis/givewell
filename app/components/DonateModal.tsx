"use client";

import { useState } from "react";
import TransparencyModal from "@/app/components/TransparencyModal";

const PRESET_AMOUNTS = [10, 25, 50, 100, 250, 500];

interface Props {
  charity: { name: string; logo: string; category: string };
  onClose: () => void;
}

export default function DonateModal({ charity, onClose }: Props) {
  const [selected, setSelected] = useState<number | null>(25);
  const [custom, setCustom] = useState("");
  const [showTransparency, setShowTransparency] = useState(false);

  const amount = custom ? parseFloat(custom) : selected ?? 0;

  function handleSend() {
    if (!amount || amount <= 0) return;
    setShowTransparency(true);
  }

  if (showTransparency) {
    return <TransparencyModal charity={charity} amount={amount} onClose={onClose} />;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Donate modal"
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-7 flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{charity.logo}</span>
            <div>
              <p className="font-bold text-slate-800 text-base">{charity.name}</p>
              <p className="text-xs text-slate-400">{charity.category}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close donate modal"
            className="text-slate-400 hover:text-slate-600 transition-colors text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Preset amounts */}
        <div>
          <p className="text-sm font-semibold text-slate-700 mb-3">Select an amount</p>
          <div className="grid grid-cols-3 gap-2">
            {PRESET_AMOUNTS.map((amt) => (
              <button
                key={amt}
                onClick={() => { setSelected(amt); setCustom(""); }}
                className={`rounded-xl border py-2.5 text-sm font-semibold transition-all ${
                  selected === amt && !custom
                    ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                    : "border-slate-200 text-slate-700 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                ${amt}
              </button>
            ))}
          </div>
        </div>

        {/* Custom amount */}
        <div>
          <p className="text-sm font-semibold text-slate-700 mb-2">Or enter a custom amount</p>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
            <input
              type="number"
              min="1"
              placeholder="0.00"
              value={custom}
              onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
              className="w-full border border-slate-200 rounded-xl pl-7 pr-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              aria-label="Custom donation amount"
            />
          </div>
        </div>

        {/* Summary */}
        {amount > 0 && (
          <div className="bg-blue-50 rounded-xl px-4 py-3 text-sm text-blue-700 font-medium">
            You are donating <span className="font-bold">${amount.toFixed(2)}</span> to {charity.name}
          </div>
        )}

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={!amount || amount <= 0}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold rounded-xl py-3 transition-colors text-sm"
        >
          Send Donation →
        </button>
      </div>
    </div>
  );
}
