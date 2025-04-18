import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "@/styles/CarParallax.css";

gsap.registerPlugin(ScrollTrigger);
const carData = [
  { name: "Interior smthn", image: "./static/imgs/otherimages/Velar-Interior-900x506.avif", carcardname: "car-card-1", title: "Nice interiors" },
  { name: "Ferrari F12 Berlinetta", image: "./static/imgs/otherimages/cavallo.jpg", carcardname: "car-card-2", title: "what do we have here?" },
  { name: "Aston Martin Vulcan", image: "./static/imgs/vulcan/astonmartinflipcard.jpg", carcardname: "car-card-3", title: "idk either" },
  { name: "Nissan Skyline GT-R R34", image: "./static/imgs/skyline/skylineblack.jpg", carcardname: "car-card-4", title: "we need to do" },
  { name: "Rolls-Royce Ghost", image: "./static/imgs/RR/RRblack.jpg", carcardname: "car-card-5", title: "something about this" },
  { name: "McLaren P1", image: "./static/imgs/p1/p1.jpg", carcardname: "car-card-6", title: "situation" },
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
            <div className={`car-card-general scroll-img ${car.carcardname}`} key={i}>
              <h3>{car.title}</h3>
            <img src={car.image} alt={car.name} />
            {/* <p>{car.name}</p> */}
            </div>
        ))}
      </div>
    </section>
  );
};

export default CarParallax;