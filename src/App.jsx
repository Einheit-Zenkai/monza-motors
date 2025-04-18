import React, { useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { initFadeIn } from "@/scripts/fadein.js"; // Updated path

// Common Components
import Navbar from "@/components/others/Navbar"; // Updated path
import Footer from "@/components/others/Footer"; // Updated path

// Main Pages
import Home from "@/components/main-pages/Home"; // Updated path
import Cars from "@/components/main-pages/Cars"; // Updated path
import Customizer from "@/components/main-pages/Customizer"; // Updated path
import AboutUs from "@/components/main-pages/AboutUs"; // Updated path
import SpareParts from "@/components/main-pages/SpareParts"; // Updated path

// Car Pages
import P1 from "@/components/carpages/p1"; // Updated path
import F12 from "@/components/carpages/f12"; // Updated path
import Porsche from "@/components/carpages/porsche"; // Updated path
import Skyline from "@/components/carpages/skyline"; // Updated path
import Vulcan from "@/components/carpages/vulcan"; // Updated path
import Rollsroyce from "@/components/carpages/rollsroyce"; // Updated path

function App() {
  const location = useLocation();  // This works fine because Router is wrapping App at the root level

  useEffect(() => {
    initFadeIn();
    console.log("Route changed to", location.pathname);
  }, [location.pathname]); // This ensures it runs on mount AND every path change

  const shouldHideFooter = ["/customizer"].includes(location.pathname);

  return (
    <>
      <Navbar /> {/* Place the Navbar component at the top */}
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/customizer" element={<Customizer />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/spare-parts" element={<SpareParts />} />

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
