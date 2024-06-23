import React, { useState, useEffect } from 'react';

function WeatherDisplay({ lat, lon, apiKey }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [lat, lon, apiKey]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!weatherData) {
    return <div>Error: Failed to fetch weather data</div>;
  }

  return (
    <>
    <br/>
    <div>
      <h2 className='text-red-600'>Weather Information</h2>
      <p>Temperature: {weatherData.main.temp} Kelvin</p>
      <p>Feels Like: {weatherData.main.feels_like} Kelvin</p>
      <p>Pressure: {weatherData.main.pressure} hPa</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Description: {weatherData.weather[0].description}</p>
    </div>
    <br/>
    </>
  );
}

export default WeatherDisplay;
