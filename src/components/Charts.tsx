import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { CityData } from "../data/cities";

interface ChartsProps {
  data: CityData[];
}

function ChartCard({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 overflow-hidden card-hover animate-fade-in-up ${className}`}>
      <div className="px-5 pt-5 pb-3">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
      <div className="px-2 pb-4">
        <div className="h-64">{children}</div>
      </div>
    </div>
  );
}

const aqiColors = ["#22c55e", "#eab308", "#f97316", "#ef4444", "#dc2626"];

function getAqiColor(aqi: number): string {
  if (aqi <= 50) return aqiColors[0];
  if (aqi <= 100) return aqiColors[1];
  if (aqi <= 200) return aqiColors[2];
  if (aqi <= 300) return aqiColors[3];
  return aqiColors[4];
}

const tooltipStyle = {
  contentStyle: {
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 8px 25px -5px rgb(0 0 0 / 0.1)",
    fontSize: "13px",
    padding: "10px 14px",
  },
  itemStyle: { padding: "2px 0" },
};

export default function Charts({ data }: ChartsProps) {
  const usiRanked = [...data].sort((a, b) => b.usi - a.usi);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ChartCard title="AQI Comparison" subtitle="Lower is better" className="stagger-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="city" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey="aqi" radius={[6, 6, 0, 0]} name="AQI" barSize={40}>
              {data.map((entry, i) => (
                <Cell key={i} fill={getAqiColor(entry.aqi)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Green Cover Comparison" subtitle="Higher is better" className="stagger-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="city" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} unit="%" axisLine={false} tickLine={false} />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey="greenCover" fill="#22c55e" radius={[6, 6, 0, 0]} name="Green Cover (%)" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Population Density" subtitle="Per sq km — lower is better" className="stagger-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="city" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey="populationDensity" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Population Density" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Urban Sustainability Ranking" subtitle="USI Score — higher is better" className="stagger-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={usiRanked} margin={{ top: 5, right: 20, left: 0, bottom: 5 }} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <YAxis type="category" dataKey="city" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={80} />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey="usi" radius={[0, 6, 6, 0]} name="USI Score" barSize={24}>
              {usiRanked.map((entry, i) => (
                <Cell
                  key={i}
                  fill={i === 0 ? "#1d4ed8" : i === 1 ? "#3b82f6" : i === 2 ? "#60a5fa" : i === usiRanked.length - 1 ? "#fca5a5" : "#bfdbfe"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
