import React, { useState, useEffect } from 'react';
import '@/styles/about-us.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

function AboutUs() {
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 2000,
      offset: 200,
      delay: 100,
      easing: 'ease-in-out'
    });
  }, []);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 4000); // Alert disappears after 4 seconds
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const message = e.target.message.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern

    if (!name || !email || !message) {
      setAlertMessage("Please fill in all fields!");
      setShowAlert(true);
      return;
    }

    if (!emailRegex.test(email)) {
      setAlertMessage("Please enter a valid email address!");
      setShowAlert(true);
      return;
    }

    setAlertMessage("Thank you for your feedback!");
    setShowAlert(true);
    e.target.reset(); // Clear the form
  };

  return (
    <div className="container mt-5 pt-5">
      <>
        {/* Alert Message */}
        {showAlert && (
          <div style={{
            backgroundColor: "#ff4c4c",
            color: "white",
            padding: "1rem",
            textAlign: "center",
            borderRadius: "8px",
            marginBottom: "1rem",
            fontWeight: "bold",
            position: "fixed",
            top: "80px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            width: "90%",
            maxWidth: "600px",
          }}>
            {alertMessage}
          </div>
        )}

        {/* Rest of your page */}
        <h1
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: "1.1",
            color: "#ffffff",
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          About us
        </h1>
        <br />

        {/* Car sections */}
        <div className="car-container justify-start" style={{ padding: "0 2rem" }}>
          <img
            src="./static/imgs/skyline/nissanskylinenew.webp"
            alt="Monza Team Car"
            className="car-image"
            data-aos="fade-right"
            data-aos-offset={0}
          />
          <div className="car-details">
            <h1 className="car-title">Driven by Passion, Built for Performance</h1>
            <ul className="car-list">
              <li>Monza Motors was born from a deep love for automotive excellence and a relentless pursuit of innovation.</li>
              <li>We specialize in crafting bespoke vehicles that blend cutting-edge engineering with breathtaking design.</li>
              <li>Every car we touch is tuned, tailored, and transformed into a personal masterpiece.</li>
              <li>Whether it's a track-ready beast or a head-turning street icon, we bring dreams to life on four wheels.</li>
            </ul>
          </div>
        </div>

        <div className="car-container justify-end" style={{ padding: "0 2rem", marginTop: "2rem" }}>
          <div className="car-details">
            <h1 className="car-title">What We Believe</h1>
            <ul className="car-list">
              <li>Performance is more than numbers — it's about the thrill, the roar, the control.</li>
              <li>Customization is a form of self-expression. Your car should be as unique as you are.</li>
              <li>We believe in the fusion of heritage and technology — honoring the legends while building the future.</li>
              <li>Community matters. We’re not just a brand — we’re a crew of enthusiasts, creators, and dreamers.</li>
            </ul>
          </div>
          <img
            src="static/imgs/ferrari/newberlinettaimage.jpg"
            alt="Our Workshop"
            className="car-image"
            data-aos="fade-left"
            data-aos-offset={0}
          />
        </div>

        <div className="car-container justify-start" style={{ padding: "0 2rem", marginTop: "2rem" }}>
          <img
            src="static/imgs/p1/p1_group_photo.webp"
            alt="Our Workshop"
            className="car-image"
            data-aos="fade-right"
            data-aos-offset={0}
          />
          <div className="car-details">
            <h1 className="car-title">Our Mission</h1>
            <ul className="car-list">
              <li>To push boundaries and build machines that excite, empower, and inspire.</li>
              <li>To provide a platform where enthusiasts can unleash their creativity.</li>
              <li>To deliver unmatched quality and a deeply personal experience to every client.</li>
              <li>To leave a tire mark not just on roads, but on automotive culture itself.</li>
            </ul>
          </div>
        </div>

        {/* Join the Monza Movement Section */}
        <div
          className="car-container"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "4rem 2rem 2rem 2rem",
            minHeight: "50vh",
          }}
        >
          <div>
            <h1 className="car-title" style={{ fontSize: "2rem", fontWeight: "bold" }}>
              Join the Monza Movement
            </h1>
            <p
              style={{
                fontSize: "1.25rem",
                color: "#ccc",
                marginTop: "1rem",
                maxWidth: "600px",
              }}
            >
              Whether you're customizing your first car or building your dream machine,
              we’re here to make it real.
              <br />
              <br />
              <b>Monza Motors</b> — where every drive begins with a dream.
            </p>
          </div>
        </div>

        {/* Feedback Form */}
        <div
          style={{
            background: "#1a1a1a",
            padding: "3rem",
            borderRadius: "12px",
            margin: "4rem 2rem",
            color: "white",
            textAlign: "center",
          }}
          data-aos="fade-up"
        >
          <h2 style={{ marginBottom: "2rem" }}>We'd Love Your Feedback</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1.5rem" }}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                style={{
                  padding: "0.75rem",
                  width: "100%",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#333",
                  color: "white",
                  fontSize: "1rem",
                }}
              />
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                style={{
                  padding: "0.75rem",
                  width: "100%",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#333",
                  color: "white",
                  fontSize: "1rem",
                }}
              />
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <textarea
                name="message"
                placeholder="Your Feedback"
                rows="5"
                style={{
                  padding: "0.75rem",
                  width: "100%",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#333",
                  color: "white",
                  fontSize: "1rem",
                  resize: "none",
                }}
              ></textarea>
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: "#ff4c4c",
                padding: "0.75rem 2rem",
                borderRadius: "8px",
                border: "none",
                color: "white",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </>
    </div>
  );
}

export default AboutUs;
