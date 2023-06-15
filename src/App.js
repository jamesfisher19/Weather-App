import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=d4542ccd29035894d479f2409a69e3f9`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
          alert('Location not found. Please enter a valid location.');
        });
      setLocation('');
    }
  };

  return (
    <div className="App">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <h1>{data.name}</h1>
          </div>
          <div className="temp">
            {data.main ? <h3>{data.main.temp.toFixed()}°F</h3> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              <h2 className="bold"> Feels Like</h2>
              {data.main ? <p> {data.main.feels_like.toFixed()}°F</p> : null}
            </div>
            <div className="humidity">
              <p className="bold">Humidity</p>
              {data.main ? <p>{data.main.humidity.toFixed()}%</p> : null}
            </div>
            <div className="wind">
              <h2 className="bold">Wind</h2>
              {data.wind ? <p>{data.wind.speed.toFixed()}mph</p> : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
