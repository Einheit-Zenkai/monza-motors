import React, { useLayoutEffect } from 'react';
import Plyr from 'plyr'; // Import Plyr library
import CarParallax from './CarParallax';
// import 'plyr/dist/plyr.css';

function Home() {
  
  useLayoutEffect(() => {
      const player = new Plyr('#player', {
        controls: [],
      });
    const videoContainer = document.getElementById('videoContainer');
    if (videoContainer) {
      function handleScroll() {
        const scrollY = window.scrollY;
        const scale = Math.max(0.9, 1 - scrollY / 6000);
        videoContainer.style.width = `${scale * 100}%`;
      }
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('load', () => {
        videoContainer.style.transition = 'width 0.3s ease-out';
      });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('load', () => {
          videoContainer.style.transition = 'width 0.3s ease-out';
        });
      };
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div>
      <section className="video-section" id="videoSection">
        <div className="video-container" id="videoContainer">
          <video id="player" muted autoPlay loop playsInline data-poster="/path/to/poster.jpg">
            <source src="/static/vids/slidevideo.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      
    <section>
      <h1>Precision. Power. Perfection.</h1>
      <p>Welcome to Monza Motors — where innovation meets adrenaline. Our custom-built performance machines are engineered for those who crave more than just speed. They demand soul.</p>
      {/* <center><button>Explore Our Builds</button></center> */}
    </section>

    <section>
      <h2>Crafted for the Bold</h2>
      <p>Every Monza Motors car is handcrafted from the ground up, blending cutting-edge engineering with timeless design. Whether you're tearing up the track or cruising the city streets, our machines deliver an unmatched driving experience.</p>
    </section>

    
<section>
  <h2>Signature Customs</h2>
  <p>Our builds are a reflection of pure performance and personal expression. Here are just a few of our latest masterpieces:</p>
</section>
< CarParallax />

<section>
  <h2>Feel the Engine</h2>
  <p>Experience the raw sound of power. Put on your headphones and listen to the engine roars of our custom machines — each one uniquely tuned to perfection.</p>
  <center><button>Listen Now</button></center>
</section>

<section>
  <h2>Custom Built. One-on-One.</h2>
  <p>We don't believe in online orders. At Monza Motors, every car is a one-of-one, built in person with you, for you. Schedule a visit to meet our team, explore options, and bring your dream car to life.</p>
  <center><button>Book a Visit</button></center>
</section>


    </div>
  );
}

export default Home;
