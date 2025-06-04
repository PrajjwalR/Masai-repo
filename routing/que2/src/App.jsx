import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import WeatherDetails from "../pages/WeatherDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather/:city" element={<WeatherDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
