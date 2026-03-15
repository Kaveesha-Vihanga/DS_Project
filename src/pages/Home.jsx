import HeroSection from '../components/sections/HeroSection';
import MetricsDashboard from '../components/sections/MetricsDashboard';
import TouristArrivalsChart from '../components/sections/TouristArrivalsChart';
import SourceMarketsMap from '../components/sections/SourceMarketsMap';
import WhyInvestSection from '../components/sections/WhyInvestSection';
import MonthlyComparisonChart from '../components/sections/MonthlyComparisonChart';
import TourismAttractions from '../components/sections/TourismAttractions';
import ContactSection from '../components/sections/ContactSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Section 2 - Hero */}
      <HeroSection />
      
      {/* Section 3 - Metrics Dashboard */}
      <MetricsDashboard />
      
      {/* Section 4 - Tourist Arrivals Chart */}
      <TouristArrivalsChart />
      
      {/* Section 5 - Source Markets */}
      <SourceMarketsMap />
      
      {/* Section 6 - Why Invest */}
      <WhyInvestSection />
      
      {/* Section 7 - Monthly Comparison */}
      <MonthlyComparisonChart />
      
      {/* Section 8 - Tourism Attractions */}
      <TourismAttractions />
      
      {/* Section 9 - Contact */}
      <ContactSection />
    </div>
  );
}
