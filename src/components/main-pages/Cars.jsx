import React from 'react';
import '@/styles/cars-page.css'; // Simplified path assuming the CSS file is in the same folder or adjusted relative path
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Cars() {
  return (
    <div>
            <section 
        className="car-section" 
        style={{ backgroundImage: 'url(./static/imgs/RR/rrdriving.jpg)' }}>
        <div className="info-box">
          <h1>Rolls Royce Ghost</h1>
          <p>Elegance redefined with a 563 HP V12. Silent. Smooth. Sophisticated. 0–100 in 4.6s.</p>
          <Link to="/carpages/rollsroyce"><button className="read-more">Read More</button></Link>
        </div>
      </section>


      <section 
        className="car-section" 
        style={{ backgroundImage: 'url(./static/imgs/ferrari/newberlinettaimage.jpg)' }}>
        <div className="info-box">
          <h1>Ferrari F12 Berlinetta</h1>
          <p>730 HP of Italian fury. 0-100 km/h in 3.1s. A perfect blend of speed, passion, and precision.</p>
          <Link to="/carpages/f12"><button className="read-more">Read More</button></Link>
        </div>
      </section>

      <section 
        className="car-section" 
        style={{ backgroundImage: 'url(./static/imgs/skyline/4k_skyline_japan_night.jpg)' }}>
        <div className="info-box">
          <h1>Nissan Skyline R34 GT-R</h1>
          <p>Japanese legend. Twin-turbo inline-6 with AWD grip. Forever a street racing icon.</p>
          <Link to="/carpages/skyline"> <button className="read-more">Read More</button></Link>
        </div>
      </section>

      <section 
        className="car-section" 
        style={{ backgroundImage: 'url(./static/imgs/vulcan/vulcannew.jpg)' }}>
        <div className="info-box">
          <h1>Aston Martin Vulcan</h1>
          <p>The British beast—820 HP unleashed with precision. 0–100 km/h in 2.9s, topping at 360 km/h.</p>
          <Link to="/carpages/vulcan"><button className="read-more">Read More</button></Link>
        </div>
      </section>

      <section 
        className="car-section" 
        style={{ backgroundImage: 'url(./static/imgs/p1/p1.jpg)' }}>
        <div className="info-box">
          <h1>McLaren P1</h1>
          <p>903 HP hybrid hypercar. Lightning-fast and track-tuned. A modern British masterpiece.</p>
          <Link to="/carpages/p1"><button className="read-more">Read More</button></Link>
        </div>
      </section>

      <section 
        className="car-section" 
        style={{ backgroundImage: 'url(./static/imgs/918/918zoop.jpg)' }}>
        <div className="info-box">
          <h1>Porsche 918 Spyder</h1>
          <p>Hybrid monster with 887 HP. A V8 & electric dream that hits 0-100 km/h in just 2.5s.</p>
          <Link to="/carpages/porsche"><button className="read-more">Read More</button></Link>
        </div>
      </section>


    </div>
  );
}

export default Cars;
