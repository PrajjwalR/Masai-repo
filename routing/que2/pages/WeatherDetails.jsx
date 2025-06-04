import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_KEY = "40c125f5e74c09c3492883fa07c8eca9";

export default function WeatherDetails() {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);

 useEffect(() => {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    )
        .then((res) => res.json())
        .then((data) => {
        console.log("Weather API response:", data);
        setWeather(data);
        })
        .catch((err) => {
        console.error("Fetch error:", err);
        });
    }, [city]);

  if (!weather) {
    return <p>Loading...</p>;
    }

    if (weather.cod !== 200) {
    return <p>City not found: {weather.message}</p>;
    }


  const { temp, humidity } = weather.main;
  const condition = weather.weather[0].description;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Weather in {city}</h1>
      <p>Temperature: {temp}°C</p>
      <p>Humidity: {humidity}%</p>
      <p>Condition: {condition}</p>

      {/* <iframe
        title="map"
        width="100%"
        height="300"
        style={{ border: 0, marginTop: "20px" }}
        loading="lazy"
        allowFullScreen
        src={`https://www.google.com/maps/embed/v1/place?key=_______&q=${city}`}
      /> */}
    </div>
  );
}
