import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../public/static/styles/CarParallax.css";

gsap.registerPlugin(ScrollTrigger);
const carData = [
  { name: "Porsche 918 Spyder", image: "./static/imgs/918/918flipcard.jpg", carcardname: "car-card-1" },
  { name: "Ferrari F12 Berlinetta", image: "./static/imgs/ferrari/newberlinettaimage.jpg", carcardname: "car-card-2" },
  { name: "Aston Martin Vulcan", image: "./static/imgs/vulcan/astonmartinflipcard.jpg", carcardname: "car-card-3" },
  { name: "Nissan Skyline GT-R R34", image: "./static/imgs/skyline/skylineblack.jpg", carcardname: "car-card-4" },
  { name: "Rolls-Royce Ghost", image: "./static/imgs/RR/RRblack.jpg", carcardname: "car-card-5" },
  { name: "McLaren P1", image: "./static/imgs/p1/p1.jpg", carcardname: "car-card-6" },
];

const CarParallax = () => {
  const containerRef = useRef(null);
  const scrollSectionRef = useRef(null);

  useEffect(() => {
    const totalWidth = scrollSectionRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    gsap.to(scrollSectionRef.current, {
      x: () => `-${totalWidth - viewportWidth}`,
      ease: "none",
      scrollTrigger: {
      trigger: containerRef.current,
      start: "top top",
      end: () => `+=${totalWidth - viewportWidth}`,
      scrub: true,
      pin: true,
      anticipatePin: 1,
      },
    });

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  return (
    <section ref={containerRef} className="car-parallax-container">
      <div ref={scrollSectionRef} className="car-scroll">
        {carData.map((car, i) => (
            <div className={car.carcardname} key={i}>
            <img src={car.image} alt={car.name} />
            <p>{car.name}</p>
            </div>
        ))}
      </div>
    </section>
  );
};

export default CarParallax;