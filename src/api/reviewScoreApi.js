export async function predictReviewScore(payload) {
  const response = await fetch('/api/review-score/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Failed to predict review score: ${response.status}`);
  }
  return response.json();
}

export async function fetchFacilityInsights() {
  const response = await fetch('/api/review-score/facilities');
  if (!response.ok) {
    throw new Error(`Failed to fetch facility insights: ${response.status}`);
  }
  return response.json();
}
