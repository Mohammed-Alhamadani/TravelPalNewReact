import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const fetchWeather = async () => {
        if (!city) {
            return setError('City is required');
        }
        try {
            const response = await axios.get(`/weather?city=${city}`);
            setWeatherData(response.data);
            setError(null);
        } catch (err) {
            setError('Error fetching weather data');
            setWeatherData(null);
        }
    };

    return (
        <div style={{ margin: '20px' }}>
            <h2>Weather Information</h2>
            <br />
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
            />
            <br />
            <br />
            <button className="Btn" onClick={fetchWeather}>
                Get Weather
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {weatherData && (
                <div>
                    <h3>{weatherData.name}</h3>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
