import Header from "./components/Header";
import ExecutiveSummary from "./components/ExecutiveSummary";
import KPICards from "./components/KPICards";
import Charts from "./components/Charts";
import CityRankings from "./components/CityRankings";
import ComparisonTable from "./components/ComparisonTable";
import Methodology from "./components/Methodology";
import Insights from "./components/Insights";
import WhyThisMatters from "./components/WhyThisMatters";
import Footer from "./components/Footer";
import { cities } from "./data/cities";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50/80">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
        <ExecutiveSummary />
        <KPICards data={cities} />
        <Charts data={cities} />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3">
            <ComparisonTable data={cities} />
          </div>
          <div className="lg:col-span-2">
            <CityRankings data={cities} />
          </div>
        </div>
        <Methodology />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Insights data={cities} />
          <WhyThisMatters />
        </div>
      </main>
      <Footer />
    </div>
  );
}
