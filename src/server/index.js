// ====== SERVER (Express.js) ======
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

// API keys and credentials
const geoUsername = 'sama.abosair';
const weatherbitKey = '4ecddd8412434bb0aa243bfba261a364';
const pixabayKey = '48988821-6d9fd8acb5e952afcde348c54';

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Function to get geographic data from GeoNames
async function getGeoData(city) {
    const geoResponse = await axios.get(`http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${geoUsername}`);
    const geoData = geoResponse.data;
    if (!geoData.geonames || geoData.geonames.length === 0) {
        throw new Error('City not found.');
    }
    return geoData.geonames[0];
}

// Function to get weather data from Weatherbit
async function getWeatherData(lat, lng) {
    const weatherResponse = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${weatherbitKey}`);
    const weatherData = weatherResponse.data;
    if (!weatherData.data || weatherData.data.length === 0) {
        throw new Error('Weather data not available.');
    }
    return {
        temperature: weatherData.data[0].temp,
        description: weatherData.data[0].weather.description
    };
}


// Function to get city image from Pixabay
async function getCityImage(city) {
    const pixabayResponse = await axios.get(`https://pixabay.com/api/?key=${pixabayKey}&q=${encodeURIComponent(city)}&image_type=photo`);
    const pixabayData = pixabayResponse.data;
    return pixabayData.hits.length > 0 ? pixabayData.hits[0].webformatURL : 'https://via.placeholder.com/600x400?text=No+Image+Available';
}

// Route to get city data
app.post('/get-city-data', async (req, res) => {
    const { city } = req.body;

    if (!city) {
        return res.status(400).json({ error: 'City name is required' });
    }

    try {
        const geoData = await getGeoData(city);
        const weatherData = await getWeatherData(geoData.lat, geoData.lng);
        const cityImage = await getCityImage(city);

        res.json({
            city: geoData.name,
            country: geoData.countryName,
            weather: weatherData,
            image: cityImage
        });
    } catch (error) {
        console.error('Error fetching city data:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Default route
app.get('/', (req, res) => {
    res.send("Welcome to the City Data API");
});

// Start server
app.listen(8000, () => {
    console.log('Server running on port 8000');
});
