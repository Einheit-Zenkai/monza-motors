import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "@/styles/CarParallax.css";

gsap.registerPlugin(ScrollTrigger);
const featureData = [
  {
    title: "Custom Car Builds",
    name: "Tailored Performance & Aesthetics",
    image: "/static/imgs/features/customferrari.jpg",
    carcardname: "feature-card-1"
  },
  {
    title: "Immersive 3D Customizer",
    name: "Visualize Your Dream Car in Real Time",
    image: "/static/imgs/otherimages/Velar-Interior-900x506.avif",
    carcardname: "feature-card-2"
  },
  {
    title: "Engine Sound Preview",
    name: "Hear It Roar Before You Buy",
    image: "/static/imgs/features/engine-preview.avif",
    carcardname: "feature-card-3"
  },
  {
    title: "Detailed Spec Sheets",
    name: "Every Detail, Transparent & Verified",
    image: "/static/imgs/features/spec-sheets.avif",
    carcardname: "feature-card-4"
  },
  {
    title: "In-Person Consultation",
    name: "Expert Guidance for Your Custom Build",
    image: "/static/imgs/features/in-person-consult.avif",
    carcardname: "feature-card-5"
  },
  {
    title: "Exclusive Inventory",
    name: "Rare Imports & One-of-a-Kind Machines",
    image: "/static/imgs/features/exclusive-cars.avif",
    carcardname: "feature-card-6"
  }
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
        {featureData.map((feature, i) => (
          <div className={`car-card-general scroll-img ${feature.carcardname}`} key={i}>
            <h3>{feature.title}</h3>
            <img src={feature.image} alt={feature.name} />
            {/* <p>{car.name}</p> */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CarParallax;