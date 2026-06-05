import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
  Download,
  ChevronUp,
  ChevronDown,
  FileText,
  FileSpreadsheet,
} from "lucide-react";
import type { CityData } from "../data/cities";
import { getAqiCategory, getUsiGrade, exportToCSV } from "../data/cities";

interface ComparisonTableProps {
  data: CityData[];
}

type SortKey = "city" | "aqi" | "greenCover" | "populationDensity" | "usi";
type SortDir = "asc" | "desc";

function exportToPDF(data: CityData[]): void {
  const rows = data
    .map(c => `<tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">${c.city}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">${c.aqi}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">${c.greenCover}%</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">${c.populationDensity.toLocaleString()}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">${c.usi}</td></tr>`)
    .join("");

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Neural City Sustainability Report</title>
<style>body{font-family:Inter,system-ui,sans-serif;color:#1f2937;padding:40px;max-width:800px;margin:0 auto}
h1{font-size:22px;margin-bottom:4px}p.sub{font-size:13px;color:#6b7280;margin-bottom:24px}
table{width:100%;border-collapse:collapse;font-size:14px}th{background:#f1f5f9;padding:8px 12px;text-align:left;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em}
td{font-size:14px}.footer{margin-top:32px;font-size:11px;color:#9ca3af;border-top:1px solid #e5e7eb;padding-top:16px}
</style></head><body>
<h1>Neural City Urban Sustainability Report</h1>
<p class="sub">Generated on ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
<table><thead><tr><th>City</th><th>AQI</th><th>Green Cover</th><th>Pop. Density</th><th>USI Score</th></tr></thead><tbody>${rows}</tbody></table>
<div class="footer">This prototype was built using publicly available datasets for demonstration purposes as part of a Product Engineering Internship assignment.<br>Data Sources: CPCB Air Quality Data, Census of India Population Data, Forest Survey of India (FSI)</div>
</body></html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const w = window.open("", "_blank");
  if (w) {
    w.document.write(html);
    w.document.close();
    w.print();
  }
  URL.revokeObjectURL(url);
}

export default function ComparisonTable({ data }: ComparisonTableProps) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("usi");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [filterAqi, setFilterAqi] = useState<"all" | "good" | "moderate" | "unhealthy">("all");

  const filtered = useMemo(() => {
    let result = [...data];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(c => c.city.toLowerCase().includes(q));
    }

    if (filterAqi !== "all") {
      result = result.filter(c => {
        const cat = getAqiCategory(c.aqi).label;
        if (filterAqi === "good") return cat === "Good";
        if (filterAqi === "moderate") return cat === "Moderate";
        if (filterAqi === "unhealthy") return cat === "Unhealthy" || cat === "Hazardous";
        return true;
      });
    }

    result.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortDir === "asc"
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });

    return result;
  }, [data, search, sortKey, sortDir, filterAqi]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(d => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <ArrowUpDown className="w-3 h-3 text-gray-300" />;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3 h-3 text-primary-600" />
    ) : (
      <ChevronDown className="w-3 h-3 text-primary-600" />
    );
  }

  const columns: { key: SortKey; label: string }[] = [
    { key: "city", label: "City" },
    { key: "aqi", label: "AQI" },
    { key: "greenCover", label: "Green Cover" },
    { key: "populationDensity", label: "Pop. Density" },
    { key: "usi", label: "USI Score" },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-fade-in-up stagger-5">
      <div className="p-5 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <h3 className="text-sm font-semibold text-gray-800">City Comparison Table</h3>
          <div className="flex items-center gap-2 sm:ml-auto flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search city..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full sm:w-44 transition-shadow"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={filterAqi}
                onChange={e => setFilterAqi(e.target.value as typeof filterAqi)}
                className="pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white cursor-pointer transition-shadow"
              >
                <option value="all">All AQI</option>
                <option value="good">Good</option>
                <option value="moderate">Moderate</option>
                <option value="unhealthy">Unhealthy+</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => exportToCSV(data)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                Export CSV
              </button>
              <button
                onClick={() => exportToPDF(data)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/80">
              {columns.map(col => (
                <th
                  key={col.key}
                  className="px-5 py-3 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 select-none transition-colors"
                  onClick={() => handleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    <SortIcon col={col.key} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(city => {
              const aqiCat = getAqiCategory(city.aqi);
              const usiGrade = getUsiGrade(city.usi);
              return (
                <tr
                  key={city.city}
                  className="hover:bg-blue-50/30 transition-colors"
                >
                  <td className="px-5 py-4 text-sm font-medium text-gray-900">{city.city}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700">{city.aqi}</span>
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                          aqiCat.label === "Good"
                            ? "bg-emerald-50 text-emerald-600"
                            : aqiCat.label === "Moderate"
                            ? "bg-yellow-50 text-yellow-600"
                            : aqiCat.label === "Unhealthy"
                            ? "bg-orange-50 text-orange-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {aqiCat.label}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-700">{city.greenCover}%</td>
                  <td className="px-5 py-4 text-sm text-gray-700">
                    {city.populationDensity.toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary-600 transition-all duration-500"
                          style={{ width: `${city.usi}%` }}
                        />
                      </div>
                      <span className={`text-sm font-semibold ${usiGrade.color}`}>
                        {city.usi}
                      </span>
                      <span className={`text-[10px] font-medium ${usiGrade.color}`}>
                        {usiGrade.label}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm text-gray-400">
                  No cities match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
