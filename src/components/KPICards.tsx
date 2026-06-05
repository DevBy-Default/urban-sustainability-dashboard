import { MapPin, Wind, TreePine, Trophy, TrendingUp, TrendingDown } from "lucide-react";
import type { CityData } from "../data/cities";
import { getAqiCategory } from "../data/cities";

interface KPICardsProps {
  data: CityData[];
}

export default function KPICards({ data }: KPICardsProps) {
  const totalCities = data.length;
  const avgAqi = Math.round(data.reduce((s, c) => s + c.aqi, 0) / data.length);
  const avgGreen = (data.reduce((s, c) => s + c.greenCover, 0) / data.length).toFixed(1);
  const highestUsi = Math.max(...data.map(c => c.usi));
  const topCity = data.find(c => c.usi === highestUsi);

  const aqiCat = getAqiCategory(avgAqi);

  const cards = [
    {
      title: "Total Cities",
      value: totalCities,
      icon: MapPin,
      gradient: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      subtitle: "cities analyzed",
      trend: null,
    },
    {
      title: "Average AQI",
      value: avgAqi,
      icon: Wind,
      gradient: avgAqi > 100 ? "from-red-500 to-orange-500" : "from-emerald-500 to-green-500",
      iconBg: avgAqi > 100 ? "bg-red-100" : "bg-emerald-100",
      iconColor: avgAqi > 100 ? "text-red-600" : "text-emerald-600",
      subtitle: aqiCat.label,
      trend: avgAqi > 100 ? "up" : "down",
    },
    {
      title: "Avg Green Cover",
      value: `${avgGreen}%`,
      icon: TreePine,
      gradient: "from-emerald-500 to-teal-500",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      subtitle: "urban greenery",
      trend: null,
    },
    {
      title: "Highest USI",
      value: highestUsi,
      icon: Trophy,
      gradient: "from-amber-500 to-yellow-500",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      subtitle: topCity ? `${topCity.city}` : "top score",
      trend: "up",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div
          key={card.title}
          className={`bg-white rounded-xl border border-gray-200 overflow-hidden card-hover animate-fade-in-up stagger-${i + 1}`}
        >
          <div className={`h-1 bg-gradient-to-r ${card.gradient}`} />
          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                {card.title}
              </span>
              <div className={`p-2 rounded-lg ${card.iconBg}`}>
                <card.icon className={`w-4 h-4 ${card.iconColor}`} />
              </div>
            </div>
            <div className={`text-3xl font-bold text-gray-900 animate-count-up stagger-${i + 3}`}>
              {card.value}
            </div>
            <div className="flex items-center gap-1.5 mt-1.5">
              {card.trend === "up" && (
                <TrendingUp className="w-3 h-3 text-red-500" />
              )}
              {card.trend === "down" && (
                <TrendingDown className="w-3 h-3 text-emerald-500" />
              )}
              <span className="text-xs text-gray-400">{card.subtitle}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
