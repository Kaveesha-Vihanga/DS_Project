import pandas as pd
import numpy as np
import joblib
import os
import json
import warnings
warnings.filterwarnings('ignore')

df = pd.read_excel('monthlyarrivals_clean.xlsx')

country_map = {
    "USA": "United States",
    "United States": "United States",
    'United states': 'United States',
    'united states': 'United States',
    'UK': 'United Kingdom',
    'Russia': 'Russian Federation',
    'india': 'India',
    'china': 'China',
    'france': 'France',
    'spain': 'Spain',
    'ukraine': 'Ukraine',
    'canada': 'Canada',
    'others': 'Others',
    'Kazakhastan': 'Kazakhstan'
}

df['Nationality'] = df['Nationality'].replace(country_map)
df.columns = df.columns.str.strip()
df = df.replace(",", "", regex=True)
df["Arrivals"] = pd.to_numeric(df["Arrivals"])

month_map = {
    "January":1, "February":2, "March":3, "April":4,
    "May":5, "June":6, "July":7, "August":8,
    "September":9, "October":10, "November":11, "December":12
}

df["Month_Num"] = df["Month"].map(month_map)
df = df.sort_values(["Nationality", "Year", "Month_Num"]).reset_index(drop=True)
df["Date"] = pd.to_datetime(
    df["Year"].astype(str) + "-" + df["Month_Num"].astype(str) + "-01"
)

df['COVID_Dummy'] = 0
df.loc[
    (df['Date'] >= '2020-03-01') & (df['Date'] <= '2021-12-01'),
    'COVID_Dummy'
] = 1

from sklearn.metrics import mean_squared_error

def rmse(actual, predicted):
    return np.sqrt(mean_squared_error(actual, predicted))

def mape(actual, predicted):
    actual, predicted = np.array(actual), np.array(predicted)
    mask = actual != 0
    return np.mean(np.abs((actual[mask] - predicted[mask]) / actual[mask])) * 100

from statsmodels.tsa.statespace.sarimax import SARIMAX

sarima_results = []
sarima_forecasts = {}

for nat in df['Nationality'].unique():
    series = df[df['Nationality'] == nat].set_index('Date')['Arrivals']
    if len(series) < 36:
        continue
    train = series[:-12]
    test  = series[-12:]
    model = SARIMAX(
        train,
        order=(1, 1, 1),
        seasonal_order=(1, 1, 1, 12),
        enforce_stationarity=False,
        enforce_invertibility=False
    ).fit(disp=False)
    pred = model.forecast(12).clip(lower=0)
    sarima_results.append({
        'Nationality': nat,
        'SARIMA_RMSE': rmse(test, pred),
        'SARIMA_MAPE': mape(test, pred)
    })
    sarima_forecasts[nat] = pred

sarima_df = pd.DataFrame(sarima_results)
print(sarima_df.sort_values('SARIMA_MAPE'))

sarimax_results = []
sarimax_forecasts = {}

for nat in df['Nationality'].unique():
    temp  = df[df['Nationality'] == nat].set_index('Date')
    y     = temp['Arrivals']
    exog  = temp[['COVID_Dummy']]
    if len(y) < 36:
        continue
    y_train    = y[:-12]
    y_test     = y[-12:]
    exog_train = exog[:-12]
    exog_test  = exog[-12:]
    model = SARIMAX(
        y_train,
        exog=exog_train,
        order=(1, 1, 1),
        seasonal_order=(1, 1, 1, 12),
        enforce_stationarity=False,
        enforce_invertibility=False
    ).fit(disp=False)
    pred = model.forecast(12, exog=exog_test).clip(lower=0)
    sarimax_results.append({
        'Nationality': nat,
        'SARIMAX_RMSE': rmse(y_test, pred),
        'SARIMAX_MAPE': mape(y_test, pred),
        'COVID_Coefficient': round(model.params['COVID_Dummy'], 2)
    })
    sarimax_forecasts[nat] = {'model': model, 'pred': pred}

sarimax_df = pd.DataFrame(sarimax_results)
print(sarimax_df.sort_values('SARIMAX_MAPE'))

from prophet import Prophet

prophet_results = []
prophet_forecasts = {}

for nat in df['Nationality'].unique():
    temp = df[df['Nationality'] == nat][['Date', 'Arrivals', 'COVID_Dummy']].copy()
    temp = temp.rename(columns={'Date': 'ds', 'Arrivals': 'y'})
    if len(temp) < 36:
        continue
    train = temp[:-12].copy()
    test  = temp[-12:].copy()
    model = Prophet(
        yearly_seasonality=True,
        weekly_seasonality=False,
        daily_seasonality=False,
        seasonality_mode='multiplicative'
    )
    model.add_regressor('COVID_Dummy')
    model.fit(train)
    future = model.make_future_dataframe(periods=12, freq='MS')
    future = future.merge(temp[['ds', 'COVID_Dummy']], on='ds', how='left')
    future['COVID_Dummy'] = future['COVID_Dummy'].fillna(0)
    forecast = model.predict(future)
    pred = forecast['yhat'][-12:].values.clip(min=0)
    prophet_results.append({
        'Nationality': nat,
        'Prophet_RMSE': rmse(test['y'].values, pred),
        'Prophet_MAPE': mape(test['y'].values, pred)
    })
    prophet_forecasts[nat] = {'model': model, 'pred': pred}

prophet_df = pd.DataFrame(prophet_results)
print(prophet_df.sort_values('Prophet_MAPE'))

from xgboost import XGBRegressor

def make_lag_features(sub_df):
    s = sub_df.copy().sort_values('Date').reset_index(drop=True)
    s['lag_1']  = s['Arrivals'].shift(1)
    s['lag_2']  = s['Arrivals'].shift(2)
    s['lag_3']  = s['Arrivals'].shift(3)
    s['lag_12'] = s['Arrivals'].shift(12)
    s['lag_24'] = s['Arrivals'].shift(24)
    s['roll_3'] = s['Arrivals'].shift(1).rolling(3).mean()
    s['roll_6'] = s['Arrivals'].shift(1).rolling(6).mean()
    s['roll_12']= s['Arrivals'].shift(1).rolling(12).mean()
    for m in range(1, 13):
        s[f'month_{m}'] = (s['Month_Num'] == m).astype(int)
    s['COVID_Dummy'] = sub_df['COVID_Dummy'].values
    s['year'] = s['Year']
    return s

feature_cols = (
    ['lag_1','lag_2','lag_3','lag_12','lag_24',
     'roll_3','roll_6','roll_12','COVID_Dummy','year']
    + [f'month_{m}' for m in range(1, 13)]
)

xgb_results = []
xgb_forecasts = {}
xgb_models = {}

for nat in df['Nationality'].unique():
    sub = df[df['Nationality'] == nat].copy()
    if len(sub) < 36:
        continue
    sub = make_lag_features(sub)
    sub = sub.dropna(subset=feature_cols).reset_index(drop=True)
    train = sub[sub['Year'] < 2024]
    test  = sub[sub['Year'] == 2024]
    if len(train) < 20 or len(test) == 0:
        continue
    model = XGBRegressor(
        n_estimators=200,
        max_depth=4,
        learning_rate=0.05,
        random_state=42,
        verbosity=0
    )
    model.fit(train[feature_cols], train['Arrivals'])
    pred = model.predict(test[feature_cols]).clip(min=0)
    xgb_results.append({
        'Nationality': nat,
        'XGB_RMSE': rmse(test['Arrivals'].values, pred),
        'XGB_MAPE': mape(test['Arrivals'].values, pred)
    })
    xgb_forecasts[nat] = pred
    xgb_models[nat] = model

xgb_df = pd.DataFrame(xgb_results)
print(xgb_df.sort_values('XGB_MAPE'))

final_df = (
    sarima_df
    .merge(sarimax_df[['Nationality','SARIMAX_RMSE','SARIMAX_MAPE','COVID_Coefficient']], on='Nationality', how='left')
    .merge(prophet_df[['Nationality','Prophet_RMSE','Prophet_MAPE']], on='Nationality', how='left')
    .merge(xgb_df[['Nationality','XGB_RMSE','XGB_MAPE']], on='Nationality', how='left')
)

mape_cols = {
    'SARIMA':   'SARIMA_MAPE',
    'SARIMAX':  'SARIMAX_MAPE',
    'Prophet':  'Prophet_MAPE',
    'XGBoost':  'XGB_MAPE'
}

def get_best_model(row):
    scores = {name: row[col] for name, col in mape_cols.items() if pd.notna(row[col])}
    return min(scores, key=scores.get)

def get_best_mape(row):
    scores = {name: row[col] for name, col in mape_cols.items() if pd.notna(row[col])}
    return round(min(scores.values()), 2)

final_df['Best_Model'] = final_df.apply(get_best_model, axis=1)
final_df['Best_MAPE']  = final_df.apply(get_best_mape, axis=1)

for col in ['SARIMA_MAPE','SARIMAX_MAPE','Prophet_MAPE','XGB_MAPE']:
    final_df[col] = final_df[col].round(2)

print("=" * 70)
print("MODEL COMPARISON — MAPE % (lower = better)")
print("=" * 70)
display_cols = ['Nationality','SARIMA_MAPE','SARIMAX_MAPE',
                'Prophet_MAPE','XGB_MAPE','Best_Model','Best_MAPE']
print(final_df[display_cols].to_string(index=False))

print("\nAVERAGE MAPE PER MODEL:")
for name, col in mape_cols.items():
    print(f"  {name:<20}: {final_df[col].mean():.2f}%")

non_covid = df[~df['Year'].isin([2020, 2021])]
months_order = ['January','February','March','April','May','June',
                'July','August','September','October','November','December']

print("PEAK MONTH PER NATIONALITY")
print("-" * 50)

seasonality_results = {}

for nat in sorted(df['Nationality'].unique()):
    nat_data   = non_covid[non_covid['Nationality'] == nat]
    monthly_avg = nat_data.groupby('Month')['Arrivals'].mean().reindex(months_order)
    peak_month  = monthly_avg.idxmax()
    low_month   = monthly_avg.idxmin()
    peak_val    = int(monthly_avg.max())
    low_val     = int(monthly_avg.min())
    seasonality_index = (monthly_avg / monthly_avg.mean() * 100).round(1)
    seasonality_results[nat] = {
        'peak_month': peak_month,
        'low_month': low_month,
        'monthly_avg': monthly_avg,
        'seasonality_index': seasonality_index
    }
    print(f"{nat:<25} Peak: {peak_month:<12} ({peak_val:>7,})  |  Low: {low_month:<12} ({low_val:>7,})")


def forecast_for_year(nationality, target_year):
    last_data_year = int(df['Year'].max())
    months_ahead   = (target_year - last_data_year) * 12

    if months_ahead <= 0:
        print(f"Target year must be after {last_data_year}")
        return None

    if nationality not in final_df['Nationality'].values:
        print(f"{nationality} not in model results")
        return None

    best_model = final_df[final_df['Nationality'] == nationality]['Best_Model'].values[0]
    print(f"Using {best_model} for {nationality} → {months_ahead} months ahead to {target_year}")

    series = df[df['Nationality'] == nationality].set_index('Date')['Arrivals']

    if best_model == 'Prophet':
        temp = df[df['Nationality'] == nationality][['Date','Arrivals','COVID_Dummy']].copy()
        temp = temp.rename(columns={'Date':'ds','Arrivals':'y'})
        full_model = Prophet(
            yearly_seasonality=True,
            weekly_seasonality=False,
            daily_seasonality=False,
            seasonality_mode='multiplicative'
        )
        full_model.add_regressor('COVID_Dummy')
        full_model.fit(temp)
        future = full_model.make_future_dataframe(periods=months_ahead, freq='MS')
        future['COVID_Dummy'] = 0
        fc = full_model.predict(future)
        forecast_vals = fc['yhat'][-months_ahead:].clip(lower=0).values
        lower = fc['yhat_lower'][-months_ahead:].clip(lower=0).values
        upper = fc['yhat_upper'][-months_ahead:].values

    elif best_model in ['SARIMA', 'SARIMAX']:
        series_with_freq = series.copy()
        series_with_freq.index = pd.DatetimeIndex(series_with_freq.index, freq='MS')

        future_index = pd.date_range(
            start=series_with_freq.index[-1] + pd.DateOffset(months=1),
            periods=months_ahead, freq='MS'
        )
        future_exog = pd.DataFrame({'COVID_Dummy': [0] * months_ahead}, index=future_index)

        if best_model == 'SARIMAX':
            exog_full = df[df['Nationality'] == nationality].set_index('Date')[['COVID_Dummy']]
            exog_full.index = pd.DatetimeIndex(exog_full.index, freq='MS')
            fitted_model = SARIMAX(
                series_with_freq,
                exog=exog_full,
                order=(1,1,1),
                seasonal_order=(1,1,1,12),
                enforce_stationarity=False,
                enforce_invertibility=False
            ).fit(disp=False)
            forecast_vals = fitted_model.forecast(months_ahead, exog=future_exog).clip(lower=0).values
        else:
            fitted_model = SARIMAX(
                series_with_freq,
                order=(1,1,1),
                seasonal_order=(1,1,1,12),
                enforce_stationarity=False,
                enforce_invertibility=False
            ).fit(disp=False)
            forecast_vals = fitted_model.forecast(months_ahead).clip(lower=0).values

        lower = forecast_vals * 0.85
        upper = forecast_vals * 1.15

    else:  # XGBoost
        history = df[df['Nationality'] == nationality].copy()
        history = make_lag_features(history).dropna(subset=feature_cols)
        model   = xgb_models[nationality]
        hist_arrivals = history['Arrivals'].tolist()
        forecast_vals = []
        last_year, last_month = last_data_year, 12

        for i in range(months_ahead):
            next_month = (last_month % 12) + 1
            next_year  = last_year + (1 if next_month == 1 else 0)
            last_month = next_month
            last_year  = next_year
            lag1  = hist_arrivals[-1]  if len(hist_arrivals) >= 1  else 0
            lag2  = hist_arrivals[-2]  if len(hist_arrivals) >= 2  else 0
            lag3  = hist_arrivals[-3]  if len(hist_arrivals) >= 3  else 0
            lag12 = hist_arrivals[-12] if len(hist_arrivals) >= 12 else 0
            lag24 = hist_arrivals[-24] if len(hist_arrivals) >= 24 else 0
            r3    = np.mean(hist_arrivals[-3:])
            r6    = np.mean(hist_arrivals[-6:])
            r12   = np.mean(hist_arrivals[-12:])
            row   = ([lag1,lag2,lag3,lag12,lag24,r3,r6,r12,0,next_year]
                     + [1 if m == next_month else 0 for m in range(1,13)])
            pred_val = max(0, model.predict(np.array(row).reshape(1,-1))[0])
            forecast_vals.append(pred_val)
            hist_arrivals.append(pred_val)

        forecast_vals = np.array(forecast_vals)
        lower = forecast_vals * 0.85
        upper = forecast_vals * 1.15

    future_dates = pd.date_range(
        start=pd.Timestamp(f'{last_data_year+1}-01-01'),
        periods=months_ahead, freq='MS'
    )
    result_df = pd.DataFrame({
        'Date':        future_dates,
        'Year':        future_dates.year,
        'Month':       future_dates.strftime('%B'),
        'Nationality': nationality,
        'Forecast':    forecast_vals.astype(int),
        'Lower_CI':    lower.astype(int),
        'Upper_CI':    upper.astype(int),
        'Model_Used':  best_model
    })
    return result_df[result_df['Year'] == target_year]


def get_forecast(nationality, year):
    result = forecast_for_year(nationality, year)
    if result is None:
        return []
    return result[['Month','Forecast','Lower_CI','Upper_CI']].to_dict(orient='records')


# ── Save models ──────────────────────────────────────────────────────
try:
    os.makedirs('saved_models', exist_ok=True)
    joblib.dump(sarima_forecasts,    'saved_models/sarima_forecasts.pkl')
    joblib.dump(sarimax_forecasts,   'saved_models/sarimax_forecasts.pkl')
    joblib.dump(prophet_forecasts,   'saved_models/prophet_forecasts.pkl')
    joblib.dump(xgb_models,          'saved_models/xgb_models.pkl')
    joblib.dump(xgb_forecasts,       'saved_models/xgb_forecasts.pkl')
    final_df.to_csv('saved_models/final_df.csv', index=False)
    joblib.dump(seasonality_results, 'saved_models/seasonality_results.pkl')
    print("All models saved successfully.")
except Exception as e:
    print(f"ERROR saving models: {e}")


# ── Pre-generate all forecasts and save as JSON ───────────────────────
print("Generating all forecasts...")

all_forecasts = {}
nationalities = final_df['Nationality'].tolist()
years = [2026, 2027, 2028, 2029, 2030]

for nat in nationalities:
    all_forecasts[nat] = {}
    for year in years:
        try:
            result = forecast_for_year(nat, year)
            if result is not None:
                all_forecasts[nat][str(year)] = result[['Month','Forecast','Lower_CI','Upper_CI']].to_dict(orient='records')
                print(f"   {nat} {year}")
            else:
                print(f"   {nat} {year} — returned None")
        except Exception as e:
            print(f"  ✗ {nat} {year} — ERROR: {e}")

with open('saved_models/forecasts.json', 'w') as f:
    json.dump(all_forecasts, f, indent=2)

print("All forecasts saved to forecasts.json")

if __name__ == "__main__":
    print("Model training complete.")