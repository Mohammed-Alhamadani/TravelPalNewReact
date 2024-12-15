const express = require('express');
const axios = require('axios');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Route to fetch weather data
app.get('/weather', (req, res) => {
    const city = req.query.city; // Get city from query parameters
    console.log('Weather request for city:', city); // Log the city parameter

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY; // Get API key from environment
    if (!apiKey) {
        return res
            .status(500)
            .json({ error: 'API key is missing from environment' });
    }

    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios
        .get(weatherApiUrl)
        .then((response) => {
            console.log('Weather API response:', response.data); // Log the response
            res.json(response.data); // Send the data to the frontend
        })
        .catch((error) => {
            console.error('Error fetching weather data:', error);
            res.status(500).json({ error: 'Error fetching weather data' });
        });
});

// Route to fetch flight data from new API
app.get('/flights', (req, res) => {
    const { from, to, yearMonth } = req.query;

    // Validate input parameters
    console.log('Flight request:', { from, to, yearMonth }); // Log the flight request parameters

    if (!from || !to || !yearMonth) {
        return res
            .status(400)
            .json({ error: 'From, to, and yearMonth are required' });
    }

    const options = {
        method: 'GET',
        url: `https://flights-sky.p.rapidapi.com/flights/price-calendar-web`,
        params: {
            fromEntityId: from,
            toEntityId: to,
            yearMonth: yearMonth,
        },
        headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY, // Use the RapidAPI key from .env
            'x-rapidapi-host': 'flights-sky.p.rapidapi.com',
        },
    };

    axios(options)
        .then((response) => {
            console.log('Flight API response:', response.data); // Log the flight API response
            const flightData = response.data;
            res.json(flightData);
        })
        .catch((error) => {
            console.error('Error fetching flight data:', error);
            res.status(500).json({ error: 'Error fetching flight data' });
        });
});

// Catch-all to serve the React app in production
app.get('*', (req, res) => {
    res.sendFile(path.join('__dirname', 'client', 'build', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
