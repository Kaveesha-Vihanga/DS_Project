from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from datetime import datetime

from Model.hotel_investment_scoring_v2 import run_model

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "data", "results.json")


def save_result(result):
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)

    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            try:
                data = json.load(f)
            except:
                data = []
    else:
        data = []

    result_with_time = {
        "timestamp": datetime.now().isoformat(),
        "result": result
    }

    data.append(result_with_time)

    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)


@app.route("/")
def home():
    return jsonify({"message": "API is running"})


@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        input_data = request.get_json()

        if not input_data:
            return jsonify({"error": "No input data provided"}), 400

        result = run_model(input_data)
        save_result(result)

        return jsonify({
            "success": True,
            "data": result
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@app.route("/api/results", methods=["GET"])
def get_results():
    if not os.path.exists(DATA_FILE):
        return jsonify([])

    with open(DATA_FILE, "r", encoding="utf-8") as f:
        try:
            data = json.load(f)
        except:
            data = []

    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)