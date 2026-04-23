"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const ImpactMap = dynamic(() => import("@/app/components/ImpactMap"), { ssr: false });

const charities = [
  { id: "1", name: "Clean Water Fund", category: "Humanitarian", rating: "A", impact: "Provides clean water to 2M+ people", country: "Global", logo: "💧" },
  { id: "2", name: "EduReach", category: "Education", rating: "A", impact: "Schooled 500k children in rural areas", country: "Africa", logo: "📚" },
  { id: "3", name: "MediCare Global", category: "Health", rating: "B", impact: "Free clinics in 30 countries", country: "Asia", logo: "🏥" },
  { id: "4", name: "GreenEarth", category: "Environment", rating: "B", impact: "Planted 10M trees since 2018", country: "South America", logo: "🌱" },
  { id: "5", name: "FoodBridge", category: "Hunger", rating: "C", impact: "Feeds 100k families monthly", country: "USA", logo: "🍞" },
  { id: "6", name: "ShelterNow", category: "Housing", rating: "C", impact: "Built 8,000 homes for displaced families", country: "Middle East", logo: "🏠" },
  { id: "7", name: "HopeLight", category: "Mental Health", rating: "D", impact: "Counseling for 20k individuals", country: "Europe", logo: "🕯️" },
  { id: "8", name: "AnimalAid", category: "Animal Welfare", rating: "E", impact: "Rescued 50k animals", country: "Global", logo: "🐾" },
];

const carouselItems = [
  { id: "1", name: "Clean Water Fund", tag: "Top Rated", desc: "Transforming lives through clean water access.", logo: "💧", bg: "from-sky-100 to-blue-50" },
  { id: "2", name: "EduReach", tag: "Editor's Pick", desc: "Education is the most powerful tool for change.", logo: "📚", bg: "from-yellow-50 to-amber-50" },
  { id: "3", name: "GreenEarth", tag: "Trending", desc: "Fighting climate change one tree at a time.", logo: "🌱", bg: "from-green-50 to-emerald-50" },
  { id: "4", name: "MediCare Global", tag: "High Impact", desc: "Healthcare for those who need it most.", logo: "🏥", bg: "from-rose-50 to-pink-50" },
];

const news = [
  { id: 1, type: "event", label: "Event", date: "Apr 12, 2026", title: "Global Giving Summit 2026", desc: "Join 500+ charity leaders in Geneva to discuss the future of transparent philanthropy." },
  { id: 2, type: "news", label: "News", date: "Mar 28, 2026", title: "EduReach opens 200 new schools", desc: "EduReach announced the opening of 200 new schools across Sub-Saharan Africa this quarter." },
  { id: 3, type: "event", label: "Event", date: "May 3, 2026", title: "Charity Transparency Webinar", desc: "Free online webinar on how donors can verify charity impact reports." },
  { id: 4, type: "news", label: "News", date: "Mar 15, 2026", title: "Clean Water Fund hits 2M milestone", desc: "The fund celebrates providing clean water access to over 2 million people worldwide." },
];

const ratingColor: Record<string, string> = {
  A: "bg-emerald-100 text-emerald-700 border-emerald-200",
  B: "bg-blue-100 text-blue-700 border-blue-200",
  C: "bg-yellow-100 text-yellow-700 border-yellow-200",
  D: "bg-orange-100 text-orange-700 border-orange-200",
  E: "bg-red-100 text-red-700 border-red-200",
};

export default function Dashboard() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % carouselItems.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* Top demo banner */}
      <div className="w-full bg-blue-600 text-white text-center text-xs py-2 font-medium tracking-wide">
        ⚡ DEMO MODE — This is a preview of the GiveWell platform. Data is simulated.
      </div>

      {/* Nav */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between shadow-sm">
        <Link href="/" className="text-2xl font-bold text-slate-800">
          Give<span className="text-blue-600">Well</span>
        </Link>
        <span className="text-xs bg-blue-50 border border-blue-200 text-blue-600 rounded-full px-3 py-1 font-medium">Demo</span>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 flex flex-col gap-12">

        {/* Carousel */}
        <section aria-label="Featured charities">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">Featured Charities</h2>
          <div className={`relative rounded-2xl bg-gradient-to-br ${carouselItems[slide].bg} border border-slate-100 shadow-sm p-8 flex flex-col sm:flex-row items-center gap-6 transition-all duration-500`}>
            <div className="text-6xl">{carouselItems[slide].logo}</div>
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">{carouselItems[slide].tag}</span>
              <h3 className="text-2xl font-bold text-slate-800">{carouselItems[slide].name}</h3>
              <p className="text-slate-500 text-sm">{carouselItems[slide].desc}</p>
              <Link
                href={`/dashboard/charity/${carouselItems[slide].id}`}
                className="mt-2 self-center sm:self-start inline-block rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2 transition-colors"
              >
                View Charity
              </Link>
            </div>
            {/* Dots */}
            <div className="absolute bottom-4 right-6 flex gap-1.5">
              {carouselItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${i === slide ? "w-5 bg-blue-600" : "w-2 bg-slate-300"}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Global Impact Map */}
        <section aria-label="Global impact map">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">Global Impact Map</h2>
          <ImpactMap />
        </section>

        {/* Charity Ratings */}        <section aria-label="Charity ratings">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">Charity Ratings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {charities.map((c) => (
              <Link
                key={c.id}
                href={`/dashboard/charity/${c.id}`}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col gap-3 hover:shadow-md hover:border-blue-200 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{c.logo}</span>
                  <span className={`text-sm font-bold border rounded-lg px-2.5 py-0.5 ${ratingColor[c.rating]}`}>
                    {c.rating}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{c.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{c.category} · {c.country}</p>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{c.impact}</p>
              </Link>
            ))}
          </div>
          {/* Rating legend */}
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
            {["A", "B", "C", "D", "E"].map((r) => (
              <span key={r} className={`border rounded-md px-2 py-0.5 font-semibold ${ratingColor[r]}`}>
                {r} {r === "A" ? "— Excellent" : r === "B" ? "— Good" : r === "C" ? "— Average" : r === "D" ? "— Poor" : "— Failing"}
              </span>
            ))}
          </div>
        </section>

        {/* News & Events */}
        <section aria-label="News and events">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">News & Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {news.map((n) => (
              <div key={n.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold rounded-full px-2.5 py-0.5 ${n.type === "event" ? "bg-purple-100 text-purple-600" : "bg-sky-100 text-sky-600"}`}>
                    {n.label}
                  </span>
                  <span className="text-xs text-slate-400">{n.date}</span>
                </div>
                <p className="font-semibold text-slate-800 text-sm">{n.title}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{n.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
