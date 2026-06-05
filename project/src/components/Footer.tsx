import { Database, Shield } from "lucide-react";

const sources = [
  { name: "CPCB Air Quality Data", badge: "Air Quality", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { name: "Census of India Population Data", badge: "Population", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { name: "Forest Survey of India (FSI)", badge: "Green Cover", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-4 h-4 text-gray-400" />
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Data Sources
              </h4>
            </div>
            <div className="space-y-2.5">
              {sources.map(src => (
                <div key={src.name} className="flex items-center gap-3">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${src.color}`}>
                    {src.badge}
                  </span>
                  <span className="text-sm text-gray-600">{src.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-gray-400" />
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Disclaimer
              </h4>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              This prototype was built using publicly available datasets for demonstration purposes
              as part of a Product Engineering Internship assignment. The sustainability scores are
              computed using a simplified model and should not be used as the sole basis for policy
              decisions.
            </p>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            Neural City Urban Sustainability Dashboard &mdash; Built for data-driven urban governance
          </p>
          <p className="text-[10px] text-gray-300">
            v1.0 &middot; June 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
