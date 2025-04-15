import React, { useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { initFadeIn } from "./scripts/fadein.js";

// Import your other components
import Navbar from "./components/Navbar"; // Import the Navbar component
import Home from "./components/Home";
import Cars from "./components/Cars";
import Customizer from "./components/Customizer";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer"; // Import the Footer component
import P1 from './components/carpages/p1';
import F12 from './components/carpages/f12';
import Porsche from './components/carpages/porsche';
import Skyline from './components/carpages/skyline';
import Vulcan from './components/carpages/vulcan';
import Rollsroyce from './components/carpages/rollsroyce';


function App() {
  const location = useLocation();  // This works fine because Router is wrapping App at the root level

  useEffect(() => {
    initFadeIn();
  }, [location]);

  const shouldHideFooter = ["/customizer"].includes(location.pathname);

  return (
    <>
      <Navbar /> {/* Place the Navbar component at the top */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/customizer" element={<Customizer />} />
        <Route path="/about-us" element={<AboutUs />} />

        {/* For car pages */}
        <Route path="/carpages/p1" element={<P1 />} /> 
        <Route path="/carpages/f12" element={<F12 />} /> 
        <Route path="/carpages/porsche" element={<Porsche />} /> 
        <Route path="/carpages/skyline" element={<Skyline />} /> 
        <Route path="/carpages/vulcan" element={<Vulcan />} /> 
        <Route path="/carpages/rollsroyce" element={<Rollsroyce />} /> 
      </Routes>
      {!shouldHideFooter && <Footer />}
    </>
  );
}

export default App;
