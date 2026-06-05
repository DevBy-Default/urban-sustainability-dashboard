import { Info, BarChart3, Target } from "lucide-react";

export default function ExecutiveSummary() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 gradient-border animate-fade-in-up">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-11 h-11 bg-primary-50 rounded-xl shrink-0">
            <Info className="w-5 h-5 text-primary-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-semibold text-gray-900 mb-1">Executive Summary</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              This dashboard helps compare Indian cities using environmental and sustainability
              indicators. It is designed for municipal decision-makers, urban planners, and citizens
              to evaluate urban livability through data-driven insights on air quality, green cover,
              and population density.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-4 shrink-0 ml-4">
            <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg">
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">5 Cities</span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg">
              <Target className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">4 Metrics</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
