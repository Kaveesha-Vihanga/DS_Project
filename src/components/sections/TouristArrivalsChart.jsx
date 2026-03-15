import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { touristArrivals } from '../../data/sampleData';

export default function TouristArrivalsChart() {
  const [timeRange, setTimeRange] = useState('all');

  const getFilteredData = () => {
    const currentYear = 2025;
    if (timeRange === '5') {
      return touristArrivals.filter(d => d.year >= currentYear - 5);
    } else if (timeRange === '10') {
      return touristArrivals.filter(d => d.year >= currentYear - 10);
    }
    return touristArrivals;
  };

  const filteredData = getFilteredData();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{data.year}</p>
          <p className="text-sm text-gray-600">
            {(data.arrivals / 1000000).toFixed(2)}M arrivals
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {data.isForecast ? 'Forecast' : 'Actual'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <Card className="shadow-xl border-0 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500" />
        <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="text-2xl">Tourist Arrivals Trend</CardTitle>
            <div className="flex gap-2">
              {['5', '10', 'all'].map((range) => (
                <Button
                  key={range}
                  size="sm"
                  variant={timeRange === range ? 'default' : 'outline'}
                  onClick={() => setTimeRange(range)}
                  className={
                    timeRange === range
                      ? 'bg-gradient-to-r from-teal-600 to-blue-600'
                      : ''
                  }
                >
                  {range === 'all' ? 'All Years' : `${range} Years`}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={filteredData}>
              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="year" 
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="line"
              />
              {/* Actual Data Line */}
              <Line
                type="monotone"
                dataKey={(d) => !d.isForecast ? d.arrivals : null}
                stroke="#0d9488"
                strokeWidth={3}
                name="Actual Arrivals"
                dot={{ fill: '#0d9488', r: 5 }}
                activeDot={{ r: 7 }}
                connectNulls={false}
              />
              {/* Forecast Data Line */}
              <Line
                type="monotone"
                dataKey={(d) => d.isForecast ? d.arrivals : null}
                stroke="#3b82f6"
                strokeWidth={3}
                strokeDasharray="8 8"
                name="Forecast"
                dot={{ fill: '#3b82f6', r: 5 }}
                activeDot={{ r: 7 }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
          
          {/* Legend Info */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-teal-600" />
              <span className="text-gray-600">Actual Data (2016-2025)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-blue-600 border-dashed border-t-2 border-blue-600" />
              <span className="text-gray-600">Forecast (2026-2030)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
