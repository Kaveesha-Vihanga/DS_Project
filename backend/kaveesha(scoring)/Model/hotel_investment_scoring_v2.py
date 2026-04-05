import numpy as np
import pandas as pd
import skfuzzy as fuzz
from skfuzzy import control as ctrl
import json
import os
from datetime import datetime

OUTPUT_FILE = "backend/data/investment_results.json"

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
    # use values from input_data
    area = input_data.get("area")
    budget = input_data.get("budget")
    star_rating = input_data.get("star_rating")
    rooms = input_data.get("rooms")

    # call your existing fuzzy / topsis / scoring logic here
    # replace the example below with your real logic
    result = {
        "area": area,
        "budget": budget,
        "star_rating": star_rating,
        "rooms": rooms,
        "score": 82.5,
        "recommendation": "Good investment"
    }

    return result
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