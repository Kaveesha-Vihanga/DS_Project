import { useState } from 'react';
import { Users, TrendingUp, DollarSign, MapPin } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { keyMetrics } from '../../data/sampleData';

const formatMillions = (value) => `${(value / 1_000_000).toFixed(3)}M`;
const formatNumber = (value) => new Intl.NumberFormat().format(value);

export default function MetricsDashboard({ arrivalsData, loading }) {
  const [selectedYear, setSelectedYear] = useState('2025');
  const insights = arrivalsData?.insights;
  const yearly = arrivalsData?.yearly_totals || [];
  const latestYearData = yearly[yearly.length - 1];
  const selectedData = yearly.find((entry) => String(entry.year) === selectedYear);

  const computedGrowth =
    yearly.length >= 2
      ? (((yearly[yearly.length - 1].total_arrivals - yearly[yearly.length - 2].total_arrivals) /
          yearly[yearly.length - 2].total_arrivals) *
          100).toFixed(1)
      : null;

  const metrics = [
    {
      title: 'Tourist Arrivals',
      value: selectedData ? formatMillions(selectedData.total_arrivals) : keyMetrics.arrivals2025,
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
    },
    {
      title: 'Forecast Growth',
      value: computedGrowth ? `${computedGrowth}%` : keyMetrics.forecastGrowth,
      icon: TrendingUp,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
    },
    {
      title: 'Latest Total Arrivals',
      value: latestYearData ? formatNumber(latestYearData.total_arrivals) : keyMetrics.revenue2025,
      icon: DollarSign,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
    },
    {
      title: 'Peak Month',
      value: insights ? `${insights.peak_month.month} ${insights.peak_month.year}` : keyMetrics.topDistrict,
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
            {(arrivalsData?.insights?.available_years || [2025]).map((year) => (
              <SelectItem key={year} value={String(year)}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading && (
        <p className="text-sm text-gray-500 mb-4">Loading arrivals insights from Samha backend...</p>
      )}

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
