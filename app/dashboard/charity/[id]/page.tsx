"use client";

import Link from "next/link";

const charities: Record<string, {
  name: string; logo: string; category: string; country: string; rating: string;
  impact: string; founded: string; mission: string; website: string;
}> = {
  "1": { name: "Clean Water Fund", logo: "💧", category: "Humanitarian", country: "Global", rating: "A", impact: "2M+ people served", founded: "2008", mission: "Ensuring every person has access to safe, clean drinking water through community-led infrastructure projects.", website: "cleanwaterfund.org" },
  "2": { name: "EduReach", logo: "📚", category: "Education", country: "Africa", rating: "A", impact: "500k children schooled", founded: "2011", mission: "Bridging the education gap in underserved communities by building schools and training local teachers.", website: "edureach.org" },
  "3": { name: "MediCare Global", logo: "🏥", category: "Health", country: "Asia", rating: "B", impact: "Free clinics in 30 countries", founded: "2005", mission: "Delivering free, high-quality healthcare to populations with no access to medical services.", website: "medicareglobal.org" },
  "4": { name: "GreenEarth", logo: "🌱", category: "Environment", country: "South America", rating: "B", impact: "10M trees planted", founded: "2018", mission: "Combating deforestation and climate change through large-scale reforestation programs.", website: "greenearth.org" },
  "5": { name: "FoodBridge", logo: "🍞", category: "Hunger", country: "USA", rating: "C", impact: "100k families fed monthly", founded: "2013", mission: "Reducing food insecurity by redistributing surplus food to families in need.", website: "foodbridge.org" },
  "6": { name: "ShelterNow", logo: "🏠", category: "Housing", country: "Middle East", rating: "C", impact: "8,000 homes built", founded: "2015", mission: "Providing safe, permanent housing for families displaced by conflict and natural disasters.", website: "shelternow.org" },
  "7": { name: "HopeLight", logo: "🕯️", category: "Mental Health", country: "Europe", rating: "D", impact: "20k individuals counseled", founded: "2019", mission: "Making mental health support accessible and stigma-free for vulnerable populations.", website: "hopelight.org" },
  "8": { name: "AnimalAid", logo: "🐾", category: "Animal Welfare", country: "Global", rating: "E", impact: "50k animals rescued", founded: "2010", mission: "Rescuing, rehabilitating, and rehoming animals affected by abuse and natural disasters.", website: "animalaid.org" },
};

const trackingSteps = [
  { label: "Application Submitted", date: "Jan 5, 2026", done: true, desc: "Charity submitted registration and initial documentation." },
  { label: "Document Review", date: "Jan 18, 2026", done: true, desc: "GiveWell team reviewed submitted financial and impact documents." },
  { label: "Field Verification", date: "Feb 3, 2026", done: true, desc: "On-ground verification of reported programs and beneficiaries." },
  { label: "Rating Assessment", date: "Feb 20, 2026", done: true, desc: "Independent panel assessed transparency score and impact metrics." },
  { label: "Published on Platform", date: "Mar 1, 2026", done: true, desc: "Charity profile made public on GiveWell platform." },
  { label: "Annual Re-evaluation", date: "Mar 1, 2027", done: false, desc: "Scheduled annual review to update rating and documents." },
];

const documents = [
  { name: "Annual Financial Report 2025", type: "PDF", size: "2.4 MB", verified: true, date: "Jan 10, 2026" },
  { name: "Impact Assessment Report", type: "PDF", size: "1.8 MB", verified: true, date: "Jan 15, 2026" },
  { name: "Governance & Board Structure", type: "PDF", size: "0.9 MB", verified: true, date: "Jan 12, 2026" },
  { name: "Program Audit 2025", type: "PDF", size: "3.1 MB", verified: true, date: "Feb 1, 2026" },
  { name: "Beneficiary Survey Results", type: "PDF", size: "1.2 MB", verified: false, date: "Feb 10, 2026" },
];

const ratingColor: Record<string, string> = {
  A: "bg-emerald-100 text-emerald-700 border-emerald-200",
  B: "bg-blue-100 text-blue-700 border-blue-200",
  C: "bg-yellow-100 text-yellow-700 border-yellow-200",
  D: "bg-orange-100 text-orange-700 border-orange-200",
  E: "bg-red-100 text-red-700 border-red-200",
};

export default function CharityPage({ params }: { params: { id: string } }) {
  const charity = charities[params.id] ?? charities["1"];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* Demo banner */}
      <div className="w-full bg-blue-600 text-white text-center text-xs py-2 font-medium tracking-wide">
        ⚡ DEMO MODE — This is a preview of the GiveWell platform. Data is simulated.
      </div>

      {/* Nav */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between shadow-sm">
        <Link href="/" className="text-2xl font-bold text-slate-800">
          Give<span className="text-blue-600">Well</span>
        </Link>
        <Link href="/dashboard" className="text-sm text-blue-600 hover:underline">← Back to Dashboard</Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 flex flex-col gap-10">

        {/* Hero */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="text-6xl">{charity.logo}</div>
          <div className="flex flex-col gap-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <h1 className="text-2xl font-bold text-slate-800">{charity.name}</h1>
              <span className={`text-sm font-bold border rounded-lg px-2.5 py-0.5 ${ratingColor[charity.rating]}`}>
                Rating: {charity.rating}
              </span>
            </div>
            <p className="text-sm text-slate-400">{charity.category} · {charity.country} · Founded {charity.founded}</p>
            <p className="text-slate-600 text-sm leading-relaxed mt-1">{charity.mission}</p>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-500">
              <span>🌍 {charity.impact}</span>
              <span>🔗 {charity.website}</span>
            </div>
          </div>
        </div>

        {/* State Tracking */}
        <section aria-label="State tracking">
          <h2 className="text-lg font-semibold text-slate-700 mb-5">Verification Status</h2>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <ol className="relative flex flex-col gap-0">
              {trackingSteps.map((step, i) => (
                <li key={i} className="flex gap-4 pb-6 last:pb-0">
                  {/* Line + dot */}
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0 z-10 ${step.done ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-slate-200 text-slate-300"}`}>
                      {step.done ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-300 block" />
                      )}
                    </div>
                    {i < trackingSteps.length - 1 && (
                      <div className={`w-0.5 flex-1 mt-1 ${step.done ? "bg-blue-200" : "bg-slate-100"}`} />
                    )}
                  </div>
                  {/* Content */}
                  <div className="flex flex-col gap-0.5 pt-1 pb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-sm font-semibold ${step.done ? "text-slate-800" : "text-slate-400"}`}>{step.label}</span>
                      <span className="text-xs text-slate-400">{step.date}</span>
                      {!step.done && <span className="text-xs bg-slate-100 text-slate-400 rounded-full px-2 py-0.5">Upcoming</span>}
                    </div>
                    <p className="text-xs text-slate-500">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Documents */}
        <section aria-label="Documents">
          <h2 className="text-lg font-semibold text-slate-700 mb-5">Submitted Documents</h2>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-50">
            {documents.map((doc, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-xs font-bold shrink-0">
                    PDF
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{doc.name}</p>
                    <p className="text-xs text-slate-400">{doc.size} · Uploaded {doc.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {doc.verified ? (
                    <span className="text-xs bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full px-2.5 py-0.5 font-medium">Verified</span>
                  ) : (
                    <span className="text-xs bg-yellow-50 text-yellow-600 border border-yellow-200 rounded-full px-2.5 py-0.5 font-medium">Pending</span>
                  )}
                  <button
                    className="text-xs text-blue-600 hover:underline"
                    onClick={() => alert("Demo mode — document download not available.")}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
