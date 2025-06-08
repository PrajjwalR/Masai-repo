import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function WeatherDetails() {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const mapApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      )
      .then(res => setWeather(res.data))
      .catch(err => setWeather(null));
  }, [city, apiKey]);

  if (!weather) return <p>Loading or no data available...</p>;

  const { temp, humidity } = weather.main;
  const condition = weather.weather[0].main;
  const { lat, lon } = weather.coord;

  return (
    <div className="container">
      <h2>Weather in {city}</h2>
      <p><strong>Temperature:</strong> {temp}°C</p>
      <p><strong>Humidity:</strong> {humidity}%</p>
      <p><strong>Condition:</strong> {condition}</p>

      <iframe
        title="map"
        width="100%"
        height="300"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={`https://www.google.com/maps/embed/v1/view?key=${}&center=${lat},${lon}&zoom=10`}
      />
    </div>
  );
}
