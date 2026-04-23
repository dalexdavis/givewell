"use client";

interface Props {
  charity: { name: string; logo: string; category: string };
  amount: number;
  onClose: () => void;
}

// Breakdown percentages per category
const BREAKDOWN = [
  { label: "Goes directly to charity", pct: 0.78, color: "bg-emerald-500", textColor: "text-emerald-700", bg: "bg-emerald-50" },
  { label: "Admin & operations cost", pct: 0.12, color: "bg-orange-400", textColor: "text-orange-700", bg: "bg-orange-50" },
  { label: "Reserve fund", pct: 0.06, color: "bg-blue-400", textColor: "text-blue-700", bg: "bg-blue-50" },
  { label: "Platform fee", pct: 0.04, color: "bg-slate-400", textColor: "text-slate-600", bg: "bg-slate-50" },
];

const GOALS = [
  { label: "Build 5 water wells", target: 50000, raised: 38200, deadline: "Aug 2026" },
  { label: "Train 200 local staff", target: 20000, raised: 20000, deadline: "Jun 2026" },
  { label: "Reach 500k new people", target: 100000, raised: 61500, deadline: "Dec 2026" },
];

const TRANSACTIONS = [
  { date: "Apr 22, 2026", donor: "Anonymous", amount: 250, status: "Confirmed" },
  { date: "Apr 20, 2026", donor: "J. Smith", amount: 100, status: "Confirmed" },
  { date: "Apr 18, 2026", donor: "Anonymous", amount: 500, status: "Confirmed" },
  { date: "Apr 15, 2026", donor: "M. Patel", amount: 50, status: "Confirmed" },
  { date: "Apr 10, 2026", donor: "Anonymous", amount: 1000, status: "Confirmed" },
];

export default function TransparencyModal({ charity, amount, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Donation transparency modal"
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col gap-6 p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{charity.logo}</span>
            <div>
              <p className="font-bold text-slate-800">Donation Confirmed</p>
              <p className="text-xs text-slate-400">{charity.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close transparency modal"
            className="text-slate-400 hover:text-slate-600 transition-colors text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Success banner */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-700 font-medium text-center">
          🎉 Thank you! Your donation of <span className="font-bold">${amount.toFixed(2)}</span> has been sent.
        </div>

        {/* Money breakdown */}
        <div>
          <p className="text-sm font-semibold text-slate-700 mb-3">Where your money goes</p>

          {/* Stacked bar */}
          <div className="flex rounded-full overflow-hidden h-4 mb-4" role="img" aria-label="Donation breakdown bar">
            {BREAKDOWN.map((b) => (
              <div
                key={b.label}
                className={`${b.color} transition-all`}
                style={{ width: `${b.pct * 100}%` }}
                title={`${b.label}: ${(b.pct * 100).toFixed(0)}%`}
              />
            ))}
          </div>

          <div className="flex flex-col gap-2">
            {BREAKDOWN.map((b) => (
              <div key={b.label} className={`flex items-center justify-between rounded-xl px-4 py-2.5 ${b.bg}`}>
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${b.color} shrink-0`} />
                  <span className={`text-sm font-medium ${b.textColor}`}>{b.label}</span>
                </div>
                <div className={`text-sm font-bold ${b.textColor} text-right`}>
                  ${(amount * b.pct).toFixed(2)}
                  <span className="text-xs font-normal ml-1 opacity-70">({(b.pct * 100).toFixed(0)}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Goals */}
        <div>
          <p className="text-sm font-semibold text-slate-700 mb-3">Charity goals & progress</p>
          <div className="flex flex-col gap-3">
            {GOALS.map((g) => {
              const pct = Math.min((g.raised / g.target) * 100, 100);
              const done = g.raised >= g.target;
              return (
                <div key={g.label} className="bg-slate-50 rounded-xl px-4 py-3 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-800">{g.label}</span>
                    {done ? (
                      <span className="text-xs bg-emerald-100 text-emerald-700 rounded-full px-2 py-0.5 font-semibold">Achieved</span>
                    ) : (
                      <span className="text-xs text-slate-400">Target: {g.deadline}</span>
                    )}
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${done ? "bg-emerald-500" : "bg-blue-500"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>${g.raised.toLocaleString()} raised</span>
                    <span>{pct.toFixed(0)}% of ${g.target.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transaction history */}
        <div>
          <p className="text-sm font-semibold text-slate-700 mb-3">Recent donations</p>
          <div className="rounded-xl border border-slate-100 overflow-hidden">
            <table className="w-full text-xs" aria-label="Recent donation transactions">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-left">
                  <th className="px-4 py-2.5 font-semibold">Date</th>
                  <th className="px-4 py-2.5 font-semibold">Donor</th>
                  <th className="px-4 py-2.5 font-semibold text-right">Amount</th>
                  <th className="px-4 py-2.5 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {/* User's own donation at top */}
                <tr className="bg-emerald-50">
                  <td className="px-4 py-2.5 text-slate-700">Apr 23, 2026</td>
                  <td className="px-4 py-2.5 text-slate-700 font-semibold">You</td>
                  <td className="px-4 py-2.5 text-right font-bold text-emerald-700">${amount.toFixed(2)}</td>
                  <td className="px-4 py-2.5 text-right">
                    <span className="bg-emerald-100 text-emerald-700 rounded-full px-2 py-0.5 font-semibold">Confirmed</span>
                  </td>
                </tr>
                {TRANSACTIONS.map((t, i) => (
                  <tr key={i} className="bg-white hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-2.5 text-slate-500">{t.date}</td>
                    <td className="px-4 py-2.5 text-slate-700">{t.donor}</td>
                    <td className="px-4 py-2.5 text-right text-slate-700 font-medium">${t.amount.toFixed(2)}</td>
                    <td className="px-4 py-2.5 text-right">
                      <span className="bg-slate-100 text-slate-500 rounded-full px-2 py-0.5">Confirmed</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl py-3 transition-colors text-sm"
        >
          Done
        </button>
      </div>
    </div>
  );
}
