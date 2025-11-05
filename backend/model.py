import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error, r2_score
import joblib

# Load dataset
df = pd.read_csv("backend/delay dataset.csv")

# --- Feature Engineering ---
# Extract time features
df["timestamp"] = pd.to_datetime(df["timestamp"])

df["hour"] = df["timestamp"].dt.hour
df["day_of_week"] = df["timestamp"].dt.dayofweek
df["month"] = df["timestamp"].dt.month

# Encode weather
le = LabelEncoder()
df["weather_encoded"] = le.fit_transform(df["weather"])

# Select features and target
X = df[[
    "avg_speed",
    "traffic_volume",
    "distance_km",
    "hour",
    "day_of_week",
    "month",
    "weather_encoded"
]]
y = df["Delay"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# --- Train Model ---
model = RandomForestRegressor(
    n_estimators=300,
    max_depth=12,
    random_state=42
)
model.fit(X_train, y_train)

# --- Evaluate ---
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Mean Absolute Error: {mae:.2f}")
print(f"R² Score: {r2:.3f}")

joblib.dump(model, "backend/model.pkl")
joblib.dump(le, "backend/weather_encoder.pkl")