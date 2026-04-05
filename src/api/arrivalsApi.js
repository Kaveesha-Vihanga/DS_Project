export async function fetchArrivalsInsights() {
  const response = await fetch('/api/arrivals/insights');
  if (!response.ok) {
    throw new Error(`Failed to load arrivals insights: ${response.status}`);
  }

  return response.json();
}

export async function fetchForecastOptions() {
  const response = await fetch('/api/arrivals/forecast/options');
  if (!response.ok) {
    throw new Error(`Failed to load forecast options: ${response.status}`);
  }

  return response.json();
}

export async function fetchMonthlyForecast(nationality, year) {
  const params = new URLSearchParams({
    nationality,
    year: String(year),
  });

  const response = await fetch(`/api/arrivals/forecast?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Failed to load forecast: ${response.status}`);
  }

  return response.json();
}
