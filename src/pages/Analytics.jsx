// import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
// import { TrendingUp, DollarSign, Percent, Hotel } from 'lucide-react';
// import { analyticsData } from '../data/sampleData';
// import ContactSection from '../components/sections/ContactSection';

// export default function Analytics() {
//   const metrics = [
//     {
//       title: 'Avg Occupancy Rate',
//       value: '72%',
//       change: '+5.2%',
//       icon: Percent,
//       gradient: 'from-blue-500 to-cyan-500',
//     },
//     {
//       title: 'Avg Daily Rate',
//       value: '$115',
//       change: '+8.1%',
//       icon: DollarSign,
//       gradient: 'from-green-500 to-emerald-500',
//     },
//     {
//       title: 'Revenue Growth',
//       value: '15.3%',
//       change: '+2.8%',
//       icon: TrendingUp,
//       gradient: 'from-purple-500 to-pink-500',
//     },
//     {
//       title: 'Hotel Properties',
//       value: '1,245',
//       change: '+156',
//       icon: Hotel,
//       gradient: 'from-orange-500 to-red-500',
//     },
//   ];

  // return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section */}
      // <section className="relative bg-gradient-to-br from-blue-600 via-purple-700 to-pink-600 text-white py-20">
      //   <div className="absolute inset-0 opacity-10">
      //     <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat" />
      //   </div>
        
      //   <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      //     <div className="flex items-center gap-3 mb-4">
      //       <TrendingUp className="h-8 w-8 text-blue-300" />
      //       <span className="text-blue-300 font-semibold">Investment Analytics</span>
      //     </div>
      //     <h1 className="text-4xl md:text-5xl font-bold mb-4">
      //       Tourism Investment Analytics
      //     </h1>
      //     <p className="text-xl text-gray-200 max-w-3xl">
      //       Comprehensive financial metrics and performance indicators to guide your hotel investment decisions in Sri Lanka's tourism sector.
      //     </p>
      //   </div>
      // </section>

//       {/* Main Content */}
//       <div className="py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Metrics Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//             {metrics.map((metric, index) => {
//               const Icon = metric.icon;
//               return (
//                 <Card key={index} className="shadow-lg border-0 overflow-hidden">
//                   <div className={`h-2 bg-gradient-to-r ${metric.gradient}`} />
//                   <CardContent className="pt-6">
//                     <div className="flex items-start justify-between mb-4">
//                       <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.gradient} shadow-lg`}>
//                         <Icon className="h-6 w-6 text-white" />
//                       </div>
//                       <span className="text-sm text-green-600 font-semibold">{metric.change}</span>
//                     </div>
//                     <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
//                     <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
//                   </CardContent>
//                 </Card>
//               );
//             })}
//           </div>

//           {/* Charts Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
//             {/* Occupancy Rates */}
//             <Card className="shadow-xl border-0 overflow-hidden">
//               <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500" />
//               <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
//                 <CardTitle className="text-xl">Monthly Occupancy Rates</CardTitle>
//                 <p className="text-sm text-gray-600 mt-1">Average hotel occupancy by month</p>
//               </CardHeader>
//               <CardContent className="pt-6">
//                 <ResponsiveContainer width="100%" height={300}>
//                   <LineChart data={analyticsData.occupancyRates}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                     <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
//                     <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
//                     <Tooltip />
//                     <Line 
//                       type="monotone" 
//                       dataKey="rate" 
//                       stroke="#3b82f6" 
//                       strokeWidth={3}
//                       dot={{ fill: '#3b82f6', r: 4 }}
//                       name="Occupancy %"
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>

//             {/* Average Daily Rate */}
//             <Card className="shadow-xl border-0 overflow-hidden">
//               <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500" />
//               <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
//                 <CardTitle className="text-xl">Average Daily Rate by Region</CardTitle>
//                 <p className="text-sm text-gray-600 mt-1">ADR comparison across regions</p>
//               </CardHeader>
//               <CardContent className="pt-6">
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={analyticsData.averageDailyRate}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                     <XAxis dataKey="region" stroke="#6b7280" style={{ fontSize: '12px' }} />
//                     <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
//                     <Tooltip />
//                     <Bar 
//                       dataKey="adr" 
//                       fill="#10b981" 
//                       radius={[8, 8, 0, 0]}
//                       name="ADR (USD)"
//                     />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Revenue Chart */}
//           <Card className="shadow-xl border-0 overflow-hidden mb-12">
//             <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" />
//             <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
//               <CardTitle className="text-2xl">Quarterly Revenue Trends</CardTitle>
//               <p className="text-sm text-gray-600 mt-2">
//                 Tourism revenue performance (in millions USD)
//               </p>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <ResponsiveContainer width="100%" height={350}>
//                 <BarChart data={analyticsData.revenueByQuarter}>
//                   <defs>
//                     <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
//                       <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.3}/>
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                   <XAxis dataKey="quarter" stroke="#6b7280" />
//                   <YAxis stroke="#6b7280" />
//                   <Tooltip />
//                   <Legend />
//                   <Bar 
//                     dataKey="revenue" 
//                     fill="url(#colorRevenue)" 
//                     radius={[8, 8, 0, 0]}
//                     name="Revenue ($M)"
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>

//           {/* Investment Insights */}
//           <Card className="shadow-xl border-0 overflow-hidden bg-gradient-to-br from-teal-50 to-blue-50">
//             <CardHeader>
//               <CardTitle className="text-2xl">Key Investment Insights</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="bg-white rounded-lg p-6 shadow-sm">
//                   <h3 className="font-semibold text-lg mb-3 text-gray-900">Market Opportunities</h3>
//                   <ul className="space-y-2 text-sm text-gray-600">
//                     <li className="flex items-start gap-2">
//                       <span className="text-green-600 mt-0.5">✓</span>
//                       <span>Southern region showing 18% annual growth in tourist arrivals</span>
//                     </li>
//                     <li className="flex items-start gap-2">
//                       <span className="text-green-600 mt-0.5">✓</span>
//                       <span>Boutique hotels achieving 85%+ occupancy in peak season</span>
//                     </li>
//                     <li className="flex items-start gap-2">
//                       <span className="text-green-600 mt-0.5">✓</span>
//                       <span>ADR growth of 8% year-over-year in coastal regions</span>
//                     </li>
//                   </ul>
//                 </div>
//                 <div className="bg-white rounded-lg p-6 shadow-sm">
//                   <h3 className="font-semibold text-lg mb-3 text-gray-900">Investment Recommendations</h3>
//                   <ul className="space-y-2 text-sm text-gray-600">
//                     <li className="flex items-start gap-2">
//                       <span className="text-blue-600 mt-0.5">→</span>
//                       <span>Focus on mid-range properties in emerging destinations</span>
//                     </li>
//                     <li className="flex items-start gap-2">
//                       <span className="text-blue-600 mt-0.5">→</span>
//                       <span>Consider eco-tourism properties in central highlands</span>
//                     </li>
//                     <li className="flex items-start gap-2">
//                       <span className="text-blue-600 mt-0.5">→</span>
//                       <span>Target international travelers from India and China markets</span>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* Contact Section */}
//       <ContactSection />
//     </div>
//   );
// }


import { useEffect, useMemo, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import { Switch } from '../components/ui/switch';
import { Badge } from '../components/ui/badge';
import { Loader2, Download, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';
import { MOCK_RESULT } from '../data/sampleData';
import { fetchFacilityInsights } from '../api/reviewScoreApi';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const RESULT_STORAGE_KEY = 'investment_scoring_latest_result';
const CONTEXT_STORAGE_KEY = 'investment_scoring_latest_context';

const toUnitRange = (value, fallback) => {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return fallback;
  return Math.max(0, Math.min(1, numeric));
};

const toPercent = (value, fallback) => {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return fallback;
  return Math.max(0, Math.min(100, numeric));
};

const normalizeBackendResult = (payload) => {
  const apiData = payload?.data || payload || {};
  const fallback = MOCK_RESULT;
  const score = toPercent(apiData.investment_score_0_100 ?? apiData.score, fallback.investment_score_0_100);
  const normalizedDrivers = {
    ...fallback.drivers,
    ...(apiData.drivers || {}),
  };

  return {
    ...fallback,
    ...apiData,
    investment_score_0_100: score,
    drivers: {
      ...normalizedDrivers,
      future_demand_fit: toUnitRange(normalizedDrivers.future_demand_fit, fallback.drivers.future_demand_fit),
      price_fit_vs_median: toUnitRange(normalizedDrivers.price_fit_vs_median, fallback.drivers.price_fit_vs_median),
      facility_completeness: toUnitRange(normalizedDrivers.facility_completeness, fallback.drivers.facility_completeness),
      gap_alignment: toUnitRange(normalizedDrivers.gap_alignment, fallback.drivers.gap_alignment),
      surplus_risk: toUnitRange(normalizedDrivers.surplus_risk, fallback.drivers.surplus_risk),
      area_median_price: Number(normalizedDrivers.area_median_price ?? fallback.drivers.area_median_price),
    },
    future_demand_pct: toPercent(apiData.future_demand_pct, fallback.future_demand_pct),
    expected_revenue_index: toUnitRange(apiData.expected_revenue_index, fallback.expected_revenue_index),
    regional_demand_pct: toPercent(apiData.regional_demand_pct, fallback.regional_demand_pct),
  };
};

export default function InvestmentScoring() {
  const [formData, setFormData] = useState({
    year: 2026,
    district: 'Colombo',
    area: '',
    stars: 3,
    price_per_night: 50,
    facilities: [],
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(() => {
    try {
      const saved = localStorage.getItem(RESULT_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [analysisContext, setAnalysisContext] = useState(() => {
    try {
      const saved = localStorage.getItem(CONTEXT_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const latestRequestIdRef = useRef(0);
  const [availableAreas, setAvailableAreas] = useState([]);
  const [areasLoading, setAreasLoading] = useState(true);
  const [areaFacilityData, setAreaFacilityData] = useState([]);

  const allFacilities = [
    'WiFi', 'AC', 'Pool', 'Spa', 'Gym', 
    'Restaurant', 'Bar', 'Parking', 'Room Service', 'Beach Access'
  ];

  useEffect(() => {
    let mounted = true;
    const loadMethmiAreas = async () => {
      try {
        const facilityInsights = await fetchFacilityInsights();
        if (!mounted) return;
        setAreaFacilityData(facilityInsights);
        const colomboAreas = facilityInsights.map((item) => item.area).sort((a, b) => a.localeCompare(b));
        setAvailableAreas(colomboAreas);
        setFormData((prev) =>
          prev.area || colomboAreas.length === 0 ? prev : { ...prev, area: colomboAreas[0] }
        );
      } catch (error) {
        toast.error('Unable to load Colombo area list from Methmi data.');
      } finally {
        if (mounted) setAreasLoading(false);
      }
    };

    loadMethmiAreas();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    try {
      if (result) {
        localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(result));
      }
    } catch {
      // ignore storage failures silently
    }
  }, [result]);

  useEffect(() => {
    try {
      if (analysisContext) {
        localStorage.setItem(CONTEXT_STORAGE_KEY, JSON.stringify(analysisContext));
      }
    } catch {
      // ignore storage failures silently
    }
  }, [analysisContext]);

  const toggleFacility = (facility) => {
    const updated = formData.facilities.includes(facility)
      ? formData.facilities.filter(f => f !== facility)
      : [...formData.facilities, facility];
    setFormData({ ...formData, facilities: updated });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const requestId = Date.now();
    latestRequestIdRef.current = requestId;
    
    try {
      const payload = {
        ...formData,
        property_type: 'Hotel',
        star_rating: formData.stars,
        budget: formData.price_per_night,
        rooms: 20,
      };

      const response = await fetch(`${API_BASE_URL}/api/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data = await response.json();
      if (data?.success === false) {
        throw new Error(data?.error || 'Prediction failed');
      }
      if (latestRequestIdRef.current === requestId) {
        setResult(normalizeBackendResult(data));
        setAnalysisContext({
          year: formData.year,
          area: formData.area,
          stars: formData.stars,
          budget: formData.price_per_night,
        });
      }
      toast.success('Investment analysis completed');
    } catch (error) {
      if (latestRequestIdRef.current === requestId) {
        setResult((prev) => prev || MOCK_RESULT);
      }
      toast.error(`Investment analysis failed: ${error.message}. Showing latest available result.`);
    } finally {
      if (latestRequestIdRef.current === requestId) {
        setLoading(false);
      }
    }
  };

  const handleDownloadReport = async () => {
    toast.info('PDF report endpoint is not connected yet.');
  };

  const getScoreDetails = (score) => {
    if (score >= 80) {
      return { 
        label: 'Excellent Investment ✅', 
        color: 'text-emerald-500', 
        bg: 'bg-emerald-500/10',
        icon: CheckCircle2,
        glow: 'shadow-emerald-500/50'
      };
    } else if (score >= 60) {
      return { 
        label: 'Good Investment 🟡', 
        color: 'text-yellow-500', 
        bg: 'bg-yellow-500/10',
        icon: CheckCircle2,
        glow: 'shadow-yellow-500/50'
      };
    } else if (score >= 40) {
      return { 
        label: 'Moderate Risk ⚠️', 
        color: 'text-orange-500', 
        bg: 'bg-orange-500/10',
        icon: AlertTriangle,
        glow: 'shadow-orange-500/50'
      };
    } else {
      return { 
        label: 'High Risk ❌', 
        color: 'text-red-500', 
        bg: 'bg-red-500/10',
        icon: XCircle,
        glow: 'shadow-red-500/50'
      };
    }
  };

  const driverChartData = result ? [
    { name: 'Demand Fit', value: result.drivers.future_demand_fit },
    { name: 'Price Fit', value: result.drivers.price_fit_vs_median },
    { name: 'Facilities', value: result.drivers.facility_completeness },
    { name: 'Gap Alignment', value: result.drivers.gap_alignment },
    { name: 'Surplus Risk', value: 1 - result.drivers.surplus_risk },
    { name: 'Quality', value: formData.stars / 5 },
  ] : [];

  const selectedAreaFacilityCoverage = useMemo(() => {
    const areaForInsights = formData.area || analysisContext?.area || '';
    const entry = areaFacilityData.find((item) => item.area === areaForInsights);
    if (!entry?.facilities) return [];

    return Object.entries(entry.facilities).map(([facility, coverage]) => ({
      facility: facility.toUpperCase(),
      coverage: Number(coverage),
    }));
  }, [areaFacilityData, formData.area, analysisContext]);

  const analysisArea = formData.area || analysisContext?.area || 'selected area';
  const analysisYear = formData.year || analysisContext?.year || '';
  const analysisBudget = formData.price_per_night || analysisContext?.budget || 0;
  const analysisStars = formData.stars || analysisContext?.stars || 3;

  const budgetSuggestion = useMemo(() => {
    if (!result?.drivers?.area_median_price) return null;
    const median = Number(result.drivers.area_median_price);
    if (!median || Number.isNaN(median)) return null;

    const budget = Number(formData.price_per_night);
    const gap = budget - median;
    const gapPct = (Math.abs(gap) / median) * 100;
    const suggestedBudget = Math.round(median);
    const estimatedLift = Math.min(12, (gapPct / 100) * 20).toFixed(1);

    if (Math.abs(gap) <= 3) {
      return {
        text: `Your budget is aligned with the local median (${suggestedBudget} USD/night), so pricing fit is already strong.`,
        lift: '0.0',
      };
    }

    const direction = gap > 0 ? 'decrease' : 'increase';
    return {
      text: `A better price-fit strategy is to ${direction} budget toward ${suggestedBudget} USD/night for ${analysisArea}.`,
      lift: estimatedLift,
    };
  }, [result, formData.price_per_night, analysisArea]);

  const facilitySuggestions = useMemo(() => {
    if (!selectedAreaFacilityCoverage.length) return [];

    const selectedNormalized = new Set(formData.facilities.map((item) => item.toLowerCase()));
    const weakest = [...selectedAreaFacilityCoverage]
      .sort((a, b) => a.coverage - b.coverage)
      .slice(0, 3);

    const liftBase = 0.8;
    return weakest.map((item, index) => {
      const key = item.facility.toLowerCase();
      const userHasIt = selectedNormalized.has(key);
      const action = userHasIt
        ? `Upgrade quality of ${item.facility}`
        : `Add ${item.facility} to your plan`;
      const estimatedLift = (liftBase + ((100 - item.coverage) / 100) * 1.4 - index * 0.1).toFixed(1);
      return {
        facility: item.facility,
        coverage: item.coverage,
        action,
        estimatedLift: Number(estimatedLift) > 0 ? estimatedLift : '0.4',
      };
    });
  }, [selectedAreaFacilityCoverage, formData.facilities]);

  const areaFacilityInsights = useMemo(() => {
    if (!selectedAreaFacilityCoverage.length) return null;
    const sorted = [...selectedAreaFacilityCoverage].sort((a, b) => b.coverage - a.coverage);
    const best = sorted[0];
    const weakest = sorted[sorted.length - 1];
    const average = sorted.reduce((sum, item) => sum + item.coverage, 0) / sorted.length;
    return {
      best,
      weakest,
      average: average.toFixed(1),
    };
  }, [selectedAreaFacilityCoverage]);

  return (
    
    <div className="min-h-screen py-8">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Investment Scoring</h1>
          <p className="text-lg text-muted-foreground">
            Enter your hotel investment idea to get an AI-powered score
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side: Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Year */}
              <div>
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  min={2025}
                  max={2035}
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  className="mt-2"
                />
              </div>

              {/* District */}
              <div>
                <Label>District</Label>
                <Select value={formData.district} disabled>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Colombo">Colombo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Area */}
              <div>
                <Label>Main Area/Town</Label>
                <Select 
                  value={formData.area} 
                  onValueChange={(area) => setFormData({ ...formData, area })}
                  disabled={areasLoading}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder={areasLoading ? 'Loading areas...' : 'Select area'} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableAreas.map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Stars */}
              <div>
                <Label>Star Rating</Label>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      variant={formData.stars === star ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFormData({ ...formData, stars: star })}
                      className={formData.stars === star ? 'bg-emerald-500 hover:bg-emerald-600' : ''}
                    >
                      {star}★
                    </Button>
                  ))}
                </div>
              </div>

              {/* Price Per Night */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Price Per Night (USD)</Label>
                  <span className="font-bold text-emerald-500">${formData.price_per_night}</span>
                </div>
                <Slider
                  value={[formData.price_per_night]}
                  onValueChange={([value]) => setFormData({ ...formData, price_per_night: value })}
                  min={1}
                  max={200}
                  step={1}
                  className="mt-2"
                />
              </div>

              {/* Facilities */}
              <div>
                <Label className="mb-3 block">Facilities</Label>
                <div className="grid grid-cols-2 gap-3">
                  {allFacilities.map((facility) => (
                    <div key={facility} className="flex items-center justify-between p-3 border rounded-lg">
                      <Label htmlFor={facility} className="cursor-pointer flex-1">
                        {facility}
                      </Label>
                      <Switch
                        id={facility}
                        checked={formData.facilities.includes(facility)}
                        onCheckedChange={() => toggleFacility(facility)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={loading || !formData.district || !formData.area}
                className="w-full bg-emerald-500 hover:bg-emerald-600"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Investment'
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Right Side: Results Panel */}
          {result && (
            <div className="space-y-6">
              {/* Score Card */}
              <Card className={`${getScoreDetails(result.investment_score_0_100).bg} shadow-2xl ${getScoreDetails(result.investment_score_0_100).glow}`}>
                <CardContent className="pt-8 pb-8">
                  <div className="flex flex-col items-center">
                    <div className="relative w-48 h-48 mb-4">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="96"
                          cy="96"
                          r="88"
                          stroke="currentColor"
                          strokeWidth="12"
                          fill="none"
                          className="text-muted"
                        />
                        <circle
                          cx="96"
                          cy="96"
                          r="88"
                          stroke="currentColor"
                          strokeWidth="12"
                          fill="none"
                          className={getScoreDetails(result.investment_score_0_100).color}
                          strokeDasharray={`${(result.investment_score_0_100 / 100) * 553} 553`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-5xl font-bold ${getScoreDetails(result.investment_score_0_100).color}`}>
                          {result.investment_score_0_100.toFixed(1)}
                        </span>
                        <span className="text-sm text-muted-foreground">out of 100</span>
                      </div>
                    </div>
                    <Badge className={`${getScoreDetails(result.investment_score_0_100).bg} ${getScoreDetails(result.investment_score_0_100).color} text-lg px-4 py-2`}>
                      {getScoreDetails(result.investment_score_0_100).label}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Metrics Row */}
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground mb-1">Future Demand</p>
                    <p className="text-2xl font-bold text-blue-500">{result.future_demand_pct}%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground mb-1">Revenue Index</p>
                    <p className="text-2xl font-bold text-emerald-500">
                      {(result.expected_revenue_index * 100).toFixed(0)}%
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground mb-1">Regional Demand</p>
                    <p className="text-2xl font-bold text-purple-500">{result.regional_demand_pct}%</p>
                  </CardContent>
                </Card>
              </div>

              {/* Driver Breakdown Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Score Drivers</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={driverChartData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis type="number" domain={[0, 1]} />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#10b981" radius={[0, 8, 8, 0]} name="Score" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Facility Gap Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Facility Coverage in {formData.area || 'Area'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={selectedAreaFacilityCoverage}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="facility" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar dataKey="coverage" fill="#8b5cf6" radius={[8, 8, 0, 0]} name="Coverage %" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Analysis Text */}
              <Card>
                <CardHeader>
                  <CardTitle>Investment Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-lg border bg-blue-50/50 p-4">
                      <p className="text-xs uppercase tracking-wide text-blue-700 font-semibold mb-1">Demand Outlook</p>
                      <p className="text-gray-700">
                        <strong>{analysisArea}</strong> is projected at{' '}
                        <strong className="text-blue-700">{result.future_demand_pct}% demand growth</strong> for {analysisYear}.
                      </p>
                    </div>
                    <div className="rounded-lg border bg-emerald-50/50 p-4">
                      <p className="text-xs uppercase tracking-wide text-emerald-700 font-semibold mb-1">Price Positioning</p>
                      <p className="text-gray-700">
                        Your <strong>{analysisStars}-star Hotel</strong> at <strong>${analysisBudget}/night</strong> is{' '}
                        <strong>
                          {analysisBudget > result.drivers.area_median_price
                            ? 'above'
                            : analysisBudget < result.drivers.area_median_price
                              ? 'below'
                              : 'aligned with'}
                        </strong>{' '}
                        area median <strong>${result.drivers.area_median_price}</strong>.
                      </p>
                    </div>
                    <div className="rounded-lg border bg-purple-50/50 p-4">
                      <p className="text-xs uppercase tracking-wide text-purple-700 font-semibold mb-1">Facility Readiness</p>
                      <p className="text-gray-700">
                        Completeness score is <strong>{(result.drivers.facility_completeness * 100).toFixed(0)}%</strong>, showing{' '}
                        {result.drivers.facility_completeness > 0.7 ? 'strong amenity readiness' : 'clear room for amenity improvements'}.
                      </p>
                    </div>
                    <div className="rounded-lg border bg-orange-50/50 p-4">
                      <p className="text-xs uppercase tracking-wide text-orange-700 font-semibold mb-1">Market Alignment</p>
                      <p className="text-gray-700">
                        Gap alignment is <strong>{(result.drivers.gap_alignment * 100).toFixed(0)}%</strong>, indicating{' '}
                        {result.drivers.gap_alignment > 0.6 ? 'good market positioning' : 'moderate mismatch risk'}.
                      </p>
                    </div>
                  </div>

                  {areaFacilityInsights && (
                    <div className="rounded-lg border p-4 bg-gray-50">
                      <p className="font-semibold mb-2">Area Facility Snapshot</p>
                      <p className="text-gray-700">
                        Average satisfaction in <strong>{analysisArea}</strong> is <strong>{areaFacilityInsights.average}%</strong>.
                        Best-performing facility: <strong>{areaFacilityInsights.best.facility}</strong>{' '}
                        ({areaFacilityInsights.best.coverage.toFixed(1)}%). Lowest-performing facility:{' '}
                        <strong>{areaFacilityInsights.weakest.facility}</strong>{' '}
                        ({areaFacilityInsights.weakest.coverage.toFixed(1)}%).
                      </p>
                    </div>
                  )}

                  {budgetSuggestion && (
                    <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                      <p className="font-semibold text-emerald-800 mb-1">Budget Optimization Suggestion</p>
                      <p className="text-emerald-900">
                        {budgetSuggestion.text} Estimated score uplift: <strong>+{budgetSuggestion.lift} points</strong>.
                      </p>
                    </div>
                  )}

                  {facilitySuggestions.length > 0 && (
                    <div className="rounded-lg border p-4">
                      <p className="font-semibold mb-3">Priority Facility Improvement Actions</p>
                      <ul className="space-y-2">
                        {facilitySuggestions.map((item) => (
                          <li key={item.facility} className="flex items-start justify-between gap-3 border-b last:border-b-0 pb-2 last:pb-0">
                            <span className="text-gray-700">
                              {item.action} <span className="text-gray-500">(current coverage: {item.coverage.toFixed(1)}%)</span>
                            </span>
                            <span className="font-semibold text-teal-700 whitespace-nowrap">+{item.estimatedLift} pts</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className={`rounded-lg border p-4 ${getScoreDetails(result.investment_score_0_100).bg}`}>
                    <p className={`${getScoreDetails(result.investment_score_0_100).color} font-semibold`}>
                      Overall Recommendation: {getScoreDetails(result.investment_score_0_100).label}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Download Button */}
              <Button
                onClick={handleDownloadReport}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Investment Report 📄
              </Button>
            </div>
          )}

          {!result && (
            <Card className="flex items-center justify-center min-h-[400px]">
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Fill in the form and click "Analyze Investment" to see results
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}