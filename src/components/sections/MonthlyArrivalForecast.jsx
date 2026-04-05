import { useEffect, useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { fetchForecastOptions, fetchMonthlyForecast } from '../../api/arrivalsApi';

const formatNumber = (value) => new Intl.NumberFormat().format(Number(value || 0));

export default function MonthlyArrivalForecast() {
  const [options, setOptions] = useState({ nationalities: [], years: [] });
  const [nationality, setNationality] = useState('');
  const [year, setYear] = useState('');
  const [forecast, setForecast] = useState(null);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [loadingForecast, setLoadingForecast] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    const loadOptions = async () => {
      try {
        const data = await fetchForecastOptions();
        if (!mounted) return;
        setOptions(data);
        setNationality(data.nationalities[0] || '');
        setYear(String(data.years[0] || ''));
      } catch (err) {
        if (mounted) {
          setError('Unable to load forecast options.');
        }
      } finally {
        if (mounted) setLoadingOptions(false);
      }
    };

    loadOptions();
    return () => {
      mounted = false;
    };
  }, []);

  const chartData = useMemo(
    () =>
      (forecast?.data || []).map((row) => ({
        month: row.Month?.slice(0, 3),
        forecast: row.Forecast,
        lower: row.Lower_CI,
        upper: row.Upper_CI,
      })),
    [forecast]
  );

  const handleGenerate = async () => {
    if (!nationality || !year) return;

    try {
      setError('');
      setLoadingForecast(true);
      const data = await fetchMonthlyForecast(nationality, year);
      setForecast(data);
    } catch (err) {
      setError('Forecast generation failed. Please try another selection.');
      setForecast(null);
    } finally {
      setLoadingForecast(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <Card className="shadow-xl border-0 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
        <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
          <CardTitle className="text-2xl">Monthly Arrival Forecast</CardTitle>
          <p className="text-sm text-gray-600 mt-1">Choose nationality and target year to generate monthly forecast insights.</p>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="w-full md:w-64">
              <p className="text-sm font-medium text-gray-700 mb-2">Nationality</p>
              <Select value={nationality} onValueChange={setNationality} disabled={loadingOptions}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select nationality" />
                </SelectTrigger>
                <SelectContent>
                  {options.nationalities.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-40">
              <p className="text-sm font-medium text-gray-700 mb-2">Target Year</p>
              <Select value={year} onValueChange={setYear} disabled={loadingOptions}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {options.years.map((item) => (
                    <SelectItem key={item} value={String(item)}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleGenerate}
              className="bg-teal-600 hover:bg-teal-700"
              disabled={loadingOptions || loadingForecast || !nationality || !year}
            >
              {loadingForecast ? 'Generating...' : 'Generate Forecast'}
            </Button>
          </div>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          {forecast && (
            <div className="mt-6">
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge variant="outline">{`📍 ${forecast.nationality}`}</Badge>
                <Badge variant="outline">{`🤖 Model: ${forecast.model_used}`}</Badge>
                <Badge variant="outline">{`📈 Peak: ${forecast.peak_month}`}</Badge>
                <Badge variant="outline">{`👥 Total: ${formatNumber(forecast.total_forecast)}`}</Badge>
              </div>

              <ResponsiveContainer width="100%" height={360}>
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis tickFormatter={(value) => formatNumber(value)} stroke="#6b7280" />
                  <Tooltip formatter={(value) => formatNumber(value)} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="upper"
                    stroke="rgba(20,184,166,0.35)"
                    fill="rgba(20,184,166,0.12)"
                    name="Upper CI"
                    strokeDasharray="4 4"
                    dot={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="lower"
                    stroke="rgba(107,114,128,0.45)"
                    fill="rgba(107,114,128,0.08)"
                    name="Lower CI"
                    strokeDasharray="4 4"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    stroke="#0f766e"
                    strokeWidth={3}
                    dot={{ fill: '#0f766e', r: 4 }}
                    name="Forecast"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
