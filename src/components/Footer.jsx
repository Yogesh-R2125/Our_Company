import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await fetch(`${API_URL}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus(data.error || 'Failed');
      }
    } catch {
      setStatus('Failed to subscribe. Try again later.');
    }
    setTimeout(() => setStatus(''), 4000);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 className="logo-gradient">WolfStack</h3>
            <p>We build digital products that drive growth. A team of passionate developers and designers crafting modern digital experiences.</p>
            <div className="social-links">
              <a href="#" aria-label="LinkedIn" className="social-icon">in</a>
              <a href="#" aria-label="GitHub" className="social-icon">GH</a>
              <a href="#" aria-label="Twitter" className="social-icon">X</a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Product</h4>
            <Link to="/services">Services</Link>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer-links">
            <h4>Services</h4>
            <Link to="/services">Web Development</Link>
            <Link to="/services">Mobile Apps</Link>
            <Link to="/services">UI/UX Design</Link>
            <Link to="/services">Cloud Solutions</Link>
          </div>

          <div className="footer-newsletter">
            <h4>Newsletter</h4>
            <p>Stay updated with our latest projects and tech insights.</p>
            <form onSubmit={handleNewsletter} className="newsletter-form">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </form>
            {status === 'success' && <span className="newsletter-success">Subscribed!</span>}
            {status && status !== 'success' && <span className="newsletter-error">{status}</span>}
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} WolfStack. All rights reserved.</p>
          <p>Crafted with precision by our team</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
