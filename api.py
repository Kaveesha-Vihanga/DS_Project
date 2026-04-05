from fastapi import FastAPI, HTTPException
import pandas as pd
import os
import joblib

# -----------------------------
# Initialize FastAPI
# -----------------------------
app = FastAPI(title="Tourism Demand API")

# -----------------------------
# Paths
# -----------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FUTURE_PATH = os.path.join(BASE_DIR, "data/future_predictions.csv")
SUMMARY_PATH = os.path.join(BASE_DIR, "data/regional_demand_summary.csv")
GWR_PATH = os.path.join(BASE_DIR, "models/gwr_model.joblib")

# -----------------------------
# Load CSVs and GWR model
# -----------------------------
try:
    future_df = pd.read_csv(FUTURE_PATH)
    summary_df = pd.read_csv(SUMMARY_PATH)
    gwr_model = joblib.load(GWR_PATH)
except Exception as e:
    print("Error loading files:", e)
    raise RuntimeError("Make sure all CSV and model files are in correct folders")

# -----------------------------
# Root endpoint
# -----------------------------
@app.get("/")
def home():
    return {"message": "Tourism Demand Backend Running Successfully 🚀"}

# -----------------------------
# 1. Regional Demand Summary
# -----------------------------
@app.get("/demand-summary")
def get_summary():
    return summary_df.to_dict(orient="records")

# -----------------------------
# 2. Future Predictions
# -----------------------------
@app.get("/future-demand")
def get_future_demand():
    return future_df.to_dict(orient="records")

# -----------------------------
# 3. Predict Demand (from future_predictions.csv)
# -----------------------------
@app.get("/predict")
def predict(district: str, year: int):
    district = district.strip().title()
    
    df = future_df[(future_df["district"] == district) & (future_df["year"] == year)]
    if df.empty:
        raise HTTPException(status_code=404, detail="No prediction found for this district/year")
    
    return {
        "district": district,
        "year": year,
        "predicted_tourism_demand": float(df["predicted_tourism"].values[0])
    }

# -----------------------------
# 4. GWR Model Metrics
# -----------------------------
@app.get("/gwr-metrics")
def gwr_metrics():
    return {
        "R2": float(gwr_model.R2),
        "Adjusted_R2": float(gwr_model.adj_R2),
        "AIC": float(gwr_model.aic),
        "AICc": float(gwr_model.aicc)
    }

# -----------------------------
# 5. Health Check
# -----------------------------
@app.get("/health")
def health():
    return {"status": "OK"}