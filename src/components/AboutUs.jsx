import React from 'react';
import '../../public/static/styles/about-us.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

function AboutUs() {
  AOS.init({
    duration: 2000, // Duration in ms, increase for slower fade-in
    offset: 200,    // Trigger the fade-in after scrolling 200px (adjust as needed)
    delay: 100,     // Optional: delay before the animation starts
    easing: 'ease-in-out' // Optional: smooth easing effect
  });

  return (
    <div className="container mt-5 pt-5">
      <>
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
              <li>
                Monza Motors was born from a deep love for automotive excellence and a
                relentless pursuit of innovation.
              </li>
              <li>
                We specialize in crafting bespoke vehicles that blend cutting-edge
                engineering with breathtaking design.
              </li>
              <li>
                Every car we touch is tuned, tailored, and transformed into a personal
                masterpiece.
              </li>
              <li>
                Whether it's a track-ready beast or a head-turning street icon, we
                bring dreams to life on four wheels.
              </li>
            </ul>
          </div>
        </div>
        <div
          className="car-container justify-end"
          style={{ padding: "0 2rem", marginTop: "2rem" }}
        >
          <div className="car-details">
            <h1 className="car-title">What We Believe</h1>
            <ul className="car-list">
              <li>
                Performance is more than numbers — it's about the thrill, the roar,
                the control.
              </li>
              <li>
                Customization is a form of self-expression. Your car should be as
                unique as you are.
              </li>
              <li>
                We believe in the fusion of heritage and technology — honoring the
                legends while building the future.
              </li>
              <li>
                Community matters. We’re not just a brand — we’re a crew of
                enthusiasts, creators, and dreamers.
              </li>
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
        <div
          className="car-container justify-start"
          style={{ padding: "0 2rem", marginTop: "2rem" }}
        >
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
              <li>
                To push boundaries and build machines that excite, empower, and
                inspire.
              </li>
              <li>
                To provide a platform where enthusiasts can unleash their creativity.
              </li>
              <li>
                To deliver unmatched quality and a deeply personal experience to every
                client.
              </li>
              <li>
                To leave a tire mark not just on roads, but on automotive culture
                itself.
              </li>
            </ul>
          </div>
        </div><div
  className="car-container"
  style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "4rem 2rem", // Increased padding for more space
    minHeight: "100vh",  // Full viewport height
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
        maxWidth: "600px",  // Limit the width for readability
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

      </>

    </div>
  );
}

export default AboutUs;
