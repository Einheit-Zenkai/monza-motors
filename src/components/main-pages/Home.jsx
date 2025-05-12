import React, { useLayoutEffect, useState } from 'react';
import Plyr from 'plyr';
import CarParallax from '@/components/others/CarParallax';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', date: '' });

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    const player = new Plyr('#player', { controls: [] });

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
      };
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookNow = () => {
    const { name, email, date } = formData;
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (name && isValidEmail && date) {
      setIsModalOpen(false);
      setShowSuccess(true);
    } else {
      alert('Please fill all fields correctly.');
    }
  };

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
        <p>Welcome to Monza Motors — where innovation meets adrenaline...</p>
        <p>We showcase handpicked supercars, offer stunning custom paint jobs, and supply performance-grade parts tailored for true car enthusiasts.</p>
      </section>

      <section>
        <h2>Crafted for the Bold</h2>
        <p>Every Monza Motors car is handcrafted...</p>
        <p>Built with passion and engineered to defy the ordinary — our creations are made for those who dare to stand out.</p>
      </section>

      <section>
        <h2>Signature Customs</h2>
        <p>Our builds are a reflection...</p>
        <p>From matte finishes to custom hues and elite carbon fiber kits — each detail is yours to define.</p>
      </section>

      <CarParallax />

      <section>
        <h2>Custom Built. One-on-One.</h2>
        <p>We don't believe in online orders. At Monza Motors, every car is a one-of-one, built in person with you, for you. Schedule a visit to meet our team, explore options, and bring your dream car to life.</p>
        <center><button onClick={() => setIsModalOpen(true)}>Book a Visit</button></center>
      </section>

      {/* Popup Form Modal */}
      {isModalOpen && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2>Book a Visit</h2>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              style={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              style={styles.input}
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              max={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]}
              style={styles.input}
            />
            <button onClick={handleBookNow} style={styles.button}>Book Now</button>
            <button onClick={() => setIsModalOpen(false)} style={styles.cancel}>Cancel</button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div style={styles.overlay}>
          <div style={{ ...styles.modal, width: '300px', textAlign: 'center' }}>
            <p>Your details have been taken.<br />Thank you!</p>
            <button onClick={() => setShowSuccess(false)} style={styles.button}>Okay</button>
          </div>
        </div>
      )}
    </div>
  );
}

// Inline styles
const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#000',
    color: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(255,255,255,0.3)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '400px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '1rem',
  },
  button: {
    padding: '10px',
    background: '#fff',
    color: '#000',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  cancel: {
    padding: '10px',
    background: 'transparent',
    color: '#fff',
    border: '1px solid #fff',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Home;
