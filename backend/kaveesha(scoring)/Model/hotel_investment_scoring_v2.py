import numpy as np
import pandas as pd
import skfuzzy as fuzz
from skfuzzy import control as ctrl
import json
import os
from datetime import datetime
import re

OUTPUT_FILE = "backend/data/investment_results.json"
METHMI_DATA_FILE = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
    "methmi(facility)",
    "json.json",
)


def _clamp(value, minimum=0.0, maximum=100.0):
    return max(minimum, min(maximum, float(value)))


def _sanitize_js_object(raw_text):
    clean = re.sub(r"^\s*const\s+\w+\s*=\s*", "", raw_text)
    clean = re.sub(r";\s*$", "", clean.strip(), flags=re.MULTILINE)
    clean = re.sub(r"//.*", "", clean)
    clean = re.sub(r'([{\[,]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:', r'\1"\2":', clean)
    return clean


def _load_methmi_area_data():
    if not os.path.exists(METHMI_DATA_FILE):
        return []
    with open(METHMI_DATA_FILE, "r", encoding="utf-8") as f:
        raw = f.read()
    sanitized = _sanitize_js_object(raw)
    return json.loads(sanitized)


def _get_area_facility_coverage(area):
    area_data = _load_methmi_area_data()
    selected = next((item for item in area_data if item.get("area") == area), None)
    if not selected or "facilities" not in selected:
        return {}
    return {k.lower(): float(v) for k, v in selected["facilities"].items()}

# ─────────────────────────────────────────
# FUZZY LOGIC SETUP
# ─────────────────────────────────────────

def setup_fuzzy_system():
    # Input variables
    budget = ctrl.Antecedent(np.arange(0, 101, 1), 'budget')
    location = ctrl.Antecedent(np.arange(0, 101, 1), 'location')
    demand = ctrl.Antecedent(np.arange(0, 101, 1), 'demand')
    competition = ctrl.Antecedent(np.arange(0, 101, 1), 'competition')
    facilities = ctrl.Antecedent(np.arange(0, 101, 1), 'facilities')

    # Output variable
    investment_score = ctrl.Consequent(np.arange(0, 101, 1), 'investment_score')

    # Membership functions - Budget
    budget['low']    = fuzz.trimf(budget.universe,    [0, 0, 40])
    budget['medium'] = fuzz.trimf(budget.universe,    [20, 50, 80])
    budget['high']   = fuzz.trimf(budget.universe,    [60, 100, 100])

    # Membership functions - Location
    location['poor'] = fuzz.trimf(location.universe,  [0, 0, 40])
    location['fair'] = fuzz.trimf(location.universe,  [20, 50, 80])
    location['good'] = fuzz.trimf(location.universe,  [60, 100, 100])

    # Membership functions - Demand
    demand['low']    = fuzz.trimf(demand.universe,    [0, 0, 40])
    demand['medium'] = fuzz.trimf(demand.universe,    [20, 50, 80])
    demand['high']   = fuzz.trimf(demand.universe,    [60, 100, 100])

    # Membership functions - Competition
    competition['low']    = fuzz.trimf(competition.universe, [0, 0, 40])
    competition['medium'] = fuzz.trimf(competition.universe, [20, 50, 80])
    competition['high']   = fuzz.trimf(competition.universe, [60, 100, 100])

    # Membership functions - Facilities
    facilities['poor'] = fuzz.trimf(facilities.universe, [0, 0, 40])
    facilities['fair'] = fuzz.trimf(facilities.universe, [20, 50, 80])
    facilities['good'] = fuzz.trimf(facilities.universe, [60, 100, 100])

    # Membership functions - Output
    investment_score['very_low']  = fuzz.trimf(investment_score.universe, [0, 0, 25])
    investment_score['low']       = fuzz.trimf(investment_score.universe, [10, 30, 50])
    investment_score['medium']    = fuzz.trimf(investment_score.universe, [35, 55, 70])
    investment_score['high']      = fuzz.trimf(investment_score.universe, [60, 75, 90])
    investment_score['very_high'] = fuzz.trimf(investment_score.universe, [80, 100, 100])

    # Fuzzy Rules
    rules = [
        ctrl.Rule(budget['high'] & location['good'] & demand['high'],   investment_score['very_high']),
        ctrl.Rule(budget['high'] & location['good'] & demand['medium'],  investment_score['high']),
        ctrl.Rule(budget['high'] & location['fair'] & demand['high'],    investment_score['high']),
        ctrl.Rule(budget['medium'] & location['good'] & demand['high'],  investment_score['high']),
        ctrl.Rule(budget['medium'] & location['fair'] & demand['medium'],investment_score['medium']),
        ctrl.Rule(budget['low'] & location['poor'] & demand['low'],      investment_score['very_low']),
        ctrl.Rule(budget['low'] & location['fair'] & demand['low'],      investment_score['low']),
        ctrl.Rule(budget['medium'] & location['poor'] & demand['low'],   investment_score['low']),
        ctrl.Rule(competition['high'] & demand['low'],                   investment_score['low']),
        ctrl.Rule(competition['low'] & demand['high'],                   investment_score['high']),
        ctrl.Rule(facilities['good'] & location['good'],                 investment_score['high']),
        ctrl.Rule(facilities['poor'] & location['poor'],                 investment_score['very_low']),
        ctrl.Rule(budget['high'] & competition['low'],                   investment_score['very_high']),
        ctrl.Rule(budget['low'] & competition['high'],                   investment_score['very_low']),
        ctrl.Rule(demand['medium'] & facilities['fair'],                 investment_score['medium']),
    ]

    scoring_ctrl = ctrl.ControlSystem(rules)
    scoring_sim  = ctrl.ControlSystemSimulation(scoring_ctrl)

    return scoring_sim


# ─────────────────────────────────────────
# TOPSIS MULTI-CRITERIA RANKING
# ─────────────────────────────────────────

def run_topsis(criteria_matrix, weights, beneficial):
    """
    criteria_matrix : 2D list [alternatives x criteria]
    weights         : list of weights (must sum to 1)
    beneficial      : list of booleans (True = higher is better)
    Returns         : list of TOPSIS scores per alternative
    """
    matrix = np.array(criteria_matrix, dtype=float)

    # Step 1: Normalize
    norm = matrix / np.sqrt((matrix ** 2).sum(axis=0))

    # Step 2: Weighted normalized matrix
    weights = np.array(weights)
    weighted = norm * weights

    # Step 3: Ideal best and worst
    ideal_best  = np.where(beneficial, weighted.max(axis=0), weighted.min(axis=0))
    ideal_worst = np.where(beneficial, weighted.min(axis=0), weighted.max(axis=0))

    # Step 4: Euclidean distance
    dist_best  = np.sqrt(((weighted - ideal_best)  ** 2).sum(axis=1))
    dist_worst = np.sqrt(((weighted - ideal_worst) ** 2).sum(axis=1))

    # Step 5: TOPSIS score
    scores = dist_worst / (dist_best + dist_worst)
    return scores.tolist()

def run_model(input_data):
    area = input_data.get("area", "")
    budget = float(input_data.get("budget", 50))
    star_rating = int(input_data.get("star_rating", 3))
    rooms = int(input_data.get("rooms", 20))
    year = int(input_data.get("year", 2026))
    amenities = input_data.get("facilities", []) or []
    hotel_type = input_data.get("property_type", "Hotel")

    budget_score = _clamp((budget / 200.0) * 100.0)
    location_score = 84.0 if "colombo" in str(area).lower() else 68.0
    demand_score = _clamp(56.0 + ((year - 2025) * 2.0) + (star_rating * 4.0))

    area_facilities = _get_area_facility_coverage(area)
    if area_facilities:
        area_facility_avg = float(np.mean(list(area_facilities.values())))
    else:
        area_facility_avg = 62.0

    user_facility_ratio = (len(amenities) / 10.0) * 100.0
    facilities_score = _clamp((area_facility_avg * 0.7) + (user_facility_ratio * 0.3))
    competition_score = _clamp(100.0 - (area_facility_avg * 0.85))

    scoring_result = run_scoring(
        area=area,
        budget_score_input=budget_score,
        location_score_input=location_score,
        demand_score_input=demand_score,
        competition_score_input=competition_score,
        facilities_score_input=facilities_score,
        star_rating=star_rating,
        num_rooms=rooms,
        hotel_type=hotel_type,
        amenities=amenities,
    )

    final_score = float(scoring_result["scores"]["final_score"])
    drivers = {
        "future_demand_fit": round(_clamp(demand_score) / 100.0, 4),
        "price_fit_vs_median": round(1.0 - (abs(budget - 95.0) / 150.0), 4),
        "facility_completeness": round(_clamp(facilities_score) / 100.0, 4),
        "gap_alignment": round(_clamp(location_score - (competition_score * 0.3)) / 100.0, 4),
        "surplus_risk": round(_clamp(competition_score) / 100.0, 4),
        "area_median_price": 95,
    }
    drivers["price_fit_vs_median"] = float(_clamp(drivers["price_fit_vs_median"], 0.0, 1.0))

    return {
        "investment_score_0_100": round(final_score, 2),
        "score": round(final_score, 2),
        "recommendation": scoring_result["recommendation"],
        "risk_level": scoring_result["risk_level"],
        "drivers": drivers,
        "future_demand_pct": int(round(drivers["future_demand_fit"] * 100)),
        "expected_revenue_index": round((drivers["price_fit_vs_median"] + drivers["facility_completeness"]) / 2.0, 4),
        "regional_demand_pct": int(round(((location_score + demand_score) / 2.0))),
    }
# ─────────────────────────────────────────
# MAIN SCORING FUNCTION
# ─────────────────────────────────────────

def run_scoring(
    area,
    budget_score_input,
    location_score_input,
    demand_score_input,
    competition_score_input,
    facilities_score_input,
    star_rating,
    num_rooms,
    hotel_type,
    amenities=[]
):
    # ── Step 1: Fuzzy Scoring ──
    sim = setup_fuzzy_system()
    sim.input['budget']      = float(budget_score_input)
    sim.input['location']    = float(location_score_input)
    sim.input['demand']      = float(demand_score_input)
    sim.input['competition'] = float(competition_score_input)
    sim.input['facilities']  = float(facilities_score_input)
    sim.compute()
    fuzzy_score = sim.output['investment_score']

    # ── Step 2: TOPSIS Ranking ──
    # Single hotel vs ideal best/worst benchmarks
    criteria_matrix = [
        # [budget, location, demand, competition, facilities]
        [budget_score_input, location_score_input, demand_score_input, competition_score_input, facilities_score_input],
        [100, 100, 100, 0,   100],  # Ideal best
        [0,   0,   0,   100, 0  ],  # Ideal worst
    ]
    weights    = [0.25, 0.25, 0.20, 0.15, 0.15]
    beneficial = [True, True, True, False, True]
    topsis_scores = run_topsis(criteria_matrix, weights, beneficial)
    topsis_score  = round(topsis_scores[0] * 100, 2)

    # ── Step 3: Final Combined Score ──
    final_score = round((fuzzy_score * 0.6) + (topsis_score * 0.4), 2)

    # ── Step 4: Recommendation ──
    if final_score >= 80:
        recommendation = "Highly Recommended"
        risk_level     = "Low Risk"
    elif final_score >= 65:
        recommendation = "Recommended"
        risk_level     = "Moderate Risk"
    elif final_score >= 50:
        recommendation = "Neutral"
        risk_level     = "Moderate-High Risk"
    else:
        recommendation = "Not Recommended"
        risk_level     = "High Risk"

    # ── Step 5: Build Result ──
    result = {
        "timestamp": datetime.now().isoformat(),
        "inputs": {
            "area":                 area,
            "budget_score":         budget_score_input,
            "location_score":       location_score_input,
            "demand_score":         demand_score_input,
            "competition_score":    competition_score_input,
            "facilities_score":     facilities_score_input,
            "star_rating":          star_rating,
            "num_rooms":            num_rooms,
            "hotel_type":           hotel_type,
            "amenities":            amenities
        },
        "scores": {
            "fuzzy_score":  round(fuzzy_score, 2),
            "topsis_score": topsis_score,
            "final_score":  final_score
        },
        "recommendation": recommendation,
        "risk_level":      risk_level
    }

    # ── Step 6: Save to JSON (append mode) ──
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)

    if os.path.exists(OUTPUT_FILE):
        with open(OUTPUT_FILE, "r") as f:
            all_results = json.load(f)
    else:
        all_results = []

    all_results.append(result)

    with open(OUTPUT_FILE, "w") as f:
        json.dump(all_results, f, indent=2)

    return result