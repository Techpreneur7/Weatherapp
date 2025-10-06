import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKeys from "./apiKeys";
import ReactAnimatedWeather from "react-animated-weather";

function Forcast(props) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});
  const [suggestions, setSuggestions] = useState([]);

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  // Search weather for a city
  const search = (city) => {
    axios
      .get(
        `${apiKeys.base}weather?q=${city || query}&units=metric&APPID=${apiKeys.key}`
      )
      .then((response) => {
        setWeather(response.data);
        setQuery("");
        setSuggestions([]);
      })
      .catch((err) => {
        console.error(err);
        setWeather({});
        setError({ message: "Not Found", query: city || query });
      });
  };

  // Fetch city suggestions
  const fetchSuggestions = async (searchText) => {
    if (searchText.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchText}&limit=5&appid=${apiKeys.key}`
      );
      setSuggestions(res.data);
    } catch (err) {
      console.error("Error fetching city suggestions:", err);
      setSuggestions([]);
    }
  };

  // Input change handler
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  // Click suggestion handler
  const handleSuggestionClick = (city) => {
    search(city.name);
  };

  useEffect(() => {
    search("Delhi"); // default city
  }, []);

  return (
    <div className="forecast">
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={props.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>

      <div className="today-weather">
        <h3>{props.weather}</h3>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search any city..."
            value={query}
            onChange={handleInputChange}
            className="search-input"
          />

          <div className="img-box">
            <img
              src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
              alt="search"
              onClick={() => search(query)}
              style={{ cursor: "pointer" }}
            />
          </div>

          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((city, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(city)}
                  className="suggestion-item"
                >
                  {city.name}, {city.country}
                </li>
              ))}
            </ul>
          )}
        </div>

        <ul>
          {weather.main ? (
            <div>
              <li className="cityHead">
                <p>
                  {weather.name}, {weather.sys.country}
                </p>
                <img
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt={weather.weather[0].main}
                />
              </li>
              <li>
                Temperature{" "}
                <span className="temp">
                  {Math.round(weather.main.temp)}°C ({weather.weather[0].main})
                </span>
              </li>
              <li>
                Humidity <span className="temp">{Math.round(weather.main.humidity)}%</span>
              </li>
              <li>
                Visibility <span className="temp">{Math.round(weather.visibility / 1000)} km</span>
              </li>
              <li>
                Wind Speed <span className="temp">{Math.round(weather.wind.speed)} Km/h</span>
              </li>
            </div>
          ) : (
            <li>
              {error.query} {error.message}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Forcast;
