"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const PROJECTS = [
  { id: 1,  lat: 1.3,   lng: 36.8,   country: "Kenya",        charity: "Clean Water Fund",  logo: "💧", category: "Humanitarian",   status: "success", spent: 420000, people: 48000,  description: "Installed 12 community water wells serving 48,000 people in rural Kenya.", year: 2024 },
  { id: 2,  lat: 14.5,  lng: -14.4,  country: "Senegal",      charity: "EduReach",          logo: "📚", category: "Education",      status: "success", spent: 310000, people: 22000,  description: "Built 45 schools and trained 180 local teachers across Senegal.", year: 2023 },
  { id: 3,  lat: 23.6,  lng: 85.1,   country: "India",        charity: "MediCare Global",   logo: "🏥", category: "Health",         status: "active",  spent: 580000, people: 95000,  description: "Running 8 free clinics across rural Jharkhand, India.", year: 2025 },
  { id: 4,  lat: -3.4,  lng: -62.2,  country: "Brazil",       charity: "GreenEarth",        logo: "🌱", category: "Environment",    status: "success", spent: 750000, people: 120000, description: "Reforested 12,000 hectares in the Amazon basin.", year: 2024 },
  { id: 5,  lat: 39.9,  lng: -82.9,  country: "USA",          charity: "FoodBridge",        logo: "🍞", category: "Hunger",         status: "active",  spent: 195000, people: 31000,  description: "Redistributed 2.4M meals to families in Ohio.", year: 2025 },
  { id: 6,  lat: 33.8,  lng: 35.5,   country: "Lebanon",      charity: "ShelterNow",        logo: "🏠", category: "Housing",        status: "active",  spent: 640000, people: 8200,   description: "Constructed 320 temporary homes for displaced families.", year: 2025 },
  { id: 7,  lat: 51.5,  lng: 10.4,   country: "Germany",      charity: "HopeLight",         logo: "🕯️", category: "Mental Health",  status: "success", spent: 120000, people: 4200,   description: "Provided counseling to 4,200 refugees and asylum seekers.", year: 2023 },
  { id: 8,  lat: -26.2, lng: 28.0,   country: "South Africa", charity: "AnimalAid",         logo: "🐾", category: "Animal Welfare", status: "success", spent: 88000,  people: 6800,   description: "Rescued and rehomed 6,800 animals from disaster zones.", year: 2024 },
  { id: 9,  lat: 15.5,  lng: 32.5,   country: "Sudan",        charity: "Clean Water Fund",  logo: "�", category: "Humanitarian",   status: "active",  spent: 290000, people: 18000,  description: "Deploying mobile water purification units to 3 refugee camps.", year: 2025 },
  { id: 10, lat: 12.3,  lng: 1.5,    country: "Burkina Faso", charity: "EduReach",          logo: "📚", category: "Education",      status: "active",  spent: 175000, people: 9500,   description: "Constructing 20 schools in conflict-affected northern regions.", year: 2025 },
  { id: 11, lat: -8.8,  lng: 13.2,   country: "Angola",       charity: "MediCare Global",   logo: "🏥", category: "Health",         status: "success", spent: 430000, people: 62000,  description: "Established 5 maternal health clinics reducing infant mortality by 34%.", year: 2023 },
  { id: 12, lat: 28.6,  lng: 77.2,   country: "India (Delhi)","charity": "FoodBridge",      logo: "🍞", category: "Hunger",         status: "success", spent: 210000, people: 55000,  description: "Distributed 3.1M meals through 40 community kitchens in Delhi slums.", year: 2024 },
  { id: 13, lat: -0.2,  lng: -78.5,  country: "Ecuador",      charity: "GreenEarth",        logo: "🌱", category: "Environment",    status: "active",  spent: 320000, people: 14000,  description: "Protecting 8,000 hectares of cloud forest with indigenous communities.", year: 2025 },
  { id: 14, lat: 6.4,   lng: 2.4,    country: "Benin",        charity: "EduReach",          logo: "📚", category: "Education",      status: "success", spent: 185000, people: 17000,  description: "Trained 320 teachers and supplied 60 schools with learning materials.", year: 2023 },
  { id: 15, lat: 48.8,  lng: 2.3,    country: "France",       charity: "HopeLight",         logo: "🕯️", category: "Mental Health",  status: "active",  spent: 95000,  people: 3100,   description: "Running mobile mental health units for homeless populations in Paris.", year: 2025 },
  { id: 16, lat: -13.9, lng: -171.9, country: "Samoa",        charity: "Clean Water Fund",  logo: "💧", category: "Humanitarian",   status: "success", spent: 140000, people: 11000,  description: "Restored clean water access after Cyclone Lola for 11,000 residents.", year: 2024 },
  { id: 17, lat: 9.0,   lng: 38.7,   country: "Ethiopia",     charity: "FoodBridge",        logo: "🍞", category: "Hunger",         status: "active",  spent: 510000, people: 88000,  description: "Emergency food distribution to drought-affected families in Tigray.", year: 2025 },
  { id: 18, lat: 35.7,  lng: 51.4,   country: "Iran",         charity: "ShelterNow",        logo: "🏠", category: "Housing",        status: "success", spent: 370000, people: 5400,   description: "Rebuilt 270 homes destroyed by the 2023 earthquake in Khoy.", year: 2023 },
  { id: 19, lat: -34.6, lng: -58.4,  country: "Argentina",    charity: "AnimalAid",         logo: "🐾", category: "Animal Welfare", status: "active",  spent: 72000,  people: 0,      description: "Operating 3 wildlife rescue centres for animals affected by wildfires.", year: 2025 },
  { id: 20, lat: 3.8,   lng: 11.5,   country: "Cameroon",     charity: "MediCare Global",   logo: "�", category: "Health",         status: "success", spent: 490000, people: 74000,  description: "Vaccinated 74,000 children against measles and polio in rural Cameroon.", year: 2024 },
  { id: 21, lat: 13.5,  lng: 2.1,    country: "Niger",        charity: "Clean Water Fund",  logo: "💧", category: "Humanitarian",   status: "success", spent: 260000, people: 29000,  description: "Drilled 18 boreholes providing year-round water to 29,000 villagers.", year: 2023 },
  { id: 22, lat: 55.7,  lng: 37.6,   country: "Russia",       charity: "HopeLight",         logo: "🕯️", category: "Mental Health",  status: "active",  spent: 60000,  people: 1800,   description: "Supporting displaced families with trauma counseling in border regions.", year: 2025 },
  { id: 23, lat: -4.3,  lng: 15.3,   country: "DR Congo",     charity: "EduReach",          logo: "📚", category: "Education",      status: "active",  spent: 230000, people: 21000,  description: "Building 30 schools in conflict zones with solar-powered classrooms.", year: 2025 },
  { id: 24, lat: 18.1,  lng: -15.9,  country: "Mauritania",   charity: "GreenEarth",        logo: "🌱", category: "Environment",    status: "success", spent: 195000, people: 8000,   description: "Planted 2M drought-resistant trees along the Sahel green belt.", year: 2024 },
  { id: 25, lat: 23.1,  lng: -102.5, country: "Mexico",       charity: "ShelterNow",        logo: "�", category: "Housing",        status: "active",  spent: 280000, people: 3900,   description: "Constructing 195 earthquake-resistant homes in Oaxaca.", year: 2025 },
];

const METRICS = [
  { label: "Total Donated", value: "$8.46M", icon: "💰" },
  { label: "Countries Active", value: "25", icon: "�" },
  { label: "Projects Completed", value: "13", icon: "✅" },
  { label: "People Impacted", value: "850k+", icon: "🤝" },
];

const STATUS_COLOR: Record<string, string> = {
  success: "#10b981",
  active: "#3b82f6",
};

// Top 4 most impactful completed projects by people helped
const TOP_PROJECTS = [...PROJECTS]
  .filter((p) => p.status === "success")
  .sort((a, b) => b.people - a.people)
  .slice(0, 4);

type Project = typeof PROJECTS[0];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      style={{ zIndex: 99999 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Project detail"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{project.logo}</span>
            <div>
              <p className="font-bold text-slate-800">{project.country}</p>
              <p className="text-xs text-slate-400">{project.charity}</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-slate-400 hover:text-slate-600 text-xl leading-none">✕</button>
        </div>

        <span className={`self-start text-xs rounded-full px-3 py-1 font-semibold ${
          project.status === "success" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
        }`}>
          {project.status === "success" ? "✅ Completed" : "🔵 Active"} · {project.year}
        </span>

        <p className="text-sm text-slate-600 leading-relaxed">{project.description}</p>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 rounded-xl px-3 py-2.5">
            <p className="text-xs text-slate-400">Category</p>
            <p className="text-sm font-semibold text-slate-700">{project.category}</p>
          </div>
          <div className="bg-slate-50 rounded-xl px-3 py-2.5">
            <p className="text-xs text-slate-400">Total Spent</p>
            <p className="text-sm font-semibold text-slate-700">${project.spent.toLocaleString()}</p>
          </div>
          {project.people > 0 && (
            <div className="bg-slate-50 rounded-xl px-3 py-2.5 col-span-2">
              <p className="text-xs text-slate-400">People Impacted</p>
              <p className="text-sm font-semibold text-slate-700">{project.people.toLocaleString()}</p>
            </div>
          )}
        </div>

        <button onClick={onClose} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl py-2.5 text-sm transition-colors">
          Close
        </button>
      </div>
    </div>,
    document.body
  );
}

export default function ImpactMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (typeof window === "undefined" || mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      if (!mapRef.current) return;

      const map = L.map(mapRef.current, {
        center: [20, 15],
        zoom: 2,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      PROJECTS.forEach((p) => {
        const marker = L.circleMarker([p.lat, p.lng], {
          radius: 10,
          fillColor: STATUS_COLOR[p.status],
          color: "#fff",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.85,
        }).addTo(map);

        marker.bindTooltip(
          `<div style="font-family:sans-serif;font-size:12px;font-weight:600;color:#1e293b">${p.logo} ${p.country}</div>
           <div style="font-size:11px;color:#64748b">${p.charity}</div>`,
          { direction: "top", offset: [0, -8] }
        );

        marker.on("click", () => setActiveProject(p));
      });

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mapInstanceRef.current as any).remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <section aria-label="GiveWell global impact map" className="flex flex-col gap-6">

      {/* Map — no overflow-hidden so tooltip/modal aren't clipped */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 px-5 py-3 border-b border-slate-100 text-xs font-medium">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            Completed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
            Active
          </span>
          <span className="ml-auto text-slate-400">{PROJECTS.length} projects worldwide</span>
        </div>
        <div ref={mapRef} style={{ height: 440, width: "100%", borderRadius: "0 0 1rem 1rem" }} aria-label="Interactive world map" />
      </div>

      {/* Top 4 most successful projects */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-slate-700">Top successful projects</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TOP_PROJECTS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveProject(p)}
              className="bg-white rounded-xl border border-slate-100 shadow-sm px-4 py-3 flex items-start gap-3 text-left hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <span className="text-2xl mt-0.5">{p.logo}</span>
              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-slate-800 truncate">{p.country}</span>
                  <span className="text-xs rounded-full px-2 py-0.5 font-semibold shrink-0 bg-emerald-100 text-emerald-700">
                    ✅ Completed
                  </span>
                </div>
                <span className="text-xs text-slate-400">{p.charity} · {p.year}</span>
                <span className="text-xs text-slate-500 mt-0.5 line-clamp-2">{p.description}</span>
                <div className="flex gap-3 mt-1 text-xs font-semibold text-slate-600">
                  <span>${p.spent.toLocaleString()} spent</span>
                  {p.people > 0 && <span>· {p.people.toLocaleString()} people helped</span>}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal rendered via portal so it's always above the map */}
      {mounted && activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  );
}
