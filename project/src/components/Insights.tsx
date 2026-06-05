import { Sparkles, Lightbulb, TrendingUp, AlertTriangle, Leaf } from "lucide-react";
import type { CityData } from "../data/cities";
import { generateInsights } from "../data/cities";

interface InsightsProps {
  data: CityData[];
}

function getInsightIcon(text: string) {
  if (text.includes("air quality") || text.includes("AQI")) return { icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50" };
  if (text.includes("green cover") || text.includes("Green")) return { icon: Leaf, color: "text-emerald-500", bg: "bg-emerald-50" };
  if (text.includes("highest") || text.includes("leads") || text.includes("improves")) return { icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-50" };
  return { icon: Lightbulb, color: "text-amber-500", bg: "bg-amber-50" };
}

export default function Insights({ data }: InsightsProps) {
  const insights = generateInsights(data);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-fade-in-up stagger-6">
      <div className="px-5 pt-5 pb-3 flex items-center gap-2.5">
        <div className="p-2 bg-amber-100 rounded-lg">
          <Sparkles className="w-4 h-4 text-amber-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-800">AI-Powered Urban Insights</h3>
          <p className="text-[11px] text-gray-400 mt-0.5">Automatically generated from dataset analysis</p>
        </div>
      </div>
      <div className="px-5 pb-5 space-y-3">
        {insights.map((insight, i) => {
          const { icon: Icon, color, bg } = getInsightIcon(insight);
          return (
            <div
              key={i}
              className={`flex items-start gap-3 p-3 rounded-lg ${bg} border border-gray-100 transition-all duration-200 hover:shadow-sm`}
            >
              <Icon className={`w-4 h-4 ${color} mt-0.5 shrink-0`} />
              <span className="text-sm text-gray-700 leading-relaxed">{insight}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
