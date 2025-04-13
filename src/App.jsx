import React, { useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { initFadeIn } from "./scripts/fadein.js";

// Import your other components
import Navbar from "./components/Navbar"; // Import the Navbar component
import Home from "./components/Home";
import Cars from "./components/Cars";
import Customizer from "./components/Customizer";
import AboutUs from "./components/AboutUs";

function App() {
  const location = useLocation();  // This works fine because Router is wrapping App at the root level

  useEffect(() => {
    initFadeIn();
  }, [location]);

  return (
    <>
      <Navbar /> {/* Place the Navbar component at the top */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/customizer" element={<Customizer />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </>
  );
}

export default App;
