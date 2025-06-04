import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      navigate(`/weather/${city}`);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "8px", width: "200px" }}
      />
      <button type="submit" style={{ padding: "8px" }}>Search</button>
    </form>
  );
}
