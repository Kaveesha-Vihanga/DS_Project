import { useEffect, useState } from 'react';
import HeroSection from '../components/sections/HeroSection';
import MetricsDashboard from '../components/sections/MetricsDashboard';
import TouristArrivalsChart from '../components/sections/TouristArrivalsChart';
import SourceMarketsMap from '../components/sections/SourceMarketsMap';
import WhyInvestSection from '../components/sections/WhyInvestSection';
import MonthlyComparisonChart from '../components/sections/MonthlyComparisonChart';
import MonthlyArrivalForecast from '../components/sections/MonthlyArrivalForecast';
import TourismAttractions from '../components/sections/TourismAttractions';
import ContactSection from '../components/sections/ContactSection';
import { fetchArrivalsInsights } from '../api/arrivalsApi';

export default function Home() {
  const [arrivalsData, setArrivalsData] = useState(null);
  const [arrivalsLoading, setArrivalsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadArrivalsData = async () => {
      try {
        const data = await fetchArrivalsInsights();
        if (mounted) {
          setArrivalsData(data);
        }
      } catch (error) {
        console.error('Failed to fetch arrivals insights:', error);
      } finally {
        if (mounted) {
          setArrivalsLoading(false);
        }
      }
    };

    loadArrivalsData();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Section 2 - Hero */}
      <HeroSection />
      
      {/* Section 3 - Metrics Dashboard */}
      <MetricsDashboard arrivalsData={arrivalsData} loading={arrivalsLoading} />
      
      {/* Section 4 - Tourist Arrivals Chart */}
      <TouristArrivalsChart arrivalsData={arrivalsData} loading={arrivalsLoading} />

      {/* Section 4.1 - Forecast Insight */}
      <MonthlyArrivalForecast />
      
      {/* Section 5 - Source Markets */}
      <SourceMarketsMap />
      
      {/* Section 6 - Why Invest */}
      <WhyInvestSection />
      
      {/* Section 7 - Monthly Comparison */}
      <MonthlyComparisonChart arrivalsData={arrivalsData} loading={arrivalsLoading} />
      
      {/* Section 8 - Tourism Attractions */}
      <TourismAttractions />
      
      {/* Section 9 - Contact */}
      <ContactSection />
    </div>
  );
}
