import { MapPin } from 'lucide-react';
import RegionalShareChart from '../components/sections/RegionalShareChart';
import ContactSection from '../components/sections/ContactSection';

export default function RegionalDemand() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-600 via-blue-700 to-purple-800 text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="h-8 w-8 text-teal-300" />
            <span className="text-teal-300 font-semibold">Regional Analysis</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Regional Tourism Demand
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Explore visitor distribution and demand patterns across Sri Lanka's diverse regions. 
            Identify high-potential areas for tourism investment.
          </p>
          
          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <p className="text-3xl font-bold">9</p>
              <p className="text-sm text-gray-300 mt-1">Provinces Analyzed</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <p className="text-3xl font-bold">32%</p>
              <p className="text-sm text-gray-300 mt-1">Western Province Share</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <p className="text-3xl font-bold">768K</p>
              <p className="text-sm text-gray-300 mt-1">Top Region Visitors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-16">
        {/* Section 11 - Regional Share Chart */}
        <RegionalShareChart />
      </div>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
