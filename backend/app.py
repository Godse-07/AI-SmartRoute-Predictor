# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# import requests
# import joblib
# from datetime import datetime

# app = Flask(__name__)
# CORS(app, origins=["http://localhost:5173"], supports_credentials=True)

# # Load model and encoder
# model = joblib.load("backend/model.pkl")
# weather_encoder = joblib.load("backend/weather_encoder.pkl")

# ORS_API_KEY="APIKEY1"
# WEATHER_API_KEY = "APIKEY2"

# def geocode_location(place_name):
#     url = "https://api.openrouteservice.org/geocode/search"
#     params = {
#         "api_key": ORS_API_KEY,
#         "text": place_name,
#         "size": 1
#     }
#     response = requests.get(url, params=params, timeout=30)
#     response.raise_for_status()
#     data = response.json()
#     coords = data["features"][0]["geometry"]["coordinates"]
#     return coords

# @app.route("/predict", methods=["POST"])
# def predict():
#     print("Received request:", request.json)
#     data = request.json
#     source = data["source"]
#     destination = data["destination"]
#     time_str = data["time"]

#     # Convert time
#     dt = datetime.strptime(time_str, "%H:%M")
#     hour = dt.hour
#     day_of_week = datetime.today().weekday()
#     month = datetime.today().month

#     # Geocode source and destination
#     src_coords = geocode_location(source)
#     dest_coords = geocode_location(destination)

#     if not src_coords or not dest_coords:
#         return jsonify({"error": "Invalid source or destination"}), 400

#     # Get route from ORS
#     ors_url = "https://api.openrouteservice.org/v2/directions/driving-car"
#     headers = {"Authorization": ORS_API_KEY}
#     params = {
#         "start": f"{src_coords[0]},{src_coords[1]}",
#         "end": f"{dest_coords[0]},{dest_coords[1]}"
#     }
#     response = requests.get(ors_url, headers=headers, params=params)
#     route_data = response.json()
#     summary = route_data["features"][0]["properties"]["summary"]
#     distance_km = summary["distance"] / 1000
#     duration_sec = summary["duration"]
#     duration_min = round(summary["duration"] / 60, 1)
#     avg_speed = distance_km / (duration_sec / 3600)

#     # Get weather
#     weather_url = f"https://api.weatherapi.com/v1/current.json?key={WEATHER_API_KEY}&q={src_coords[1]},{src_coords[0]}&aqi=no"
#     weather_data = requests.get(weather_url).json()
#     weather_map = {
#     "Sunny": "Clear",
#     "Clear": "Clear",
#     "Partly cloudy": "Cloudy",
#     "Cloudy": "Cloudy",
#     "Overcast": "Cloudy",
#     "Mist": "Fog",
#     "Fog": "Fog",
#     "Haze": "Cloudy",
#     "Snow": "Fog",
#     "Patchy rain possible": "Rain",
#     "Light rain": "Rain",
#     "Moderate rain": "Rain",
#     "Heavy rain": "Rain",
#     "Showers": "Rain",
#     "Rain": "Rain",
#     "Thunderstorm": "Rain"
#     }
#     weatherdummy = weather_data["current"]["condition"]["text"]
#     weather = weather_map.get(weatherdummy, "Clear")
#     weather_encoded = int(weather_encoder.transform([weather])[0])
#     temperature = weather_data["current"]["temp_c"]
#     visibility = weather_data["current"]["vis_km"]

#     # Estimate traffic volume (mocked)
#     traffic_volume = 1000 if 7 <= hour <= 10 or 17 <= hour <= 20 else 500

#     # Predict
#     features = pd.DataFrame([{
#         "avg_speed": avg_speed,
#         "traffic_volume": traffic_volume,
#         "distance_km": distance_km,
#         "hour": hour,
#         "day_of_week": day_of_week,
#         "month": month,
#         "weather_encoded": weather_encoded
#     }])
    
#     delay = model.predict(features)[0]

#     return jsonify({
#         "delay": round(delay, 2),
#         "weather": weather,
#         "temperature": temperature,
#         "visibility": visibility,
#         "route": f"{source} → {destination}",
#         "geojson": route_data["features"][0]["geometry"],
#         "distance": distance_km,
#         "duration": duration_min
#     })

# if __name__ == "__main__":

#     app.run(debug=True)




from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import requests
import joblib
from datetime import datetime
import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"], supports_credentials=True)

# Load model and encoder with proper path handling
try:
    # Try loading from backend folder first
    model = joblib.load("backend/model.pkl")
    weather_encoder = joblib.load("backend/weather_encoder.pkl")
    print("✓ Loaded models from backend/ folder")
except FileNotFoundError:
    try:
        # Try loading from current directory
        model = joblib.load("model.pkl")
        weather_encoder = joblib.load("weather_encoder.pkl")
        print("✓ Loaded models from current directory")
    except FileNotFoundError:
        print("ERROR: model.pkl and weather_encoder.pkl not found!")
        print("Please ensure these files exist in either:")
        print("  - backend/ folder, OR")
        print("  - current directory")
        exit(1)

ORS_API_KEY = "YOUR_OPENROUTESERVICE_API_KEY"  # Replace with your actual key
WEATHER_API_KEY = "YOUR_WEATHERAPI_KEY"  # Replace with your actual key

def geocode_location(place_name):
    """Convert place name to coordinates"""
    url = "https://api.openrouteservice.org/geocode/search"
    params = {
        "api_key": ORS_API_KEY,
        "text": place_name,
        "size": 1
    }
    try:
        response = requests.get(url, params=params, timeout=30)
        response.raise_for_status()
        data = response.json()
        coords = data["features"][0]["geometry"]["coordinates"]
        return coords
    except Exception as e:
        print(f"Geocoding error: {e}")
        return None

@app.route("/", methods=["GET"])
def home():
    """Health check endpoint"""
    return jsonify({
        "status": "running",
        "message": "Route Delay Prediction API is active"
    })

@app.route("/predict", methods=["POST"])
def predict():
    try:
        print("Received request:", request.json)
        data = request.json
        source = data["source"]
        destination = data["destination"]
        time_str = data["time"]

        # Convert time
        dt = datetime.strptime(time_str, "%H:%M")
        hour = dt.hour
        day_of_week = datetime.today().weekday()
        month = datetime.today().month

        # Geocode source and destination
        src_coords = geocode_location(source)
        dest_coords = geocode_location(destination)

        if not src_coords or not dest_coords:
            return jsonify({"error": "Invalid source or destination"}), 400

        # Get route from ORS
        ors_url = "https://api.openrouteservice.org/v2/directions/driving-car"
        headers = {"Authorization": ORS_API_KEY}
        params = {
            "start": f"{src_coords[0]},{src_coords[1]}",
            "end": f"{dest_coords[0]},{dest_coords[1]}"
        }
        response = requests.get(ors_url, headers=headers, params=params, timeout=30)
        response.raise_for_status()
        route_data = response.json()

        summary = route_data["features"][0]["properties"]["summary"]
        distance_km = summary["distance"] / 1000
        duration_sec = summary["duration"]
        duration_min = round(summary["duration"] / 60, 1)
        avg_speed = distance_km / (duration_sec / 3600) if duration_sec > 0 else 0

        # Get weather
        weather_url = f"https://api.weatherapi.com/v1/current.json?key={WEATHER_API_KEY}&q={src_coords[1]},{src_coords[0]}&aqi=no"
        weather_response = requests.get(weather_url, timeout=30)
        weather_response.raise_for_status()
        weather_data = weather_response.json()

        weather_map = {
            "Sunny": "Clear",
            "Clear": "Clear",
            "Partly cloudy": "Cloudy",
            "Cloudy": "Cloudy",
            "Overcast": "Cloudy",
            "Mist": "Fog",
            "Fog": "Fog",
            "Haze": "Cloudy",
            "Snow": "Fog",
            "Patchy rain possible": "Rain",
            "Light rain": "Rain",
            "Moderate rain": "Rain",
            "Heavy rain": "Rain",
            "Showers": "Rain",
            "Rain": "Rain",
            "Thunderstorm": "Rain"
        }
        
        weatherdummy = weather_data["current"]["condition"]["text"]
        weather = weather_map.get(weatherdummy, "Clear")
        weather_encoded = int(weather_encoder.transform([weather])[0])
        temperature = weather_data["current"]["temp_c"]
        visibility = weather_data["current"]["vis_km"]

        # Estimate traffic volume
        traffic_volume = 1000 if 7 <= hour <= 10 or 17 <= hour <= 20 else 500

        # Predict
        features = pd.DataFrame([{
            "avg_speed": avg_speed,
            "traffic_volume": traffic_volume,
            "distance_km": distance_km,
            "hour": hour,
            "day_of_week": day_of_week,
            "month": month,
            "weather_encoded": weather_encoded
        }])
        
        delay = model.predict(features)[0]

        return jsonify({
            "delay": round(delay, 2),
            "weather": weather,
            "temperature": temperature,
            "visibility": visibility,
            "route": f"{source} → {destination}",
            "geojson": route_data["features"][0]["geometry"],
            "distance": round(distance_km, 2),
            "duration": duration_min
        })

    except Exception as e:
        print(f"Error in predict endpoint: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("\n" + "="*50)
    print("🚀 Starting Flask Server on http://localhost:5000")
    print("="*50 + "\n")
    app.run(debug=True, port=5000, host='0.0.0.0')
    
  
  
  
  
  
  
    