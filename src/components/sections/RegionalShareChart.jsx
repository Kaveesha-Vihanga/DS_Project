import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { regionalData } from '../../data/sampleData';

export default function RegionalShareChart() {
  const [viewMode, setViewMode] = useState('pie'); // 'pie' or 'bar'

  const COLORS = [
    '#0d9488', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b',
    '#10b981', '#6366f1', '#14b8a6', '#06b6d4'
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{data.region}</p>
          <p className="text-sm text-gray-600">
            Visitors: {(data.visitors / 1000).toFixed(0)}K
          </p>
          <p className="text-sm font-semibold" style={{ color: payload[0].fill }}>
            Share: {data.percentage}%
          </p>
        </div>
      );
    }
    return null;
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percentage < 5) return null;

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="font-bold text-sm"
      >
        {`${percentage}%`}
      </text>
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <Card className="shadow-xl border-0 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500" />
        <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">Regional Tourism Distribution</CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Visitor share across Sri Lanka's 9 provinces
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={viewMode === 'pie' ? 'default' : 'outline'}
                onClick={() => setViewMode('pie')}
                className={viewMode === 'pie' ? 'bg-gradient-to-r from-teal-600 to-blue-600' : ''}
              >
                Pie Chart
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'bar' ? 'default' : 'outline'}
                onClick={() => setViewMode('bar')}
                className={viewMode === 'bar' ? 'bg-gradient-to-r from-teal-600 to-blue-600' : ''}
              >
                Bar Chart
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Chart Visualization */}
          <div className="mb-8">
            {viewMode === 'pie' ? (
              <ResponsiveContainer width="100%" height={450}>
                <PieChart>
                  <Pie
                    data={regionalData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="percentage"
                  >
                    {regionalData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={regionalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="region" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    stroke="#6b7280"
                    style={{ fontSize: '11px' }}
                  />
                  <YAxis
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="percentage" 
                    fill="#0d9488" 
                    radius={[8, 8, 0, 0]}
                    name="Percentage Share"
                  >
                    {regionalData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Detailed Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Region</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Visitors</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Share</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Visual</th>
                </tr>
              </thead>
              <tbody>
                {regionalData.map((region, index) => (
                  <tr 
                    key={region.region} 
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="font-medium text-gray-900">{region.region}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">{region.type}</Badge>
                    </td>
                    <td className="py-4 px-4 text-right font-semibold text-gray-900">
                      {(region.visitors / 1000).toFixed(0)}K
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="text-lg font-bold" style={{ color: COLORS[index % COLORS.length] }}>
                        {region.percentage}%
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${region.percentage * 3}%`,
                            backgroundColor: COLORS[index % COLORS.length]
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Top Region</p>
              <p className="text-xl font-bold text-gray-900">Western</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Total Visitors</p>
              <p className="text-xl font-bold text-gray-900">2.4M</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Coastal Regions</p>
              <p className="text-xl font-bold text-gray-900">28%</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Cultural Sites</p>
              <p className="text-xl font-bold text-gray-900">25%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
