const axios = require("axios");

const getWeather = async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: "City is required" });

  try {
    const response = await axios.get(
      `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${city}`
    );

    const data = response.data;

    if (data.error) {
      return res.status(404).json({ error: data.error.info });
    }

    const weatherInfo = {
      city: data.location.name,
      country: data.location.country,
      temperature: data.current.temperature,
      weather_descriptions: data.current.weather_descriptions,
      humidity: data.current.humidity,
      wind_speed: data.current.wind_speed
    };

    res.status(200).json(weatherInfo);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { getWeather };
