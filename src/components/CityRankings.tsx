import { Trophy, Medal, Award } from "lucide-react";
import type { CityData } from "../data/cities";
import { getUsiGrade } from "../data/cities";

interface CityRankingsProps {
  data: CityData[];
}

function getMedalIcon(rank: number) {
  if (rank === 1) return <Trophy className="w-5 h-5 text-amber-500" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
  if (rank === 3) return <Award className="w-5 h-5 text-amber-700" />;
  return null;
}

function getRankBadge(rank: number) {
  if (rank === 1) return "bg-gradient-to-r from-amber-400 to-yellow-400 text-white shadow-md shadow-amber-200";
  if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-400 text-white";
  if (rank === 3) return "bg-gradient-to-r from-amber-600 to-amber-700 text-white";
  return "bg-gray-100 text-gray-600";
}

export default function CityRankings({ data }: CityRankingsProps) {
  const ranked = [...data].sort((a, b) => b.usi - a.usi);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-fade-in-up stagger-3">
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Trophy className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">City Sustainability Rankings</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">Ranked by Urban Sustainability Index</p>
          </div>
        </div>
      </div>
      <div className="px-5 pb-5">
        <div className="space-y-2">
          {ranked.map((city, i) => {
            const rank = i + 1;
            const usiGrade = getUsiGrade(city.usi);
            const isTop = rank === 1;
            return (
              <div
                key={city.city}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 hover:shadow-sm ${
                  isTop
                    ? "bg-blue-50/60 border-blue-200 glow-blue"
                    : "bg-white border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold ${getRankBadge(rank)}`}>
                  {rank <= 3 ? getMedalIcon(rank) : rank}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold ${isTop ? "text-blue-700" : "text-gray-800"}`}>
                      {city.city}
                    </span>
                    {isTop && (
                      <span className="text-[10px] font-semibold bg-blue-600 text-white px-1.5 py-0.5 rounded">
                        TOP
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[11px] text-gray-400">AQI: {city.aqi}</span>
                    <span className="text-[11px] text-gray-400">Green: {city.greenCover}%</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${usiGrade.color}`}>{city.usi}</div>
                  <span className={`text-[10px] font-medium ${usiGrade.color}`}>{usiGrade.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
