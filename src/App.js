import React, { useState } from 'react';
import axios from 'axios';
import { getCityImage } from './unsplash';
import defaultBackground from './assets/default.jpg';
import './index.css';

export default function App() {
  const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState('');
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${WEATHER_API_KEY}`;
  
  const handleLocationSearch = async (event) => {
    if (event.key === 'Enter') {
      try {
        const response = await axios.get(url);
        setWeatherData(response.data);

        const fetchedImage = await getCityImage(city);
        setBackgroundImageUrl(fetchedImage);
      } catch (error) {
        console.error(error);
        alert('Location not found. Please enter a valid location.');
      }
      setCity('');
    }
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${backgroundImageUrl || defaultBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
      }}
    >
      <div className="search">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleLocationSearch}
          placeholder="Enter Location"
          type="text"
        />
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <h1>{weatherData.name}</h1>
          </div>
          <div className="temp">
            {weatherData.main && <h3>{weatherData.main.temp.toFixed()}°F</h3>}
          </div>
          <div className="description">
            {weatherData.weather && <p>{weatherData.weather[0].main}</p>}
          </div>
        </div>

        {weatherData.name && (
          <div className="bottom">
            <div className="feels">
              <h2 className="bold">Feels Like</h2>
              {weatherData.main && (
                <p>{weatherData.main.feels_like.toFixed()}°F</p>
              )}
            </div>
            <div className="humidity">
              <p className="bold">Humidity</p>
              {weatherData.main && (
                <p>{weatherData.main.humidity.toFixed()}%</p>
              )}
            </div>
            <div className="wind">
              <h2 className="bold">Wind</h2>
              {weatherData.wind && (
                <p>{weatherData.wind.speed.toFixed()}mph</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
