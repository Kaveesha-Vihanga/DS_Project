import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import { sourceMarkets } from '../../data/sampleData';

export default function SourceMarketsMap() {
  const treemapData = sourceMarkets.map(market => ({
    name: market.country,
    size: market.arrivals,
    share: market.share,
    flag: market.flag,
  }));

  const COLORS = [
    '#0d9488', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b',
    '#10b981', '#6366f1', '#14b8a6', '#06b6d4', '#8b5cf6'
  ];

  const CustomizedContent = (props) => {
    const { x, y, width, height, index, name, share } = props;
    
    if (width < 60 || height < 60) return null;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: COLORS[index % COLORS.length],
            stroke: '#fff',
            strokeWidth: 2,
          }}
        />
        <text
          x={x + width / 2}
          y={y + height / 2 - 10}
          textAnchor="middle"
          fill="#fff"
          fontSize={14}
          fontWeight="bold"
        >
          {name}
        </text>
        <text
          x={x + width / 2}
          y={y + height / 2 + 10}
          textAnchor="middle"
          fill="#fff"
          fontSize={16}
          fontWeight="bold"
        >
          {share}%
        </text>
      </g>
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <Card className="shadow-xl border-0 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" />
        <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
          <CardTitle className="text-2xl">Top 10 Source Markets</CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            International visitor arrivals by country of origin
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Treemap Visualization */}
          <div className="mb-8">
            <ResponsiveContainer width="100%" height={400}>
              <Treemap
                data={treemapData}
                dataKey="size"
                aspectRatio={4 / 3}
                stroke="#fff"
                content={<CustomizedContent />}
              />
            </ResponsiveContainer>
          </div>

          {/* Detailed Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Rank</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Country</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Arrivals</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Share</th>
                </tr>
              </thead>
              <tbody>
                {sourceMarkets.map((market, index) => (
                  <tr 
                    key={market.country} 
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      >
                        {index + 1}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{market.flag}</span>
                        <span className="font-medium text-gray-900">{market.country}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-gray-900">
                      {(market.arrivals / 1000).toFixed(0)}K
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Badge 
                        className="font-semibold"
                        style={{ 
                          backgroundColor: COLORS[index % COLORS.length],
                          color: 'white'
                        }}
                      >
                        {market.share}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
