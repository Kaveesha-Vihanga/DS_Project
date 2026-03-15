import { useState } from 'react';
import { Users, TrendingUp, DollarSign, MapPin } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { keyMetrics } from '../../data/sampleData';

export default function MetricsDashboard() {
  const [selectedYear, setSelectedYear] = useState('2025');

  const metrics = [
    {
      title: 'Tourist Arrivals',
      value: keyMetrics.arrivals2025,
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
    },
    {
      title: 'Forecast Growth',
      value: keyMetrics.forecastGrowth,
      icon: TrendingUp,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
    },
    {
      title: 'Tourism Revenue',
      value: keyMetrics.revenue2025,
      icon: DollarSign,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
    },
    {
      title: 'Top District',
      value: keyMetrics.topDistrict,
      icon: MapPin,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 mb-16">
      <div className="flex justify-end mb-4">
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-32 bg-white shadow-sm">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2026">2026</SelectItem>
            <SelectItem value="2027">2027</SelectItem>
            <SelectItem value="2028">2028</SelectItem>
            <SelectItem value="2029">2029</SelectItem>
            <SelectItem value="2030">2030</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card 
              key={index} 
              className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0"
            >
              <div className={`h-2 bg-gradient-to-r ${metric.gradient}`} />
              <CardContent className={`pt-6 bg-gradient-to-br ${metric.bgGradient}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.gradient} shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
                <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
