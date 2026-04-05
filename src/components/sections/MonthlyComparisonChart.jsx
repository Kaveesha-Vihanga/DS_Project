import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { monthlyArrivals2024, monthlyArrivals2025 } from '../../data/sampleData';

export default function MonthlyComparisonChart({ arrivalsData, loading }) {
  const availableYears = arrivalsData?.insights?.available_years || [2024, 2025];
  const sortedYears = [...availableYears].sort((a, b) => a - b);
  const defaultYear1 = sortedYears[sortedYears.length - 2] || sortedYears[0];
  const defaultYear2 = sortedYears[sortedYears.length - 1] || sortedYears[0];

  const [year1, setYear1] = useState(String(defaultYear1));
  const [year2, setYear2] = useState(String(defaultYear2));

  const getMonthlyData = (year) => {
    if (arrivalsData?.monthly_by_year?.[year]) return arrivalsData.monthly_by_year[year];
    if (year === String(defaultYear1)) return monthlyArrivals2024;
    if (year === String(defaultYear2)) return monthlyArrivals2025;
    if (year === '2024') return monthlyArrivals2024;
    if (year === '2025') return monthlyArrivals2025;
    return monthlyArrivals2024;
  };

  const data1 = getMonthlyData(year1);
  const data2 = getMonthlyData(year2);

  const comparisonData = data1.map((item, index) => {
    const val1 = item.arrivals;
    const val2 = data2[index].arrivals;
    const growth = val1 === 0 ? (val2 === 0 ? 0 : 100) : ((val2 - val1) / val1) * 100;
    
    return {
      month: item.month,
      [year1]: val1,
      [year2]: val2,
      growth: growth.toFixed(1),
    };
  });

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">{data.month}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {(entry.value / 1000).toFixed(0)}K
            </p>
          ))}
          <div className={`flex items-center gap-1 mt-2 text-sm font-semibold ${
            parseFloat(data.growth) >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {parseFloat(data.growth) >= 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>{data.growth}% growth</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <Card className="shadow-xl border-0 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500" />
        <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">Monthly Arrivals Year-over-Year</CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Compare monthly tourist arrivals between different years
              </p>
              {loading && <p className="text-xs text-gray-500 mt-1">Loading monthly records...</p>}
            </div>
            <div className="flex gap-3">
              <Select value={year1} onValueChange={setYear1}>
                <SelectTrigger className="w-28 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortedYears.map((year) => (
                    <SelectItem key={year} value={String(year)}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="flex items-center text-gray-500">vs</span>
              <Select value={year2} onValueChange={setYear2}>
                <SelectTrigger className="w-28 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortedYears.map((year) => (
                    <SelectItem key={year} value={String(year)}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={comparisonData}>
              <defs>
                <linearGradient id="colorYear1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.3}/>
                </linearGradient>
                <linearGradient id="colorYear2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0.3}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar 
                dataKey={year1} 
                fill="url(#colorYear1)" 
                radius={[8, 8, 0, 0]}
                name={`${year1} Arrivals`}
              />
              <Bar 
                dataKey={year2} 
                fill="url(#colorYear2)" 
                radius={[8, 8, 0, 0]}
                name={`${year2} Arrivals`}
              />
            </BarChart>
          </ResponsiveContainer>

          {/* Growth Summary */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {comparisonData.slice(0, 4).map((month) => (
              <div key={month.month} className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">{month.month}</p>
                <div className={`flex items-center gap-1 font-semibold ${
                  parseFloat(month.growth) >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {parseFloat(month.growth) >= 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span>{month.growth}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
