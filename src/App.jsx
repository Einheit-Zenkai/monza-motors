import React, { useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
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
  const location = useLocation();
  
  useEffect(() => {
    console.log("Route changed to", location.pathname);
    
    // Add the scroll animation observer
    const setupScrollAnimation = () => {
      // Add a class to target elements for animation
      const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
      
      // Reset all elements to their initial state
      textElements.forEach(element => {
        element.classList.add('fade-in-element');
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity 1.6s ease-out, transform 1.6s ease-out";
      });
      
      // Function to check if element is in viewport
      const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
      };
      
      // Create the Intersection Observer for scrolling elements
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // When element is visible
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            // Stop observing after animation is triggered
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 }); // Trigger when 10% of the element is visible
      
      // First, immediately animate elements already in viewport
      textElements.forEach(element => {
        if (isInViewport(element)) {
          // Add a small delay to create a cascade effect for elements already visible
          setTimeout(() => {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
          }, 50 + (Math.random() * 200)); // Random delay between 50ms and 250ms
        } else {
          // Observe elements not yet in viewport
          observer.observe(element);
        }
      });
      
      // Clean up function
      return () => {
        textElements.forEach(element => {
          observer.unobserve(element);
        });
      };
    };
    
    // Set a small timeout to ensure the DOM is fully loaded after route change
    const timeoutId = setTimeout(() => {
      setupScrollAnimation();
    }, 200); // Increased timeout to give DOM more time to update
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [location.pathname]); 
  
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