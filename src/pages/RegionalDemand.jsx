import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Users, DollarSign, Globe } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { provinceData, hotelInvestmentData } from '../data/sampleData';

export default function RegionalDemand() {
  // Calculate data for charts
  const visitorsSorted = [...provinceData]
    .sort((a, b) => b.total_visitors - a.total_visitors)
    .map((p, idx) => ({ ...p, id: `visitors-${idx}` }));
  const revenueSorted = [...provinceData]
    .sort((a, b) => b.revenue_M - a.revenue_M)
    .map((p, idx) => ({ ...p, id: `revenue-${idx}` }));
  
  // Calculate local vs foreign visitors
  const localVsForeign = provinceData.map((p, idx) => ({
    id: `local-foreign-${idx}`,
    province: p.province,
    foreign: Math.round(p.total_visitors * p.foreign_pct / 100),
    local: Math.round(p.total_visitors * (100 - p.foreign_pct) / 100),
  }));

  // Foreign percentage data
  const foreignPctSorted = [...provinceData]
    .sort((a, b) => b.foreign_pct - a.foreign_pct)
    .map((p, idx) => ({ id: `foreign-pct-${idx}`, province: p.province, foreign_pct: p.foreign_pct }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-lg p-3">
          <p className="font-semibold mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Regional Tourism Demand</h1>
          <p className="text-lg text-muted-foreground">
            Provincial breakdown of visitors, revenue and tourism trends across Sri Lanka
          </p>
        </div>

        {/* Section 1: Province Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {provinceData.map((province, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center justify-between">
                  {province.province}
                  <Badge variant="outline" className="text-xs">
                    {province.foreign_pct}% foreign
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Visitors</p>
                    <p className="text-lg font-bold">{province.total_visitors.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-emerald-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="text-lg font-bold">Rs {province.revenue_M.toFixed(2)}M</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-purple-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Foreign Visitors</p>
                    <p className="text-lg font-bold">
                      {Math.round(province.total_visitors * province.foreign_pct / 100).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section 2: Charts */}
        <div className="space-y-8 mb-12">
          {/* Chart 1: Total Visitors by Province */}
          <Card>
            <CardHeader>
              <CardTitle>Total Visitors by Province</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={visitorsSorted}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="province" 
                    angle={-45} 
                    textAnchor="end" 
                    height={100}
                    className="text-xs"
                  />
                  <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="total_visitors" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Visitors" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Chart 2: Revenue by Province */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Province (Rs M)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={revenueSorted}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="province" 
                    angle={-45} 
                    textAnchor="end" 
                    height={100}
                    className="text-xs"
                  />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="revenue_M" fill="#10b981" radius={[8, 8, 0, 0]} name="Revenue (M)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Chart 3: Local vs Foreign Visitors */}
          <Card>
            <CardHeader>
              <CardTitle>Local vs Foreign Visitors by Province</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={localVsForeign}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="province" 
                    angle={-45} 
                    textAnchor="end" 
                    height={100}
                    className="text-xs"
                  />
                  <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="local" stackId="a" fill="#8b5cf6" name="Local" />
                  <Bar dataKey="foreign" stackId="a" fill="#ec4899" name="Foreign" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Chart 4: Foreign Tourist Percentage */}
          {/* <Card>
            <CardHeader>
              <CardTitle>Foreign Tourist % by Province</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={foreignPctSorted} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="province" type="category" width={120} className="text-xs" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="foreign_pct" fill="#f59e0b" radius={[0, 8, 8, 0]} name="Foreign %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card> */}
        </div>

        {/* Section 3: Hotel Investment Trends */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold">Hotel Investment Trends (2010-2025)</h2>

          {/* Chart 5: Projects Received vs Approved */}
          <Card>
            <CardHeader>
              <CardTitle>Number of Projects: Received vs Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={hotelInvestmentData.map((d, idx) => ({ ...d, id: `project-${idx}` }))}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="received" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    name="Received"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="approved" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    name="Approved"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Chart 6: Investment Value Received vs Approved */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Value (USD M): Received vs Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={hotelInvestmentData.map((d, idx) => ({ ...d, id: `investment-${idx}` }))}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="received_investment" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    name="Received Investment"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="approved_investment" 
                    stroke="#ec4899" 
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    name="Approved Investment"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}