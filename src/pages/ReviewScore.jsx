import { useEffect, useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { fetchFacilityInsights, predictReviewScore } from '../api/reviewScoreApi';

const ASPECT_LABELS = [
  ['amenities', 'Amenities'],
  ['checkInOut', 'Check-in/out'],
  ['cleanliness', 'Cleanliness'],
  ['facilities', 'Facilities'],
  ['food', 'Food'],
  ['location', 'Location'],
  ['rooms', 'Rooms'],
  ['staff', 'Staff'],
  ['valueForMoney', 'Value for money'],
];

const DEFAULT_ASPECTS = {
  amenities: 8,
  checkInOut: 9,
  cleanliness: 10,
  facilities: 10,
  food: 8,
  location: 6,
  rooms: 9,
  staff: 10,
  valueForMoney: 10,
};

const formatNumber = (value) => new Intl.NumberFormat().format(Number(value || 0));

export default function ReviewScore() {
  const [aspects, setAspects] = useState(DEFAULT_ASPECTS);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const [facilityData, setFacilityData] = useState([]);
  const [facilityLoading, setFacilityLoading] = useState(true);
  const [selectedArea, setSelectedArea] = useState('');

  useEffect(() => {
    let mounted = true;
    const loadFacilities = async () => {
      try {
        const data = await fetchFacilityInsights();
        if (!mounted) return;
        setFacilityData(data);
        if (data.length > 0) {
          setSelectedArea(data[0].area);
        }
      } catch (error) {
        console.error('Failed to load facility insights', error);
      } finally {
        if (mounted) setFacilityLoading(false);
      }
    };
    loadFacilities();
    return () => {
      mounted = false;
    };
  }, []);

  const selectedAreaData = useMemo(
    () => facilityData.find((item) => item.area === selectedArea),
    [facilityData, selectedArea]
  );

  const radarData = useMemo(() => {
    if (!selectedAreaData?.facilities) return [];
    return Object.entries(selectedAreaData.facilities).map(([facility, score]) => ({
      facility: facility.toUpperCase(),
      score: Number(score),
    }));
  }, [selectedAreaData]);

  const weakFacilities = useMemo(() => {
    if (!selectedAreaData?.facilities) return [];
    return Object.entries(selectedAreaData.facilities)
      .map(([facility, score]) => ({ facility, score: Number(score) }))
      .sort((a, b) => a.score - b.score)
      .slice(0, 5);
  }, [selectedAreaData]);

  const comparisonData = useMemo(() => {
    if (!selectedAreaData?.facilities || facilityData.length === 0) return [];
    const keys = Object.keys(selectedAreaData.facilities);

    return keys.map((key) => {
      const total = facilityData.reduce((sum, area) => sum + Number(area.facilities[key] || 0), 0);
      const average = total / facilityData.length;
      return {
        facility: key.toUpperCase(),
        selected: Number(selectedAreaData.facilities[key]),
        average: Number(average.toFixed(1)),
      };
    });
  }, [selectedAreaData, facilityData]);

  const handlePredict = async () => {
    const valid = Object.values(aspects).every((value) => value >= 1 && value <= 10);
    if (!valid) {
      window.alert('All aspect ratings must be between 1 and 10.');
      return;
    }

    setLoading(true);
    try {
      const prediction = await predictReviewScore({ aspects });
      setResult(prediction);
    } catch (error) {
      console.error(error);
      window.alert('Prediction failed. Please ensure Methmi backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <section>
          <h1 className="text-4xl font-bold mb-2">Review Score</h1>
          <p className="text-lg text-muted-foreground">
            Predict your hotel review score and identify the facility gaps to prioritize investment.
          </p>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Hotel Aspect Expectations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ASPECT_LABELS.map(([key, label]) => (
                <div key={key}>
                  <Label>{label}</Label>
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    value={aspects[key]}
                    onChange={(event) =>
                      setAspects((prev) => ({
                        ...prev,
                        [key]: Number(event.target.value),
                      }))
                    }
                    className="mt-2"
                  />
                </div>
              ))}
            </div>

            <Button onClick={handlePredict} className="bg-teal-600 hover:bg-teal-700" disabled={loading}>
              {loading ? 'Predicting...' : 'Predict Review Score'}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Prediction Result</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge variant="outline" className="text-lg px-4 py-2">
                  {result.predicted_rating.toFixed(2)} / 10
                </Badge>
                <Badge variant="outline">{result.note}</Badge>
              </div>

              <h3 className="font-semibold mb-3">Best improvement opportunities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.investment_advice.slice(0, 6).map((item) => (
                  <div key={item.aspect} className="border rounded-lg p-3 flex justify-between items-center">
                    <span className="font-medium capitalize">{item.aspect}</span>
                    <span className="text-teal-600 font-semibold">+{Number(item.gain_per_point).toFixed(3)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Facility Satisfaction Insights by Area</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full md:w-80 mb-6">
              <Label>Select Area</Label>
              <Select value={selectedArea} onValueChange={setSelectedArea} disabled={facilityLoading}>
                <SelectTrigger className="mt-2 bg-white">
                  <SelectValue placeholder="Choose area" />
                </SelectTrigger>
                <SelectContent>
                  {facilityData.map((item) => (
                    <SelectItem key={item.area} value={item.area}>
                      {item.area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">Facility Profile (Radar)</h3>
                <ResponsiveContainer width="100%" height={340}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="facility" tick={{ fontSize: 10 }} />
                    <PolarRadiusAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => `${formatNumber(value)}%`} />
                    <Radar dataKey="score" stroke="#0f766e" fill="#0f766e" fillOpacity={0.35} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">Top 5 Weak Facilities</h3>
                <ResponsiveContainer width="100%" height={340}>
                  <BarChart data={weakFacilities} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                    <YAxis dataKey="facility" type="category" width={90} />
                    <Tooltip formatter={(value) => `${formatNumber(value)}%`} />
                    <Bar dataKey="score" fill="#f97316" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Selected Area vs Overall Average</h3>
              <ResponsiveContainer width="100%" height={380}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="facility" tick={{ fontSize: 11 }} />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip formatter={(value) => `${formatNumber(value)}%`} />
                  <Legend />
                  <Bar dataKey="selected" fill="#14b8a6" name="Selected Area" />
                  <Bar dataKey="average" fill="#6366f1" name="Overall Average" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
