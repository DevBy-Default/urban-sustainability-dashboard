import { Calculator, Wind, TreePine, Users } from "lucide-react";

export default function Methodology() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-fade-in-up stagger-4">
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-violet-100 rounded-lg">
            <Calculator className="w-4 h-4 text-violet-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">How the Urban Sustainability Index is Calculated</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">USI methodology and scoring framework</p>
          </div>
        </div>
      </div>

      <div className="px-5 pb-5">
        {/* Formula Card */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-5 border border-gray-200 mb-4">
          <div className="text-center">
            <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3">
              USI Formula
            </div>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span className="text-lg font-bold text-gray-900">USI =</span>
              <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-semibold">
                40% Air Quality Score
              </span>
              <span className="text-lg font-bold text-gray-400">+</span>
              <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg text-sm font-semibold">
                30% Green Cover Score
              </span>
              <span className="text-lg font-bold text-gray-400">+</span>
              <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 px-3 py-1.5 rounded-lg text-sm font-semibold">
                30% Pop. Density Score
              </span>
            </div>
          </div>
        </div>

        {/* Explanation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-blue-50/60 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <Wind className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-semibold text-blue-700">Air Quality (40%)</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Lower AQI improves score. Cities with AQI below 50 receive the highest rating, while those above 200 are penalized heavily.
            </p>
          </div>
          <div className="bg-emerald-50/60 rounded-xl p-4 border border-emerald-100">
            <div className="flex items-center gap-2 mb-2">
              <TreePine className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-semibold text-emerald-700">Green Cover (30%)</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Higher green cover improves score. Cities are benchmarked against a 30% ideal green cover target recommended by urban standards.
            </p>
          </div>
          <div className="bg-amber-50/60 rounded-xl p-4 border border-amber-100">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-semibold text-amber-700">Pop. Density (30%)</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Balanced population density improves score. Very high density reduces livability, while moderate density supports sustainable urban living.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
