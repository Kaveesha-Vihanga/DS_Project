import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { TrendingUp, DollarSign, Percent, Hotel } from 'lucide-react';
import { analyticsData } from '../data/sampleData';
import ContactSection from '../components/sections/ContactSection';

export default function Analytics() {
  const metrics = [
    {
      title: 'Avg Occupancy Rate',
      value: '72%',
      change: '+5.2%',
      icon: Percent,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Avg Daily Rate',
      value: '$115',
      change: '+8.1%',
      icon: DollarSign,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Revenue Growth',
      value: '15.3%',
      change: '+2.8%',
      icon: TrendingUp,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Hotel Properties',
      value: '1,245',
      change: '+156',
      icon: Hotel,
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-700 to-pink-600 text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-8 w-8 text-blue-300" />
            <span className="text-blue-300 font-semibold">Investment Analytics</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tourism Investment Analytics
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Comprehensive financial metrics and performance indicators to guide your hotel investment decisions in Sri Lanka's tourism sector.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <Card key={index} className="shadow-lg border-0 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${metric.gradient}`} />
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.gradient} shadow-lg`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-sm text-green-600 font-semibold">{metric.change}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Occupancy Rates */}
            <Card className="shadow-xl border-0 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500" />
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
                <CardTitle className="text-xl">Monthly Occupancy Rates</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Average hotel occupancy by month</p>
              </CardHeader>
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData.occupancyRates}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="rate" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', r: 4 }}
                      name="Occupancy %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Average Daily Rate */}
            <Card className="shadow-xl border-0 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500" />
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
                <CardTitle className="text-xl">Average Daily Rate by Region</CardTitle>
                <p className="text-sm text-gray-600 mt-1">ADR comparison across regions</p>
              </CardHeader>
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.averageDailyRate}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="region" stroke="#6b7280" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                    <Tooltip />
                    <Bar 
                      dataKey="adr" 
                      fill="#10b981" 
                      radius={[8, 8, 0, 0]}
                      name="ADR (USD)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Chart */}
          <Card className="shadow-xl border-0 overflow-hidden mb-12">
            <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" />
            <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
              <CardTitle className="text-2xl">Quarterly Revenue Trends</CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Tourism revenue performance (in millions USD)
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={analyticsData.revenueByQuarter}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="quarter" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="revenue" 
                    fill="url(#colorRevenue)" 
                    radius={[8, 8, 0, 0]}
                    name="Revenue ($M)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Investment Insights */}
          <Card className="shadow-xl border-0 overflow-hidden bg-gradient-to-br from-teal-50 to-blue-50">
            <CardHeader>
              <CardTitle className="text-2xl">Key Investment Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="font-semibold text-lg mb-3 text-gray-900">Market Opportunities</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Southern region showing 18% annual growth in tourist arrivals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Boutique hotels achieving 85%+ occupancy in peak season</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>ADR growth of 8% year-over-year in coastal regions</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="font-semibold text-lg mb-3 text-gray-900">Investment Recommendations</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">→</span>
                      <span>Focus on mid-range properties in emerging destinations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">→</span>
                      <span>Consider eco-tourism properties in central highlands</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">→</span>
                      <span>Target international travelers from India and China markets</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
