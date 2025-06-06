import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "0b3c5528ea2811c20208846f310ae467";

  const getWeather = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
      setError("");
    } catch (err) {
      setWeather(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundClass = () => {
    if (!weather) return "default";

    const main = weather.weather[0].main.toLowerCase();
    if (main.includes("cloud")) return "cloudy";
    if (main.includes("rain")) return "rainy";
    if (main.includes("clear")) return "sunny";
    if (main.includes("snow")) return "snowy";
    return "default";
  };

  return (
    <div className={`app ${getBackgroundClass()}`}>
      <div className="weather-card">
        <h1 className="title">🌤️ Weather App</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Enter city name (e.g., Delhi or Delhi,IN)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={getWeather}>Get Weather</button>
        </div>

        {loading && <div className="loader"></div>}

        {error && !loading && <p className="error">{error}</p>}

        {weather && !loading && (
          <div className="weather-info">
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              className="weather-icon"
            />
            <p>🌡️ Temperature: {weather.main.temp}°C</p>
            <p>🌥️ Condition: {weather.weather[0].main}</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>💨 Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
