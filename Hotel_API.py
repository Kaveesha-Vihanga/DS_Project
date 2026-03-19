from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable cross-origin requests from your frontend

# -----------------------
# Regression coefficients
# -----------------------
# Constant term
CONST = -0.977

# Coefficients for positive mention rates
POS_COEF = {
    'amenities': 8.4919,
    'checkInOut': 0.3257,       # check-in/out
    'cleanliness': -1.0028,
    'facilities': 4.3044,
    'food': 0.1657,
    'location': -0.2536,
    'rooms': -0.0475,
    'staff': 0.8965,
    'valueForMoney': 0.7673      # value for money
}

# Coefficients for negative mention rates
NEG_COEF = {
    'amenities': 0.2758,
    'checkInOut': -2.8451,
    'cleanliness': -3.3245,
    'facilities': -6.1396,
    'food': 1.4307,
    'location': 1.7837,
    'rooms': 0.4734,
    'staff': 2.5254,
    'valueForMoney': 0.1193
}

# Helper: convert a 1‑10 rating to expected positive/negative rates
def rating_to_rates(rating, scale=10):
    """Convert a rating (1–scale) to expected positive/negative mention rates."""
    rating = max(1, min(scale, rating))
    pos_rate = 0.1 + 0.8 * ((rating - 1) / (scale - 1))
    neg_rate = 0.9 - 0.8 * ((rating - 1) / (scale - 1))
    return pos_rate, neg_rate

# ------------------------------------------------------------
# Prediction endpoint
# ------------------------------------------------------------
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No JSON payload'}), 400

    # Extract aspect ratings (expected in data['aspects'])
    aspects = data.get('aspects', {})
    required = ['amenities', 'checkInOut', 'cleanliness', 'facilities',
                'food', 'location', 'rooms', 'staff', 'valueForMoney']
    for asp in required:
        if asp not in aspects:
            return jsonify({'error': f'Missing aspect: {asp}'}), 400

    # Compute predicted rating
    total = CONST
    for asp in required:
        rating = aspects[asp]
        pos_rate, neg_rate = rating_to_rates(rating)
        total += pos_rate * POS_COEF[asp] + neg_rate * NEG_COEF[asp]

    predicted = min(max(total, 0), 10)  # clamp to [0,10]

    # Calculate marginal gain per 1‑point improvement for each aspect
    advice = []
    for asp in required:
        current_rating = aspects[asp]
        if current_rating >= 10:
            # Already at maximum – no gain possible
            advice.append({
                'aspect': asp.replace('checkInOut', 'check-in/out')
                             .replace('valueForMoney', 'value for money'),
                'gain_per_point': 0.0,
                'note': 'already at maximum'
            })
            continue

        # Compute new rates with rating+1
        new_pos, new_neg = rating_to_rates(current_rating + 1)
        # Contribution difference for this aspect only
        delta = (new_pos - rating_to_rates(current_rating)[0]) * POS_COEF[asp] + \
                (new_neg - rating_to_rates(current_rating)[1]) * NEG_COEF[asp]

        # New predicted rating if only this aspect changes (others unchanged)
        new_total = total + delta
        new_predicted = min(max(new_total, 0), 10)
        gain = new_predicted - predicted

        # Round and store (only show positive gain, but we'll keep all for completeness)
        advice.append({
            'aspect': asp.replace('checkInOut', 'check-in/out')
                         .replace('valueForMoney', 'value for money'),
            'gain_per_point': round(gain, 4)
        })

    # Prepare response
    response = {
        'predicted_rating': round(predicted, 2),
        'note': f'Equivalent to {round(predicted*10, 1)}% satisfaction score',
        'investment_advice': advice
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=5000)