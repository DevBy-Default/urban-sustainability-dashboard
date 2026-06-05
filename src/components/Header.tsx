import { Building2, BarChart3, Activity } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-5">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-11 h-11 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl shadow-md">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  Urban Sustainability Index
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 bg-primary-50 text-primary-700 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  <Activity className="w-3 h-3" />
                  Live
                </span>
              </div>
              <p className="mt-0.5 text-xs sm:text-sm text-gray-500">
                Compare Indian cities using environmental and livability indicators
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-50 text-gray-600 px-4 py-2 rounded-lg border border-gray-100">
              <BarChart3 className="w-4 h-4" />
              <span className="text-sm font-medium">Neural City</span>
            </div>
            <div className="text-xs text-gray-400">
              Last updated: June 2026
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
