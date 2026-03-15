import { Link } from 'react-router';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';

export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1648819955157-a9a96e307d56?w=1920&h=1080&fit=crop"
          alt="Colombo Skyline"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/80 to-blue-800/70" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <TrendingUp className="h-4 w-4 text-teal-300" />
            <span className="text-sm text-white font-medium">12.5% Annual Growth Projected</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Unlock Sri Lanka's
            <span className="block bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent">
              Tourism Potential
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            Data-driven insights for smart hotel investments in the Pearl of the Indian Ocean. 
            Explore trends, regional demand, and investment opportunities.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/regional-demand">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-linear-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg shadow-teal-500/50"
              >
                Explore Regional Demand
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/analytics">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-white text-white hover:bg-white/10 backdrop-blur-sm"
              >
                View Investment Analytics
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p className="text-2xl font-bold text-white">2.45M</p>
              <p className="text-sm text-gray-300">Arrivals 2025</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p className="text-2xl font-bold text-white">$4.2B</p>
              <p className="text-sm text-gray-300">Tourism Revenue</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p className="text-2xl font-bold text-white">8</p>
              <p className="text-sm text-gray-300">UNESCO Sites</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
