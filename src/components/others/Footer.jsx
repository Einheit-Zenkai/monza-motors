import React from "react";

const Footer = () => {
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
            <a href="#" className="text-light text-decoration-none me-3">Home</a>
            <a href="#" className="text-light text-decoration-none me-3">Inventory</a>
            <a href="#" className="text-light text-decoration-none me-3">Customize</a>
            <a href="#" className="text-light text-decoration-none">Contact</a>
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
