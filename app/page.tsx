"use client";

import { useState, useEffect } from "react";

const CHARITIES = [
  { name: "Clean Water Fund",  logo: "💧", category: "Humanitarian",   rating: "A", country: "Global"        },
  { name: "EduReach",          logo: "📚", category: "Education",      rating: "A", country: "Africa"        },
  { name: "MediCare Global",   logo: "🏥", category: "Health",         rating: "B", country: "Asia"          },
  { name: "GreenEarth",        logo: "🌱", category: "Environment",    rating: "B", country: "South America" },
  { name: "FoodBridge",        logo: "🍞", category: "Hunger",         rating: "C", country: "USA"           },
  { name: "ShelterNow",        logo: "🏠", category: "Housing",        rating: "C", country: "Middle East"   },
  { name: "HopeLight",         logo: "🕯️", category: "Mental Health",  rating: "D", country: "Europe"        },
  { name: "AnimalAid",         logo: "🐾", category: "Animal Welfare", rating: "E", country: "Global"        },
  { name: "OceanGuard",        logo: "🌊", category: "Environment",    rating: "A", country: "Pacific"       },
  { name: "LiteracyFirst",     logo: "✏️", category: "Education",      rating: "B", country: "South Asia"    },
  { name: "RefugeeAid",        logo: "🤝", category: "Humanitarian",   rating: "A", country: "Europe"        },
  { name: "SolarVillage",      logo: "☀️", category: "Energy",         rating: "B", country: "Sub-Saharan"   },
  { name: "ChildSafe",         logo: "👶", category: "Child Welfare",  rating: "A", country: "Global"        },
  { name: "HarvestHope",       logo: "🌾", category: "Hunger",         rating: "C", country: "East Africa"   },
  { name: "MindBridge",        logo: "🧠", category: "Mental Health",  rating: "B", country: "North America" },
  { name: "WildRoots",         logo: "🦁", category: "Conservation",   rating: "A", country: "Africa"        },
];

const RATING_COLOR: Record<string, string> = {
  A: "bg-emerald-100 text-emerald-700 border-emerald-200",
  B: "bg-blue-100 text-blue-700 border-blue-200",
  C: "bg-yellow-100 text-yellow-700 border-yellow-200",
  D: "bg-orange-100 text-orange-700 border-orange-200",
  E: "bg-red-100 text-red-700 border-red-200",
};

// Duplicate each row for seamless infinite loop
const ROW1 = [...CHARITIES.slice(0, 8),  ...CHARITIES.slice(0, 8)];
const ROW2 = [...CHARITIES.slice(8, 16), ...CHARITIES.slice(8, 16)];

function CharityCard({ c }: { c: typeof CHARITIES[0] }) {
  return (
    <div className="flex-shrink-0 w-44 bg-white border border-slate-500 rounded-2xl px-4 py-4 flex flex-col gap-2 shadow-sm select-none">
      <div className="flex items-center justify-between">
        <span className="text-3xl">{c.logo}</span>
        <span className={`text-xs font-bold border rounded-lg px-2 py-0.5 ${RATING_COLOR[c.rating]}`}>
          {c.rating}
        </span>
      </div>
      <p className="text-sm font-semibold text-slate-800 leading-tight">{c.name}</p>
      <p className="text-xs text-slate-400">{c.category}</p>
      <p className="text-xs text-slate-300">{c.country}</p>
    </div>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/waitlist").then(r => r.json()).then(d => setCount(d.count));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      setSubmitted(true);
      setCount(c => (c ?? 0) + 1);
    } else {
      const data = await res.json();
      setError(data.error === "Already registered" ? "You're already on the list." : "Something went wrong. Try again.");
    }
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 flex flex-col items-center justify-center px-6 py-20 overflow-hidden">

      {/* ── Scrolling card background — all rows left-to-right ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-5 opacity-[0.80]">
        <div className="overflow-hidden">
          <div className="flex gap-4 animate-scroll-left" style={{ width: "max-content" }}>
            {ROW1.map((c, i) => <CharityCard key={i} c={c} />)}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="flex gap-4 animate-scroll-left-slow" style={{ width: "max-content" }}>
            {ROW2.map((c, i) => <CharityCard key={i} c={c} />)}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="flex gap-4 animate-scroll-left-fast" style={{ width: "max-content", animationDelay: "-10s" }}>
            {ROW1.map((c, i) => <CharityCard key={i} c={c} />)}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="flex gap-4 animate-scroll-left" style={{ width: "max-content" }}>
            {ROW1.map((c, i) => <CharityCard key={i} c={c} />)}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="flex gap-4 animate-scroll-left-slow" style={{ width: "max-content" }}>
            {ROW2.map((c, i) => <CharityCard key={i} c={c} />)}
          </div>
        </div>
      </div>

      {/* ── Soft gradient overlay to keep cards subtle ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-50/80 via-white/50 to-blue-50/80" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-sky-50/70 via-transparent to-blue-50/70" />

      {/* ── Foreground content ── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl w-full gap-8">

        {/* Badge */}
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm text-blue-600 font-medium shadow-sm">
          <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          Launching Soon
        </span>

        {/* Brand */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-8xl font-bold tracking-tight text-slate-800">
            Give<span className="text-blue-600">Well</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-md leading-relaxed">
            We&apos;re building a platform that brings <span className="text-slate-700 font-medium">trust and transparency</span> to charitable giving — so every donation goes exactly where it should.
          </p>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Verified Charities
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Full Transparency
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Impact Tracking
          </div>
        </div>

        {/* Demo Button */}
        <a
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-900 px-7 py-3 text-sm font-semibold text-white shadow-md transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          View Demo
        </a>

        {/* Divider */}
        <div className="w-12 h-px bg-slate-200" />

        {/* Waitlist */}
        <div className="w-full max-w-md flex flex-col gap-3">
          {count !== null && count > 0 && (
            <p className="text-blue-600 text-lg font-medium text-center">
              🎉 {count} {count === 1 ? "person has" : "people have"} joined the waitlist — add your name too.
            </p>
          )}
          <p className="text-slate-500 text-sm">
            Join the waitlist — be the first to know when we launch.
          </p>

          {submitted ? (
            <div className="rounded-2xl border border-blue-200 bg-blue-50 px-6 py-4 text-blue-700 text-sm font-medium shadow-sm">
              You&apos;re on the list. We&apos;ll reach out soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3" noValidate>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 shadow-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                aria-describedby={error ? "email-error" : undefined}
              />
              <button
                type="submit"
                className="rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors"
              >
                Notify me
              </button>
            </form>
          )}

          {error && (
            <p id="email-error" role="alert" className="text-red-500 text-xs text-left">
              {error}
            </p>
          )}
        </div>

        {/* Footer */}
        <p className="text-slate-400 text-xs mt-6">
          © {new Date().getFullYear()} GiveWell. All rights reserved.
        </p>
      </div>
    </main>
  );
}
