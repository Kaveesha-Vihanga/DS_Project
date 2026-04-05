from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
import re

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "json.json")

CONST = -0.977
POS_COEF = {
    "amenities": 8.4919,
    "checkInOut": 0.3257,
    "cleanliness": -1.0028,
    "facilities": 4.3044,
    "food": 0.1657,
    "location": -0.2536,
    "rooms": -0.0475,
    "staff": 0.8965,
    "valueForMoney": 0.7673,
}
NEG_COEF = {
    "amenities": 0.2758,
    "checkInOut": -2.8451,
    "cleanliness": -3.3245,
    "facilities": -6.1396,
    "food": 1.4307,
    "location": 1.7837,
    "rooms": 0.4734,
    "staff": 2.5254,
    "valueForMoney": 0.1193,
}
REQUIRED_ASPECTS = [
    "amenities",
    "checkInOut",
    "cleanliness",
    "facilities",
    "food",
    "location",
    "rooms",
    "staff",
    "valueForMoney",
]


def rating_to_rates(rating, scale=10):
    rating = max(1, min(scale, rating))
    pos_rate = 0.1 + 0.8 * ((rating - 1) / (scale - 1))
    neg_rate = 0.9 - 0.8 * ((rating - 1) / (scale - 1))
    return pos_rate, neg_rate


def sanitize_data_file(raw_text):
    clean = re.sub(r"^\s*const\s+\w+\s*=\s*", "", raw_text)
    clean = re.sub(r";\s*$", "", clean.strip(), flags=re.MULTILINE)
    clean = re.sub(r"//.*", "", clean)
    # Convert JS object keys (area:, facilities:) to JSON keys ("area": ...)
    clean = re.sub(r'([{\[,]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:', r'\1"\2":', clean)
    return clean


def load_facility_data():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        raw = f.read()
    sanitized = sanitize_data_file(raw)
    return json.loads(sanitized)


@app.route("/")
def home():
    return jsonify({"message": "Methmi review score API is running"})


@app.route("/api/review-score/predict", methods=["POST"])
def predict_review_score():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON payload"}), 400

    aspects = data.get("aspects", {})
    for aspect in REQUIRED_ASPECTS:
        if aspect not in aspects:
            return jsonify({"error": f"Missing aspect: {aspect}"}), 400

    total = CONST
    for aspect in REQUIRED_ASPECTS:
        rating = float(aspects[aspect])
        pos_rate, neg_rate = rating_to_rates(rating)
        total += pos_rate * POS_COEF[aspect] + neg_rate * NEG_COEF[aspect]

    predicted = min(max(total, 0), 10)
    advice = []

    for aspect in REQUIRED_ASPECTS:
        current_rating = float(aspects[aspect])
        label = (
            aspect.replace("checkInOut", "check-in/out")
            .replace("valueForMoney", "value for money")
        )
        if current_rating >= 10:
            advice.append(
                {
                    "aspect": label,
                    "gain_per_point": 0.0,
                    "note": "already at maximum",
                }
            )
            continue

        current_pos, current_neg = rating_to_rates(current_rating)
        new_pos, new_neg = rating_to_rates(current_rating + 1)
        delta = (new_pos - current_pos) * POS_COEF[aspect] + (new_neg - current_neg) * NEG_COEF[aspect]
        new_predicted = min(max(total + delta, 0), 10)
        gain = new_predicted - predicted
        advice.append({"aspect": label, "gain_per_point": round(gain, 4)})

    advice_sorted = sorted(advice, key=lambda item: item["gain_per_point"], reverse=True)
    return jsonify(
        {
            "predicted_rating": round(predicted, 2),
            "note": f"Equivalent to {round(predicted * 10, 1)}% satisfaction score",
            "investment_advice": advice_sorted,
        }
    )


@app.route("/api/review-score/facilities", methods=["GET"])
def get_facility_data():
    try:
        data = load_facility_data()
        return jsonify(data)
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.route("/api/review-score/facilities/<path:area>", methods=["GET"])
def get_facility_data_by_area(area):
    try:
        data = load_facility_data()
        item = next((entry for entry in data if entry.get("area") == area), None)
        if item is None:
            return jsonify({"error": f"Area not found: {area}"}), 404
        return jsonify(item)
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5002, debug=True)
