export interface CityData {
  city: string;
  aqi: number;
  greenCover: number;
  populationDensity: number;
  usi: number;
}

export const cities: CityData[] = [
  { city: "Jaipur", aqi: 82, greenCover: 15, populationDensity: 598, usi: 78 },
  { city: "Delhi", aqi: 245, greenCover: 8, populationDensity: 11320, usi: 48 },
  { city: "Mumbai", aqi: 110, greenCover: 10, populationDensity: 20482, usi: 71 },
  { city: "Pune", aqi: 76, greenCover: 18, populationDensity: 5600, usi: 81 },
  { city: "Ahmedabad", aqi: 90, greenCover: 12, populationDensity: 6800, usi: 73 },
];

function aqiScore(aqi: number): number {
  if (aqi <= 50) return 100;
  if (aqi <= 100) return 80 - ((aqi - 50) / 50) * 20;
  if (aqi <= 200) return 50 - ((aqi - 100) / 100) * 20;
  return Math.max(0, 30 - ((aqi - 200) / 300) * 30);
}

function greenCoverScore(cover: number): number {
  return Math.min(100, (cover / 30) * 100);
}

function densityScore(density: number): number {
  if (density <= 1000) return 100;
  if (density <= 5000) return 90 - ((density - 1000) / 4000) * 20;
  if (density <= 10000) return 70 - ((density - 5000) / 5000) * 30;
  return Math.max(10, 40 - ((density - 10000) / 15000) * 30);
}

export function calculateUSI(city: CityData): number {
  const a = aqiScore(city.aqi);
  const g = greenCoverScore(city.greenCover);
  const d = densityScore(city.populationDensity);
  return Math.round(a * 0.4 + g * 0.3 + d * 0.3);
}

export function getAqiCategory(aqi: number): { label: string; color: string } {
  if (aqi <= 50) return { label: "Good", color: "text-emerald-600" };
  if (aqi <= 100) return { label: "Moderate", color: "text-yellow-600" };
  if (aqi <= 200) return { label: "Unhealthy", color: "text-orange-600" };
  return { label: "Hazardous", color: "text-red-600" };
}

export function getUsiGrade(usi: number): { label: string; color: string } {
  if (usi >= 80) return { label: "Excellent", color: "text-emerald-600" };
  if (usi >= 70) return { label: "Good", color: "text-blue-600" };
  if (usi >= 60) return { label: "Fair", color: "text-yellow-600" };
  if (usi >= 50) return { label: "Poor", color: "text-orange-600" };
  return { label: "Critical", color: "text-red-600" };
}

export function generateInsights(data: CityData[]): string[] {
  const insights: string[] = [];
  const sorted = [...data].sort((a, b) => b.usi - a.usi);
  const top = sorted[0];
  const bottom = sorted[sorted.length - 1];

  insights.push(`${top.city} has the highest sustainability score at ${top.usi}.`);
  insights.push(`${bottom.city} has the lowest sustainability score at ${bottom.usi}.`);

  const worstAqi = [...data].sort((a, b) => b.aqi - a.aqi)[0];
  insights.push(`${worstAqi.city} has the worst air quality (AQI ${worstAqi.aqi}) among listed cities.`);

  const bestGreen = [...data].sort((a, b) => b.greenCover - a.greenCover)[0];
  insights.push(`${bestGreen.city} leads in green cover with ${bestGreen.greenCover}%.`);

  const avgUsi = data.reduce((s, c) => s + c.usi, 0) / data.length;
  const aboveAvg = data.filter(c => c.usi > avgUsi);
  if (aboveAvg.length > 0) {
    insights.push(`${aboveAvg.map(c => c.city).join(" and ")} ${aboveAvg.length === 1 ? "performs" : "perform"} above average in sustainability.`);
  }

  const lowGreen = data.filter(c => c.greenCover < 15);
  if (lowGreen.length > 0) {
    insights.push(`Cities with green cover below 15% (${lowGreen.map(c => c.city).join(", ")}) tend to rank lower on the sustainability index.`);
  }

  insights.push("Higher green cover consistently improves sustainability rankings across evaluated cities.");

  const highDensity = data.filter(c => c.populationDensity > 10000);
  if (highDensity.length > 0) {
    insights.push(`${highDensity.map(c => c.city).join(" and ")} ${highDensity.length === 1 ? "has" : "have"} very high population density, which negatively impacts livability scores.`);
  }

  return insights;
}

export function exportToCSV(data: CityData[]): void {
  const headers = ["City", "AQI", "Green Cover (%)", "Population Density (per km²)", "USI Score"];
  const rows = data.map(c => [c.city, c.aqi, c.greenCover, c.populationDensity, c.usi]);
  const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "neural_city_sustainability_data.csv";
  a.click();
  URL.revokeObjectURL(url);
}
