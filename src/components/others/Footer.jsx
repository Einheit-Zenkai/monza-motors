import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation(); // To detect route changes

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-dark text-light py-3 mt-5">
      <div className="container">
        {/* Top Row: Inline layout */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-center text-md-start gap-3 flex-wrap">
          {/* Branding */}
          <div>
            <strong>Monza Motors</strong> - Custom cars. Real passion.
          </div>

          {/* Navigation */}
          <div>
            <Link 
              to="/" 
              className="text-light text-decoration-none me-3"
              onClick={scrollToTop} // Scroll to top when clicked
            >
              Home
            </Link>
            <Link 
              to="/spare-parts" 
              className="text-light text-decoration-none me-3"
              onClick={scrollToTop} // Scroll to top when clicked
            >
              Spare parts
            </Link>
            <Link 
              to="/Cars" 
              className="text-light text-decoration-none me-3"
              onClick={scrollToTop} // Scroll to top when clicked
            >
              Models
            </Link>
            <Link 
              to="/about-us" 
              className="text-light text-decoration-none"
              onClick={scrollToTop} // Scroll to top when clicked
            >
              Contact
            </Link>
          </div>

          {/* Contact / Socials */}
          <div>
            <span className="me-2">📧 info@monzamotors.com</span>
            <span className="me-3">📞 +91 1234567890</span>
            <a href="#" className="text-light me-2"><i className="bi bi-facebook"></i></a>
            <a href="#" className="text-light me-2"><i className="bi bi-twitter"></i></a>
            <a href="#" className="text-light"><i className="bi bi-instagram"></i></a>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="text-center pt-2 border-top border-secondary mt-3">
          <p className="mb-0 small">&copy; 2025 Monza Motors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
