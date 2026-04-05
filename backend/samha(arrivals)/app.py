from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "data", "arrivals_dataset.json")
FORECAST_FILE = os.path.join(BASE_DIR, "predictions", "forecasts.json")


def load_dataset():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def load_forecast_data():
    with open(FORECAST_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def build_forecast_yearly_totals(forecast_data):
    totals_by_year = {}
    for nationality in forecast_data.values():
        for year, rows in nationality.items():
            yearly_total = sum(int(row.get("Forecast", 0)) for row in rows)
            totals_by_year[year] = totals_by_year.get(year, 0) + yearly_total

    return [
        {
            "year": int(year),
            "total_arrivals": totals_by_year[year],
            "millions": round(totals_by_year[year] / 1_000_000, 3),
            "is_forecast": True,
        }
        for year in sorted(totals_by_year.keys())
    ]


def calculate_insights(dataset):
    yearly = sorted(dataset["yearly_totals"], key=lambda item: item["year"])
    monthly_by_year = dataset["monthly_by_year"]

    latest = yearly[-1]
    baseline = next((item for item in yearly if item["year"] == 2021), yearly[0])

    peak = {"year": latest["year"], "month": "", "arrivals": 0}
    for year_str, months in monthly_by_year.items():
        for month_data in months:
            if month_data["arrivals"] > peak["arrivals"]:
                peak = {
                    "year": int(year_str),
                    "month": month_data["month"],
                    "arrivals": month_data["arrivals"],
                }

    recovery_pct = 0.0
    if baseline["total_arrivals"] > 0:
        recovery_pct = ((latest["total_arrivals"] - baseline["total_arrivals"]) / baseline["total_arrivals"]) * 100

    return {
        "latest_year": latest["year"],
        "latest_total_arrivals": latest["total_arrivals"],
        "latest_total_millions": round(latest["total_arrivals"] / 1_000_000, 3),
        "peak_month": peak,
        "recovery_from_2021_pct": round(recovery_pct, 1),
        "available_years": [entry["year"] for entry in yearly],
    }


@app.route("/")
def home():
    return jsonify({"message": "Samha arrivals API is running"})


@app.route("/api/arrivals/insights", methods=["GET"])
def get_arrivals_insights():
    try:
        dataset = load_dataset()
        forecast_data = load_forecast_data()
        yearly = sorted(dataset["yearly_totals"], key=lambda item: item["year"])
        monthly_by_year = dataset["monthly_by_year"]
        yearly_forecasts = build_forecast_yearly_totals(forecast_data)

        response = {
            "yearly_totals": [
                {
                    "year": item["year"],
                    "total_arrivals": item["total_arrivals"],
                    "millions": round(item["total_arrivals"] / 1_000_000, 3),
                    "is_forecast": False,
                }
                for item in yearly
            ],
            "yearly_forecasts": yearly_forecasts,
            "monthly_by_year": monthly_by_year,
            "insights": calculate_insights(dataset),
        }
        return jsonify(response)
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.route("/api/arrivals/monthly", methods=["GET"])
def get_monthly_for_year():
    try:
        dataset = load_dataset()
        year = request.args.get("year")
        if not year:
            return jsonify({"error": "Query parameter 'year' is required"}), 400

        months = dataset["monthly_by_year"].get(str(year))
        if months is None:
            return jsonify({"error": f"No monthly data found for year {year}"}), 404

        return jsonify({"year": int(year), "monthly_data": months})
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.route("/api/arrivals/forecast/options", methods=["GET"])
def get_forecast_options():
    try:
        forecast_data = load_forecast_data()
        nationalities = sorted(forecast_data.keys())
        years = sorted(
            {
                int(year)
                for nationality in forecast_data.values()
                for year in nationality.keys()
            }
        )
        return jsonify({"nationalities": nationalities, "years": years})
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.route("/api/arrivals/forecast", methods=["GET"])
def get_forecast():
    try:
        forecast_data = load_forecast_data()
        nationality = request.args.get("nationality")
        year = request.args.get("year")

        if not nationality or not year:
            return jsonify({"error": "Query parameters 'nationality' and 'year' are required"}), 400

        country_data = forecast_data.get(nationality)
        if country_data is None:
            return jsonify({"error": f"No forecast data found for nationality '{nationality}'"}), 404

        forecast_rows = country_data.get(str(year))
        if forecast_rows is None:
            return jsonify({"error": f"No forecast data found for year '{year}'"}), 404

        total = sum(int(row.get("Forecast", 0)) for row in forecast_rows)
        peak_row = max(forecast_rows, key=lambda row: int(row.get("Forecast", 0)))

        return jsonify(
            {
                "nationality": nationality,
                "year": int(year),
                "model_used": "Prophet",
                "total_forecast": total,
                "peak_month": peak_row.get("Month", ""),
                "data": forecast_rows,
            }
        )
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True)
