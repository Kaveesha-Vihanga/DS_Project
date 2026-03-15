import { TrendingUp, MapPin, Landmark, Palmtree, BadgeDollarSign, PiggyBank } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router';

export default function WhyInvestSection() {
  const reasons = [
    {
      title: 'Rapid Growth Market',
      description: 'Tourism recovering strongly with 12.5% CAGR projected through 2030',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Strategic Location',
      description: 'Gateway between East and West, accessible to 2 billion people within 4 hours',
      icon: MapPin,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'UNESCO World Heritage',
      description: '8 UNESCO sites attracting cultural and heritage tourists',
      icon: Landmark,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Diverse Offerings',
      description: 'Beaches, wildlife, tea country, ancient ruins - something for every traveler',
      icon: Palmtree,
      color: 'from-orange-500 to-red-500',
    },
    {
      title: 'Government Incentives',
      description: 'Tax holidays and investment incentives for tourism infrastructure',
      icon: BadgeDollarSign,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      title: 'Competitive Costs',
      description: 'Lower operational costs compared to Maldives and Southeast Asian competitors',
      icon: PiggyBank,
      color: 'from-teal-500 to-green-500',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Image Side */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-blue-600 rounded-3xl transform rotate-3" />
            <img
              src="https://images.unsplash.com/photo-1768346564825-6f90c0b89e2e?w=800&h=600&fit=crop"
              alt="Luxury Resort"
              className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover transform -rotate-2 hover:rotate-0 transition-transform duration-300"
            />
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
              <p className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                $4.2B
              </p>
              <p className="text-sm text-gray-600 mt-1">Annual Tourism Revenue</p>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-teal-600 to-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-full">
                Investment Opportunities
              </span>
            </div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Why Invest in
              <span className="block bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Sri Lanka Tourism?
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Sri Lanka's tourism sector offers unprecedented opportunities for investors seeking 
              high-growth markets with strong fundamentals and government support.
            </p>
            <Link to="/analytics">
              <Button size="lg" className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 shadow-lg">
                View Detailed Analytics
              </Button>
            </Link>
          </div>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${reason.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {reason.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
